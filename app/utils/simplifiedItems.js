import { convertStringToNumber } from "./textToNumber";

export function simplifiedItems(order) {
  const fulfilledItems = order.fulfillments.flatMap(fulfillment => fulfillment.fulfillmentLineItems.nodes);
  
  const simplifiedItems = fulfilledItems.map(item => {

    const originalPrice = convertStringToNumber(item.originalTotalSet.presentmentMoney.amount);
    const discount = convertStringToNumber(item.discountedTotalSet.presentmentMoney.amount);
    const price = originalPrice - discount;
    return {
      id: item.id,
      name: item.lineItem.name,
      quantity: item.lineItem.currentQuantity,
      image: item.lineItem.image.url,
      price: price,
    };
  });
  const returnableItems = simplifiedItems.filter(item => item.quantity > 0);


  return returnableItems;
}