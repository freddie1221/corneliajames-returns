'use client';

import { useMemo } from 'react';
import OrderItem from '../../../components/OrderItem';

export default function ReturnItemSelector({ items, selectedItems, setSelectedItems }) {
  const handleSelectItem = (itemId, isSelected, amount) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: isSelected ? { selected: true, amount } : undefined
    }));
  };
  
  const totalAmount = useMemo(() => {
    return Object.values(selectedItems)
      .reduce((sum, item) => sum + (item?.amount || 0), 0)
  }, [selectedItems]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="heading-secondary text-center">Items in your order</h2>
      <ul>
        {items.map(( node ) => (
          Array.from({ length: node.quantity }).map((_, index) => {
            const itemId = `${node.id}-${index}`;
            return (
              <OrderItem 
                key={itemId}
                item={node} 
                onSelectItem={(isSelected) => handleSelectItem(itemId, isSelected, node.originalTotalSet.presentmentMoney.amount)}
                isSelected={!!selectedItems[itemId]}
              />
            );
          })
        ))}
      </ul>
    <div className="mt-4 font-bold">
        Total: ${totalAmount}
    </div>
    </div>
    
  );
}