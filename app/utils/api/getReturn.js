import { makeGraphQLRequest } from './makeGraphQLRequest';
import getReturnQuery from '@/app/graphql/queries/getReturnQuery';
import simplifyReturn from '../helpers/simplifyReturn';

export async function getReturn(id) {

  const query = getReturnQuery(id);
  const data = await makeGraphQLRequest(query);
  const returnData = simplifyReturn(data.return)

  return returnData
}

