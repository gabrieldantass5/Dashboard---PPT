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
    <div className="space-y-6 animate-fade-in">
      {/* Disclaimer Data Source */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 flex items-start gap-3 rounded-r-lg">
        <Database className="w-5 h-5 text-blue-700 mt-0.5" />
        <div>
            <h4 className="text-sm font-bold text-blue-800">Fonte de Dados Integrada</h4>
            <p className="text-xs text-blue-700 mt-1">
                Os indicadores abaixo refletem a consolidação de dados do <strong>Portal da Transparência do DF</strong>, 
                <strong>Anuário Brasileiro de Segurança Pública</strong> e bases internas da SSP-DF. 
                Última sincronização: {new Date().toLocaleDateString('pt-BR')}.
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Efetivo Operacional Mapeado"
          value={stats.totalForce.toLocaleString('pt-BR')}
          trend={-1.2}
          icon={Users}
          description="Soma das forças (Ativos)"
          observation="Dados do Sistema RH (SIGRH)"
        />
        <KPICard
          title="Taxa de Cobertura Regional"
          value={`${stats.coverage}%`}
          trend={stats.coverage < 90 ? -2.5 : 0.5}
          icon={Target}
          description="Efetivo Real vs. Ideal (Média)"
          observation={stats.coverage < 85 ? "Abaixo da Meta (90%)" : "Dentro da Meta"}
        />
        <KPICard
          title="Índice de Especialização"
          value={`${stats.skillCoverage}%`}
          trend={4.1}
          icon={TrendingUp}
          description="Cobertura de Competências Críticas"
          observation="Foco: Crimes Cibernéticos"
        />
        <KPICard
          title="Aposentadorias (2025)"
          value={stats.nextYearRetirement}
          trend={15.0}
          icon={AlertTriangle}
          description="Previsão de vacância imediata"
          observation="Alerta: Plano de Sucessão"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div>
                <h3 className="text-lg font-bold text-slate-800">Projeção de Vacância (Aposentadorias)</h3>
                <p className="text-sm text-slate-500">
                    Análise preditiva baseada no tempo de serviço (Série Histórica e Futura)
                </p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-xs rounded-lg p-2">
                <option>Todas as Forças</option>
                <option>PMDF</option>
                <option>PCDF</option>
            </select>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={retirementData}>
                <defs>
                  <linearGradient id="colorProjection" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  formatter={(value: number) => [`${value} servidores`, 'Previsão']}
                />
                <Area type="monotone" dataKey="projection" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProjection)" name="Aposentadorias Previstas" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Integridade dos Dados (ETL)</h3>
          <div className="space-y-4">
            {[
              { sys: 'Portal Transparência (API)', status: 'Sincronizado', color: 'bg-green-500', time: '10 min atrás' },
              { sys: 'Sinesp (Dados Nacionais)', status: 'Sincronizado', color: 'bg-green-500', time: '1h atrás' },
              { sys: 'SIGRH (GDF)', status: 'Atualizando', color: 'bg-yellow-500', time: 'Processando...' },
              { sys: 'PCDF (Estatística)', status: 'Conectado', color: 'bg-green-500', time: '20 min atrás' },
              { sys: 'PMDF (Almanaque)', status: 'Conectado', color: 'bg-green-500', time: '30 min atrás' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                    <span className="block text-sm font-medium text-slate-700">{item.sys}</span>
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.color} animate-pulse`}></span>
                  <span className="text-xs text-slate-500">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            Ver Log de Execução ETL
          </button>
        </div>
      </div>
    </div>
  );
};