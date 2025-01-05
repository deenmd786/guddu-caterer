"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  cookingMethods,
  productCategory,
  regions,
} from "@/data/productCategory";
import Dropdown from "@/components/admin-com/Dropdown";
import SubmitButton from "@/components/admin-com/SubmitButton";
import ImageUploadAndPreview from "@/components/admin-com/ImageUploadAndPreview";
import CategoryDropdown from "@/components/admin-com/CategoryDropdown";
import { Product } from "@/types/Products";
import { createProduct } from "@/utils/productController";
import InputField from "@/components/admin-com/InputFields";
import Head from "next/head";

interface CreateProductResponse {
  product: Product;
}

const AddProductPage: React.FC = () => {
  const [formData, setFormData] = useState<Product>({
    productName: "",
    cookingMethods: "",
    category: "",
    subcategory: "",
    region: "",
    productImg: [],
  });

  const [loading, setLoading] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = useCallback((category: string) => {
    setFormData((prev) => ({
      ...prev,
      category,
      subcategory: "",
    }));
  }, []);

  const handleSubCategoryChange = useCallback((subCategory: string) => {
    setFormData((prev) => ({
      ...prev,
      subcategory: subCategory,
    }));
  }, []);

  const handleImageUpload = (uploadedImages: string[]) => {
    setFormData((prev) => ({
      ...prev,
      productImg: [...prev.productImg, ...uploadedImages],
    }));
  };

  const handleAddProduct: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.productName.trim() ||
      !formData.category.trim() ||
      !formData.region.trim() ||
      formData.productImg.length === 0
    ) {
      console.log("formData: ", formData);
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      console.log("formData: ", formData);

      const result = await createProduct(formData);
      console.log("result: ", result);

      // Type guard to check if result is of type CreateProductResponse
      if ("product" in result) {
        const product = result as CreateProductResponse; // Type assertion
        alert(`Product "${product.product.productName}" added successfully!`);
        resetForm();
      } else {
        // Handle error case
        alert(result.message); // Show the error message
      }
    } catch (error: unknown) {
      // Handle error and show alert
      let errorMessage = "Failed to add product. Please try again."; // Default error message

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "object" && error !== null) {
        const apiError = error as { message?: string };
        errorMessage = apiError.message || errorMessage;
      }

      alert(errorMessage); // Show the error message as an alert
      console.error("Error:", error); // Log the error for debugging
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      productName: "",
      cookingMethods: "",
      category: "",
      subcategory: "",
      region: "",
      productImg: [],
    });
    setShouldReset(true);
  };

  useEffect(() => {
    if (shouldReset) {
      const timer = setTimeout(() => {
        setShouldReset(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [shouldReset]);

  return (
    <>
    <Head>
      <title>Add Product | Guddu Catering Service</title>
      <meta
        name="description"
        content="Add a new product to Guddu Catering's inventory. Fill in the product details and upload images."
      />
      <meta name="robots" content="noindex, nofollow" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Add Product - Guddu Catering Service",
            description: "Add a new product to Guddu Catering's inventory. Fill in the product details and upload images.",
            url: "https://www.gudducaterer.in/admin/add-product",
          }),
        }}
      />
    </Head>
    <div className="max-w-md mx-auto overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4 text-[--text-primary] text-center">Add Product</h1>
      <div className="h-[500px] overflow-y-auto p-1">
        <form onSubmit={handleAddProduct} className="space-y-1">
          {/* Input Fields */}
          <InputField
            id="productName"
            name="productName"
            value={formData.productName}
            placeholder="Enter product name"
            onChange={handleChange}
          />

          <Dropdown
            id="region"
            name="region"
            value={formData.region}
            options={regions}
            onChange={handleChange}
          />

          <Dropdown
            id="Method"
            name="cookingMethods" // Corrected to match state property
            value={formData.cookingMethods}
            options={cookingMethods}
            onChange={handleChange}
          />

          {/* Dropdowns */}
          <CategoryDropdown
            categoryOptions={productCategory}
            onCategoryChange={handleCategoryChange}
            onSubCategoryChange={handleSubCategoryChange}
            shouldReset={shouldReset}
          />

          <ImageUploadAndPreview
            onImageUpload={handleImageUpload}
            loading={loading}
            shouldReset={shouldReset}
          />

          {/* Submit Button */}
          <SubmitButton loading={loading} text="Add Product" />
        </form>
      </div>
    </div>
  </>
  );
};

export default AddProductPage;
