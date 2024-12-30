interface SubmitButtonProps {
    loading: boolean;
    text: string;
  }
  
  const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, text }) => {
    return (
      <button
        type="submit"
        disabled={loading}
        className={`w-full p-4 rounded-md text-[var(--text-white)] text-xl font-bold ${
          loading
            ? "bg-gray-400"
            : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        }`}
      >
        {loading ? "Adding Product..." : text}
      </button>
    );
  };
  
  export default SubmitButton;
  