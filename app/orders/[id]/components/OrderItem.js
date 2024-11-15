'use client'

import { useState } from 'react';
import Image from 'next/image';
import QuantitySelector from './QuantitySelector';
import ReturnReasonTextarea from './ReturnReasonTextarea';

export default function OrderItem({ item, onSelectItem, existingReturn, setItemsCount, setReturnValue }) {
  const { id, name, quantity, image, value, price, discount, currencyCode, requiresShipping } = item;
  const [isChecked, setIsChecked] = useState(false);
  const [returnQuantity, setReturnQuantity] = useState(1)
  const [returnReasonNote, setReturnReasonNote] = useState('');
  

  const handleReasonChange = (e) => {
    setReturnReasonNote(e.target.value);
  };

  const handleIncrement = () => {
    if (returnQuantity < item.quantity) {
      setReturnQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (returnQuantity > 0) {
      setReturnQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const createReturnLineItem = () => {
    return {
      fulfillmentLineItemId: id,
      quantity: returnQuantity,
      returnReason: "OTHER",
      returnReasonNote: returnReasonNote
    };
  };

  const handleSelectChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onSelectItem(createReturnLineItem(), checked);
    
    if (checked) {
      setReturnValue(prevValue => prevValue + (returnQuantity * value));
      if (requiresShipping) {
        setItemsCount(prevCount => prevCount + returnQuantity);
      }
    } else {
      setReturnValue(prevValue => prevValue - (returnQuantity * value));
      if (requiresShipping) {
        setItemsCount(prevCount => prevCount - returnQuantity);
      }
    }
  };

  return (
    <li className="mb-4 flex flex-col bg-white shadow-md p-4 rounded-lg w-full">
      <div className="flex flex-row items-center mb-4">
        <Image src={image} alt={name} width={80} height={80} />
        <div className="flex-1 w-full ml-4">
          <h3 className="text-lg font-semibold">{name} x {quantity}</h3>
          <div className="max-w-40 w-full mt-1">
            <div className="flex flex-row justify-between text-sm">
              <span>Value</span> <span> {currencyCode} {value?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      {existingReturn && (
        <div className="flex flex-col w-full bg-gray-100 p-2 mt-2 rounded-md">
          <div className="text-xs">Return reason</div>
          <div className="text-sm">{item.returnReasonNote}</div>
        </div>
      )}

      {!existingReturn && (
        <div className="flex flex-col space-y-3 max-w-md w-full">
            <ReturnReasonTextarea
              id={item.id}
              value={returnReasonNote}
              disabled={isChecked}
              onChange={handleReasonChange}
              placeholder="Please enter a return reason e.g. Style/color didn't work"
            />
            <div className="flex flex-row space-x-3 justify-between">
              
              <div className="flex items-center space-x-2">
                <label htmlFor={`returnQuantity-${item.id}`} className="break text-sm">
                  Quantity
                </label>
                <QuantitySelector
                  quantity={returnQuantity}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  max={item.quantity}
                  min={1}
                  disabled={isChecked}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor={`return-${item.id}`} className="break-words text-center text-sm text-gray-700">
                  Return
                </label>
                <input
                  id={`return-${item.id}`}
                  name={`return-${item.id}`}
                  type="checkbox"
                  checked={isChecked}
                  disabled={!returnReasonNote}
                  onChange={handleSelectChange}
                  className="form-checkbox border-gray-300 h-6 w-6 text-indigo-600 transition duration-150 ease-in-out cursor-pointer focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  aria-checked={isChecked}
                />
              </div>
            </div>
          </div>
      )}
    </li>
  );
}