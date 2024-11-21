import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetCart } from "../store/cart-slice";
import { createOrderAsyncThunk } from "../store/order-slice";

const Checkout = ({ totalProducts, grandTotal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loggedInUser } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const createOrder = (_, actions) => {
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

  const onApprove = (_, actions) => {
    return actions.order.capture().then((details) => {
      const orderDetails = {
        userId: loggedInUser?._id,
        transactionId: details?.id,
        transactionTime: details?.create_time,
        status: details?.status,
        transactionAmount: details?.purchase_units[0]?.amount?.value,
        currencyCode: details?.purchase_units[0]?.amount?.currency_code,
        payerName: details?.payer?.name?.given_name,
        payerEmail: details?.payer?.email_address,
        payerId: details?.payer?.payer_id,
        orderedItems: cartItems?.map((cartItem) => ({
          productId: cartItem._id,
          price: cartItem?.price,
          quantity: cartItem?.quantity,
        })),
      };
      dispatch(createOrderAsyncThunk(orderDetails)).then(() => {
        dispatch(resetCart());
        navigate("/orders");
      });
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
