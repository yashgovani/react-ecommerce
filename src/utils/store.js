import { configureStore } from "@reduxjs/toolkit";
import productCategoryReducer from "../store/product-category-slice";
import shopItemsReducer from "../store/shop-items-slice";
import authReducer from "../store/auth-slice";
import cartReducer from "../store/cart-slice";

const store = configureStore({
  reducer: {
    productCategory: productCategoryReducer,
    shopItems: shopItemsReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
