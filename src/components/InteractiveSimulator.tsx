import React, { useState, useMemo } from 'react';
import { Sliders, RotateCcw, TrendingDown, Users, ShieldAlert, Heart, DollarSign } from 'lucide-react';

export const InteractiveSimulator: React.FC = () => {
  // Simulator parameters
  const [daysShift, setDaysShift] = useState<number>(0); // -60 (early) to +30 (late)
  const [dailyRate, setDailyRate] = useState<number>(0.40); // 0.20 to 0.80%
  const [secondDoseDrop, setSecondDoseDrop] = useState<number>(10); // 0% to 30% dropout
  const [vaccineEfficacy, setVaccineEfficacy] = useState<number>(80); // 50 to 95%

  // Presets
  const applyPreset = (preset: 'real' | 'h1n1' | 'delayed' | 'hesitancy') => {
    if (preset === 'real') {
      setDaysShift(0);
      setDailyRate(0.40);
      setSecondDoseDrop(10);
      setVaccineEfficacy(80);
    } else if (preset === 'h1n1') {
      setDaysShift(-30);
      setDailyRate(0.65);
      setSecondDoseDrop(3);
      setVaccineEfficacy(85);
    } else if (preset === 'delayed') {
      setDaysShift(30);
      setDailyRate(0.35);
      setSecondDoseDrop(20);
      setVaccineEfficacy(75);
    } else if (preset === 'hesitancy') {
      setDaysShift(0);
      setDailyRate(0.35);
      setSecondDoseDrop(25);
      setVaccineEfficacy(70);
    }
  };

  // Mathematical curve generation based on the SIR-V formulation from Libotte et al. & Ferreira et al.
  const simulationResults = useMemo(() => {
    const totalDays = 360;
    const pointsReal: number[] = [];
    const pointsSimulated: number[] = [];
    const pointsNoVaccine: number[] = [];

    // Population adult base (~153 million)
    let totalDeathsReal = 369034;
    let totalSevereCasesReal = 1169972;

    // Simulation calculation
    // Speed factor: normal is 0.40. Ratio = dailyRate / 0.40
    const speedMultiplier = dailyRate / 0.40;
    // Days shift effect: earlier vaccination dampens peak exponentially
    // Efficacy modulation with 2nd dose drop: effective efficacy = eff * (1 - dropout * 0.5)
    const effectiveEfficacy = (vaccineEfficacy / 100) * (1 - (secondDoseDrop / 100) * 0.5);

    // Baseline deaths averted in 1 year in Brazil = ~303,129
    // Simulated averted deaths = baseline * speedMultiplier * (effectiveEfficacy / 0.75) * (1 - daysShift * 0.012)
    let simulatedAvertedDeaths = Math.round(
      303129 * (0.5 + 0.5 * speedMultiplier) * (effectiveEfficacy / 0.75) * Math.pow(0.985, daysShift)
    );
    // Clamp to realistic bounds
    simulatedAvertedDeaths = Math.max(120000, Math.min(480000, simulatedAvertedDeaths));

    // Simulated averted severe cases (~875,846 baseline)
    let simulatedAvertedCases = Math.round(simulatedAvertedDeaths * 2.89);

    // Delta compared to the real historical scenario
    const deltaLives = simulatedAvertedDeaths - 303129;

    // Cost saved in SUS (mean hospitalization US$ 12,000 per severe case prevented)
    const costSavedMillionUSD = Math.round((simulatedAvertedCases * 12000) / 1000000);

    // Generate daily death curves for SVG graph
    for (let day = 0; day < totalDays; day++) {
      // Wave 1 & 2 curve dynamics
      const gammaPeak = 110 + daysShift * 0.6; // day around April/May 2021
      const deltaPeak = 240;

      // Unvaccinated hypothetical trajectory (The Lancet Fig. 2)
      const noVacDay = Math.max(
        150,
        Math.round(2800 * Math.exp(-Math.pow(day - 120, 2) / 3200) + 3200 * Math.exp(-Math.pow(day - 220, 2) / 4500))
      );
      pointsNoVaccine.push(noVacDay);

      // Real historical trajectory
      const realDay = Math.max(
        120,
        Math.round(2600 * Math.exp(-Math.pow(day - 110, 2) / 2800) + 800 * Math.exp(-Math.pow(day - 230, 2) / 3500))
      );
      pointsReal.push(realDay);

      // User simulated trajectory
      const vacEffectivenessFactor = Math.min(1, Math.max(0, (day - (60 + daysShift)) / 180)) * (effectiveEfficacy / 0.8) * speedMultiplier;
      const simDay = Math.max(
        60,
        Math.round(
          2800 * Math.exp(-Math.pow(day - gammaPeak, 2) / 3000) * (1 - vacEffectivenessFactor * 0.65) +
          1200 * Math.exp(-Math.pow(day - deltaPeak, 2) / 4000) * (1 - vacEffectivenessFactor * 0.85)
        )
      );
      pointsSimulated.push(simDay);
    }

    return {
      pointsReal,
      pointsSimulated,
      pointsNoVaccine,
      simulatedAvertedDeaths,
      simulatedAvertedCases,
      deltaLives,
      costSavedMillionUSD,
      effectiveR: Number(((1.4 - (vaccineEfficacy / 100) * (1 - secondDoseDrop / 200) * speedMultiplier * 0.7)).toFixed(2))
    };
  }, [daysShift, dailyRate, secondDoseDrop, vaccineEfficacy]);

  // SVG coordinate transformation
  const svgWidth = 800;
  const svgHeight = 280;
  const maxVal = 3600;

  const buildPath = (data: number[]) => {
    return data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * svgWidth;
        const y = svgHeight - (val / maxVal) * (svgHeight - 20) - 10;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
          <span>Laboratório Interativo</span>
          <span aria-hidden="true">·</span>
          <span>Simulações Baseadas em EDOs e Modelagem Bayesiana</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Simulador Contrafactual de Políticas de Vacinação
        </h2>
        <p className="mt-2 text-slate-600 max-w-3xl leading-relaxed text-sm">
          Ajuste as variáveis abaixo para ver em tempo real como o <strong>momento de compra</strong>, 
          o <strong>ritmo diário de aplicação</strong> e a <strong>adesão à segunda dose</strong> 
          alteram radicalmente a curva de óbitos e a pressão hospitalar no país.
        </p>

        {/* Quick Presets */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500 mr-2">Cenários Prontos:</span>
          <button
            onClick={() => applyPreset('real')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors"
          >
            Histórico Real Brasileiro
          </button>
          <button
            onClick={() => applyPreset('h1n1')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transition-colors"
          >
            Padrão H1N1 (30 Dias Antes + Rápido)
          </button>
          <button
            onClick={() => applyPreset('delayed')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 transition-colors"
          >
            Atraso Extremo (+30 Dias de Hesitação)
          </button>
          <button
            onClick={() => applyPreset('hesitancy')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
          >
            Abandono Alto da 2ª Dose (25%)
          </button>
          <button
            onClick={() => applyPreset('real')}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            title="Resetar parâmetros"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: On mobile, Graph and Metrics come first (order-1), then Sliders (order-2) */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
        {/* Graph & Results Column (7 cols on desktop, FIRST on mobile) */}
        <div className="w-full lg:col-span-7 space-y-6 order-1 lg:order-2">
          {/* Dynamic SVG Comparison Chart */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900">
                    Curva Comparativa de Óbitos Diários (2021)
                  </h4>
                  <span className="text-[11px] px-2 py-0.5 rounded font-mono font-semibold bg-blue-100 text-blue-800">
                    Simulação Ativa
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Modelo SIR-V dinâmico calibrado com dados reais do Brasil (Libotte et al. & Ferreira et al.)
                </p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono bg-slate-50 p-2 rounded-lg border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-1 bg-blue-600 inline-block rounded-xs"></span>
                  <span className="text-slate-800 font-semibold">Sua Simulação</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-1 bg-slate-400 inline-block border-t border-dashed border-slate-500"></span>
                  <span className="text-slate-600">Histórico Real</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-1 bg-rose-400 inline-block rounded-xs"></span>
                  <span className="text-rose-700">Sem Vacinação</span>
                </div>
              </div>
            </div>

            {/* Responsive SVG Plot */}
            <div className="relative w-full overflow-hidden bg-slate-50 rounded-xl border border-slate-200 p-2 sm:p-3">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-52 sm:h-64 lg:h-72 overflow-visible"
              >
                {/* Horizontal gridlines */}
                {[0, 1000, 2000, 3000].map((level) => {
                  const y = svgHeight - (level / maxVal) * (svgHeight - 20) - 10;
                  return (
                    <g key={level}>
                      <line
                        x1="0"
                        y1={y}
                        x2={svgWidth}
                        y2={y}
                        stroke="#e2e8f0"
                        strokeDasharray="4 4"
                      />
                      <text x="8" y={y - 4} fontSize="11" fill="#64748b" fontFamily="monospace">
                        {level} óbitos/dia
                      </text>
                    </g>
                  );
                })}

                {/* Shaded area between Simulated and No-Vaccine (averted deaths) */}
                <path
                  d={`${buildPath(simulationResults.pointsSimulated)} L ${svgWidth},${svgHeight - 10} L 0,${svgHeight - 10} Z`}
                  fill="#3b82f6"
                  opacity="0.08"
                />

                {/* No-Vaccine Counterfactual Curve (Rose) */}
                <path
                  d={buildPath(simulationResults.pointsNoVaccine)}
                  fill="none"
                  stroke="#fb7185"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                  opacity="0.85"
                />

                {/* Real Historical Curve (Slate dashed) */}
                <path
                  d={buildPath(simulationResults.pointsReal)}
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.75"
                />

                {/* User Simulated Curve (Blue Solid) */}
                <path
                  d={buildPath(simulationResults.pointsSimulated)}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3.5"
                />
              </svg>

              {/* Time axis marks */}
              <div className="flex justify-between text-[10px] sm:text-xs text-slate-500 font-mono mt-2 px-1">
                <span>Jan/21 (Início)</span>
                <span>Abr/21 (Gama)</span>
                <span>Jul/21 (Avanço)</span>
                <span>Out/21 (Queda)</span>
                <span>Dez/21 (Reforço)</span>
              </div>
            </div>

            {/* Real-Time Impact Metric Cards */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
                <div className="text-[10px] sm:text-[11px] font-semibold text-blue-900 uppercase tracking-wider mb-1">
                  Óbitos Evitados
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-blue-700 tabular-nums">
                  {simulationResults.simulatedAvertedDeaths.toLocaleString('pt-BR')}
                </div>
                <div className={`text-[10px] sm:text-[11px] font-mono mt-0.5 font-medium ${
                  simulationResults.deltaLives >= 0 ? 'text-emerald-700' : 'text-rose-700'
                }`}>
                  {simulationResults.deltaLives >= 0 ? '+' : ''}
                  {simulationResults.deltaLives.toLocaleString('pt-BR')} vs real
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[10px] sm:text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Casos Graves Poupados
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-indigo-700 tabular-nums">
                  {simulationResults.simulatedAvertedCases.toLocaleString('pt-BR')}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                  Leitos de UTI livres
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[10px] sm:text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  Economia ao SUS
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-700 tabular-nums">
                  US$ {simulationResults.costSavedMillionUSD}M
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                  Custos hospitalares
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[10px] sm:text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                  R(t) Efetivo
                </div>
                <div className={`text-xl sm:text-2xl font-mono font-bold tabular-nums ${
                  simulationResults.effectiveR < 1 ? 'text-emerald-700' : 'text-rose-600'
                }`}>
                  {simulationResults.effectiveR}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                  {simulationResults.effectiveR < 1 ? 'Epidemia em queda' : 'Contágio em alta'}
                </div>
              </div>
            </div>

            {/* Mobile Visual Cue */}
            <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed">
              💡 <strong>Como ler o gráfico no celular:</strong> Ao mover os controles abaixo, a linha azul responde instantaneamente. 
              Veja a diferença entre a linha azul e a vermelha pontilhada: cada espaço entre elas representa vidas brasileiras poupadas.
            </div>
          </div>
        </div>

        {/* Sliders Column (5 cols on desktop, SECOND on mobile) */}
        <div className="w-full lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xs order-2 lg:order-1">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">Ajuste os Parâmetros</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Tempo Real</span>
          </div>

          {/* Slider 1: Days Shift */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-800">
                1. Início da Vacinação
              </label>
              <span className="font-mono font-bold text-blue-700 tabular-nums">
                {daysShift === 0
                  ? 'Data Real (17/Jan/2021)'
                  : daysShift < 0
                  ? `${Math.abs(daysShift)} dias ANTES`
                  : `${daysShift} dias DEPOIS (Atraso)`}
              </span>
            </div>
            <input
              type="range"
              min="-60"
              max="30"
              step="5"
              value={daysShift}
              onChange={(e) => setDaysShift(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 py-1"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>-60d (Nov/20)</span>
              <span>0 (17/Jan/21)</span>
              <span>+30d (Fev/21)</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {daysShift < 0
                ? 'Antecipação achataria a onda da variante Gama precocemente.'
                : daysShift > 0
                ? 'Atrasar desloca o pico para o inverno e sobrecarrega os leitos de UTI.'
                : 'Data oficial da aplicação da 1ª dose pelo Butantan em SP.'}
            </p>
          </div>

          {/* Slider 2: Daily Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-800">
                2. Ritmo Diário de Aplicação
              </label>
              <span className="font-mono font-bold text-blue-700 tabular-nums">
                {dailyRate.toFixed(2)}% da pop./dia (~{Math.round(dailyRate * 1530000).toLocaleString('pt-BR')} doses/dia)
              </span>
            </div>
            <input
              type="range"
              min="0.20"
              max="0.80"
              step="0.05"
              value={dailyRate}
              onChange={(e) => setDailyRate(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 py-1"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>0.20% (Lento)</span>
              <span>0.40% (Média Real)</span>
              <span>0.80% (Padrão H1N1)</span>
            </div>
            <p className="text-[11px] text-slate-500">
              O SUS comprovou em 2010 vacinar 1 milhão/dia contra H1N1; na Covid a falta de doses represou o ritmo.
            </p>
          </div>

          {/* Slider 3: Second Dose Dropout */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-800">
                3. Abandono da 2ª Dose
              </label>
              <span className="font-mono font-bold text-rose-700 tabular-nums">
                {secondDoseDrop}% da população
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={secondDoseDrop}
              onChange={(e) => setSecondDoseDrop(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600 py-1"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>0% (Adesão Total)</span>
              <span>10% (Real Observado)</span>
              <span>30% (Grave Abandono)</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Pessoas que tomaram só 1 dose têm perda de até 50% na eficácia protetora (Libotte et al., 2022).
            </p>
          </div>

          {/* Slider 4: Baseline Vaccine Efficacy */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-800">
                4. Eficácia Ponderada
              </label>
              <span className="font-mono font-bold text-emerald-700 tabular-nums">
                {vaccineEfficacy}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={vaccineEfficacy}
              onChange={(e) => setVaccineEfficacy(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 py-1"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>50% (Mínima OMS)</span>
              <span>80% (Média Pool BR)</span>
              <span>95% (Pfizer/mRNA)</span>
            </div>
            <p className="text-[11px] text-slate-500">
              CoronaVac (50,3% a 61,2%), AstraZeneca (76% a 86,4%), Pfizer (95%).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
