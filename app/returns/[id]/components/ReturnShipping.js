"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DetailItem } from "../../../components/Elements";
import useGetLabel from "@/app/hooks/useGetLabel";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Message } from "@/app/components/Elements";

export default function ReturnShipping({ returnData }) {
  
  return (
    <div className="container bg-white rounded-lg p-5 md:px-8 md:pb-8">
      <h2 className="heading-secondary">Return Shipping</h2>
      {returnData.countryCode === 'GB' ? 
        <GbShipping /> : 
        <InternationalShipping returnData={returnData} />}
    </div>
  )
}

function InternationalShipping({ returnData }){
  const { isLoading, error, success, getLabel } = useGetLabel();
  const router = useRouter();
  
  useEffect(() => {
    if (success) {
      router.refresh();
    }
  }, [success, router]);
  
  if(returnData.returnDocs.label) return <ReturnDocs returnDocs={returnData.returnDocs} />
  if(isLoading) return <LoadingSpinner />
  if(error) return <Message text={error} />
  if(!success) return( 
    <div className="flex flex-col gap-4 items-center">
      <p className="text-sm text-center">Click here below to generate your return label.</p>
      <button className="btn btn-primary md:max-w-[50%] " onClick={() => getLabel(returnData)}>Get Return Shipping Label</button>
    </div>
  )
}

function ReturnDocs({ returnDocs }){
  return (
    <div className="flex flex-row justify-around py-4 bg-gray-50 rounded-lg p-4">
      
      <div className="flex flex-col gap-2">
        <DetailItem label="Carrier" value="DHL Express" align="items-start" />
        <DetailItem label="Tracking Number" value={returnDocs.number} align="items-start" />
        <div className="flex flex-col">
          <span className="text-gray-600 text-sm">Tracking Link</span>
          <a className="text-blue-500 underline" href={returnDocs.tracking} target="_blank" rel="noopener noreferrer">Tracking Link</a>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 text-sm">Download Label</span>
          <a className="text-blue-500 underline" href={returnDocs.label} target="_blank" rel="noopener noreferrer">Download Label</a>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-gray-600 text-sm">Your Shipping Label</span>
        <Image src={returnDocs.label} alt="Return Label" width={180} height={180} className=" border border-gray-300 rounded-lg p-2" />
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
