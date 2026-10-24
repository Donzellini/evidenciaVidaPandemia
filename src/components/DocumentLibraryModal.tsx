import React, { useState } from 'react';
import { ALL_ATTACHED_DOCUMENTS } from '../data/allAttachedFiles';
import { X, Search, FileText, Download, ExternalLink, BookCheck, Shield } from 'lucide-react';

interface DocumentLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentLibraryModal: React.FC<DocumentLibraryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'scientific_paper' | 'news_investigation'>('all');

  if (!isOpen) return null;

  const filteredDocs = ALL_ATTACHED_DOCUMENTS.filter(doc => {
    const matchType = filterType === 'all' || doc.type === filterType;
    const matchSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
              <BookCheck className="w-4 h-4" />
              <span>Acervo Oficial de Evidências</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Biblioteca de Documentos & Arquivos Anexados
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Todos os 28 arquivos originais citados na plataforma estão disponíveis para conferência pública.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrar por título, autor, jornal ou termo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-lg shrink-0 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterType === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({ALL_ATTACHED_DOCUMENTS.length})
            </button>
            <button
              onClick={() => setFilterType('scientific_paper')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterType === 'scientific_paper' ? 'bg-white text-blue-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Artigos Científicos (3)
            </button>
            <button
              onClick={() => setFilterType('news_investigation')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterType === 'news_investigation' ? 'bg-white text-rose-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Reportagens (25)
            </button>
          </div>
        </div>

        {/* Document List */}
        <div className="p-6 overflow-y-auto space-y-3 divide-y divide-slate-100 flex-1">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <span className={`px-2 py-0.5 rounded font-semibold ${
                    doc.type === 'scientific_paper'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {doc.type === 'scientific_paper' ? 'Artigo Científico' : 'Investigação / Notícia'}
                  </span>
                  <span className="text-slate-500">{doc.source}</span>
                  {doc.date && <span className="text-slate-400">· {doc.date}</span>}
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {doc.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {doc.description}
                </p>
              </div>

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
          ))}

          {filteredDocs.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs">
              Nenhum documento encontrado para a busca especificada.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Total catalogado: 28 arquivos em formato PDF original</span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
