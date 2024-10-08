import { NextResponse } from 'next/server';
import { getOrder } from "@/app/utils/getOrder";
import noCacheHeaders from '@/app/utils/noCacheHeaders';

export async function GET(req, { params }) {
  const { id } = params;
  console.log('id: ', id)


  try {
    
    const order = await getOrder(id);

    // console.log('order: ', order)
    return NextResponse.json(order, { headers: noCacheHeaders });

  } catch (error) {
    
    if (error.message === 'Order not found') {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    if (error.response && error.response.status === 401) {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  
  }
}