"use client"

import { useState } from 'react';

export default function GetLabel({ returnData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [labelData, setLabelData] = useState(null);

  const returnShippingPayload = {
    returnId: returnData.id,
    
  }

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    
    const response = await fetch('/api/shipping-label', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });

    const data = await response.json();
    setLabelData(data);
    setLoading(false);
  };

  return (
    <div>
      <button
        className="btn-primary"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Label'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {labelData && <p>{labelData.trackingUrl}</p>}
    </div>
  );
}