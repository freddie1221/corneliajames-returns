'use client';

import React from 'react';

export default function ReturnOptions({ currencyCode, setReturnType, returnType, returnValue }) {
  const totalAmount = returnValue;
  const totalQuantity = 1

  return (
    <div className="return-options">
      <h2 className="heading-secondary text-center">Choose Your Return Option</h2>
      
      <div className="space-y-6">
        <OptionCard
          type="Credit"
          title="Instant Store Credit"
          subtitle="10% bonus + Free Return Shipping"
          setReturnType={setReturnType}
        >
          <p>Your store credit will be emailed to you instantly upon confirming your return. Enjoy a 10% bonus on your original purchase amount, usable immediately in our store.</p>
          <p>We'll provide a complimentary return label. Please return your original items within 30 days.</p>
          <p>Items being returned: {totalQuantity}</p>
          <p className="font-semibold">Store credit amount {currencyCode} {totalAmount}</p>
        </OptionCard>
        
        <OptionCard
          type="Refund"
          title="Refund to Original Payment Method"
          setReturnType={setReturnType}
        >
          <p>Your refund will be processed to your original payment method upon receipt of the returned items.</p>
          <p>Items being returned: {totalQuantity}</p>
          <p>Return shipping: GBP 4.50</p>
          <p className="font-semibold">Refund amount: {currencyCode} {totalAmount}</p>
          <p>You may choose to purchase a return label from us or use your preferred shipping service.</p>
        </OptionCard>
      </div>
    </div>
  );
}

function OptionCard({ type, title, subtitle, children, setReturnType }) {
  return (
    <div
      className={`cursor-pointer rounded-lg p-6 transition-all duration-300 bg-white`}
      onClick={() => {
        setReturnType(type);
      }}
    >
      <div className="flex items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
        </div>
      </div>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  );
}