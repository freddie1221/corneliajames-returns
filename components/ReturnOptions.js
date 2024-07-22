'use client';

import React from 'react';

export default function ReturnOptions({ setSelectedOption, selectedOption }) {

  return (
    <div className="return-options">
      <h2 className="text-2xl font-semibold mb-6 text-center">Choose Your Return Option</h2>
      
      <div className="space-y-6">
        <OptionCard
          option="store-credit"
          title="Instant Store Credit"
          subtitle="10% bonus + Free Return Shipping"
          isSelected={selectedOption === 'store-credit'}
          setSelectedOption={setSelectedOption}
        >
          <p>Your store credit will be emailed to you instantly upon confirming your return. Enjoy a 10% bonus on your original purchase amount, usable immediately in our store.</p>
          <p>We'll provide a complimentary return label. Please return your original items within 30 days.</p>
          <p>Items being returned: 1</p>
          <p className="font-semibold">Store credit amount: GBP 50</p>
        </OptionCard>
        
        <OptionCard
          option="refund"
          title="Refund to Original Payment Method"
          isSelected={selectedOption === 'refund'}
          setSelectedOption={setSelectedOption}
        >
          <p>Your refund will be processed to your original payment method upon receipt of the returned items.</p>
          <p>Items being returned: 1</p>
          <p>Return shipping: GBP 4.50</p>
          <p className="font-semibold">Refund amount: GBP 100</p>
          <p>You may choose to purchase a return label from us or use your preferred shipping service.</p>
        </OptionCard>
      </div>
    </div>
  );
}

function OptionCard({ option, title, subtitle, isSelected, children, setSelectedOption }) {
  return (
    <div
      className={`cursor-pointer rounded-lg p-6 transition-all duration-300 ${
        isSelected
          ? 'bg-yellow-600 text-white shadow-lg'
          : 'bg-white text-gray-800 hover:shadow-md'
      }`}
      onClick={() => {
        console.log('Option clicked:', option);
        setSelectedOption(option);
        alert(`Option selected: ${option}`);
      }}
    >
      <div className="flex items-center mb-4">
        <div className={`w-6 h-6 rounded-full border-2 mr-3 flex-shrink-0 ${
          isSelected ? 'bg-white border-white' : 'border-yellow-600'
        }`}>
          {isSelected && <div className="w-3 h-3 bg-yellow-600 rounded-full m-auto" />}
        </div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
        </div>
      </div>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  );
}