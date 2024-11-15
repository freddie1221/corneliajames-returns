"use client";

import { useState, useEffect } from 'react';
import OrderItemsSelector from './OrderItemsSelector';
import ReturnOptions from './ReturnOptions';
import useCreateReturn from '@/app/hooks/useCreateReturn';
import { Message } from '@/app/components/Elements';
import calculateFee from '@/app/utils/helpers/calculateFee';

export default function ReturnForm({ order }) {
	
	const [returnType, setReturnType] = useState('');
	const [returnLineItems, setReturnLineItems] = useState([]);
	const [itemsCount, setItemsCount] = useState(0);
	const [returnValue, setReturnValue] = useState(0);
	const [restockingFee, setRestockingFee] = useState(0);
	const [restockingFeeExplainer, setRestockingFeeExplainer] = useState('');
	const { createReturn, loading, error, success } = useCreateReturn();


	useEffect(() => {
    const { fee, explainer } = calculateFee(returnType, itemsCount)
		setRestockingFee(fee);
		setRestockingFeeExplainer(explainer);
	}, [returnType, itemsCount])


	const handleSubmit = async () => {
		const lineItemsAndFee = returnLineItems.map((item, index) => ({
			...item,
			restockingFee: {percentage: restockingFee}
		}));

		const shopifyInput = { 
			orderId: `gid://shopify/Order/${order.id}`,
			returnLineItems: lineItemsAndFee,
			notifyCustomer: true
		};
		createReturn(shopifyInput);
	};

	if(loading) { return( <Message text="Loading..." type="loading" />) }
	if(error) { return( <Message text={`Error: ${error}`} type="error" />) }
	if(success) { return <Message text="Return request submitted successfully!" type="success" />}

	return (
		<div className="flex flex-col rounded">
			<OrderItemsSelector 
				orderId={order.id}
				returnLineItems={returnLineItems}
				setReturnLineItems={setReturnLineItems}
				setReturnValue={setReturnValue}
				setItemsCount={setItemsCount}
				returnType={returnType}
			/>
			{itemsCount > 0 && (
				<>
					<ReturnOptions 
						setReturnType={setReturnType}
						returnType={returnType}
						itemsCount={itemsCount}
						returnValue={returnValue}
						restockingFee={restockingFee}
						restockingFeeExplainer={restockingFeeExplainer}
						returnShippingFee={order.returnShippingFee}
						currencyCode={order.currencyCode}
					/>
					<SubmitButton loading={loading} handleSubmit={handleSubmit} />
				</>
			)}
		</div>
	);
}

function SubmitButton({ loading, handleSubmit }) {
  return (
    <button 
      onClick={handleSubmit}
      disabled={loading}
      className={`btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      Submit Return Request
    </button>
  )
}