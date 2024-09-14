import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../redux/slices/category.slice";
import productReducer from "../redux/slices/product.slice";
import cartReducer from "../redux/slices/cart.slice";
// import filterReducer from "../redux/slices/cart.slice";
import userReducer from "@/redux/slices/user.slice"
import { api } from "@/apis/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,

    // filter: filterReducer,
    user: userReducer,
    category: categoryReducer,
    products: productReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
