import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { userData } = useAuth();
  const location = useLocation();
  console.log("Email: " + userData?.email);
  console.log("JwtToken: " + userData?.jwtToken);

  return userData?.email ? (
    //Outlet reprezentuje wszystkie komponenty dzieci z RRD
    <Outlet />
  ) : (
    // podmienienie historii przeglądania uzytkownika na poprzednią lokacje
    <Navigate
      to="/login?alert=unauthenticated"
      state={{ from: location }}
      replace
    />
  );
};
export default ProtectedRoute;
