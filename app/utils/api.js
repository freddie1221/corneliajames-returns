

export async function getOrder(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch order');
    }
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { data: null, error: 'Error loading order details. Please try again later.' };
  }
}

export async function getReturn(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/returns/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch return');
    }
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching return:', error);
    return { data: null, error: 'Error loading return details. Please try again later.' };
  }
}