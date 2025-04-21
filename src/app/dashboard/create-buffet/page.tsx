"use client";
import { toast } from "react-hot-toast";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart, setCart } from "@/redux/cartSlice";
import { createBuffet } from "@/utils/buffetController";
import { IBuffetData } from "@/types/buffetTypes";
import BuffetForm from "../buffet/_components/BuffetForm";

const Page: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isSubmited , setIsSubmited] = useState<boolean>(false);
  console.log("cartItems: ", cartItems);
  

  const [initialData, setInitialData] = useState<IBuffetData>({
    title: "Classic Indian Mini Feast",
    description: "A tasty and traditional menu, perfect for small gatherings with family and friends.",
    cookPrice: "2500",
    category: "birthday",
    dishes: {},
    discounts: { "50": "20", "100": "25", "200": "40", "500": "50", "1000": "60", "2000": "70" },
    perPlate: "250",
  });

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
    setInitialData((prevData) => ({
      ...prevData,
      dishes,
    }));
  }, [cartItems]);
  
  

  console.log("initialData: ", initialData);
  const handleSubmit = async (initialData: IBuffetData) => {
    try {
      
      const res = await createBuffet(initialData);
  
      // Check for success response and show success message
      if (res.buffet) {
        setIsSubmited(true);
        toast.success("Buffet Created.");
        dispatch(clearCart());
      } else if (res.message) {
        // Handle error case if there's no buffet but a message exists
        toast.error(res.message);
      }
    } catch (error) {
      // Catch any unexpected errors and display a general error message
      if (error instanceof Error) {
        console.error("Buffet creation failed:", error);
        toast.error(error?.message || "Something went wrong");
      }
    }
  };
  

  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Buffet Creation</h1>
      <BuffetForm
  onSubmit={handleSubmit}
  initialData={initialData}
  isSubmit = {isSubmited}
/>
    </main>
  );
};

export default Page;
