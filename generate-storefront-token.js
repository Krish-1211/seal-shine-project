import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const SHOPIFY_SHOP_DOMAIN = 'suresealsealants.myshopify.com';
const API_VERSION = '2024-01';

async function getStorefrontToken() {
    // 1. Get Admin Token
    let accessToken;
    try {
        const tokenPath = path.resolve('.shopify_token');
        if (fs.existsSync(tokenPath)) {
            accessToken = fs.readFileSync(tokenPath, 'utf-8').trim();
        }
    } catch (e) {
        console.error("Error reading .shopify_token:", e);
    }

    if (!accessToken) {
        console.log("NO_ADMIN_TOKEN");
        return;
    }

    // 2. List existing tokens
    try {
        const response = await fetch(`https://${SHOPIFY_SHOP_DOMAIN}/admin/api/${API_VERSION}/storefront_access_tokens.json`, {
            headers: {
                'X-Shopify-Access-Token': accessToken,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log("API_ERROR", response.status, await response.text());
            return;
        }

        const data = await response.json();
        const tokens = data.storefront_access_tokens;

        if (tokens && tokens.length > 0) {
            console.log("FOUND_TOKEN:", tokens[0].access_token);
        } else {
            // Create a new one
            const createRes = await fetch(`https://${SHOPIFY_SHOP_DOMAIN}/admin/api/${API_VERSION}/storefront_access_tokens.json`, {
                method: 'POST',
                headers: {
                    'X-Shopify-Access-Token': accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    storefront_access_token: {
                        title: "Seal Shine App",
                        access_scope: "unauthenticated_read_product_listings,unauthenticated_read_products,unauthenticated_read_product_inventory"
                    }
                })
            });
            const createData = await createRes.json();
            if (createData.storefront_access_token) {
                console.log("CREATED_TOKEN:", createData.storefront_access_token.access_token);
            } else {
                console.log("CREATE_FAILED", JSON.stringify(createData));
            }
        }

    } catch (error) {
        console.error("Network error:", error);
    }
}

getStorefrontToken();
