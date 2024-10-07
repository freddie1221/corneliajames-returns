import '@shopify/shopify-api/adapters/node';
import { createAdminApiClient } from '@shopify/admin-api-client';
import { NextResponse } from 'next/server';
import getOrderQuery from '@/app/utils/graphql/queries/getOrderQuery';

export async function GET(req, { params }) {
  const { id } = params;
  const query = getOrderQuery(id);
  
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
    console.error(`route.js GET Error [Order ID: ${id}]:`, error);

    // Example: Differentiating between authentication and other errors
    if (error.response && error.response.status === 401) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}