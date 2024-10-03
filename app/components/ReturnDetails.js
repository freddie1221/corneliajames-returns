import OrderItem from "./OrderItem";

export default function ReturnDetails({ returnData }) {

  return (
    <div className="shadow-md rounded p-6 mb-4 mx-auto flex flex-col items-center gap-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Return Details</h1>
      <h2 className="heading-secondary">Return Items</h2>
      <div>{returnData.name}</div>
        <div>{returnData.status}</div>
        <div>{returnData.id}</div>
        <div>{returnData.fullId}</div>
        <div className="flex flex-col gap-4 w-full">
          {returnData.returnLineItems.map((item, index) => (
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