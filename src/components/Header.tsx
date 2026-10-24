import React, { useRef, useState, useEffect } from 'react';
import {
  BookOpen,
  Home,
  Compass,
  BarChart2,
  ShieldAlert,
  Cpu,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLibrary: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenLibrary }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Full navigation items, including Biblioteca de Fontes
  const navItems = [
    { id: 'intro', label: 'Introdução', shortLabel: 'Introdução', icon: Home },
    { id: 'modelos', label: 'Dismistificando Modelos', shortLabel: 'Modelos', icon: Compass },
    { id: 'dados', label: 'Vidas Salvas (27 UFs)', shortLabel: 'Vidas Salvas', icon: BarChart2 },
    { id: 'confronto', label: 'Ciência vs Governo', shortLabel: 'Ciência vs Fatos', icon: ShieldAlert },
    { id: 'simulador', label: 'Simulador Contrafactual', shortLabel: 'Simulador', icon: Cpu },
    { id: 'jogo', label: 'Jogo: O Epidemiologista', shortLabel: 'Jogo', icon: Gamepad2 },
    { id: 'fontes', label: 'Biblioteca de Fontes', shortLabel: 'Fontes (28)', icon: BookOpen }
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll mobile carousel left or right
  const scrollNav = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -180 : 180;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Auto center active tab in mobile carousel
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector(`[data-tab-id="${activeTab}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Wordmark */}
        <button
          onClick={() => handleTabClick('intro')}
          className="text-left group cursor-pointer focus:outline-none flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            EV
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors whitespace-nowrap block leading-tight">
              Evidência & Vida
            </span>
            <span className="text-[10px] text-slate-500 font-normal hidden sm:block">
              Divulgação Científica
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 text-xs font-semibold uppercase tracking-wider ${
                  isActive
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Mobile Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick open full modal button */}
          <button
            onClick={() => handleTabClick('fontes')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap border ${
              activeTab === 'fontes'
                ? 'bg-blue-50 text-blue-800 border-blue-300'
                : 'text-slate-800 bg-slate-100 hover:bg-slate-200 border-slate-300'
            }`}
            title="Acessar todos os 28 arquivos originais em PDF"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Fontes & PDFs</span>
            <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-mono font-bold">28</span>
          </button>

          {/* Mobile All-Sections Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300 flex items-center gap-1.5 text-xs font-semibold"
            title="Abrir menu com todas as seções"
            aria-label="Menu de seções"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 text-slate-800" /> : <Menu className="w-4 h-4 text-slate-800" />}
            <span className="hidden sm:inline">Menu</span>
          </button>
        </div>
      </div>

      {/* Rotating Carousel Bar for Mobile / Tablet */}
      <div className="xl:hidden relative bg-slate-50 border-t border-slate-200 py-1.5 px-1 flex items-center">
        {/* Left Arrow Button to Rotate Carousel */}
        <button
          onClick={() => scrollNav('left')}
          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 active:scale-95 rounded-md transition-all shrink-0 z-10 bg-white/95 shadow-2xs border border-slate-200 mr-1"
          title="Rolar seções para a esquerda"
          aria-label="Rolar seções para a esquerda"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Track */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto scroll-smooth scrollbar-none flex items-center gap-1.5 px-1"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                data-tab-id={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs font-semibold ring-2 ring-blue-400/40 ring-offset-1'
                    : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 active:bg-slate-200'
                }`}
                style={{ scrollSnapAlign: 'center' }}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button to Rotate Carousel */}
        <button
          onClick={() => scrollNav('right')}
          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 active:scale-95 rounded-md transition-all shrink-0 z-10 bg-white/95 shadow-2xs border border-slate-200 ml-1"
          title="Rolar seções para a direita"
          aria-label="Rolar seções para a direita"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Expanded Sections Grid Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 p-4 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Todas as Seções do Portal (Clique para Acessar):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-left text-xs font-semibold transition-all border ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 border-blue-300 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
