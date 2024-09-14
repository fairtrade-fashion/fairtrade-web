import { CategoryProductsRoot } from "@/models/response/category.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  selectedCategoryProduct: CategoryProductsRoot | null;
}

const initialState: CategoryState = {
  selectedCategoryProduct: null, // Default category
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryProductsRoot>) => {
      state.selectedCategoryProduct = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
