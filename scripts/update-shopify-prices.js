import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Price mapping of SKU (Product Order Code) -> New Retail Price (Inc. GST)
// and Wholesale SKU (ending with -W) -> New Wholesale Price (Excl. GST)
// Effective 1st of October 2026
const PRICE_MAP = {
    // Cleaners - Retail
    "GTS750U": 19.35,
    "GTS1U": 23.05,
    "GTS4U": 84.60,
    "GTS20D": 359.20,
    "EFFP1U": 20.25,
    "EFFP4U": 62.30,
    "EFFP20D": 263.40,
    "SC1U": 33.55,
    "SC4U": 120.40,
    "SC20D": 393.75,
    "RCSR750U": 19.55,

    // Cleaners - Wholesale (Excl. GST)
    "GTS750U-W": 10.88,
    "GTS1U-W": 12.70,
    "GTS4U-W": 45.35,
    "GTS20D-W": 181.40,
    "EFFP1U-W": 10.78,
    "EFFP4U-W": 32.99,
    "EFFP20D-W": 145.39,
    "SC1U-W": 18.01,
    "SC4U-W": 61.56,
    "SC20D-W": 242.40,
    "RCSR750U-W": 10.88,

    // Aerosols - Retail
    "QDAU": 38.79,
    "SDAU": 39.85,
    "RCPAU": 32.45,
    "TSAU": 38.75,
    "300A GR Aero": 39.85,
    "300AGRAero": 39.85,

    // Aerosols - Wholesale (Excl. GST)
    "QDAU-W": 20.51,
    "SDAU-W": 21.28,
    "RCPAU-W": 19.79,
    "TSAU-W": 20.78,
    "300A GR Aero-W": 21.00,
    "300AGRAero-W": 21.00,

    // Sealers - Retail
    "EA1U": 38.65,
    "EA4U": 116.10,
    "EA20D": 356.75,
    "CONS1U": 77.50,
    "CONS4U": 261.25,
    "CONS20D": 1076.30,
    "TS1U": 62.95,
    "TS4U": 193.50,
    "TS20D": 822.30,
    "QD1U": 63.99,
    "QD4U": 194.15,
    "QD20D": 826.60,
    "SD1U": 77.99,
    "SD4U": 234.25,
    "SD20D": 969.65,
    "24P1U": 57.70,
    "24P4U": 186.85,
    "24P20D": 929.45,
    "PP1U": 80.80,
    "PP4U": 263.30,
    "PP20D": 1171.65,

    // Sealers - Wholesale (Excl. GST)
    "EA1U-W": 20.94,
    "EA4U-W": 62.64,
    "EA20D-W": 244.27,
    "CONS1U-W": 38.70,
    "CONS4U-W": 128.19,
    "CONS20D-W": 538.13,
    "TS1U-W": 33.75,
    "TS4U-W": 111.64,
    "TS20D-W": 406.32,
    "QD1U-W": 33.94,
    "QD4U-W": 114.06,
    "QD20D-W": 413.25,
    "SD1U-W": 39.36,
    "SD4U-W": 129.63,
    "SD20D-W": 473.27,
    "24P1U-W": 31.74,
    "24P4U-W": 109.11,
    "24P20D-W": 473.27,
    "PP1U-W": 43.87,
    "PP4U-W": 144.29,
    "PP20D-W": 594.48
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
