import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const lookUpConversationByParticipants = createAsyncThunk(
  "lookUpConversationByParticipants",
  async ({ participants }) => {
    try {
      const res = await api.post("/conversations/lookup", {
        recipients: participants,
      });
      console.log(res.data);

      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);

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

export const createNewMessage = createAsyncThunk(
  "createNewMessage",
  async ({ data }) => {
    try {
      const res = await api.post("/conversations/newMessage", data);
      console.log(res.data?.savedMessage);
      return res.data?.savedMessage;
    } catch (err) {
      console.error(err);
    }
  }
);
