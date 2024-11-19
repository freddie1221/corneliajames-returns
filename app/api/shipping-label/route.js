import { NextResponse } from 'next/server';
import getLabel from '@/app/utils/api/getLabel';
import createDelivery from '@/app/utils/api/createDelivery';
import buildShipment from '@/app/utils/helpers/buildShipment';

export async function POST(req) {
  try {
    const returnData = await req.json();

    const shipmentPayload = buildShipment(returnData);
    
    const easypostResponse = await getLabel(shipmentPayload);
    const shipment = await easypostResponse.json()

    if (shipment.postage_label) {

      const deliveryData = {
        label_url: shipment.postage_label.label_url,
        tracking_code: shipment.tracking_code,
        public_url: shipment.tracker.public_url,
        reverseFulfillmentOrderId: returnData.reverseFulfillmentOrderId,
        reverseFulfillmentOrderLineItems: returnData.reverseFulfillmentOrderLineItems
      };
      
      try {
        await createDelivery(deliveryData);
        return NextResponse.json({success: true});
      } catch (error) {
        console.log("error calling shopify", error)
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
      }
      
    } else {
      console.log("error calling easypost", shipment)
      return NextResponse.json(
        { success: false, error: shipment || 'Failed to retrieve shipment.' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("generic error AKA something in this file was crap: ", error)
    return NextResponse.json(
      { success: false, error: 'Generic error in API route. Error: ' + error },
      { status: 500 }
    );
  }
}
