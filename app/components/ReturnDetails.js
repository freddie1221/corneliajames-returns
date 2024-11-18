import OrderItem from "../orders/[id]/components/OrderItem";
import { DetailItem } from "./Elements";
import getSuggestedRefund from "@/app/utils/api/getSuggestedRefund";

export default async function ReturnDetails({ returnData }) {

    if (!returnData) return nul
  
    const suggestedRefund = await getSuggestedRefund(returnData)
    const currencyCode = returnData.currency
  
    return (
      <div className="flex justify-between flex flex-col gap-4 rounded-md w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem label="Return Reference" value={returnData.name} />
          <DetailItem label="Return Status" value={returnData.status} />
          <DetailItem label="Refund Amount" value={`${currencyCode} ${suggestedRefund}`} />
        </div>
        {returnData.items.map((item, index) => (
          <OrderItem 
            item={item}
            index={index}
            key={index}
            existingReturn={true}
          />
        ))}
      </div>
    )
  }