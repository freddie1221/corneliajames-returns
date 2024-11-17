import getOrderQuery from '../../graphql/queries/getOrderQuery';
import simplifyOrder from '../helpers/simplifyOrder';
import { makeGraphQLRequest } from './makeGraphQLRequest';

export async function getOrder(id) {
  const query = getOrderQuery(id);

  try {
    const data = await makeGraphQLRequest(query);

    if (!data.order) {
      console.error('API error: Order not found', data);
      throw new Error('Order not found');
    }
    const order = simplifyOrder(data.order);
    return order;
  
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching order:', error);
    // Propagate the error to be handled by the caller
    throw error;
  }
}