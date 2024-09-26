import { useState } from 'react';

export default function useSubmitReturn() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    const submitReturn = async (returnData, order) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        console.log('from hook,', returnData);
        try {
            const response = await fetch('/api/returns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...returnData, order }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit return');
            }

            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { submitReturn, loading, error, success };
}