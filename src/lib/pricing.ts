import { Product } from "./mockData";

export interface PriceResult {
    price: number;
    originalPrice?: number; // Retail price (only present if discounted)
    isWholesalePrice: boolean;
    displayPrice: string;
    description?: string;
}

export const getProductPrice = (product: Product, isWholesale: boolean): PriceResult => {
    // If not wholesale user, or no wholesale price exists, return standard price
    if (!isWholesale || !product.wholesalePrice) {
        return {
            price: product.price,
            isWholesalePrice: false,
            displayPrice: `$${product.price.toFixed(2)}`
        };
    }

    // Wholesale user AND wholesale price exists
    return {
        price: product.wholesalePrice,
        originalPrice: product.price,
        isWholesalePrice: true,
        displayPrice: `$${product.wholesalePrice.toFixed(2)}`,
        description: "Wholesale Price"
    };
};
