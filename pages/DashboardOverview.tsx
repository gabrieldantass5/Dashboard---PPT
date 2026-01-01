import React, { useMemo } from 'react';
import { Users, Target, TrendingUp, AlertTriangle, Database } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { retirementData, allocationData, competencyData } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const DashboardOverview: React.FC = () => {
  // Cálculos dinâmicos baseados nos dados "Reais" (Mock)
  const stats = useMemo(() => {
    const totalEfetivoReal = allocationData.reduce((acc, curr) => acc + curr.efetivoReal, 0);
    const totalEfetivoIdeal = allocationData.reduce((acc, curr) => acc + curr.efetivoIdeal, 0);
    const coverage = Math.round((totalEfetivoReal / totalEfetivoIdeal) * 100);

    // Simula efetivo total incluindo administrativo não mapeado nas regiões (aprox +15%)
    const totalForce = Math.round(totalEfetivoReal * 1.15);

    const nextYearRetirement = retirementData.find(d => d.year === 2025)?.projection || 0;

    // Cálculo de Capacitação (Simulado com base nos Gaps)
    const totalRequiredSkills = competencyData.reduce((acc, curr) => acc + curr.required, 0);
    const totalAvailableSkills = competencyData.reduce((acc, curr) => acc + curr.available, 0);
    const skillCoverage = Math.round((totalAvailableSkills / totalRequiredSkills) * 100);

    return { totalForce, coverage, nextYearRetirement, skillCoverage };
  }, []);

  return (
    <div className="space-y-8 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* Top Banner / Data Source */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/5 to-indigo-600/5 border border-blue-100/50 p-6 rounded-3xl flex items-center justify-between group">
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-blue-100 flex items-center justify-center text-blue-600">
            <Database className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800 tracking-tight">Cérebro de Dados Integrado (SSP-DF)</h4>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Consolidação inteligente via Portal Transparência, Anuário de Segurança e SIGRH.
              Sincronizado há 14 minutos.
            </p>
          </div>
        </div>
        <div className="hidden md:flex gap-3 relative z-10">
          <span className="px-3 py-1 bg-white border border-blue-100 rounded-full text-[10px] font-bold text-blue-600 shadow-sm uppercase tracking-wider">Node: Brasília-DF</span>
          <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-bold text-emerald-600 shadow-sm uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Sistemas Online
          </span>
        </div>
        {/* Abstract shape */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <KPICard
          title="Efetivo Operacional Total"
          value={stats.totalForce.toLocaleString('pt-BR')}
          trend={-1.2}
          icon={Users}
          description="Contagem ativa em todas as forças de segurança"
          observation="PCDF apresenta maior déficit proporcional"
        />
        <KPICard
          title="Eficiência de Cobertura"
          value={`${stats.coverage}%`}
          trend={stats.coverage < 90 ? -2.5 : 0.5}
          icon={Target}
          description="Relacionamento Efetivo Real vs. Ideal"
          observation={stats.coverage < 85 ? "Crítico: Região Leste" : "Estável: Plano Piloto"}
        />
        <KPICard
          title="Matriz de Especialização"
          value={`${stats.skillCoverage}%`}
          trend={4.1}
          icon={TrendingUp}
          description="Média ponderada de CHA (Conhecimentos)"
          observation="Crescimento em Crimes Cibernéticos"
        />
        <KPICard
          title="Projeção de Vacância"
          value={stats.nextYearRetirement}
          trend={15.0}
          icon={AlertTriangle}
          description="Aposentadorias previstas para o próximo ciclo"
          observation="Necessidade de Novo Concurso"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col h-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">Análise de Vacância Estratégica</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Previsão Temporal 2024 - 2030</p>
            </div>
            <div className="p-1 bg-slate-100 rounded-xl flex">
              <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-[11px] font-bold text-slate-800 transition-all">Geral</button>
              <button className="px-4 py-1.5 text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-all">PMDF</button>
              <button className="px-4 py-1.5 text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-all">PCDF</button>
            </div>
          </div>

          <div className="h-[350px] mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={retirementData}>
                <defs>
                  <linearGradient id="colorProjection" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip
                  cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }}
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}
                  labelStyle={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}
                  formatter={(value: number) => [`${value} servidores`, 'Previsão']}
                />
                <Area
                  type="monotone"
                  dataKey="projection"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorProjection)"
                  name="Aposentadorias"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="mb-6">
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Monitor de Sincronização</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Status Global de ETL</p>
          </div>
          <div className="space-y-4">
            {[
              { sys: 'Portal Transparência (API)', status: 'Ativo', color: 'bg-emerald-500', time: '10 min', icon: '⚡' },
              { sys: 'Sinesp (Dados Nacionais)', status: 'Ativo', color: 'bg-emerald-500', time: '1h', icon: '🌍' },
              { sys: 'SIGRH (GDF)', status: 'Sync', color: 'bg-blue-500', time: '68%', icon: '⚙️' },
              { sys: 'PCDF (Estatística)', status: 'Ativo', color: 'bg-emerald-500', time: '20 min', icon: '🔍' },
              { sys: 'PMDF (Almanaque)', status: 'Ativo', color: 'bg-emerald-500', time: '30 min', icon: '🛡️' },
            ].map((item, idx) => (
              <div key={idx} className="group flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-slate-100 border border-transparent rounded-2xl transition-all duration-300">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <span className="block text-[11px] font-black text-slate-700 tracking-tight">{item.sys}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{item.sys === 'SIGRH (GDF)' ? 'Em processamento...' : `${item.time} atrás`}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className={`px-2 py-0.5 rounded-full ${item.color.replace('bg-', 'text-')} bg-white text-[9px] font-black uppercase tracking-tighter border border-slate-100 shadow-sm`}>
                    {item.status}
                  </div>
                  {item.sys === 'SIGRH (GDF)' && (
                    <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-blue-500 animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-[11px] font-black uppercase tracking-widest text-blue-600 bg-blue-50/50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100">
            Exportar Log de Auditoria
          </button>
        </div>
      </div>
    </div>
  );
};