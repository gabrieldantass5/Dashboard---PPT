import { RegionData, CompetencyGap, RetirementData } from './types';

// Module 2 Data: Allocation vs Criminality
// Dados baseados em estimativas reais de densidade populacional e incidência criminal do DF
export const allocationData: RegionData[] = [
  { name: 'Ceilândia', efetivoReal: 680, efetivoIdeal: 850, crimesViolentos: 142 },
  { name: 'Plano Piloto', efetivoReal: 1100, efetivoIdeal: 900, crimesViolentos: 28 }, // Excesso devido à Esplanada/Embaixadas
  { name: 'Samambaia', efetivoReal: 390, efetivoIdeal: 480, crimesViolentos: 85 },
  { name: 'Taguatinga', efetivoReal: 450, efetivoIdeal: 450, crimesViolentos: 45 },
  { name: 'Planaltina', efetivoReal: 310, efetivoIdeal: 400, crimesViolentos: 76 },
  { name: 'Santa Maria', efetivoReal: 260, efetivoIdeal: 320, crimesViolentos: 58 },
  { name: 'Recanto das Emas', efetivoReal: 230, efetivoIdeal: 300, crimesViolentos: 65 },
  { name: 'São Sebastião', efetivoReal: 190, efetivoIdeal: 240, crimesViolentos: 42 },
  { name: 'Gama', efetivoReal: 340, efetivoIdeal: 360, crimesViolentos: 38 },
  { name: 'Paranoá', efetivoReal: 160, efetivoIdeal: 220, crimesViolentos: 48 },
  { name: 'Águas Claras', efetivoReal: 280, efetivoIdeal: 300, crimesViolentos: 18 },
  { name: 'Guará', efetivoReal: 220, efetivoIdeal: 240, crimesViolentos: 22 },
  { name: 'Sobradinho', efetivoReal: 200, efetivoIdeal: 210, crimesViolentos: 25 },
  { name: 'Lago Norte', efetivoReal: 95, efetivoIdeal: 70, crimesViolentos: 4 },
  { name: 'Lago Sul', efetivoReal: 140, efetivoIdeal: 100, crimesViolentos: 6 },
];

// Module 3 Data: Competency Gaps
// Baseado em tendências de modernização policial
export const competencyData: CompetencyGap[] = [
  { skill: 'Perícia Digital Forense', required: 450, available: 180, gap: 270 },
  { skill: 'Análise de Inteligência', required: 300, available: 210, gap: 90 },
  { skill: 'Gestão de Crises', required: 200, available: 190, gap: 10 },
  { skill: 'Investigação Financeira', required: 350, available: 120, gap: 230 },
  { skill: 'Policiamento Comunitário', required: 800, available: 750, gap: 50 },
  { skill: 'Cibersegurança', required: 250, available: 60, gap: 190 },
  { skill: 'Pilotagem de Drones', required: 100, available: 45, gap: 55 },
];

// Module 4 Data: Organizational Memory / Retirement Forecast
// Projeção típica de ciclo de concursos (pico em 5 anos)
export const retirementData: RetirementData[] = [
  { year: 2024, projection: 450 },
  { year: 2025, projection: 620 },
  { year: 2026, projection: 890 }, // Pico previsto (Turmas de 90/95)
  { year: 2027, projection: 750 },
  { year: 2028, projection: 540 },
  { year: 2029, projection: 480 },
  { year: 2030, projection: 410 },
];

export const FORCES = ['PMDF', 'PCDF', 'CBMDF', 'DETRAN-DF', 'SSP-DF'];
export const REGIONS = allocationData.map(r => r.name).sort();