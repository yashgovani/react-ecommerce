import React from "react";

const CategoryCard = ({ category }) => {
  return (
    <>
      <button
        key={category?._id}
        className="bg-pale-lavender rounded-lg p-3 text-center menu-item"
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
