import '@shopify/shopify-api/adapters/node';
import { createAdminApiClient } from '@shopify/admin-api-client';
import { makeGraphQLRequest } from './makeGraphQLRequest';
import getReturnQuery from '@/app/graphql/queries/getReturnQuery';
import simplifyReturn from '../helpers/simplifyReturn';

export async function getReturn(id) {

  /*
  const client = createAdminApiClient({
    storeDomain: process.env.SHOPIFY_SHOP_NAME,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    apiVersion: '2024-07',
  });
  */

  const query = getReturnQuery(id);
  const data = await makeGraphQLRequest(query);
  const returnData = simplifyReturn(data.return)

  return returnData
}

