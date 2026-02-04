import React, { useState } from 'react';
import { UserPlus, Save, AlertCircle } from 'lucide-react';

const Registration: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        matricula: '',
        cargo: '',
        lotacao: '',
        competencias: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulação de validação
        // Feedback de sucesso
        alert("Servidor cadastrado com sucesso!");

        // Limpar formulário
        setFormData({
            name: '',
            matricula: '',
            cargo: '',
            lotacao: '',
            competencias: ''
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">Cadastro e Lotação</h1>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-cbmal-600 text-white rounded-lg hover:bg-cbmal-700 transition-colors">
                        <UserPlus className="h-4 w-4" />
                        Novo Registro
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-6 text-amber-600 bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">
                        Este módulo opera em modo de contingência. Os dados inseridos serão sincronizados com o BMRH na próxima janela de batch.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Nome Completo *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cbmal-500 focus:border-cbmal-500 outline-none transition-all"
                                placeholder="Ex: João da Silva"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Matrícula / ID Funcional *</label>
                            <input
                                type="text"
                                name="matricula"
                                value={formData.matricula}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cbmal-500 focus:border-cbmal-500 outline-none transition-all"
                                placeholder="Ex: 123.456-7"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Cargo / Patente</label>
                            <select
                                name="cargo"
                                value={formData.cargo}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cbmal-500 focus:border-cbmal-500 outline-none transition-all"
                            >
                                <option value="">Selecione...</option>
                                <option value="Soldado">Soldado</option>
                                <option value="Cabo">Cabo</option>
                                <option value="Sargento">Sargento</option>
                                <option value="Subtenente">Subtenente</option>
                                <option value="Oficial Junior">Tenente / Capitão</option>
                                <option value="Oficial Superior">Major / Ten Cel / Cel</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Lotação Atual (Região)</label>
                            <select
                                name="lotacao"
                                value={formData.lotacao}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cbmal-500 focus:border-cbmal-500 outline-none transition-all"
                            >
                                <option value="">Selecione...</option>
                                <option value="Maceió Centro">Maceió Centro</option>
                                <option value="Tabuleiro dos Martins">Tabuleiro dos Martins</option>
                                <option value="Benedito Bentes">Benedito Bentes</option>
                                <option value="Arapiraca">Arapiraca</option>
                                <option value="Palmeira dos Índios">Palmeira dos Índios</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Competências Técnicas (CHA)</label>
                        <textarea
                            name="competencias"
                            value={formData.competencias}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cbmal-500 focus:border-cbmal-500 outline-none transition-all h-24"
                            placeholder="Descreva as competências técnicas e certificações NFPA..."
                        />
                        <p className="text-xs text-slate-500">Separe as competências por vírgula.</p>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                        >
                            <Save className="h-4 w-4" />
                            Salvar Registro
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;
