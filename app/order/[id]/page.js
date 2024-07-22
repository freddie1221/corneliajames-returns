'use client';

import { useState } from 'react';
import { getOrderDetails } from '@/lib/shopify';
import ReturnItemSelector from '@/components/ReturnItemSelector';
import ReturnReason from '@/components/returnReason';
import ReturnOptions from '@/components/ReturnOptions';

export default async function OrderDetails({ params }) {
  const { id } = params;
  const [selectedItems, setSelectedItems] = useState({});
  const [reason, setReason] = useState('');
  const [selectedOption, setSelectedOption] = useState('store-credit');

  // option isn't changing

  const handleSubmit = async () => {
    // Here you would send the data to your external API
    console.log({ selectedItems, reason, selectedOption });
    // Implement your API call here
  };

  // Fetch order details (you might need to adjust this for client-side fetching)
  const order = await getOrderDetails(id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p><strong>Order Number:</strong> {order.name}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Date:</strong> {order.createdAt}</p>
        <p><strong>Total:</strong> {order.totalPriceSet.presentmentMoney.amount} {order.totalPriceSet.presentmentMoney.currencyCode}</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Items:</h2>
        <ReturnItemSelector 
          items={order.lineItems.nodes} 
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
        <ReturnReason onReasonChange={setReason} />
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
    </div>
  );
}