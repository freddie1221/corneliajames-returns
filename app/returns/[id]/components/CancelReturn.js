"use client"

import { useRouter } from "next/navigation";
import useCancelReturn from "@/hooks/useCancelReturn";

export default function CancelReturn({ returnId, orderId, returnType, status }) {
  const { cancelReturn, loading, error } = useCancelReturn();
  const router = useRouter();
  
  const handleCancelReturn = async () => {
    await cancelReturn(returnId);
    router.push(`/orders/${orderId}`);
    router.refresh();
  };

  const isDisabled = returnType === "Credit" || status === "Complete";
  
  if (error) return <button className="btn btn-tertiary w-full">Error: {error}</button>;
  if (loading) return <button className="btn btn-tertiary w-full">Cancelling...</button>;

  return (
    <button
      className="btn btn-tertiary w-full"
      onClick={handleCancelReturn}
      disabled={isDisabled}
    >
      Cancel Return
    </button>
  );
}