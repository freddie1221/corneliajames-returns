import '@shopify/shopify-api/adapters/node';
import getOrderQuery from '../../graphql/queries/getOrderQuery';
import simplifyOrder from '../helpers/simplifyOrder';
import { makeGraphQLRequest } from './makeGraphQLRequest';

export async function getOrder(id) {
  const query = getOrderQuery(id);

  try {
    const data = await makeGraphQLRequest(query);

    if (!data.order) {
      console.error('API error', data);
      throw new Error('Order not found');
    }
    const order = simplifyOrder(data.order);
    return order;
  } catch (error) {
    throw error;
  }
}