import OrderItem from "../orders/[id]/components/OrderItem";
import { DetailItem } from "./Elements";
import getSuggestedRefund from "@/app/utils/api/getSuggestedRefund";

export default async function ReturnDetails({ returnData }) {

  if (!returnData) return nul

  const suggestedRefund = await getSuggestedRefund(returnData)
  const currencyCode = returnData.currency


  return (
    <div className="flex flex-col gap-4 border rounded-md w-full p-5">

      <div className="flex justify-between ">
        <DetailItem label="Return Name" value={returnData.name} />
        <DetailItem label="Return Status" value={returnData.status} />
        <DetailItem label="Refund" value={`${currencyCode} ${suggestedRefund}`} />
      </div>
      

      <h2 className="heading-tertiary">Items</h2>
        <div className="flex flex-col gap-4 w-full">
          {returnData.items.map((item, index) => (
            <OrderItem 
              item={item}
              index={index}
              key={index}
              existingReturn={true}
            />
          ))}
        </div>
        <div className="text-xs text-center">
          ID: {returnData.id.split('/').pop()}
        </div>
      </div>
  )
}