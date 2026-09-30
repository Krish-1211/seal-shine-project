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
    { name: "Cleaners", image: "/images/cleaners.png" },
    { name: "Sealers", image: "/images/sealers_1.png" },
    { name: "Aerosols", image: "/images/aerosols.png" },
  ],
  offers: [
    {
      id: 1,
      title: "Free Shipping on Orders Over $100",
      description: "Fast Australia-wide delivery for all our premium surface protection products.",
      image: "/images/free-shipping-hero.png",
      code: "FREESHIP"
    },
    {
      id: 2,
      title: "World's First Aerosol Sealants",
      description: "Our award-winning, quick-drying aerosol sealer revolutionized surface protection.",
      image: "/images/aerosol-hero.png",
    }
  ]
};

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  wholesalePrice?: number; // Legacy, can be ignored in favor of wholesalePrices
  wholesalePrices?: number[]; // Per-variant wholesale prices (Exc. GST)
  prices?: number[]; // Per-variant prices
  image: string;
  category: string;
  sizes: string[];
  codes: string[];
  packageType: string;
  technicalData?: string;
  images?: string[];
  variantIds?: string[];
  wholesaleVariantIds?: string[];
}

export const MOCK_PRODUCTS: Product[] = [
  // CLEANERS
  {
    id: "GTS750U",
    title: "Grout, Tile & Stone Cleaner (Spray & Wipe)",
    description: "Ready to use, fast acting stain remover. Safe for all surfaces (avoid unsealed polished stone). Great for everyday use.",
    price: 19.35,
    wholesalePrices: [10.88],
    image: "/images/cleaner_gts750u_front.png",
    category: "Cleaners",
    sizes: ["750ML"],
    codes: ["GTS750U"],
    packageType: "Trigger Spray",
    technicalData: "/technical_data/grout,tileandstonecleaner(sprayandwipe).pdf",
    variantIds: ["43918715256941"],
    wholesaleVariantIds: ["43918715289709"],
    images: [
      "/images/cleaner_gts750u_front.png",
      "/images/cleaner_gts750u.png"
    ]
  },
  {
    id: "GTS1U",
    title: "Grout, Tile & Stone Cleaner Concentrate",
    description: "Concentrated heavy duty cleaner. Cleans toughest stains. Great for dirt removal and cleaning concrete. Recommended for use on sealed surfaces.",
    price: 23.05,
    prices: [23.05, 84.60, 359.20],
    wholesalePrices: [12.70, 45.35, 181.40],
    image: "/images/gts1u_updated.jpg",
    category: "Cleaners",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["GTS1U", "GTS4U", "GTS20D"],
    packageType: "Unit / Drum",
    technicalData: "/technical_data/grout,tileandstonecleaner(concrete).pdf",
    variantIds: ["43918715322477", "43918715355245", "43918715388013"],
    wholesaleVariantIds: ["43918715420781", "43918715453549", "43918715486317"],
    images: [
      "/images/gts1u_updated.jpg",
      "/images/cleaner_gts1u.png"
    ]
  },
  {
    id: "EFFP1U",
    title: "Eff-Plus Remover",
    description: "Removes efflorescence, grout haze, cement, and rust stains.",
    price: 20.25,
    prices: [20.25, 62.30, 263.40],
    wholesalePrices: [10.78, 32.99, 145.39],
    image: "/images/cleaner_effp1u_group.jpg",
    category: "Cleaners",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["EFFP1U", "EFFP4U", "EFFP20D"],
    packageType: "Unit / Drum",
    technicalData: "/technical_data/epfplusremover.pdf",
    variantIds: ["43918715519085", "43918715551853", "43918715584621"],
    wholesaleVariantIds: ["43918715617389", "43918715650157", "43918715682925"],
    images: [
      "/images/cleaner_effp1u_group.jpg",
      "/images/eff_plus_remover.png"
    ]
  },
  {
    id: "SC1U",
    title: "Sure Clean Porcelain Paste Cleaner",
    description: "Removes wax, grease, oil, and soap scum. Ideal for polished porcelain and natural stone.",
    price: 33.55,
    prices: [33.55, 120.40, 393.75],
    wholesalePrices: [18.01, 61.56, 242.40],
    image: "/images/sure_clean_porcelain_cleaner_new.png",
    category: "Cleaners",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["SC1U", "SC4U", "SC20D"],
    packageType: "Tub / Drum",
    technicalData: "/technical_data/surecleanporcelaincleaner.pdf",
    variantIds: ["43918715715693", "43918715748461", "43918715781229"],
    wholesaleVariantIds: ["43918715813997", "43918715846765", "43918715879533"],
    images: [
      "/images/sure_clean_porcelain_cleaner_new.png"
    ]
  },
  {
    id: "RCSR750U",
    title: "Rug, Carpet & Textile Stain Remover",
    description: "Fast acting stain remover. Safe & easy to use. For rugs, carpet, car mats & more.",
    price: 19.55,
    wholesalePrices: [10.88],
    image: "/images/cleaner_rcsr750u_front.png",
    category: "Cleaners",
    sizes: ["750ML"],
    codes: ["RCSR750U"],
    packageType: "Trigger Spray",
    variantIds: ["43918715912301"],
    wholesaleVariantIds: ["43918715945069"],
    images: [
      "/images/cleaner_rcsr750u_front.png",
      "/images/cleaner_rcsr750u.png"
    ]
  },

  // AEROSOLS
  {
    id: "QDAU",
    title: "Grout, Tile & Stone Sealer (Quick Drying)",
    description: "World's First Aerosol Sealer. Used and recommended by many tilers & contractors. Long lasting stain protection. Resists water and oil based stains. Helps prevent mould & mildew.",
    price: 38.79,
    wholesalePrices: [20.51],
    image: "/images/sealer_gts300a_front.png",
    category: "Aerosols",
    sizes: ["300g"],
    codes: ["QDAU"],
    packageType: "Aerosol",
    technicalData: "/technical_data/groutandtilesealer.pdf",
    variantIds: ["43918715977837"],
    wholesaleVariantIds: ["43918716010605"],
    images: [
      "/images/sealer_gts300a_front.png",
      "/images/aerosol_grout_tile_stone_quick_drying.png"
    ]
  },
  {
    id: "SDAU",
    title: "Grout, Tile & Stone Sealer (Slow Drying)",
    description: "Ideal for stone bench tops. Deep penetrating sealer. Long lasting stain protection. Resists water and oil based stains. Helps prevent mould & mildew.",
    price: 39.85,
    wholesalePrices: [21.28],
    image: "/images/sealer_sdau_front.png",
    category: "Aerosols",
    sizes: ["300g"],
    codes: ["SDAU"],
    packageType: "Aerosol",
    technicalData: "/technical_data/groutandtilesealer.pdf",
    variantIds: ["43918716043373"],
    wholesaleVariantIds: ["43918716076141"],
    images: [
      "/images/sealer_sdau_front.png",
      "/images/aerosol_grout_tile_stone_slow_drying.png"
    ]
  },
  {
    id: "RCPAU",
    title: "Rug & Carpet Protector",
    description: "Protects from oil and water-based stains. Will not affect dyes or cause shrinkage. Suitable for Oriental & Persian rugs & carpet, lounge suites & car upholstery.",
    price: 32.45,
    wholesalePrices: [19.79],
    image: "/images/sealer_rcpau_front.png",
    category: "Aerosols",
    sizes: ["350g"],
    codes: ["RCPAU"],
    packageType: "Aerosol",
    technicalData: "/technical_data/Rugandcarpetprotector.pdf",
    variantIds: ["43918716108909"],
    wholesaleVariantIds: ["43918716141677"],
    images: [
      "/images/sealer_rcpau_front.png",
      "/images/aerosol_rug_carpet_protector.png"
    ]
  },
  {
    id: "TSAU",
    title: "Timber Sealer",
    description: "Preserves & Extends. Quick drying & easy to apply. Suitable for raw & stained timber. Oil & stain resistant.",
    price: 38.75,
    wholesalePrices: [20.78],
    image: "/images/sealer_tsau_front.png",
    category: "Aerosols",
    sizes: ["300g"],
    codes: ["TSAU"],
    packageType: "Aerosol",
    technicalData: "/technical_data/TimberSealer(areosol).pdf",
    variantIds: ["43918716174445"],
    wholesaleVariantIds: ["43918716207213"],
    images: [
      "/images/sealer_tsau_front.png",
      "/images/aerosol_timber_sealer.png"
    ]
  },

  // SEALERS
  {
    id: "EA1U",
    title: "Ezy As 1-2-3 Water-Based Sealer",
    description: "Create your own finish: Low sheen, semi-gloss or full gloss. Gloss up walls eg. natural stack stone walls. Will maintain a tough, durable finish that resists abrasion.",
    price: 38.65,
    prices: [38.65, 116.10, 356.75],
    wholesalePrices: [20.94, 62.64, 244.27],
    image: "/images/sealer_ezyas1l_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["EA1U", "EA4U", "EA20D"],
    packageType: "Unit / Drum",
    variantIds: ["43918716239981", "43918716272749", "43918716305517"],
    wholesaleVariantIds: ["43918716338285", "43918716371053", "43918716403821"],
    images: [
      "/images/sealer_ezyas1l_group.jpg",
      "/images/ezy_as_1_2_3_water_based_sealer.png"
    ]
  },
  {
    id: "CONS1U",
    title: "Consolidator Sealer Water-Based",
    description: "Ideal around salt-water swimming pools. Hardens loose & friable surfaces. Helps prevent saltwater erosion. Binds stone.",
    price: 77.50,
    prices: [77.50, 261.25, 1076.30],
    wholesalePrices: [38.70, 128.19, 538.13],
    image: "/images/sealer_sd1u_wb_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["CONS1U", "CONS4U", "CONS20D"],
    packageType: "Unit / Drum",
    technicalData: "/technical_data/consolidatorsealer.pdf",
    variantIds: ["43918716436589", "43918716469357", "43918716502125"],
    wholesaleVariantIds: ["43918716534893", "43918716567661", "43918716600429"],
    images: [
      "/images/sealer_sd1u_wb_group.jpg",
      "/images/consolidator_sealer_water_based.png"
    ]
  },
  {
    id: "TS1U",
    title: "Timber Sealer (Solvent)",
    description: "Preserves & Protects. Suitable for raw & stained timber. Protects against water & oil staining. Invisible protection.",
    price: 62.95,
    prices: [62.95, 193.50, 822.30],
    wholesalePrices: [33.75, 111.64, 406.32],
    image: "/images/sealer_24p1u_s_front.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["TS1U", "TS4U", "TS20D"],
    packageType: "Unit / Drum",
    technicalData: "/technical_data/Timbersealer(solvent).pdf",
    variantIds: ["43918716633197", "43918716665965", "43918716698733"],
    wholesaleVariantIds: ["43918716731501", "43918716764269", "43918716797037"],
    images: [
      "/images/sealer_24p1u_s_front.jpg",
      "/images/timber_sealer_solvent.png"
    ]
  },
  {
    id: "QD1U",
    title: "Grout, Tile & Stone Sealer (Quick Drying Solvent)",
    description: "Superior protection for porous surfaces. Works great for terracotta. Protects from mould and thaw damage. Ideal for low temperature application.",
    price: 63.99,
    prices: [63.99, 194.15, 826.60],
    wholesalePrices: [33.94, 114.06, 413.25],
    image: "/images/sealer_qd1u_s_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["QD1U", "QD4U", "QD20D"],
    packageType: "Unit / Drum",
    technicalData: "/technical_data/groutandtilesealer(quick drying).pdf",
    variantIds: ["43918716829805", "43918716862573", "43918716895341"],
    wholesaleVariantIds: ["43918716928109", "43918716960877", "43918716993645"],
    images: [
      "/images/sealer_qd1u_s_group.jpg",
      "/images/grout_tile_stone_sealer_quick_drying.png"
    ]
  },
  {
    id: "SD1U",
    title: "Grout, Tile & Stone Sealer (Slow Drying Solvent)",
    description: "Durable stain resistant protection for dense surfaces. Best for Marble & Granite application. Slower drying for greater penetration. Helps prevent mould and mildew.",
    price: 77.99,
    prices: [77.99, 234.25, 969.65],
    wholesalePrices: [39.36, 129.63, 473.27],
    image: "/images/sealer_sd1u_s_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["SD1U", "SD4U", "SD20D"],
    packageType: "Unit / Drum",
    technicalData: "/technical_data/groutandtilesealer(slow drying).pdf",
    variantIds: ["43918717026413", "43918717059181", "43918717091949"],
    wholesaleVariantIds: ["43918717124717", "43918717157485", "43918717190253"],
    images: [
      "/images/sealer_sd1u_s_group.jpg",
      "/images/grout_tile_stone_sealer_slow_drying.png"
    ]
  },
  {
    id: "24P1U",
    title: "24/7 Plus Stone & Concrete Sealer",
    description: "Water-based. Excellent for garden walls, retaining walls, decorative concrete and benches. Life for up to 10 years. Allows the treated surface to breathe.",
    price: 57.70,
    prices: [57.70, 186.85, 929.45],
    wholesalePrices: [31.74, 109.11, 473.27],
    image: "/images/sealer_24p1u_wb_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["24P1U", "24P4U", "24P20D"],
    packageType: "Unit / Drum",
    variantIds: ["43918717223021", "43918717255789", "43918717288557"],
    wholesaleVariantIds: ["43918717321325", "43918717354093", "43918717386861"],
    images: [
      "/images/sealer_24p1u_wb_group.jpg",
      "/images/24_7_plus_stone_concrete_sealer.png"
    ]
  },
  {
    id: "PP1U",
    title: "Premium Plus Sealer",
    description: "Gold Standard Sealer. Water-based, heavy duty penetrating sealer for commercial application. Promotes easier clean up. Long life sealer for up to 15 years. Ideal for high-traffic areas.",
    price: 80.80,
    prices: [80.80, 263.30, 1171.65],
    wholesalePrices: [43.87, 144.29, 594.48],
    image: "/images/sealer_pp1u_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["PP1U", "PP4U", "PP20D"],
    packageType: "Bottle / Drum",
    variantIds: ["43918717419629", "43918717452397", "43918717485165"],
    wholesaleVariantIds: ["43918717517933", "43918717550701", "43918717583469"],
    images: [
      "/images/sealer_pp1u_group.jpg",
      "/images/premium_plus_sealer.png"
    ]
  }
];
