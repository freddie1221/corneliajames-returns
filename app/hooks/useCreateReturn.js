import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useCreateReturn() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false); 
	const router = useRouter();
	
	async function createReturn(returnInput) {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch('/api/shopify/returns', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ returnInput }),
			});

			setSuccess(true);
			const data = await response.json();
			console.log('useCreateReturn data: ', data);
			const returnId = data.returnCreate.return.id.split('/').pop();
			router.push(`/returns/${returnId}`);

		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	return { createReturn, loading, error, success };

}

