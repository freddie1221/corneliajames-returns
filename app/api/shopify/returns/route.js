import { NextResponse } from 'next/server';
import { createAdminApiClient } from '@shopify/admin-api-client';
import { CREATE_RETURN_MUTATION } from '@/app/graphql/mutations/createReturn';
import '@shopify/shopify-api/adapters/node';


export async function POST(request) {

  const { returnInput } = await request.json(); // Parse the request body
  console.log('returnInput: ', returnInput);

  const variables = { returnInput: returnInput }; // Define variables separately

  const query = CREATE_RETURN_MUTATION;

  try {
    const client = createAdminApiClient({
      storeDomain: process.env.SHOPIFY_SHOP_NAME,
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      apiVersion: '2024-07',
    });

    const response = await client.request(query, { variables: variables });

    return NextResponse.json(response.data);

  } catch (error) {
    console.error('error: ', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}