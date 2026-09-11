import React from "react";
import { CATEGORIES, STATUS } from "@/lib/categories";
import { MapPin } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function ReportCard({ report }) {
  const cat = CATEGORIES[report.category] || CATEGORIES.outro;
  const st = STATUS[report.status] || STATUS.novo;
  const Icon = cat.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <span className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${cat.bg}`}>
          <Icon className={`w-5 h-5 ${cat.text}`} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-slate-800">{cat.label}</p>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${st.bg} ${st.text}`}>{st.label}</span>
          </div>
          <p className="text-slate-600 text-sm mt-1.5 line-clamp-3">{report.description}</p>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-3">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{report.street}</span>
            <span className="mx-1">•</span>
            <span className="whitespace-nowrap">{format(new Date(report.created_date), "d 'de' MMM", { locale: ptBR })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
