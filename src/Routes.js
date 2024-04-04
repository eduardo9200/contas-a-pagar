import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import NovaConta from "./pages/nova-conta/NovaConta";
import Conta from "./pages/conta/Conta";
import NotFoundPage from "./pages/not-found/NotFoundPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nova-conta" element={<NovaConta />} />
        <Route path="/conta/:id" element={<Conta />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}