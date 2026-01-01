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
    <aside className="w-64 bg-ssp-900 text-white flex flex-col h-screen fixed left-0 top-0 shadow-xl z-50">
      <div className="p-6 flex items-center gap-3 border-b border-ssp-800">
        <ShieldAlert className="w-8 h-8 text-yellow-400" />
        <div>
          <h1 className="font-bold text-lg leading-tight">SSP-DF</h1>
          <p className="text-xs text-ssp-100 opacity-80">Gestão Inteligente</p>
        </div>
      </div>

      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-ssp-700 text-white shadow-lg'
                    : 'text-ssp-100 hover:bg-ssp-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-ssp-800 space-y-2">
        <button className="flex items-center gap-3 text-ssp-100 hover:text-white transition-colors px-4 py-2 w-full rounded-lg hover:bg-ssp-800">
          <Settings className="w-5 h-5" />
          <span className="text-sm">Configurações</span>
        </button>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 text-red-200 hover:text-white hover:bg-red-900/50 transition-colors px-4 py-2 w-full rounded-lg"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Sair do Sistema</span>
        </button>
      </div>
    </aside>
  );
};