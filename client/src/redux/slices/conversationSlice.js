import { createSlice } from "@reduxjs/toolkit";
import {
  createNewMessage,
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
    newMessageText: "",
    sendingMessage: false,
  },
  reducers: {
    setMessageText: (state, { payload }) => {
      state.newMessageText = payload;
    },
    selectConversation: (state, { payload }) => {
      state.currentConversation = payload;
      state.sendingMessage = false;
      state.newMessageText = "";
    },
    clearCurrentConversation: (state) => {
      state.currentConversation = null;
      state.sendingMessage = false;
      state.messages = [];
      state.newMessageText = "";
    },
    clearConversations: (state) => {
      state.conversationsList = [];
      state.messages = [];
      state.currentConversation = null;
      state.sendingMessage = false;
      state.newMessageText = "";
    },
  },
  extraReducers: (builder) => {
    //GETTING ALL CONVERSATIONS OF USER

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

    //GETTING ALL MESSAGES FOR CONVERSATION

    builder.addCase(getAllMessages.pending, (state) => {
      state.isLoading = true;
      state.messages = [];
      state.sendingMessage = false;
    });

    builder.addCase(getAllMessages.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.hasError = false;
      state.messages = payload.reverse();
      state.sendingMessage = false;
    });

    builder.addCase(getAllMessages.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
      state.messages = [];
      state.sendingMessage = false;
    });

    //SENDING NEW MESSAGE

    builder.addCase(createNewMessage.pending, (state) => {
      state.sendingMessage = true;
      state.newMessageText = "";
      state.hasError = false;
    });

    builder.addCase(createNewMessage.fulfilled, (state, { payload }) => {
      state.sendingMessage = false;
      state.hasError = false;
      state.newMessageText = "";
      state.messages = [...state.messages, payload];
    });

    builder.addCase(createNewMessage.rejected, (state) => {
      state.sendingMessage = false;
      state.newMessageText = "";
      state.hasError = true;
    });
  },
});

export const {
  clearConversations,
  selectConversation,
  clearCurrentConversation,
  setMessageText,
} = conversationSlice.actions;

export default conversationSlice.reducer;
