import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";
import Links from "./pages/Links.tsx";
import Follow from "./pages/Follow.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Links />} />
          <Route path=':id' element={<Follow />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
