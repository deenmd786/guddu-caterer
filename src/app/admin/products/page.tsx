"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdEdit, MdDelete } from "react-icons/md"; // Import icons
import { Product } from "@/types/Products";
import { deleteProduct, getProducts } from "@/utils/productController";
import ProductCard from "@/components/admin-com/ProductCard";
import Head from "next/head";


const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        console.log("Fetched products:", fetchedProducts); // Log the fetched products
        setProducts(fetchedProducts);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const handleEditProduct = (id: string | undefined) => {
    if (id) {
      router.push(`/admin/products/${id}`);
    } else {
      console.error("Product ID is undefined");
    }
  };

  const handleDeleteProduct = async (id: string | undefined) => {
    if (id && window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id); // Call delete API
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        ); // Update local state
      } catch (error) {
        alert("Failed to delete product. Please try again.");
        console.error("Error:", error);
      }
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error)
    return <p className="text-red-500 text-center font-semibold">{error}</p>;

  return (
    <>
      <Head>
        <title>Users | Guddu Catering Service</title>
        <meta
          name="description"
          content="Manage users in the Guddu Catering admin panel. View and edit user details."
        />
        <meta name="robots" content="noindex, nofollow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Users Management - Guddu Catering Service",
              description: "Manage users in the Guddu Catering admin panel. View and edit user details.",
              url: "https://www.gudducaterer.in/admin/users",
            }),
          }}
        />
      </Head>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="relative">
            <ProductCard
              product={product}
            />
            {/* Edit and Delete buttons */}
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => handleEditProduct(product._id)}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <MdEdit size={24} />
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <MdDelete size={24} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No products available.
        </p>
      )}
    </div>
  </>
  );
};

export default ProductListPage;