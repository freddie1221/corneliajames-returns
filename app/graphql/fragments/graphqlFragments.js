export const RETURN_FIELDS_FRAGMENT = `
  fragment ReturnFields on Return {
    name
    status
    totalQuantity
    id
    order {
      id
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
    }
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