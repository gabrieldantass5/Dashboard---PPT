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
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4 w-96">
             <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Buscar servidor, unidade ou competência..." 
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
             </div>
          </div>
          
          <div className="flex items-center gap-6">
             <button className="relative text-slate-500 hover:text-ssp-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
             </button>
             <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-slate-800">Gestor SSP</p>
                    <p className="text-xs text-slate-500">Administrador</p>
                </div>
                <div className="w-10 h-10 bg-ssp-100 rounded-full flex items-center justify-center text-ssp-700 font-bold border-2 border-white shadow-sm ring-1 ring-slate-100">
                    <User className="w-5 h-5" />
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