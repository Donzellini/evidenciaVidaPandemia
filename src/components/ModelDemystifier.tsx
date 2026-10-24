import React, { useState } from 'react';
import { SCIENTIFIC_ARTICLES } from '../data/scientificArticles';
import { FileText, ArrowRight, BookOpen, Layers, LineChart, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ModelDemystifier: React.FC = () => {
  const [activeArticleId, setActiveArticleId] = useState<string>(SCIENTIFIC_ARTICLES[0].id);
  const [selectedCompartment, setSelectedCompartment] = useState<string>('S');

  const selectedArticle = SCIENTIFIC_ARTICLES.find(a => a.id === activeArticleId) || SCIENTIFIC_ARTICLES[0];

  const compartments = [
    {
      id: 'S',
      label: 'S - Suscetíveis',
      desc: 'Pessoas que ainda não tiveram contato com o vírus e não estão vacinadas.',
      layman: 'Qualquer pessoa sem imunidade que pode ser contaminada ao respirar o ar com aerossóis do vírus.',
      color: 'bg-amber-50 border-amber-200 text-amber-900',
      tagColor: 'text-amber-700 bg-amber-100'
    },
    {
      id: 'I',
      label: 'I - Infectados',
      desc: 'Indivíduos transmitindo o vírus ativamente na comunidade.',
      layman: 'Pessoas com ou sem sintomas que espalham o vírus. Cada infectado transmite em média para R(t) pessoas.',
      color: 'bg-rose-50 border-rose-200 text-rose-900',
      tagColor: 'text-rose-700 bg-rose-100'
    },
    {
      id: 'V',
      label: 'V - Vacinados',
      desc: 'Pessoas que receberam a vacina e estão desenvolvendo anticorpos.',
      layman: 'Recebem o treinamento imunológico. Com as 2 doses completas, reduzem em até 86% a chance de hospitalização.',
      color: 'bg-blue-50 border-blue-200 text-blue-900',
      tagColor: 'text-blue-700 bg-blue-100'
    },
    {
      id: 'R',
      label: 'R - Recuperados / Imunes',
      desc: 'Indivíduos protegidos que não transmitem nem adoecem gravemente.',
      layman: 'O "escudo biológico" da sociedade. Quanto maior este grupo, menor a chance de o vírus encontrar quem infectar.',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      tagColor: 'text-emerald-700 bg-emerald-100'
    },
    {
      id: 'D',
      label: 'D - Óbitos (Deceased)',
      desc: 'Perdas humanas resultantes da evolução grave da síndrome respiratória.',
      layman: 'A consequência mais trágica da sobrecarga do sistema de saúde e da falta de proteção oportuna.',
      color: 'bg-slate-100 border-slate-300 text-slate-800',
      tagColor: 'text-slate-700 bg-slate-200'
    }
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Section 1: Intro to Demystification */}
      <div className="border-b border-slate-200 pb-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
          <span>Educação Científica para Todos</span>
          <span aria-hidden="true">·</span>
          <span>Como a Matemática Salva Vidas</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Dismistificando os Modelos Matemáticos da Pandemia
        </h2>
        <p className="mt-3 text-slate-600 max-w-3xl leading-relaxed">
          Muitas pessoas fora da universidade imaginam que modelos epidemiológicos são "chutes" ou "fórmulas mágicas". 
          Na realidade, são instrumentos de física matemática e estatística computacional rigorosos, 
          alimentados por milhões de dados reais de hospitais e cartórios. Veja abaixo, passo a passo, como funcionam.
        </p>

        {/* 3 Conceptual Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 font-semibold mb-3">
              1
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">
              O que é um Modelo SIR-V?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              O modelo divide a população em compartimentos lógicos (Suscetíveis, Infectados, Vacinados, Imunes e Óbitos). 
              Equações diferenciais calculam a velocidade em que as pessoas transitam entre essas gavetas conforme se vacinam ou se expõem ao vírus.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-700 font-semibold mb-3">
              2
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">
              O "Mundo Contrafactual"
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              "Contrafactual" significa simular com precisão estatística: <em>o que teria acontecido se a vacina não existisse ou chegasse mais rápido?</em> 
              Comparando idosos vacinados com jovens não vacinados na mesma época, os cientistas isolam o efeito exato da vacina.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 font-semibold mb-3">
              3
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">
              Limpando os Ruídos (GPR & AR1)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nos fins de semana e feriados, as notificações caem artificialmente e acumulam na terça-feira. 
              Técnicas como a <strong>Regressão por Processos Gaussianos (GPR)</strong> e processos autorregressivos corrigem esses atrasos sem distorcer a realidade.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Interactive Compartmental Flow */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Mecanismo Visual
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              O Fluxo Dinâmico da Imunização: Como os Compartimentos Conversam
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Clique em cada compartimento para entender sua função prática no modelo da Royal Society (Libotte et al., 2022).
            </p>
          </div>
        </div>

        {/* Compartments Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {compartments.map(comp => (
            <button
              key={comp.id}
              onClick={() => setSelectedCompartment(comp.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                selectedCompartment === comp.id
                  ? `${comp.color} ring-2 ring-blue-600 ring-offset-1 font-medium shadow-sm`
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-xs font-mono font-bold uppercase mb-1">{comp.id}</div>
              <div className="text-sm font-semibold">{comp.label.split(' - ')[1]}</div>
              <div className="mt-2 text-xs line-clamp-2 opacity-80">{comp.desc}</div>
            </button>
          ))}
        </div>

        {/* Selected Compartment Detail Callout */}
        {(() => {
          const activeComp = compartments.find(c => c.id === selectedCompartment) || compartments[0];
          return (
            <div className="mt-6 p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-mono text-xl font-bold text-blue-700 shrink-0">
                {activeComp.id}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-base font-bold text-slate-900">{activeComp.label}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${activeComp.tagColor}`}>
                    Variável de Estado
                  </span>
                </div>
                <p className="text-sm text-slate-700 mb-2 font-medium">{activeComp.desc}</p>
                <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                  <strong className="text-slate-900">Em linguagem simples: </strong>
                  {activeComp.layman}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Technical Equations Demystified */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>A Equação Simplificada da Transmissão</span>
          </h4>
          <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
            <div className="text-slate-400"># Equação de Novos Infectados dI/dt:</div>
            <div className="text-emerald-400 mt-1">
              dI(t)/dt = β(t) · [S(t) · I(t) / N] - (γ + ρ + ∑νᵢ) · I(t)
            </div>
            <div className="text-slate-300 mt-2 text-[11px] font-sans">
              <strong>Tradução para leigos:</strong> O número de pessoas infectadas cresce na proporção do contato entre suscetíveis (S) e doentes (I), 
              mas cai conforme as pessoas se recuperam (γ), vêm a óbito (ρ) ou são vacinadas (ν). 
              A vacina drena os indivíduos da rota de perigo antes que eles transmitam ou morram.
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Deep Dive into the 3 Attached Peer-Reviewed Articles */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
          <span>Acervo Científico de Evidências</span>
          <span aria-hidden="true">·</span>
          <span>Peer-Reviewed Literature</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Os 3 Estudos de Referência Utilizados
        </h3>
        <p className="text-sm text-slate-600 mb-6 max-w-2xl">
          Nenhum dado desta plataforma é inventado: todos os números, gráficos e cálculos derivam diretamente das publicações em anexo.
        </p>

        {/* Tab Selector for the 3 Articles */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          {SCIENTIFIC_ARTICLES.map(article => (
            <button
              key={article.id}
              onClick={() => setActiveArticleId(article.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors text-left ${
                activeArticleId === article.id
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {article.journal.split(' (')[0]} · {article.year}
            </button>
          ))}
        </div>

        {/* Article Deep-Dive Card */}
        <div className="mt-6 p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                <span>{selectedArticle.journal}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.year}</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {selectedArticle.title}
              </h4>
              <p className="text-xs text-slate-600 mt-2">
                <strong>Autores:</strong> {selectedArticle.authors.join(', ')}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                <strong>Instituições:</strong> {selectedArticle.institutions.join(' · ')}
              </p>
            </div>

            <a
              href={selectedArticle.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>Ver PDF Original Anexado</span>
            </a>
          </div>

          {/* Demystification Question & Answer Box */}
          <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{selectedArticle.demystification.question}</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedArticle.demystification.laymanAnswer}
            </p>
            <div className="pt-2 text-xs text-slate-600 border-t border-blue-100">
              <strong className="text-blue-950">Rigor metodológico: </strong>
              {selectedArticle.demystification.mathematicalMethod}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div>
            <h5 className="text-xs uppercase font-semibold text-slate-500 tracking-wider mb-3">
              Métricas Consolidadas no Artigo
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedArticle.keyMetrics.map((km, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-xs text-slate-500 font-medium mb-1">{km.label}</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 tabular-nums">
                    {km.value}
                  </div>
                  {km.ci95 && (
                    <div className="text-[11px] font-mono text-blue-700 font-medium mt-0.5">
                      IC 95%: {km.ci95}
                    </div>
                  )}
                  <div className="mt-2 text-xs text-slate-600 leading-snug">{km.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Counterfactual Insights */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <h5 className="text-xs uppercase font-semibold text-slate-700 tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Conclusões Contrafactuais Comprovadas</span>
            </h5>
            <ul className="space-y-2 text-xs text-slate-700">
              {selectedArticle.counterfactualInsights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold shrink-0">→</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
