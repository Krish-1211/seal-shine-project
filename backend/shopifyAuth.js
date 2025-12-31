
import fetch from "node-fetch";

let shopifyAccessToken = null;

export const startShopifyOAuth = (req, res) => {
    const shop = req.query.shop;

    const installUrl =
        `https://${shop}/admin/oauth/authorize` +
        `?client_id=${process.env.SHOPIFY_CLIENT_ID}` +
        `&scope=read_products,write_products,read_inventory,write_inventory,read_locations,read_files,write_files` +
        `&redirect_uri=${process.env.SHOPIFY_REDIRECT_URI}`;

    res.redirect(installUrl);
};

export const shopifyOAuthCallback = async (req, res) => {
    const { shop, code } = req.query;

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
    shopifyAccessToken = data.access_token;

    console.log("Shopify OAuth token stored successfully");

    res.send("Shopify connected successfully. You can close this tab.");
};

export const getShopifyAccessToken = () => {
    if (!shopifyAccessToken) {
        throw new Error("Shopify OAuth token not initialized. Run OAuth first.");
    }
    return shopifyAccessToken;
};
