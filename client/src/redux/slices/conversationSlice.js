import { createSlice } from "@reduxjs/toolkit";
import {
  getAllConversations,
  getAllMessages,
} from "../actions/conversationActions";

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversationsList: [],
    currentConversation: null,
    isLoading: false,
    hasError: false,
    messages: [],
  },
  reducers: {
    selectConversation: (state, { payload }) => {
      state.currentConversation = payload;
    },
    clearCurrentConversation: (state) => {
      state.currentConversation = null;
      state.messages = [];
    },
    clearConversations: (state) => {
      state.conversationsList = [];
      state.messages = [];
      state.currentConversation = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllConversations.pending, (state) => {
      state.isLoading = true;
      state.messages = [];
    });

    builder.addCase(getAllConversations.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.hasError = false;
      state.conversationsList = payload;
      state.messages = [];
    });

    builder.addCase(getAllConversations.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
      state.messages = [];
    });

    //MESSAGES

    builder.addCase(getAllMessages.pending, (state) => {
      state.isLoading = true;
      state.messages = [];
    });

    builder.addCase(getAllMessages.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.hasError = false;
      state.messages = payload.reverse();
    });

    builder.addCase(getAllMessages.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
      state.messages = [];
    });
  },
});

export const {
  clearConversations,
  selectConversation,
  clearCurrentConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
