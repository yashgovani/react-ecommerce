import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import ProductCategory from "./pages/ProductCategory";
import store from "./utils/store";
import { Provider } from "react-redux";
import ShopItems from "./pages/ShopItems";
import CartItems from "./pages/CartItems";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductCategory />,
      },
      {
        path: "/shop-item",
        element: <ShopItems />,
      },
      {
        path: "/cart",
        element: <CartItems />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      {/* <Navbar />
      <div className="ecom-container"></div> */}
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;
