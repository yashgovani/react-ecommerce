import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductCategory } from "../services/product-category-service";

export const fetchProductCategoryAsyncThunk = createAsyncThunk(
  "fetchProductCategoryAsyncThunk",
  async () => {
    try {
      const fetchResponse = await fetchProductCategory();
      return fetchResponse.data;
    } catch (error) {
      console.error("Failed to fetch product category", error);
    }
  }
);

const productCategorySlice = createSlice({
  name: "product-category",
  initialState: {
    loader: false,
    categories: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder need to use
    builder
      .addCase(fetchProductCategoryAsyncThunk.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchProductCategoryAsyncThunk.fulfilled, (state, action) => {
        state.loader = false;
        state.categories = action.payload.productCategories;
      })
      .addCase(fetchProductCategoryAsyncThunk.rejected, (state) => {
        state.loader = false;
      });
  },
});

export default productCategorySlice.reducer;
