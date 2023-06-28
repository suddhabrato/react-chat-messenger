import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  try {
    const res = await api.get("/user");
    return res.data;
  } catch (err) {
    console.error(err);
  }
});

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logOut = () => {
  auth
    .signOut()
    .then(() => {})
    .catch((error) => {
      console.error("Error logging out:", error);
    });
};
