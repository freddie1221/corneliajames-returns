import { DetailItem } from "./Elements";


export default function ReturnDocuments({ returnData }) {
  return (
    <div>
      <h2 className="heading-secondary">Return Shipping</h2>
      {returnData.returnDocuments && returnData.countryCode !== 'GB' ? <ReturnDocumentsContent returnData={returnData} /> : ''}
      {!returnData.returnDocuments && returnData.countryCode !== 'GB' ? 'Please wait a moment while your documents are being generated...' : ''}
      {returnData.countryCode === 'GB' ? <RoyalMailInfo /> : ''}
    </div>
  )
}

function ReturnDocumentsContent({ returnData }) {
  return (
  <div className="flex flex-row justify-between">
    <div className="flex flex-col gap-2">
      <DetailItem label="Carrier" value={returnData.returnTrackingCarrier} align="items-start" />
      <DetailItem label="Tracking Number" value={returnData.returnTrackingNumber} align="items-start" />
    </div>
    
    <div className="flex flex-col gap-2">
      <a className="text-right text-blue-500 underline" href={returnData.returnDocuments} target="_blank" rel="noopener noreferrer">Download Label & Documents</a>
      <a className="text-right text-blue-500 underline" href={returnData.returnTrackingURL} target="_blank" rel="noopener noreferrer">Tracking Link</a>
    </div>
  </div>
  )
}

function RoyalMailInfo(){
  return(
    <div className="flex flex-col gap-2 items-center">
      <p>Please follow the Royal Mail link to get your Royal Mail Tracked Returns QR code.</p>
      <a className="text-blue-500 underline" href="https://www.royalmail.com/track-my-return#/details/6353" target="_blank" rel="noopener noreferrer">Royal Mail Return Label</a>
    </div>
  )
}