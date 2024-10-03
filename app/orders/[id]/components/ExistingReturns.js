'use client'

import Link from "next/link";
import useExistingReturns from "@/app/hooks/useExistingReturns";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ReturnDetails from "@/app/components/ReturnDetails";

export default function ExistingReturns({ returns }) {
    // const { returns, loading, error } = useExistingReturns(order.id);

    // if (loading) return <LoadingSpinner />;
    // if (error) return <div>Error: {error}</div>;

		console.log(returns)
		
		return null
/*
    return (
        <div className="flex flex-col gap-4 items-center bg-gray-100 shadow-md rounded p-5 mb-4">
					<h2 className="heading-secondary text-center">Existing Returns</h2>
            {returns.map((returnData, index) => (
							<Link href={`/returns/${returnData.id}`} key={index} className="flex flex-col gap-4 w-full border-b border-gray-300 pb-4">
								<ReturnDetails returnData={returnData} />
            </Link>	
            ))}
        </div>
    );
		*/
}
