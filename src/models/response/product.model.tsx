export interface ProductRoot {
  products: ProductData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductData {
  product_id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  productImages: ProductImage[];
  sizes: Size[];
  colors: Color[];
}

export interface Category {
  category_id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  image_id: string;
  product_id: string;
  imageUrl: string;
  createdAt: string;
}

export interface Size {
  size_id: string;
  name: string;
}

export interface Color {
  color_id: string;
  name: string;
}
