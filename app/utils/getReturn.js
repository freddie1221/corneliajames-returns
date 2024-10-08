import { NextResponse } from 'next/server';
import '@shopify/shopify-api/adapters/node';
import { createAdminApiClient } from '@shopify/admin-api-client';
import getReturnQuery from '../graphql/queries/getReturnQuery';


export async function getReturn(id) {

  const client = createAdminApiClient({
    storeDomain: process.env.SHOPIFY_SHOP_NAME,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    apiVersion: '2024-07',
  });

  const query = getReturnQuery(id);
  const response = await client.request(query);

  return response.data
}

  /*
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shopify/returns/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch return');
    }
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching return:', error);
    return { data: null, error: 'Error loading return details. Please try again later.' };
  }
  */

