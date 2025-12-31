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
    if (!shop) return res.status(400).send("Missing shop parameter");

    const installUrl =
        `https://${shop}/admin/oauth/authorize` +
        `?client_id=${process.env.SHOPIFY_CLIENT_ID}` +
        `&scope=read_products,write_products,read_inventory,write_inventory,read_locations,read_files,write_files,read_orders,write_orders,read_customers,write_customers` +
        `&redirect_uri=${process.env.SHOPIFY_REDIRECT_URI}`;

    res.redirect(installUrl);
};

export const shopifyOAuthCallback = async (req, res) => {
    const { shop, code } = req.query;

    if (!code || !shop) {
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
            res.send("Shopify connected successfully. You can close this tab and return to the dashboard.");
        } else {
            console.error("Failed to get access token:", data);
            res.status(500).send("Failed to get access token");
        }
    } catch (error) {
        console.error("Error exchanging code for token:", error);
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
        throw new Error("Shopify OAuth token not initialized. Run OAuth first.");
    }
    return shopifyAccessToken;
};
