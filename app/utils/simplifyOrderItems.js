
export function simplifyOrderItems(order) {
  const fulfilledItems = order.fulfillments.flatMap(fulfillment => fulfillment.fulfillmentLineItems.nodes);
  
  const simplifiedItems = fulfilledItems.map(item => {

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
  const returnableItems = simplifiedItems.filter(item => item.quantity > 0);


  return returnableItems;
}