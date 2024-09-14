import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  priceRange: [number, number];
  sizes: string[];
}

const initialState: FilterState = {
  priceRange: [0, 30000], // Adjust default values as needed
  sizes: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setSizes: (state, action: PayloadAction<string[]>) => {
      state.sizes = action.payload;
    },
  },
});

export const { setPriceRange, setSizes } = filterSlice.actions;
export default filterSlice.reducer;
