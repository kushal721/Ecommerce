import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";
import Orders from "./pages/Orders";
import Product from "./pages/Product";
import Saved from "./pages/Saved";
import Shop from "./pages/Shop";
import { StoreProvider } from "./store/StoreProvider";

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "shop", element: <Shop /> },
        { path: "shop/:department", element: <Shop /> },
        { path: "product/:slug", element: <Product /> },
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <Checkout /> },
        { path: "orders", element: <Orders /> },
        { path: "orders/:id", element: <Order /> },
        { path: "saved", element: <Saved /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/" }
);

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}
