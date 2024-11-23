"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OrderItemsSelector from './OrderItemsSelector';
import ReturnOptions from './ReturnOptions';
import { Message } from '@/app/components/Elements';
import calculateFee from '@/app/utils/helpers/calculateFee';
import useCreateReturn from '@/app/hooks/useCreateReturn';
import useStoreCredit from '@/app/hooks/useStoreCredit';

export default function ReturnForm({ order }) {
	const router = useRouter();
	const [returnType, setReturnType] = useState('');
	const [returnLineItems, setReturnLineItems] = useState([]);
	const [itemsCount, setItemsCount] = useState(0);
	const [returnValue, setReturnValue] = useState(0);
	const [includeShipping, setIncludeShipping] = useState();
	const [restockingFee, setRestockingFee] = useState();
	const [shippingFee, setShippingFee] = useState(0)
	const [confirmation, setConfirmation] = useState(false);
	const { createReturn, loading, error, success } = useCreateReturn();
	const { createStoreCredit } = useStoreCredit();

	useEffect(() => {
		setRestockingFee(calculateFee(returnType, itemsCount));
		includeShipping ? setShippingFee(order.calculateShipping.fee) : setShippingFee(0)
	}, [returnType, itemsCount, includeShipping, returnValue])

	const handleSubmit = async () => {
		const lineItemsAndFee = returnLineItems.map((item) => ({
			...item,
			restockingFee: {percentage: restockingFee.fee}
		}));

		const returnId = await createReturn({
			orderId: order.id, 
			shippingFee: shippingFee, 
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

	if(loading) { return( <Message text="Loading..." type="loading" />) }
	if(error) { return( <Message text={`Error: ${error}`} type="error" />) }
	if(success) { return <Message text="Return request submitted successfully!" type="success" />}

	return (
		<div className="flex flex-col rounded">
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
					returnValue={returnValue}
					restockingFee={restockingFee}
					calculateShipping={order.calculateShipping}
					currencyCode={order.currencyCode}
					countryCode={order.countryCode}
					includeShipping={includeShipping}
					setIncludeShipping={setIncludeShipping}
					shippingFee={shippingFee}
					setConfirmation={setConfirmation}
					confirmation={confirmation}
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