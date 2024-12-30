interface DropdownProps {
    id: string;
    name: string;
    value: string;
    options: { id: string | number; value: string; label: string }[];
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
  }
  
  
  const Dropdown: React.FC<DropdownProps> = ({ id, name, value, options, onChange }) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="mb-1 font-medium text-[--text-primary]">
          {id.charAt(0).toUpperCase() + id.slice(1)}:
        </label>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="border rounded-md p-2 text-[var(--text-primary)] w-full focus:outline-none focus:ring-2 focus:ring-[var(--button-hover)]"
          required
        >
          <option value="" disabled className="text-[--text-muted]">
            Select {id}
          </option>
          {options.map((option) => (
            <option
              key={option.id}
              value={option.value}
              className="hover:bg-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Dropdown;
  