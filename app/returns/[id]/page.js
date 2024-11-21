import Link from 'next/link';
import { getReturn } from '@/app/utils/api/getReturn';

import getSuggestedRefund from '@/app/utils/api/getSuggestedRefund';
import CancelReturn from './components/CancelReturn';
import ReturnDetails from '@/app/returns/[id]/components/ReturnDetails';
import ReturnShipping from '@/app/returns/[id]/components/ReturnShipping';

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
      
      <ReturnShipping returnData={returnData} />
      <ReturnActions returnData={returnData} />
    </div>
  )
}

function ReturnActions({ returnData }){
  return (
    <div className="container flex gap-4 w-full py-6">
      <CancelReturn returnId={returnData.id.split('/').pop()} orderId={returnData.orderId} />
      <Link href={`/orders/${returnData.orderId}`} className="btn-secondary w-full">View Order</Link>
    </div>
  )
}



/*
  useEffect(() => {
    if (success) {
      router.refresh();
    }
  }, [success, router]);
*/