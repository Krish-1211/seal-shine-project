import { useQuery } from "@tanstack/react-query";
import { ShopifyProduct, storefrontApiRequest, STOREFRONT_QUERY } from "@/lib/shopify";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export const useShopifyProducts = () => {
  return useQuery({
    queryKey: ["shopify-products"],
    queryFn: async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
        if (data?.data?.products?.edges?.length > 0) {
          return data.data.products.edges;
        }
        console.warn("Shopify API returned no products, falling back to mock data.");
        throw new Error("No products found");
      } catch (error) {
        console.warn("Using mock data due to API error:", error);
        // Fallback to MOCK_PRODUCTS
        return MOCK_PRODUCTS.map(p => ({
          node: {
            id: p.id,
            title: p.title,
            description: p.description,
            handle: p.id,
            productType: p.category,
            tags: [],
            priceRange: {
              minVariantPrice: {
                amount: p.price.toFixed(2),
                currencyCode: "AUD"
              }
            },
            images: {
              edges: (p.images && p.images.length > 0 ? p.images : [p.image]).map(url => ({
                node: {
                  url,
                  altText: p.title
                }
              }))
            },
            variants: {
              edges: p.sizes.map((size, idx) => ({
                node: {
                  id: `${p.id}-${idx}`, // Note: This will cause 404 in checkout if not replaced with real ID
                  title: size,
                  sku: p.codes && p.codes[idx] ? p.codes[idx] : "",
                  price: {
                    amount: p.price.toFixed(2),
                    currencyCode: "AUD"
                  },
                  availableForSale: true,
                  selectedOptions: [{
                    name: "Size",
                    value: size
                  }]
                }
              }))
            },
            options: [{
              name: "Size",
              values: p.sizes
            }]
          }
        })) as ShopifyProduct[];
      }
    },
  });
};

export const useShopifyProduct = (handle: string) => {
  return useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate latency

      const p = MOCK_PRODUCTS.find(product => product.id === handle);

      if (!p) {
        throw new Error("Product not found");
      }

      return {
        id: p.id,
        title: p.title,
        description: p.description,
        handle: p.id,
        productType: p.category,
        tags: [],
        priceRange: {
          minVariantPrice: {
            amount: p.price.toFixed(2),
            currencyCode: "AUD"
          }
        },
        images: {
          edges: (p.images && p.images.length > 0 ? p.images : [p.image]).map(url => ({
            node: {
              url,
              altText: p.title
            }
          }))
        },
        variants: {
          edges: p.sizes.map((size, idx) => ({
            node: {
              id: `${p.id}-${idx}`,
              title: size,
              sku: p.codes && p.codes[idx] ? p.codes[idx] : "",
              price: {
                amount: p.price.toFixed(2),
                currencyCode: "AUD"
              },
              availableForSale: true,
              selectedOptions: [{
                name: "Size",
                value: size
              }]
            }
          }))
        },
        options: [{
          name: "Size",
          values: p.sizes
        }]
      } as ShopifyProduct["node"];
    },
    enabled: !!handle,
  });
};
