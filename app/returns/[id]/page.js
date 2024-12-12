import Link from 'next/link';
import { getReturn } from '@/app/utils/api/getReturn';
import ReturnDetails from '@/app/returns/[id]/components/ReturnDetails';
import ReturnShipping from '@/app/returns/[id]/components/ReturnShipping';
import StoreCredit from '@/app/returns/[id]/components/StoreCredit';
import CancelReturn from './components/CancelReturn';
import getReturnSummary from '@/app/utils/helpers/getReturnSummary';

export default async function ReturnPage({ params }) {
  
  const { id } = params;
  const returnData = await getReturn(id);
  const { returnType, returnShipping, storeCreditAmount, refundAmount, taxDeduction, restockingFee } = await getReturnSummary(returnData)
  const returnSummary = { returnType, returnShipping, storeCreditAmount, refundAmount, taxDeduction, restockingFee };


  return (
    <div className="flex flex-col gap-4">
      <ReturnDetails returnData={returnData} returnSummary={returnSummary} />
      <StoreCredit returnData={returnData} returnType={returnType} />
      <ReturnShipping returnData={returnData} returnType={returnType} returnShipping={returnShipping}/>
      <ReturnActions returnData={returnData} returnType={returnType}/>
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
