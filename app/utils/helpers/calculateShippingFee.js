import getIncrementalFee from "./getIncrementalFee";

export default function calculateShippingFee(params) {
  
  if (Object.values(params).some(value => value === undefined)) {
    return 0;
  }

  const {
    restockingFeePercentage, 
    discountedSubtotal, 
    taxRate, 
    shippingService,
    returnType,
    includeShipping
  } = params;

  const { incrementalFee } = getIncrementalFee({restockingFeePercentage, discountedSubtotal, taxRate})
 
  let shippingFee = 0
  if(includeShipping && returnType === "Refund") {
    const { fee } = shippingService
    shippingFee = fee
  }


  return { incrementalFee, shippingFee }
}