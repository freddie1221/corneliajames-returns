import mapReturnStatus from "../helpers/mapReturnStatus";

export default function simplifyReturn(data) {
  
  const items = data.returnLineItems.nodes.map(item => {
    return {
      id: item.id,
      quantity: item.quantity,
      returnReasonNote: item.returnReasonNote,
      returnReason: item.returnReason,
      name: item.fulfillmentLineItem.lineItem.name,
      image: item.fulfillmentLineItem.lineItem.image.url,
      requiresShipping: item.fulfillmentLineItem.lineItem.requiresShipping,
      restockingFee: item.restockingFee?.percentage || 0,
    }
  })

  const returnData =  {
    name: data.name,
    status: mapReturnStatus(data.status),
    totalQuantity: data.totalQuantity,
    id: data.id,
    orderId: data.order.id.split('/').pop(),
    statusPageUrl: data.order.statusPageUrl,
    taxRate: parseFloat(data.order.taxLines[0]?.rate || 0),
    items: items,
    email: data.order.email,
    currency: data.order.subtotalPriceSet.presentmentMoney.currencyCode,
    countryCode: data.order.shippingAddress.countryCodeV2,
    shippingAddress: data.order.shippingAddress,
    returnShippingFee: parseFloat(data.returnShippingFees?.[0]?.amountSet?.presentmentMoney?.amount || 0),
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