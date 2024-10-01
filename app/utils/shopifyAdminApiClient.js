import { createAdminApiClient } from '@shopify/admin-api-client';
import '@shopify/shopify-api/adapters/node';

export const shopifyAdminApiClient = createAdminApiClient({
  storeDomain: process.env.SHOPIFY_SHOP_NAME,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  apiVersion: '2024-07',
});