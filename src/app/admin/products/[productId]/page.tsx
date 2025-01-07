"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Product } from "@/types/Products";
import { getProductById, updateProduct } from "@/utils/productController";
import InputField from "@/components/admin-com/InputFields";
import Dropdown from "@/components/admin-com/Dropdown";
import { cookingMethods, productCategory, regions } from "@/data/productCategory";
import CategoryDropdown from "@/components/admin-com/CategoryDropdown";
import ImageUploadAndPreview from "@/components/admin-com/ImageUploadAndPreview";
import SubmitButton from "@/components/admin-com/SubmitButton";


const EditProductPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const productId = Array.isArray(params.productId)
    ? params.productId[0]
    : params.productId;

  const [formData, setFormData] = useState<Omit<Product, "id">>({
    _id: "",
    productName: "",
    cookingMethods: "",
    category: "",
    subcategory: "",
    region: "",
    productImg: [],
  });

  const [originalData, setOriginalData] = useState<Omit<Product, "id"> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product details
  useEffect(() => {
    if (!productId) {
      setError("Product ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(productId);
        setFormData({
          _id: fetchedProduct._id,
          productName: fetchedProduct.productName,
          cookingMethods: fetchedProduct.cookingMethods,
          category: fetchedProduct.category,
          subcategory: fetchedProduct.subcategory,
          region: fetchedProduct.region,
          productImg: fetchedProduct.productImg || [],
        });
        setOriginalData(fetchedProduct);
      } catch (err) {
        setError("Failed to load product details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (uploadedImages: string[]) => {
    setFormData((prev) => ({
      ...prev,
      productImg: [...prev.productImg, ...uploadedImages],
    }));
  };

  const handleImageDelete = (deletedImageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      productImg: prev.productImg.filter((url) => url !== deletedImageUrl), // Filter by URL
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleSubCategoryChange = (subCategory: string) => {
    setFormData((prev) => ({
      ...prev,
      subcategory: subCategory,
    }));
  };

  const handleUpdateProduct: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const isChanged =
      originalData &&
      (formData.productName !== originalData.productName ||
        formData.cookingMethods !== originalData.cookingMethods ||
        formData.category !== originalData.category ||
        formData.region !== originalData.region ||
        formData.productImg.length !== originalData.productImg.length ||
        !formData.productImg.every(
          (img, index) => img === originalData.productImg[index]
        ));

    if (!isChanged) {
      alert("Please change at least one field.");
      return;
    }

    setLoading(true);
    try {
      const updatedProduct = await updateProduct(productId as string, formData);
      alert(`Product "${updatedProduct.productName}" updated successfully!`);
      router.push("/admin/products");
    } catch (error) {
      alert("Failed to update product. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Edit Product - Guddu Catering Service",
              description: "Edit the details of an existing product in Guddu Catering's inventory. Update product information and images.",
              url: "https://www.gudducaterer.in/admin/edit-product",
            }),
          }}
        />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-[--text-primary] text-center">Edit Product</h1>
        <form onSubmit={handleUpdateProduct} className="space-y-2">
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
            id="cookingMethods"
            name="cookingMethods"
            value={formData.cookingMethods}
            options={cookingMethods}
            onChange={handleChange}
          />

          {/* Dropdowns */}
          <CategoryDropdown
            categoryOptions={productCategory}
            onCategoryChange={handleCategoryChange}
            onSubCategoryChange={handleSubCategoryChange}
            initialCategory={formData.category}
            initialSubCategory={formData.subcategory}
          />

          {/* Image Upload Component */}
          <ImageUploadAndPreview
            onImageUpload={handleImageUpload}
            onImageDelete={handleImageDelete} // Pass the delete handler
            loading={loading}
            initialImages={formData.productImg}
          />

          {/* Submit Button */}
          <SubmitButton loading={loading} text="Update Product" />
        </form>
      </div>
    </>

  );
};

export default EditProductPage;
