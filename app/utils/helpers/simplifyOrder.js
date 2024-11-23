import summariseReturn from "./summariseReturn";
import returnShipping from "./calculateShipping";
export default function simplifyOrder(order) {
 
  const fulfilledItems = order.fulfillments.flatMap(fulfillment => fulfillment.fulfillmentLineItems.nodes);

  const orderItems = fulfilledItems.map(item => {
    return {
      id: item.id,
      name: item.lineItem.name,
      quantity: item.lineItem.currentQuantity,
      image: item.lineItem.image.url,
      requiresShipping: item.lineItem.requiresShipping,
      value: parseFloat(item.lineItem.discountedUnitPriceAfterAllDiscountsSet.presentmentMoney.amount),
      price: parseFloat(item.originalTotalSet.presentmentMoney.amount),
      discount: parseFloat(item.discountedTotalSet.presentmentMoney.amount),
      currencyCode: item.originalTotalSet.presentmentMoney.currencyCode,
    };
  });
  
  const returnableItems = orderItems.filter(item => item.quantity > 0);
  const exchangeRate = parseFloat(order.subtotalPriceSet.presentmentMoney.amount) / parseFloat(order.subtotalPriceSet.shopMoney.amount)

  order = {
    id: order.id.split('/').pop(),
    fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    firstName: order.shippingAddress.firstName,
    name: order.name,
    email: order.email,
    phone: order.phone,
    customerId: order.customer.id.split('/').pop(),
    createdAt: order.createdAt,
    totalPrice: parseFloat(order.subtotalPriceSet.presentmentMoney.amount),
    totalDiscount: parseFloat(order.totalDiscountsSet.presentmentMoney.amount),
    currencyCode: order.subtotalPriceSet.presentmentMoney.currencyCode,
    orderItems: orderItems,
    returnableItems: returnableItems,
    returns: order.returns.nodes.map(returnData => summariseReturn(returnData)),
    address: order.shippingAddress,
    countryCode: order.shippingAddress.countryCode,
    returnShipping: returnShipping({countryCode: order.shippingAddress.countryCode, exchangeRate: exchangeRate}),
  }
  
  return order
}