import { convertStringToNumber } from '@/app/utils/textToNumber';

export default function OrderItem({ item, onSelectItem, isSelected }) {

  const itemPrice = convertStringToNumber(item.originalTotalSet.presentmentMoney.amount);
  const customAttributes = item.customAttributes
  .filter(attr => attr.value && attr.key !== "Item ID")
  .map(attr => `${attr.key}: ${attr.value}`)
  .join(', ');
  
  
  const handleChange = (e) => {
    onSelectItem(e.target.checked);
  };


  console.log(customAttributes);

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
        <div>{item.name}</div>
        <div className="text-sm text-gray-500">SKU: {item.sku}{customAttributes ? `, ${customAttributes}` : ''}</div>
        <div className="text-sm text-gray-500">Price: {itemPrice} {item.originalTotalSet.presentmentMoney.currencyCode}</div>
      </div>
    </li>
  );
}