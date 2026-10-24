import React, { useState } from 'react';
import { ALL_ATTACHED_DOCUMENTS } from '../data/allAttachedFiles';
import { Search, FileText, Download, BookCheck, ExternalLink, Filter } from 'lucide-react';

export const DocumentLibrarySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'scientific_paper' | 'news_investigation'>('all');

  const filteredDocs = ALL_ATTACHED_DOCUMENTS.filter((doc) => {
    const matchType = filterType === 'all' || doc.type === filterType;
    const matchSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
          <span>Acervo Completo de Fontes</span>
          <span aria-hidden="true">·</span>
          <span>Transparência Pública e Acesso aos Arquivos</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Biblioteca de Fontes & Documentos Oficiais
        </h2>
        <p className="mt-2 text-slate-600 max-w-3xl leading-relaxed text-sm">
          Acesse diretamente todos os 28 arquivos originais citados nesta plataforma: 
          os 3 artigos científicos revisados por pares e as 25 investigações jornalísticas com 
          inquéritos do MPF, CPI da Pandemia e decisões do STF. Você pode abrir e baixar qualquer PDF original.
        </p>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por título, autor, jornal ou termo-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg shrink-0 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({ALL_ATTACHED_DOCUMENTS.length})
            </button>
            <button
              onClick={() => setFilterType('scientific_paper')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterType === 'scientific_paper'
                  ? 'bg-white text-blue-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Artigos Científicos (3)
            </button>
            <button
              onClick={() => setFilterType('news_investigation')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterType === 'news_investigation'
                  ? 'bg-white text-rose-700 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Reportagens e Inquéritos (25)
            </button>
          </div>
        </div>
      </div>

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                <span
                  className={`px-2 py-0.5 rounded font-semibold ${
                    doc.type === 'scientific_paper'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {doc.type === 'scientific_paper' ? 'Artigo Científico' : 'Investigação Jornalística'}
                </span>
                <span className="text-slate-400">{doc.date || 'Estudo'}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {doc.title}
              </h4>

              <div className="text-xs font-medium text-slate-500">
                Veículo / Periódico: <strong className="text-slate-700">{doc.source}</strong>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {doc.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400 font-mono truncate">
                {doc.pdfPath.split('/').pop()}
              </span>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={doc.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Abrir PDF</span>
                </a>
                <a
                  href={doc.pdfPath}
                  download
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                  title="Baixar arquivo PDF"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}

        {filteredDocs.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400 text-xs">
            Nenhum documento encontrado para a busca especificada.
          </div>
        )}
      </div>
    </div>
  );
};
