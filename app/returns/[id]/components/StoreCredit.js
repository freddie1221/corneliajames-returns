export default function StoreCredit({ returnData, storeCreditAmount }){
  console.log("storeCreditAmount", storeCreditAmount)
  
  return (
    <div className="container bg-white rounded-lg p-5 md:px-8 md:pb-8">
      <h2 className="heading-secondary">Store Credit</h2>
      <div className="flex flex-col gap-4 items-center">
        <p className="text-sm text-center">Click here to generate your store credit.</p>
        <button className="btn-primary md:max-w-[50%] ">Generate Store Credit</button>
      </div>
    </div>
  )
}