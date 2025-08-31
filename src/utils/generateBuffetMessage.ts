// src/utils/generateBuffetMessage.ts
import { Product } from "@/types/Products";

export const generateBuffetMessage = (products: Product[]): string => {
  if (!products || products.length === 0) return "Your Buffet Order:\n\nNo items selected.";

  let message = "Your Buffet Order:\n\n";

  // Group products by category
  const grouped = products.reduce((acc: Record<string, string[]>, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product.productName);
    return acc;
  }, {});

  // Add each category and its items
  for (const [category, items] of Object.entries(grouped)) {
    message += `${category}:\n`;
    items.forEach(item => {
      message += `- ${item}\n`;
    });
    message += `\n`;
  }

  return message.trim();
};
