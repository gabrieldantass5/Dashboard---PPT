import React from 'react';
import { KPICardProps } from '../types';

export const KPICard: React.FC<KPICardProps> = ({ title, value, trend, icon: Icon, description, observation }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-ssp-50 rounded-lg">
          <Icon className="w-6 h-6 text-ssp-600" />
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <div className="text-2xl font-bold text-slate-800 mb-2">{value}</div>
      <p className="text-xs text-slate-400 mb-2 flex-grow">{description}</p>
      
      {observation && (
        <div className="mt-3 pt-3 border-t border-slate-100">
           <p className="text-xs text-ssp-700 font-medium flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-ssp-500"></span>
             {observation}
           </p>
        </div>
      )}
    </div>
  );
};