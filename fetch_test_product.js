import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const shop = process.env.SHOPIFY_SHOP_DOMAIN || "suresealsealants.myshopify.com";
// We need the Backend Admin Token to run this script directly
const accessToken = process.env.SHOPIFY_ADMIN_TOKEN;

if (!accessToken) {
    console.error("❌ SHOPIFY_ADMIN_TOKEN is missing from .env");
    process.exit(1);
}

// Handle to test
const HANDLE = "grout-tile-stone-cleaner-concentrate";

async function fetchProduct() {
    try {
        console.log(`Fetching product: ${HANDLE}...`);

        // 1. Get Product ID via Handle
        // Since Admin API doesn't lookup by handle easily in REST, we search/filter list or use GraphQL
        // Let's us GraphQL for precision
        const query = `
        {
            productByHandle(handle: "${HANDLE}") {
                id
                title
                variants(first: 20) {
                    edges {
                        node {
                            id
                            title
                            sku
                            price
                        }
                    }
                }
            }
        }`;

        const response = await axios.post(`https://${shop}/admin/api/2024-01/graphql.json`, { query }, {
            headers: {
                "X-Shopify-Access-Token": accessToken,
                "Content-Type": "application/json"
            }
        });

        const product = response.data.data.productByHandle;

        if (!product) {
            console.error("❌ Product not found! Did you import the CSV?");
            return;
        }

        console.log(`\n✅ FOUND: ${product.title} (${product.id})`);
        console.log("------------------------------------------------");
        console.log("Existing Variants:");
        product.variants.edges.forEach(({ node }) => {
            const isWholesale = node.sku.endsWith("-W") || node.title.toLowerCase().includes("wholesale");
            console.log(`• [${isWholesale ? "WHOLESALE" : "RETAIL  "}] ${node.title.padEnd(20)} | SKU: ${node.sku.padEnd(10)} | Price: $${node.price} | ID: ${node.id}`);
        });
        console.log("------------------------------------------------");

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    }
}

fetchProduct();
