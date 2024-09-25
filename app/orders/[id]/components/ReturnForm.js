"use client";

import ReturnItemSelector from '@/app/orders/[id]/components/ReturnItemSelector';
import ReturnReason from '@/app/orders/[id]/components/ReturnReason';
import ReturnOptions from '@/app/orders/[id]/components/ReturnOptions';
import { useState } from 'react';

export default function ReturnForm({ order }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [reason, setReason] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleSubmit = async () => {
      // Here you would send the data to your external API
      console.log({ selectedItems, reason, selectedOption });
      // Implement your API call here
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
                setSelectedOption={setSelectedOption} 
                selectedOption={selectedOption}
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