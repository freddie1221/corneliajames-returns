import { NextResponse } from 'next/server';
import { getOrder } from "@/app/utils/getOrder";


export async function GET(req, { params }) {
  const { id } = params;
  const response = await getOrder(id);
  const order = await response.json();
  
  return NextResponse.json(order)
}