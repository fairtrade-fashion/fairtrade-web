import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import appRouter from "./config/routes.tsx";
import { store } from "./config/store.tsx";

const routes = createBrowserRouter(appRouter());
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
      <Toaster position="top-right" richColors closeButton />
    </Provider>
  </React.StrictMode>
);
