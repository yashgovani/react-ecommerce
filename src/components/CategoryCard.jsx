import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        key={category?._id}
        className="bg-pale-lavender rounded-lg p-3 text-center menu-item"
        onClick={() => navigate("/shop-item")}
      >
        <img
          src={category?.imageUrl}
          className="h-[13.75rem] rounded-lg mx-auto background-image"
          alt="product"
        />
        <p className="text-sm leading-5 font-extrabold uppercase text-dark-brown mt-5 mb-3 truncate">
          {category?.title}
        </p>
      </button>
    </>
  );
};

export default CategoryCard;
