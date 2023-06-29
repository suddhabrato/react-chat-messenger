import { createSlice } from "@reduxjs/toolkit";
import { getSearchUsers } from "../actions/userActions";

const initialState = {
  searchText: "",
  searchResults: [],
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearchText: (state, { payload }) => {
      state.searchText = payload;
    },
    clearSearch: (state) => {
      (state.searchText = ""),
        (state.searchResults = []),
        (state.isLoading = false);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSearchUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.searchResults = payload;
    });

    builder.addCase(getSearchUsers.rejected, (state) => {
      state.isLoading = false;
      state.searchResults = [];
    });
  },
});

export const { setSearchText, clearSearch } = userSlice.actions;

export default userSlice.reducer;
