import React, { useContext } from "react";
import { UserDataContext } from '../context/UserDataContext';
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { userData } = useContext(UserDataContext);
  const location = useLocation();

  return (
    userData?.name
      ? <Outlet /> //Outlet reprezentuje wszystkie komponenty dzieci
      : <Navigate to="/login?alert=unauthenticated" state={{ from: location }} replace />
      // podmienienie historii przeglądania uzytkownika na poprzednią - zadana lokacje
      // bo w rzeczywistosci nastąpiło przekierowanie do strony logowania
  );
}
export default ProtectedRoute;