export interface ScientificArticle {
  id: string;
  title: string;
  journal: string;
  year: number;
  authors: string[];
  institutions: string[];
  pdfPath: string;
  summary: string;
  demystification: {
    question: string;
    laymanAnswer: string;
    mathematicalMethod: string;
    whyItMatters: string;
  };
  keyMetrics: {
    label: string;
    value: string;
    ci95?: string;
    detail: string;
  }[];
  counterfactualInsights: string[];
}

export interface StateData {
  uf: string;
  name: string;
  region: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';
  population: number;
  avertedSevereCases: number;
  avertedDeaths: number;
  avertedCasesFullyVac: number;
  avertedDeathsFullyVac: number;
  avertedCasesBoosted: number;
  avertedDeathsBoosted: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  category: 'vacinas' | 'corrupcao' | 'desinformacao' | 'impacto-social';
  summary: string;
  governmentAction: string;
  scientificContradiction: string;
  keyQuote?: string;
  speaker?: string;
  pdfPath: string;
  tags: string[];
}

export interface SimulationParams {
  daysShift: number; // -60 (early) to +30 (late)
  dailyRate: number; // 0.2% to 1.0% per day
  secondDoseDrop: number; // 0% to 30% dropout
  firstDoseEfficacyDrop: number; // 25% or 50%
  baselineVaccineEfficacy: number; // 75%
}
