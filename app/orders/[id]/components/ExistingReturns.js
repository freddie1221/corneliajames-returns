import Link from "next/link";
import ReturnDetails from "@/app/components/ReturnDetails";

export default function ExistingReturns({ returns }) {

	return (
		<>
			<h2 className="heading-secondary text-center">Existing Returns</h2>
			{returns.map((returnData, index) => (
				<Link 
					href={`/returns/${returnData.id.split('/').pop()}`} 
					key={index} 
					className="flex flex-col gap-4 w-full border-b border-gray-300 pb-4"
				>
					<ReturnDetails returnData={returnData} />
				</Link>	
			))}
		</>
    );
}