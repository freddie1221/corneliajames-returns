'use client'

import Link from "next/link";
import ReturnDetails from "@/app/components/ReturnDetails";
import useExistingReturns from "@/app/hooks/useExistingReturns";
import { Message } from "@/app/components/Elements";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function ExistingReturns({ orderId }) {
	
	const { returns, loading, error } = useExistingReturns(orderId);


	if (loading) return <LoadingSpinner />
	if (error) return <Message type="error" text="Error loading existing returns" />
	if (returns.length === 0) return <Message type="info" text="No existing returns" />


	return (
		<div className="flex flex-col gap-4 items-center bg-gray-100 shadow-md rounded p-5 mb-4">
			<h2 className="heading-secondary text-center">Existing Returns</h2>
			{returns.map((returnData, index) => (
				<Link href={`/returns/${returnData.id.split('/').pop()}`} key={index} className="
					flex flex-col gap-4 w-full border-b border-gray-300 pb-4 hover:bg-gray-200"
				>
					<ReturnDetails returnData={returnData} />
				</Link>	
			))}
		</div>
    );
}