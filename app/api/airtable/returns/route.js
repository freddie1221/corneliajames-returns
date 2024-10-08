import { NextResponse } from 'next/server';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

export async function POST(request) {
	const { returnInput } = await request.json();
	
	try {
		const record = await base('Returns').create(
			returnInput, { typecast: true }
		);
		return NextResponse.json({ message: 'Return submitted successfully', recordId: record.id }, { status: 201 });
	} catch (error) {
		console.error('Error submitting return:', error);
		return NextResponse.json({ message: 'Failed to submit return', error: error.message }, { status: 500 });
	}
}

export async function GET(request) {

	const { searchParams } = new URL(request.url);
	const name = searchParams.get('name');

	const records = await base('Returns').select({
		filterByFormula: `{Return Name} = '${name}'`
	}).all();

	return NextResponse.json({ records });
}