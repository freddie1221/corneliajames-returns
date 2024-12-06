
export default function getIncrementalFee({restockingFeePercentage, discountedSubtotal, taxRate}) {

  const amountExTax = (discountedSubtotal / (1 + taxRate)).toFixed(2);
  const taxAmount = (discountedSubtotal - amountExTax).toFixed(2);
  const incrementalFee = (taxAmount * restockingFeePercentage / 100).toFixed(2);

  return { incrementalFee }

}