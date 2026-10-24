import React from 'react';
import { ArrowRight, Activity, ShieldCheck, HeartPulse, DollarSign, Compass, BarChart2, ShieldAlert, Cpu, Gamepad2, FileText } from 'lucide-react';

interface HeroProps {
  onNavigate: (tab: string) => void;
  onOpenLibrary: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenLibrary }) => {
  return (
    <div className="py-10 md:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Header / Intro text */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-3">
            <span>Portal de Divulgação Científica</span>
            <span aria-hidden="true">·</span>
            <span>Estudos The Lancet & Royal Society</span>
            <span aria-hidden="true">·</span>
            <span>28 Documentos em Anexo</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight" style={{ textWrap: 'balance' }}>
            A Ciência da Vacinação no Brasil: O que os Modelos Matemáticos Comprovam
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Como os cientistas calculam vidas salvas se essas mortes não aconteceram? 
            O que é um modelo contrafactual? Nesta plataforma interativa, <strong>dismistificamos os modelos epidemiológicos para o público em geral</strong>, 
            apresentamos os dados reais das 27 UFs e <strong>confrontamos as evidências científicas com as decisões políticas</strong> 
            adotadas durante a pandemia no Brasil.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('modelos')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors inline-flex items-center gap-2"
            >
              <span>Dismistificar os Modelos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('simulador')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>Abrir Simulador de Cenários</span>
            </button>
            <button
              onClick={() => onNavigate('jogo')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4 text-emerald-600" />
              <span>Jogar: O Epidemiologista</span>
            </button>
          </div>
        </div>

        {/* 4 Key Findings KPI Strip */}
        <div className="pt-8 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider">Óbitos Evitados (1º Ano)</span>
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tabular-nums">
              303.129
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              IC 95%: 284k – 321k vidas salvas no Brasil (The Lancet 2023)
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider">Casos Graves Evitados</span>
              <HeartPulse className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tabular-nums">
              875.846
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Redução de 74% de internações agudas (Santos et al.)
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider">Idosos Salvos (≥60 anos)</span>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tabular-nums">
              187.890
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              61% de todos os óbitos poupados foram de idosos
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider">Economia Hospitalar Direta</span>
              <DollarSign className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tabular-nums">
              US$ 2,0 Bi
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Poupança em leitos cobriu todo o investimento em vacinas
            </div>
          </div>
        </div>

        {/* Explore Portal Sections Grid */}
        <div className="pt-8 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Escolha uma das sessões para explorar o conteúdo aprofundado:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('modelos')}
              className="text-left p-5 bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm rounded-xl transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700">
                1. Dismistificando os Modelos
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Entenda o modelo SIR-V, o conceito de contrafactual, a limpeza de ruídos (GPR) e por que a 2ª dose foi vital.
              </p>
            </button>

            <button
              onClick={() => onNavigate('dados')}
              className="text-left p-5 bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm rounded-xl transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700">
                2. Vidas Salvas por Estado
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Consulte a tabela oficial dos 27 estados (São Paulo, Minas, Rio, Bahia, etc.) com busca, taxas e exportação CSV.
              </p>
            </button>

            <button
              onClick={() => onNavigate('confronto')}
              className="text-left p-5 bg-white border border-slate-200 hover:border-rose-500 hover:shadow-sm rounded-xl transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-700">
                3. Ciência vs Ações do Governo
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Compare as notícias da CPI (53 e-mails da Pfizer ignorados, propina de US$ 1, Covaxin, ataques à Fiocruz) com os fatos científicos.
              </p>
            </button>

            <button
              onClick={() => onNavigate('simulador')}
              className="text-left p-5 bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm rounded-xl transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700">
                4. Simulador Contrafactual
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Mova controles de data, ritmo diário e abandono da 2ª dose para ver as curvas de óbitos e R(t) calculadas em tempo real.
              </p>
            </button>

            <button
              onClick={() => onNavigate('jogo')}
              className="text-left p-5 bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-sm rounded-xl transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700">
                5. Jogo: O Epidemiologista
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Assuma o PNI em 8 decisões históricas reais com simulação visual de agentes 60fps e veja quantas vidas você consegue salvar.
              </p>
            </button>

            <button
              onClick={onOpenLibrary}
              className="text-left p-5 bg-white border border-slate-200 hover:border-slate-400 hover:shadow-sm rounded-xl transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-900">
                6. Biblioteca dos 28 PDFs
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Acesse na íntegra os 3 artigos originais das revistas científicas e as 25 reportagens investigativas anexadas.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
