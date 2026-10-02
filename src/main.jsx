import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <HelmetProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>
  </BrowserRouter>
);
