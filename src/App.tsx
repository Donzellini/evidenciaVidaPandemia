/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ModelDemystifier } from './components/ModelDemystifier';
import { StateDataTable } from './components/StateDataTable';
import { FactsVsPolitics } from './components/FactsVsPolitics';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { GameImmunityDefense } from './components/GameImmunityDefense';
import { DocumentLibraryModal } from './components/DocumentLibraryModal';
import { BookOpen, ArrowLeft, Compass, BarChart2, ShieldAlert, Cpu, Gamepad2, Home } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('intro');
  const [isLibraryOpen, setIsLibraryOpen] = useState<boolean>(false);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'modelos':
        return { title: 'Dismistificando os Modelos Matemáticos', icon: Compass };
      case 'dados':
        return { title: 'Vidas Salvas & Dados Oficiais das 27 UFs', icon: BarChart2 };
      case 'confronto':
        return { title: 'Ciência vs Ações do Governo Bolsonaro', icon: ShieldAlert };
      case 'simulador':
        return { title: 'Simulador Contrafactual de Vacinação', icon: Cpu };
      case 'jogo':
        return { title: 'Jogo Educativo: O Epidemiologista no Comando', icon: Gamepad2 };
      default:
        return { title: 'Introdução & Visão Geral', icon: Home };
    }
  };

  const currentSection = getSectionTitle();
  const SectionIcon = currentSection.icon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenLibrary={() => setIsLibraryOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {/* If user is in a specific section, display a clear, friendly Section Breadcrumb Banner */}
        {activeTab !== 'intro' && (
          <div className="bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs">
              <button
                onClick={() => handleNavigate('intro')}
                className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-blue-900 transition-colors py-1 px-2.5 rounded-lg hover:bg-blue-50"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar à Introdução Geral</span>
              </button>

              <div className="flex items-center gap-2 text-slate-500 font-medium truncate ml-2">
                <SectionIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Seção Atual: <strong className="text-slate-800">{currentSection.title}</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* Section Rendering */}
        {activeTab === 'intro' && (
          <Hero
            onNavigate={handleNavigate}
            onOpenLibrary={() => setIsLibraryOpen(true)}
          />
        )}

        {activeTab === 'modelos' && <ModelDemystifier />}
        {activeTab === 'dados' && <StateDataTable />}
        {activeTab === 'confronto' && <FactsVsPolitics />}
        {activeTab === 'simulador' && <InteractiveSimulator />}
        {activeTab === 'jogo' && <GameImmunityDefense />}
      </main>

      {/* Document Library Modal */}
      <DocumentLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="text-sm font-bold text-slate-900">
                Evidência & Vida — Divulgação Científica da Vacinação no Brasil
              </div>
              <p className="mt-1 text-slate-500 max-w-xl">
                Plataforma independente de comunicação pública da ciência dedicada a tornar compreensíveis 
                os modelos epidemiológicos que balizam a saúde coletiva e salvam vidas.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLibraryOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Ver todos os 28 documentos anexados</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] leading-relaxed">
            <div>
              <strong className="text-slate-700 block mb-1">Fontes Científicas Principais:</strong>
              <p>
                Santos et al. (The Lancet Reg. Health Am., 2023) · Libotte et al. (J. R. Soc. Interface, 2022) · 
                Ferreira et al. (The Lancet Reg. Health Am., 2023).
              </p>
            </div>

            <div>
              <strong className="text-slate-700 block mb-1">Fontes Jornalísticas & CPI:</strong>
              <p>
                Reportagens investigativas de Folha de S.Paulo, Revista piauí, Revista VEJA, BBC News Brasil, 
                G1, Poder360 e registros públicos da CPI da Pandemia no Senado Federal.
              </p>
            </div>

            <div>
              <strong className="text-slate-700 block mb-1">Compromisso com a Ciência:</strong>
              <p>
                Em memória às centenas de milhares de vidas perdidas e em reconhecimento ao esforço dos cientistas, 
                profissionais do SUS e pesquisadores de instituições públicas brasileiras.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400">
            <div>© 2021–2026 Evidência & Vida. Conteúdo para fins de divulgação científica e memória pública.</div>
            <div className="flex items-center gap-4">
              <span>Dados Abertos</span>
              <span aria-hidden="true">·</span>
              <span>Metodologia Transparente</span>
              <span aria-hidden="true">·</span>
              <span>SUS Público & Universal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
