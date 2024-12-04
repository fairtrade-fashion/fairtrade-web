export interface NewArrivalModel {
  id: string;
  name: string;
  description: string;
  price: number; 
  sku: string;
  stock: number;
  categoryId: string;
  createdAt: string; 
  updatedAt: string; 
  averageRating: number | null; 
  category: {
    id: string; 
    name: string;
    parentId: string | null;
    createdAt: string; 
    updatedAt: string;
  };
  images: Array<{
    id: string; 
    url: string;
    productId: string; 
  }>;
}

export interface NewArrivalResponse {
  id: string;
  name: string;
  price: number;
  images: { url: string }[];
}