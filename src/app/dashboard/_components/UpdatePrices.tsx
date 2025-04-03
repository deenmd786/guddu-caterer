import React, { useState } from "react";
import { IBuffetData } from "@/types/buffetTypes";
import { updateBuffet } from "@/utils/buffetController";

interface UpdateBuffetFormProps {
  onUpdate: (data: IBuffetData) => Promise<void>; // Accept IBuffetData as a parameter
  initialData: IBuffetData;
}

const UpdatePrices: React.FC<UpdateBuffetFormProps> = ({ onUpdate, initialData }) => {
  const [formData, setFormData] = useState<IBuffetData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error handling

  const handlePriceChange = (guestCount: number, value: number) => {
    setFormData((prev) => ({
      ...prev,
      prices: { ...prev.prices, [guestCount]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // Reset error state

    try {
      const response = await updateBuffet(formData);

      if ('buffet' in response && response.buffet) {
        await onUpdate(response.buffet);
      } else {
        throw new Error("No buffet data returned");
      }

      setFormData(initialData); // Reset form data after submission
    } catch (error) {
      console.error("Error updating buffet prices:", error);
      setError("Failed to update buffet prices. Please try again."); // Set error message
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
      <div>
        {Object.keys(formData.prices).map((guestCount) => (
          <div key={guestCount} className="flex flex-col">
            <label htmlFor={`price-${guestCount}`} className="font-medium text-gray-600">
              Price for {guestCount} guests:
            </label>
            <input
              type="number"
              id={`price-${guestCount}`}
              value={formData.prices[Number(guestCount)] || ''} // Handle empty values
              onChange={(e) => handlePriceChange(Number(guestCount), Number(e.target.value) || 0)} // Default to 0 if empty
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className={`bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-600 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Updating..." : "Update Prices"}
      </button>
    </form>
  );
};

export default UpdatePrices;