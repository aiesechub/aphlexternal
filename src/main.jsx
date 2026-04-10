// src/main.jsx
// Wire up the admin dashboard at /admin using React Router.
//
// Install React Router first:
//   npm install react-router-dom
// ----------------------------------------------------------------

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import App from "./App"; // Your existing public site
import JoinUs from "./JoinUs";
import PartnerWithUs from "./PartnerWithUs";
import OurProducts from "./OurProducts";
import "./index.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public website */}
        <Route path="/" element={<App />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/products" element={<OurProducts />} />
        <Route path="/partner" element={<PartnerWithUs />} />

        {/* 404 fallback */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
