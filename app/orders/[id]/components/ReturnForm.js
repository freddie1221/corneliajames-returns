"use client";

import { useState } from 'react';
import OrderItemsSelector from './OrderItemsSelector';
import ReturnOptions from './ReturnOptions';
import useCreateReturn from '@/app/hooks/useCreateReturn';
import { Message } from '@/app/components/Elements';
import calculateFee from '@/app/utils/calculateFee';


export default function ReturnForm({ orderId }) {

	console.log('orderId: ', orderId)
	
	const [returnType, setReturnType] = useState('');
	const [returnLineItems, setReturnLineItems] = useState([]);
	const [returnValue, setReturnValue] = useState(0);
	const [itemsCount, setItemsCount] = useState(0);
	const { createReturn, loading, error, success } = useCreateReturn();
	
	const restockingFee = { percentage: calculateFee(returnType, itemsCount) };
	const creditAmount = 0


	const handleSubmit = async () => {
		
		const lineItemsAndFee = returnLineItems.map((item, index) => ({
			...item,
			restockingFee: restockingFee
		}));

		const shopifyInput = { 
			orderId: orderId,
			returnLineItems: lineItemsAndFee,
			notifyCustomer: true
		};

		const airtableInput = {
			returnType: returnType,
			creditAmount: creditAmount
		};
		// console.log('shopifyInput: ', shopifyInput);
		// console.log('airtableInput: ', airtableInput);
		createReturn(shopifyInput, airtableInput);
	};


	if(loading) { return( <Message text="Loading..." type="loading" />) }
	if(error) { return( <Message text={`Error: ${error}`} type="error" />) }
	if(success) { return <Message text="Return request submitted successfully!" type="success" />}

	// console.log('returnable items: ', order.returnableItems)

	return (
		<div className="flex flex-col gap-4 bg-gray-100 shadow-md rounded p-5">
			<OrderItemsSelector 
				orderId={orderId}
				returnLineItems={returnLineItems}
				setReturnLineItems={setReturnLineItems}
				setReturnValue={setReturnValue}
				returnType={returnType}
			/>
			<ReturnOptions 
				setReturnType={setReturnType}
				returnType={returnType}
				returnValue={returnValue}
			/>
			<button 
				onClick={handleSubmit}
				disabled={loading}
				className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
			>
				Submit Return Request
		</button>
		</div>
	);
}