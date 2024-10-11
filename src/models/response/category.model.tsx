export type CategoryRoot = CategoryData[];

export interface CategoryData {
  category_id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}


export interface CategoryProductsRoot {
  products: Product[];
  pagination: Pagination;
}

export interface Product {
  product_id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  productImages: ProductImage[];
  sizes: Size[];
  colors: Color[];
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

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
