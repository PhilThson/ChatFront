import React, { useContext } from "react";
import { UserDataContext } from '../context/UserDataContext';
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { userData } = useContext(UserDataContext);
  const location = useLocation();

  return (
    userData?.name
      ? <Outlet /> //Outlet reprezentuje wszystkie komponenty dzieci
      : <Navigate to="/login?alert=unauthorized" state={{ from: location }} replace />
      // podmienienie historii przeglądania uytkownika na poprzednią - zaadna lokacje
      // bo w rzeczywistosci nastąpiło przekierowanie do strony logowania
  );
}
export default ProtectedRoute;