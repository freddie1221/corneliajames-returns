
import { DetailItem } from "../../../components/Elements";
import ReturnItem from "./ReturnItem"
import getReturnSummary from "@/app/utils/helpers/getReturnSummary";

export default async function ReturnDetails({ returnData }) {

    if (!returnData) return null
    const { returnType, returnShipping, storeCreditAmount, refundAmount, taxDeduction, restockingFee } = await getReturnSummary(returnData)

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
            {returnType === 'Refund' && <DetailItem label="Refund Amount" value={`${returnData.currency} ${refundAmount.toFixed(2)}`} />}
            {taxDeduction > 0 && <DetailItem label="Tax Deduction" value={`${returnData.currency} ${taxDeduction.toFixed(2)}`} />}
            {restockingFee > 0 && <DetailItem label="Restocking" value={`${returnData.currency} ${restockingFee.toFixed(2)}`} />}
            {returnType === 'Credit' && <DetailItem label="Store Credit Issued" value={`${returnData.currency} ${storeCreditAmount.toFixed(2)}`} />}
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