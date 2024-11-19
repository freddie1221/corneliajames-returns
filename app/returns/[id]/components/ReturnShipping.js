"use client"

import { DetailItem } from "../../../components/Elements";
import useGetLabel from "@/app/hooks/useGetLabel";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Message } from "@/app/components/Elements";

export default function ReturnShipping({ returnData }) {
  
  return (
    <div>
      <h2 className="heading-secondary">Return Shipping</h2>
      {returnData.countryCode === 'GB' ? 
        <GbShipping /> : 
        <InternationalShipping returnData={returnData} />}
    </div>
  )
}

function InternationalShipping({ returnData }){
  const { isLoading, error, success, getLabel } = useGetLabel();
  console.log(returnData.returnDocs)
  
  if(returnData.returnDocs.label) return <ReturnDocs returnDocs={returnData.returnDocs} />
  if(isLoading) return <LoadingSpinner />
  if(error) return <Message text={error} />
  if(!success) return <button className="btn-primary" onClick={() => getLabel(returnData)}>Get Label</button>
}

function ReturnDocs({ returnDocs }){
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-2">
        <DetailItem label="Carrier" value={returnDocs.carrier} align="items-start" />
        <DetailItem label="Tracking Number" value={returnDocs.number} align="items-start" />
      </div>
      <div className="flex flex-col gap-2">
        <a className="text-right text-blue-500 underline" href={returnDocs.label} target="_blank" rel="noopener noreferrer">Download Label & Documents</a>
        <a className="text-right text-blue-500 underline" href={returnDocs.tracking} target="_blank" rel="noopener noreferrer">Tracking Link</a>
      </div>
    </div>
  )
}

function GbShipping(){
  return (
    <div>
      <p>Please follow the Royal Mail link to get your Royal Mail Tracked Returns QR code.</p>
      <a className="text-blue-500 underline" href="https://www.royalmail.com/track-my-return#/details/6353" target="_blank" rel="noopener noreferrer">Royal Mail Return Label</a>
    </div>
  )
}
