import React, { useState } from 'react';

interface ItemListData {
  grocery: string[];
  vegiAndFruits: string[];
  dairy: string[];
}

interface ItemListProps {
  formData: {
    itemList: ItemListData;
  };
  handleItemListChange: (category: keyof ItemListData, value: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ formData, handleItemListChange }) => {
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<keyof ItemListData>('grocery');

  const handleAddItem = () => {
    if (newItem.trim()) {
      handleItemListChange(selectedCategory, newItem);
      setNewItem('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Category Selector */}
      <div>
        <h3>Select Category</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as keyof ItemListData)}
          className='p-2 rounded text-gray-950'
        >
          {Object.keys(formData.itemList).map((category) => (
            <option key={category} value={category}>
              {category.replace(/([A-Z])/g, ' $1').toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Item Input */}
      <div>
        <h3>{selectedCategory.replace(/([A-Z])/g, ' $1').toUpperCase()}</h3>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={`Enter ${selectedCategory} item`}
           className='p-2 text-gray-950'
        />
        <button type="button" onClick={handleAddItem}>
          Add {selectedCategory.replace(/([A-Z])/g, ' $1').toUpperCase()}
        </button>
        <ul>
          {formData.itemList[selectedCategory].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ItemList;
