import React, { useState } from 'react';
import { Shield, CheckCircle, BookOpen, MessageCircle, GraduationCap, Heart, Calculator, ChevronDown, ChevronUp, Zap, Target, Search, Sparkles } from 'lucide-react';
import { AppTab } from '../types';

interface HeroProps {
  onCrisisClick: () => void;
  onCtaClick: (tab: AppTab) => void;
}

const Hero: React.FC<HeroProps> = ({ onCrisisClick, onCtaClick }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const steps = [
    { icon: <Target size={20} />, title: "SNAP", desc: "Scan any textbook" },
    { icon: <Search size={20} />, title: "SYNC", desc: "Live Prospectuses" },
    { icon: <Zap size={20} />, title: "SCORE", desc: "Ace your future" }
  ];

  const faqs = [
    { q: "Is it really free?", a: "Yes, 100%. We believe education tools should be accessible to every student in Mzansi without a price tag." },
    { q: "Is it CAPS aligned?", a: "Absolutely. Our AI is specialized in the South African NSC curriculum, from Maths to Life Sciences." },
    { q: "Is my data private?", a: "We are fully POPIA compliant. Your results and images stay in your browser session or are processed securely." }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen pt-32 md:pt-48 pb-20 px-4">
      {/* Dynamic Background Effects */}
      <div className="absolute top-20 left-[10%] w-[40rem] h-[40rem] bg-purple-600/5 rounded-full blur-[140px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-20 right-[10%] w-[35rem] h-[35rem] bg-pink-600/5 rounded-full blur-[140px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fadeIn">
          <div className="flex items-center gap-2 px-5 py-2.5 bg-app-card border border-app-border rounded-full shadow-sm hover:border-purple-500/30 transition-colors group">
            <CheckCircle size={14} className="text-green-500 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black tracking-[0.15em] text-app-muted uppercase">POPIA COMPLIANT</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 bg-app-card border border-app-border rounded-full shadow-sm hover:border-purple-500/30 transition-colors group">
            <Shield size={14} className="text-purple-500 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black tracking-[0.15em] text-app-muted uppercase">CAPS ALIGNED</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="relative mb-10 group animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <div className="absolute -top-12 -right-12 hidden md:block animate-float">
            <Sparkles className="text-purple-500 opacity-20" size={64} />
          </div>
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter text-app-text leading-[0.85] max-w-5xl">
            OWN YOUR <br />
            <span className="pulse-gradient-text">FUTURE.</span>
          </h1>
        </div>

        <p className="max-w-2xl text-lg md:text-2xl text-app-muted mb-16 px-4 leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          The elite AI-powered platform for South African Matric success. 
          Calculate APS, match degrees, and find bursaries in one place.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl mb-24 px-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <button 
            onClick={() => onCtaClick(AppTab.STUDY_RESOURCES)}
            className="flex-[1.5] bg-app-text text-app-body hover:scale-[1.03] active:scale-95 transition-all py-7 rounded-[2rem] font-black shadow-2xl flex items-center justify-center gap-3 group text-xl"
          >
            <BookOpen size={24} className="group-hover:text-purple-500 transition-colors" />
            START STUDYING
          </button>
          <button 
            onClick={onCrisisClick}
            className="flex-1 bg-white text-red-600 border border-red-100 hover:bg-red-50 py-7 rounded-[2rem] font-black shadow-xl flex items-center justify-center gap-3 text-xl transition-all active:scale-95"
          >
            <Heart size={24} className="fill-red-600" />
            HELP
          </button>
        </div>

        {/* Feature Blueprint */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-20 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          {steps.map((s, i) => (
            <div key={i} className="glass-panel p-6 rounded-[2.5rem] flex flex-col items-center gap-4 hover:border-purple-500/50 hover:shadow-2xl transition-all group">
              <div className="w-16 h-16 bg-app-input rounded-2xl flex items-center justify-center text-purple-500 group-hover:scale-110 group-hover:bg-purple-500/10 transition-all duration-500">
                {s.icon}
              </div>
              <div>
                <p className="text-sm font-black text-app-text uppercase tracking-widest mb-1">{s.title}</p>
                <p className="text-xs font-bold text-app-muted uppercase leading-tight">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Intel (FAQs) */}
        <div className="w-full max-w-2xl space-y-3 mb-24 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="h-px w-12 bg-app-border"></div>
            <span className="text-[10px] font-black text-app-muted uppercase tracking-[0.4em]">Quick Intel</span>
            <div className="h-px w-12 bg-app-border"></div>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="glass-panel rounded-2xl overflow-hidden border border-app-border/30 hover:border-app-border transition-colors">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-app-text/[0.02] transition-colors"
                >
                  <span className="text-sm font-black text-app-text uppercase tracking-wide">{f.q}</span>
                  {activeFaq === i ? <ChevronUp size={18} className="text-purple-500" /> : <ChevronDown size={18} className="text-app-muted" />}
                </button>
                {activeFaq === i && (
                  <div className="px-8 pb-6 animate-fadeIn">
                    <p className="text-sm font-medium text-app-muted leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Shortcuts */}
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 text-xs font-black text-app-muted uppercase tracking-[0.2em] border-t border-app-border/50 pt-16 w-full max-w-5xl">
           <button onClick={() => onCtaClick(AppTab.APS_CALC)} className="hover:text-purple-500 hover:-translate-y-1 transition-all flex items-center gap-3">
             <Calculator size={20} className="text-purple-500" /> APS ENGINE
           </button>
           <button onClick={() => onCtaClick(AppTab.UNI_MATCH)} className="hover:text-pink-500 hover:-translate-y-1 transition-all flex items-center gap-3">
             <GraduationCap size={20} className="text-pink-500" /> UNI MATCHER
           </button>
           <button onClick={() => onCtaClick(AppTab.LEARNERSHIPS)} className="hover:text-green-500 hover:-translate-y-1 transition-all flex items-center gap-3">
             <MessageCircle size={20} className="text-green-500" /> BURSARIES
           </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;