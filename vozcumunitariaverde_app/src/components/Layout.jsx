import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "@/components/voz/NavBar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      <Outlet />
    </div>
  );
}
