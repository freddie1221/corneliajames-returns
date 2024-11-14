import simplifyReturn from "./simplifyReturn";


export default function simplifyOrder(order) {
  
  // console.log('Raw order: ', order);
 
  const fulfilledItems = order.fulfillments.flatMap(fulfillment => fulfillment.fulfillmentLineItems.nodes);
  // console.log('Fulfilled items: ', fulfilledItems);

  const orderItems = fulfilledItems.map(item => {
    return {
      id: item.id,
      name: item.lineItem.name,
      quantity: item.lineItem.currentQuantity,
      image: item.lineItem.image.url,
      value: parseFloat(item.lineItem.discountedUnitPriceAfterAllDiscountsSet.presentmentMoney.amount),
      price: parseFloat(item.originalTotalSet.presentmentMoney.amount),
      discount: parseFloat(item.discountedTotalSet.presentmentMoney.amount),
      currencyCode: item.originalTotalSet.presentmentMoney.currencyCode,
    };
  });
  
  const returnableItems = orderItems.filter(item => item.quantity > 0);

  order = {
    id: order.id.split('/').pop(),
    name: order.name,
    email: order.email,
    createdAt: order.createdAt,
    totalPrice: parseFloat(order.subtotalPriceSet.presentmentMoney.amount),
    totalDiscount: parseFloat(order.totalDiscountsSet.presentmentMoney.amount),
    currencyCode: order.subtotalPriceSet.presentmentMoney.currencyCode,
    orderItems: orderItems,
    returnableItems: returnableItems,
    returns: order.returns.nodes.map(returnData => simplifyReturn(returnData)),
  }

  
  return order
}