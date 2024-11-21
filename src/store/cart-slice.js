import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loader: false,
    cartItems: [],
  },
  reducers: {
    addCartItem: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    updateCartItem: (state, action) => {
      console.log(action.payload);
      state.cartItems = [...action.payload];
    },
  },
  extraReducers: () => {
    // builder need to use
  },
});

export const { addCartItem, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
