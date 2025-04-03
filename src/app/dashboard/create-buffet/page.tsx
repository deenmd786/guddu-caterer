// src/pages/Page.tsx
"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart, setCart } from "@/redux/cartSlice";
import { createBuffet } from "@/utils/buffetController";
import { IBuffetData } from "@/types/buffetTypes";
import BuffetForm from "../_components/BuffetForm";

const Page: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const initialData: IBuffetData = {
    title: "Classic Indian Mini Feast",
    description: "",
    cookPrice: 1000,
    category: "Birthday",
    dishes: {},
    prices: { 50: 1000, 100: 2000, 200: 4000, 500: 9000, 1000: 18000 },
    offer: "",
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) dispatch(setCart(JSON.parse(savedCart)));
  }, [dispatch]);

  useEffect(() => {
    const dishes = cartItems.reduce(
      (acc: Record<string, { title: string; imageUrl: string }[]>, item) => {
        const { category, productName, productImg } = item;
        if (category) {
          acc[category] = acc[category] || [];
          acc[category].push({ title: productName, imageUrl: productImg[0] });
        }
        return acc;
      },
      {}
    );
    initialData.dishes = dishes; // Update initialData with dishes
  }, [cartItems]);

  const handleSubmit = async (data: IBuffetData) => {
    try {
      console.log("data ", data);

      const response = await createBuffet(data);
      console.log("response ", response);
      if (response.message === "All fields are required.") {
        return;
      } else {
        dispatch(clearCart());
      }
    } catch (error) {
      // Optionally handle other errors
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Buffet Creation</h1>
      <BuffetForm onSubmit={handleSubmit} initialData={initialData} />
    </main>
  );
};

export default Page;
