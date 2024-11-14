'use client'

import { useState } from 'react';
import Image from 'next/image';
import QuantitySelector from '../orders/[id]/components/QuantitySelector';
import ReturnReasonTextarea from '../orders/[id]/components/ReturnReasonTextarea';

export default function OrderItem({ item, index, onSelectItem, existingReturn }) {
  const { id, name, quantity, image, value, price, discount, currencyCode } = item;
  const [isChecked, setIsChecked] = useState(false);
  const [returnQuantity, setReturnQuantity] = useState(1)
  const [returnReasonNote, setReturnReasonNote] = useState('');

  const handleReasonChange = (e) => {
    setReturnReasonNote(e.target.value);
  };

  const handleIncrement = () => {
    setReturnQuantity((prevQuantity) => {
      if (prevQuantity < item.quantity) {
        return prevQuantity + 1;
      }
      return prevQuantity;
    });
  };

  const handleDecrement = () => {
    setReturnQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
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