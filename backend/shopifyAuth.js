import fetch from "node-fetch";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TOKEN_PATH = path.join(__dirname, '..', '.shopify_token');

let shopifyAccessToken = null;

// Try to load token on startup
try {
    if (fs.existsSync(TOKEN_PATH)) {
        shopifyAccessToken = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
        console.log("Loaded Shopify token from file.");
    }
} catch (err) {
    console.error("Failed to load token:", err);
}

export const startShopifyOAuth = (req, res) => {
    const shop = req.query.shop;
    if (!shop) return res.status(400).send("Missing shop parameter. Example: /auth?shop=my-store.myshopify.com");

    const scopes = process.env.SHOPIFY_SCOPES || 'read_products,read_orders';
    const redirectUri = process.env.SHOPIFY_REDIRECT_URI;

    if (!redirectUri) {
        return res.status(500).send("SHOPIFY_REDIRECT_URI not set in environment variables");
    }

    const installUrl =
        `https://${shop}/admin/oauth/authorize` +
        `?client_id=${process.env.SHOPIFY_CLIENT_ID}` +
        `&scope=${scopes}` +
        `&redirect_uri=${redirectUri}`;

    console.log(`Initiating OAuth for ${shop}`);
    console.log(`Redirecting to: ${installUrl}`);

    res.redirect(installUrl);
};

export const shopifyOAuthCallback = async (req, res, next) => {
    const { shop, code } = req.query;

    if (!code || !shop) {
        console.error("Missing code or shop");
        if (next) return next(false);
        return res.status(400).send("Missing code or shop parameter");
    }

    try {
        const response = await fetch(
            `https://${shop}/admin/oauth/access_token`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    client_id: process.env.SHOPIFY_CLIENT_ID,
                    client_secret: process.env.SHOPIFY_CLIENT_SECRET,
                    code
                })
            }
        );

        const data = await response.json();

        if (data.access_token) {
            shopifyAccessToken = data.access_token;
            fs.writeFileSync(TOKEN_PATH, shopifyAccessToken);
            console.log("Shopify OAuth token stored successfully to", TOKEN_PATH);
            if (next) return next(true);
            res.send("Shopify connected successfully. You can close this tab and return to the dashboard.");
        } else {
            console.error("Failed to get access token:", data);
            if (next) return next(false);
            res.status(500).send("Failed to get access token");
        }
    } catch (error) {
        console.error("Error exchanging code for token:", error);
        if (next) return next(false);
        res.status(500).send("Internal Server Error");
    }
};

export const getShopifyAccessToken = () => {
    if (!shopifyAccessToken) {
        // Try reading again just in case
        if (fs.existsSync(TOKEN_PATH)) {
            shopifyAccessToken = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
            return shopifyAccessToken;
        }

        // AGGRESSIVE FALLBACK: Check every possible name the user might have used
        const staticToken = process.env.SHOPIFY_ADMIN_TOKEN ||
            process.env.SHOPIFY_ACCESS_TOKEN ||
            process.env.SHOPIFY_API_PASSWORD ||
            process.env.VITE_SHOPIFY_ADMIN_TOKEN;

        if (staticToken) {
            console.log("Using static Shopify token from environment variables.");
            return staticToken;
        }

        throw new Error("Shopify OAuth token not initialized and no static token found in .env. Please add SHOPIFY_ADMIN_TOKEN to .env");
    }
    return shopifyAccessToken;
};
