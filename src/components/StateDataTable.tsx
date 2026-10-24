import React, { useState, useMemo } from 'react';
import { BRAZIL_STATES_DATA, TOTAL_BRAZIL_AVERTED } from '../data/stateAvertedData';
import { Search, ArrowUpDown, MapPin, Download, Filter } from 'lucide-react';

export const StateDataTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('Todas');
  const [sortField, setSortField] = useState<'deaths' | 'cases' | 'rate' | 'pop'>('deaths');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const regions = ['Todas', 'Sudeste', 'Nordeste', 'Sul', 'Centro-Oeste', 'Norte'];

  const filteredStates = useMemo(() => {
    return BRAZIL_STATES_DATA.filter((state) => {
      const matchSearch =
        state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        state.uf.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRegion = selectedRegion === 'Todas' || state.region === selectedRegion;
      return matchSearch && matchRegion;
    }).sort((a, b) => {
      let valA = 0;
      let valB = 0;
      if (sortField === 'deaths') {
        valA = a.avertedDeaths;
        valB = b.avertedDeaths;
      } else if (sortField === 'cases') {
        valA = a.avertedSevereCases;
        valB = b.avertedSevereCases;
      } else if (sortField === 'pop') {
        valA = a.population;
        valB = b.population;
      } else if (sortField === 'rate') {
        valA = (a.avertedDeaths / a.population) * 100000;
        valB = (b.avertedDeaths / b.population) * 100000;
      }
      return sortAsc ? valA - valB : valB - valA;
    });
  }, [searchTerm, selectedRegion, sortField, sortAsc]);

  const handleSort = (field: 'deaths' | 'cases' | 'rate' | 'pop') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const exportCSV = () => {
    const headers = 'UF,Estado,Região,População,Óbitos Evitados,Casos Graves Evitados,Taxa Óbitos por 100k\n';
    const rows = filteredStates
      .map(
        (s) =>
          `${s.uf},"${s.name}",${s.region},${s.population},${s.avertedDeaths},${s.avertedSevereCases},${(
            (s.avertedDeaths / s.population) *
            100000
          ).toFixed(1)}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'vidas_salvas_vacinas_brasil_estados.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
          <span>Dados Oficiais por Estado</span>
          <span aria-hidden="true">·</span>
          <span>The Lancet Regional Health (Santos et al., 2023)</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Vidas Salvas e Casos Graves Evitados nas 27 Unidades da Federação
            </h2>
            <p className="mt-2 text-slate-600 max-w-3xl leading-relaxed text-sm">
              Consulte as estimativas oficiais do primeiro ano da campanha vacinal (janeiro de 2021 a janeiro de 2022). 
              Os dados refletem o cruzamento probabilístico entre o SI-PNI, o SIVEP-Gripe e o censo IBGE.
            </p>
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Baixar Tabela em CSV</span>
          </button>
        </div>

        {/* National Summary Bar */}
        <div className="mt-6 p-5 bg-blue-50 border border-blue-200 rounded-2xl flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-medium text-blue-900 tracking-wider">
              Total Nacional Consolidado (Brasil)
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-950 mt-1">
              {TOTAL_BRAZIL_AVERTED.avertedDeaths.toLocaleString('pt-BR')} Vidas Salvas
            </div>
            <div className="text-xs font-mono text-blue-800 mt-0.5">
              Intervalo de Credibilidade (95% CI): {TOTAL_BRAZIL_AVERTED.avertedDeathsCI}
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-blue-950 font-mono">
            <div>
              <div className="text-slate-500 uppercase text-[10px]">Casos Graves Evitados</div>
              <div className="text-base font-bold text-indigo-900 mt-0.5">
                {TOTAL_BRAZIL_AVERTED.avertedSevereCases.toLocaleString('pt-BR')}
              </div>
            </div>
            <div className="border-l border-blue-200 pl-6">
              <div className="text-slate-500 uppercase text-[10px]">População Coberta</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                ~153,7 Milhões
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar estado por nome ou sigla (ex: SP, Bahia)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-lg shrink-0">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedRegion === region
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold tracking-wider">
                <th className="py-3 px-4">Estado / Região</th>
                <th
                  onClick={() => handleSort('pop')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>População</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('deaths')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="inline-flex items-center gap-1 text-blue-700">
                    <span>Óbitos Evitados</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('cases')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="inline-flex items-center gap-1 text-indigo-700">
                    <span>Casos Graves Evitados</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('rate')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-900"
                >
                  <div className="inline-flex items-center gap-1">
                    <span>Taxa / 100k hab</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right">Com Reforço (3ª dose)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredStates.map((state) => {
                const ratePer100k = ((state.avertedDeaths / state.population) * 100000).toFixed(1);
                return (
                  <tr key={state.uf} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-sans font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-6 rounded bg-slate-100 font-mono text-[11px] font-bold text-slate-700 flex items-center justify-center">
                          {state.uf}
                        </span>
                        <span>{state.name}</span>
                        <span className="text-[11px] text-slate-400">({state.region})</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600 tabular-nums">
                      {state.population.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-right text-blue-700 font-bold tabular-nums">
                      {state.avertedDeaths.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-right text-indigo-700 font-medium tabular-nums">
                      {state.avertedSevereCases.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-700 font-medium tabular-nums">
                      {ratePer100k}
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-700 text-[11px] tabular-nums">
                      +{state.avertedDeathsBoosted.toLocaleString('pt-BR')} mortes
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
