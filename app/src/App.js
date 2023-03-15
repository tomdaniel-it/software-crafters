import { AuthContextProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import TaskOverview from "./pages/TaskOverview";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App mx-80 my-40">
      <BrowserRouter>
        <Routes>
          <Route index element={<AuthContextProvider><Login /></AuthContextProvider>} />
          <Route path="tasks" element={<AuthContextProvider><TaskOverview /></AuthContextProvider>} />
          <Route path="login" element={<AuthContextProvider><Login /></AuthContextProvider>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
