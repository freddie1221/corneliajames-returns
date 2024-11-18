
import Link from 'next/link';
import { getReturn } from '@/app/utils/api/getReturn';

import getSuggestedRefund from '@/app/utils/api/getSuggestedRefund';
import simplifyReturn from '@/app/utils/helpers/simplifyReturn';
import Cancel from './components/Cancel';
import ReturnDetails from '@/app/components/ReturnDetails';

export default async function ReturnPage({ params }) {
  const { id } = params;

  const data = await getReturn(id);
  const returnData = simplifyReturn(data.return)

  const suggestedRefund = await getSuggestedRefund(returnData)

  
  return (
    <div className="flex flex-col gap-4">
      <div className="container bg-white rounded-lg p-5">
        <h1 className="heading-primary">Return Details</h1>
        <ReturnDetails returnData={returnData} suggestedRefund={suggestedRefund} />
      </div>
        
      <div className="container flex gap-4 w-full">
        <Link href={`/orders/${returnData.orderId}`} className="btn-secondary">Back to Order</Link>
        <Cancel returnId={id} orderId={returnData.orderId} />
      </div>
    </div>
  )

}


