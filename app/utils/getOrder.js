
export async function getOrder(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shopify/orders/${id}`, { cache: 'no-store' });
    
    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.error || 'message from utility: Failed to fetch order');
    }
    
    const data = await res.json();

    return { data, error: null };

  } catch (error) {
    
    console.error(`getOrder Error [ID: ${id}]:`, error.message);
    
    return { 
      data: null, 
      error: error.message 
    };
  }
}