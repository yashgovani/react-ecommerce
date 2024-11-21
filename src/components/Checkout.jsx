import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = ({ totalProducts, grandTotal }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: grandTotal,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log(details);
      const name = details.payer.name.given_name;
      alert("success");
    });
  };

  return (
    <div className="checkout-section mt-8 p-4 bg-gray-100 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Summary</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium">Total Products</span>
        <span className="text-sm font-medium">{totalProducts}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium">Grand Total</span>
        <span className="text-sm font-medium">${grandTotal}</span>
      </div>
      {isAuthenticated ? (
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          style={{ disableMaxWidth: true }}
        />
      ) : (
        <Link
          to={{ pathname: "/login" }}
          state={{ from: "cart" }}
          className="btn ecommerce-btn w-full"
        >
          To Continue You Need to Login
        </Link>
      )}
    </div>
  );
};

export default Checkout;
