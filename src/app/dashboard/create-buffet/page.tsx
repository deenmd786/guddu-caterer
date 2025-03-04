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
  console.log("cartItems: deen", cartItems);

  const dispatch = useDispatch();

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
    cookPrice: 0,
    minPrice: 0,
    maxPrice: 0,
    gatheringSize: "medium",
    categories: {}
  });

  const [formData, setFormData] = useState({
    title: buffetData.title,
    cookPrice: buffetData.cookPrice,
    minPrice: buffetData.minPrice,
    maxPrice: buffetData.maxPrice,
    gatheringSize: buffetData.gatheringSize,
    categories: buffetData.categories
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

    setBuffetData((prevData) => ({
      ...prevData,
      categories: result
    }));
  }, [cartItems]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      title: buffetData.title,
      cookPrice: buffetData.cookPrice,
      minPrice: buffetData.minPrice,
      maxPrice: buffetData.maxPrice,
      gatheringSize: buffetData.gatheringSize,
      categories: buffetData.categories
    }));
  }, [buffetData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "minPrice" || name === "maxPrice" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title || !formData.cookPrice || !formData.minPrice || !formData.maxPrice || !formData.gatheringSize) {
      console.error("All fields are required");
      return;
    }
    setBuffetData((prevData) => ({
      ...prevData,
      ...formData
    }));
    console.log("FormData: ", formData);
    const response = await createBuffet(formData);
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
          <label htmlFor="cookPrice" className="block">Cook Price:</label>
          <input
            type="number"
            id="cookPrice"
            name="cookPrice"
            value={formData.cookPrice}
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