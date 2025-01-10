"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ProgressSteps from "../../_components/ProgressSteps";
import { RootState } from "@/redux/store";
import { removeFromCart, setCart } from "@/redux/cartSlice";
import { Product } from "@/types/Products";
import CustomDropdown from "@/components/reuseable/CustomDropdown";
import Button from "@/components/reuseable/Button";



const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  console.log("cartItems: ", cartItems);
      const route = useRouter();
  

  useEffect(() => {
    // Load cart from localStorage when the component mounts
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        dispatch(setCart(JSON.parse(savedCart)));
      }
    }
  }, [dispatch]);

  const handleRemoveItem = (item: Product) => {
    dispatch(removeFromCart(item));
  };

  // Define categories (this can be dynamic based on your product data)
  const categories = [
    "All",
    ...new Set(cartItems.map((item) => item.category)),
  ];

  // Filter cart items based on selected category
  const filteredItems =
    selectedCategory === "All"
      ? cartItems
      : cartItems.filter((item) => item.category === selectedCategory);

  return (

    <>
    {/* Structured Data for SEO */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ShoppingCart",
        name: "Your Buffet Cart",
        description: "Review your customized buffet selections, Guddu Catering Service ensures a seamless booking experience in Delhi.",
        itemListElement: filteredItems.map((item) => ({
          "@type": "Product",
          name: item.productName,
          image: item.productImg[0] || "/images/placeholder.jpg",
          sku: item._id,
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
          },
        })),
      }),
    }} />
    <div className="cart p-3 md:p-6">

      


      {/* Step Tracker */}
      <ProgressSteps currentStep={1} />
      <div className="flex my-2 w-full justify-between items-center">
        <h2 className="text-lg w-1/2 md:text-xl font-semibold md:font-bold">
          Your Cart
        </h2>
        {/* Category Selector */}
        <div className="w-1/2  md:h-[6vh] flex justify-end capitalize">
          <CustomDropdown
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-sm md:text-base">Your cart is empty. <br /> Please Select Menu to Make a Booking.</p>
      ) : (
        <div className="overflow-y-auto max-h-[65vh] md:max-h-[72vh]">
          <table className="min-w-full bg-[var(--background)] border text-center tranform border-[var(--background-secondary)] text-xs lg:text-base">
            <thead className="sticky font-light -top-1 bg-[var(--red)] z-10">
              <tr className="bg-[var(--button)] text-[var(--text-white)]">
                <th className="py-1 px-2 md:py-2 md:px-4 border-b ">
                  Sr.
                </th>
                <th className="py-1 px-2 md:py-2 md:px-4 border-b">
                  Image
                </th>
                <th className="py-1 px-2 md:py-2 md:px-4 border-b">
                  Product Name
                </th>
                <th className="hidden md:table-cell py-1 px-2 md:py-2 md:px-4 border-b">
                  Cooking Methods
                </th>
                <th className="hidden md:table-cell py-1 px-2 md:py-2 md:px-4 border-b">
                  Region
                </th>
                <th className="py-1 px-2 md:py-2 md:px-4 border-b">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => {
                const imageSrc = item.productImg[0]
                  ? item.productImg[0]
                  : "/images/placeholder.jpg";
                return (
                  <tr
                    key={item._id}
                    className="hover:bg-[var(--background-secondary)]"
                  >
                    <td className="py-1 px-2 md:py-2 md:px-4 border-b">
                      {index + 1}
                    </td>
                    <td className="py-1 px-2 md:py-2 flex justify-center md:px-4 border-b">
                      <Image
                        height={50}
                        width={100}
                        src={imageSrc}
                        alt={item.productName}
                        className="rounded-lg w-10 h-10"
                      />
                    </td>
                    <td className="py-1 px-2 md:py-2 md:px-4 border-b font-semibold capitalize">
                      {item.productName}
                    </td>
                    <td className="hidden md:table-cell py-1 px-2 md:py-2 md:px-4 border-b capitalize">
                      {item.cookingMethods}
                    </td>
                    <td className="hidden md:table-cell py-1 px-2 md:py-2 md:px-4 border-b capitalize">
                      {item.region}
                    </td>
                    <td className="py-1 px-2 md:py-2 md:px-4 border-b">
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className=" text-[var(--text-secondary)] hover:text-red-600"
                      >
                        <FaTrash className=" h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex pt-3 justify-between">
          <Button label="Back" onClick={()=> route.back()} className="catr-btn" />
          {filteredItems.length !== 0 &&
          <Button label="Next"  href="/dashboard/book-buffet/phone-verify"/>}
        </div>
    </div>
    </>
  );
};

export default Cart;