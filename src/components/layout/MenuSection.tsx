import React, { useEffect, useState } from "react";
import { productCategory } from "../../data/productCategory";
import { Product } from "../../types/Products";
import { fetchProductsBySubCategory } from "../../utils/productController";
import ProductCard from "../reuseable/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";
import SubCategorySelector from "../ui/SubCategorySelector";
import MenuCategorySelector from "../ui/MenuCategorySelector";
import { Category, SubCategory } from "../../types/types";
import ShimmerPlaceholder from "../reuseable/ShimmerPlaceholder";

const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    productCategory[0]
  );
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<SubCategory | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleSubcategoryClick = async (subCategory: SubCategory | null) => {
    setLoading(true);
    setError(null);
    setSelectedSubcategory(subCategory);

    try {
      if (subCategory) {
        const fetchedProducts = await fetchProductsBySubCategory(
          subCategory.value
        );
        setProducts(fetchedProducts.products);
      }
    } catch (error) {
      console.log("error: ", error);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: Category | null) => {
    if (category) {
      setSelectedCategory(category);
      setProducts([]);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(null);
      setProducts([]);
      setSelectedSubcategory(null);
    }
  };

  useEffect(() => {
    if (selectedCategory?.subcategories?.length) {
      handleSubcategoryClick(selectedCategory.subcategories[0]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        dispatch(setCart(JSON.parse(savedCart)));
      }
    }
  }, [dispatch]);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="bg-[var(--background)]">
      <div className="flex gap-4 py-3 items-center justify-center ">
        <MenuCategorySelector
          categories={productCategory}
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
        />
        {selectedCategory?.subcategories && (
          <SubCategorySelector
            subcategories={selectedCategory.subcategories}
            selectedSubcategory={selectedSubcategory}
            onSubCategoryClick={handleSubcategoryClick}
          />
        )}
      </div>
      <div className="mb-1 md:mb-2 lg:mb-0 bg-[var(--background)] w-full max-h-[64vh]  md:max-h-[74vh] scroll-hidden overflow-y-auto">
      {loading && (
  <div className="grid grid-cols-3 sm:grid-cols-4 lg:flex w-full h-full scroll-hidden gap-2 md:gap-3 lg:gap-4 bg-[var(--background)]">
    {Array.from({ length: 12 }).map((_, index) => (
      <ShimmerPlaceholder key={index} />
    ))}
  </div>
)}

        {error && !loading && (
          <p className="text-[var(--danger)] flex items-center justify-center w-full">
            {error}
          </p>
        )}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:flex w-full scroll-hidden lg:overflow-x-auto gap-2 bg-[var(--background)]">
          {!loading &&
            !error &&
            products.map((product) => (
              <div key={product._id} className="flex-shrink-0 ">
                <ProductCard
                  product={product}
                  isInCart={cartItems.some((item) => item._id === product._id)}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
