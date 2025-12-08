import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from "@/lib/shopify";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export const useShopifyProducts = () => {
  return useQuery({
    queryKey: ["shopify-products"],
    queryFn: async () => {
      // Return mock products mapped to Shopify structure
      return MOCK_PRODUCTS.map(mockProduct => ({
        id: mockProduct.id,
        title: mockProduct.title,
        description: mockProduct.description,
        handle: mockProduct.id,
        category: mockProduct.category,
        priceRange: {
          minVariantPrice: {
            amount: mockProduct.price.toString(),
            currencyCode: "AUD"
          }
        },
        images: {
          edges: mockProduct.images?.map(img => ({
            node: {
              url: img,
              altText: mockProduct.title
            }
          })) || [{
            node: {
              url: mockProduct.image,
              altText: mockProduct.title
            }
          }]
        },
        variants: {
          edges: mockProduct.sizes?.map((size, index) => ({
            node: {
              id: `${mockProduct.id}-${index}`,
              title: size,
              sku: mockProduct.codes?.[index] || mockProduct.id,
              price: {
                amount: mockProduct.price.toString(),
                currencyCode: "AUD"
              },
              availableForSale: true,
              selectedOptions: [{
                name: "Size",
                value: size
              }]
            }
          })) || [{
            node: {
              id: mockProduct.id,
              title: "Default Title",
              sku: mockProduct.id,
              price: {
                amount: mockProduct.price.toString(),
                currencyCode: "AUD"
              },
              availableForSale: true,
              selectedOptions: []
            }
          }]
        },
        options: mockProduct.sizes ? [{
          name: "Size",
          values: mockProduct.sizes
        }] : []
      })) as ShopifyProduct["node"][];
    },
  });
};

export const useShopifyProduct = (handle: string) => {
  return useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      // Try to find in mock data first
      const mockProduct = MOCK_PRODUCTS.find(p => p.id === handle);

      if (mockProduct) {
        // Convert mock product to Shopify structure
        return {
          id: mockProduct.id,
          title: mockProduct.title,
          description: mockProduct.description,
          handle: mockProduct.id,
          priceRange: {
            minVariantPrice: {
              amount: mockProduct.price.toString(),
              currencyCode: "AUD"
            }
          },
          images: {
            edges: mockProduct.images?.map(img => ({
              node: {
                url: img,
                altText: mockProduct.title
              }
            })) || [{
              node: {
                url: mockProduct.image,
                altText: mockProduct.title
              }
            }]
          },
          variants: {
            edges: mockProduct.sizes?.map((size, index) => ({
              node: {
                id: `${mockProduct.id}-${index}`,
                title: size,
                sku: mockProduct.codes?.[index] || mockProduct.id,
                price: {
                  amount: mockProduct.price.toString(),
                  currencyCode: "AUD"
                },
                availableForSale: true,
                selectedOptions: [{
                  name: "Size",
                  value: size
                }]
              }
            })) || [{
              node: {
                id: mockProduct.id,
                title: "Default Title",
                sku: mockProduct.id,
                price: {
                  amount: mockProduct.price.toString(),
                  currencyCode: "AUD"
                },
                availableForSale: true,
                selectedOptions: []
              }
            }]
          },
          options: mockProduct.sizes ? [{
            name: "Size",
            values: mockProduct.sizes
          }] : []
        } as ShopifyProduct["node"];
      }

      // Fallback to real API if not found in mock (though we expect all to be in mock now)
      const query = `
        query GetProduct($handle: String!) {
          productByHandle(handle: $handle) {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              name
              values
            }
          }
        }
      `;
      const data = await storefrontApiRequest(query, { handle });
      return data.data.productByHandle as ShopifyProduct["node"];
    },
    enabled: !!handle,
  });
};
