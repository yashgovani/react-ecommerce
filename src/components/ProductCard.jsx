import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, updateCartItem } from "../store/cart-slice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartItemHandler = (product) => {
    const index = cartItems.findIndex((item) => item._id === product._id);
    if (index === -1) {
      dispatch(addCartItem({ ...product, quantity: 1 }));
    } else {
      const cartData = [...cartItems];
      const updatedItem = {
        ...cartData[index],
        quantity: cartData[index]?.quantity + 1,
      };
      cartData[index] = updatedItem;
      dispatch(updateCartItem(cartData));
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
      <button
        className="ecommerce-btn w-[100%] p-3 rounded-md font-bold"
        onClick={() => addToCartItemHandler(product)}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
