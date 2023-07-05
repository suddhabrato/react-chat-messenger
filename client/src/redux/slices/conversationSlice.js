import { createSlice } from "@reduxjs/toolkit";
import {
  createNewGroupConversation,
  createNewMessage,
  deleteMessage,
  getAllConversations,
  getAllMessages,
  lookUpConversationByParticipants,
  markMessageAsSeen,
} from "../actions/conversationActions";
import { emitEvent } from "../../socketService";

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
    creatingNewGroupConversation: false,
  },
  reducers: {
    updateSeenMessage: (state, { payload }) => {
      if (payload)
        state.messages = state.messages.map((message) =>
          message._id === payload._id ? payload : message
        );
    },
    addMessage: (state, { payload }) => {
      if (payload.savedMessage) {
        if (state.currentConversation?._id === payload.conversation._id) {
          state.messages = [payload.savedMessage, ...state.messages];
          state.messages = state.messages.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }

        const existingConversation = state.conversationsList.find(
          (conversation) => conversation._id === payload.conversation._id
        );

        if (!existingConversation)
          state.conversationsList = [
            payload.conversation,
            ...state.conversationsList,
          ];
        else
          state.conversationsList = state.conversationsList.map(
            (conversation) =>
              conversation._id === payload.conversation._id
                ? { ...payload.conversation }
                : { ...conversation }
          );

        state.conversationsList = state.conversationsList.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
      }
    },
    removeMessage: (state, { payload }) => {
      if (state.currentConversation?._id === payload.conversation._id)
        state.messages = state.messages.filter(
          (message) => message._id !== payload.msg._id
        );

      state.conversationsList = state.conversationsList.map((conversation) =>
        conversation._id === payload.conversation._id
          ? { ...payload.conversation }
          : { ...conversation }
      );
    },
    addGroupConversation: (state, { payload }) => {
      state.conversationsList = [payload, ...state.conversationsList];
      state.conversationsList = state.conversationsList.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    },
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
      state.messages = payload;
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
      if (payload) {
        if (payload.conversation && !state.currentConversation._id)
          state.currentConversation = payload.conversation;
        emitEvent("addMessage", payload);
      }
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
      console.log(payload);
      if (payload.conversation) emitEvent("deleteMessage", payload);
    });

    builder.addCase(deleteMessage.rejected, (state) => {
      state.hasError = true;
    });

    //CREATING NEW GROUP CONVERSATION
    builder.addCase(createNewGroupConversation.pending, (state) => {
      state.hasError = false;
      state.creatingNewGroupConversation = true;
    });

    builder.addCase(
      createNewGroupConversation.fulfilled,
      (state, { payload }) => {
        state.hasError = false;
        if (payload) {
          emitEvent("addGroupConversation", payload);
          state.currentConversation = payload;
        }
        state.creatingNewGroupConversation = false;
      }
    );

    builder.addCase(createNewGroupConversation.rejected, (state) => {
      state.hasError = true;
      state.creatingNewGroupConversation = false;
    });

    //MARKING MESSAGE AS SEEN
    builder.addCase(markMessageAsSeen.pending, (state) => {
      state.hasError = false;
    });

    builder.addCase(markMessageAsSeen.fulfilled, (state, { payload }) => {
      state.hasError = false;
      state.messages = state.messages.map((message) =>
        message._id === payload.message._id ? payload.message : message
      );
      emitEvent("updateSeen", payload.message);
    });

    builder.addCase(markMessageAsSeen.rejected, (state) => {
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
  addMessage,
  removeMessage,
  addGroupConversation,
  updateSeenMessage,
} = conversationSlice.actions;

export default conversationSlice.reducer;
