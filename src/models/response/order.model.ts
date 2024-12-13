export type OrderBegin = OrderRoot[];

export interface OrderRoot {
  id: string;
  userId: string;
  status: string;
  total: number;
  paymentReference: string;
  shippingAddressId: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: OrderProduct;
}

export interface OrderProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  averageRating: any;
}
