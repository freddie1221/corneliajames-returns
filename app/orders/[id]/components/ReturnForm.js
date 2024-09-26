"use client";

import ReturnItemSelector from '@/app/orders/[id]/components/ReturnItemSelector';
import ReturnReason from '@/app/orders/[id]/components/ReturnReason';
import ReturnOptions from '@/app/orders/[id]/components/ReturnOptions';
import { useState, useEffect } from 'react';
import useSubmitReturn from '@/app/hooks/useSubmitReturn';

export default function ReturnForm({ order }) {
    const [selectedItems, setSelectedItems] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [reason, setReason] = useState('');
    const [returnType, setReturnType] = useState('');
    const { submitReturn, loading, error, success } = useSubmitReturn();

    useEffect(() => {
        const totalAmount = Object.values(selectedItems).reduce((acc, item) => acc + item.amount, 0);
        const totalQuantity=Object.keys(selectedItems).length
        setTotalAmount(totalAmount);
        setTotalQuantity(totalQuantity);
    }, [selectedItems]);


    const handleSubmit = async () => {
        const returnData = { selectedItems, reason, returnType, totalAmount, totalQuantity };
        console.log(returnData);
      await submitReturn(returnData, order);
      if (success) {
          console.log('Return submitted successfully!');
      }
      if (error) {
          console.error('Error submitting return:', error);
      }
    };

    return (
        <div className="flex flex-col gap-4 bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <ReturnItemSelector 
                items={order.lineItems.nodes} 
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
            />
            <ReturnReason 
                onReasonChange={setReason} 
            />
            <ReturnOptions 
                totalQuantity={totalQuantity}
                totalAmount={totalAmount}
                currencyCode={order.totalPriceSet.presentmentMoney.currencyCode}
                setReturnType={setReturnType}
                returnType={returnType}
            />
            <button 
                onClick={handleSubmit}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Submit Return Request
            </button>
        </div>
    );
}