"use client";

import React, { useEffect, useState } from "react";
import { productCategory } from "../../data/productCategory";
import { Product } from "../../types/Products";
import { fetchProductsBySubCategory } from "../../utils/productController";
import ProductCard from "../reuseable/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";
import Shimmer from "../../app/dashboard/_components/Shimmer";

interface Subcategory {
  id: number;
  label: string;
  value: string;
}

interface Category {
  id: number;
  label: string;
  value: string;
  subcategories?: Subcategory[];
}

const ShowProduct: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    productCategory[0]
  );
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<Subcategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleSubcategoryClick = async (subCategory: Subcategory) => {
    setLoading(true);
    setError(null);
    setSelectedSubcategory(subCategory);

    try {
      const fetchedProducts = await fetchProductsBySubCategory(
        subCategory.value
      );
      setProducts(fetchedProducts.products);
      console.log("Fetched products:", fetchedProducts.products);
    } catch (error) {
      console.error("Error loading products:", (error as Error).message);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setProducts([]);
    setSelectedSubcategory(null);
    alert(`You clicked on: ${category.label}`);
  };

  useEffect(() => {
    if (
      selectedCategory?.subcategories &&
      selectedCategory.subcategories.length > 0
    ) {
      handleSubcategoryClick(selectedCategory.subcategories[0]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    // Load cart from localStorage when the app mounts
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        dispatch(setCart(JSON.parse(savedCart)));
      }
    }
  }, [dispatch]);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div id="menu" className="bg-[var(--background-secondary)] p-2 mb-3">
      <div className="mx-auto">
        <div className="flex pb-2 justify-center">
          {productCategory.map((category) => (
            <button
              id={`${category.value}`}
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className={`border text-base border-[var(--border)] py-1 px-2 rounded-full mx-2 mb-1 ${
                selectedCategory?.id === category.id
                  ? "bg-[var(--red)] text-[var(--text-white)]"
                  : "text-[var(--text-red)] hover:bg-[var(--red)] hover:text-[var(--text-white)]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="flex  lg:gap-2 bg-[var(--background)] p-2">
          <div>
            {selectedCategory?.subcategories?.map((subCategory) => (
              <div
                key={subCategory.id}
                onClick={() => handleSubcategoryClick(subCategory)}
                className={`max-xl:p-[5px] p-2 w-44 xl:w-60  text-[var(--text-primary)] text-sm xl:text-base line-clamp-1 leading-7 text-ellipsis shadow-md rounded mb-2 cursor-pointer transition-all duration-300 ease-in-out ${
                  selectedSubcategory?.id === subCategory.id
                    ? "bg-[var(--red)] text-[var(--text-white)] transform scale-100"
                    : "bg-[var(--background-secondary)]"
                }`}
                role="button"
                aria-label={`Select ${subCategory.label}`}
              >
                {subCategory.label}
              </div>
            ))}
          </div>
          {loading && (
            <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 scroll-hidden overflow-x-auto gap-2 bg-[var(--background)] lg:max-h-[410px] xl:max-h-[424px]">
              {Array(12)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="flex-shrink-0">
                    <Shimmer />
                  </div>
                ))}
            </div>
          )}
          <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 scroll-hidden overflow-x-auto gap-4 bg-[var(--background)] lg:max-h-[410px] xl:max-h-[424px]">
            {!loading &&
              !error &&
              products.map((product) => (
                <div key={product._id} className="flex-shrink-0">
                  <ProductCard
                    product={product}
                    isInCart={cartItems.some(
                      (item) => item._id === product._id
                    )}
                  />
                </div>
              ))}
            {error && !loading && (
              <p className="text-[var(--danger)] flex items-center justify-center w-full">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
