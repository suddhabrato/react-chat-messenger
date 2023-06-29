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
