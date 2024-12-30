// DropdownSelector.tsx
import React from 'react';

interface DropdownSelectorProps {
  options: { id: number; label: string; value: string }[];
  selectedValue: string | null;
  onChange: (value: string) => void;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({ options, selectedValue, onChange }) => {
  return (
    <select
      value={selectedValue || ''}
      onChange={(e) => onChange(e.target.value)}
      className="border border-[var(--border)] py-2 px-4 rounded-full text-[var(--text-primary)] bg-[var(--background-secondary)] hover:bg-[var(--red)] hover:text-[var(--text-white)] transition-all duration-300 ease-in-out"
    >
      <option value="" disabled>Select an option</option>
      {options.map((option) => (
        <option
          key={option.id}
          value={option.value}
          className="text-[var(--text-primary)] hover:bg-[var(--red)] hover:text-[var(--text-white)]"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropdownSelector;