import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../components/CartCard";
import { updateCartItem } from "../store/cart-slice";
import Checkout from "../components/Checkout";

const CartItems = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const totalProducts = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const grandTotal = cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  const onQuantityChangeHandler = (product, action) => {
    const index = cartItems.findIndex((item) => item._id === product._id);
    const cartData = [...cartItems];
    if (action === "delete") {
      cartData.splice(index, 1);
    } else {
      const updatedItem = {
        ...cartData[index],
        quantity:
          action === "increase"
            ? cartData[index]?.quantity + 1
            : cartData[index]?.quantity - 1,
      };
      cartData[index] = updatedItem;
    }
    dispatch(updateCartItem(cartData));
  };

  return (
    <div className="ecom-container">
      <div className="header">
        <h2>Cart Items</h2>
      </div>
      <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-4 items-center">
        {cartItems?.map((cartItem) => {
          return (
            <CartCard
              cartItem={cartItem}
              onQuantityChangeHandler={onQuantityChangeHandler}
              key={cartItem._id}
            />
          );
        })}
      </div>
      {cartItems.length > 0 && (
        <Checkout totalProducts={totalProducts} grandTotal={grandTotal} />
      )}
    </div>
  );
};

export default CartItems;
