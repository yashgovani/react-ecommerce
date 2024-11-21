import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import ProductCategory from "./pages/ProductCategory";
import { Provider } from "react-redux";
import ShopItems from "./pages/ShopItems";
import CartItems from "./pages/CartItems";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./utils/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const paypalGatewayKey = import.meta.env.ECOMMERCE_PAYMENT_KEY;

const App = () => {
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
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <PayPalScriptProvider
          options={{
            clientId: paypalGatewayKey,
            disableFunding: "credit,card",
          }}
        >
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </PayPalScriptProvider>
      </Provider>
    </>
  );
};

export default App;
