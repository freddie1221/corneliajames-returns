import '@shopify/shopify-api/adapters/node';
import { NextResponse } from 'next/server';
import { shopifyAdminApiClient } from '@/app/utils/shopifyAdminApiClient';
import getReturnQuery from '@/app/utils/graphql/queries/getReturnQuery';

export async function GET({ params }) {
  const { id } = params;
  const query = getReturnQuery(id);

  try {
    const response = await shopifyAdminApiClient.request(query);

    return NextResponse.json(response.data);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
