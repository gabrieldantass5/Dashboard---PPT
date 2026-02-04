import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Map, GraduationCap, LayoutDashboard, UserPlus } from 'lucide-react';

export const Help: React.FC = () => {
  const faqs = [
    {
      id: 'overview',
      question: 'Como interpretar a Visão Geral?',
      answer: 'A tela de Visão Geral apresenta os principais indicadores de desempenho (KPIs) de todas as forças integradas. Você encontrará o efetivo total, taxa de cobertura, índice de capacitação e previsões de aposentadoria. O gráfico de área mostra a projeção de aposentadorias para os próximos anos, auxiliando no planejamento de concursos.',
      icon: LayoutDashboard
    },
    {
      id: 'allocation',
      question: 'Como funciona a Alocação Estratégica?',
      answer: 'Este módulo cruza dados do efetivo real disponível em cada Região Administrativa com o efetivo ideal previsto e os índices de crimes violentos (CVLI). O objetivo é identificar desequilíbrios. Áreas com barras azuis baixas (pouco efetivo) e linha vermelha alta (muito crime) indicam necessidade urgente de reforço.',
      icon: Map
    },
    {
      id: 'competencies',
      question: 'O que é a Gestão de Competências?',
      answer: 'Este painel mapeia as habilidades técnicas (Hard Skills) críticas para a corporação. O gráfico de barras mostra o déficit (Gap) entre a quantidade de profissionais necessários e os disponíveis. O gráfico de radar ajuda a visualizar quais áreas precisam de investimento prioritário em treinamento.',
      icon: GraduationCap
    },
    {
      id: 'registration',
      question: 'Para que serve o Cadastro Manual?',
      answer: 'Embora a maioria dos dados venha automaticamente dos sistemas de RH via ETL, o módulo de cadastro permite a inserção manual de servidores ou competências específicas que ainda não foram digitalizadas ou integradas, garantindo que o dashboard reflita a realidade o mais rápido possível.',
      icon: UserPlus
    }
  ];

  const [openId, setOpenId] = useState<string | null>('overview');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <HelpCircle className="w-8 h-8 text-cbmal-600" />
          Central de Ajuda e FAQ
        </h2>
        <p className="text-slate-500">
          Entenda como utilizar as ferramentas de inteligência do CBMAL Strategic Dashboard (Padrão NFPA 950).
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {faqs.map((faq) => (
          <div key={faq.id} className="border-b border-slate-100 last:border-0">
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${openId === faq.id ? 'bg-cbmal-100 text-cbmal-700' : 'bg-slate-100 text-slate-500'}`}>
                  <faq.icon className="w-5 h-5" />
                </div>
                <span className={`font-medium ${openId === faq.id ? 'text-cbmal-900' : 'text-slate-700'}`}>
                  {faq.question}
                </span>
              </div>
              {openId === faq.id ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>
            {openId === faq.id && (
              <div className="px-6 py-4 pl-[4.5rem] bg-slate-50 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                {faq.id === 'allocation' ?
                  'Este módulo cruza dados do efetivo real disponível em cada Região de Alagoas com o efetivo ideal previsto baseado em demanda operacional. O objetivo é identificar desequilíbrios. Áreas com barras vermelhas baixas (pouco efetivo) e linha laranja alta (muita demanda) indicam necessidade urgente de reforço.' :
                  faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-cbmal-50 border border-cbmal-100 p-6 rounded-xl">
          <h3 className="font-bold text-cbmal-900 mb-2">Suporte Técnico</h3>
          <p className="text-sm text-cbmal-800 mb-4">
            Encontrou algum erro nos dados ou no sistema? Entre em contato com a equipe de TI do CBMAL.
          </p>
          <button className="text-sm font-medium text-cbmal-700 hover:text-cbmal-900 underline">
            Abrir chamado técnico &rarr;
          </button>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl">
          <h3 className="font-bold text-emerald-900 mb-2">Documentação Completa</h3>
          <p className="text-sm text-emerald-800 mb-4">
            Acesse o manual em PDF detalhado sobre a metodologia aplicada neste dashboard.
          </p>
          <button className="text-sm font-medium text-emerald-700 hover:text-emerald-900 underline">
            Download PDF (v1.2) &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};