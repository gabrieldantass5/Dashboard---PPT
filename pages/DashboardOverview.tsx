import React, { useState, useEffect } from 'react';
import { Users, Target, TrendingUp, AlertTriangle, Database } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { fetchDashboardData } from '../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const DashboardOverview: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chartFilter, setChartFilter] = useState<'geral' | 'combatentes' | 'saude'>('geral');

  useEffect(() => {
    fetchDashboardData()
      .then(db => {
        setData(db);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cbmal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Sincronizando Inteligência de Dados...</p>
        </div>
      </div>
    );
  }

  const { kpis: stats } = data;

  // Realistic CBMAL historical data simulation
  const getFilteredData = () => {
    return data.retirementData.map((d: any) => {
      if (chartFilter === 'combatentes') {
        return { ...d, projection: Math.round(d.projection * 0.88) }; // ~88% force
      }
      if (chartFilter === 'saude') {
        return { ...d, projection: Math.round(d.projection * 0.12) }; // ~12% specialists
      }
      return d;
    });
  };

  const filteredData = getFilteredData();

  return (
    <div className="space-y-8 animate-fade-in max-w-[1600px] mx-auto pb-12">
      {/* Top Banner / Data Source */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cbmal-600/5 to-fire-orange/5 border border-cbmal-100/50 p-6 rounded-3xl flex items-center justify-between group">
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-cbmal-100 flex items-center justify-center text-cbmal-600">
            <Database className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800 tracking-tight">Inteligência de Dados CBMAL</h4>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Consolidação via BMRH, Fênix, BMSaúde e BMEaD (Padrão NFPA 950).
              Atualizado em: <span className="text-cbmal-600 font-bold">{new Date(data.lastUpdate).toLocaleString('pt-BR')}</span>
            </p>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-2 relative z-10 items-end">
          <button
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                fetchDashboardData().then(db => {
                  setData(db);
                  setLoading(false);
                });
              }, 1000);
            }}
            className="px-3 py-1.5 bg-cbmal-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-cbmal-700 transition-all shadow-md shadow-cbmal-500/20 active:scale-95 flex items-center gap-2"
          >
            <Database className="w-3 h-3" />
            Sincronizar Agora
          </button>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 bg-white border border-cbmal-100 rounded-md text-[9px] font-bold text-cbmal-600 shadow-sm uppercase tracking-wider">Node: Maceió-AL</span>
            <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 rounded-md text-[9px] font-bold text-emerald-600 shadow-sm uppercase tracking-wider flex items-center gap-1">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
              Sistemas Online
            </span>
          </div>
        </div>
        {/* Abstract shape */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-cbmal-500/10 rounded-full blur-3xl group-hover:bg-fire-orange/20 transition-all duration-700"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <KPICard
          title="Efetivo Operacional CBMAL"
          value={stats.totalForce.toLocaleString('pt-BR')}
          trend={-1.2}
          icon={Users}
          description="Bombeiros militares em atividade"
          observation="Necessidade de reforço em Maceió Centro"
        />
        <KPICard
          title="Cobertura Operacional"
          value={`${stats.coverage}%`}
          trend={stats.coverage < 90 ? -2.5 : 0.5}
          icon={Target}
          description="Relacionamento Efetivo Real vs. Demanda"
          observation={stats.coverage < 85 ? "Crítico: Tabuleiro dos Martins" : "Estável: Centro"}
        />
        <KPICard
          title="Prontidão Técnica (NFPA)"
          value={`${stats.skillCoverage}%`}
          trend={4.1}
          icon={TrendingUp}
          description="Conformidade com padrões NFPA 950/WFI"
          observation="Crescimento em APH Avançado"
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
            <div className="p-1 bg-slate-100 rounded-xl flex gap-1">
              <button
                onClick={() => setChartFilter('geral')}
                className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${chartFilter === 'geral' ? 'bg-white shadow-sm text-cbmal-700' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Geral
              </button>
              <button
                onClick={() => setChartFilter('combatentes')}
                className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${chartFilter === 'combatentes' ? 'bg-white shadow-sm text-cbmal-700' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Combatentes
              </button>
              <button
                onClick={() => setChartFilter('saude')}
                className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${chartFilter === 'saude' ? 'bg-white shadow-sm text-cbmal-700' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Saúde/Espec.
              </button>
            </div>
          </div>

          <div className="h-[350px] mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="colorProjection" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
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
                  cursor={{ stroke: '#DC2626', strokeWidth: 2, strokeDasharray: '5 5' }}
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '12px'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#1e293b' }}
                  labelStyle={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}
                  formatter={(value: number) => [`${value} bombeiros`, 'Previsão']}
                />
                <Area
                  type="monotone"
                  dataKey="projection"
                  stroke="#DC2626"
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
              { sys: 'BMRH (Recursos Humanos)', status: 'Ativo', color: 'bg-emerald-500', time: '5 min', icon: '👥' },
              { sys: 'Fênix (Ocorrências)', status: 'Ativo', color: 'bg-emerald-500', time: '12 min', icon: '🚒' },
              { sys: 'BMSaúde (Prontuário)', status: 'Sync', color: 'bg-cbmal-500', time: '72%', icon: '🏥' },
              { sys: 'BMEaD (Capacitação)', status: 'Ativo', color: 'bg-emerald-500', time: '18 min', icon: '📚' },
              { sys: 'BMCorrege (Disciplinar)', status: 'Ativo', color: 'bg-emerald-500', time: '25 min', icon: '⚖️' },
            ].map((item, idx) => (
              <div key={idx} className="group flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-slate-100 border border-transparent rounded-2xl transition-all duration-300">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <span className="block text-[11px] font-black text-slate-700 tracking-tight">{item.sys}</span>
                    <span className="text-[10px] text-slate-400 font-bold">{item.sys === 'BMSaúde (Prontuário)' ? 'Em processamento...' : `${item.time} atrás`}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className={`px-2 py-0.5 rounded-full ${item.color.replace('bg-', 'text-')} bg-white text-[9px] font-black uppercase tracking-tighter border border-slate-100 shadow-sm`}>
                    {item.status}
                  </div>
                  {item.sys === 'BMSaúde (Prontuário)' && (
                    <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-cbmal-500 animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-[11px] font-black uppercase tracking-widest text-cbmal-600 bg-cbmal-50/50 rounded-2xl hover:bg-cbmal-600 hover:text-white transition-all shadow-sm border border-cbmal-100">
            Exportar Log de Auditoria
          </button>
        </div>
      </div>
    </div>
  );
};