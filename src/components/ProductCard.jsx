import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, updateCartItem } from "../store/cart-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Assuming you have faTrash imported

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // Find cart item index once and store it
  const cartItemIndex = cartItems.findIndex((item) => item._id === product._id);
  const cartItem = cartItems[cartItemIndex];

  const addToCartItemHandler = (product) => {
    if (cartItemIndex === -1) {
      // If item doesn't exist in the cart, add it
      dispatch(addCartItem({ ...product, quantity: 1 }));
    } else {
      // If item exists, update it
      const updatedItem = {
        ...cartItem,
        quantity: cartItem?.quantity + 1,
      };
      const cartData = [...cartItems];
      cartData[cartItemIndex] = updatedItem;
      dispatch(updateCartItem(cartData));
    }
  };

  const onQuantityChangeHandler = (cartItem, action) => {
    // Adjust quantity based on action (increase, decrease, or delete)
    const updatedItem = {
      ...cartItem,
      quantity:
        action === "increase"
          ? cartItem.quantity + 1
          : action === "decrease"
          ? cartItem.quantity - 1
          : 0,
    };

    if (action === "delete" || updatedItem.quantity <= 0) {
      const updatedCart = cartItems.filter((item) => item._id !== cartItem._id);
      dispatch(updateCartItem(updatedCart));
    } else {
      // Update item with new quantity
      const updatedCart = [...cartItems];
      updatedCart[cartItemIndex] = updatedItem;
      dispatch(updateCartItem(updatedCart));
    }
  };

  return (
    <div
      key={product?._id}
      className="bg-pale-lavender rounded-lg p-3 text-center menu-item"
    >
      <img
        src={product?.imageUrl}
        className="h-[13.75rem] rounded-lg mx-auto background-image"
        alt="product"
      />
      <div className="flex justify-between font-medium text-gray700 mt-5 mb-3">
        <p className="text-sm leading-5 truncate">{product?.name}</p>
        <p className="text-sm leading-5 truncate">{`$ ${product?.price}`}</p>
      </div>
      {cartItem ? (
        <div className="flex justify-between items-center">
          {cartItem.quantity === 1 ? (
            <button
              className="btn ecommerce-btn"
              onClick={() => onQuantityChangeHandler(cartItem, "delete")}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          ) : (
            <button
              className="btn ecommerce-btn"
              onClick={() => onQuantityChangeHandler(cartItem, "decrease")}
            >
              -
            </button>
          )}
          <h6>{cartItem.quantity}</h6>
          <button
            className="btn ecommerce-btn rounded-btn"
            onClick={() => onQuantityChangeHandler(cartItem, "increase")}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="ecommerce-btn w-[100%] p-3 rounded-md font-bold"
          onClick={() => addToCartItemHandler(product)}
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
