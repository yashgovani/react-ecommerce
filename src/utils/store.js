import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // LocalStorage by default
import productCategoryReducer from "../store/product-category-slice";
import shopItemsReducer from "../store/shop-items-slice";
import authReducer from "../store/auth-slice";
import cartReducer from "../store/cart-slice";
import orderReducer from "../store/order-slice";

const rootReducers = combineReducers({
  productCategory: productCategoryReducer,
  shopItems: shopItemsReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["auth", "cart"],
  },
  rootReducers
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export default store;
