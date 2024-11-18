

import { DetailItem } from "./Elements";
import ReturnItem from "./ReturnItem"
import getSuggestedRefund from "@/app/utils/api/getSuggestedRefund";

export default async function ReturnDetails({ returnData }) {

    if (!returnData) return nul
  
    const suggestedRefund = await getSuggestedRefund(returnData)
    const currencyCode = returnData.currency
  
    return (
      <div className="flex justify-between flex flex-col gap-4 rounded-md w-full ">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DetailItem label="Return Reference" value={returnData.name} />
          <DetailItem label="Return Status" value={returnData.status} />
          <DetailItem label="Total Items" value={returnData.totalQuantity} />
          <DetailItem label="Return Type" value={returnData.returnType} />
          <DetailItem label="Refund Amount" value={`${currencyCode} ${suggestedRefund}`} />
          <DetailItem label="Return Shipping" value={`${currencyCode} ${returnData.returnShippingFee}`} />
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