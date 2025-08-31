import React, { useEffect, useState } from "react";
import { IBuffetData } from "@/types/buffetTypes";
import { cateringSizes } from "@/data/cateringSizes";

interface BuffetFormProps {
  onSubmit: (data: IBuffetData) => Promise<void>;
  initialData: IBuffetData;
  isSubmit : boolean;
}

const BuffetForm: React.FC<BuffetFormProps> = ({ onSubmit, initialData, isSubmit }) => {
  const [formData, setFormData] = useState<IBuffetData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handlePriceChange = (guestCount: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      discounts: { ...prev.discounts, [guestCount]: value }, // Corrected here
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {

      
      await onSubmit(formData);
      if (isSubmit) { 
        setFormData(initialData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[80vh] md:max-h-[89vh] overflow-y-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold text-gray-700">Create a Buffet Plan</h2>

      {(["title", "description", "cookPrice", "perPlate"] as Array<keyof IBuffetData>).map((field) => (
        <div key={field} className="flex flex-col">
          <label htmlFor={field} className="font-medium text-gray-600">
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>
          <input
            type="text"
            id={field}
            name={field}
            value={formData[field] as string}
            onChange={handleChange}
            required
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}

      <div>
        <label htmlFor="category" className="font-medium text-gray-600">
          Category:
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400"
        >
          {cateringSizes.map((cat, i) => (
  <option key={i} value={cat.name}>
    {cat.label}
  </option>
))}

        </select>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-700">Discounts:</h2>
        {Object.keys(formData.discounts).map((guestCount) => (
          <div key={guestCount} className="flex flex-col">
            <label htmlFor={`price-${guestCount}`} className="font-medium text-gray-600">
              Discount for {guestCount} guests:
            </label>
            <input
              type="text"
              id={`price-${guestCount}`}
              value={formData.discounts[guestCount]}
              onChange={(e) => handlePriceChange(guestCount, e.target.value)}
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className={`bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-600 transition ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Create Buffet"}
      </button>
    </form>
  );
};

export default BuffetForm;