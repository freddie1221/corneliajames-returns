import { makeGraphQLRequest } from './makeGraphQLRequest';
import validateOrderQuery from '../../graphql/queries/validateOrderQuery';

export async function validateOrder(email, orderNumber) {
  const query = validateOrderQuery(email, orderNumber);
  const data = await makeGraphQLRequest(query);
  return data.orders.nodes;
}