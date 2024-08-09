import { Navigate, RouteObject } from "react-router-dom";
import AppLayout from "@/component/layout/AppLayout";
import HomeView from "@/domain/home/view/home.view";

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
      ],
    },
  ];
}
