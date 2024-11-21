import { Navigate, RouteObject } from "react-router-dom";
import AppLayout from "@/component/layout/AppLayout";
import HomeView from "@/domain/home/view/home.view";
import ProductPage from "@/domain/product/product.page";
import CartPage from "@/domain/cart/cart_page";
import CheckoutPage from "@/domain/checkout/checkout.page";
import CategoryView from "@/domain/categories/view/category.view";
import Login from "@/domain/auth/component/login";
import ForgotPassword from "@/domain/auth/component/forget_password";
import ResetPassword from "@/domain/auth/component/reset_password";
import UpdatePassword from "@/domain/auth/component/update_pasword";
import SignupPage from "@/domain/auth/component/signup";
import ProfilePage from "@/domain/profile/component/profile.page";
import OrderPage from "@/domain/profile/component/order";

export default function appRouter(): RouteObject[] {
  return [
    {
      path: "/",
      element: <Navigate to="/home" />,
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "home",
          element: <HomeView />,
        },
        { path: "/category/:category/:id", element: <CategoryView /> },
        { path: "/product/:id", element: <ProductPage /> },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/checkout",
          element: <CheckoutPage />,
        },
        {
          path: "/order",
          element: <OrderPage />,
        },
      ],
    },
    // Authentication routes
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/update-password",
      element: <UpdatePassword />,
    },
  ];
}
