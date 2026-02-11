
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
    // If it's already just numbers, return it
    if (/^\d+$/.test(id)) return id;

    // If it looks like a plain GID string (not base64)
    if (id.includes('gid://')) {
        return id.split('/').pop();
    }

    // Try Base64 decode
    try {
        const decoded = Buffer.from(id, 'base64').toString('utf-8');
        if (decoded.includes('gid://')) {
            return decoded.split('/').pop();
        }
    } catch (e) {
        console.log("Failed to base64 decode ID:", id);
    }
    return id; // fallback
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
            // Log if we have a weird ID
            if (!numericId || !/^\d+$/.test(numericId)) {
                console.warn(`WARNING: Variant ID '${item.variantId}' parsed to '${numericId}', which might not be numeric.`);
            }
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
        if (error.response?.data?.errors) {
            console.error("Shopify Validation Errors:", JSON.stringify(error.response.data.errors, null, 2));
        }
        res.status(500).json({ error: "Failed to create wholesale checkout" });
    }
});

// --------------------------------------------------------------------------
// INVENTORY SYNC WEBHOOK
// --------------------------------------------------------------------------
app.post("/webhooks/orders/create", async (req, res) => {
    // 1. Acknowledge immediately to stop Shopify from retrying
    res.status(200).send("Webhook received");

    try {
        const order = req.body;
        console.log(`📦 New Order ${order.name} received. Processing inventory sync...`);

        const accessToken = getShopifyAccessToken();
        const shop = process.env.SHOPIFY_SHOP_DOMAIN || "sure-seal-sealants.myshopify.com";
        const headers = {
            "X-Shopify-Access-Token": accessToken,
            "Content-Type": "application/json"
        };

        for (const item of order.line_items) {
            const soldSku = item.sku;
            const quantitySold = item.quantity;

            if (!soldSku) continue;

            // 2. Calculate the "Target SKU" we want to subtract from
            let targetSku = null;
            if (soldSku.endsWith("-W")) {
                // Wholesale sold -> Subtract from Retail
                targetSku = soldSku.replace("-W", "");
            } else {
                // Retail sold -> Subtract from Wholesale
                targetSku = `${soldSku}-W`;
            }

            console.log(`Checking sync for: Sold ${soldSku} -> Updating ${targetSku}`);

            // 3. Find the Target Variant
            // Since we use the "Duplicate Variants" strategy, both variants are on the same product.
            // We fetch the product to find the sibling variant.
            if (!item.product_id) continue;

            const productRes = await axios.get(`https://${shop}/admin/api/2024-01/products/${item.product_id}.json`, { headers });
            const product = productRes.data.product;

            const targetVariant = product.variants.find(v => v.sku === targetSku);

            if (!targetVariant) {
                console.log(`⚠️  Target SKU ${targetSku} not found on product ${item.product_id}. Skipping.`);
                continue;
            }

            // 4. Adjust Inventory
            // We need the inventory_item_id and location_id
            const inventoryItemId = targetVariant.inventory_item_id;

            // We use the location from the sold item's fulfillment service or default
            // Ideally we fetch location list, but usually there's one primary location.
            // Let's deduce location from the inventory_level of the target variant if possible, 
            // or just use the first available location ID.

            const inventoryLevelsRes = await axios.get(`https://${shop}/admin/api/2024-01/inventory_levels.json?inventory_item_ids=${inventoryItemId}`, { headers });
            const locationId = inventoryLevelsRes.data.inventory_levels[0]?.location_id;

            if (!locationId) {
                console.error(`❌ Could not find location_id for item ${targetSku}`);
                continue;
            }

            // Perform Adjustment (Subtract quantity)
            await axios.post(`https://${shop}/admin/api/2024-01/inventory_levels/adjust.json`, {
                location_id: locationId,
                inventory_item_id: inventoryItemId,
                available_adjustment: -quantitySold
            }, { headers });

            console.log(`✅ Synced:subtracted ${quantitySold} from ${targetSku}`);
        }

    } catch (error) {
        console.error("Error processing webhook:", error.response?.data || error.message);
    }
});

// Redirect root to frontend
app.get('/', (req, res) => {
    res.redirect(FRONTEND_URL);
});

// START
app.listen(PORT, () => {
    console.log(`Backend running on ${HOST}`);
    console.log(`Start OAuth flow: ${HOST}/auth/shopify?shop=suresealsealants.myshopify.com`);
    if (HOST.includes("localhost")) {
        console.log("⚠️  WARNING: Shopify Webhooks will NOT work on localhost unless you use ngrok.");
        console.log("👉  Run 'ngrok http 3000' and update your Webhook URL in Shopify Admin.");
    }
});
