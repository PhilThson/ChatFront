import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { userData } = useAuth();
  const location = useLocation();
  console.log("Inside ProtectedRoute");
  console.log("Email: " + userData?.email);
  console.log("JwtToken: " + userData?.jwtToken);

  return userData?.email ? (
    <Outlet /> //Outlet reprezentuje wszystkie komponenty dzieci
  ) : (
    <Navigate
      to="/login?alert=unauthenticated"
      state={{ from: location }}
      replace
    />
  );
  // podmienienie historii przeglądania uzytkownika na poprzednią - zadana lokacje
  // bo w rzeczywistosci nastąpiło przekierowanie do strony logowania
};
export default ProtectedRoute;
