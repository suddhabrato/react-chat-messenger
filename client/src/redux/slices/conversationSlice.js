import { createSlice } from "@reduxjs/toolkit";
import {
  createNewMessage,
  deleteMessage,
  getAllConversations,
  getAllMessages,
  lookUpConversationByParticipants,
} from "../actions/conversationActions";

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversationsList: [],
    currentConversation: null,
    isLoadingConversations: false,
    isLoading: false,
    hasError: false,
    messages: [],
    newMessageText: "",
    sendingMessage: false,
    creatingNewConversation: false,
  },
  reducers: {
    setCreatingNewConversation: (state, { payload }) => {
      state.creatingNewConversation = true;
      state.currentConversation = payload;
      state.messages = [];
    },
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
      state.creatingNewConversation = false;
    },
    clearConversations: (state) => {
      state.conversationsList = [];
      state.messages = [];
      state.currentConversation = null;
      state.sendingMessage = false;
      state.newMessageText = "";
      state.creatingNewConversation = false;
    },
  },
  extraReducers: (builder) => {
    //GETTING ALL CONVERSATIONS OF USER

    builder.addCase(getAllConversations.pending, (state) => {
      state.isLoadingConversations = true;
      state.messages = [];
    });

    builder.addCase(getAllConversations.fulfilled, (state, { payload }) => {
      state.isLoadingConversations = false;
      state.hasError = false;
      state.conversationsList = payload;
      state.messages = [];
    });

    builder.addCase(getAllConversations.rejected, (state) => {
      state.isLoadingConversations = false;
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
      if (payload) state.messages = [...state.messages, payload];
      state.creatingNewConversation = false;
    });

    builder.addCase(createNewMessage.rejected, (state) => {
      state.sendingMessage = false;
      state.newMessageText = "";
      state.hasError = true;
    });

    //LOOKING UP CONVERSATION BY PARTICIPANTS
    builder.addCase(lookUpConversationByParticipants.pending, (state) => {
      state.isLoading = true;
      state.messages = [];
      state.sendingMessage = false;
    });

    builder.addCase(
      lookUpConversationByParticipants.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.hasError = false;
        if (payload) state.currentConversation = payload;
        state.messages = [];
        state.sendingMessage = false;
      }
    );

    builder.addCase(lookUpConversationByParticipants.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
      state.messages = [];
      state.sendingMessage = false;
    });

    //DELETING MESSAGE BY ID
    builder.addCase(deleteMessage.pending, (state) => {
      state.hasError = false;
    });

    builder.addCase(deleteMessage.fulfilled, (state, { payload }) => {
      state.hasError = false;
      if (payload)
        state.messages = state.messages.filter(
          (message) => message._id !== payload
        );
    });

    builder.addCase(deleteMessage.rejected, (state) => {
      state.hasError = true;
    });
  },
});

export const {
  clearConversations,
  selectConversation,
  clearCurrentConversation,
  setMessageText,
  setCreatingNewConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
