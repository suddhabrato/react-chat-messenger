import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import ConversationsPage from "./pages/ConversationsPage";
import Navbar from "./components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { clearUser } from "./redux/slices/authSlice";
import { useEffect } from "react";
import { getCurrentUser } from "./redux/actions/authActions";
import { clearConversations } from "./redux/slices/conversationSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getCurrentUser());
      } else {
        dispatch(clearUser());
        dispatch(clearConversations());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/conversations" element={<ConversationsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
