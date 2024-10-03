
export function simplifyReturnItems(returnData) {
  
  const returnLineItems = returnData.return.returnLineItems.nodes;
  
  const returnItems = returnLineItems.map(item => {

    return {
      name: item.fulfillmentLineItem.lineItem.name,
      quantity: item.fulfillmentLineItem.lineItem.currentQuantity,
      image: item.fulfillmentLineItem.lineItem.image.url,
      price: parseFloat(item.fulfillmentLineItem.originalTotalSet.presentmentMoney.amount),
      discount: parseFloat(item.fulfillmentLineItem.discountedTotalSet.presentmentMoney.amount),
      currencyCode: item.fulfillmentLineItem.originalTotalSet.presentmentMoney.currencyCode,
    };

  });


  return returnItems;
}