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
import WorkoutHome from "./pages/Workout/Home";
import AddWorkout from "./pages/Workout/Add";

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
              <Route path="add" element={<AddExercise />} />
              <Route path="view" element={<ViewExercises />} />
              <Route path="edit" element={<EditExercise />} />
              <Route path="delete" element={<DeleteExercise />} />
            </Route>
            <Route
              path="workout"
              element={
                <PrivateRoute>
                  <WorkoutHome />
                </PrivateRoute>
              }
            >
              <Route path="create-routine" element={<AddWorkout />} />
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
