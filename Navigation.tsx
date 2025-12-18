import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Calculator, Briefcase, Bot, Home, BookOpen, Sun, Moon, Heart } from 'lucide-react';
import { AppTab } from '../types';

interface NavigationProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange, theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { id: AppTab.HOME, label: 'Home', icon: Home },
    { id: AppTab.STUDY_RESOURCES, label: 'Study Tools', icon: BookOpen },
    { id: AppTab.APS_CALC, label: 'APS Calc', icon: Calculator },
    { id: AppTab.UNI_MATCH, label: 'Uni Matcher', icon: GraduationCap },
    { id: AppTab.LEARNERSHIPS, label: 'Bursaries', icon: Briefcase },
    { id: AppTab.AI_ASSISTANT, label: 'AI Mentor', icon: Bot },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-app-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-shrink-0 flex items-center cursor-pointer z-50 relative" onClick={() => { onTabChange(AppTab.HOME); setIsMenuOpen(false); }}>
            <span className="text-2xl font-extrabold tracking-tighter text-app-text flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
                <span className="text-white text-xs">M+</span>
              </div>
              MATRIC<span className="pulse-gradient-text">PULSE</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => (
                <button
                  id={`nav-${item.id}`}
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                    currentTab === item.id
                      ? 'bg-app-text text-app-body shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                      : 'text-app-muted hover:text-app-text hover:bg-app-text/5'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-app-border mx-2"></div>

            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2 px-4 py-2 bg-app-card border border-app-border rounded-xl text-sm font-bold text-app-text hover:bg-app-cardHover transition-all active:scale-95"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={18} className="text-yellow-500" />
                  <span>LIGHT MODE</span>
                </>
              ) : (
                <>
                  <Moon size={18} className="text-purple-500" />
                  <span>DARK MODE</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:hidden z-50 relative flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl bg-app-card border border-app-border text-app-text hover:bg-app-cardHover transition-all active:scale-90"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-purple-500" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-app-text p-2 rounded-full hover:bg-app-text/10 transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 bg-app-body z-40 transition-transform duration-300 lg:hidden flex flex-col pt-24 px-6 h-[100dvh] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex-1 overflow-y-auto space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-6 py-4 rounded-2xl text-lg font-bold flex items-center gap-4 transition-all ${
                  currentTab === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-app-muted hover:bg-app-text/5'
                }`}
              >
                <item.icon size={24} className={currentTab === item.id ? 'text-white' : 'text-purple-400'} />
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="mt-auto mb-10 space-y-3 pb-4 border-t border-app-border pt-6">
            <button 
              onClick={() => { onTabChange(AppTab.STUDY_RESOURCES); setIsMenuOpen(false); }}
              className="w-full py-4 rounded-2xl border-2 border-app-text text-app-text font-black flex items-center justify-center gap-2"
            >
              <BookOpen size={20} />
              START STUDYING
            </button>
            <button 
              onClick={() => { onTabChange(AppTab.CRISIS_SUPPORT); setIsMenuOpen(false); }}
              className="w-full py-4 rounded-2xl bg-white text-red-600 font-black flex items-center justify-center gap-2 shadow-xl"
            >
              <Heart size={20} className="fill-red-600" />
              CRISIS SUPPORT
            </button>
          </div>
      </div>
    </nav>
  );
};

export default Navigation;