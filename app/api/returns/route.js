import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

export async function POST(request) {
    try {
        const { returnType, reason, order } = await request.json();
        const returnNumber = parseInt(order.name.split('#')[1]);
        console.log('from API,', returnType, reason, order, returnNumber);

        const airtableData = {
            Type: returnType,
            Currency: order.totalPriceSet.presentmentMoney.currencyCode,
            "Return reason": reason,
            "Return number": returnNumber,
        };

        const record = await base('Returns').create(airtableData);
        return NextResponse.json({ message: 'Return submitted successfully', recordId: record.id }, { status: 201 });

    } catch (error) {
        console.error('Error submitting return:', error);
        return NextResponse.json({ message: 'Failed to submit return', error: error.message }, { status: 500 });
    }
}