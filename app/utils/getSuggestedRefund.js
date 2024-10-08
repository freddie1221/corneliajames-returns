import '@shopify/shopify-api/adapters/node';
import { createAdminApiClient } from '@shopify/admin-api-client';
import { NextResponse } from 'next/server';
import getSuggestedRefundQuery from '../graphql/queries/getSuggestedRefundQuery';

export async function getSuggestedRefund(returnData) {

  const id = returnData.id
  const returnLineItems = returnData.items.map(item => ({
    returnLineItemId: item.id,
    quantity: item.quantity,
  }));

  console.log('id', id)
  console.log('returnLineItems', returnLineItems)


  const query = getSuggestedRefundQuery(id, returnLineItems);
  const client = createAdminApiClient({
    storeDomain: process.env.SHOPIFY_SHOP_NAME,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    apiVersion: '2024-07',
  });
  

  const response = await client.request(query);

  console.log('response', response.data)
  console.error('errors', response.errors)
  const suggestedRefund = response.data;

  return suggestedRefund

}

