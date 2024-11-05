
import { useEffect, useState } from 'react';

export default function useExistingReturns(orderId) {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      setReturns([]);
      return;
    }

    const fetchReturns = async () => {
      try {
        const response = await fetch(`/api/shopify/orders/${orderId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-cache', // Disable caching
        });

        if (!response.ok) {
          throw new Error('Failed to fetch returns');
        }

        const data = await response.json();

        const returns = data.returns

        setReturns(returns);
        setLoading(false);
      } catch (err) {

        setError(err.message);
        setLoading(false);
      }
    };

    fetchReturns();
  }, [orderId]);

  return { returns, loading, error };
}