

import { DetailItem } from "../../../components/Elements";
import ReturnItem from "./ReturnItem"
import getSuggestedRefund from "@/app/utils/api/getSuggestedRefund";

export default async function ReturnDetails({ returnData }) {

    if (!returnData) return null
    console.log("Return Details ", returnData)
  
    const suggestedRefund = await getSuggestedRefund(returnData)
    const currencyCode = returnData.currency
    const statusMap = {
      OPEN: 'Awaiting Items',
      CANCELLED: 'Cancelled',
      CLOSED: 'Complete',
    };
    const returnStatus = statusMap[returnData.status] || returnData.status;

    const typeMap = {
      Refund: 'Refund',
      Credit: 'Store Credit',
    }
    const returnType = typeMap[returnData.returnType] || returnData.returnType;
    const returnShipping = returnData.returnShippingFee ? `${currencyCode} ${returnData.returnShippingFee}` : 'Free';
  
  
    return (
      <div className="flex justify-between flex flex-col gap-4 rounded-md w-full ">
        <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
          <DetailItem label="Return Reference" value={returnData.name} />
          <DetailItem label="Total Items" value={returnData.totalQuantity} />
          <DetailItem label="Return Type" value={returnType} />
          <DetailItem label="Refund Amount" value={`${currencyCode} ${suggestedRefund}`} />
          <DetailItem label="Return Status" value={returnStatus} />
          <DetailItem label="Return Shipping" value={returnShipping} />
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