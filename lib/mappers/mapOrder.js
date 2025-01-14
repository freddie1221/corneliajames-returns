import summariseReturn from "../helpers/summariseReturn";
import getShippingService from "../helpers/getShippingService";
import calculateValidUntil from "../helpers/calculateValidUntil";
import exclusions from "../helpers/exclusions";

export default function mapOrder(order) {
 
  const fulfilledItems = order.fulfillments
  .filter(fulfillment => fulfillment.status !== 'CANCELLED')
  .flatMap(fulfillment => fulfillment.fulfillmentLineItems.nodes);

  const orderItems = fulfilledItems.map(item => {
    return {
      id: item.id,
      name: item.lineItem.name,
      quantity: item.lineItem.currentQuantity,
      sku: item.lineItem.sku,
      image: item.lineItem.image.url,
      customAttributes: item.lineItem.customAttributes,
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
    statusPageUrl: order.statusPageUrl,
    countryCode: order.shippingAddress.countryCode,
    currencyCode: currencyCode,
    orderItems: orderItems,
    returnableItems: returnableItems,
    address: order.shippingAddress,
    taxRate: parseFloat(order.taxLines[0]?.rate || 0),
    exchangeRate: exchangeRate,
    countryCode: order.shippingAddress.countryCode,
    shippingService: getShippingService({countryCode: order.shippingAddress.countryCode, exchangeRate: exchangeRate}),
    returnIds: order.returns.nodes.map(returnData => returnData.id.split('/').pop()),
  }

  return order
}

/*

function summariseReturn(returnData, currencyCode) {
  
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
    status: mapReturnStatus(returnData.status),
    totalQuantity: returnData.totalQuantity,
    id: returnData.id,
    items: items,
    restockingFeePercentage: parseFloat(items[0].restockingFee),
    returnType: parseFloat(items[0].restockingFee) === 100 ? 'Credit' : 'Refund',
    totalFee: returnData.returnShippingFees?.[0]?.amountSet?.presentmentMoney?.amount,
    currency: currencyCode,
  }

  return returnData
}
  */