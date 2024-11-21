import { apiClient } from "../utils/utility";

const fetchProductCategory = () => apiClient.get("/product-category");

const fetchShopItems = () => apiClient.get("/shop-items");

export { fetchProductCategory, fetchShopItems };
