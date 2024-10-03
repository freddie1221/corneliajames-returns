'use client'

import Link from "next/link";
import ReturnDetails from "@/app/components/ReturnDetails";

export default function ExistingReturns({ returns }) {


	function returnId(returnData) {
		return returnData.id.split('/').pop()
	}

	return (
		<div className="flex flex-col gap-4 items-center bg-gray-100 shadow-md rounded p-5 mb-4">
			<h2 className="heading-secondary text-center">Existing Returns</h2>
				{returns.map((returnData, index) => (
					<Link href={`/returns/${returnId(returnData)}`} key={index} className="flex flex-col gap-4 w-full border-b border-gray-300 pb-4">
						<ReturnDetails returnData={returnData} />
				</Link>	
				))}
		</div>
    );
}