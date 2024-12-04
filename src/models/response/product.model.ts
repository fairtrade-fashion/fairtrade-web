export interface ProductRoot {
  products: ProductData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  averageRating: string;
  images: ProductImage[];
  sizes: SizeStock[];
  colors: ColorStock[];
}

export interface SizeStock {
  id: string;
  stock: number;
  size: Size;
}

export interface ColorStock {
  id: string;
  stock: number;
  color: Color;
}
export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface ProductImage {
  id: string,
  url: string;
}
export interface Size {
  id: string;
  name: string;
}

export interface Color {
  id: string;
  name: string;
}
