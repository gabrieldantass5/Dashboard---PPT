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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Módulo 2: Alocação Estratégica</h2>
          <p className="text-slate-500">Correlação entre Efetivo Policial e Índices de Criminalidade (CVLI)</p>
        </div>
        <div className="flex flex-wrap gap-2">
            <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2">
                <ArrowDownUp className="w-4 h-4 text-slate-500 mr-2" />
                <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-sm text-slate-700 py-2 outline-none bg-transparent"
                >
                    <option value="crime">Ordenar por Criminalidade</option>
                    <option value="deficit">Ordenar por Déficit de Efetivo</option>
                    <option value="name">Ordenar por Nome (A-Z)</option>
                </select>
            </div>
            <button className="bg-ssp-600 text-white px-4 py-2 rounded-lg hover:bg-ssp-700 text-sm font-medium transition-colors shadow-sm">
                Exportar Relatório
            </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-2">Distribuição de Efetivo vs. Demanda Criminal (Top Regiões)</h3>
        <p className="text-sm text-slate-500 mb-6">
            Visualização das regiões com maior impacto nos indicadores de segurança pública.
        </p>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sortedData} margin={{bottom: 60}}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} tick={{fontSize: 12}} />
              <YAxis yAxisId="left" label={{ value: 'Nº Servidores', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Índice Criminalidade', angle: 90, position: 'insideRight' }} />
              <Tooltip 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
              />
              <Legend verticalAlign="top" height={36}/>
              <Bar yAxisId="left" dataKey="efetivoReal" name="Efetivo Real" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar yAxisId="left" dataKey="efetivoIdeal" name="Efetivo Ideal (Previsto)" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={20} />
              <Line yAxisId="right" type="monotone" dataKey="crimesViolentos" name="Criminalidade (CVLI)" stroke="#ef4444" strokeWidth={3} dot={{r: 3}} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 overflow-y-auto max-h-[400px]">
            <h4 className="font-bold text-slate-800 mb-4 sticky top-0 bg-white pb-2 border-b border-slate-100 z-10">
                Alertas Críticos de Desequilíbrio
            </h4>
            <div className="space-y-3">
                {sortedData.map((region, idx) => {
                    const deficit = region.efetivoIdeal - region.efetivoReal;
                    const crimePressure = region.crimesViolentos > 50;
                    // Lógica de alerta: Déficit alto OU Pressão Criminal Alta com Déficit qualquer
                    const isCritical = (deficit > 50) || (crimePressure && deficit > 0);
                    
                    if (deficit <= 0 && !isCritical) return null;
                    
                    return (
                        <div key={idx} className={`p-4 rounded-lg border-l-4 ${isCritical ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'}`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h5 className="font-bold text-sm text-slate-800">{region.name}</h5>
                                    <p className="text-xs text-slate-600 mt-1">
                                        Déficit: <span className="font-bold">{deficit}</span> | CVLI: <span className="font-bold">{region.crimesViolentos}</span>
                                    </p>
                                </div>
                                <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${isCritical ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                    {isCritical ? 'Alta Prioridade' : 'Atenção'}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
            <div className="p-4 bg-blue-50 rounded-full mb-4">
                <Map className="w-10 h-10 text-ssp-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Sugestão de Redistribuição (Algoritmo)</h4>
            <p className="text-sm text-slate-600 mb-4 max-w-sm">
                O sistema identificou um superávit de efetivo no <strong>Plano Piloto</strong> (+200) e um déficit crítico em <strong>Ceilândia</strong> (-170).
                <br/><br/>
                Recomendação: Transferência temporária de 45 servidores para Operação Integrada.
            </p>
            <button className="text-ssp-600 font-medium text-sm hover:underline border border-ssp-600 px-4 py-2 rounded-lg hover:bg-ssp-50 transition-colors">
                Ver Detalhes da Simulação
            </button>
        </div>
      </div>
    </div>
  );
};