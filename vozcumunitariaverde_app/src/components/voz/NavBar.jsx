import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, LayoutDashboard, Home } from "lucide-react";

export default function NavBar() {
  const { pathname } = useLocation();
  const link = (to, label, Icon) => {
    const active = pathname === to;
    return (
      <Link to={to} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-emerald-50"
      }`}>
        <Icon className="w-4 h-4" /> <span className="hidden sm:inline">{label}</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </span>
          <div className="leading-tight">
            <p className="font-bold text-slate-800">Voz Comunitária</p>
            <p className="text-[11px] text-emerald-600 font-medium -mt-0.5">Cidade Verde</p>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          {link("/", "Relatar", Home)}
          {link("/painel", "Painel", LayoutDashboard)}
        </nav>
      </div>
    </header>
  );
}
