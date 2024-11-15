export default function returnShipping(countryCode) {
  const domesticShippingFee = process.env.DOMESTIC_SHIPPING_FEE
  const internationalShippingFee = process.env.INTERNATIONAL_SHIPPING_FEE

  if(countryCode === 'GB') {
    return domesticShippingFee
  } else {
    return internationalShippingFee
  }
}