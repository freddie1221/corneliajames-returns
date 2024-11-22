const getSuggestedRefundQuery = `
query GetSuggestedRefund($id: ID!, $returnRefundLineItems: [ReturnRefundLineItemInput!]!) {
  return(id: $id) {
    suggestedRefund(
      returnRefundLineItems: $returnRefundLineItems
    ) {
        amount {
          presentmentMoney {
            amount
          }
        }
        discountedSubtotal {
          presentmentMoney {
            amount
          }
        }
      }
    }
  }
`;

export default getSuggestedRefundQuery;