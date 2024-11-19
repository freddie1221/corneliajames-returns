import Image from 'next/image';


export default function ReturnItem({ item }) {
  const { id, name, image, returnReasonNote, quantity } = item;
  
  return (
    <li className="mb-4 flex flex-col bg-white border border-gray-200 shadow-md p-4 rounded-lg w-full">
      <div className="flex flex-row items-center">
        <Image src={image} alt={name} width={100} height={80} className="rounded-md"/>
        <div className="flex-1 w-full ml-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          
          <span className="text-sm">Quantity:{quantity}</span>
          <div className="flex flex-col w-full bg-gray-100 p-2 mt-2 rounded-md">
            <div className="text-xs">Return reason</div>
            <div className="text-sm">{returnReasonNote}</div>
          </div>
        </div>
      </div>
    </li>
  );
}