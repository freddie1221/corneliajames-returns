import getIncrementalFee from "./getIncrementalFee";
import getShippingService from "./getShippingService";

export default function calculateShippingFee(params) {
  // Check if any value is undefined
  if (Object.values(params).some(value => value === undefined)) {
    return 0;
  }

  const {
    restockingFeePercentage, 
    discountedSubtotal, 
    taxRate, 
    countryCode, 
    exchangeRate, 
    returnType,
    includeShipping
  } = params;

  
  console.log(`
    restockingFeePercentage: ${restockingFeePercentage}
    discountedSubtotal: ${discountedSubtotal}
    taxRate: ${taxRate}
    countryCode: ${countryCode}
    exchangeRate: ${exchangeRate}
    returnType: ${returnType}
    includeShipping: ${includeShipping}
  `);


  const { incrementalFee } = getIncrementalFee({restockingFeePercentage, discountedSubtotal, taxRate})
  
  
  let shippingFee = 0
  
  if(includeShipping && returnType === "Refund") {
    const { fee } = getShippingService({countryCode, exchangeRate})
    shippingFee = fee
  }

  console.log(`
    incrementalFee: ${incrementalFee}
    shippingFee: ${shippingFee}
  `);
  

  return incrementalFee + shippingFee
}