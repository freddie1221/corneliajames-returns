import { notFound } from 'next/navigation';
import ReturnForm from './components/ReturnForm';

async function getOrder(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch order');
  }
  return res.json();
}

export default async function OrderDetails({ params }) {
  const { id } = params;
  
  let order;
  try {
    order = await getOrder(id);
  } catch (error) {
    console.error('Error fetching order:', error);
    return <div>Error loading order details. Please try again later.</div>;
  }

  if (!order) {
    notFound();
  }

  console.log("order is", order);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p><strong>Order Number:</strong> {order.name}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Date:</strong> {order.createdAt}</p>
        <p><strong>Total:</strong> {order.totalPriceSet.presentmentMoney.amount} {order.totalPriceSet.presentmentMoney.currencyCode}</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Items:</h2>
        <ReturnForm order={order} />
        
        
      </div>
    </div>
  );
}