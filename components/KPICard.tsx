import React from 'react';
import { KPICardProps } from '../types';

export const KPICard: React.FC<KPICardProps> = ({ title, value, trend, icon: Icon, description, observation }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100/50 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gradient-to-br from-cbmal-50 to-white rounded-xl shadow-sm border border-cbmal-100 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-cbmal-600" />
        </div>
        {trend !== undefined && (
          <span className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-lg shadow-sm border ${trend >= 0
            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
            : 'bg-rose-50 text-rose-600 border-rose-100'
            }`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <h3 className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">{title}</h3>
      <div className="text-3xl font-black text-slate-800 mb-2 tracking-tight group-hover:text-cbmal-700 transition-colors">{value}</div>
      <p className="text-[11px] text-slate-500 mb-4 flex-grow font-medium leading-relaxed">{description}</p>

      {observation && (
        <div className="mt-auto pt-4 border-t border-slate-50">
          <div className="bg-slate-50/80 px-3 py-2 rounded-lg border border-slate-100">
            <p className="text-[10px] text-cbmal-800 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cbmal-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
              {observation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};