import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useLoginCheck from "../hooks/useLoginCheck";
import Loading from "../pages/Loading";

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute(props: PrivateRouteProps) {
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
  if (!loggedIn) return <Navigate to="/login" />;

  return props.children;
}

export default PrivateRoute;
