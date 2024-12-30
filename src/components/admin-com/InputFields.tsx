interface InputFieldProps {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  isTextarea?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  value,
  placeholder,
  onChange,
  isTextarea = false,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 font-medium text-[--text-primary]">
        {id.charAt(0).toUpperCase() + id.slice(1)}:
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border rounded-md p-2 text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[var(--button-hover)]"
          required
        />
      ) : (
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border rounded-md p-2 text-[--text-primary] focus:outline-none focus:ring-2 focus:ring-[var(--border)]"
          required
        />
      )}
    </div>
  );
};

export default InputField;
