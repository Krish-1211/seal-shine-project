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
      title: "20% OFF All Grout Sealers",
      description: "Limited time offer. Protect your tiles today!",
      image: "/images/aerosols.png",
      code: "GROUT20"
    },
    {
      id: 2,
      title: "New Stone Care Kit",
      description: "Complete protection for your natural stone surfaces.",
      image: "/images/sealers_2.png",
      code: "NEWSTONE"
    },
    {
      id: 3,
      title: "Free Shipping on Orders Over $100",
      description: "Australia-wide delivery.",
      image: "/images/cleaners.png",
      code: "FREESHIP"
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
    price: 17.55,
    wholesalePrices: [12.76],
    image: "/images/cleaner_gts750u_front.png",
    category: "Cleaners",
    sizes: ["750ML"],
    codes: ["GTS750U"],
    packageType: "Trigger Spray",
    technicalData: "/technical_data/grout,tileandstonecleaner(sprayandwipe).pdf",
    images: [
      "/images/cleaner_gts750u_front.png",
      "/images/cleaner_gts750u.png"
    ]
  },
  {
    id: "GTS1U",
    title: "Grout, Tile & Stone Cleaner Concentrate",
    description: "Concentrated heavy duty cleaner. Cleans toughest stains. Great for dirt removal and cleaning concrete. Recommended for use on sealed surfaces.",
    price: 20.95,
    prices: [20.95, 76.95, 326.75],
    wholesalePrices: [15.24, 55.96, 237.64],
    image: "/images/cleaner_gts1u_group.png",
    category: "Cleaners",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["GTS1U", "GTS4U", "GTS20D"],
    packageType: "Unit / Drum",
    technicalData: "/technical_data/grout,tileandstonecleaner(concrete).pdf",
    variantIds: ["43226589855809", "43226589888577", "43226589921345"],
    images: [
      "/images/cleaner_gts1u_group.png",
      "/images/cleaner_gts1u.png"
    ]
  },
  {
    id: "EFFP1U",
    title: "Eff-Plus Remover",
    description: "Removes efflorescence, grout haze, cement, and rust stains.",
    price: 18.45,
    prices: [18.45, 56.65, 239.60],
    wholesalePrices: [13.42, 41.20, 174.25],
    image: "/images/cleaner_effp1u_group.jpg",
    category: "Cleaners",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["EFFP1U", "EFFP4U", "EFFP20D"],
    packageType: "Unit / Drum",
    technicalData: "/technical_data/epfplusremover.pdf",
    images: [
      "/images/cleaner_effp1u_group.jpg",
      "/images/eff_plus_remover.png"
    ]
  },
  {
    id: "SC1U",
    title: "Sure Clean Porcelain Paste Cleaner",
    description: "Removes wax, grease, oil, and soap scum. Ideal for polished porcelain and natural stone.",
    price: 30.50,
    prices: [30.50, 109.50, 375.90],
    wholesalePrices: [22.18, 79.64, 273.38],
    image: "/images/cleaner_sc1u_group.png",
    category: "Cleaners",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["SC1U", "SC4U", "SC20D"],
    packageType: "Tub / Drum",
    technicalData: "/technical_data/surecleanporcelaincleaner.pdf",
    images: [
      "/images/cleaner_sc1u_group.png",
      "/images/sure_clean_porcelain_cleaner.png"
    ]
  },
  {
    id: "RCSR750U",
    title: "Rug, Carpet & Textile Stain Remover",
    description: "Fast acting stain remover. Safe & easy to use. For rugs, carpet, car mats & more.",
    price: 17.75,
    wholesalePrices: [12.91],
    image: "/images/cleaner_rcsr750u_front.png",
    category: "Cleaners",
    sizes: ["750ML"],
    codes: ["RCSR750U"],
    packageType: "Trigger Spray",
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
    price: 34.95,
    wholesalePrices: [25.42],
    image: "/images/sealer_gts300a_front.png",
    category: "Aerosols",
    sizes: ["300g"],
    codes: ["QDAU"],
    packageType: "Aerosol",
    technicalData: "/technical_data/groutandtilesealer.pdf",
    images: [
      "/images/sealer_gts300a_front.png",
      "/images/aerosol_grout_tile_stone_quick_drying.png"
    ]
  },
  {
    id: "SDAU",
    title: "Grout, Tile & Stone Sealer (Slow Drying)",
    description: "Ideal for stone bench tops. Deep penetrating sealer. Long lasting stain protection. Resists water and oil based stains. Helps prevent mould & mildew.",
    price: 35.95,
    wholesalePrices: [26.15],
    image: "/images/sealer_sdau_front.png",
    category: "Aerosols",
    sizes: ["300g"],
    codes: ["SDAU"],
    packageType: "Aerosol",
    technicalData: "/technical_data/groutandtilesealer.pdf",
    images: [
      "/images/sealer_sdau_front.png",
      "/images/aerosol_grout_tile_stone_slow_drying.png"
    ]
  },
  {
    id: "RCPAU",
    title: "Rug & Carpet Protector",
    description: "Protects from oil and water-based stains. Will not affect dyes or cause shrinkage. Suitable for Oriental & Persian rugs & carpet, lounge suites & car upholstery.",
    price: 29.50,
    wholesalePrices: [21.45],
    image: "/images/sealer_rcpau_front.png",
    category: "Aerosols",
    sizes: ["350g"],
    codes: ["RCPAU"],
    packageType: "Aerosol",
    technicalData: "/technical_data/Rugandcarpetprotector.pdf",
    images: [
      "/images/sealer_rcpau_front.png",
      "/images/aerosol_rug_carpet_protector.png"
    ]
  },
  {
    id: "TSAU",
    title: "Timber Sealer",
    description: "Preserves & Extends. Quick drying & easy to apply. Suitable for raw & stained timber. Oil & stain resistant.",
    price: 35.25,
    wholesalePrices: [25.64],
    image: "/images/sealer_tsau_front.png",
    category: "Aerosols",
    sizes: ["300g"],
    codes: ["TSAU"],
    packageType: "Aerosol",
    technicalData: "/technical_data/TimberSealer(areosol).pdf",
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
    price: 35.20,
    prices: [35.20, 105.60, 324.50],
    wholesalePrices: [25.60, 76.80, 236.00],
    image: "/images/sealer_ezyas1l_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["EA1U", "EA4U", "EA20D"],
    packageType: "Unit / Drum",
    images: [
      "/images/sealer_ezyas1l_group.jpg",
      "/images/ezy_as_1_2_3_water_based_sealer.png"
    ]
  },
  {
    id: "CONS1U",
    title: "Consolidator Sealer Water-Based",
    description: "Ideal around salt-water swimming pools. Hardens loose & friable surfaces. Helps prevent saltwater erosion. Binds stone.",
    price: 70.50,
    prices: [70.50, 237.60, 979.00],
    wholesalePrices: [51.27, 172.80, 712.00],
    image: "/images/sealer_sd1u_wb_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["CONS1U", "CONS4U", "CONS20D"],
    packageType: "Unit / Drum",
    technicalData: "/technical_data/consolidatorsealer.pdf",
    images: [
      "/images/sealer_sd1u_wb_group.jpg",
      "/images/consolidator_sealer_water_based.png"
    ]
  },
  {
    id: "TS1U",
    title: "Timber Sealer (Solvent)",
    description: "Preserves & Protects. Suitable for raw & stained timber. Protects against water & oil staining. Invisible protection.",
    price: 57.25,
    prices: [57.25, 176.00, 748.00],
    wholesalePrices: [41.64, 128.00, 544.00],
    image: "/images/sealer_24p1u_s_front.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["TS1U", "TS4U", "TS20D"],
    packageType: "Unit / Drum",
    technicalData: "/technical_data/Timbersealer(solvent).pdf",
    images: [
      "/images/sealer_24p1u_s_front.jpg",
      "/images/timber_sealer_solvent.png"
    ]
  },
  {
    id: "QD1U",
    title: "Grout, Tile & Stone Sealer (Quick Drying Solvent)",
    description: "Superior protection for porous surfaces. Works great for terracotta. Protects from mould and thaw damage. Ideal for low temperature application.",
    price: 57.95,
    prices: [57.95, 176.50, 751.95],
    wholesalePrices: [42.15, 128.36, 546.87],
    image: "/images/sealer_qd1u_s_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["QD1U", "QD4U", "QD20D"],
    packageType: "Unit / Drum",
    technicalData: "/technical_data/groutandtilesealer(quick drying).pdf",
    images: [
      "/images/sealer_qd1u_s_group.jpg",
      "/images/grout_tile_stone_sealer_quick_drying.png"
    ]
  },
  {
    id: "SD1U",
    title: "Grout, Tile & Stone Sealer (Slow Drying Solvent)",
    description: "Durable stain resistant protection for dense surfaces. Best for Marble & Granite application. Slower drying for greater penetration. Helps prevent mould and mildew.",
    price: 70.95,
    prices: [70.95, 213.15, 882.00],
    wholesalePrices: [51.60, 155.02, 641.45],
    image: "/images/sealer_sd1u_s_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["SD1U", "SD4U", "SD20D"],
    packageType: "Unit / Drum",
    technicalData: "/technical_data/groutandtilesealer(slow drying).pdf",
    images: [
      "/images/sealer_sd1u_s_group.jpg",
      "/images/grout_tile_stone_sealer_slow_drying.png"
    ]
  },
  {
    id: "24P1U",
    title: "24/7 Plus Stone & Concrete Sealer",
    description: "Water-based. Excellent for garden walls, retaining walls, decorative concrete and benches. Life for up to 10 years. Allows the treated surface to breathe.",
    price: 52.50,
    prices: [52.50, 170.00, 845.50],
    wholesalePrices: [38.18, 123.64, 614.91],
    image: "/images/sealer_24p1u_wb_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["24P1U", "24P4U", "24P20D"],
    packageType: "Unit / Drum",
    variantIds: ["43225363513409"],
    images: [
      "/images/sealer_24p1u_wb_group.jpg",
      "/images/24_7_plus_stone_concrete_sealer.png"
    ]
  },
  {
    id: "PP1U",
    title: "Premium Plus Sealer",
    description: "Gold Standard Sealer. Water-based, heavy duty penetrating sealer for commercial application. Promotes easier clean up. Long life sealer for up to 15 years. Ideal for high-traffic areas.",
    price: 73.50,
    prices: [73.50, 239.50, 1065.75],
    wholesalePrices: [53.45, 174.18, 775.09],
    image: "/images/sealer_pp1u_group.jpg",
    category: "Sealers",
    sizes: ["1 LTR", "4 LTR", "20 LTR"],
    codes: ["PP1U", "PP4U", "PP20D"],
    packageType: "Bottle / Drum",
    variantIds: ["43258412171329", "43258412204097", "43258412236865"],
    wholesaleVariantIds: ["43258412269633", "43258412302401", "43258412335169"],
    images: [
      "/images/sealer_pp1u_group.jpg",
      "/images/premium_plus_sealer.png"
    ]
  }
];
