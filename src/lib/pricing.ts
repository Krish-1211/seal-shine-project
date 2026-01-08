import { Product } from "./mockData";

export interface PriceResult {
    price: number;
    originalPrice?: number; // Retail price (only present if discounted)
    isWholesalePrice: boolean;
    displayPrice: string;
    description?: string;
}

export const getProductPrice = (product: Product, isWholesale: boolean, priceOverride?: number): PriceResult => {
    // If a specific variant price is provided appropriately
    if (priceOverride !== undefined && priceOverride !== product.price) {
        return {
            price: priceOverride,
            isWholesalePrice: false,
            displayPrice: `$${priceOverride.toFixed(2)}`
        };
    }

    // If not wholesale user, or no wholesale price exists, return standard price
    if (!isWholesale || !product.wholesalePrice) {
        return {
            price: product.price,
            isWholesalePrice: false,
            displayPrice: `$${product.price.toFixed(2)}`
        };
    }

    // Wholesale user AND wholesale price exists (Only applies to default variant for now)
    return {
        price: product.wholesalePrice,
        originalPrice: product.price,
        isWholesalePrice: true,
        displayPrice: `$${product.wholesalePrice.toFixed(2)}`,
        description: "Wholesale Price"
    };
};
