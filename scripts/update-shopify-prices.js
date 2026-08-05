import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Price mapping of SKU (Product Order Code) -> New Retail Price
const PRICE_MAP = {
    // Cleaners
    "GTS750U": 18.40,
    "GTS1U": 21.95,
    "GTS4U": 80.60,
    "GTS20D": 342.25,
    "EFFP1U": 19.30,
    "EFFP4U": 59.34,
    "EFFP20D": 250.95,
    "SC1U": 31.95,
    "SC4U": 114.70,
    "SC20D": 393.75,
    "RCSR750U": 18.59,

    // Aerosols
    "QDAU": 36.95,
    "SDAU": 37.95,
    "RCPAU": 30.90,
    "TSAU": 36.90,
    "300A GR Aero": 37.95,

    // Sealers
    "EA1U": 36.80,
    "EA4U": 110.60,
    "EA20D": 339.90,
    "CONS1U": 73.85,
    "CONS4U": 248.90,
    "CONS20D": 1025.50,
    "TS1U": 59.95,
    "TS4U": 184.35,
    "TS20D": 783.50,
    "QD1U": 60.95,
    "QD4U": 184.95,
    "QD20D": 787.60,
    "SD1U": 74.30,
    "SD4U": 223.20,
    "SD20D": 923.90,
    "24P1U": 54.95,
    "24P4U": 178.00,
    "24P20D": 885.60,
    "PP1U": 76.99,
    "PP4U": 250.88,
    "PP20D": 1116.37
};

async function run() {
    const tokenPath = path.join(__dirname, '..', '.shopify_token');
    let accessToken = process.env.SHOPIFY_ADMIN_TOKEN;

    if (fs.existsSync(tokenPath)) {
        accessToken = fs.readFileSync(tokenPath, 'utf8').trim();
    }

    if (!accessToken) {
        console.error("Error: No Shopify Access Token found in .shopify_token or environment.");
        process.exit(1);
    }

    const shop = 'sure-seal-sealants.myshopify.com';
    const apiVersion = '2024-01';
    const headers = {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
    };

    console.log(`Connecting to Shopify: ${shop}`);
    console.log(`Fetching all products to update prices...`);

    try {
        const response = await fetch(`https://${shop}/admin/api/${apiVersion}/products.json?limit=250`, { headers });
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Failed to fetch products: ${response.status} - ${errText}`);
        }

        const data = await response.json();
        const products = data.products || [];

        console.log(`Found ${products.length} products on Shopify.`);
        let updatedCount = 0;
        let skipCount = 0;

        for (const product of products) {
            console.log(`\nProduct: "${product.title}"`);
            for (const variant of product.variants) {
                const sku = variant.sku;
                if (!sku) {
                    console.log(`  - Variant "${variant.title}" has no SKU. Skipping.`);
                    continue;
                }

                // Check if this is a wholesale variant (ends with -W or has "Wholesale" in name)
                const isWholesale = sku.endsWith('-W') || variant.title.toLowerCase().includes('wholesale');
                if (isWholesale) {
                    console.log(`  - Variant "${variant.title}" (${sku}) is a Wholesale variant. Skipping.`);
                    continue;
                }

                const targetPrice = PRICE_MAP[sku];
                if (targetPrice === undefined) {
                    console.log(`  - Variant "${variant.title}" SKU "${sku}" not found in price update mapping. Skipping.`);
                    continue;
                }

                const currentPrice = parseFloat(variant.price);
                if (currentPrice === targetPrice) {
                    console.log(`  - Variant "${variant.title}" (${sku}) price is already correct: $${currentPrice}.`);
                    skipCount++;
                    continue;
                }

                console.log(`  - Updating price for "${variant.title}" (${sku}): $${currentPrice} -> $${targetPrice}`);

                // Send request to update variant price
                const updateRes = await fetch(`https://${shop}/admin/api/${apiVersion}/variants/${variant.id}.json`, {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify({
                        variant: {
                            id: variant.id,
                            price: targetPrice.toFixed(2)
                        }
                    })
                });

                if (!updateRes.ok) {
                    const errText = await updateRes.text();
                    console.error(`    * FAILED to update variant ${variant.id}: ${errText}`);
                } else {
                    console.log(`    * Successfully updated.`);
                    updatedCount++;
                }

                // Small delay to respect rate limit (40 requests per second bucket)
                await new Promise(r => setTimeout(r, 250));
            }
        }

        console.log(`\nSync complete! Updated ${updatedCount} variants. Skipped ${skipCount} up-to-date variants.`);
    } catch (error) {
        console.error("Execution Error:", error);
    }
}

run();
