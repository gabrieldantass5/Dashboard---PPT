import React, { useState } from 'react';
import { FileText, Download, Clock, CheckCircle, FileSpreadsheet, Loader2, Printer, Filter, Calendar, ChevronDown, Shield } from 'lucide-react';
import { FORCES } from '../constants';

interface ReportLog {
  id: string;
  name: string;
  type: 'PDF' | 'XLSX' | 'CSV';
  date: string;
  size: string;
  status: 'ready' | 'processing' | 'failed';
  author: string;
  force?: string;
}

export const Reports: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const [selectedForce, setSelectedForce] = useState<string>('');

  const [reportHistory, setReportHistory] = useState<ReportLog[]>([
    { id: '1', name: 'Análise de Efetivo CBMAL - Q1 2026', type: 'PDF', date: '04/02/2026 09:30', size: '2.4 MB', status: 'ready', author: 'Sistema', force: 'CBMAL' },
    { id: '2', name: 'Cobertura Operacional vs Demanda Operacional', type: 'XLSX', date: '01/02/2026 14:15', size: '850 KB', status: 'ready', author: 'Gestor CBMAL', force: 'CBMAL' },
    { id: '3', name: 'Previsão de Aposentadorias (Padrão NFPA)', type: 'PDF', date: '25/01/2026 11:00', size: '1.2 MB', status: 'ready', author: 'RH Integrado', force: 'CBMAL' },
    { id: '4', name: 'Auditoria de Competências Técnicas (WFI)', type: 'CSV', date: '15/01/2026 16:45', size: '450 KB', status: 'ready', author: 'Sistema', force: 'CBMAL' },
  ]);

  const templates = [
    {
      id: 'strat',
      title: 'Relatório Executivo CBMAL',
      description: 'Visão consolidada de KPIs, efetivo total e metas de cobertura regional em Alagoas.',
      icon: FileText,
      color: 'bg-cbmal-50 text-cbmal-700',
      formats: ['PDF']
    },
    {
      id: 'oper',
      title: 'Matriz Operacional & Demanda',
      description: 'Dados brutos de ocorrências cruzados com efetivo por Região de Alagoas.',
      icon: FileSpreadsheet,
      color: 'bg-emerald-50 text-emerald-700',
      formats: ['XLSX', 'CSV']
    },
    {
      id: 'hr',
      title: 'Gap Analysis de Competências NFPA',
      description: 'Déficit de habilidades técnicas e plano de sucessão (WFI) do CBMAL.',
      icon: FileText,
      color: 'bg-orange-50 text-orange-700',
      formats: ['PDF', 'XLSX']
    }
  ];

  const handleGenerate = (templateId: string, title: string, format: 'PDF' | 'XLSX' | 'CSV') => {
    setIsGenerating(templateId);

    // Simula o tempo de processamento do backend
    setTimeout(() => {
      const newReport: ReportLog = {
        id: Math.random().toString(36).substr(2, 9),
        name: `${title} - ${new Date().toLocaleDateString()}`,
        type: format,
        date: new Date().toLocaleString(),
        size: format === 'PDF' ? '1.8 MB' : '600 KB',
        status: 'ready',
        author: 'Você',
        force: selectedForce || 'CBMAL'
      };

      setReportHistory([newReport, ...reportHistory]);
      setIsGenerating(null);
    }, 2000);
  };

  const filteredHistory = reportHistory.filter(report =>
    selectedForce ? report.force === selectedForce : true
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Relatórios Gerenciais</h2>
          <p className="text-slate-500">Geração de documentos oficiais e exportação de dados para Business Intelligence.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative flex items-center bg-white border border-slate-300 rounded-lg px-2 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 text-slate-500 mr-2" />
            <select
              value={selectedForce}
              onChange={(e) => setSelectedForce(e.target.value)}
              className="text-sm font-medium text-slate-600 bg-transparent py-2 outline-none cursor-pointer pr-8 appearance-none"
            >
              <option value="">Todas as Forças</option>
              {FORCES.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
            <Calendar className="w-4 h-4" /> Periodo: Out/2024
          </button>
        </div>
      </div>

      {/* Templates Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
            <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <template.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">{template.title}</h3>
            <p className="text-sm text-slate-500 mb-6 min-h-[40px]">{template.description}</p>

            <div className="flex gap-2">
              {template.formats.map(fmt => (
                <button
                  key={fmt}
                  disabled={isGenerating !== null}
                  onClick={() => handleGenerate(template.id, template.title, fmt as any)}
                  className="flex-1 py-2 text-xs font-bold border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating === template.id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    fmt === 'PDF' ? <Printer className="w-3 h-3" /> : <Download className="w-3 h-3" />
                  )}
                  {isGenerating === template.id ? 'Gerando...' : `Gerar ${fmt}`}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-400" />
            Histórico de Downloads Recentes
          </h3>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {filteredHistory.length} documentos arquivados
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                <th className="p-4">Nome do Documento</th>
                <th className="p-4">Força</th>
                <th className="p-4">Formato</th>
                <th className="p-4">Data de Geração</th>
                <th className="p-4">Tamanho</th>
                <th className="p-4">Solicitante</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-700 flex items-center gap-3">
                      <div className={`p-2 rounded ${report.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                        {report.type === 'PDF' ? <FileText className="w-4 h-4" /> : <FileSpreadsheet className="w-4 h-4" />}
                      </div>
                      {report.name}
                    </td>
                    <td className="p-4">
                      {report.force && (
                        <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded flex items-center gap-1 w-fit">
                          <Shield className="w-3 h-3" />
                          {report.force}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded border ${report.type === 'PDF'
                        ? 'bg-red-50 text-red-700 border-red-100'
                        : 'bg-green-50 text-green-700 border-green-100'
                        }`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{report.date}</td>
                    <td className="p-4 text-slate-500">{report.size}</td>
                    <td className="p-4 text-slate-500">{report.author}</td>
                    <td className="p-4 text-center">
                      <button className="p-2 text-cbmal-600 hover:bg-cbmal-50 rounded-lg transition-colors" title="Baixar Arquivo">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 italic">
                    Nenhum relatório encontrado para o filtro selecionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
          <button className="text-sm text-cbmal-600 font-medium hover:underline">
            Ver histórico completo de 2026
          </button>
        </div>
      </div>
    </div>
  );
};