import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const getSearchUsers = createAsyncThunk(
  "getSearchUsers",
  async (data) => {
    try {
      const res = await api.get(`/user/search?searchTerm=${data}`);
      return res.data.users;
    } catch (err) {
      console.error(err);
    }
  }
);

export const getSearchConversations = createAsyncThunk(
  "getSearchConversations",
  async (data) => {
    try {
      const res = await api.get(`/conversations/search?searchTerm=${data}`);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
);
