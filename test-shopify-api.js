import 'dotenv/config';
import fetch from 'node-fetch';

const SHOPIFY_STORE_DOMAIN = process.env.VITE_SHOPIFY_STORE_DOMAIN || 'suresealsealants-2.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = '2024-01'; // The version we just switched to

const query = `
  query GetProducts {
    products(first: 5) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

console.log(`Testing connection to: https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`);
console.log(`Token present: ${!!SHOPIFY_STOREFRONT_TOKEN}`); // Don't log the actual token for security

async function testApi() {
    try {
        const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
            },
            body: JSON.stringify({ query })
        });

        console.log(`Status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            const text = await response.text();
            console.log('Error Body:', text);
            return;
        }

        const data = await response.json();
        console.log('Data:', JSON.stringify(data, null, 2));

        if (data.errors) {
            console.error('GraphQL Errors:', data.errors);
        } else {
            console.log('SUCCESS: Products fetched!');
        }

    } catch (error) {
        console.error('Network Error:', error);
    }
}

testApi();
