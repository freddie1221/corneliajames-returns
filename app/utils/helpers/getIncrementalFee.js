
export default function getIncrementalFee({restockingFeePercentage, discountedSubtotal, taxRate}) {
  
  const amountExTax = (discountedSubtotal / (1 + taxRate))
  const taxAmount = (discountedSubtotal - amountExTax)

  let incrementalFee = 0
  incrementalFee = (taxAmount * restockingFeePercentage / 100)

  return { incrementalFee }

}