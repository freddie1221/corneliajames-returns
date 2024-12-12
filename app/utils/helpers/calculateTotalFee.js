
export default function calculateTotalFee({ feePercentage = 0, discountedSubtotal, taxRate, returnType, shippingFee, countryCode}) {

  // this is backend only

  // console.log("discountedSubtotal", discountedSubtotal)

  if(returnType === "Credit") {
    return { calculatedTotalFee: discountedSubtotal }
  }

  const restockingFee = (discountedSubtotal * feePercentage)

  const taxDeduction = countryCode !== "GB" 
  ? discountedSubtotal - (discountedSubtotal / (1 + taxRate))
  : 0;
  
  const calculatedTotalFee = shippingFee + restockingFee + taxDeduction
  // console.log("taxDeduction", taxDeduction)
  // console.log("shippingFee", shippingFee)
  // console.log("restockingFee", restockingFee)
  // console.log("calculatedTotalFee", calculatedTotalFee)


  return { calculatedTotalFee, taxDeduction, restockingFee }

}