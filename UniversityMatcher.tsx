import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, GraduationCap, ChevronDown, ChevronRight, MapPin, Calculator, Info, Loader2, Sparkles } from 'lucide-react';
import { University, AppTab, APSResult, AIResponse } from '../types';
import { matchUniversities } from '../services/aiService';

interface UniversityMatcherProps {
  apsData: APSResult | null;
  onTabChange: (tab: AppTab) => void;
}

const UniversityMatcher: React.FC<UniversityMatcherProps> = ({ apsData, onTabChange }) => {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [search, setSearch] = useState('');

  const fetchMatches = async () => {
    if (!apsData) return;
    setLoading(true);
    try {
      const res = await matchUniversities(apsData.totalScore, apsData.subjects);
      setAiResponse(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apsData && !aiResponse) {
      fetchMatches();
    }
  }, [apsData]);

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-app-text font-extrabold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  if (!apsData) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-app-card rounded-[2rem] border-2 border-dashed border-app-border flex items-center justify-center mb-8 shadow-2xl">
           <Calculator className="text-purple-500" size={40} />
        </div>
        <h3 className="text-3xl font-black text-app-text mb-4 uppercase">No APS Data Found</h3>
        <p className="text-app-muted text-lg mb-10 leading-relaxed">
          We need your marks to accurately match you with universities. Use our elite calculator first.
        </p>
        <button 
          onClick={() => onTabChange(AppTab.APS_CALC)}
          className="bg-app-text text-app-body font-black py-5 px-10 rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-xl"
        >
          OPEN APS CALCULATOR <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-5xl font-black text-app-text tracking-tight mb-3 uppercase">University <span className="pulse-gradient-text">Matcher</span></h2>
          <p className="text-app-muted text-lg">AI-powered university compatibility analysis</p>
        </div>
        <div className="flex items-center gap-4 p-4 bg-app-card border border-app-border rounded-2xl shadow-lg">
           <div className="text-right">
             <p className="text-xs font-black text-app-muted uppercase tracking-widest">Calculated APS</p>
             <p className="text-3xl font-black pulse-gradient-text leading-none">{apsData.totalScore}</p>
           </div>
           <button 
             onClick={() => onTabChange(AppTab.APS_CALC)}
             className="p-3 bg-app-input rounded-xl hover:bg-app-cardHover transition-colors"
           >
             <Calculator size={20} />
           </button>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-[2.5rem] mb-12 space-y-4 shadow-2xl border-white/5">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-app-muted group-focus-within:text-purple-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search universities or keywords (e.g. Engineering, Cape Town)..."
            className="w-full bg-app-input border border-app-border rounded-2xl py-5 pl-14 pr-6 text-app-text text-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 text-app-muted text-sm px-2">
          <Info size={16} className="text-purple-500" />
          <span className="font-medium italic">Our AI cross-references your marks with 2025/2026 Prospectuses.</span>
        </div>
      </div>

      {loading ? (
        <div className="glass-panel py-24 rounded-[3rem] flex flex-col items-center justify-center text-center">
           <div className="relative mb-8">
              <Loader2 size={64} className="text-purple-500 animate-spin" />
              <Sparkles className="absolute -top-2 -right-2 text-pink-500 animate-pulse" size={24} />
           </div>
           <h3 className="text-2xl font-black text-app-text mb-2 uppercase tracking-tight">Scanning Prospectuses</h3>
           <p className="text-app-muted font-medium">Checking Wits, UCT, UP, UJ, and more for your best matches...</p>
        </div>
      ) : aiResponse && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-fadeIn">
          <div className="lg:col-span-2 glass-panel p-8 md:p-12 rounded-[3rem] shadow-2xl">
             <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="text-purple-500" size={28} />
                <h3 className="text-2xl font-black text-app-text uppercase tracking-tight">Personalized Report</h3>
             </div>
             <div className="prose prose-invert prose-lg max-w-none space-y-4">
                {aiResponse.text.split('\n').map((line, i) => {
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
             <div className="glass-panel p-8 rounded-[2.5rem] border border-green-500/20 shadow-xl">
                <h4 className="text-xs font-black text-green-500 uppercase tracking-[0.2em] mb-6">Official Sources</h4>
                <div className="space-y-4">
                  {aiResponse.groundingChunks?.map((chunk, idx) => chunk.web?.uri && (
                    <a 
                      key={idx} 
                      href={chunk.web.uri} 
                      target="_blank" 
                      rel="noreferrer"
                      className="block p-5 bg-app-card border border-app-border rounded-2xl hover:border-green-500 transition-all group shadow-sm"
                    >
                      <p className="text-[10px] font-black text-app-muted mb-1 truncate uppercase tracking-widest">{new URL(chunk.web.uri).hostname}</p>
                      <div className="text-sm font-black text-app-text group-hover:text-green-500 flex items-center justify-between">
                         {chunk.web.title} <ExternalLink size={16} />
                      </div>
                    </a>
                  ))}
                  {(!aiResponse.groundingChunks || aiResponse.groundingChunks.length === 0) && (
                    <p className="text-sm text-app-muted italic">No direct prospectus links found. Our AI is using verified internal knowledge base.</p>
                  )}
                </div>
             </div>
             
             <div className="p-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                  <GraduationCap size={160} />
                </div>
                <h4 className="text-lg font-black mb-2 uppercase tracking-tight">Need Advice?</h4>
                <p className="text-sm text-white/80 mb-6 font-medium">Chat with our AI Mentor to get specific career path suggestions based on your interests.</p>
                <button 
                  onClick={() => onTabChange(AppTab.AI_ASSISTANT)}
                  className="w-full py-4 bg-white text-purple-600 rounded-xl font-black text-sm uppercase shadow-lg hover:bg-white/90 transition-all"
                >
                  CHAT WITH MENTOR
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityMatcher;