import { NextResponse } from 'next/server';
import { createAdminApiClient } from '@shopify/admin-api-client';
import '@shopify/shopify-api/adapters/node';
import { shopifyAdminApiClient } from '@/app/utils/shopifyAdminApiClient';

export async function POST(request) {

  const { returnInput } = await request.json(); // Parse the request body
  const variables = { returnInput: returnInput }; // Define variables separately

  const query = `
    mutation createReturn($returnInput: ReturnInput!) {
      returnCreate(returnInput: $returnInput)
      {
        return {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  try {
    const client = createAdminApiClient({
      storeDomain: process.env.SHOPIFY_SHOP_NAME,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      apiVersion: '2024-07',
    });

    const response = await client.request(query, { variables: variables });
    return NextResponse.json(response.data);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const query = `
    query getOpenReturns {
      order(id: "gid://shopify/Order/${id}") {
        returns(first: 10, query: "status:OPEN") {
          nodes {
            name
            id
            returnLineItems(first: 10) {
              nodes {
                ... on ReturnLineItem {
                  fulfillmentLineItem {
                    lineItem {
                      name
                      image {
                        url
                      }
                    }
                    discountedTotalSet {
                      presentmentMoney {
                        amount
                      }
                    }
                  }
                }
                quantity
                returnReasonNote
                returnReason
              }
            }
            status
          }
        }
      }
    }
  `

  try {
    const response = await shopifyAdminApiClient.request(query);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}