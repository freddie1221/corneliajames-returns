

export default function simplifyReturn(returnData) {

  console.log(returnData)
  
  const items = returnData.returnLineItems.nodes.map(item => {
    return {
      id: item.id,
      quantity: item.quantity,
      returnReasonNote: item.returnReasonNote,
      returnReason: item.returnReason,
      name: item.fulfillmentLineItem.lineItem.name,
      image: item.fulfillmentLineItem.lineItem.image.url,
      restockingFee: item.restockingFee?.percentage || 0,
    }
  })

  returnData =  {
    name: returnData.name,
    status: returnData.status,
    totalQuantity: returnData.totalQuantity,
    id: returnData.id,
    orderId: returnData.order.id.split('/').pop(),
    items: items,
    currency: "GBP",
    countryCode: returnData.order.shippingAddress.countryCodeV2,
    shippingAddress: returnData.order.shippingAddress,
    restockingFeePercentage: parseFloat(items[0].restockingFee),
    returnType: parseFloat(items[0].restockingFee) === 100 ? 'Credit' : 'Refund',
    returnShippingFee: returnData.returnShippingFees?.[0].amountSet.presentmentMoney.amount,
    reverseFulfillmentOrderId: returnData.reverseFulfillmentOrders.nodes[0].id,
    reverseFulfillmentOrderLineItems: returnData.reverseFulfillmentOrders.nodes[0].lineItems.nodes,
    returnDocs: {
      label: returnData.reverseFulfillmentOrders.nodes[0].reverseDeliveries.nodes[0]?.deliverable.label.publicFileUrl,
      tracking: returnData.reverseFulfillmentOrders.nodes[0].reverseDeliveries.nodes[0]?.deliverable.tracking.url,
      number: returnData.reverseFulfillmentOrders.nodes[0].reverseDeliveries.nodes[0]?.deliverable.tracking.number,
      carrier: returnData.reverseFulfillmentOrders.nodes[0].reverseDeliveries.nodes[0]?.deliverable.tracking.carrierName,
    },
  }

  return returnData
}