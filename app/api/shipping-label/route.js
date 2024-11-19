import { NextResponse } from 'next/server';
import getLabel from '@/app/utils/api/getLabel';
import createDelivery from '@/app/utils/api/createDelivery';

export async function POST(req) {
  try {
    const easypostResponse = await getLabel();
    const shipment = await easypostResponse.json()

    if (shipment.postage_label) {
      const deliveryData = {
        label_url: shipment.postage_label.label_url,
        tracking_code: shipment.tracking_code,
        public_url: shipment.tracker.public_url,
        fulfillmentOrderId: "gid://shopify/ReverseFulfillmentOrder/10614702244",
        lineItems: [
          {
            "quantity": 1,
            "reverseFulfillmentOrderLineItemId": "gid://shopify/ReverseFulfillmentOrderLineItem/14821490852"
          }
        ]
      };
      
      try {
        await createDelivery(deliveryData);
        return NextResponse.json({success: true});
      } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create delivery.' }, { status: 500 });
      }
      
    } else {
      return NextResponse.json(
        { success: false, error: shipment.error?.error || 'Failed to retrieve shipment.' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
