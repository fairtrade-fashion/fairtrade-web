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