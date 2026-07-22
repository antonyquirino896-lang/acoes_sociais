import React, { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { CATEGORIES, STATUS } from "@/lib/categories";
import StatCard from "@/components/voz/StatCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { FileText, AlertTriangle, CheckCircle2, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Painel() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await base44.entities.Report.list("-created_date", 500);
    setReports(data);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await base44.entities.Report.update(id, { status });
    load();
  };

  const byCategory = useMemo(() => {
    return Object.entries(CATEGORIES).map(([key, cat]) => ({
      name: cat.label, short: cat.label.split(" ")[0], value: reports.filter((r) => r.category === key).length, color: cat.color,
    })).filter((d) => d.value > 0);
  }, [reports]);

  const byStreet = useMemo(() => {
    const map = {};
    reports.forEach((r) => { const s = r.street.trim(); map[s] = (map[s] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 6);
  }, [reports]);

  const resolved = reports.filter((r) => r.status === "resolvido").length;
  const open = reports.length - resolved;

  if (loading) {
    return <div className="flex justify-center py-24"><div className="w-8 h-8 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Painel do Administrador</h1>
      <p className="text-slate-500 mt-1">Visão geral dos relatos da comunidade Cidade Verde.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <StatCard label="Total de relatos" value={reports.length} icon={FileText} accent="text-emerald-600" bg="bg-emerald-100" />
        <StatCard label="Em aberto" value={open} icon={AlertTriangle} accent="text-amber-600" bg="bg-amber-100" />
        <StatCard label="Resolvidos" value={resolved} icon={CheckCircle2} accent="text-slate-600" bg="bg-slate-200" />
        <StatCard label="Ruas afetadas" value={new Set(reports.map((r) => r.street.trim())).size} icon={MapPin} accent="text-sky-600" bg="bg-sky-100" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Problemas por categoria</h3>
          {byCategory.length === 0 ? <Empty /> : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(e) => e.value}>
                  {byCategory.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            {byCategory.map((d, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="w-3 h-3 rounded-full" style={{ background: d.color }} /> {d.name}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Ruas mais afetadas</h3>
          {byStreet.length === 0 ? <Empty /> : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={byStreet} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#059669" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 mt-6 overflow-hidden">
        <h3 className="font-semibold text-slate-800 p-6 pb-4">Todos os relatos</h3>
        <div className="divide-y divide-slate-100">
          {reports.length === 0 ? <div className="p-6"><Empty /></div> : reports.map((r) => {
            const cat = CATEGORIES[r.category] || CATEGORIES.outro;
            const Icon = cat.icon;
            return (
              <div key={r.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50">
                <span className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${cat.bg}`}>
                  <Icon className={`w-5 h-5 ${cat.text}`} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 text-sm truncate">{cat.label}</p>
                  <p className="text-slate-500 text-xs truncate">{r.description}</p>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-1">
                    <MapPin className="w-3 h-3" /> {r.street}
                    <span className="mx-1">•</span>
                    {format(new Date(r.created_date), "d MMM", { locale: ptBR })}
                  </div>
                </div>
                <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                  <SelectTrigger className="w-36 h-9 rounded-lg text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUS).map(([k, s]) => <SelectItem key={k} value={k}>{s.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Empty() {
  return <p className="text-slate-400 text-sm text-center py-10">Sem dados suficientes ainda.</p>;
}
