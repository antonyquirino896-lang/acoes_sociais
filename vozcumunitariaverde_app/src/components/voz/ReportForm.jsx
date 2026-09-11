import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CATEGORIES } from "@/lib/categories";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

export default function ReportForm({ onSubmitted }) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setCategory(""); setDescription(""); setStreet(""); setReporterName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !description || !street) return;
    setSubmitting(true);
    await base44.entities.Report.create({
      category, description, street,
      reporter_name: reporterName || undefined,
    });
    setSubmitting(false);
    setDone(true);
    reset();
    onSubmitted && onSubmitted();
    setTimeout(() => setDone(false), 3500);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16 px-6"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-9 h-9 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800">Relato enviado!</h3>
        <p className="text-slate-500 mt-2 max-w-sm">Obrigado por contribuir com o Cidade Verde. Sua voz ajuda a construir soluções.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label className="text-slate-700 font-medium mb-3 block">Qual o problema?</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const Icon = cat.icon;
            const active = category === key;
            return (
              <button
                type="button" key={key} onClick={() => setCategory(key)}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
                  active ? "border-emerald-500 bg-emerald-50 shadow-sm ring-1 ring-emerald-500" : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.bg}`}>
                  <Icon className={`w-5 h-5 ${cat.text}`} />
                </span>
                <span className="text-xs font-medium text-slate-600 text-center leading-tight">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label htmlFor="street" className="text-slate-700 font-medium">Localização (rua ou ponto de referência)</Label>
        <Input id="street" value={street} onChange={(e) => setStreet(e.target.value)}
          placeholder="Ex: Rua das Palmeiras, próximo à praça" className="mt-2 rounded-xl h-11" />
      </div>

      <div>
        <Label htmlFor="desc" className="text-slate-700 font-medium">Descreva o problema</Label>
        <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)}
          placeholder="Conte brevemente o que está acontecendo..." className="mt-2 rounded-xl min-h-[110px]" />
      </div>

      <div>
        <Label htmlFor="name" className="text-slate-700 font-medium">Seu nome <span className="text-slate-400 font-normal">(opcional)</span></Label>
        <Input id="name" value={reporterName} onChange={(e) => setReporterName(e.target.value)}
          placeholder="Como você quer ser identificado" className="mt-2 rounded-xl h-11" />
      </div>

      <Button type="submit" disabled={submitting || !category || !description || !street}
        className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-base font-medium">
        {submitting ? "Enviando..." : <><Send className="w-4 h-4 mr-2" /> Enviar relato</>}
      </Button>
    </form>
  );
}
