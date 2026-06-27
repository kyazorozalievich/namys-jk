import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/comfortaa";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./component/context/AuthContext";
import ModalProvider from "./ui/ModalProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
