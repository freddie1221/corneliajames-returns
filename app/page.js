'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './components/LoadingSpinner'; // Adjust the import path as necessary

export default function Home() {
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
      const response = await fetch('/api/lookup-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, orderNumber }),
      });

      if (response.ok) {
        const { orderId } = await response.json();
        router.push(`/order/${orderId}`);
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Lookup</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="orderNumber" className="block mb-2">Order Number:</label>
          <input
            type="text"
            id="orderNumber"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
            pattern="\d{5}"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? ( <LoadingSpinner /> ) : (
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Look up Order
          </button>
        )}
      </form>
    </div>
  );
}