import { fetcher } from "./api";
import { Product } from "../types/Products";

interface ProductsResponse {
  products: Product[]; // Assuming the response has a 'products' field that is an array of Product
}
interface ProductResponse {
  product: Product; // Assuming the response has a 'products' field that is an array of Product
}
interface CreateProductResponse {
  product: Product; // Adjust this type if needed based on the API's response structure
  productName: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetcher("/api/products");
    const data = response as ProductsResponse;
    return Array.isArray(data.products) ? data.products : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const getProductById = async (productId: string): Promise<Product> => {
  try {
    // Use fetcher utility for the API call
    const {product} =  await fetcher<ProductResponse>(`/api/products/${productId}`);
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error; // Ensure the error is propagated for handling in the caller
  }
};


export const createProduct = async (
  productData: Omit<Product, "id" | "_id">
): Promise<CreateProductResponse | { message: string }> => {
  try {
    const response = await fetcher<CreateProductResponse>("/api/products", {
      method: "POST",
      body: JSON.stringify(productData), 
    });

    console.log("Product created:", response.product);
    return response; // Ensure `response` is of type `CreateProductResponse`
  } catch (error) {
    console.error("Failed to create product:", error);
    return { message: error instanceof Error ? error.message : "Unknown error occurred." };
  }
};


// Function to delete a product by its ID
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await fetcher(`/api/products/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

// Function to update a product by its ID
export const updateProduct = async (
  productId: string,
  updatedProduct: Partial<Product>
): Promise<Product> => {
  try {
    const product = await fetcher<Product>(`/api/products/${productId}`, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      
    });
    console.log("Product updated:", product);
    return product;
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

// utils/productController.ts

export const fetchProduct = async (productId: string) => {
  const response = await fetch(`/api/products/${productId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await response.json();
  return data;
};

// Fetch products by Subcategory
export const fetchProductsBySubCategory = async (subcategory: string) => {
  if (!subcategory) {
    throw new Error("Subcategory is required");
  }

  try {
    const response = await fetch(`/api/products/subcategory/${subcategory}`);
    
    // Check if the response is not OK
    if (!response.ok) {
      // Handle different status codes for more specific error messages
      if (response.status === 404) {
        throw new Error("No products found for this category");
      } else {
        throw new Error("Failed to fetch products");
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};
