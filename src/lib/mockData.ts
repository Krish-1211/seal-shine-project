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
  surfaces: [
    { name: "Grout", image: "/placeholder.svg" },
    { name: "Tiles", image: "/placeholder.svg" },
    { name: "Fabric", image: "/placeholder.svg" },
    { name: "Rugs", image: "/placeholder.svg" },
    { name: "Upholstery", image: "/placeholder.svg" },
    { name: "Carpet", image: "/placeholder.svg" },
    { name: "Stone", image: "/placeholder.svg" },
    { name: "Leather", image: "/placeholder.svg" },
  ],
  offers: [
    {
      id: 1,
      title: "20% OFF All Grout Sealers",
      description: "Limited time offer. Protect your tiles today!",
      image: "/placeholder.svg",
      code: "GROUT20"
    },
    {
      id: 2,
      title: "New Stone Care Kit",
      description: "Complete protection for your natural stone surfaces.",
      image: "/placeholder.svg",
      code: "NEWSTONE"
    },
    {
      id: 3,
      title: "Free Shipping on Orders Over $100",
      description: "Australia-wide delivery.",
      image: "/placeholder.svg",
      code: "FREESHIP"
    }
  ]
};

export const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Sure Seal Grout Sealer",
    description: "Premium quick-drying aerosol grout sealer. Protects against stains and moisture.",
    price: 29.99,
    image: "/placeholder.svg",
    category: "Grout"
  },
  {
    id: "2",
    title: "Sure Seal Tile & Stone Sealer",
    description: "Advanced impregnator for all natural stone and tile surfaces.",
    price: 45.00,
    image: "/placeholder.svg",
    category: "Tiles"
  },
  {
    id: "3",
    title: "Fabric & Upholstery Protector",
    description: "Invisible barrier against spills and stains for all fabrics.",
    price: 35.50,
    image: "/placeholder.svg",
    category: "Fabric"
  },
  {
    id: "4",
    title: "Rug & Carpet Guard",
    description: "Heavy duty protection for high traffic areas.",
    price: 39.95,
    image: "/placeholder.svg",
    category: "Rugs"
  },
  {
    id: "5",
    title: "Leather Care Kit",
    description: "Clean, condition and protect your leather furniture.",
    price: 55.00,
    image: "/placeholder.svg",
    category: "Leather"
  }
];
