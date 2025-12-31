
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8080';

app.use(cors({
    origin: [FRONTEND_URL, 'https://seal-shine-frontend.onrender.com', 'http://localhost:8080'],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

import { startShopifyOAuth, shopifyOAuthCallback } from "./backend/shopifyAuth.js";

const PORT = process.env.PORT || 3000;
const SHOPIFY_API_KEY = process.env.SHOPIFY_CLIENT_ID; // aligned naming
const SHOPIFY_API_SECRET = process.env.SHOPIFY_CLIENT_SECRET; // aligned naming
const SCOPES = 'read_products,write_products,read_inventory,write_inventory,read_locations,read_files,write_files';
// Assuming local dev for now
const HOST = 'http://localhost:3000';

// Minimal storage for the token
const TOKEN_PATH = path.join(__dirname, '.shopify_token');

// Register OAuth routes
app.get("/auth/shopify", startShopifyOAuth);
// app.get("/auth/callback", shopifyOAuthCallback); // Moved logic to allow redirection

app.get("/auth/callback", async (req, res) => {
    // Custom wrapper to handle redirect after callback
    await shopifyOAuthCallback(req, res, (success) => {
        if (success) {
            res.redirect(`${FRONTEND_URL}/admin/dashboard`);
        } else {
            res.redirect(`${FRONTEND_URL}/admin/dashboard?error=auth_failed`);
        }
    });
});


// Proxy endpoints for Admin API
import { getShopifyAccessToken } from "./backend/shopifyAuth.js";

app.get("/api/admin/products", async (req, res) => {
    try {
        const accessToken = getShopifyAccessToken();
        const shop = process.env.SHOPIFY_SHOP_DOMAIN || "suresealsealants-2.myshopify.com";
        const response = await axios.get(`https://${shop}/admin/api/2024-01/products.json`, {
            headers: {
                "X-Shopify-Access-Token": accessToken,
                "Content-Type": "application/json"
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
        if (error.message.includes("not initialized")) {
            return res.status(401).json({ error: "Unauthorized. Please connect Shopify." });
        }
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

app.get("/api/admin/orders", async (req, res) => {
    try {
        const accessToken = getShopifyAccessToken();
        const shop = process.env.SHOPIFY_SHOP_DOMAIN || "suresealsealants-2.myshopify.com";
        const response = await axios.get(`https://${shop}/admin/api/2024-01/orders.json?status=any`, {
            headers: {
                "X-Shopify-Access-Token": accessToken,
                "Content-Type": "application/json"
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
        if (error.message.includes("not initialized")) {
            return res.status(401).json({ error: "Unauthorized. Please connect Shopify." });
        }
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

app.get("/api/admin/dashboard-stats", async (req, res) => {
    try {
        const accessToken = getShopifyAccessToken();
        const shop = process.env.SHOPIFY_SHOP_DOMAIN || "suresealsealants-2.myshopify.com";
        const headers = {
            "X-Shopify-Access-Token": accessToken,
            "Content-Type": "application/json"
        };
        const baseURL = `https://${shop}/admin/api/2024-01`;

        const [productCountRes, ordersRes] = await Promise.all([
            axios.get(`${baseURL}/products/count.json`, { headers }),
            axios.get(`${baseURL}/orders.json?status=any&limit=250`, { headers }) // Increased limit to get more meaningful chart data
        ]);

        const productCount = productCountRes.data.count;
        const recentOrders = ordersRes.data.orders;

        // Calculate revenue from fetched orders
        const totalRevenue = recentOrders.reduce((sum, order) => sum + parseFloat(order.total_price), 0);

        // Map recent sales for the UI
        const recentSales = recentOrders.slice(0, 5).map(order => ({
            name: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : "Guest",
            email: order.customer ? order.customer.email : "N/A",
            amount: `$${order.total_price}`
        }));

        // Calculate Sales Over Time (Group by Month)
        const salesByMonth = {};
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        recentOrders.forEach(order => {
            const date = new Date(order.created_at);
            const monthIndex = date.getMonth();
            const monthName = monthNames[monthIndex];

            if (!salesByMonth[monthName]) {
                salesByMonth[monthName] = 0;
            }
            salesByMonth[monthName] += parseFloat(order.total_price);
        });

        // Convert key-value to array for Recharts
        // We want to ensure specific order if possible, but for now filtering specifically present months
        const salesOverTime = monthNames.map(month => ({
            name: month,
            total: salesByMonth[month] || 0
        })).filter(item => item.total > 0 || true); // Keep all months or filter? Let's return all for the chart axis stability, or just 12 months.
        // Actually, let's just return the 12 months structure to fill the chart
        // A better approach for a "Recent" chart might be last 6 months, but simple Jan-Dec works for now.

        res.json({
            productCount,
            totalRevenue,
            recentSales,
            salesOverTime, // New field
            store: shop
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error.response?.data || error.message);
        if (error.message.includes("not initialized")) {
            return res.status(401).json({ error: "Unauthorized. Please connect Shopify." });
        }
        res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
});

// Redirect root to frontend
app.get('/', (req, res) => {
    res.redirect(FRONTEND_URL);
});

// START
app.listen(PORT, () => {
    console.log(`Backend running on ${HOST}`);
    console.log(`Start OAuth flow: ${HOST}/auth/shopify?shop=suresealsealants-2.myshopify.com`);
});
