import { useState } from 'react';

export default function useCreateReturn() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createReturn = async (returnInput) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await fetch('/api/returns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ returnInput: returnInput }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create return');
            }

            const data = await response.json();
            setSuccess(true);
            console.log("success data", data);
            return data;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { createReturn, loading, error, success };
}
