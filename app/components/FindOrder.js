"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';
import { ErrorMessage } from './Elements';

export default function FindOrder() {
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading to true when request starts

    if (!email || !orderNumber) {
      setError('Please fill in all fields');
      setLoading(false); // Set loading to false if validation fails
      return;
    }

    if (!/^\d{5}$/.test(orderNumber)) {
      setError('Order number must be 5 digits');
      setLoading(false); // Set loading to false if validation fails
      return;
    }

    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, orderNumber }),
      });

      if (response.ok) {
        const orderId = await response.json();
        router.push(`/orders/${orderId}`);
      } else {
        setError('Order not found');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col space-y-4">
      <div>
        <label htmlFor="email" className="block">Email</label>
        <div className="text-sm text-gray-500 mb-2">The email address used to place the order</div>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="orderNumber" className="block">Order Number</label>
        <div className="text-sm text-gray-500 mb-2">A 5 digit number beginning with #</div>
        <input
          type="number"
          id="orderNumber"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
          pattern="\d{5}"
        />
      </div>
      {loading ? ( <LoadingSpinner /> ) : (
        <button type="submit" className="btn-primary bg-navy w-full">
          Start Return / Exchange
        </button>
      )}
      {error && <ErrorMessage text={error} />}
    </form>
  );
}