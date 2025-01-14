import { RETURN_FIELDS_FRAGMENT } from '../fragments/graphqlFragments';
// ${RETURN_FIELDS_FRAGMENT}

const getReturnQuery = (id) => `
  {
    return(id: "gid://shopify/Return/${id}") {
      name
      status
      totalQuantity
      id
      order { 
        id
        currencyCode
        shippingAddress {
          countryCodeV2
        }
      }
      returnShippingFees {
        amountSet {
          presentmentMoney {
            currencyCode
            amount
          }
        }
      }
      returnLineItems(first: 10) {
        nodes {
          id
          quantity
          returnReasonNote
          returnReason
          ... on ReturnLineItem {
            restockingFee {
              percentage
            }

            fulfillmentLineItem {
              lineItem {
                name
                requiresShipping
                image {
                  url
                }
              }
            }
          }
        }
      }
      refunds(first: 10) {
        nodes {
          totalRefundedSet {
            presentmentMoney {
              amount
            }
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

/*
order {
        email
        statusPageUrl
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
        taxLines {
          rate
        }
        subtotalPriceSet {
          presentmentMoney {
            amount
            currencyCode
          }
        }
      }
      */