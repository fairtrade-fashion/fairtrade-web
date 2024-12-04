export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
  selectedSize: string;
  selectedColor: string;
  amount: number;
  description: string;
  content: string;
  product: {
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
  };
}

export interface CartRoot {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}

export interface CartRemove {
  id: string;
  message: string;
}

export interface StreamLinedCartRoot {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  items: CartItem;
}
