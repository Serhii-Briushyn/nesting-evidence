import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";

import "@shared/styles/fonts.css";
import "@shared/styles/globals.css";
import "@shared/styles/vars.css";

import { App } from "./App";

const Router = window.env?.isDesktop ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
