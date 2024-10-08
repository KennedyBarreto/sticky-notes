import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Spinner from "../icons/Spinner";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Spinner size="100" />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
