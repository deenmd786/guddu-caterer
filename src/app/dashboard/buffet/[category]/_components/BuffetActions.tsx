import React from "react";
import { FaPhoneAlt } from "react-icons/fa"; // phone icon

interface BuffetActionsProps {
  onGetBestPrice: () => void;
  colorClass?: string; // optional prop to customize color
}

const BuffetActions: React.FC<BuffetActionsProps> = ({ onGetBestPrice, colorClass }) => {
  return (
    <div className="mt-2 flex justify-center">
      <button
        className={`flex items-center gap-2 ${colorClass || "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out`}
        onClick={onGetBestPrice}
      >
        <FaPhoneAlt className="text-lg" />
        Get Best Price
      </button>
    </div>
  );
};

export default BuffetActions;
