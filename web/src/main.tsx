import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Toastify } from "@components/Toastify";
import { Routes } from "./Router";

import "./styles/styles.css";

const rootElement = document.getElementById("app");

if (rootElement) {
  createRoot(rootElement as HTMLElement).render(
    <BrowserRouter>
      <Routes />
      <Toastify autoClose={5000} />
    </BrowserRouter>
  );
}
