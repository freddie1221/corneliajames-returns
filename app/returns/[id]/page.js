import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getReturn } from '@/app/utils/api';
import ReturnDetails from '@/app/components/ReturnDetails';
import simplifyReturn from '@/app/utils/simplifyReturn';

export default async function ReturnPage({ params }) {
  const { id } = params;

  const { data, error } = await getReturn(id);
  const returnData = simplifyReturn(data.return)

  
  return (
    <div className="container mx-auto p-4">
      <div className="shadow-md rounded p-6 mb-4 mx-auto flex flex-col items-center gap-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Return Details</h1>
        <h2 className="heading-secondary">Return Items</h2>
        <ReturnDetails returnData={returnData} />
          <Link href={`/orders/${returnData.orderId}`}>Back to Order</Link>
      </div>
    </div>
  )

}
