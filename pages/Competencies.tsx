import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { competencyData } from '../constants';

export const Competencies: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Módulo 3: Gestão de Competências</h2>
          <p className="text-slate-500">Mapeamento de Lacunas (Gaps) e Planejamento de T&D</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Análise de Gaps (Lacunas de Capacitação)</h3>
            <p className="text-sm text-slate-500 mb-4">Comparativo entre competências requeridas vs. existentes na corporação.</p>
            <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={competencyData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="skill" type="category" width={120} tick={{fontSize: 12}} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Legend />
                        <Bar dataKey="available" name="Disponível" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="gap" name="Gap (Déficit)" stackId="a" fill="#f87171" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Radar de Prioridades de Treinamento</h3>
             <p className="text-sm text-slate-500 mb-4">Áreas críticas que necessitam de investimento imediato.</p>
             <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competencyData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} />
                        <Radar name="Necessidade" dataKey="required" stroke="#1e40af" fill="#3b82f6" fillOpacity={0.4} />
                        <Radar name="Atual" dataKey="available" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                        <Legend />
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
             </div>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
        <h4 className="text-indigo-900 font-bold mb-2">Recomendação Estratégica (Baseada no PDF)</h4>
        <p className="text-indigo-800 text-sm mb-4">
            Foi identificado um déficit crítico de <strong>55%</strong> em <strong>Perícia Digital</strong> e <strong>Cibersegurança</strong>. 
            Recomenda-se a abertura imediata de edital de licença-capacitação focado nestes temas para a PCDF, conforme a Tabela 2 do relatório técnico.
        </p>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
            Gerar Plano de Curso
        </button>
      </div>
    </div>
  );
};