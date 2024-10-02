import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getReturn } from '@/app/utils/api';
import { simplifyReturnItems } from '@/app/utils/simplifyReturnItems';
import OrderItem from '@/app/components/OrderItem';

export default async function Return({ params }) {
  const { id } = params;
  const returnData = await getReturn(id);
  const orderId = returnData.return.order.id.split('/').pop();
  
  console.log("return data", returnData);

  const returnItems = simplifyReturnItems(returnData);
  console.log("simplified return items", returnItems);

  return (
    <div className="container mx-auto p-4">
      <div className="shadow-md rounded p-6 mb-4 mx-auto flex flex-col items-center gap-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Return Details</h1>
        <h2 className="heading-secondary">Return Items</h2>
          {returnItems.map((item, index) => (
            <OrderItem 
              item={item}
              index={index}
              key={index}
            />
          ))}
          <Link href={`/orders/${orderId}`}>Back to Order</Link>
      </div>
    </div>
  )

}
