'use client';

import { useEffect } from 'react';
import OrderItem from '../../../components/OrderItem';

export default function ReturnItemSelector({ items, returnLineItems, setReturnLineItems }) {
  
  const handleSelectItem = (returnLineItem, checked) => {
    if (checked) {
      setReturnLineItems(prev => [...prev, returnLineItem]);
    } else {
      setReturnLineItems(prev => prev.filter(ri => ri.fulfillmentLineItemId !== returnLineItem.fulfillmentLineItemId));
    }
  };

  useEffect(() => {
    console.log(returnLineItems);
  }, [returnLineItems]);

  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="heading-secondary text-center">Items in your order</h2>
      <ul className="flex flex-col gap-3 w-full">
        {items.map((item, index) => {
          return (
            <OrderItem 
              key={item.id + index}
              index={index}
              item={item} 
              onSelectItem={handleSelectItem}
            />
            );
          })
        }
      </ul>
    </div>
  );
}
