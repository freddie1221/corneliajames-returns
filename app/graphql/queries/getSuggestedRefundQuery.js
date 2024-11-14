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
      refundDuties {
        amountSet {
          presentmentMoney {
            amount
          }
        }
      }
      suggestedTransactions {
        amountSet {
          shopMoney {
            amount
          }
        }
        gateway
        parentTransaction {
          kind
          id
        }
      }
    }
  }
}
`;

export default getSuggestedRefundQuery;