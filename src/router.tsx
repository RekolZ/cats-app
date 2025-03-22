import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import ProductPage from "./pages/ProductPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProduct";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to={"/products"} replace /> },
  { path: "/products", element: <HomePage /> },
  { path: "/products/:id", element: <ProductPage /> },
  { path: "/create-product", element: <CreateProductPage /> },
  { path: "/edit-product/:id", element: <EditProductPage /> },
]);
