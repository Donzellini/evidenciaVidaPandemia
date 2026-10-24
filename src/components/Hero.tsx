import React from 'react';
import { ArrowRight, Activity, ShieldCheck, HeartPulse, DollarSign } from 'lucide-react';

interface HeroProps {
  onExploreModels: () => void;
  onExploreData: () => void;
  onPlayGame: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreModels, onExploreData, onPlayGame }) => {
  return (
    <section className="bg-white border-b border-slate-200 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Subtitle & Main Title */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3 tracking-wide uppercase">
            <span>Evidência Epidemiológica</span>
            <span aria-hidden="true">·</span>
            <span>Estudos The Lancet & Royal Society</span>
            <span aria-hidden="true">·</span>
            <span>Microdados SI-PNI & SIVEP-Gripe</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight" style={{ textWrap: 'balance' }}>
            A Ciência da Vacinação no Brasil: O que os Modelos Matemáticos Realmente Comprovam
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Como os cientistas calculam vidas salvas? O que é uma análise contrafactual? 
            Com base em três estudos de referência internacional e 25 investigações jornalísticas, 
            dismistificamos as ferramentas que salvaram mais de 303 mil vidas e contrastamos as evidências 
            com as ações políticas durante a pandemia.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreModels}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors inline-flex items-center gap-2"
            >
              <span>Entenda os Modelos Epidemiológicos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreData}
              className="px-5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <span>Ver Dados por Estado (27 UFs)</span>
            </button>
            <button
              onClick={onPlayGame}
              className="px-5 py-2.5 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Jogar: O Epidemiologista</span>
            </button>
          </div>
        </div>

        {/* 4-Column KPI Strip - Peer-reviewed metrics from attached articles */}
        <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs uppercase font-medium tracking-wider">Óbitos Evitados (1º Ano)</span>
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tabular-nums">
              303.129
            </div>
            <div className="mt-1 text-xs text-slate-500">
              IC 95%: 284k – 321k vidas salvas no Brasil (The Lancet 2023)
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs uppercase font-medium tracking-wider">Casos Graves Evitados</span>
              <HeartPulse className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tabular-nums">
              875.846
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Redução de 74% no colapso de leitos hospitalares (Santos et al.)
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs uppercase font-medium tracking-wider">Idosos Salvos (&ge;60 anos)</span>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tabular-nums">
              187.890
            </div>
            <div className="mt-1 text-xs text-slate-500">
              61% de todos os óbitos poupados foram de pessoas idosas
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs uppercase font-medium tracking-wider">Economia Hospitalar Direta</span>
              <DollarSign className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tabular-nums">
              US$ 2,0 Bi
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Valor poupado em leitos de UTI pagou toda a compra de vacinas
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
