import React from 'react';
import { BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLibrary: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenLibrary }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setActiveTab('modelos')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors whitespace-nowrap shrink-0">
            Evidência & Vida
          </span>
          <span className="hidden sm:inline-block text-xs text-slate-500 ml-2 font-normal">
            Divulgação Científica
          </span>
        </button>

        {/* Zone 2: 5 Concise Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('modelos')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              activeTab === 'modelos'
                ? 'border-blue-600 text-blue-700 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Dismistificando Modelos
          </button>
          <button
            onClick={() => setActiveTab('dados')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              activeTab === 'dados'
                ? 'border-blue-600 text-blue-700 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Vidas Salvas no Brasil
          </button>
          <button
            onClick={() => setActiveTab('confronto')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              activeTab === 'confronto'
                ? 'border-blue-600 text-blue-700 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Ciência vs Governo
          </button>
          <button
            onClick={() => setActiveTab('simulador')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              activeTab === 'simulador'
                ? 'border-blue-600 text-blue-700 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Simulador Contrafactual
          </button>
          <button
            onClick={() => setActiveTab('jogo')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
              activeTab === 'jogo'
                ? 'border-blue-600 text-blue-700 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Jogo: O Epidemiologista
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenLibrary}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Biblioteca de Fontes (28 Documentos)</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 bg-slate-50 border-t border-slate-200 text-xs overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('modelos')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'modelos' ? 'bg-blue-600 text-white font-medium' : 'text-slate-700'
          }`}
        >
          Modelos
        </button>
        <button
          onClick={() => setActiveTab('dados')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'dados' ? 'bg-blue-600 text-white font-medium' : 'text-slate-700'
          }`}
        >
          Vidas Salvas
        </button>
        <button
          onClick={() => setActiveTab('confronto')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'confronto' ? 'bg-blue-600 text-white font-medium' : 'text-slate-700'
          }`}
        >
          Ciência vs Ações
        </button>
        <button
          onClick={() => setActiveTab('simulador')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'simulador' ? 'bg-blue-600 text-white font-medium' : 'text-slate-700'
          }`}
        >
          Simulador
        </button>
        <button
          onClick={() => setActiveTab('jogo')}
          className={`px-2 py-1 rounded whitespace-nowrap ${
            activeTab === 'jogo' ? 'bg-blue-600 text-white font-medium' : 'text-slate-700'
          }`}
        >
          Jogo
        </button>
      </div>
    </header>
  );
};
