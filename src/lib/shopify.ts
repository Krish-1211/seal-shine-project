import { toast } from "sonner";

export const SHOPIFY_API_VERSION = '2024-01';
export const SHOPIFY_STORE_PERMANENT_DOMAIN = 'sure-seal-sealants.myshopify.com';
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

// Token check removed for tokenless API support
// if (!SHOPIFY_STOREFRONT_TOKEN) {
//   console.error("❌ VITE_SHOPIFY_STOREFRONT_TOKEN is missing from .env! Product fetch will fail.");
// }

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    productType?: string;
    tags?: string[];
    category?: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          sku?: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

export const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
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
    }
  }
`;


// Helper to extract numeric ID from GraphQL ID
function getNumericId(id: string): string {
  if (!id) return '';
  try {
    // Check if it's already numeric
    if (/^\d+$/.test(id)) return id;

    // Check if it's a base64 encoded GID
    if (id.includes('gid://')) {
      // It might be already decoded if it looks like "gid://shopify/ProductVariant/123"
      const parts = id.split('/');
      return parts[parts.length - 1];
    }

    // Try decoding base64 if it's opaque
    const decoded = atob(id);
    if (decoded.includes('gid://')) {
      const parts = decoded.split('/');
      return parts[parts.length - 1];
    }

    return id;
  } catch (e) {
    return id;
  }
}


export async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active billing plan. Visit https://admin.shopify.com to upgrade.",
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

export async function createStorefrontCheckout(items: any[]): Promise<string> {
  const lineItems = items.map(item => {
    console.log("DEBUG CHECKOUT - Item Variant ID:", item.variantId); // Log incoming ID
    const variantId = getNumericId(item.variantId);
    console.log("DEBUG CHECKOUT - Parsed Numeric ID:", variantId);    // Log parsed result
    return `${variantId}:${item.quantity}`;
  });

  const checkoutUrl = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/cart/${lineItems.join(',')}`;
  return checkoutUrl;
}
