

const getSuggestedRefundQuery = (id, returnLineItems) => `
  {
    return(id: "${id}") {
      # You can use the suggested refund object to later generate an actual refund.
      suggestedRefund(
        returnRefundLineItems: ${returnLineItems}
      ) {
        # The total monetary value to be refunded.
        amount {
          shopMoney {
            amount
          }
        } 
        # The shipping costs to be refunded from the order.
        shipping {
          maximumRefundableSet {
            shopMoney {
              amount
            }
          }
        }
        # A list of line items to be refunded, along with restock instructions.
        refundDuties {
          amountSet {
            shopMoney {
              amount
            }
          }
        }
        # The sum of all the prices of the line items being refunded.
        subtotal {
          shopMoney {
            amount
          }
        }
        # A list of suggested order transactions.
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
`

export default getSuggestedRefundQuery;