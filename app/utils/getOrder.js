import '@shopify/shopify-api/adapters/node';
import { createAdminApiClient } from '@shopify/admin-api-client';
import { NextResponse } from 'next/server';
import getOrderQuery from '../graphql/queries/getOrderQuery';
import simplifyOrder from './simplifyOrder';
import noCacheHeaders from './noCacheHeaders';


export async function getOrder(id) {
  const query = getOrderQuery(id);
  
  try {
    const client = createAdminApiClient({
      storeDomain: process.env.SHOPIFY_SHOP_NAME,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      apiVersion: '2024-07',
    });

    const response = await client.request(query);
    const data = response.data.order;

    if (!data) {
      console.error('api error', response);
      throw new Error('Order not found');
    }

    const order = simplifyOrder(data);
    return order;

  } catch (error) {
    console.error(`getOrder Error [Order ID: ${id}]:`, error);
    throw error;
  }
}

