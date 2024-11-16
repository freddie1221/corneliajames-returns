
export default function calculateShipping(countryCode) {
  const domesticFee = process.env.DOMESTIC_SHIPPING_FEE
  const internationalFee = process.env.INTERNATIONAL_SHIPPING_FEE

  if(countryCode === 'GB') {
    return { fee: parseFloat(domesticFee).toFixed(2), text: "Domestic Return Shipping" }
  } else {
    return { fee: parseFloat(internationalFee).toFixed(2), text: "International DHL Return Shipping" }
  }
}