'use client';

import { useState, useEffect } from 'react';
import OrderItem from '../../../components/OrderItem';
import { Message } from '@/app/components/Elements';


export default function OrderItemsSelector({ items, returnLineItems, setReturnLineItems, returnType, orderId }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/shopify/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const order = await response.json();
        console.log('order: ', order)
        setOrder(order);

      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleSelectItem = (returnLineItem, checked) => {
    if (checked) {
      setReturnLineItems(prev => [...prev, returnLineItem]);
    } else {
      setReturnLineItems(prev => prev.filter(ri => ri.fulfillmentLineItemId !== returnLineItem.fulfillmentLineItemId));
    }
  };

  if (!order) {
    return <Message text="Loading..." type="loading" />
  }


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
