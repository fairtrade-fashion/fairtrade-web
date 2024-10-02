import { CartItem } from "@/lib/product";
import { ProductData } from "@/models/response/product.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  cart: CartItem[];
  selectedProduct: ProductData | null;
}

const initialState: ProductState = {
  selectedProduct: null,
  cart: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductData>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
