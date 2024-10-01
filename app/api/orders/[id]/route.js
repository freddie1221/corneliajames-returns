import { createAdminApiClient } from '@shopify/admin-api-client';
import '@shopify/shopify-api/adapters/node';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;
  const query = `
      {
        order(id: "gid://shopify/Order/${id}") {
          id
          name
          createdAt
          email
          totalPriceSet {
            presentmentMoney {
              amount
              currencyCode
            }
          }
          shippingAddress {
            address1
            address2
            city
            country
            zip
          }
          customer {
            displayName
            email
            phone
          }
          fulfillments(first: 10) {
            status
            fulfillmentLineItems(first: 10) {
              nodes {
                lineItem {
                  name
                  image {
                    url
                  }
                  currentQuantity
                }
                quantity
                id
                originalTotalSet {
                  presentmentMoney {
                    amount
                    currencyCode
                  }
                }
                discountedTotalSet {
                  presentmentMoney {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    `;
  
  try {
    const client = createAdminApiClient({
      storeDomain: process.env.SHOPIFY_SHOP_NAME,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      apiVersion: '2024-07',
    });

    const response = await client.request(query);
    
    if (!response.data.order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(response.data.order);

  } catch (error) {
    console.error('Shopify API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}