export async function getOrder(id) {
  console.log("order id", id);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch order');
  }
  return res.json();
}