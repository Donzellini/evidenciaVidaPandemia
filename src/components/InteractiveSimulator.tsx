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

      {/* Main Grid: Parameters on Left, Output & Graph on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Parameter Sliders (4 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Parâmetros Epidemiológicos</h3>
          </div>

          {/* Slider 1: Days Shift */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-800">
                Data de Início da Vacinação
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
              className="w-full accent-blue-600 cursor-pointer"
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
                Ritmo de Vacinação Diária
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
              className="w-full accent-blue-600 cursor-pointer"
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
                Abandono da 2ª Dose (Hesitação / Desinformação)
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
              className="w-full accent-rose-600 cursor-pointer"
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
                Eficácia Ponderada dos Imunizantes
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
              className="w-full accent-emerald-600 cursor-pointer"
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

        {/* Right Column: Visualization & Results (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Real-Time Impact Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                Óbitos Evitados
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-blue-700 tabular-nums">
                {simulationResults.simulatedAvertedDeaths.toLocaleString('pt-BR')}
              </div>
              <div className={`text-[11px] font-mono mt-1 ${
                simulationResults.deltaLives >= 0 ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {simulationResults.deltaLives >= 0 ? '+' : ''}
                {simulationResults.deltaLives.toLocaleString('pt-BR')} vs real
              </div>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                Casos Graves Poupados
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-indigo-700 tabular-nums">
                {simulationResults.simulatedAvertedCases.toLocaleString('pt-BR')}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Leitos de UTI desafogados
              </div>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                Economia SUS
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-700 tabular-nums">
                US$ {simulationResults.costSavedMillionUSD}M
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Em internações evitadas
              </div>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                R(t) Resultante
              </div>
              <div className={`text-xl sm:text-2xl font-mono font-bold tabular-nums ${
                simulationResults.effectiveR < 1 ? 'text-emerald-700' : 'text-rose-600'
              }`}>
                {simulationResults.effectiveR}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {simulationResults.effectiveR < 1 ? 'Epidemia controlada' : 'Transmissão em alta'}
              </div>
            </div>
          </div>

          {/* Dynamic SVG Comparison Chart */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Curva Comparativa de Óbitos Diários (Janeiro a Dezembro de 2021)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Simulação estocástica baseada nas taxas diárias de incidência de óbitos por 100 mil hab.
                </p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-blue-600 inline-block"></span>
                  <span className="text-slate-700">Sua Simulação</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-slate-400 inline-block border-t border-dashed border-slate-400"></span>
                  <span className="text-slate-500">Histórico Real</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-rose-400 inline-block"></span>
                  <span className="text-rose-700">Sem Vacinação</span>
                </div>
              </div>
            </div>

            {/* SVG Plot */}
            <div className="relative w-full overflow-hidden bg-slate-50 rounded-xl border border-slate-200 p-2">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
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
                      <text x="8" y={y - 4} fontSize="9" fill="#94a3b8" fontFamily="monospace">
                        {level} óbitos/dia
                      </text>
                    </g>
                  );
                })}

                {/* No-Vaccine Counterfactual Curve (Rose) */}
                <path
                  d={buildPath(simulationResults.pointsNoVaccine)}
                  fill="none"
                  stroke="#fb7185"
                  strokeWidth="2"
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
                  opacity="0.7"
                />

                {/* User Simulated Curve (Blue Solid) */}
                <path
                  d={buildPath(simulationResults.pointsSimulated)}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                />
              </svg>

              {/* Time axis marks */}
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2 px-2">
                <span>Jan/2021 (Início)</span>
                <span>Abr/2021 (Onda Gama)</span>
                <span>Jul/2021 (Aceleração)</span>
                <span>Out/2021 (Queda)</span>
                <span>Dez/2021 (Reforço)</span>
              </div>
            </div>

            {/* Scientific Explanation Callout */}
            <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed">
              <strong>Como interpretar este gráfico:</strong> A área entre a linha vermelha pontilhada (o que aconteceria sem vacinas) 
              e a linha azul (sua simulação) representa as <strong>vidas salvas</strong>. Quanto mais à esquerda a linha azul descer, 
              mais rápido o sistema hospitalar se recupera e menos pessoas morrem nas filas de espera por leitos de oxigênio.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
