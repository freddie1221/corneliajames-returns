import Link from "next/link";
import { getReturn } from "@/lib/api/getReturn";
import ReturnDetails from "@/app/returns/[id]/components/ReturnDetails";

export default async function ExistingReturns({ returnIds, order }) {

	if (order.returnIds.length === 0) return null;

	const returns = await Promise.all(order.returnIds.map(id => getReturn(id)));


	return (
		<div className="flex flex-col">
			<h1 className="heading-secondary">Existing Returns</h1>
			<div className="flex flex-col gap-4 items-center bg-white shadow-md rounded-lg p-5">
				{returns.map((returnData, index) => (
					<Link 
						href={`/returns/${returnData.id.split('/').pop()}`} 
						key={index} 
						className="flex flex-col gap-4 w-full hover:bg-gray-50 p-2 rounded-lg"
					>
						<ReturnDetails returnData={returnData} order={order} />
				</Link>	
				))}
			</div>
		</div>
	);
}

