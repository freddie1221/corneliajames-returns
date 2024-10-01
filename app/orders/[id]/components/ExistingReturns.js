'use client'

import useExistingReturns from "@/app/hooks/useExistingReturns";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import OrderItem from "./OrderItem";


export default function ExistingReturns({ order }) {
    const { returns, loading, error } = useExistingReturns(order.id);

    if (loading) return <LoadingSpinner />;
    if (error) return <div>Error: {error}</div>;


    return (
        <div className="flex flex-col gap-4 items-center bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="heading-secondary text-center">Existing Returns</h2>
            {returns.map((r, index) => (
								<div key={index} className="flex flex-col gap-4 w-full border-b border-gray-300 pb-4">
									<div>{r.name}</div>
									<div>{r.status}</div>
									<div className="flex flex-col gap-4 w-full">
                    {r.returnLineItems.map((item, index) => (
                        <OrderItem 
                            item={item}
                            index={index}
                            key={index}
                            onSelectItem={() => {}}
                            existingReturn={true}
                        />
                    ))}
                </div>
								</div>	
            ))}
        </div>
    );
}
