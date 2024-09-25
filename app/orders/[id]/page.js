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
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <OrderDetailItem label="Order Number" value={order.name} />
      <OrderDetailItem label="Email" value={order.email} />
      <OrderDetailItem 
        label="Date" 
        value={new Date(order.createdAt).toLocaleDateString()} 
      />
      <OrderDetailItem 
        label="Total" 
        value={`${order.totalPriceSet.presentmentMoney.amount} ${order.totalPriceSet.presentmentMoney.currencyCode}`} 
      />
      <OrderDetailItem 
        label="Shipping Address" 
        value={order.shippingAddress.formatted} 
        fullWidth={true}
      />
    </div>
        
        <ReturnForm order={order} />
        
        
      </div>
    </div>
  );
}
export function OrderDetailItem({ label, value, fullWidth = false }) {
  return (
    <div className={`flex flex-col ${fullWidth ? 'col-span-full' : ''}`}>
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="font-semibold text-lg">{value}</span>
    </div>
  );
}