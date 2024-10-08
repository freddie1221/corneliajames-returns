import { useState } from 'react';

async function createShopifyReturn(returnInput) {
		const response = await fetch('/api/shopify/returns', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ returnInput }),
		});

		if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to create return in Shopify');
		}

		const data = await response.json();
		return data;
}

async function createAirtableReturn(returnInput) {
		const response = await fetch('/api/airtable/returns', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ returnInput }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || 'Failed to create record in Airtable');
		}

		const data = await response.json();
		return data;
}



export default function useCreateReturn() {
		const [loading, setLoading] = useState(false);
		const [error, setError] = useState(null);
		const [success, setSuccess] = useState(false);

		async function createReturn(shopifyInput, airtableInput) {
				setLoading(true);
				setError(null);
				setSuccess(false);
				try {

						const shopifyData = await createShopifyReturn(shopifyInput)
						
						const airtablePayload = {
							"Return Name": shopifyData.returnCreate.return.name,
							ID: shopifyData.returnCreate.return.id.split('/').pop(),
							Currency: "GBP",
							Type: airtableInput.returnType,
							"Credit amount": airtableInput.creditAmount
						}
					
						const airtableData = await createAirtableReturn(airtablePayload);


						setSuccess(true);
						// console.log("Shopify success data:", shopifyData);
						// console.log("Airtable success data:", airtableData);
						return { shopify: shopifyData, airtable: airtableData };
				} catch (err) {
						setError(err.message);
						console.error("Error creating return:", err);
				} finally {
						setLoading(false);
				}
		};

		return { createReturn, loading, error, success };
}

/*
TODO: Work out what data to send to Airtable. 
Certainly return type And return reference 
Handling fee
Shipping fee 
All shipping label stuff created in Shopify. To provide enough in order for the return shipment to be created. 
The powerful thing is going to be allowing Shopify to handle all finance calculations. 
*/