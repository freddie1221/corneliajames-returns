import '@shopify/shopify-api/adapters/node';
import { NextResponse } from 'next/server';
import { shopifyAdminApiClient } from '@/app/utils/shopifyAdminApiClient';

export async function GET(req, { params }) {
  const { id } = params;
  const query = `
    query getReturn {
      return(id: "gid://shopify/Return/${id}") {
        name
        status
        totalQuantity
        order {
          id
        }
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
            quantity
            returnReasonNote
            returnReason
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyAdminApiClient.request(query);

    return NextResponse.json(response.data);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
