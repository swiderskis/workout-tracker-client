import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useLoginCheck from "../../hooks/useLoginCheck";
import Loading from "../Loading";
import FormLogin from "./FormLogin";

function Login() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  async function loginCheck() {
    setLoggedIn(await useLoginCheck());
    setLoading(false);
  }

  useEffect(() => {
    loginCheck();
  }, []);

  if (loading) return <Loading />;
  if (loggedIn) return <Navigate to="/" />;

  return (
    <>
      <FormLogin />
      <p>
        Don't have an account? Click <Link to="/register">here</Link> to
        register!
      </p>
    </>
  );
}

export default Login;
