

import { DetailItem } from "../../../components/Elements";
import ReturnItem from "./ReturnItem"
import getSuggestedRefund from "@/app/utils/api/getSuggestedRefund";

export default async function ReturnDetails({ returnData }) {

    if (!returnData) return null
    const { refundAmount, storeCreditAmount, incrementalFee } = await getSuggestedRefund(returnData)

    const typeMap = {
      Refund: 'Refund',
      Credit: 'Store Credit',
    }
    const returnType = typeMap[returnData.returnType] || returnData.returnType;

    const returnShippingFeeNet = parseFloat(returnData.returnShippingFee) - parseFloat(incrementalFee)
    let returnShipping = ""
    
    if(returnShippingFeeNet > 0) {
      returnShipping =  `${returnData.currency} ${returnShippingFeeNet.toFixed(2)}`
    } else if(returnData.returnType === "Credit") {
      returnShipping = "Free"
    } else if(returnData.returnType === "Refund") {
      returnShipping = "Not Selected"
    }

   
  
    return (
      <div className="flex justify-between flex flex-col gap-4 rounded-md w-full ">
        <div className="flex md:flex-row flex-col gap-4">
          <div className="flex flex-col space-y-2 bg-gray-100 p-4 rounded-lg w-full">
            <DetailItem label="Return Reference" value={returnData.name} />
            <DetailItem label="Return Type" value={returnType} />
            <DetailItem label="Return Status" value={returnData.status} />
          </div>
          <div className="flex flex-col space-y-2 bg-gray-100 p-4 rounded-lg w-full">
            <DetailItem label="Total Items" value={returnData.totalQuantity} />
            {returnType === 'Refund' && <DetailItem label="Refund Amount" value={`${returnData.currency} ${refundAmount}`} />}
            {returnType === 'Store Credit' && <DetailItem label="Store Credit Issued" value={`${returnData.currency} ${storeCreditAmount}`} />}
            <DetailItem label="Return Shipping" value={returnShipping} />
          </div>
        </div>

        {returnData.items.map((item, index) => (
          <ReturnItem 
            item={item}
            index={index}
            key={index}
            existingReturn={true}
          />
        ))}
      </div>
    )
  }