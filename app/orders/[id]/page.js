import { notFound } from 'next/navigation';
import { convertStringToNumber } from '@/app/utils/textToNumber';
import { getOrder } from '@/app/utils/api';
import ReturnForm from './components/ReturnForm';
import ExistingReturns from './components/ExistingReturns';

export function OrderDetailItem({ label, value, fullWidth = false }) {
  return (
    <div className={`flex flex-col ${fullWidth ? 'col-span-full' : ''}`}>
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="font-semibold text-lg">{value}</span>
    </div>
  );
}


export default async function OrderDetails({ params }) {
  const { id } = params;
  console.log("order id on main page", id);

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

  const totalPrice = convertStringToNumber(order.totalPriceSet.presentmentMoney.amount);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-6 mb-4">
        <h1 className="text-2xl font-bold mb-6">Order Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OrderDetailItem 
            label="Order Number" 
            value={order.name} 
          />
          <OrderDetailItem 
            label="Email" 
            value={order.email} 
          />
          <OrderDetailItem 
            label="Date" 
            value={new Date(order.createdAt).toLocaleDateString()} 
          />
          <OrderDetailItem 
            label="Order Total" 
            value={`${totalPrice} ${order.totalPriceSet.presentmentMoney.currencyCode}`} 
          />
        </div>
      </div>
      <ExistingReturns order={order} />
      <ReturnForm order={order} />
    </div>
  );
}
