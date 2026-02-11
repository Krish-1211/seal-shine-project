
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

import { startShopifyOAuth, shopifyOAuthCallback, getShopifyAccessToken } from "./backend/shopifyAuth.js";

const PORT = process.env.PORT || 3000;
const HOST = 'http://localhost:3000';

const TOKEN_PATH = path.join(__dirname, '.shopify_token');

// Register OAuth routes
app.get("/auth", startShopifyOAuth);
app.get("/auth/shopify", startShopifyOAuth);

// PROPERLY IMPLEMENTED CALLBACK ROUTE
app.get("/auth/callback", async (req, res) => {
    await shopifyOAuthCallback(req, res, (success) => {
        if (success) {
            // Redirect to dashboard on success
            res.redirect(`${FRONTEND_URL}/admin/dashboard`);
        } else {
            res.redirect(`${FRONTEND_URL}/admin/dashboard?error=auth_failed`);
        }
    });
});

// Proxy endpoints for Admin API
app.get("/api/admin/products", async (req, res) => {
    try {
        const accessToken = getShopifyAccessToken();
        const shop = process.env.SHOPIFY_SHOP_DOMAIN || "sure-seal-sealants.myshopify.com";
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
        const shop = process.env.SHOPIFY_SHOP_DOMAIN || "sure-seal-sealants.myshopify.com";
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
        const shop = process.env.SHOPIFY_SHOP_DOMAIN || "sure-seal-sealants.myshopify.com";
        const headers = {
            "X-Shopify-Access-Token": accessToken,
            "Content-Type": "application/json"
        };
        const baseURL = `https://${shop}/admin/api/2024-01`;

        const [productCountRes, ordersRes] = await Promise.all([
            axios.get(`${baseURL}/products/count.json`, { headers }),
            axios.get(`${baseURL}/orders.json?status=any&limit=250`, { headers })
        ]);

        const productCount = productCountRes.data.count;
        const recentOrders = ordersRes.data.orders;
        const totalRevenue = recentOrders.reduce((sum, order) => sum + parseFloat(order.total_price), 0);

        const recentSales = recentOrders.slice(0, 5).map(order => ({
            name: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : "Guest",
            email: order.customer ? order.customer.email : "N/A",
            amount: `$${order.total_price}`
        }));

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

        const salesOverTime = monthNames.map(month => ({
            name: month,
            total: salesByMonth[month] || 0
        })).filter(item => item.total > 0 || true);

        res.json({
            productCount,
            totalRevenue,
            recentSales,
            salesOverTime,
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

// TEMP DEBUG
app.get("/api/debug/token", async (req, res) => {
    try {
        const accessToken = getShopifyAccessToken();
        const shop = process.env.SHOPIFY_SHOP_DOMAIN || "sure-seal-sealants.myshopify.com";

        // Create token
        const response = await axios.post(`https://${shop}/admin/api/2024-01/storefront_access_tokens.json`, {
            storefront_access_token: {
                title: "Seal Shine Auto Generated",
                access_scope: "unauthenticated_read_product_listings,unauthenticated_read_products"
            }
        }, {
            headers: {
                "X-Shopify-Access-Token": accessToken,
                "Content-Type": "application/json"
            }
        });

        res.json(response.data);
    } catch (e) {
        // If create fails (maybe already exists?), list them
        try {
            const accessToken = getShopifyAccessToken();
            const shop = process.env.SHOPIFY_SHOP_DOMAIN || "sure-seal-sealants.myshopify.com";
            const listRes = await axios.get(`https://${shop}/admin/api/2024-01/storefront_access_tokens.json`, {
                headers: {
                    "X-Shopify-Access-Token": accessToken,
                    "Content-Type": "application/json"
                }
            });
            res.json(listRes.data);
        } catch (err2) {
            res.status(500).json({ error: e.message, error2: err2.message });
        }
    }
});

// Helper to extract numeric ID from various formats (Base64 or plain GID)
function extractVariantId(id) {
    if (!id) return null;
    if (/^\d+$/.test(id)) return id;
    if (id.includes('gid://')) {
        return id.split('/').pop();
    }
    try {
        const decoded = Buffer.from(id, 'base64').toString('utf-8');
        if (decoded.includes('gid://')) {
            return decoded.split('/').pop();
        }
    } catch (e) {
        console.log("Failed to base64 decode ID:", id);
    }
    return id;
}

// Create Wholesale Checkout (Draft Order)
app.post("/api/create-wholesale-checkout", async (req, res) => {
    try {
        const { items, email } = req.body;
        const accessToken = getShopifyAccessToken();
        const shop = process.env.SHOPIFY_SHOP_DOMAIN || "sure-seal-sealants.myshopify.com";

        console.log(`Creating wholesale checkout for ${email} with ${items.length} items.`);

        const lineItems = items.map(item => {
            const numericId = extractVariantId(item.variantId);
            return {
                variant_id: numericId,
                quantity: item.quantity,
                price: item.customPrice,
            };
        });

        const payload = {
            draft_order: {
                line_items: lineItems,
                email: email,
                use_customer_default_address: true,
                tags: "wholesale_app_order",
            }
        };

        const response = await axios.post(`https://${shop}/admin/api/2024-01/draft_orders.json`, payload, {
            headers: {
                "X-Shopify-Access-Token": accessToken,
                "Content-Type": "application/json"
            }
        });

        const invoiceUrl = response.data.draft_order.invoice_url;
        console.log("Draft order created successfully:", invoiceUrl);
        res.json({ checkoutUrl: invoiceUrl });

    } catch (error) {
        console.error("Error creating draft order:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to create wholesale checkout" });
    }
});

// Root Health Check (Required: do not redirect)
app.get('/', (req, res) => {
    res.status(200).send("Seal Shine Backend is Running. OAuth endpoint: /auth?shop=sure-seal-sealants.myshopify.com");
});

// START
app.listen(PORT, () => {
    console.log(`Backend running on ${HOST}`);
    console.log(`Start OAuth flow: ${HOST}/auth?shop=sure-seal-sealants.myshopify.com`);
});
