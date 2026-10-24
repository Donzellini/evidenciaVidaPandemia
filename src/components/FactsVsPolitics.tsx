import React, { useState, useMemo } from 'react';
import { NEWS_AND_TIMELINE } from '../data/newsAndTimeline';
import { Search, FileText, AlertCircle, CheckCircle2, Quote, ExternalLink, ShieldAlert } from 'lucide-react';

export const FactsVsPolitics: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Todos os Fatos' },
    { id: 'vacinas', label: 'Recusa & Atraso de Vacinas' },
    { id: 'corrupcao', label: 'Escândalos & CPI' },
    { id: 'desinformacao', label: 'Cloroquina & Ataques à Fiocruz' },
    { id: 'impacto-social', label: 'Impacto Social & Órfãos' }
  ];

  const filteredNews = useMemo(() => {
    return NEWS_AND_TIMELINE.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.governmentAction.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.scientificContradiction.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.keyQuote && item.keyQuote.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 mb-2">
          <span>Memória & Transparência</span>
          <span aria-hidden="true">·</span>
          <span>Investigações Jornalísticas vs Artigos Científicos</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Ciência vs Ações do Governo: A Comparação Fato a Fato
        </h2>
        <p className="mt-2 text-slate-600 max-w-3xl leading-relaxed text-sm">
          Consulte as reportagens investigativas da CPI da Covid e compare as decisões tomadas pelo 
          governo federal com as evidências empíricas publicadas em periódicos internacionais. 
          Todas as notícias possuem seus documentos e recortes originais disponíveis para consulta.
        </p>

        {/* Filter and Search */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar por tema, vacina, político ou citação..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-lg shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Cards List */}
      <div className="space-y-6">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs hover:border-slate-300 transition-colors"
          >
            {/* Meta Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span className="font-semibold text-slate-700">{item.source}</span>
                <span aria-hidden="true">·</span>
                <span>{item.date}</span>
                <span aria-hidden="true">·</span>
                <span className="capitalize">{item.category.replace('-', ' ')}</span>
              </div>

              <a
                href={item.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 hover:text-blue-900 transition-colors self-start sm:self-auto"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Consultar Matéria em PDF</span>
              </a>
            </div>

            {/* Headline & Summary */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {item.summary}
              </p>
            </div>

            {/* Key Quote Callout if present */}
            {item.keyQuote && (
              <div className="p-4 bg-slate-50 border-l-2 border-slate-400 rounded-r-xl text-xs italic text-slate-800 flex items-start gap-3">
                <Quote className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-900 font-medium font-serif text-sm">
                    "{item.keyQuote}"
                  </div>
                  {item.speaker && (
                    <div className="text-[11px] text-slate-500 not-italic font-sans mt-1">
                      — {item.speaker}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Two-Column Comparison Grid: Government Action vs Scientific Evidence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Left Column: Ação Política / O que o Governo Fez */}
              <div className="p-4 bg-rose-50/60 border border-rose-200/80 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>A Atuação Governamental Registrada</span>
                </div>
                <p className="text-xs text-rose-950 leading-relaxed">
                  {item.governmentAction}
                </p>
              </div>

              {/* Right Column: O que a Ciência Comprova */}
              <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>O que as Evidências Científicas Comprovam</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {item.scientificContradiction}
                </p>
              </div>
            </div>

            {/* Tags footer */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
              <span>Tags de Referência:</span>
              {item.tags.map(tag => (
                <span key={tag} className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
