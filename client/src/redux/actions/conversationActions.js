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
