import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute";
import AddExercise from "./pages/Exercise/Add";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header";
import ExerciseHome from "./pages/Exercise/Home";
import ViewExercises from "./pages/Exercise/View";
import EditExercise from "./pages/Exercise/Edit";
import DeleteExercise from "./pages/Exercise/Delete";

axios.defaults.baseURL = `http://localhost:5000`;

function App() {
  return (
    <div className="w3-row">
      <div className="w3-quarter">
        <br />
      </div>
      <div className="w3-half">
        <Header />
        <Navbar />
        <div className="w3-section w3-margin-left w3-margin-right">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="exercise"
              element={
                <PrivateRoute>
                  <ExerciseHome />
                </PrivateRoute>
              }
            >
              <Route
                path="add"
                element={
                  <PrivateRoute>
                    <AddExercise />
                  </PrivateRoute>
                }
              />
              <Route
                path="view"
                element={
                  <PrivateRoute>
                    <ViewExercises />
                  </PrivateRoute>
                }
              />
              <Route
                path="edit"
                element={
                  <PrivateRoute>
                    <EditExercise />
                  </PrivateRoute>
                }
              />
              <Route
                path="delete"
                element={
                  <PrivateRoute>
                    <DeleteExercise />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <div className="w3-quarter">
        <br />
      </div>
    </div>
  );
}

export default App;
