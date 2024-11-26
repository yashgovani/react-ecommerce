import axios from "axios";

export const apiClient = axios.create({
  baseURL:
    "https://ecommerce-crown-clothing-api.netlify.app/.netlify/functions/api",
  headers: {
    "Content-Type": "application/json",
  },
});
