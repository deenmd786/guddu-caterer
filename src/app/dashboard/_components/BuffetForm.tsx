import React, { useState } from "react";
import { IBuffetData } from "@/types/buffetTypes";
import { categories } from "@/data/categories";

interface BuffetFormProps {
  onSubmit: (data: IBuffetData) => Promise<void>;
  initialData: IBuffetData;
}

const BuffetForm: React.FC<BuffetFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<IBuffetData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "cookPrice" ? Number(value) : value,
    }));
  };

  const handlePriceChange = (guestCount: number, value: number) => {
    setFormData((prev) => ({
      ...prev,
      prices: { ...prev.prices, [guestCount]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData(initialData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] md:max-h-[89vh] overflow-y-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700">Create a Buffet Plan</h2>
      {(["title", "description", "cookPrice", "offer"] as Array<keyof IBuffetData>).map((field) => (
        <div key={field} className="flex flex-col">
          <label htmlFor={field} className="font-medium text-gray-600">
            {field.charAt(0).toUpperCase() + field.slice(1)}:
          </label>
          <input
            type={field === "cookPrice" ? "number" : "text"}
            id={field}
            name={field}
            value={field === "cookPrice" ? formData.cookPrice : (formData[field] as string)}
            onChange={handleChange}
            required
            className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ))}
      <div>
        <label htmlFor="category" className="font-medium text-gray-600">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400"
        >
          {categories.map((cat,i) => (
            <option key={i} value={cat.name}>{cat.label}</option>
          ))}
        </select>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-700">Prices:</h2>
        {Object.keys(formData.prices).map((guestCount) => (
          <div key={guestCount} className="flex flex-col">
            <label htmlFor={`price-${guestCount}`} className="font-medium text-gray-600">
              Price for {guestCount} guests:
            </label>
            <input
              type="number"
              id={`price-${guestCount}`}
              value={formData.prices[guestCount as unknown as keyof typeof formData.prices]}
              onChange={(e) => handlePriceChange(Number(guestCount), Number(e.target.value))}
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
        {isSubmitting ? "Submitting..." : "Create Buffet"}
      </button>
    </form>
  );
};

export default BuffetForm;
