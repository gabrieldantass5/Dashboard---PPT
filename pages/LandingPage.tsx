import React from 'react';
import { Shield, ShieldAlert, Map, GraduationCap, Users, ArrowRight, BarChart3, Lock } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cbmal-50 rounded-xl ring-1 ring-cbmal-100">
              <ShieldAlert className="w-8 h-8 text-cbmal-700" />
            </div>
            <div>
              <h1 className="font-bold text-xl leading-none text-cbmal-900">CBMAL</h1>
              <p className="text-xs text-cbmal-600 font-medium tracking-wide">GESTÃO ESTRATÉGICA</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#proposta" className="hover:text-cbmal-600 transition-colors">A Proposta</a>
            <a href="#modulos" className="hover:text-cbmal-600 transition-colors">Módulos</a>
            <a href="#beneficios" className="hover:text-cbmal-600 transition-colors">Benefícios</a>
          </nav>
          <button
            onClick={onEnter}
            className="bg-cbmal-700 hover:bg-cbmal-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-cbmal-900/20 flex items-center gap-2"
          >
            Acessar Sistema <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="proposta" className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fire-orange/10 border border-fire-orange/20 text-fire-orange text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-cbmal-600 animate-pulse"></span>
            Política de People Analytics & Governança
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            People Analytics & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cbmal-700 to-fire-orange">
              Gestão por Competências
            </span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
            <div className="p-6 bg-white/60 backdrop-blur-md border border-slate-200 rounded-[2rem] shadow-sm text-left hover:shadow-md transition-all group border-b-4 border-b-cbmal-500">
              <div className="w-10 h-10 bg-cbmal-50 rounded-xl flex items-center justify-center mb-3 text-cbmal-600">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider mb-2">Governança & Capital Humano</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">Plataforma unificada para governança de dados e gestão estratégica do capital humano do CBMAL.</p>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-md border border-slate-200 rounded-[2rem] shadow-sm text-left hover:shadow-md transition-all group border-b-4 border-b-fire-orange">
              <div className="w-10 h-10 bg-fire-orange/10 rounded-xl flex items-center justify-center mb-3 text-fire-orange">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider mb-2">Integração Analytics</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">Integração estratégica de efetivo, competências (CHA) e indicadores operacionais em tempo real.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onEnter}
              className="px-8 py-4 bg-cbmal-600 hover:bg-cbmal-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-cbmal-600/20 transition-all transform hover:-translate-y-1"
            >
              Visualizar Dashboards
            </button>
            <button
              onClick={() => document.getElementById('modulos')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm"
            >
              Saiba Mais
            </button>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cbmal-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-fire-orange/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-fire-yellow/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Elegant Section Divider */}
      <div className="relative py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-px w-full bg-slate-100">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cbmal-400/50 to-transparent"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-4 bg-white">
              <div className="w-1.5 h-1.5 rounded-full bg-cbmal-600"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-fire-orange"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-cbmal-600"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section id="modulos" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Módulos Estratégicos</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A ferramenta consolida dados de pessoal e governança do CBMAL para apoiar a tomada de decisão em três pilares fundamentais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-cbmal-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Map className="w-7 h-7 text-cbmal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Alocação Inteligente</h3>
              <p className="text-slate-600 leading-relaxed">
                Cruza dados de efetivo real vs. ideal com a demanda por socorrimento em Alagoas para identificar déficits regionais e sugerir redistribuição.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-fire-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-fire-orange" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Gestão de Competências</h3>
              <p className="text-slate-600 leading-relaxed">
                Mapeia lacunas de conhecimento técnico segundo padrões NFPA 950 e WFI, como APH Avançado e HAZMAT, orientando treinamentos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Planejamento Sucessório</h3>
              <p className="text-slate-600 leading-relaxed">
                Analisa a pirâmide etária e previsões de aposentadoria para garantir a continuidade do serviço e preservar a memória organizacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Benefícios Section */}
      <section id="beneficios" className="py-16 bg-gradient-to-br from-cbmal-900 via-cbmal-950 to-slate-950 text-white relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fire-orange/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-cbmal-800">
            <div className="p-4">
              <div className="text-4xl font-bold text-fire-yellow mb-2">1.2k+</div>
              <div className="text-cbmal-200 text-sm">Bombeiros Integrados</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-fire-yellow mb-2">5</div>
              <div className="text-cbmal-200 text-sm">Fontes de Dados (ETL)</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-fire-yellow mb-2">10</div>
              <div className="text-cbmal-200 text-sm">Regiões Operacionais</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-fire-yellow mb-2">24/7</div>
              <div className="text-cbmal-200 text-sm">Atualização em Tempo Real</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-slate-500" />
            <span className="font-semibold text-slate-300">CBMAL Dashboard Estratégico</span>
          </div>
          <div className="text-sm">
            © 2026 Corpo de Bombeiros Militar de Alagoas. Todos os direitos reservados.
          </div>
          <div className="flex gap-4">
            <Lock className="w-4 h-4" />
            <span className="text-xs">Acesso Restrito - Uso Interno</span>
          </div>
        </div>
      </footer>
    </div>
  );
};