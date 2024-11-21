import { apiClient } from "../utils/utility";

const fetchProductCategory = () => apiClient.get("/product-category");

const fetchShopItems = () => apiClient.get("/shop-items");

const signInUser = (userData) => apiClient.post("/user/signin", userData);

const signUpUser = (userData) => apiClient.post("/user/signup", userData);

export { fetchProductCategory, fetchShopItems, signInUser, signUpUser };
