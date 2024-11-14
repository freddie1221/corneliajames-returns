

export default function calculateFee(returnType, itemsCount) {
  let fee = 15;
  if(returnType === 'Credit') {
    fee = 100;
  }
  return fee
}