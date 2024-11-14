import { CartItem } from "@/models/response/cartI_items";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state for the cart
export interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const { id, selectedSize, selectedColor } = action.payload;
      state.cart = state.cart.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      );
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      // Update localStorage
      localStorage.removeItem("cart");
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        selectedSize: string;
        selectedColor: string;
        quantity: number;
      }>
    ) => {
      const item = state.cart.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
