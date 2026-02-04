import React from 'react';

export type ForceType = 'PMDF' | 'PCDF' | 'CBMDF' | 'DETRAN-DF' | 'SSP-DF';

export interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ElementType;
  description: string;
  observation?: string;
}

export interface RegionData {
  name: string;
  efetivoReal: number;
  efetivoIdeal: number;
  crimesViolentos: number; // CVLI
}

export interface CompetencyGap {
  skill: string;
  required: number;
  available: number;
  gap: number;
}

export interface RetirementData {
  year: string | number;
  projection: number;
}

export interface PersonnelForm {
  name: string;
  force: ForceType;
  rank: string;
  region: string;
  specialization: string;
}