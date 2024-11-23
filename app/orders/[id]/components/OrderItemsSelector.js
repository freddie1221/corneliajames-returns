"use client";

import OrderItem from '@/app/orders/[id]/components/OrderItem';
import { Message, ContactUs } from '@/app/components/Elements';

export default function OrderItemsSelector({ setReturnLineItems, setReturnValue, setItemsCount, returnType, order }) {

  if(order.validUntil < new Date()) {
    return (
      <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
        <Message text="The return window on this order has expired, please contact us if we can help" />
        <ContactUs />
      </div>
    )
  }

  console.log(order.exclusions.noReturn)

  if(order.returnableItems.length === 0 || order.exclusions.noReturn) {
    return (
      <div className="flex flex-col items-center bg-gray-100 rounded-lg p-4">
        <Message text="There are no returnable items in this order, please contact us if you think this is a mistake" />
        <ContactUs />
      </div>
    )
  }

  const handleSelectItem = (returnLineItem, checked) => {
    if (checked) {
      setReturnLineItems(prev => [...prev, returnLineItem]);
    } else {
      setReturnLineItems(prev => prev.filter(
        ri => ri.fulfillmentLineItemId !== returnLineItem.fulfillmentLineItemId
      ));
    }
  };


  return (
    <div className="">
      <h2 className="heading-secondary">Choose items to return</h2>
      <ul className="flex flex-col gap-3 w-full">
        {order.returnableItems.map((item, index) => {
          return (
            <OrderItem 
              key={item.id + index}
              index={index}
              item={item} 
              returnType={returnType}
              setItemsCount={setItemsCount}
              setReturnValue={setReturnValue}
              onSelectItem={handleSelectItem}
            />
            );
          })
        }
      </ul>
    </div>
  );
}
