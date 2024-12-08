import summariseReturn from "./summariseReturn";
import getShippingService from "./getShippingService";
import calculateValidUntil from "./calculateValidUntil";
import exclusions from "./exclusions";

export default function simplifyOrder(order) {
 
  const fulfilledItems = order.fulfillments
  .filter(fulfillment => fulfillment.status !== 'CANCELLED')
  .flatMap(fulfillment => fulfillment.fulfillmentLineItems.nodes);

  const orderItems = fulfilledItems.map(item => {
    return {
      id: item.id,
      name: item.lineItem.name,
      quantity: item.lineItem.currentQuantity,
      image: item.lineItem.image.url,
      requiresShipping: item.lineItem.requiresShipping,
      value: parseFloat(item.lineItem.discountedUnitPriceAfterAllDiscountsSet.presentmentMoney.amount),
      taxAmount: parseFloat(item.lineItem.taxLines[0]?.priceSet.presentmentMoney.amount || 0),
      price: parseFloat(item.originalTotalSet.presentmentMoney.amount),
      discount: parseFloat(item.discountedTotalSet.presentmentMoney.amount),
      currencyCode: item.originalTotalSet.presentmentMoney.currencyCode,
    };
  });


  
  const returnableItems = orderItems.filter(item => item.quantity > 0);
  const exchangeRate = parseFloat(order.subtotalPriceSet.presentmentMoney.amount) / parseFloat(order.subtotalPriceSet.shopMoney.amount)
  const currencyCode = order.subtotalPriceSet.presentmentMoney.currencyCode

  order = {
    id: order.id.split('/').pop(),
    fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    firstName: order.shippingAddress.firstName,
    name: order.name,
    email: order.email,
    exclusions: exclusions(order.tags),
    customerId: order.customer.id.split('/').pop(),
    createdAt: order.createdAt,
    shippedOn: order.fulfillments?.[0]?.createdAt,
    validUntil: calculateValidUntil(order.createdAt),
    totalPrice: parseFloat(order.subtotalPriceSet.presentmentMoney.amount),
    totalDiscount: parseFloat(order.totalDiscountsSet.presentmentMoney.amount),
    currencyCode: currencyCode,
    orderItems: orderItems,
    returnableItems: returnableItems,
    returns: order.returns.nodes.map(returnData => summariseReturn(returnData, currencyCode)),
    address: order.shippingAddress,
    taxRate: parseFloat(order.taxLines[0]?.rate || 0),
    exchangeRate: exchangeRate,
    countryCode: order.shippingAddress.countryCode,
    shippingService: getShippingService({countryCode: order.shippingAddress.countryCode, exchangeRate: exchangeRate}),
  }

  return order
}