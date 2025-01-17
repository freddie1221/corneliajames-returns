import Link from 'next/link';
import { getReturn } from '@/lib/api/getReturn';
import { getOrder } from '@/lib/api/getOrder';

import ReturnDetails from '@/app/returns/[id]/components/ReturnDetails';
import ReturnShipping from '@/app/returns/[id]/components/ReturnShipping';
import StoreCredit from '@/app/returns/[id]/components/StoreCredit';
import CancelReturn from './components/CancelReturn';
import getReturnSummary from '@/lib/helpers/getReturnSummary';

export default async function ReturnPage({ params }) {
  
  const { id } = params;
  const returnData = await getReturn(id);
  const order = await getOrder(returnData.orderId);
  
  const { returnType, returnShipping, includeShipping } = await getReturnSummary({returnData, order})

  return (
    <div className="flex flex-col gap-4">
      <ReturnDetails returnData={returnData} order={order} />
      <StoreCredit returnData={returnData} returnType={returnType} order={order} />
      <ReturnShipping returnData={returnData} returnType={returnType} returnShipping={returnShipping} includeShipping={includeShipping} order={order}/>
      <ReturnActions returnData={returnData} returnType={returnType} order={order}/>
    </div>
  )
}

function ReturnActions({ returnData, returnType }){
  return (
    <div className="container flex gap-4 w-full p-5 md:px-8">
      <CancelReturn 
        returnId={returnData.id.split('/').pop()} 
        orderId={returnData.orderId} 
        status={returnData.status} 
        returnType={returnType} 
      />
      <Link href={`/orders/${returnData.orderId}`} className="btn btn-tertiary w-full">View Order</Link>
    </div>
  )

}
