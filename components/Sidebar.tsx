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
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'help', label: 'Ajuda e Suporte', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-cbmal-900 via-cbmal-800 to-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 shadow-2xl z-50 border-r border-white/5">
      <div className="p-8 flex items-center gap-4 border-b border-white/10 bg-black/10 backdrop-blur-sm">
        <div className="p-2 bg-fire-orange/10 rounded-xl ring-1 ring-fire-orange/30">
          <ShieldAlert className="w-8 h-8 text-fire-orange" />
        </div>
        <div>
          <h1 className="font-bold text-xl leading-tight tracking-tight">CBMAL</h1>
          <p className="text-[10px] text-fire-yellow font-bold uppercase tracking-[0.2em] opacity-80">Gestão de Dados</p>
        </div>
      </div>

      <nav className="flex-1 py-8 overflow-y-auto custom-scrollbar flex flex-col">
        <ul className="space-y-1.5 px-4 mb-auto">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden text-left ${activeTab === item.id
                  ? 'bg-gradient-to-r from-cbmal-600 to-fire-orange text-white shadow-lg shadow-cbmal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {activeTab === item.id && (
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-fire-yellow shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                )}
                <div className="flex-shrink-0">
                  <item.icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110 opacity-70 group-hover:opacity-100'}`} />
                </div>
                <span className="font-semibold text-sm tracking-wide leading-tight">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="p-6 border-t border-white/10 bg-black/10 backdrop-blur-md">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 text-red-400 hover:text-white hover:bg-red-500/20 transition-all px-4 py-3 w-full rounded-xl group"
          >
            <LogOut className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="text-sm font-black uppercase tracking-wider">Encerrar Sessão</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};