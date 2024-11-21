import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: true,
  },
  reducers: {},
  extraReducers: () => {
    // builder need to use
  },
});

export default authSlice.reducer;
