import { CheckCircle2, ShieldCheck, Award, Sparkles } from "lucide-react";

export const SITE_CONTENT = {
  hero: {
    badge: "Awarded 'BEST NEW INDUSTRY PRODUCT' by Australian Tile Council",
    title: "Keep Surfaces Flawless for 20+ Years",
    subtitle: "It’s not sealed until it’s sure sealed!",
    description: "Sure Seal Sealants provides long-lasting, superior protection for a wide range of surfaces, including grout, tiles, stone, fabric, rugs, upholstery, carpet, and leather. Our premium sealants are engineered to protect against stains, make cleaning easier, and enhance the longevity of your surfaces.",
  },
  aboutSnippet: {
    title: "We Are Proud to Be the Trusted Choice in Surface Protection",
    description: "Since the introduction of its first product to the Australian market – the award winning, world’s first quick-drying aerosol grout and tile sealer – the company has experienced tremendous growth in the marketplace by providing a range of impregnators/sealants and cleaners for application in residential and commercial projects.",
  },
  features: [
    {
      title: "Unmatched Longevity",
      description: "Sure Seal products offer up to 20 years of protection, reducing the need for frequent reapplications.",
      icon: Award
    },
    {
      title: "Superior Stain Resistance",
      description: "Our advanced formulas create an invisible barrier that guards against spills and stains, keeping your surfaces cleaner for longer.",
      icon: ShieldCheck
    },
    {
      title: "Effortless Maintenance",
      description: "With Sure Seal, surfaces become easier to clean and maintain, preserving their beauty with minimal effort.",
      icon: Sparkles
    }
  ],
  categories: [
    { name: "Cleaners", image: "/seal-shine-project/images/cleaners.png" },
    { name: "Sealers", image: "/seal-shine-project/images/sealers_1.png" },
    { name: "Aerosols", image: "/seal-shine-project/images/aerosols.png" },
  ],
  offers: [
    {
      id: 1,
      title: "20% OFF All Grout Sealers",
      description: "Limited time offer. Protect your tiles today!",
      image: "/seal-shine-project/images/aerosols.png",
      code: "GROUT20"
    },
    {
      id: 2,
      title: "New Stone Care Kit",
      description: "Complete protection for your natural stone surfaces.",
      image: "/seal-shine-project/images/sealers_2.png",
      code: "NEWSTONE"
    },
    {
      id: 3,
      title: "Free Shipping on Orders Over $100",
      description: "Australia-wide delivery.",
      image: "/seal-shine-project/images/cleaners.png",
      code: "FREESHIP"
    }
  ]
};

export const MOCK_PRODUCTS = [
  // CLEANERS
  {
    id: "GTS750U",
    title: "Grout, Tile & Stone Cleaner (Spray & Wipe)",
    description: "Ready to use, fast acting stain remover. Safe for all surfaces (avoid unsealed polished stone). Great for everyday use.",
    price: 29.95,
    image: "/seal-shine-project/images/cleaner_gts750u_front.png",
    category: "Cleaners",
    sizes: ["750ML"],
    codes: ["GTS750U"],
    packageType: "Trigger Spray",
    technicalData: "/seal-shine-project/technical_data/grout,tileandstonecleaner(sprayandwipe).pdf",
    images: [
      "/seal-shine-project/images/cleaner_gts750u_front.png",
      "/seal-shine-project/images/cleaner_gts750u.png"
    ]
  },
  {
    id: "GTS1U",
    title: "Grout, Tile & Stone Cleaner Concentrate",
    description: "Concentrated heavy duty cleaner. Cleans toughest stains. Great for dirt removal and cleaning concrete. Recommended for use on sealed surfaces.",
    price: 45.00,
    image: "/seal-shine-project/images/cleaner_gts1u_group.png",
    category: "Cleaners",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["GTS1U", "GTS4U", "GTS20D"],
    packageType: "Unit / Drum",
    technicalData: "/seal-shine-project/technical_data/grout,tileandstonecleaner(concrete).pdf",
    images: [
      "/seal-shine-project/images/cleaner_gts1u_group.png",
      "/seal-shine-project/images/cleaner_gts1u.png"
    ]
  },
  {
    id: "EFFP1U",
    title: "Eff-Plus Remover",
    description: "Removes efflorescence, grout haze, cement, and rust stains.",
    price: 35.00,
    image: "/seal-shine-project/images/cleaner_effp1u_group.jpg",
    category: "Cleaners",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["EFFP1U", "EFFP4U", "EFFP20D"],
    packageType: "Unit / Drum",
    technicalData: "/seal-shine-project/technical_data/epfplusremover.pdf",
    images: [
      "/seal-shine-project/images/cleaner_effp1u_group.jpg",
      "/seal-shine-project/images/cleaner_effp1u.png"
    ]
  },
  {
    id: "SC1U",
    title: "Sure Clean Porcelain Paste Cleaner",
    description: "Heavy duty cleaning power. Removes wax, oil, grout haze and pencil marks. Safe to use, non toxic and not acidic.",
    price: 32.50,
    image: "/seal-shine-project/images/cleaner_sc1u_group.png",
    category: "Cleaners",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["SC1U", "SC4U", "SC20D"],
    packageType: "Unit / Drum",
    technicalData: "/seal-shine-project/technical_data/surecleanporcelaincleaner.pdf",
    images: [
      "/seal-shine-project/images/cleaner_sc1u_group.png",
      "/seal-shine-project/images/cleaner_sc1u.png"
    ]
  },
  {
    id: "RCSR750U",
    title: "Rug, Carpet & Textile Stain Remover",
    description: "Fast acting stain remover. Safe & easy to use. For rugs, carpet, car mats & more.",
    price: 24.95,
    image: "/seal-shine-project/images/cleaner_rcsr750u_front.png",
    category: "Cleaners",
    sizes: ["750ML"],
    codes: ["RCSR750U"],
    packageType: "Trigger Spray",
    images: [
      "/seal-shine-project/images/cleaner_rcsr750u_front.png",
      "/seal-shine-project/images/cleaner_rcsr750u.png"
    ]
  },

  // AEROSOLS
  {
    id: "QDAU",
    title: "Grout, Tile & Stone Sealer (Quick Drying)",
    description: "World's First Aerosol Sealer. Used and recommended by many tilers & contractors. Long lasting stain protection. Resists water and oil based stains. Helps prevent mould & mildew.",
    price: 39.95,
    image: "/seal-shine-project/images/sealer_gts300a_front.png",
    category: "Aerosols",
    sizes: ["300g"],
    codes: ["QDAU"],
    packageType: "Aerosol",
    technicalData: "/seal-shine-project/technical_data/groutandtilesealer.pdf",
    images: [
      "/seal-shine-project/images/sealer_gts300a_front.png",
      "/seal-shine-project/images/aerosol_grout_tile_stone_quick_drying.png"
    ]
  },
  {
    id: "SDAU",
    title: "Grout, Tile & Stone Sealer (Slow Drying)",
    description: "Ideal for stone bench tops. Deep penetrating sealer. Long lasting stain protection. Resists water and oil based stains. Helps prevent mould & mildew.",
    price: 39.95,
    image: "/seal-shine-project/images/sealer_sdau_front.png",
    category: "Aerosols",
    sizes: ["300g"],
    codes: ["SDAU"],
    packageType: "Aerosol",
    technicalData: "/seal-shine-project/technical_data/groutandtilesealer.pdf",
    images: [
      "/seal-shine-project/images/sealer_sdau_front.png",
      "/seal-shine-project/images/aerosol_grout_tile_stone_slow_drying.png"
    ]
  },
  {
    id: "RCPAU",
    title: "Rug & Carpet Protector",
    description: "Protects from oil and water-based stains. Will not affect dyes or cause shrinkage. Suitable for Oriental & Persian rugs & carpet, lounge suites & car upholstery.",
    price: 34.95,
    image: "/seal-shine-project/images/sealer_rcpau_front.png",
    category: "Aerosols",
    sizes: ["350g"],
    codes: ["RCPAU"],
    packageType: "Aerosol",
    technicalData: "/seal-shine-project/technical_data/Rugandcarpetprotector.pdf",
    images: [
      "/seal-shine-project/images/sealer_rcpau_front.png",
      "/seal-shine-project/images/aerosol_rug_carpet_protector.png"
    ]
  },
  {
    id: "TSAU",
    title: "Timber Sealer",
    description: "Preserves & Extends. Quick drying & easy to apply. Suitable for raw & stained timber. Oil & stain resistant.",
    price: 34.95,
    image: "/seal-shine-project/images/sealer_tsau_front.png",
    category: "Aerosols",
    sizes: ["300g"],
    codes: ["TSAU"],
    packageType: "Aerosol",
    technicalData: "/seal-shine-project/technical_data/TimberSealer(areosol).pdf",
    images: [
      "/seal-shine-project/images/sealer_tsau_front.png",
      "/seal-shine-project/images/aerosol_timber_sealer.png"
    ]
  },

  // SEALERS
  {
    id: "QD1U_WB",
    title: "Ezy As 1-2-3 Water-Based Sealer",
    description: "Create your own finish: Low sheen, semi-gloss or full gloss. Gloss up walls eg. natural stack stone walls. Will maintain a tough, durable finish that resists abrasion.",
    price: 55.00,
    image: "/seal-shine-project/images/sealer_ezyas1l_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["QD1U", "QD4U", "QD20D"],
    packageType: "Unit / Drum",
    images: [
      "/seal-shine-project/images/sealer_ezyas1l_group.jpg",
      "/seal-shine-project/images/ezy_as_1_2_3_water_based_sealer.png"
    ]
  },
  {
    id: "SD1U_WB",
    title: "Consolidator Sealer Water-Based",
    description: "Ideal around salt-water swimming pools. Hardens loose & friable surfaces. Helps prevent saltwater erosion. Binds stone.",
    price: 59.00,
    image: "/seal-shine-project/images/sealer_sd1u_wb_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["SD1U", "SD4U", "SD20D"],
    packageType: "Unit / Drum",
    technicalData: "/seal-shine-project/technical_data/consolidatorsealer.pdf",
    images: [
      "/seal-shine-project/images/sealer_sd1u_wb_group.jpg",
      "/seal-shine-project/images/consolidator_sealer_water_based.png"
    ]
  },
  {
    id: "24P1U_S",
    title: "Timber Sealer (Solvent)",
    description: "Preserves & Protects. Suitable for raw & stained timber. Protects against water & oil staining. Invisible protection.",
    price: 49.00,
    image: "/seal-shine-project/images/sealer_24p1u_s_front.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["24P1U", "24P4U", "24P20D"],
    packageType: "Unit / Drum",
    technicalData: "/seal-shine-project/technical_data/Timbersealer(solvent).pdf",
    images: [
      "/seal-shine-project/images/sealer_24p1u_s_front.jpg",
      "/seal-shine-project/images/timber_sealer_solvent.png"
    ]
  },
  {
    id: "QD1U_S",
    title: "Grout, Tile & Stone Sealer (Quick Drying Solvent)",
    description: "Superior protection for porous surfaces. Works great for terracotta. Protects from mould and thaw damage. Ideal for low temperature application.",
    price: 65.00,
    image: "/seal-shine-project/images/sealer_qd1u_s_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["QD1U", "QD4U", "QD20D"],
    packageType: "Unit / Drum",
    technicalData: "/seal-shine-project/technical_data/groutandtilesealer(quick drying).pdf",
    images: [
      "/seal-shine-project/images/sealer_qd1u_s_group.jpg",
      "/seal-shine-project/images/grout_tile_stone_sealer_quick_drying.png"
    ]
  },
  {
    id: "SD1U_S",
    title: "Grout, Tile & Stone Sealer (Slow Drying Solvent)",
    description: "Durable stain resistant protection for dense surfaces. Best for Marble & Granite application. Slower drying for greater penetration. Helps prevent mould and mildew.",
    price: 65.00,
    image: "/seal-shine-project/images/sealer_sd1u_s_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["SD1U", "SD4U", "SD20D"],
    packageType: "Unit / Drum",
    technicalData: "/seal-shine-project/technical_data/groutandtilesealer(slow drying).pdf",
    images: [
      "/seal-shine-project/images/sealer_sd1u_s_group.jpg",
      "/seal-shine-project/images/grout_tile_stone_sealer_slow_drying.png"
    ]
  },
  {
    id: "24P1U_WB",
    title: "24/7 Plus Stone & Concrete Sealer",
    description: "Water-based. Excellent for garden walls, retaining walls, decorative concrete and benches. Life for up to 10 years. Allows the treated surface to breathe.",
    price: 55.00,
    image: "/seal-shine-project/images/sealer_24p1u_wb_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["24P1U", "24P4U", "24P20D"],
    packageType: "Unit / Drum",
    images: [
      "/seal-shine-project/images/sealer_24p1u_wb_group.jpg",
      "/seal-shine-project/images/24_7_plus_stone_concrete_sealer.png"
    ]
  },
  {
    id: "PP1U",
    title: "Premium Plus Sealer",
    description: "Gold Standard Sealer. Water-based, heavy duty penetrating sealer for commercial application. Promotes easier clean up. Long life sealer for up to 15 years. Ideal for high-traffic areas.",
    price: 75.00,
    image: "/seal-shine-project/images/sealer_pp1u_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["PP1U", "PP4U", "PP20D"],
    packageType: "Bottle / Drum",
    images: [
      "/seal-shine-project/images/sealer_pp1u_group.jpg",
      "/seal-shine-project/images/premium_plus_sealer.png"
    ]
  }
];
