export const RETURN_FIELDS_FRAGMENT = `
  fragment ReturnFields on Return {
    name
    status
    totalQuantity
    id
    returnShippingFees {
      amountSet {
  			presentmentMoney {
          currencyCode
          amount
        }
      }
    }
    reverseFulfillmentOrders(first: 10) {
      nodes {
        id
        order {
          shippingAddress {
            countryCodeV2
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
    order {
      id
      shippingAddress {
        countryCodeV2
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
              image {
                url
              }
            }
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