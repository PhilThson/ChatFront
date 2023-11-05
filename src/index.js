import React from "react";
import ReactDOM from "react-dom/client";
import App from "./main-page/App";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from "./context/UserDataContext";
import ErrorBoundary from "./utils/ErrorBoundary";
import "./sass/styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <UserProvider>
        <App />
      </UserProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
