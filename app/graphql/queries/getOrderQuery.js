import { RETURN_FIELDS_FRAGMENT } from '../fragments/graphqlFragments';

const getOrderQuery = (id) => `
  ${RETURN_FIELDS_FRAGMENT}
    {
      order(id: "gid://shopify/Order/${id}") {
        id
        name
        createdAt
        email
        returns(first: 95, query:"NOT status:CANCELED") {
          nodes {
            ...ReturnFields
          }
        }
        subtotalPriceSet {
          presentmentMoney {
            amount
            currencyCode
          }
        }
        totalDiscountsSet {
          presentmentMoney {
            amount
          }
        }
        shippingAddress {
          address1
          address2
          city
          countryCode
          country
          zip
        }
        customer {
          displayName
          email
          phone
        }
        fulfillments(first: 10) {
          status
          fulfillmentLineItems(first: 10) {
            nodes {
              lineItem {
                name
                requiresShipping
                image {
                  url
                }
                currentQuantity
                discountedUnitPriceAfterAllDiscountsSet {
                  presentmentMoney {
                    amount
                  }
                }
              }
              quantity
              id
              originalTotalSet {
                presentmentMoney {
                  amount
                  currencyCode
                }
              }
              discountedTotalSet {
                presentmentMoney {
                  amount
                }
              }
            }
          }
        }
      }
    }
`;

export default getOrderQuery;