

export default function simplifyReturn(returnData) {
  
  const items = returnData.returnLineItems.nodes.map(item => {
    return {
      id: item.id,
      quantity: item.quantity,
      returnReasonNote: item.returnReasonNote,
      returnReason: item.returnReason,
      name: item.fulfillmentLineItem.lineItem.name,
      image: item.fulfillmentLineItem.lineItem.image.url,
      price: parseFloat(item.fulfillmentLineItem.originalTotalSet.presentmentMoney.amount),
      discount: parseFloat(item.fulfillmentLineItem.discountedTotalSet.presentmentMoney.amount),
      currencyCode: item.fulfillmentLineItem.originalTotalSet.presentmentMoney.currencyCode,
    }
  })

  returnData =  {
    name: returnData.name,
    status: returnData.status,
    totalQuantity: returnData.totalQuantity,
    id: returnData.id,
    orderId: returnData.order.id.split('/').pop(),
    items: items,
  }

  return returnData
}