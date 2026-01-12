import { Product } from "./mockData";

export interface PriceResult {
    price: number;
    originalPrice?: number; // Retail price (only present if discounted)
    isWholesalePrice: boolean;
    displayPrice: string;
    description?: string;
}

// If a specific variant price is provided, we can look up wholesale price by index usually... 
// But we need the index to find the wholesale counterpart. 
// Let's modify the signature to accept index or just handle simple case of flat wholesalePrice if index not provided
// BUT we need to support "variantIndex" now as planned.

export const getProductPrice = (product: Product, isWholesale: boolean, variantIndex?: number): PriceResult => {
    // Standard retail price calculation
    let currentRetailPrice = product.price;
    if (variantIndex !== undefined && product.prices && product.prices[variantIndex] !== undefined) {
        currentRetailPrice = product.prices[variantIndex];
    } else if (variantIndex === undefined && product.prices && product.prices.length > 0) {
        // Default to first price? Or keep base price
        currentRetailPrice = product.prices[0] || product.price;
    }

    if (!isWholesale) {
        return {
            price: currentRetailPrice,
            isWholesalePrice: false,
            displayPrice: `$${currentRetailPrice.toFixed(2)}`
        };
    }

    // Wholesale calculation
    let currentWholesalePrice: number | undefined;

    if (variantIndex !== undefined) {
        // Try getting from array at index
        if (product.wholesalePrices && product.wholesalePrices[variantIndex] !== undefined) {
            currentWholesalePrice = product.wholesalePrices[variantIndex];
        }
    } else {
        // Default index 0
        if (product.wholesalePrices && product.wholesalePrices.length > 0) {
            currentWholesalePrice = product.wholesalePrices[0];
        }
    }

    // Fallback to old field if array missing or index fail
    if (currentWholesalePrice === undefined) {
        currentWholesalePrice = product.wholesalePrice;
    }

    if (currentWholesalePrice === undefined) {
        // No wholesale price found, show retail
        return {
            price: currentRetailPrice,
            isWholesalePrice: false,
            displayPrice: `$${currentRetailPrice.toFixed(2)}`
        };
    }

    return {
        price: currentWholesalePrice,
        originalPrice: currentRetailPrice,
        isWholesalePrice: true,
        displayPrice: `$${currentWholesalePrice.toFixed(2)}`,
        description: "Trade Price (Exc. GST)"
    };
};
