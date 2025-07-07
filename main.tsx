// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ThemeProvider } from "./context/ThemeContext";
import FormBuilder from "./Components/FormBuilder";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <FormBuilder />
    </ThemeProvider>
  </React.StrictMode>
);
