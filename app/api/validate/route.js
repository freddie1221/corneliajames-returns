import { NextResponse } from 'next/server';
import { validateOrder } from '@/app/utils/api/validateOrder';

export async function POST(req) {
  const { email, orderNumber } = await req.json();
  
  try {
    const orders = await validateOrder(email, orderNumber);
    const orderId = orders[0].id.split('/').pop();
    return NextResponse.json(orderId);

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}