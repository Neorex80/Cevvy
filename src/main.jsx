import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ResumeProvider } from "./context/ResumeContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ResumeProvider>
      <App />
    </ResumeProvider>
  </StrictMode>
);