"use client";

import { useState, useEffect } from 'react';
import ReturnItemSelector from './ReturnItemSelector';
import ReturnOptions from './ReturnOptions';
import useCreateReturn from '@/app/hooks/useCreateReturn';
import { simplifiedItems } from '@/app/utils/simplifiedItems';
import Message from '@/app/components/Message';
import Link from 'next/link';


export default function ReturnForm({ order }) {
    
    const [returnType, setReturnType] = useState('');
    const [returnLineItems, setReturnLineItems] = useState([]);
    const [returnValue, setReturnValue] = useState(0);
    const { createReturn, loading, error, success } = useCreateReturn();

    const handleSubmit = async () => {
        const returnInput = { 
            orderId: order.id,
            returnLineItems: returnLineItems,
            notifyCustomer: true
         };

        const response = await createReturn(returnInput);
    };

    useEffect(() => {
        console.log(returnValue);
    }, [returnValue]);

    const items = simplifiedItems(order);

    if(loading) { return( <Message text="Loading..." type="loading" />) }
		if(error) { return( <Message text={`Error: ${error}`} type="error" />) }
    if(success) { return( 
		<div>
			<Message text="Return request submitted successfully!" type="success" />
			<Link href={`/orders/${order.id}`}>
				<button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
					View Order
				</button>
			</Link>
		</div>
	) }

    return (
        <div className="flex flex-col gap-4 bg-gray-100 shadow-md rounded p-5">
            <ReturnItemSelector 
                items={items} 
                returnLineItems={returnLineItems}
                setReturnLineItems={setReturnLineItems}
                setReturnValue={setReturnValue}
            />
            <ReturnOptions 
                currencyCode={order.totalPriceSet.presentmentMoney.currencyCode}
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