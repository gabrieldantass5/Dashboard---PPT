import React from 'react';
import { Shield, Map, GraduationCap, Users, ArrowRight, BarChart3, Lock } from 'lucide-react';

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
            <Shield className="w-8 h-8 text-ssp-700" />
            <div>
              <h1 className="font-bold text-xl leading-none text-ssp-900">SSP-DF</h1>
              <p className="text-xs text-ssp-600 font-medium tracking-wide">GESTÃO ESTRATÉGICA</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#proposta" className="hover:text-ssp-600 transition-colors">A Proposta</a>
            <a href="#modulos" className="hover:text-ssp-600 transition-colors">Módulos</a>
            <a href="#beneficios" className="hover:text-ssp-600 transition-colors">Benefícios</a>
          </nav>
          <button 
            onClick={onEnter}
            className="bg-ssp-700 hover:bg-ssp-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-ssp-900/20 flex items-center gap-2"
          >
            Acessar Sistema <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Business Intelligence Integrado
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Inteligência de Dados para <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ssp-700 to-blue-500">
              Segurança Pública
            </span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Plataforma unificada para gestão do capital humano da SSP-DF. 
            Alocação baseada em evidências, gestão de competências e previsão de cenários futuros em um único dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onEnter}
              className="px-8 py-4 bg-ssp-600 hover:bg-ssp-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all transform hover:-translate-y-1"
            >
              Visualizar Dashboards
            </button>
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
              Saiba Mais
            </button>
          </div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="modulos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Módulos Estratégicos</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A ferramenta consolida dados da PMDF, PCDF, CBMDF e DETRAN-DF para apoiar a tomada de decisão em três pilares fundamentais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Map className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Alocação Inteligente</h3>
              <p className="text-slate-600 leading-relaxed">
                Cruza dados de efetivo real vs. ideal com índices de criminalidade (CVLI) para identificar déficits regionais e sugerir redistribuição.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Gestão de Competências</h3>
              <p className="text-slate-600 leading-relaxed">
                Mapeia lacunas (gaps) de conhecimento crítico, como Perícia Digital e Gestão de Crises, orientando investimentos em capacitação.
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

      {/* Stats Section */}
      <section className="py-20 bg-ssp-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-ssp-800">
            <div className="p-4">
              <div className="text-4xl font-bold text-blue-400 mb-2">28.4k+</div>
              <div className="text-ssp-200 text-sm">Servidores Integrados</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-blue-400 mb-2">5</div>
              <div className="text-ssp-200 text-sm">Fontes de Dados (ETL)</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-blue-400 mb-2">32</div>
              <div className="text-ssp-200 text-sm">Regiões Administrativas</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-ssp-200 text-sm">Atualização em Tempo Real</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-slate-500" />
            <span className="font-semibold text-slate-300">SSP-DF Dashboard Estratégico</span>
          </div>
          <div className="text-sm">
            © 2024 Secretaria de Segurança Pública do Distrito Federal. Todos os direitos reservados.
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