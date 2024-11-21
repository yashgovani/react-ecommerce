import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cartItems: [],
    orders: [],
  },
  reducers: {
    addCartItem: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    updateCartItem: (state, action) => {
      state.cartItems = [...action.payload];
    },
    resetCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: () => {
    // builder need to use
  },
});

export const { addCartItem, updateCartItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
