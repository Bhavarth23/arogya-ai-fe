// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import { setupAxios } from "./utils/axiosConfig";

// Import BrowserRouter - THIS IS CORRECT
import { BrowserRouter } from "react-router-dom";

// This part is already correct! It runs when the app starts.
setupAxios();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Keep this BrowserRouter as the single source of truth */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
