import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function POST(request) {
  const { email, orderNumber } = await request.json();

  // Initialize Airtable
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

  try {
    // Search for the order in Airtable
    const records = await base('Orders').select({
      filterByFormula: `AND({Customer email} = '${email}', {Order Number} = '${orderNumber}')`,
      maxRecords: 1,
    }).firstPage();

    if (records.length > 0) {
      console.log("Found!")
      // If found, return the Shopify order ID
      const shopifyOrderId = records[0].get('Order ID');
      return NextResponse.json({ orderId: shopifyOrderId });
    } else {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Airtable error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}