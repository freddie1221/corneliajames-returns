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


  return (
    <div className="flex flex-col gap-4">
      <div className="container bg-white rounded-lg p-5">
        <h1 className="heading-secondary">Return Details</h1>
        <ReturnDetails returnData={returnData} />
      </div>
      <StoreCredit returnData={returnData} returnType={returnType} />
      <ReturnShipping returnData={returnData} returnType={returnType} returnShipping={returnShipping}/>
      <ReturnActions returnData={returnData} />
    </div>
  )
}

function ReturnActions({ returnData }){
  return (
    <div className="container flex gap-4 w-full p-5 md:px-8">
      <CancelReturn 
        returnId={returnData.id.split('/').pop()} 
        orderId={returnData.orderId} 
        returnType={returnData.returnType} 
        status={returnData.status} 
      />
      <Link href={`/orders/${returnData.orderId}`} className="btn btn-tertiary w-full">View Order</Link>
    </div>
  )
}
