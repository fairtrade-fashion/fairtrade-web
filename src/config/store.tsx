import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../redux/slices/category.slice";
import productReducer from "../redux/slices/product.slice";
import cartReducer from "../redux/slices/cart.slice";
// import filterReducer from "../redux/slices/cart.slice";
import userReducer from "@/redux/slices/user.slice";
import { api } from "@/apis/api";
import { loginApi } from "@/domain/auth/api/login.api";
import authReducer from "../redux/slices/auth.slice"
import { registerApi } from "@/domain/auth/api/register.api";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [api.reducerPath]: api.reducer,
    user: userReducer,
    category: categoryReducer,
    products: productReducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      api.middleware,
      loginApi.middleware,
      registerApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` typ0es from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
