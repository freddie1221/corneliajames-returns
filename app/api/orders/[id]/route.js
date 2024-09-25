import { createAdminApiClient } from '@shopify/admin-api-client';
import '@shopify/shopify-api/adapters/node';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;
  
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
              sku
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
    
    if (!response.data.order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(response.data.order);

  } catch (error) {
    console.error('Shopify API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}