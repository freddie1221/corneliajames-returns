import getSuggestedRefund from "@/lib/api/shopify/getSuggestedRefund";

export default async function getReturnSummary({returnData, order}) {

  const { returnValue, refundOutstanding, returnPrice } = await getSuggestedRefund(returnData)


  const totalFee = returnData.totalFee
  const amountRefunded = returnData.amountRefunded
  
  const taxDeduction = order.countryCode !== "GB" 
  ? returnValue - (returnValue / (1 + order.taxRate))
  : 0;
  
  const totalRefund = returnValue - totalFee

  const returnType = totalFee || amountRefunded || refundOutstanding > 0 ? "Refund" : "Credit"

  // how do I solve for scenario where there's no fee and no refund outstanding?
  // i can check how much refund was given

  if(returnType === "Credit") {
    return { 
      returnType,
      returnShipping: "Complimentary", 
      storeCreditAmount: returnPrice * 1.1,
      includeShipping: true,
    }
  }


  const itemsRequiresShipping = returnData.items.filter(item => item.requiresShipping)
  const itemsCount = itemsRequiresShipping.reduce((acc, item) => acc + item.quantity, 0)

  let restockingPercent = 0
  if(itemsCount > 3) {
    restockingPercent = 0.2
  } else if (itemsCount > 1) {
    restockingPercent = 0.1
  }
  
  const restockingFee = (returnValue - taxDeduction) * restockingPercent
  const shippingFee = totalFee - taxDeduction - restockingFee
  const includeShipping = shippingFee > 0
  const returnShipping = includeShipping ? order.currencyCode + " " + shippingFee.toFixed(2) : "Not Selected"

  
  return { returnType, refundOutstanding, totalRefund, taxDeduction, restockingFee, returnShipping, includeShipping }
}