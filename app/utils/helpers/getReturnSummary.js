import getSuggestedRefund from "../api/getSuggestedRefund";

export default async function getReturnSummary(returnData) {

  const { returnValue, refundAmount } = await getSuggestedRefund(returnData)
  
  const totalFee = returnValue - refundAmount
  const returnType = totalFee === returnValue ? "Credit" : "Refund"

  if(returnType === "Credit") {
    return { 
      returnType,
      returnShipping: "Complimentary", 
      storeCreditAmount: returnValue * 1.1
    }
  }
  
  const taxDeduction = returnData.countryCode !== "GB" 
  ? returnValue - (returnValue / (1 + returnData.taxRate))
  : 0;

  const itemsRequiresShipping = returnData.items.filter(item => item.requiresShipping)
  const itemsCount = itemsRequiresShipping.reduce((acc, item) => acc + item.quantity, 0)

  let restockingPercent = 0
  if(itemsCount > 3) {
    restockingPercent = 0.2
  } else if (itemsCount > 1) {
    restockingPercent = 0.1
  }
  
  const restockingFee = (returnValue - taxDeduction) * restockingPercent
  const shippingFee = returnData.currency + " " + (totalFee - taxDeduction - restockingFee).toFixed(2)
  
  return { returnType, refundAmount, taxDeduction, restockingFee, returnShipping: shippingFee }
}