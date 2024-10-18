export type CategoryRoot = CategoryData[];

export interface CategoryData {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  parent?: CategoryData | null;
  children: CategoryData[];
}


export interface CategoryProductsRoot {
  products: Product[];
  pagination?: Pagination;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  avarageRating: string;
  images: ProductImage[];
  sizes: Size[];
  colors: Color[];
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

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
