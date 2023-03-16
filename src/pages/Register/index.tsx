import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useLoginCheck from "../../hooks/useLoginCheck";
import Loading from "../Loading";
import FormRegister from "./FormRegister";

function Register() {
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
      <h1>Register</h1>
      <FormRegister />
    </>
  );
}

export default Register;
