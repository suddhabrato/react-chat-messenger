import { createSlice } from "@reduxjs/toolkit";
import { getSearchConversations, getSearchUsers } from "../actions/userActions";
import { emitEvent } from "../../socketService";

const initialState = {
  searchText: "",
  searchConversationText: "",
  searchResults: [],
  searchConversationResults: null,
  isLoading: false,
  isLoadingConversations: false,
  searchModalOpen: false,
  newGroupModalOpen: false,
  subscribedUsers: [],
  activeUsers: [],
  personalisations: { theme: "light" },
  currentMessageInfo: null,
  messageInfoModalOpen: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentMessage: (state, { payload }) => {
      state.currentMessageInfo = payload;
      state.messageInfoModalOpen = true;
    },
    clearCurrentMessage: (state) => {
      state.currentMessageInfo = null;
      state.messageInfoModalOpen = false;
    },
    toggleTheme: (state) => {
      state.personalisations.theme =
        state.personalisations?.theme === "light" ? "dark" : "light";
    },
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
    setConversationSearchText: (state, { payload }) => {
      state.searchConversationText = payload;
    },
    clearConversationSearch: (state) => {
      state.searchConversationText = "";
      state.searchConversationResults = null;
      state.isLoadingConversations = false;
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

    builder.addCase(getSearchConversations.pending, (state) => {
      state.isLoadingConversations = true;
    });

    builder.addCase(getSearchConversations.fulfilled, (state, { payload }) => {
      state.isLoadingConversations = false;
      state.searchConversationResults = payload;
    });

    builder.addCase(getSearchConversations.rejected, (state) => {
      state.isLoadingConversations = false;
      state.searchConversationResults = null;
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
  toggleTheme,
  setCurrentMessage,
  clearCurrentMessage,
  setConversationSearchText,
  clearConversationSearch,
} = userSlice.actions;

export default userSlice.reducer;
