"use client"

import { useRouter } from "next/navigation";
import useCancelReturn from "@/app/hooks/useCancelReturn";

export default function CancelReturn({ returnId, orderId }) {
  const { cancelReturn, loading, error } = useCancelReturn();
  const router = useRouter();
  
  const handleCancelReturn = async () => {
    await cancelReturn(returnId);
    router.push(`/orders/${orderId}`);
    router.refresh();
  };
  
  
  if (error) return <button className="btn-primary">Error: {error}</button>;
  if (loading) return <button className="btn-primary">Cancelling...</button>;

  return (
    <button
      className="btn-primary"
      onClick={handleCancelReturn}
    >
      Cancel Return
    </button>
  );
}