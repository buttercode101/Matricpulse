import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Loader2, Info, GraduationCap, Calendar, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { findOpportunities } from '../services/aiService';
import { AIResponse } from '../types';

const OpportunityFinder: React.FC = () => {
  const [search, setSearch] = useState('Bursaries for Grade 12');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const performSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await findOpportunities(query);
      setResult(res);
    } catch (err) {
      setError("Eish, we couldn't fetch live data right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch(search);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(search);
  };

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-app-text font-black">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 max-w-5xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-5xl font-black text-app-text tracking-tight mb-3 uppercase">Opportunity <span className="pulse-gradient-text">Finder</span></h2>
          <p className="text-app-muted text-lg">AI-powered search for live bursaries, learnerships, and funding.</p>
        </div>
      </div>

      <form onSubmit={handleSearchSubmit} className="glass-panel p-6 rounded-[2.5rem] mb-12 space-y-4 shadow-xl">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-app-muted group-focus-within:text-purple-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="e.g. Engineering Bursaries, Retail Learnerships, NSFAS updates..."
            className="w-full bg-app-input border border-app-border rounded-2xl py-5 pl-14 pr-6 text-app-text text-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-600 text-white px-6 py-3 rounded-xl font-black text-sm uppercase hover:bg-purple-500 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "SEARCH"}
          </button>
        </div>
        <div className="flex items-center gap-3 text-app-muted text-xs px-2 italic">
          <Info size={14} className="text-purple-500" />
          <span>Our AI scans live web data for current 2025/2026 application windows.</span>
        </div>
      </form>

      {loading ? (
        <div className="glass-panel py-32 rounded-[3rem] flex flex-col items-center justify-center text-center">
           <div className="relative mb-8">
              <Loader2 size={64} className="text-purple-500 animate-spin" />
              <Sparkles className="absolute -top-2 -right-2 text-pink-500 animate-pulse" size={24} />
           </div>
           <h3 className="text-2xl font-black text-app-text mb-2 uppercase tracking-tight">Scanning Mzansi</h3>
           <p className="text-app-muted font-medium">Looking for open bursaries and funding opportunities...</p>
        </div>
      ) : error ? (
        <div className="glass-panel p-12 rounded-[3rem] text-center border-red-500/20">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-black text-app-text mb-2">{error}</h3>
          <button 
            onClick={() => performSearch(search)}
            className="mt-6 px-8 py-3 bg-app-text text-app-body rounded-xl font-black"
          >
            RETRY SEARCH
          </button>
        </div>
      ) : result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fadeIn">
          <div className="lg:col-span-2 glass-panel p-8 md:p-12 rounded-[3rem] shadow-2xl">
             <div className="flex items-center gap-3 mb-8">
                <Sparkles className="text-purple-500" size={28} />
                <h3 className="text-2xl font-black text-app-text uppercase tracking-tight">Top Results</h3>
             </div>
             <div className="prose prose-invert prose-lg max-w-none space-y-4">
                {result.text.split('\n').map((line, i) => {
                  const trimmed = line.trim();
                  if (!trimmed) return <br key={i} />;
                  if (trimmed.startsWith('##')) return <h2 key={i} className="text-2xl font-black text-purple-400 mt-8 mb-4">{renderFormattedText(trimmed.replace(/^##\s*/, ''))}</h2>;
                  if (trimmed.startsWith('###')) return <h3 key={i} className="text-xl font-bold text-pink-400 mt-6 mb-2">{renderFormattedText(trimmed.replace(/^###\s*/, ''))}</h3>;
                  if (trimmed.startsWith('*') || trimmed.startsWith('-')) return <li key={i} className="ml-6 text-app-text/90 mb-2 list-disc marker:text-purple-500">{renderFormattedText(trimmed.replace(/^[-*]\s*/, ''))}</li>;
                  return <p key={i} className="text-app-text/90 mb-4 leading-relaxed font-medium">{renderFormattedText(line)}</p>;
                })}
             </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
             <div className="glass-panel p-8 rounded-[2.5rem] border border-blue-500/20 shadow-xl">
                <h4 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] mb-6">Direct Links</h4>
                <div className="space-y-4">
                  {result.groundingChunks?.map((chunk, idx) => chunk.web?.uri && (
                    <a 
                      key={idx} 
                      href={chunk.web.uri} 
                      target="_blank" 
                      rel="noreferrer"
                      className="block p-5 bg-app-card border border-app-border rounded-2xl hover:border-blue-500 transition-all group shadow-sm"
                    >
                      <p className="text-[10px] font-black text-app-muted mb-1 truncate uppercase tracking-widest">{new URL(chunk.web.uri).hostname}</p>
                      <div className="text-sm font-black text-app-text group-hover:text-blue-500 flex items-center justify-between">
                         {chunk.web.title} <ExternalLink size={16} />
                      </div>
                    </a>
                  ))}
                  {(!result.groundingChunks || result.groundingChunks.length === 0) && (
                    <p className="text-sm text-app-muted italic">No direct links extracted. Please use the search terms provided in the report.</p>
                  )}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunityFinder;