export const RETURN_FIELDS_FRAGMENT = `
  fragment ReturnFields on Return {
    name
    status
    totalQuantity
    id
    order {
      id
    }
    returnLineItems(first: 10) {
      nodes {
        ... on ReturnLineItem {
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
        quantity
        returnReasonNote
        returnReason
      }
    }
  }
`;