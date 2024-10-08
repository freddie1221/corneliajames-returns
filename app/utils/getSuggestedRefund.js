import '@shopify/shopify-api/adapters/node';
import { createAdminApiClient } from '@shopify/admin-api-client';
import { NextResponse } from 'next/server';
import getSuggestedRefundQuery from '../graphql/queries/getSuggestedRefundQuery';

export async function getSuggestedRefund(id) {
  const query = getSuggestedRefundQuery(id);
  
  try {
    const client = createAdminApiClient({
      storeDomain: process.env.SHOPIFY_SHOP_NAME,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      apiVersion: '2024-07',
    });

    const response = await client.request(query);
    const order = response.data.order;

    if (!response.data.order) {
      console.error('api error', response);
      return NextResponse.json({ response: response, error: 'Order not found' }, { status: 404 });
    }
    
    return order

  } catch (error) {
    console.error(`route.js GET Error [Order ID: ${id}]:`, error);


    if (error.response && error.response.status === 401) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

