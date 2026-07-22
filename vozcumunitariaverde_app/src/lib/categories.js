import { Droplet, Lightbulb, Trash2, Bus, ShieldAlert, HelpCircle } from "lucide-react";

export const CATEGORIES = {
  agua: { label: "Falta de água", icon: Droplet, color: "#0ea5e9", bg: "bg-sky-100", text: "text-sky-700" },
  iluminacao: { label: "Iluminação pública", icon: Lightbulb, color: "#f59e0b", bg: "bg-amber-100", text: "text-amber-700" },
  lixo: { label: "Descarte irregular de lixo", icon: Trash2, color: "#84cc16", bg: "bg-lime-100", text: "text-lime-700" },
  transporte: { label: "Linha de ônibus insuficiente", icon: Bus, color: "#8b5cf6", bg: "bg-violet-100", text: "text-violet-700" },
  seguranca: { label: "Segurança", icon: ShieldAlert, color: "#ef4444", bg: "bg-red-100", text: "text-red-700" },
  outro: { label: "Outro", icon: HelpCircle, color: "#64748b", bg: "bg-slate-100", text: "text-slate-700" },
};

export const STATUS = {
  novo: { label: "Novo", bg: "bg-emerald-100", text: "text-emerald-700" },
  em_analise: { label: "Em análise", bg: "bg-amber-100", text: "text-amber-700" },
  resolvido: { label: "Resolvido", bg: "bg-slate-200", text: "text-slate-600" },
};
