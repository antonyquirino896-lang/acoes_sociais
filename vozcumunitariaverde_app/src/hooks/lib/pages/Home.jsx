import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import ReportForm from "@/components/voz/ReportForm";
import ReportCard from "@/components/voz/ReportCard";
import { motion } from "framer-motion";

export default function Home() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await base44.entities.Report.list("-created_date", 12);
    setReports(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4">Mapeamento Participativo</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">Sua voz transforma o bairro</h1>
        <p className="text-slate-500 mt-3 text-lg">Relate os problemas do Cidade Verde. Juntos, identificamos o que precisa de solução.</p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Novo relato</h2>
            <ReportForm onSubmitted={load} />
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Relatos recentes</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-7 h-7 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin" />
            </div>
          ) : reports.length === 0 ? (
            <p className="text-slate-400 text-sm bg-white rounded-2xl border border-slate-100 p-6 text-center">Ainda não há relatos. Seja o primeiro!</p>
          ) : (
            <div className="space-y-3">
              {reports.map((r) => <ReportCard key={r.id} report={r} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
