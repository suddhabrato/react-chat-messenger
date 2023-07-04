import { createSlice } from "@reduxjs/toolkit";
import { getSearchUsers } from "../actions/userActions";
import { emitEvent } from "../../socketService";

const initialState = {
  searchText: "",
  searchResults: [],
  isLoading: false,
  searchModalOpen: false,
  newGroupModalOpen: false,
  subscribedUsers: [],
  activeUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    subscribeToUsers: (state, { payload }) => {
      state.subscribedUsers = payload;
      if (state.subscribedUsers.length > 0)
        emitEvent("getActiveStatus", state.subscribedUsers);
    },
    setActiveUsers: (state, { payload }) => {
      state.activeUsers = payload;
    },
    openGroupModal: (state) => {
      state.newGroupModalOpen = true;
      state.searchText = "";
      state.searchResults = [];
      state.isLoading = false;
    },
    closeGroupModal: (state) => {
      state.newGroupModalOpen = false;
      state.searchText = "";
      state.searchResults = [];
      state.isLoading = false;
    },
    openSearchModal: (state) => {
      state.searchModalOpen = true;
      state.searchText = "";
      state.searchResults = [];
      state.isLoading = false;
    },
    closeSearchModal: (state) => {
      state.searchModalOpen = false;
      state.searchText = "";
      state.searchResults = [];
      state.isLoading = false;
    },
    setSearchText: (state, { payload }) => {
      state.searchText = payload;
    },
    clearSearch: (state) => {
      state.searchText = "";
      state.searchResults = [];
      state.isLoading = false;
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

export const {
  setSearchText,
  clearSearch,
  closeSearchModal,
  openSearchModal,
  openGroupModal,
  closeGroupModal,
  subscribeToUsers,
  setActiveUsers,
} = userSlice.actions;

export default userSlice.reducer;
