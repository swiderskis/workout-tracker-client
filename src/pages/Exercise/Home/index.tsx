import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ExerciseHome() {
  // const navigate = useNavigate();

  // useEffect(() => navigate("view"), []);

  return <Outlet />;
}

export default ExerciseHome;
