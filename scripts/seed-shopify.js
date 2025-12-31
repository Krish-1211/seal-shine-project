
import fs from 'fs';
import path from 'path';

// CONFIGURATION
const SHOPIFY_STORE_DOMAIN = 'suresealsealants-2.myshopify.com'; // From your project config
const API_VERSION = '2024-01';

// MOCK DATA (Copied from src/lib/mockData.ts)
const PRODUCTS = [
    {
        title: "Grout, Tile & Stone Cleaner (Spray & Wipe)",
        body_html: "Ready to use, fast acting stain remover. Safe for all surfaces (avoid unsealed polished stone). Great for everyday use.",
        vendor: "Sure Seal",
        product_type: "Cleaners",
        variants: [
            { option1: "750ML", price: "29.95", sku: "GTS750U", inventory_management: "shopify", inventory_quantity: 100 }
        ],
        images: [{ src: "https://seal-shine-project-main.vercel.app/images/cleaner_gts750u_front.png" }]
    },
    {
        title: "Grout, Tile & Stone Cleaner Concentrate",
        body_html: "Concentrated heavy duty cleaner. Cleans toughest stains. Great for dirt removal and cleaning concrete. Recommended for use on sealed surfaces.",
        vendor: "Sure Seal",
        product_type: "Cleaners",
        variants: [
            { option1: "1 LTR", price: "45.00", sku: "GTS1U", inventory_management: "shopify", inventory_quantity: 50 },
            { option1: "4 LTR", price: "160.00", sku: "GTS4U", inventory_management: "shopify", inventory_quantity: 20 },
            { option1: "20 LTR", price: "700.00", sku: "GTS20D", inventory_management: "shopify", inventory_quantity: 5 }
        ]
    },
    {
        title: "Eff-Plus Remover",
        body_html: "Removes efflorescence, grout haze, cement, and rust stains.",
        vendor: "Sure Seal",
        product_type: "Cleaners",
        variants: [
            { option1: "1 LTR", price: "35.00", sku: "EFFP1U" },
            { option1: "4 LTR", price: "120.00", sku: "EFFP4U" },
            { option1: "20 LTR", price: "550.00", sku: "EFFP20D" }
        ]
    },
    {
        title: "Sure Clean Porcelain Paste Cleaner",
        body_html: "Removes wax, grease, oil, and soap scum. Ideal for polished porcelain and natural stone.",
        vendor: "Sure Seal",
        product_type: "Cleaners",
        variants: [
            { option1: "1 LTR", price: "40.00", sku: "SC1U" },
            { option1: "4 LTR", price: "150.00", sku: "SC4U" }
        ]
    },
    {
        title: "Rug, Carpet & Textile Stain Remover",
        body_html: "Fast acting stain remover. Safe & easy to use. For rugs, carpet, car mats & more.",
        vendor: "Sure Seal",
        product_type: "Cleaners",
        variants: [
            { option1: "750ML", price: "24.95", sku: "RCSR750U" }
        ]
    },
    {
        title: "Grout, Tile & Stone Sealer (Quick Drying)",
        body_html: "World's First Aerosol Sealer. Long lasting stain protection. Resists water and oil based stains.",
        vendor: "Sure Seal",
        product_type: "Aerosols",
        variants: [
            { option1: "300g", price: "39.95", sku: "QDAU" }
        ]
    },
    {
        title: "Grout, Tile & Stone Sealer (Slow Drying)",
        body_html: "Ideal for stone bench tops. Deep penetrating sealer. Long lasting stain protection.",
        vendor: "Sure Seal",
        product_type: "Aerosols",
        variants: [
            { option1: "300g", price: "39.95", sku: "SDAU" }
        ]
    },
    {
        title: "Rug & Carpet Protector",
        body_html: "Protects from oil and water-based stains. Will not affect dyes or cause shrinkage.",
        vendor: "Sure Seal",
        product_type: "Aerosols",
        variants: [
            { option1: "350g", price: "34.95", sku: "RCPAU" }
        ]
    },
    {
        title: "Timber Sealer",
        body_html: "Preserves & Extends. Quick drying & easy to apply. Suitable for raw & stained timber.",
        vendor: "Sure Seal",
        product_type: "Aerosols",
        variants: [
            { option1: "300g", price: "34.95", sku: "TSAU" }
        ]
    },
    {
        title: "Ezy As 1-2-3 Water-Based Sealer",
        body_html: "Create your own finish: Low sheen, semi-gloss or full gloss. Gloss up walls eg. natural stack stone walls.",
        vendor: "Sure Seal",
        product_type: "Sealers",
        variants: [
            { option1: "1 LTR", price: "55.00", sku: "QD1U_WB" }
        ]
    },
    {
        title: "Consolidator Sealer Water-Based",
        body_html: "Ideal around salt-water swimming pools. Hardens loose & friable surfaces.",
        vendor: "Sure Seal",
        product_type: "Sealers",
        variants: [
            { option1: "1 LTR", price: "59.00", sku: "SD1U_WB" }
        ]
    },
    {
        title: "Timber Sealer (Solvent)",
        body_html: "Preserves & Protects. Suitable for raw & stained timber. Protects against water & oil staining.",
        vendor: "Sure Seal",
        product_type: "Sealers",
        variants: [
            { option1: "1 LTR", price: "49.00", sku: "24P1U_S" }
        ]
    },
    {
        title: "Grout, Tile & Stone Sealer (Quick Drying Solvent)",
        body_html: "Superior protection for porous surfaces. Works great for terracotta.",
        vendor: "Sure Seal",
        product_type: "Sealers",
        variants: [
            { option1: "1 LTR", price: "65.00", sku: "QD1U_S" }
        ]
    },
    {
        title: "Grout, Tile & Stone Sealer (Slow Drying Solvent)",
        body_html: "Durable stain resistant protection for dense surfaces. Best for Marble & Granite application.",
        vendor: "Sure Seal",
        product_type: "Sealers",
        variants: [
            { option1: "1 LTR", price: "65.00", sku: "SD1U_S" }
        ]
    },
    {
        title: "24/7 Plus Stone & Concrete Sealer",
        body_html: "Water-based. Excellent for garden walls, retaining walls, decorative concrete and benches.",
        vendor: "Sure Seal",
        product_type: "Sealers",
        variants: [
            { option1: "1 LTR", price: "55.00", sku: "24P1U_WB" }
        ]
    },
    {
        title: "Premium Plus Sealer",
        body_html: "Gold Standard Sealer. Water-based, heavy duty penetrating sealer for commercial application.",
        vendor: "Sure Seal",
        product_type: "Sealers",
        variants: [
            { option1: "1 LTR", price: "75.00", sku: "PP1U" }
        ]
    }
];

async function seedShopify() {


    // Use OAuth token from memory (or fail if relying on it)
    let accessToken;
    try {
        // We might need to handle the case where "scripts" are run standalone.
        // For standalone, we still read .shopify_token for convenience
        const tokenPath = path.resolve('.shopify_token');
        if (fs.existsSync(tokenPath)) {
            accessToken = fs.readFileSync(tokenPath, 'utf-8').trim();
            console.log("🔑 Using OAuth Access Token from .shopify_token");
        }
    } catch (e) { }

    if (!accessToken) {
        console.error("❌ Error: Access Token missing. Run 'node server.js' and visit /auth/shopify first.");
        process.exit(1);
    }

    console.log(`🚀 Starting product seed to ${SHOPIFY_STORE_DOMAIN}...`);

    for (const product of PRODUCTS) {
        try {
            // Map mock data to Shopify Product Input
            const shopifyProduct = {
                product: {
                    title: product.title,
                    body_html: product.body_html,
                    vendor: product.vendor,
                    product_type: product.product_type,
                    variants: product.variants,
                    images: product.images
                }
            };

            const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/products.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': accessToken
                },
                body: JSON.stringify(shopifyProduct)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`❌ Failed to create ${product.title}:`, JSON.stringify(errorData));
                continue;
            }

            const data = await response.json();
            console.log(`✅ Created: ${data.product.title} (ID: ${data.product.id})`);

            // Rate limiting pause
            await new Promise(resolve => setTimeout(resolve, 500));

        } catch (error) {
            console.error(`❌ Network error for ${product.title}:`, error);
        }
    }

    console.log("-----------------------------------");
    console.log("🎉 Seeding complete!");
}

seedShopify();
