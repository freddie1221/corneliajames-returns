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
        id
       	quantity
        returnReasonNote
        returnReason
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
      }
    }
  }
`;