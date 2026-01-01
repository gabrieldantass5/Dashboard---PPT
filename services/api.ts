import { KPICardProps, RegionData, CompetencyGap, RetirementData } from '../types';

interface DashboardDB {
    lastUpdate: string;
    kpis: {
        totalForce: number;
        coverage: number;
        skillCoverage: number;
        nextYearRetirement: number;
    };
    allocationData: RegionData[];
    competencyData: CompetencyGap[];
    retirementData: RetirementData[];
    syncStatus: any[];
}

export const fetchDashboardData = async (): Promise<DashboardDB> => {
    // Em um ambiente real, isso seria um fetch para um endpoint API
    // Aqui estamos simulando o comportamento assíncrono consumindo o arquivo estático
    try {
        const response = await fetch('/data/db.json');
        if (!response.ok) throw new Error('Falha ao carregar dados do banco');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        // Fallback para garantir que o dashboard não quebre durante a migração
        throw error;
    }
};
