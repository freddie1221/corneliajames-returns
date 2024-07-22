import Image from 'next/image';

export default function OrderItem({ item, onSelectItem, isSelected }) {
  return (
    <li className="mb-2 flex items-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => onSelectItem(e.target.checked)}
        className="mr-2"
      />
      <img src={item.image.url} alt={item.name} width={50} height={50} className="mr-4" />
      <div>
        <p>{item.name}</p>
        <p>Quantity: {item.quantity}, Price: {item.originalTotalSet.presentmentMoney.amount} {item.originalTotalSet.presentmentMoney.currencyCode}</p>
      </div>
    </li>
  );
}