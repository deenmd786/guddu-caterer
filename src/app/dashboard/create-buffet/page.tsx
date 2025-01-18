"use client";

import React, { useState, useEffect } from "react";
import { IBuffetData } from "@/types/buffetTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCart } from "@/redux/cartSlice";
import { createBuffet } from "@/utils/buffetController";

export interface IItem {
  title: string;
  imageUrl: string;
}

const Page: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  console.log("cartItems: ", cartItems);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        dispatch(setCart(JSON.parse(savedCart)));
      }
    }
  }, [dispatch]);

  const [buffetData, setBuffetData] = useState<IBuffetData>({
    title: "Buffet",
    minPrice: 0,
    maxPrice: 0,
    gatheringSize: "medium",
    categories: {}
  });

  useEffect(() => {
    const result = cartItems.reduce((acc: Record<string, IItem[]>, item) => {
      const { category, productName, productImg } = item;
      
      if (category) {
        if (!acc[category]) {
          acc[category] = [];
        }
  
        const newItem: IItem = {
          title: productName,
          imageUrl: productImg[0]
        };
  
        acc[category].push(newItem);
      }
  
      return acc;
  
    }, {} as Record<string, IItem[]>);

    console.log(result);

    setBuffetData((prevData) => ({
      ...prevData,
      categories: result
    }));
  }, [cartItems]);

  console.log("buffetData: ", buffetData);

  const [formData, setFormData] = useState({
    title: buffetData.title,
    minPrice: buffetData.minPrice,
    maxPrice: buffetData.maxPrice,
    gatheringSize: buffetData.gatheringSize
  });

  useEffect(() => {
    setFormData({
      title: buffetData.title,
      minPrice: buffetData.minPrice,
      maxPrice: buffetData.maxPrice,
      gatheringSize: buffetData.gatheringSize
    });
  }, [buffetData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "minPrice" || name === "maxPrice" ? Number(value) : value
    }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBuffetData((prevData) => ({
      ...prevData,
      ...formData
    }));
    
    console.log("FormData: ", formData);

    const response = await createBuffet(buffetData);
    console.log("response", response);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold">Buffet Creation</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="minPrice" className="block">Min Price:</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="maxPrice" className="block">Max Price:</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="gatheringSize" className="block">Gathering Size:</label>
          <select
            id="gatheringSize"
            name="gatheringSize"
            value={formData.gatheringSize}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">Update Buffet Data</button>
      </form>
    </main>
  );
};

export default Page;