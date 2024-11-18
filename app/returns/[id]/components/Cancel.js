'use client'

import { useRouter } from "next/navigation";
import useCancelReturn from "@/app/hooks/useCancelReturn";


export default function Cancel({ returnId, orderId }) {
  const { cancelReturn, loading, error, success } = useCancelReturn();
  const router = useRouter();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (success) return <p>Return Cancelled!</p>;

  return (
    <button
      className="btn-primary"
      onClick={() => {
        cancelReturn(returnId);
        router.push(`/orders/${orderId}`);
      }}
    >
      Cancel Return
    </button>
  );
}