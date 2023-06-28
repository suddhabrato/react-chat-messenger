import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const getAllConversations = createAsyncThunk(
  "getAllConversations",
  async () => {
    try {
      const res = await api.get("/conversations");
      console.log(res.data.conversations);
      return res?.data?.conversations;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getAllMessages = createAsyncThunk(
  "getAllMessages",
  async ({ id }) => {
    try {
      const res = await api.get(`/conversations/${id}`);
      console.log(res.data.messages);
      return res?.data?.messages;
    } catch (err) {
      console.error(err);
    }
  }
);
