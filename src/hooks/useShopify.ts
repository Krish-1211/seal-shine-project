import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from "@/lib/shopify";

export const useShopifyProducts = () => {
  return useQuery({
    queryKey: ["shopify-products"],
    queryFn: async () => {
      const shopDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || "suresealsealants-2.myshopify.com";
      const storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

      if (!storefrontToken) {
        console.error("❌ Missing VITE_SHOPIFY_STOREFRONT_TOKEN. Products cannot be fetched.");
        // We can't fetch without a token, so return empty to avoid 403 spam
        return [];
      }

      const response = await fetch(`https://${shopDomain}/api/2024-01/graphql.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": storefrontToken
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
