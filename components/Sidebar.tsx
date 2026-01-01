import React from 'react';
import { LayoutDashboard, Map, GraduationCap, UserPlus, FileText, Settings, ShieldAlert, LogOut, HelpCircle } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'allocation', label: 'Alocação Estratégica', icon: Map },
    { id: 'competencies', label: 'Gestão de Competências', icon: GraduationCap },
    { id: 'registration', label: 'Cadastro e Lotação', icon: UserPlus },
    { id: 'reports', label: 'Relatórios Gerenciais', icon: FileText },
    { id: 'help', label: 'Ajuda e Suporte', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-ssp-900 via-ssp-800 to-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 shadow-2xl z-50 border-r border-white/5">
      <div className="p-8 flex items-center gap-4 border-b border-white/10 bg-black/10 backdrop-blur-sm">
        <div className="p-2 bg-yellow-400/10 rounded-xl ring-1 ring-yellow-400/30">
          <ShieldAlert className="w-8 h-8 text-yellow-400" />
        </div>
        <div>
          <h1 className="font-bold text-xl leading-tight tracking-tight">SSP-DF</h1>
          <p className="text-[10px] text-blue-300 font-bold uppercase tracking-[0.2em] opacity-80">Gestão de Dados</p>
        </div>
      </div>

      <nav className="flex-1 py-8 overflow-y-auto custom-scrollbar">
        <ul className="space-y-1.5 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {activeTab === item.id && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-blue-300 shadow-[0_0_15px_rgba(147,197,253,0.5)]" />
                )}
                <item.icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`} />
                <span className="font-semibold text-sm tracking-wide">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-white/10 bg-black/10 backdrop-blur-md space-y-3">
        <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-all px-4 py-2.5 w-full rounded-xl hover:bg-white/5 group">
          <Settings className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
          <span className="text-sm font-medium">Configurações</span>
        </button>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 text-red-400 hover:text-white hover:bg-red-500/20 transition-all px-4 py-2.5 w-full rounded-xl group"
        >
          <LogOut className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
          <span className="text-sm font-bold">Encerrar Sessão</span>
        </button>
      </div>
    </aside>
  );
};