
import Link from 'next/link';
import { getReturn } from '@/app/utils/getReturn';
import ReturnDetails from '@/app/components/ReturnDetails';
import getSuggestedRefund from '@/app/utils/api/getSuggestedRefund';
import simplifyReturn from '@/app/utils/helpers/simplifyReturn';
import Cancel from './components/Cancel';

export default async function ReturnPage({ params }) {
  const { id } = params;

  const data = await getReturn(id);
  const returnData = simplifyReturn(data.return)

  const suggestedRefund = await getSuggestedRefund(returnData)

  
  return (
    <div className="shadow-md rounded p-5 mb-4 mx-auto flex flex-col items-center gap-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Return Details</h1>
      
      <ReturnDetails returnData={returnData} suggestedRefund={suggestedRefund} />
      <Link href={`/orders/${returnData.orderId}`}>Back to Order</Link>
      <Cancel returnId={id} orderId={returnData.orderId} />
    </div>
  )

}
