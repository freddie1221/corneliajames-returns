'use client'

import OrderItem from "./OrderItem";
import { DetailItem } from "./Elements";
import ReturnMeta from "./ReturnMeta";

export default function ReturnDetails({ returnData }) {

  if (!returnData) return null

  return (
    <div className="flex flex-col gap-4 border rounded-md w-full p-5">

      <div className="flex justify-between ">
        <DetailItem label="Return Name" value={returnData.name} />
        <DetailItem label="Return Status" value={returnData.status} />
      </div>
      <ReturnMeta returnData={returnData} />

      <h2 className="heading-tertiary">Items</h2>
        <div className="flex flex-col gap-4 w-full">
          {returnData.items.map((item, index) => (
            <OrderItem 
              item={item}
              index={index}
              key={index}
              onSelectItem={() => {}}
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