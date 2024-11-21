import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductCategoryAsyncThunk } from "../store/product-category-slice";
import CategoryCard from "../components/CategoryCard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.productCategory);

  useEffect(() => {
    dispatch(fetchProductCategoryAsyncThunk());
  }, []);

  return (
    <>
      <div className="ecom-container">
        <div className="header">
          <h2>Product Categories</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
          {categories?.map((category) => {
            return <CategoryCard category={category} key={category._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ProductCategory;