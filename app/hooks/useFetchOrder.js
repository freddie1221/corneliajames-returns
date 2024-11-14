import { useState, useEffect } from 'react';

export function useFetchOrder(orderId) {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/shopify/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        // console.log('order: ', data);
        
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return { order, error, loading };
}