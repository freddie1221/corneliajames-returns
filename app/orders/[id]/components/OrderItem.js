'use client'

import { useState } from 'react';
import Image from 'next/image';


export default function OrderItem({ item, index, onSelectItem, existingReturn }) {
  const [returnReasonNote, setReturnReasonNote] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [returnQuantity, setReturnQuantity] = useState(1)


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
    <li className="mb-2 flex flex-col bg-gray-100 p-2 rounded-md w-full">

      <div className="flex flex-row">
        <Image src={item.image} alt={item.name} width={80} height={80} className="mr-6" />
        <div className="flex flex-col">
          <div>{item.name}</div>
          <div className="text-sm text-gray-500">Price: {item.price}</div>
          <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
        </div>
      </div>
      

      {!existingReturn ? (
        <div className="flex flex-col items-top  mt-4">
          <div>
            <label htmlFor={`returnQuantity-${item.id}`} className="block text-sm font-medium text-gray-700">
              Return
            </label>
            <input
              name="addItem"
              type="checkbox"
              checked={isChecked}
              onChange={handleSelectChange}
              className="mr-2"
              />
          </div>
          <div>
            <label htmlFor={`returnQuantity-${item.id}`} className="block text-sm font-medium text-gray-700">
              Return Quantity
            </label>
            <input
              type="number" 
              value={returnQuantity}
              max={item.quantity}
              min={1}
              onChange={handleQuantityChange} 
              className="w-8 p-1 border border-gray-300 rounded-md text-center"
            />
          </div>
        
          <div className="">
            <label htmlFor={`returnReasonNote-${item.id}`} className="block text-sm font-medium text-gray-700">
              Return Reason
            </label>
            <textarea
              id={`returnReasonNote-${index}`}
              name="returnReasonNote"
              rows="1"
              value={returnReasonNote}
              onChange={handleReasonChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g Style / colour didn't work"
              />
          </div>
        </div>
      ) : ( null )}

    </li>
  );
}