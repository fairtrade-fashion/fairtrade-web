import { ProductData } from "@/models/response/product.model";

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  amount: number;
  content: string;
  selectedSize?: string;
  selectedColor?: string;
}

export interface CartItem extends Product {
 id: string,
        name: string,
        image: string,
        selectedSize: string,
        selectedColor: string,
        amount: number,
        quantity: number,
        description: string,
}


export const card: ProductData[] = [
  {
    id: "1",
    images: [
      {
        url: "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80",
      },
    ],
    name: "solomandaras",
    price: 5000,
    description: "",
    sku: "SKU001",
    stock: 10,
    categoryId: "cat001",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    category: {
      id: "cat001",
      name: "Accessories",
      description: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    averageRating: "4.5",
    sizes: [],
    colors: [],
  },
  {
    id: "2",
    images: [
      {
        url: "https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      },
    ],
    name: "solomandaras",
    price: 5000,
    description: "",
    sku: "SKU001",
    stock: 10,
    categoryId: "cat001",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    category: {
      id: "cat001",
      name: "Accessories",
      description: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    averageRating: "4.5",
    sizes: [],
    colors: [],
  },
  {
    id: "3",
    images: [
      {
        url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      },
    ],
    name: "solomandaras",
    price: 5000,
    description: "",
    sku: "SKU001",
    stock: 10,
    categoryId: "cat001",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    category: {
      id: "cat001",
      name: "Accessories",
      description: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    averageRating: "4.5",
    sizes: [],
    colors: [],
  },
  {
    id: "4",
    images: [
      {
        url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      },
    ],
    name: "solomandaras",
    price: 5000,
    description: "",
    sku: "SKU001",
    stock: 10,
    categoryId: "cat001",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    category: {
      id: "cat001",
      name: "Accessories",
      description: "",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    averageRating: "4.5",
    sizes: [],
    colors: [],
  },
];