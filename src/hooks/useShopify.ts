import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from "@/lib/shopify";

export const useShopifyProducts = () => {
  return useQuery({
    queryKey: ["shopify-products"],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return data.data.products.edges.map((edge: any) => edge.node) as ShopifyProduct["node"][];
    },
  });
};

export const useShopifyProduct = (handle: string) => {
  return useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      const query = `
        query GetProduct($handle: String!) {
          productByHandle(handle: $handle) {
            id
            title
            description
            handle
            productType
            tags
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
