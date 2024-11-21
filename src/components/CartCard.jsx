import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CartCard = ({ cartItem, onQuantityChangeHandler }) => {
  return (
    <div
      key={cartItem?._id}
      className="bg-pale-lavender rounded-lg p-3 text-center menu-item"
    >
      <img
        src={cartItem?.imageUrl}
        className="h-[13.75rem] rounded-lg mx-auto background-image"
        alt={cartItem.name}
      />
      <div className="flex justify-between font-medium text-gray700 mt-5 mb-3">
        <p className="text-sm leading-5 truncate">{cartItem?.name}</p>
        <p className="text-sm leading-5 truncate">{`$ ${cartItem?.price}`}</p>
      </div>
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
    </div>
  );
};

export default CartCard;
