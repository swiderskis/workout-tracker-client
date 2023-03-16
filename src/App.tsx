import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute";

axios.defaults.baseURL = `http://localhost:5000`;

function App() {
  return (
    <div className="w3-row">
      <div className="w3-quarter">
        <br />
      </div>
      <div className="w3-half">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <div className="w3-quarter">
        <br />
      </div>
    </div>
  );
}

export default App;
