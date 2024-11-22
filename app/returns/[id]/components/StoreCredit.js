export default function StoreCredit({ returnData }){
  
  return (
    <>
      <div className="container bg-white rounded-lg p-5 md:px-8 md:pb-8 space-y-4">
        <h2 className="heading-secondary">Store Credit</h2>
        <div className="flex flex-col gap-4 items-center">
          <span className="text-sm text-center">
            Your store credit has been automatically issued for the account associated with the email <span className="font-bold">{returnData.email}</span>.
            You should have received an email with the details. If there are any issues, please contact us.
          </span>
          <button className="btn btn-tertiary">Contact Us</button>
        </div>
      </div>
    </>
  )
}