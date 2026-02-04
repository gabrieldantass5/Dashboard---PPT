import { RegionData, CompetencyGap, RetirementData } from './types';

// Module 2 Data: Allocation vs Incident Demand
// Dados baseados em estimativas de densidade populacional e demanda operacional de Alagoas
export const allocationData: RegionData[] = [
  { name: 'Maceió Centro', efetivoReal: 180, efetivoIdeal: 220, crimesViolentos: 85 },
  { name: 'Tabuleiro dos Martins', efetivoReal: 95, efetivoIdeal: 140, crimesViolentos: 62 },
  { name: 'Benedito Bentes', efetivoReal: 70, efetivoIdeal: 110, crimesViolentos: 48 },
  { name: 'Cidade Universitária', efetivoReal: 85, efetivoIdeal: 90, crimesViolentos: 22 },
  { name: 'Arapiraca', efetivoReal: 120, efetivoIdeal: 130, crimesViolentos: 38 },
  { name: 'Palmeira dos Índios', efetivoReal: 55, efetivoIdeal: 70, crimesViolentos: 18 },
  { name: 'União dos Palmares', efetivoReal: 48, efetivoIdeal: 65, crimesViolentos: 15 },
  { name: 'Penedo', efetivoReal: 42, efetivoIdeal: 55, crimesViolentos: 12 },
  { name: 'Rio Largo', efetivoReal: 38, efetivoIdeal: 50, crimesViolentos: 14 },
  { name: 'Delmiro Gouveia', efetivoReal: 35, efetivoIdeal: 45, crimesViolentos: 10 },
];

// Module 3 Data: Competency Gaps (NFPA 950 Aligned)
// Baseado em padrões NFPA e necessidades de bombeiros militares
export const competencyData: CompetencyGap[] = [
  { skill: 'APH Avançado (NFPA 1001)', required: 280, available: 165, gap: 115 },
  { skill: 'Mergulho de Resgate', required: 45, available: 28, gap: 17 },
  { skill: 'Pilotagem de Aeronaves', required: 18, available: 12, gap: 6 },
  { skill: 'Combate a Incêndio Florestal', required: 220, available: 180, gap: 40 },
  { skill: 'Produtos Perigosos (HAZMAT)', required: 150, available: 95, gap: 55 },
  { skill: 'Resgate em Altura', required: 180, available: 140, gap: 40 },
  { skill: 'Comando de Incidente (ICS)', required: 95, available: 62, gap: 33 },
];

// Module 4 Data: Organizational Memory / Retirement Forecast
// Projeção típica de ciclo de concursos CBMAL
export const retirementData: RetirementData[] = [
  { year: 2024, projection: 85 },
  { year: 2025, projection: 110 },
  { year: 2026, projection: 145 }, // Pico previsto
  { year: 2027, projection: 120 },
  { year: 2028, projection: 95 },
  { year: 2029, projection: 78 },
  { year: 2030, projection: 65 },
];

export const FORCES = ['CBMAL'];
export const REGIONS = allocationData.map(r => r.name).sort();