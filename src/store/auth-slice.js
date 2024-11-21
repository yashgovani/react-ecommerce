import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser } from "../services/product-category-service";

export const signInUserAsyncThunk = createAsyncThunk(
  "signInUserAsyncThunk",
  async (userData) => {
    try {
      const fetchResponse = await signInUser(userData);
      return fetchResponse.data;
    } catch (error) {
      console.error("Failed to signin the user", error);
    }
  }
);

export const signUpUserAsyncThunk = createAsyncThunk(
  "signUpUserAsyncThunk",
  async (userData) => {
    try {
      const fetchResponse = await signUpUser(userData);
      return fetchResponse.data;
    } catch (error) {
      console.error("Failed to sign up the user", error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    loggedInUser: {
      displayName: "",
      email: "",
      password: "",
    },
  },
  reducers: {
    logoutHandler: (state) => {
      state.isAuthenticated = false;
      state.loggedInUser = {
        ...state.loggedInUser,
        displayName: "",
        email: "",
        password: "",
      };
    },
  },
  extraReducers: (builder) => {
    // builder need to use
    builder
      .addCase(signInUserAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUserAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated =
          action.payload.status === "success" ? true : false;
        state.loggedInUser = { ...state.loggedInUser, ...action.payload.user };
      })
      .addCase(signInUserAsyncThunk.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signUpUserAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUserAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated =
          action.payload.status === "success" ? true : false;
        state.loggedInUser = { ...state.loggedInUser, ...action.payload.user };
      })
      .addCase(signUpUserAsyncThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;

export const { logoutHandler } = authSlice.actions;
