

export async function getOrder(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch order');
  }
  
  return res.json();
}


export async function getReturn(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/returns/${id}`, { cache: 'no-store' });

    console.log("return res", res);
    return res.json();
  } catch (error) {
    console.error('Error fetching return:', error);
    // You can choose to handle the error here or rethrow it
    throw error; // Re-throwing the error allows it to be handled elsewhere
  }
}