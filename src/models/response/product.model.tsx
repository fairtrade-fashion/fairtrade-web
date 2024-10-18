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
  sizes: Size[];
  colors: Color[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
}

export interface Size {
  size_id: string;
  name: string;
}

export interface Color {
  color_id: string;
  name: string;
}
