"use client";

import { useState } from 'react';
import ReturnItemSelector from './ReturnItemSelector';
import ReturnOptions from './ReturnOptions';
import useCreateReturn from '@/app/hooks/useCreateReturn';
import { Message } from '@/app/components/Elements';
import calculateFee from '@/app/utils/calculateFee';



export default function ReturnForm({ order }) {
	
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
			orderId: order.id,
			returnLineItems: lineItemsAndFee,
			notifyCustomer: true
		};

		const airtableInput = {
			returnType: returnType,
			creditAmount: creditAmount
		};

		console.log('shopifyInput: ', shopifyInput);
		console.log('airtableInput: ', airtableInput);

		createReturn(shopifyInput, airtableInput);
	};


	if(loading) { return( <Message text="Loading..." type="loading" />) }
	if(error) { return( <Message text={`Error: ${error}`} type="error" />) }
	
	if(success) { 
		return <Message text="Return request submitted successfully!" type="success" />
	}

	if(order.returnableItems.length === 0) { 
		return <Message text="There are no more returnable items on your order." type="info" />
	}

	console.log('returnable items: ', order.returnableItems)

	return (
		<div className="flex flex-col gap-4 bg-gray-100 shadow-md rounded p-5">
			<ReturnItemSelector 
				items={order.returnableItems} 
				returnLineItems={returnLineItems}
				setReturnLineItems={setReturnLineItems}
				setReturnValue={setReturnValue}
				returnType={returnType}
			/>
			<ReturnOptions 
				currencyCode={order.currencyCode}
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