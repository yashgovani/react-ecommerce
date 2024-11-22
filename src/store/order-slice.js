import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrderService,
  fetchUserOrderService,
} from "../services/product-category-service";
import { successToast } from "../services/toast-service";

export const createOrderAsyncThunk = createAsyncThunk(
  "createOrderAsyncThunk",
  async (orderDetails) => {
    try {
      const fetchResponse = await createOrderService(orderDetails);
      return fetchResponse.data;
    } catch (error) {
      console.error("Failed while creating an order", error);
    }
  }
);

export const fetchUserOrderAsyncThunk = createAsyncThunk(
  "fetchUserOrderAsyncThunk",
  async (userId) => {
    try {
      const fetchResponse = await fetchUserOrderService(userId);
      return fetchResponse.data;
    } catch (error) {
      console.error("Error while fetching the orders", error);
    }
  }
);

const cartSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orders: [],
  },
  reducers: {
    resetUserOrder: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    // builder need to use
    builder
      .addCase(createOrderAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        successToast(action.payload?.message);
        state.orders = [...state.orders, action.payload?.order];
      })
      .addCase(createOrderAsyncThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserOrderAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrderAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        successToast(action.payload?.message);
        state.orders = [...action.payload?.orders];
      })
      .addCase(fetchUserOrderAsyncThunk.rejected, (state) => {
        state.loading = false;
        state.orders = [];
      });
  },
});

export const { resetUserOrder } = cartSlice.actions;
export default cartSlice.reducer;
