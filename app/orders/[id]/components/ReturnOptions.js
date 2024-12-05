'use client';

import { GiftIcon, CreditCardIcon, CheckCircleIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function ReturnOptions({ 
  setReturnType, 
  returnType, 
  itemsCount, 
  currencyCode,
  countryCode,
  returnValue, 
  restockingFee, 
  exclusions,
  calculateShipping,
  shippingFee,
  includeShipping,
  setIncludeShipping,
  confirmation,
  setConfirmation
}) {
  
  const feeValue = (returnValue * (restockingFee.fee / 100)).toFixed(2)
	const storeCreditAmount = (returnValue * 1.1).toFixed(2)
  
  const refundAmount = (returnValue - feeValue - shippingFee).toFixed(2)
  const textColor = returnType === 'Credit' ? 'text-emerald-600' : 'text-navy'
  const borderColor = returnType === 'Credit' ? 'border-emerald-600' : 'border-navy'

  return (
    <section className="py-8">
      <h2 className="text-3xl font-light text-center mb-8 tracking-wide">Select Your Preferred Return Option</h2>
      
      <div className="flex flex-col gap-8"> 
        <StoreCreditOption 
          setReturnType={setReturnType} 
          returnType={returnType} 
          itemsCount={itemsCount} 
          currencyCode={currencyCode} 
          storeCreditAmount={storeCreditAmount} 
          calculateShipping={calculateShipping}
        />

        {returnType === "Credit" && (
          <BackButton setReturnType={setReturnType} />
        )}
        {returnType !== 'Credit' && !exclusions.alteration && (
          <RefundOption 
            setReturnType={setReturnType} 
            returnType={returnType} 
            itemsCount={itemsCount} 
            currencyCode={currencyCode} 
            refundAmount={refundAmount} 
            calculateShipping={calculateShipping}
            restockingFee={restockingFee}
            feeValue={feeValue}
          />
        )}
        {returnType === 'Refund' && (
          <ReturnShipping 
            calculateShipping={calculateShipping}
            includeShipping={includeShipping}
            setIncludeShipping={setIncludeShipping}
            countryCode={countryCode}
            currencyCode={currencyCode}
          />
        )}
        {returnType && (
          <Confirmation 
            confirmation={confirmation} 
            setConfirmation={setConfirmation} 
            textColor={textColor} 
            borderColor={borderColor}
          />
        )}
      </div>
    </section>
  );
}

function StoreCreditOption({ setReturnType, returnType, itemsCount, currencyCode, storeCreditAmount, calculateShipping }) {
  
  const benefits = [
    { text: `${currencyCode} ${storeCreditAmount} in store credit (10% bonus)`, highlighted: true },
    `Complimentary ${calculateShipping.text}`,
    'Instant credit upon submitting your return',
    'Shop straight away for the replacement items you would like, and receive them before shipping your originals back to us'
  ];
  
  return (
    <OptionCard
      type="Credit"
      isSelected={returnType === 'Credit'}
      setReturnType={setReturnType}
      borderColor="border-emerald-600"
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
        
        <BenefitsList benefits={benefits} />

        <div className="text-sm text-gray-600 space-y-2">
          <p>Items being returned: {itemsCount}</p>
          <p className="text-emerald-600 font-medium">Return shipping: Complimentary</p>
        </div>
      </div>
    </OptionCard>
  )
}

function RefundOption({ setReturnType, returnType, itemsCount, currencyCode, refundAmount, feeValue, restockingFee, includeShipping }) {

  const benefits = [
    { text: `${currencyCode} ${refundAmount} refund to original payment method`, highlighted: true },
    feeValue > 0 ? `${restockingFee.explainer}: ${currencyCode} ${feeValue}` : null,
    'Refund issued upon receipt & check of the returned items'
  ].filter(Boolean); 

  return (
    <OptionCard
      type="Refund"
      isSelected={returnType === 'Refund'}
      setReturnType={setReturnType}
      borderColor="border-navy"
      className=""
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-light mb-2">Return for Refund</h3>
            <div className="inline-block bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm">
              Standard Return
            </div>
          </div>
          <CreditCardIcon className={`w-8 h-8 ${returnType === 'Refund' ? 'text-navy' : 'text-gray-400'}`} />
        </div>

        <BenefitsList benefits={benefits} color="navy" />
        <div className="text-sm text-gray-500 border-t border-gray-100 pt-4">
          <p className="mb-2">Items being returned: {itemsCount}</p>
          <p className="italic">You may choose to purchase a return label from us or use your preferred shipping service.</p>
        </div>
      </div>
    </OptionCard>
  );
}

function BenefitsList({ benefits, color = 'emerald-600' }) {
  return (
    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex  gap-2">
          <CheckCircleIcon className={`w-5 h-5 text-${color} flex-shrink-0`} />
          <span className={benefit.highlighted ? `font-medium text-${color}` : `text-gray-600`}>
            {typeof benefit === 'string' ? benefit : benefit.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function OptionCard({ type, children, isSelected, setReturnType, className, borderColor = 'border-emerald-600' }) {
  return (
    <button
      className={`w-full text-left transition-all duration-300 rounded-xl p-8 shadow-md
        ${isSelected ? `bg-white shadow-xl border-2 ${borderColor}` : `bg-gray-50 hover:bg-white hover:shadow-lg`}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 md:transform transition-transform duration-300
        ${className}`}
      onClick={() => setReturnType(type)}
    >
      {children}
    </button>
  );
}

function ReturnShipping({ calculateShipping, includeShipping, setIncludeShipping, currencyCode }) {

  
  const benefits = [
    {text: `${calculateShipping.text} Label: ${currencyCode} ${calculateShipping.fee}`, highlighted: true},
    calculateShipping.explainer
  ]
  
  return (
    <button
      className={`w-full text-left transition-all duration-300 rounded-xl p-8 shadow-md
        ${includeShipping ? 'bg-white shadow-xl border-2 border-navy' : 'bg-gray-50 hover:bg-white hover:shadow-lg'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 md:transform transition-transform duration-300`}
      onClick={() => setIncludeShipping(!includeShipping)}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-light mb-2">Include Return Shipping Label</h3>
          <PaperAirplaneIcon className={`w-8 h-8 ${includeShipping ? 'text-navy' : 'text-gray-400'}`} />
        </div>
        <BenefitsList benefits={benefits} color="navy" />
      </div>
    </button>
  )
}

function Confirmation({ confirmation, setConfirmation, textColor, borderColor }) {
  return (
    <button
      className={`w-full text-left transition-all duration-300 rounded-xl p-8 shadow-md
        ${confirmation ? `bg-white shadow-xl border-2 ${borderColor}` : 'bg-gray-50 hover:bg-white hover:shadow-lg'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 md:transform transition-transform duration-300`}
      onClick={() => setConfirmation(!confirmation)}
    >
        <div className="flex items-center justify-between  mb-2">
          <h3 className="text-xl font-light">Confirmation</h3>
          <CheckCircleIcon className={`w-8 h-8 ${textColor}`} />
        </div>
        <p className="text-gray-500">
          Please confirm that the item/s you are returning to us have not been worn or used in any way, and as such are in brand new condition.
          If you have any doubts in this respect, please do contact us first.
        </p>
    </button>
  )
}

function BackButton({ setReturnType }) {
  return (
    <button
      onClick={() => setReturnType("")}
      className="text-gray-600 hover:text-gray-800 font-medium"
    >← Back to options</button>
  )
}