'use client';

import { useCallback } from 'react';
import { convertStringToNumber } from '@/app/utils/textToNumber';
import OrderItem from '@/app/orders/[id]/components/OrderItem';

export default function ReturnItemSelector({ items, selectedItems, setSelectedItems }) {
  
  const handleSelectItem = useCallback((itemId, amount, isSelected) => {
    setSelectedItems(prev => {
      if (isSelected) {
        return {
          ...prev,
          [itemId]: { selected: true, amount }
        };
      } else {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
    });
  }, [setSelectedItems]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="heading-secondary text-center">Items in your order</h2>
      <ul className="flex flex-col gap-3">
      {items.flatMap((item) => 
        Array.from({ length: item.quantity }).map((_, index) => {
          const itemId = item.id.split('/').pop();
          const itemKey = `${itemId}-${index}`;
          const itemValue = convertStringToNumber(item.originalTotalSet.presentmentMoney.amount);
          return (
            <OrderItem 
              key={itemKey}
              item={item} 
              onSelectItem={(isSelected) => handleSelectItem(itemKey, itemValue, isSelected)}
              isSelected={Boolean(selectedItems[itemKey])}
            />
            );
          })
        )}
      </ul>
    </div>
  );
}