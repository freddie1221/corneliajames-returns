'use client'

import { useEffect, useState } from 'react';

export default function useExistingReturns(orderId) {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await fetch(`/api/returns?id=6353247404196`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        console.log(data.order.returns.nodes[0]);

        const simplifiedData = data.order.returns.nodes.map(node => ({
          name: node.name,
          status: node.status,
          returnLineItems: node.returnLineItems.nodes.map(item => ({
            lineItem: item.fulfillmentLineItem.lineItem,
            image: item.fulfillmentLineItem.lineItem.image.url,
            name: item.fulfillmentLineItem.lineItem.name,
            returnReasonNote: item.returnReasonNote,
            returnReason: item.returnReason,
            quantity: item.quantity
          }))
        }));

        setReturns(simplifiedData);
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

    