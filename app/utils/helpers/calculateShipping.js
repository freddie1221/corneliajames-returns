
export default function calculateShipping({countryCode, exchangeRate}) {
  const domesticFee = process.env.DOMESTIC_SHIPPING_FEE
  const internationalFee = process.env.INTERNATIONAL_SHIPPING_FEE

  if(countryCode === 'GB') {
    return { 
      fee: parseFloat(domesticFee * exchangeRate).toFixed(2), 
      text: "Domestic Return Shipping",
      explainer: "When you confirm your return you'll get a link to Royal Mail QR code which can be used in any post office"
    }
  } else {
    return { 
      fee: parseFloat(internationalFee * exchangeRate).toFixed(2), 
      text: "International DHL Return Shipping",
      explainer: "Simply print label and book collection with DHL"
    }
  }
}