import { convertStringToNumber } from '@/app/utils/textToNumber';

export default function OrderItem({ item, onSelectItem, isSelected }) {

  const itemPrice = convertStringToNumber(item.originalTotalSet.presentmentMoney.amount);
  
  const handleChange = (e) => {
    onSelectItem(e.target.checked);
  };

  return (
    <li className="mb-2 flex items-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleChange}
        className="mr-2"
      />
      <img src={item.image.url} alt={item.name} width={50} height={50} className="mr-4" />
      <div>
        <p>{item.name}</p>
        <p>
          {itemPrice} {item.originalTotalSet.presentmentMoney.currencyCode}
        </p>
      </div>
    </li>
  );
}