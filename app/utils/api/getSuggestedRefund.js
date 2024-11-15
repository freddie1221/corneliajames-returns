import '@shopify/shopify-api/adapters/node';
import { createAdminApiClient } from '@shopify/admin-api-client';
import getSuggestedRefundQuery from '../../graphql/queries/getSuggestedRefundQuery';

export default async function getSuggestedRefund(returnData) {

  const id = returnData.id;
  const returnLineItems = returnData.items.map(item => ({
    returnLineItemId: item.id,
    quantity: item.quantity,
  }));

  const variables = {
    id,
    returnRefundLineItems: returnLineItems,
  };

  const client = createAdminApiClient({
    storeDomain: process.env.SHOPIFY_SHOP_NAME,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
    apiVersion: '2024-07',
  });
  
  const response = await client.request(getSuggestedRefundQuery,  { variables: variables });
  const suggestedRefund = response.data.return.suggestedRefund.amount.presentmentMoney.amount;
  return suggestedRefund;

}