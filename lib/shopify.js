import { createAdminApiClient } from '@shopify/admin-api-client';
import '@shopify/shopify-api/adapters/node';


export async function getOrderDetails(id) {
  try {
    const client = createAdminApiClient({
      storeDomain: process.env.SHOPIFY_SHOP_NAME,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      apiVersion: '2024-07',
    });

    const query = `
    {
      order(id: "gid://shopify/Order/${id}") {
        id
        name
        createdAt
        customer {
          displayName
          email
          phone
        }
        shippingAddress {
          address1
          address2
          city
          country
          zip
        }
        totalPriceSet {
          presentmentMoney {
            amount
            currencyCode
          }
        }
        lineItems(first: 50) {
          nodes {
            id
            name
            quantity
            originalTotalSet {
              presentmentMoney {
                amount
                currencyCode
              }
            }
            image {
              url(transform: {maxHeight: 200})
            }
          }
        }
      }
    }
    `;
    
    const response = await client.request(query);
    return response.data.order;

    /*
    if (response && response.body && response.body.data && response.body.data.order) {
      console.log('Order Details:', JSON.stringify(response.body.data.order, null, 2));
      return response.body.data.order;
    } else {
      console.error('Unexpected response format:', JSON.stringify(response, null, 2));
      if (response.errors && response.errors.graphQLErrors) {
        console.error('GraphQL Errors:', response.errors.graphQLErrors);
      }
      return null;
    }
    */
  } catch (error) {
    console.error('Shopify API error:', error);
    return null;
  }
}