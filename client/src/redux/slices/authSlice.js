import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../actions/authActions";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    completedFetch: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.completedFetch = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.completedFetch = false;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.completedFetch = true;
    });

    builder.addCase(getCurrentUser.rejected, (state) => {
      state.user = null;
      state.isLoading = false;
      state.completedFetch = true;
    });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
