'use client'

import OrderItem from "./OrderItem";

export default function ReturnDetails({ returnData }) {

  if (!returnData) return null

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Return Details</h1>
      <h2 className="heading-secondary">Return Items</h2>
      <div>{returnData.name}</div>
        <div>{returnData.status}</div>
        <div>{returnData.id}</div>
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
      </div>
  )
}