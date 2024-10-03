import { RETURN_FIELDS_FRAGMENT } from '@/app/utils/graphql/fragments/graphqlFragments';

const getReturnQuery = (id) => `
  ${RETURN_FIELDS_FRAGMENT}
  {
    return(id: "gid://shopify/Return/${id}") {
      ...ReturnFields
    }
  }
  
`;

export default getReturnQuery;