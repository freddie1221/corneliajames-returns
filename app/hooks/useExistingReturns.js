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


        const simplifiedData = data.order.returns.nodes.map(node => ({
          name: node.name,
          status: node.status,
          fullId: node.id,
          id: node.id.split("/").pop(),
          returnLineItems: node.returnLineItems.nodes.map(item => ({
            lineItem: item.fulfillmentLineItem.lineItem,
            image: item.fulfillmentLineItem.lineItem.image.url,
            name: item.fulfillmentLineItem.lineItem.name,
            price: parseFloat(item.fulfillmentLineItem.originalTotalSet.presentmentMoney.amount),
            discount: parseFloat(item.fulfillmentLineItem.discountedTotalSet.presentmentMoney.amount),
            currencyCode: item.fulfillmentLineItem.originalTotalSet.presentmentMoney.currencyCode,
            returnReasonNote: item.returnReasonNote,
            returnReason: item.returnReason,
            quantity: parseInt(item.quantity),
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

    