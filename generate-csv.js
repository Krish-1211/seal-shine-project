import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract mock product data manually from the file viewed previously
// We will generate a CSV that matches Shopify's import format
const PRODUCTS = [
    {
        handle: "grout-tile-stone-cleaner-spray-wipe",
        title: "Grout, Tile & Stone Cleaner (Spray & Wipe)",
        body_html: "Ready to use, fast acting stain remover. Safe for all surfaces (avoid unsealed polished stone). Great for everyday use.",
        vendor: "Sure Seal",
        product_category: "Cleaners",
        type: "Cleaners",
        tags: "cleaner, spray, wipe",
        published: "true",
        variant_price: "29.95",
        variant_sku: "GTS750U",
        image_src: "https://seal-shine-project-main.vercel.app/images/cleaner_gts750u_front.png"
    },
    {
        handle: "grout-tile-stone-cleaner-concentrate",
        title: "Grout, Tile & Stone Cleaner Concentrate",
        body_html: "Concentrated heavy duty cleaner. Cleans toughest stains. Great for dirt removal and cleaning concrete. Recommended for use on sealed surfaces.",
        vendor: "Sure Seal",
        product_category: "Cleaners",
        type: "Cleaners",
        tags: "cleaner, concentrate, heavy duty",
        published: "true",
        variant_price: "45.00",
        variant_sku: "GTS1U",
        image_src: "https://seal-shine-project-main.vercel.app/images/cleaner_gts1u_group.png"
    },
    {
        handle: "eff-plus-remover",
        title: "Eff-Plus Remover",
        body_html: "Removes efflorescence, grout haze, cement, and rust stains.",
        vendor: "Sure Seal",
        product_category: "Cleaners",
        type: "Cleaners",
        tags: "cleaner, efflorescence, rust",
        published: "true",
        variant_price: "35.00",
        variant_sku: "EFFP1U",
        image_src: "https://seal-shine-project-main.vercel.app/images/cleaner_effp1u_group.jpg"
    },
    {
        handle: "sure-clean-porcelain-paste-cleaner",
        title: "Sure Clean Porcelain Paste Cleaner",
        body_html: "Removes wax, grease, oil, and soap scum. Ideal for polished porcelain and natural stone.",
        vendor: "Sure Seal",
        product_category: "Cleaners",
        type: "Cleaners",
        tags: "cleaner, paste, porcelain",
        published: "true",
        variant_price: "40.00",
        variant_sku: "SC1U",
        image_src: "https://seal-shine-project-main.vercel.app/images/cleaner_sc1u_group.png"
    },
    {
        handle: "rug-carpet-textile-stain-remover",
        title: "Rug, Carpet & Textile Stain Remover",
        body_html: "Fast acting stain remover. Safe & easy to use. For rugs, carpet, car mats & more.",
        vendor: "Sure Seal",
        product_category: "Cleaners",
        type: "Cleaners",
        tags: "cleaner, carpet, rug",
        published: "true",
        variant_price: "24.95",
        variant_sku: "RCSR750U",
        image_src: "https://seal-shine-project-main.vercel.app/images/cleaner_rcsr750u_front.png"
    },
    {
        handle: "grout-tile-stone-sealer-quick-drying",
        title: "Grout, Tile & Stone Sealer (Quick Drying)",
        body_html: "World's First Aerosol Sealer. Used and recommended by many tilers & contractors. Long lasting stain protection. Resists water and oil based stains. Helps prevent mould & mildew.",
        vendor: "Sure Seal",
        product_category: "Aerosols",
        type: "Aerosols",
        tags: "sealer, aerosol, quick drying",
        published: "true",
        variant_price: "39.95",
        variant_sku: "QDAU",
        image_src: "https://seal-shine-project-main.vercel.app/images/sealer_gts300a_front.png"
    },
    {
        handle: "grout-tile-stone-sealer-slow-drying",
        title: "Grout, Tile & Stone Sealer (Slow Drying)",
        body_html: "Ideal for stone bench tops. Deep penetrating sealer. Long lasting stain protection. Resists water and oil based stains. Helps prevent mould & mildew.",
        vendor: "Sure Seal",
        product_category: "Aerosols",
        type: "Aerosols",
        tags: "sealer, aerosol, slow drying",
        published: "true",
        variant_price: "39.95",
        variant_sku: "SDAU",
        image_src: "https://seal-shine-project-main.vercel.app/images/sealer_sdau_front.png"
    },
    {
        handle: "rug-carpet-protector",
        title: "Rug & Carpet Protector",
        body_html: "Protects from oil and water-based stains. Will not affect dyes or cause shrinkage. Suitable for Oriental & Persian rugs & carpet, lounge suites & car upholstery.",
        vendor: "Sure Seal",
        product_category: "Aerosols",
        type: "Aerosols",
        tags: "protector, aerosol, carpet",
        published: "true",
        variant_price: "34.95",
        variant_sku: "RCPAU",
        image_src: "https://seal-shine-project-main.vercel.app/images/sealer_rcpau_front.png"
    },
    {
        handle: "timber-sealer-aerosol",
        title: "Timber Sealer",
        body_html: "Preserves & Extends. Quick drying & easy to apply. Suitable for raw & stained timber. Oil & stain resistant.",
        vendor: "Sure Seal",
        product_category: "Aerosols",
        type: "Aerosols",
        tags: "sealer, aerosol, timber",
        published: "true",
        variant_price: "34.95",
        variant_sku: "TSAU",
        image_src: "https://seal-shine-project-main.vercel.app/images/sealer_tsau_front.png"
    },
    {
        handle: "ezy-as-1-2-3-water-based-sealer",
        title: "Ezy As 1-2-3 Water-Based Sealer",
        body_html: "Create your own finish: Low sheen, semi-gloss or full gloss. Gloss up walls eg. natural stack stone walls. Will maintain a tough, durable finish that resists abrasion.",
        vendor: "Sure Seal",
        product_category: "Sealers",
        type: "Sealers",
        tags: "sealer, water based",
        published: "true",
        variant_price: "55.00",
        variant_sku: "QD1U_WB",
        image_src: "https://seal-shine-project-main.vercel.app/images/sealer_ezyas1l_group.jpg"
    },
    {
        handle: "consolidator-sealer-water-based",
        title: "Consolidator Sealer Water-Based",
        body_html: "Ideal around salt-water swimming pools. Hardens loose & friable surfaces. Helps prevent saltwater erosion. Binds stone.",
        vendor: "Sure Seal",
        product_category: "Sealers",
        type: "Sealers",
        tags: "sealer, water based, pool",
        published: "true",
        variant_price: "59.00",
        variant_sku: "SD1U_WB",
        image_src: "https://seal-shine-project-main.vercel.app/images/sealer_sd1u_wb_group.jpg"
    },
    {
        handle: "timber-sealer-solvent",
        title: "Timber Sealer (Solvent)",
        body_html: "Preserves & Protects. Suitable for raw & stained timber. Protects against water & oil staining. Invisible protection.",
        vendor: "Sure Seal",
        product_category: "Sealers",
        type: "Sealers",
        tags: "sealer, solvent, timber",
        published: "true",
        variant_price: "49.00",
        variant_sku: "24P1U_S",
        image_src: "https://seal-shine-project-main.vercel.app/images/sealer_24p1u_s_front.jpg"
    },
    {
        handle: "grout-tile-stone-sealer-quick-drying-solvent",
        title: "Grout, Tile & Stone Sealer (Quick Drying Solvent)",
        body_html: "Superior protection for porous surfaces. Works great for terracotta. Protects from mould and thaw damage. Ideal for low temperature application.",
        vendor: "Sure Seal",
        product_category: "Sealers",
        type: "Sealers",
        tags: "sealer, solvent, quick drying",
        published: "true",
        variant_price: "65.00",
        variant_sku: "QD1U_S",
        image_src: "https://seal-shine-project-main.vercel.app/images/sealer_qd1u_s_group.jpg"
    },
    {
        handle: "grout-tile-stone-sealer-slow-drying-solvent",
        title: "Grout, Tile & Stone Sealer (Slow Drying Solvent)",
        body_html: "Durable stain resistant protection for dense surfaces. Best for Marble & Granite application. Slower drying for greater penetration. Helps prevent mould and mildew.",
        vendor: "Sure Seal",
        product_category: "Sealers",
        type: "Sealers",
        tags: "sealer, solvent, slow drying",
        published: "true",
        variant_price: "65.00",
        variant_sku: "SD1U_S",
        image_src: "https://seal-shine-project-main.vercel.app/images/sealer_sd1u_s_group.jpg"
    },
    {
        handle: "24-7-plus-stone-concrete-sealer",
        title: "24/7 Plus Stone & Concrete Sealer",
        body_html: "Water-based. Excellent for garden walls, retaining walls, decorative concrete and benches. Life for up to 10 years. Allows the treated surface to breathe.",
        vendor: "Sure Seal",
        product_category: "Sealers",
        type: "Sealers",
        tags: "sealer, water based, stone, concrete",
        published: "true",
        variant_price: "55.00",
        variant_sku: "24P1U_WB",
        image_src: "https://seal-shine-project-main.vercel.app/images/sealer_24p1u_wb_group.jpg"
    },
    {
        handle: "premium-plus-sealer",
        title: "Premium Plus Sealer",
        body_html: "Gold Standard Sealer. Water-based, heavy duty penetrating sealer for commercial application. Promotes easier clean up. Long life sealer for up to 15 years. Ideal for high-traffic areas.",
        vendor: "Sure Seal",
        product_category: "Sealers",
        type: "Sealers",
        tags: "sealer, premium, heavy duty",
        published: "true",
        variant_price: "75.00",
        variant_sku: "PP1U",
        image_src: "https://seal-shine-project-main.vercel.app/images/sealer_pp1u_group.jpg"
    }
];

// CSV Header
let csvContent = "Handle,Title,Body (HTML),Vendor,Product Category,Type,Tags,Published,Variant Price,Variant SKU,Image Src\n";

// Add rows
PRODUCTS.forEach(product => {
    // Escape quotes in body html if needed, though simple replacement is robust enough for this data
    const safeBody = `"${product.body_html.replace(/"/g, '""')}"`;
    const safeTitle = `"${product.title.replace(/"/g, '""')}"`;

    csvContent += `${product.handle},${safeTitle},${safeBody},${product.vendor},${product.product_category},${product.type},"${product.tags}",${product.published},${product.variant_price},${product.variant_sku},${product.image_src}\n`;
});

fs.writeFileSync(path.join(__dirname, 'shopify_products.csv'), csvContent);
console.log("shopify_products.csv created successfully!");
