import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from "@/lib/shopify";

export const useShopifyProducts = () => {
  return useQuery({
    queryKey: ["shopify-products"],
    queryFn: async () => {
      const shopDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || "suresealsealants-2.myshopify.com";

      const response = await fetch(`https://${shopDomain}/api/2024-01/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: STOREFRONT_QUERY,
          variables: { first: 20 }
        })
      });

      if (!response.ok) {
        console.error("Shopify API Error:", response.status, response.statusText);
        throw new Error(`Shopify API failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.errors) {
        console.error("GraphQL Errors:", data.errors);
        throw new Error(data.errors[0].message);
      }

      return data.data.products.edges.map((edge: any) => edge.node) as ShopifyProduct["node"][];
    },
  });
};

export const useShopifyProduct = (handle: string) => {
  return useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      const shopDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || "suresealsealants-2.myshopify.com";
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

      const response = await fetch(`https://${shopDomain}/api/2024-01/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query,
          variables: { handle }
        })
      });

      if (!response.ok) {
        throw new Error(`Shopify API failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return data.data.productByHandle as ShopifyProduct["node"];
    },
    enabled: !!handle,
  });
};
