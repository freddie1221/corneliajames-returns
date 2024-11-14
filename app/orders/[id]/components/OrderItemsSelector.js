'use client';

import OrderItem from '@/app/components/OrderItem';
import { Message } from '@/app/components/Elements';
import { useFetchOrder } from '@/app/hooks/useFetchOrder';
import LoadingSpinner from '@/app/components/LoadingSpinner';


export default function OrderItemsSelector({ setReturnLineItems, returnType, orderId }) {
  const { order, error, loading } = useFetchOrder(orderId);

  const handleSelectItem = (returnLineItem, checked) => {
    if (checked) {
      setReturnLineItems(prev => [...prev, returnLineItem]);
    } else {
      setReturnLineItems(prev => prev.filter(ri => ri.fulfillmentLineItemId !== returnLineItem.fulfillmentLineItemId));
    }
  };

  if (loading) { return <LoadingSpinner /> }
  if (error) { return <Message text={`Error: ${error}`} type="error" /> }


  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="heading-secondary text-center">Items in your order</h2>
      <ul className="flex flex-col gap-3 w-full">
        {order.returnableItems.map((item, index) => {
          return (
            <OrderItem 
              key={item.id + index}
              index={index}
              item={item} 
              returnType={returnType}
              onSelectItem={handleSelectItem}
            />
            );
          })
        }
      </ul>
    </div>
  );
}
