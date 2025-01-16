"use client";

import { RootState } from "../../redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import { createPhoneNumber } from "@/utils/phoneNumberController";

interface CartItem {
  category: string;
  productName: string;
}
interface FormData {
  name: string;
  phone: string;
  eventDate: string;
  guests: number;
  address: string;
  comments: string;
}
interface GroupedProducts {
  [category: string]: string[];
}

const CateringForm: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const productNames = cartItems.map(item => item.productName);
  const phoneNumber = typeof window !== "undefined" ? localStorage.getItem('phoneNumber') : null;
  

  const groupProductsByCategory = (items: CartItem[]): GroupedProducts => {
    return items.reduce<GroupedProducts>((acc, item) => {
      
      const { category, productName } = item;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(productName);

      return acc;
    }, {});
  };


  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: phoneNumber ?? "",
    eventDate: "",
    guests: 0,
    address: "",
    comments: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [focus, setFocus] = useState<{ [key: string]: boolean }>({
    name: false,
    phone: false,
    eventDate: false,
    guests: false,
    address:false,
    comments: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "guests" ? Number(value) : value,
    }));
  };

  const handleFocus = (field: string) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocus((prevFocus) => ({ ...prevFocus, [field]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const groupedProducts = groupProductsByCategory(cartItems);
    console.log("Grouped Products: ", groupedProducts);

    try {
        const payload = {
            ...formData,
            items: groupedProducts,
        };
        console.log("Payload: ", payload);

        const response = await fetch('/api/enquiry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });


        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response data:", errorData);
            setError(`Error: ${errorData.error || 'Something went wrong'}`);
            return;
        }
        if (!phoneNumber) {
          console.error("Phone number is required.");
          return;
        }
        console.log("MdDataUsage",formData.phone,productNames);
        
        const res = await createPhoneNumber({
          phoneNumber: formData.phone,
          products: productNames, // Include the array of product names
        });
      
        if (res.status === 201) {
          console.log("Phone number added successfully:", res.data);
        } else {
          console.error("Error adding phone number:", res.message);
        }
        
        
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('cart');
        const data = await response.json();
        setSuccess(data.message || 'Email sent successfully!');

        setFormData({
            name: "",
            phone: "",
            eventDate: "",
            guests: 0,
            address: "",
            comments: "",
        });
    } catch (error) {
        console.error('Error during form submission:', error);
        setError('An unexpected error occurred.');
    } finally {
        setLoading(false);
    }
};

return (
  <div className="container max-w-md mx-auto p-3 bg-[var(--background)] rounded-lg shadow-md">
    <h2 className=" mb-2 text-xl lg:text-2xl text-[var(--text-primary)] font-semibold text-center md:mb-6">
      Catering Form
    </h2>
    <form onSubmit={handleSubmit} className="space-y-3 text-base">
      {["name", "phone", "eventDate", "No. of guests", "address", "comments"].map((field) => (
        <div key={field} className="relative">
          {field === "eventDate" ? (
            <input
              type="date"
              name={field}
              value={formData[field as keyof FormData]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--button)] focus:border-[var(--button)] transition-all"
              onFocus={() => handleFocus(field)}
              onBlur={() => handleBlur(field)}
            />
          ) : field === "guests" ? (
            <input
              type="number"
              name={field}
              value={formData[field as keyof FormData]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--button)] focus:border-[var(--button)] transition-all"
              onFocus={() => handleFocus(field)}
              onBlur={() => handleBlur(field)}
            />
          ) : (
            <input
              type="text"
              name={field}
              value={formData[field as keyof FormData]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--button)] focus:border-[var(--button)] transition-all"
              onFocus={() => handleFocus(field)}
              onBlur={() => handleBlur(field)}
            />
          )}
          <label
            htmlFor={field}
            className={`absolute left-4 top-2 transition-all origin-[0] bg-[var(--background)] scale-75 transform pointer-events-none ${
              formData[field as keyof FormData] || focus[field]
                ? "translate-y-[-20px] scale-75 text-[var(--button)] px-2 z-10"
                : "translate-y-0 scale-100 text-[var(--text-muted)] text-lg pr-20"
            }`}
          >
            {field.charAt(0).toUpperCase() +
              field.slice(1).replace(/([A-Z])/g, " $1")}
          </label>
        </div>
      ))}
      <Button type="submit" className="w-full" label={loading ? "Submitting..." : "Submit Enquiry"}/>
      
    </form>
    {error && (
      <p className="text-[var(--text-red)] text-center mt-2">{error}</p>
    )}
    {success && (
      <p className="text-[var(--success)] text-center mt-2">{success}</p>
    )}
  </div>
);
};

export default CateringForm;
