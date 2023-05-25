import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import ConversationsPage from "./pages/ConversationsPage";
import Navbar from "./components/Navbar";

const App = () => {
  const GetConversationPage = () => {
    const convId = useParams();
    return <ConversationsPage convId={convId} chatOpen={true} />;
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/conversations/:convId"
            element={<GetConversationPage />}
          />
          <Route
            path="/conversations"
            element={<ConversationsPage chatOpen={false} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
