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
  }
`;