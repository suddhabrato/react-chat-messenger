import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import conversationSlice from "./slices/conversationSlice.js";
import userSlice from "./slices/userSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    conversation: conversationSlice,
    user: userSlice,
  },
});

// eslint-disable-next-line react/prop-types
const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
