
export default function calculateIncrementalFee({restockingFeePercentage, discountedSubtotal, taxRate}) {

  // console.log("restockingFeePercentage", restockingFeePercentage)
  // console.log("discountedSubtotal", discountedSubtotal)
  // console.log("taxRate", taxRate)
  
  const amountExTax = (discountedSubtotal / (1 + taxRate))
  const taxAmount = (discountedSubtotal - amountExTax)

  let incrementalFee = 0
  incrementalFee = (taxAmount * restockingFeePercentage / 100)

  return { incrementalFee }

}