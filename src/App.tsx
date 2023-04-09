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
import AddRoutine from "./pages/Workout/Add";
import ViewRoutines from "./pages/Workout/View";
import EditRoutine from "./pages/Workout/Edit";
import SessionHome from "./pages/Session/Home";
import AddSession from "./pages/Session/Add";
import ViewSessions from "./pages/Session/View";
import EditSession from "./pages/Session/Edit";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

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
              path="routine"
              element={
                <PrivateRoute>
                  <WorkoutHome />
                </PrivateRoute>
              }
            >
              <Route path="create" element={<AddRoutine />} />
              <Route path="list" element={<ViewRoutines />} />
              <Route path="update" element={<EditRoutine />} />
            </Route>
            <Route
              path="session"
              element={
                <PrivateRoute>
                  <SessionHome />
                </PrivateRoute>
              }
            >
              <Route path="log" element={<AddSession />} />
              <Route path="list" element={<ViewSessions />} />
              <Route path="edit" element={<EditSession />} />
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
