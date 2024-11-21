import Link from "next/link";
import ReturnDetails from "@/app/returns/[id]/components/ReturnDetails";

export default function ExistingReturns({ returns }) {

	// console.log(returns)

	return (
		<div className="flex flex-col gap-4 items-center bg-white shadow-md rounded-lg p-5 mb-4">
			<h2 className="heading-secondary text-center">Existing Returns</h2>
			{returns.map((returnData, index) => (
				<Link 
					href={`/returns/${returnData.id.split('/').pop()}`} 
					key={index} 
					className="flex flex-col gap-4 w-full border-b border-gray-300 p-2 hover:bg-gray-50"
				>
					<ReturnDetails returnData={returnData} />
				</Link>	
			))}
		</div>
	);
}