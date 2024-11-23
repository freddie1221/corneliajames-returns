import { RETURN_FIELDS_FRAGMENT } from '../fragments/graphqlFragments';

const getReturnQuery = (id) => `
  ${RETURN_FIELDS_FRAGMENT}
  {
    return(id: "gid://shopify/Return/${id}") {
      ...ReturnFields
      order {
        id
        email
        shippingAddress {
          name
          company
          address1
          address2
          city
          provinceCode
          zip
          countryCodeV2
          phone
        }
        subtotalPriceSet {
          presentmentMoney {
            amount
            currencyCode
          }
        }
      }
      reverseFulfillmentOrders(first: 10) {
        nodes {
          id
          lineItems(first:100) {
            nodes {
              totalQuantity
              id
            }
          }
          reverseDeliveries(first: 10) {
            nodes {
              deliverable {
                ... on ReverseDeliveryShippingDeliverable {
                  label {
                    publicFileUrl
                  }
                  tracking {
                    number
                    carrierName
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default getReturnQuery;
