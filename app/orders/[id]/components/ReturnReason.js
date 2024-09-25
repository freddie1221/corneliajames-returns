'use client';

import React from 'react';

export default function ReturnReason({ onReasonChange }) {
  const handleReasonChange = (event) => {
    onReasonChange(event.target.value);
  };

  return (
    <div className="return-reason">
      <label htmlFor="return-reason" className="block text-sm font-medium text-gray-700">
        Reason for Return
      </label>
      <textarea
        id="return-reason"
        name="return-reason"
        rows="4"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={handleReasonChange}
        placeholder="Please describe the reason for your return..."
      />
    </div>
  );
}