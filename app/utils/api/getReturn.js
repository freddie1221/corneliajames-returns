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
