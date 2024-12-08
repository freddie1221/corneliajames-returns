"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OrderItemsSelector from './OrderItemsSelector';
import ReturnOptions from './ReturnOptions';
import { Message } from '@/app/components/Elements';
import calculateRestockingFee from '@/app/utils/helpers/calculateRestockingFee';
import calculateShippingFee from '@/app/utils/helpers/calculateShippingFee';
import calculateIncrementalFee from '@/app/utils/helpers/calculateIncrementalFee';
import useCreateReturn from '@/app/hooks/useCreateReturn';
import useStoreCredit from '@/app/hooks/useStoreCredit';
import ReturnConfirmation from './ReturnConfirmation';
import ReturnShipping from './ReturnShipping';

export default function ReturnForm({ order }) {
	const router = useRouter();
	const [returnType, setReturnType] = useState('');
	const [returnLineItems, setReturnLineItems] = useState([]);
	const [itemsCount, setItemsCount] = useState(0);
	const [returnValue, setReturnValue] = useState(0);
	const [includeShipping, setIncludeShipping] = useState(false);

	const [refundAmount, setRefundAmount] = useState(0);
	const [shippingFee, setShippingFee] = useState(0);
	
	const [restockingFee, setRestockingFee] = useState(0);
	const [restockingFeeExplainer, setRestockingFeeExplainer] = useState('');
	const [aggregateShippingFee, setAggregateShippingFee] = useState(0)
	
	const [confirmation, setConfirmation] = useState(false);
	const { createReturn, loading, error, success } = useCreateReturn();
	const { createStoreCredit } = useStoreCredit();

	if(order.totalPrice === 0) {
		return <Message text="This order has no value to refund." />
	}

	useEffect(() => {
		
		const { fee, explainer } = calculateRestockingFee({returnType, itemsCount});
		const { shippingFee } = calculateShippingFee({
			shippingService: order.shippingService,
			returnType,
			includeShipping
		})
		console.log("shippingFee from hook", shippingFee)
		
		const { incrementalFee } = calculateIncrementalFee({
			restockingFeePercentage: fee, 
			discountedSubtotal: order.totalPrice, 
			taxRate: order.taxRate
		})
		
		setRestockingFee(fee);
		setRestockingFeeExplainer(explainer)
		setShippingFee(shippingFee)
		setAggregateShippingFee(shippingFee + incrementalFee)
		
	}, [returnType, itemsCount, includeShipping, returnValue])

	const handleSubmit = async () => {
		const lineItemsAndFee = returnLineItems.map((item) => ({
			...item,
			restockingFee: {percentage: restockingFee}
		}));

		const returnId = await createReturn({
			orderId: order.id, 
			shippingFee: aggregateShippingFee, 
			lineItemsAndFee: lineItemsAndFee,
			currency: order.currencyCode
		});

    if (returnId) {
			if (returnType === "Credit") {
				createStoreCredit({order: order, amount: returnValue * 1.1})
			}
      router.push(`/returns/${returnId}`);
    }
	};

	const restockingFeeValue = returnValue * (restockingFee / 100)
	const storeCreditAmount = returnValue * 1.1

	const textColor = returnType === 'Credit' ? 'text-emerald-600' : 'text-navy'
  const borderColor = returnType === 'Credit' ? 'border-emerald-600' : 'border-navy'

	if(loading) { return( <Message text="Loading..." type="loading" />) }
	if(error) { return( <Message text={`Error: ${error}`} type="error" />) }
	if(success) { return <Message text="Return request submitted successfully!" type="success" />}

	return (
		<div className="flex flex-col rounded space-y-8">
			<OrderItemsSelector 
				orderId={order.id}
				order={order}
				returnLineItems={returnLineItems}
				setReturnLineItems={setReturnLineItems}
				setReturnValue={setReturnValue}
				setItemsCount={setItemsCount}
				returnType={returnType}
			/>
			{itemsCount > 0 && (
				<ReturnOptions 
					setReturnType={setReturnType}
					returnType={returnType}
					itemsCount={itemsCount}
					currencyCode={order.currencyCode}
					returnValue={returnValue}
					restockingFee={restockingFee}
					restockingFeeExplainer={restockingFeeExplainer}
					shippingFee={shippingFee}
					exclusions={order.exclusions}
					shippingService={order.shippingService}
					restockingFeeValue={restockingFeeValue}
					storeCreditAmount={storeCreditAmount}
				/>
			)}
			{returnType === 'Refund' && (
				<ReturnShipping 
					shippingService={order.shippingService}
					includeShipping={includeShipping}
					setIncludeShipping={setIncludeShipping}
					countryCode={order.countryCode}
					currencyCode={order.currencyCode}
				/>
			)}
			{itemsCount > 0 && returnType && (
				<ReturnConfirmation 
					confirmation={confirmation} 
					setConfirmation={setConfirmation} 
					textColor={textColor} 
					borderColor={borderColor}
				/>
			)}
			{itemsCount > 0 && returnType && confirmation && (
				<SubmitButton 
					loading={loading} 
					handleSubmit={handleSubmit} 
					confirmation={confirmation} 
					returnType={returnType}
				/>
			)}
		</div>
	);
}

function SubmitButton({ loading, handleSubmit, returnType, confirmation }) {
	const color = returnType === 'Credit' ? 'bg-emerald-600' : 'bg-navy'
  return (
    <button 
      onClick={handleSubmit}
      disabled={!confirmation || loading}
      className={`btn btn-primary ${color} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      Submit Return Request
    </button>
  )
}