// src/types/types.ts
export interface SubCategory {
  id: number;
  label: string;
  value: string;
}

export interface Category {
  id: number;
  label: string;
  value: string;
  subcategories?: SubCategory[];
}