import { getOrderDetails } from '@/lib/shopify';
import ReturnItemSelector from '@/components/ReturnItemSelector';

// import { useState } from 'react';
// import LoadingSpinner from '@/components/LoadingSpinner';

export default async function OrderDetails({ params }) {
  const { id } = params;
  const order = await getOrderDetails(id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p><strong>Order Number:</strong> {order.name}</p>
        <p><strong>Order Number:</strong> {order.email}</p>
        <p><strong>Date:</strong> {order.createdAt}</p>
        <p><strong>Total:</strong> {order.totalPriceSet.presentmentMoney.amount} {order.totalPriceSet.presentmentMoney.currencyCode}</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Items:</h2>
        <ReturnItemSelector items={order.lineItems.edges} />

      </div>
    </div>
  );
}

