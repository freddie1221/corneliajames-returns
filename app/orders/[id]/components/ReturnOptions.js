'use client';

import React from 'react';
import { GiftIcon, CreditCardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function ReturnOptions({ setReturnType, returnType, itemsCount, currencyCode, returnValue, restockingFee, returnShippingFee, restockingFeeExplainer }) {

  const feeValue = (returnValue * (restockingFee / 100)).toFixed(2)
  const refundAmount = (returnValue - feeValue).toFixed(2)
	const storeCreditAmount = (returnValue * 1.1).toFixed(2)

  return (
    <section className="max-w-4xl mx-auto py-8">
      <h2 className="text-3xl font-light text-center mb-12 tracking-wide">Select Your Preferred Return Option</h2>
      
      <div className="flex flex-col gap-8">
        <StoreCreditOption 
          setReturnType={setReturnType} 
          returnType={returnType} 
          itemsCount={itemsCount} 
          currencyCode={currencyCode} 
          storeCreditAmount={storeCreditAmount} 
        />
        {returnType === "Credit" && (
          <BackButton setReturnType={setReturnType} />
        )}
        {returnType !== 'Credit' && (
          <RefundOption 
            setReturnType={setReturnType} 
            returnType={returnType} 
            itemsCount={itemsCount} 
            currencyCode={currencyCode} 
            refundAmount={refundAmount} 
            returnShippingFee={returnShippingFee} 
            feeValue={feeValue}
            restockingFeeExplainer={restockingFeeExplainer}
          />
        )}
      </div>
    </section>
  );
}

function StoreCreditOption({ setReturnType, returnType, itemsCount, currencyCode, storeCreditAmount }) {
  return (
    <PremiumOptionCard
      type="Credit"
      isSelected={returnType === 'Credit'}
      setReturnType={setReturnType}
      className="md:transform md:hover:scale-105 transition-transform duration-300"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-light mb-2">Instant Store Credit</h3>
            <div className="inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm">
              Recommended Choice
            </div>
          </div>
          <GiftIcon className={`w-8 h-8 ${returnType === 'Credit' ? 'text-emerald-600' : 'text-gray-400'}`} />
        </div>
        
        <BenefitsList benefits={[
          { text: `${currencyCode} ${storeCreditAmount} in store credit (10% bonus)`, highlighted: true },
          'Complimentary return shipping',
          'Instant credit upon submitting your return',
          'Valid for 24 months on all purchases'
        ]} />

        <div className="text-sm text-gray-600 space-y-2">
          <p>Items being returned: {itemsCount}</p>
          <p className="text-emerald-600 font-medium">Return shipping: Complimentary</p>
        </div>
      </div>
    </PremiumOptionCard>
  )
}

function RefundOption({ setReturnType, returnType, itemsCount, currencyCode, refundAmount, returnShippingFee, feeValue, restockingFeeExplainer }) {
  return (
    <PremiumOptionCard
      type="Refund"
      isSelected={returnType === 'Refund'}
      setReturnType={setReturnType}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-light mb-2">Return for Refund</h3>
            <div className="inline-block bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm">
              Standard Return
            </div>
          </div>
          <CreditCardIcon className={`w-8 h-8 ${returnType === 'Refund' ? 'text-emerald-600' : 'text-gray-400'}`} />
        </div>

        <BenefitsList benefits={[
          { text: `${currencyCode} ${refundAmount} refund to original payment method`, highlighted: false },
          `Return shipping: ${currencyCode} ${returnShippingFee}`,
          feeValue > 0 ? `${restockingFeeExplainer}: ${currencyCode} ${feeValue}` : 'No restocking fee',
          'Refund issued upon receipt & check of the returned items'
        ]} />

        <div className="text-sm text-gray-500 border-t border-gray-100 pt-4">
          <p className="mb-2">Items being returned: {itemsCount}</p>
          <p className="italic">You may choose to purchase a return label from us or use your preferred shipping service.</p>
        </div>
      </div>
    </PremiumOptionCard>
  )
}

function PremiumOptionCard({ type, children, isSelected, setReturnType, className = '' }) {
  return (
    <button
      className={`w-full text-left transition-all duration-300 rounded-xl p-8 shadow-md
        ${isSelected ? 'bg-white shadow-xl border-2 border-gray-200' : 'bg-gray-50 hover:bg-white hover:shadow-lg'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200
        ${className}`}
      onClick={() => setReturnType(type)}
    >
      {children}
    </button>
  );
}

function BenefitsList({ benefits }) {
  return (
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <span className={benefit.highlighted ? 'font-medium text-emerald-700' : 'text-gray-600'}>
            {typeof benefit === 'string' ? benefit : benefit.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function BackButton({ setReturnType }) {
  return (
    <button
      onClick={() => setReturnType("")}
      className="text-gray-500 hover:text-gray-700 text-sm font-medium"
    >
      ← Back to options
    </button>
  )
}