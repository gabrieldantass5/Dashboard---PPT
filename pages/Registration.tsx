import React, { useState } from 'react';
import { Save, User, Briefcase, MapPin, Award } from 'lucide-react';
import { FORCES, REGIONS } from '../constants';
import { PersonnelForm } from '../types';

export const Registration: React.FC = () => {
  const [formData, setFormData] = useState<PersonnelForm>({
    name: '',
    force: 'PMDF',
    rank: '',
    region: '',
    specialization: ''
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'force' && value === 'DETRAN-DF') {
        setFormData(prev => ({
            ...prev,
            force: value as any,
            rank: 'Agente de Trânsito'
        }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Submitting:", formData);
    setMessage("Cadastro realizado com sucesso! Os dados foram integrados ao Data Warehouse.");
    setTimeout(() => setMessage(null), 5000);
    setFormData({ name: '', force: 'PMDF', rank: '', region: '', specialization: '' });
  };

  const isRankDisabled = formData.force === 'DETRAN-DF';

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Cadastro de Servidor / Competência</h2>
            <p className="text-slate-500">Insira novos dados manuais caso a integração automática não esteja disponível.</p>
        </div>

        {message && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {message}
            </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
                <h3 className="font-bold text-slate-800">Dados Funcionais</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <User className="w-4 h-4" /> Nome Completo
                        </label>
                        <input 
                            type="text" 
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="Ex: João da Silva"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <ShieldIcon className="w-4 h-4" /> Órgão / Força
                        </label>
                        <select 
                            name="force"
                            value={formData.force}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                        >
                            {FORCES.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Briefcase className="w-4 h-4" /> Cargo / Patente
                        </label>
                        <input 
                            type="text" 
                            name="rank"
                            required
                            value={formData.rank}
                            onChange={handleChange}
                            disabled={isRankDisabled}
                            className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${isRankDisabled ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''}`}
                            placeholder="Ex: Agente, Soldado, Perito..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Lotação (Região)
                        </label>
                        <select 
                            name="region"
                            required
                            value={formData.region}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                        >
                            <option value="">Selecione uma região</option>
                            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <Award className="w-4 h-4" /> Especializações / Competências (CHA)
                        </label>
                        <input 
                            type="text" 
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Ex: Perícia Digital, Pilotagem de Drone, Negociação de Reféns..."
                        />
                        <p className="text-xs text-slate-500">Separe múltiplas competências por vírgula.</p>
                    </div>
                </div>

                <div className="pt-6 flex justify-end gap-3">
                    <button type="button" className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors">
                        Cancelar
                    </button>
                    <button type="submit" className="px-6 py-2 bg-ssp-600 text-white rounded-lg hover:bg-ssp-700 font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
                        <Save className="w-4 h-4" />
                        Salvar Registro
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

const ShieldIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);