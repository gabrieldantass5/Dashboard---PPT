import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { fetchDashboardData } from '../services/api';

export const Competencies: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData().then(db => {
      setData(db);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { competencyData } = data;
  return (
    <div className="space-y-8 animate-fade-in max-w-[1600px] mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Gestão de Competências e Gaps</h2>
          <p className="text-sm text-slate-500 font-medium">Mapeamento de Lacunas de Conhecimento (CHA) e Planejamento de T&D</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl hover:bg-slate-50 text-sm font-bold transition-all shadow-sm">
            Matriz de Habilidades
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:shadow-lg hover:shadow-blue-500/30 text-sm font-bold transition-all shadow-sm">
            Novo Plano de Capacitação
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Déficit de Qualificação Técnica</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Comparativo Requerido vs. Disponível</p>
            </div>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={competencyData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <YAxis dataKey="skill" type="category" width={140} axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: 'bold' }} />
                <Bar dataKey="available" name="Disponível" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} barSize={20} />
                <Bar dataKey="gap" name="Gap (Déficit)" stackId="a" fill="#f87171" radius={[0, 6, 6, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-8 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Mapa Radar de Prioridades</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Áreas Críticas de Investimento</p>
            </div>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competencyData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} axisLine={false} tick={false} />
                <Radar name="Necessidade" dataKey="required" stroke="#4f46e5" strokeWidth={3} fill="#4f46e5" fillOpacity={0.2} />
                <Radar name="Atual" dataKey="available" stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-800 p-8 rounded-[2rem] shadow-xl shadow-indigo-500/20 text-white group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="p-6 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20 shadow-2xl">
            <div className="text-4xl">🧠</div>
          </div>
          <div className="flex-1">
            <h4 className="text-2xl font-black tracking-tight mb-2">Recomendação Estratégica IA</h4>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed max-w-3xl font-medium">
              Foi identificado um desequilíbrio crítico de <span className="text-white font-black underline decoration-blue-300">55%</span> em competências de <span className="text-white font-bold">Investigação Digital</span> e <span className="text-white font-bold">Cibersegurança</span>.
              O sistema recomenda a liberação de crédito orçamentário extraordinário para licença-capacitação focada em Perícia Digital, conforme diretriz estratégica 2024-2026.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-indigo-700 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg transform hover:-translate-y-1">
                Gerar Plano de T&D
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                Ver Relatório Técnico
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};