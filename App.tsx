import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './pages/DashboardOverview';
import { Allocation } from './pages/Allocation';
import { Competencies } from './pages/Competencies';
import { Registration } from './pages/Registration';
import { Reports } from './pages/Reports';
import { LandingPage } from './pages/LandingPage';
import { Help } from './pages/Help';
import { Bell, Search, User } from 'lucide-react';

const App: React.FC = () => {
  const [inSystem, setInSystem] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview />;
      case 'allocation': return <Allocation />;
      case 'competencies': return <Competencies />;
      case 'registration': return <Registration />;
      case 'reports': return <Reports />;
      case 'help': return <Help />;
      default: return <div className="flex items-center justify-center h-full text-slate-400">Módulo em desenvolvimento</div>;
    }
  };

  if (!inSystem) {
    return <LandingPage onEnter={() => setInSystem(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800 animate-fade-in">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={() => setInSystem(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-6 w-full max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Pesquisar inteligência de dados, servidores ou unidades..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-100/50 border border-slate-200/80 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500/50 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="relative p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-sm ring-1 ring-red-400"></span>
              </button>
              <div className="w-px h-6 bg-slate-200 mx-2"></div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer p-1 pr-3 rounded-2xl hover:bg-slate-50 transition-all">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-black text-slate-800 tracking-tight leading-none mb-1">Gestor SSP</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Administrador Sênior</p>
              </div>
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 overflow-hidden ring-2 ring-white">
                  <User className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;