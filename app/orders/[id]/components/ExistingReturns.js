import Link from "next/link";
import ReturnDetails from "@/app/returns/[id]/components/ReturnDetails";

export default function ExistingReturns({ returns }) {


	return (
			<>
			<h1 className="heading-secondary">Existing Returns</h1>
			<div className="flex flex-col gap-4 items-center bg-white shadow-md rounded-lg p-5">
				{returns.map((returnData, index) => (
					<Link 
					href={`/returns/${returnData.id.split('/').pop()}`} 
					key={index} 
					className="flex flex-col gap-4 w-full hover:bg-gray-50 p-2 rounded-lg"
				>
					<ReturnDetails returnData={returnData} />
				</Link>	
				))}
			</div>
		</>
	);
}