
export function simplifyOrder(order) {
  
 
  const fulfilledItems = order.fulfillments.flatMap(fulfillment => fulfillment.fulfillmentLineItems.nodes);
  const orderItems = fulfilledItems.map(item => {
    return {
      id: item.id,
      name: item.lineItem.name,
      quantity: item.lineItem.currentQuantity,
      image: item.lineItem.image.url,
      price: parseFloat(item.originalTotalSet.presentmentMoney.amount),
      discount: parseFloat(item.discountedTotalSet.presentmentMoney.amount),
      currencyCode: item.originalTotalSet.presentmentMoney.currencyCode,
    };
  });
  
  const returnableItems = orderItems.filter(item => item.quantity > 0);

  order = {
    id: order.id,
    name: order.name,
    email: order.email,
    createdAt: order.createdAt,
    totalPrice: parseFloat(order.subtotalPriceSet.presentmentMoney.amount),
    totalDiscount: parseFloat(order.totalDiscountsSet.presentmentMoney.amount),
    currencyCode: order.subtotalPriceSet.presentmentMoney.currencyCode,
    returns: order.returns.nodes,
    orderItems: orderItems,
    returnableItems: returnableItems,
  }

  
  return order
}