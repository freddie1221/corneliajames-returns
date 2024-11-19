import Link from 'next/link';
import { getReturn } from '@/app/utils/api/getReturn';

import getSuggestedRefund from '@/app/utils/api/getSuggestedRefund';
import Cancel from './components/Cancel';
import ReturnDetails from '@/app/returns/[id]/components/ReturnDetails';
import ReturnDocuments from '@/app/returns/[id]/components/ReturnDocuments';

export default async function ReturnPage({ params }) {
  const { id } = params;
  const returnData = await getReturn(id);
  const suggestedRefund = await getSuggestedRefund(returnData)

  return (
    <div className="flex flex-col gap-4">
      <div className="container bg-white rounded-lg p-5">
        <h1 className="heading-secondary">Return Details</h1>
        <ReturnDetails returnData={returnData} suggestedRefund={suggestedRefund} />
      </div>
      <div className="container bg-white rounded-lg p-5">
        <ReturnDocuments returnData={returnData} />
      </div>
        
      <div className="container flex gap-4 w-full">
        <Link href={`/orders/${returnData.orderId}`} className="btn-secondary w-full">View Order</Link>
        <Cancel returnId={id} orderId={returnData.orderId} />
      </div>
    </div>
  )

}


