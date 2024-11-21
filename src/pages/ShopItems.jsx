import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchShopItemsAsyncThunk } from "../store/shop-items-slice";

const ShopItems = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.shopItems);

  useEffect(() => {
    dispatch(fetchShopItemsAsyncThunk());
  }, []);

  return (
    <div className="ecom-container">
      <div className="header">
        <h2>Products</h2>
      </div>
      <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-4 items-center">
        {products?.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
    </div>
  );
};

export default ShopItems;
