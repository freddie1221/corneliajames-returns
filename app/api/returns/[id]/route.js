import '@shopify/shopify-api/adapters/node';
import { createAdminApiClient } from '@shopify/admin-api-client';
import { NextResponse } from 'next/server';
import getReturnQuery from '@/app/utils/graphql/queries/getReturnQuery';

export async function GET(req, { params }) {
  const { id } = params;
  const query = getReturnQuery(id);

  try {
    const client = createAdminApiClient({
      storeDomain: process.env.SHOPIFY_SHOP_NAME,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      apiVersion: '2024-07',
    });

    const response = await client.request(query);

    return NextResponse.json(response.data);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
