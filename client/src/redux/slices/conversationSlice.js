import { createSlice } from "@reduxjs/toolkit";
import { getAllConversations } from "../actions/conversationActions";

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    data: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
    clearConversations: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllConversations.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllConversations.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.hasError = false;
      state.data = payload;
    });

    builder.addCase(getAllConversations.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const { clearConversations } = conversationSlice.actions;

export default conversationSlice.reducer;
