'use client';

import { useState, useEffect } from 'react';
import OrderItem from './OrderItem';


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
/*

function ReturnItem({ item, index, onSelectItem, existingReturn }) {
  const [returnReasonNote, setReturnReasonNote] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [returnQuantity, setReturnQuantity] = useState(1);


  const handleReasonChange = (e) => {
    setReturnReasonNote(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setReturnQuantity(Number(e.target.value));
  };

  const createReturnLineItem = (checked) => {
    return {
      fulfillmentLineItemId: item.id,
      quantity: returnQuantity,
      returnReason: "OTHER",
      returnReasonNote: "test"
    };
  };

  const handleSelectChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onSelectItem(createReturnLineItem(checked), checked);
  };

  return (
    <li className="mb-2 flex items-center">
      <input
        name="addItem"
        type="checkbox"
        checked={isChecked}
        onChange={handleSelectChange}
        className="mr-2"
      />
      <img src={item.image} alt={item.name} width={50} height={50} className="mr-4" />
      <div>
        <div>{item.name}</div>
        <div className="text-sm text-gray-500">Price: {item.price}</div>
        <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
      </div>
      <div>
        <input 
          type="number" 
          value={returnQuantity}
          max={item.quantity}
          min={1}
          onChange={handleQuantityChange} 
          className="w-16 p-1 border border-gray-300 rounded-md"
        />
      </div>
      <div className="ml-6 mt-2">
        <label htmlFor={`returnReasonNote-${item.id}`} className="block text-sm font-medium text-gray-700">
          Return Reason
        </label>
        <textarea
          id={`returnReasonNote-${index}`}
          name="returnReasonNote"
          rows="3"
          value={returnReasonNote}
          onChange={handleReasonChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Please provide a reason for your return..."
        />
      </div>
    </li>
  );
}
*/