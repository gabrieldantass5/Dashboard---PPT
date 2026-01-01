import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { Map, ArrowDownUp } from 'lucide-react';
import { allocationData } from '../constants';

export const Allocation: React.FC = () => {
  const [sortBy, setSortBy] = useState<'name' | 'deficit' | 'crime'>('crime');

  const sortedData = [...allocationData].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'deficit') {
      const defA = a.efetivoIdeal - a.efetivoReal;
      const defB = b.efetivoIdeal - b.efetivoReal;
      return defB - defA;
    }
    // crime
    return b.crimesViolentos - a.crimesViolentos;
  });

  return (
    <div className="space-y-8 animate-fade-in max-w-[1600px] mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Matriz de Alocação Estratégica</h2>
          <p className="text-sm text-slate-500 font-medium">Correlação em tempo real entre Efetivo Policial e Criminalidade Violentamente Identificada (CVLI)</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group bg-white shadow-sm border border-slate-200 rounded-2xl p-1 pr-3 flex items-center transition-all focus-within:ring-4 focus-within:ring-blue-500/10">
            <div className="p-2 bg-slate-50 rounded-xl mr-2">
              <ArrowDownUp className="w-4 h-4 text-blue-600" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-black text-slate-700 bg-transparent outline-none cursor-pointer uppercase tracking-tight"
            >
              <option value="crime">Criminalidade</option>
              <option value="deficit">Déficit de Efetivo</option>
              <option value="name">Alfabética</option>
            </select>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:shadow-lg hover:shadow-blue-500/30 text-sm font-bold transition-all transform hover:-translate-y-0.5 active:scale-95">
            Exportar Inteligência
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border border-slate-100/50">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Distribuição de Forças vs. Mancha Criminal</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Análise por Região Administrativa (RA)</p>
          </div>
        </div>

        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sortedData} margin={{ bottom: 60, top: 20 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 700 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#ef4444', fontWeight: 700 }}
              />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{
                  borderRadius: '20px',
                  border: 'none',
                  boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
                  padding: '16px'
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '20px', fontSize: '11px', fontWeight: 'bold' }}
              />
              <Bar yAxisId="left" dataKey="efetivoReal" name="Efetivo Real" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={24} />
              <Bar yAxisId="left" dataKey="efetivoIdeal" name="Meta (Ideal)" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={24} />
              <Line yAxisId="right" type="monotone" dataKey="crimesViolentos" name="Taxa de CVLI" stroke="#ef4444" strokeWidth={4} dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col h-[500px]">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-50 sticky top-0 bg-white">
            <div>
              <h4 className="font-black text-slate-800 tracking-tight">Alertas de Desequilíbrio</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Identificação de Gaps Críticos</p>
            </div>
            <div className="px-3 py-1 bg-red-50 rounded-full text-[10px] font-black text-red-600 border border-red-100">Atualizado</div>
          </div>

          <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2">
            {sortedData.map((region, idx) => {
              const deficit = region.efetivoIdeal - region.efetivoReal;
              const crimePressure = region.crimesViolentos > 50;
              const isCritical = (deficit > 50) || (crimePressure && deficit > 0);

              if (deficit <= 0 && !isCritical) return null;

              return (
                <div key={idx} className={`group p-5 rounded-2xl border transition-all duration-300 ${isCritical ? 'bg-red-50/30 border-red-100/50 hover:bg-red-50' : 'bg-amber-50/30 border-amber-100/50 hover:bg-amber-50'}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm border ${isCritical ? 'bg-white text-red-600 border-red-100' : 'bg-white text-amber-600 border-amber-100'}`}>
                        {isCritical ? '🚨' : '⚠️'}
                      </div>
                      <div>
                        <h5 className="font-black text-sm text-slate-800 tracking-tight">{region.name}</h5>
                        <div className="flex gap-4 mt-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Déficit: <span className={isCritical ? 'text-red-600' : 'text-amber-600'}>{deficit}</span></span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Impacto Criminal: <span className="text-slate-800">{region.crimesViolentos}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg font-black text-[9px] uppercase tracking-widest shadow-sm border ${isCritical ? 'bg-red-600 text-white border-red-500' : 'bg-amber-500 text-white border-amber-400'}`}>
                      {isCritical ? 'Crítico' : 'Atenção'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-8 rounded-[2rem] shadow-xl shadow-blue-500/20 flex flex-col items-center text-center text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>

          <div className="p-5 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20 mb-6 shadow-xl relative z-10">
            <Map className="w-12 h-12 text-blue-200" />
          </div>

          <h4 className="font-black text-xl tracking-tight mb-3 relative z-10">Redistribuição Preditiva</h4>
          <p className="text-sm text-blue-100/80 mb-8 font-medium leading-relaxed max-w-xs relative z-10">
            O motor de IA detectou um desvio padrão elevado entre <span className="text-white font-bold">Plano Piloto</span> e <span className="text-white font-bold">Ceilândia</span>.
            <br /><br />
            Otimização sugerida: <span className="bg-white/20 px-2 py-0.5 rounded text-white font-bold tracking-tight">+45 operacionais</span> para equilibrar a carga de trabalho vs. criminalidade.
          </p>

          <div className="mt-auto w-full relative z-10">
            <button className="w-full bg-white text-blue-600 font-black text-xs uppercase tracking-widest py-4 rounded-2xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-white/20 transform hover:-translate-y-1">
              Simular Impacto no KPI
            </button>
            <button className="mt-3 w-full bg-transparent border border-white/30 text-white font-bold text-[10px] uppercase tracking-widest py-3 rounded-2xl hover:bg-white/5 transition-all">
              Aprovar em Conselho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};