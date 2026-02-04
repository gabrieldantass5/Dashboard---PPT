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

import db from '../data/db.json';

export const fetchDashboardData = async (): Promise<DashboardDB> => {
    // Simulando delay de rede para experiência UX realista
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(db as DashboardDB);
        }, 800);
    });
};
