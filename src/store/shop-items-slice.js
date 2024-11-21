import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchShopItems } from "../services/product-category-service";

export const fetchShopItemsAsyncThunk = createAsyncThunk(
  "fetchShopItemsAsyncThunk",
  async () => {
    try {
      const fetchResponse = await fetchShopItems();
      return fetchResponse.data;
    } catch (error) {
      console.error("Failed to fetch shop items", error);
    }
  }
);

const shopItemsSlice = createSlice({
  name: "shop-item",
  initialState: {
    loading: false,
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder need to use
    builder
      .addCase(fetchShopItemsAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShopItemsAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.shopItems;
      })
      .addCase(fetchShopItemsAsyncThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default shopItemsSlice.reducer;
