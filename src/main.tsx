import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App/App";
import "./normalize.css";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
