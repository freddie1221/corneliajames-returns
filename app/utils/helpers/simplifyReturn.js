

export default function simplifyReturn(data) {

  const statusMap = {
    OPEN: 'Awaiting Items',
    CANCELLED: 'Cancelled',
    CLOSED: 'Complete',
  };

  
  const items = data.returnLineItems.nodes.map(item => {
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

  const returnData =  {
    name: data.name,
    status: statusMap[data.status] || data.status,
    totalQuantity: data.totalQuantity,
    id: data.id,
    orderId: data.order.id.split('/').pop(),
    items: items,
    email: data.order.email,
    currency: "GBP",
    countryCode: data.order.shippingAddress.countryCodeV2,
    shippingAddress: data.order.shippingAddress,
    restockingFeePercentage: parseFloat(items[0].restockingFee),
    returnType: parseFloat(items[0].restockingFee) === 100 ? 'Credit' : 'Refund',
    returnShippingFee: parseFloat(data.returnShippingFees?.[0]?.amountSet?.presentmentMoney?.amount || 0).toFixed(2),
    reverseFulfillmentOrderId: data.reverseFulfillmentOrders.nodes[0].id,
    reverseFulfillmentOrderLineItems: data.reverseFulfillmentOrders.nodes[0].lineItems.nodes,
    returnDocs: {
      label: data.reverseFulfillmentOrders.nodes[0].reverseDeliveries.nodes[0]?.deliverable.label.publicFileUrl,
      tracking: data.reverseFulfillmentOrders.nodes[0].reverseDeliveries.nodes[0]?.deliverable.tracking.url,
      number: data.reverseFulfillmentOrders.nodes[0].reverseDeliveries.nodes[0]?.deliverable.tracking.number,
      carrier: data.reverseFulfillmentOrders.nodes[0].reverseDeliveries.nodes[0]?.deliverable.tracking.carrierName,
    },
  }

  return returnData
}