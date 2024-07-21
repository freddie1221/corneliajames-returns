'use client';

import { useState, useMemo } from 'react';
import OrderItem from './OrderItem';

export default function ReturnItemSelector({ items }) {
  const [selectedItems, setSelectedItems] = useState({});

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
    <div>
    <ul>
      {items.map(({ node }) => (
        Array.from({ length: node.quantity }).map((_, index) => (
          <OrderItem 
            key={`${node.id}-${index}`} 
            item={node} 
            onSelectItem={(isSelected) => handleSelectItem(node.id, isSelected, node.originalTotalSet.presentmentMoney.amount)}
            isSelected={!!selectedItems[node.id]}
          />
        ))
      ))}
    </ul>
    <div className="mt-4 font-bold">
        Total: ${totalAmount}
    </div>
    </div>
    
  );
}