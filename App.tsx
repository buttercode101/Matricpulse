import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import StudyResources from './components/StudyResources';
import APSCalculator from './components/APSCalculator';
import UniversityMatcher from './components/UniversityMatcher';
import OpportunityFinder from './components/OpportunityFinder';
import AIMentor from './components/AIMentor';
import CrisisSupport from './components/CrisisSupport';
import CrisisModal from './components/CrisisModal';
import OnboardingTutorial from './components/OnboardingTutorial';
import Footer from './components/Footer';
import { AppTab, APSResult } from './types';

function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.HOME);
  const [apsData, setApsData] = useState<APSResult | null>(null);
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [currentTab]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const renderContent = () => {
    switch (currentTab) {
      case AppTab.HOME:
        return (
          <Hero 
            onCrisisClick={() => setCurrentTab(AppTab.CRISIS_SUPPORT)}
            onCtaClick={setCurrentTab}
          />
        );
      case AppTab.STUDY_RESOURCES:
        return <StudyResources />;
      case AppTab.APS_CALC:
        return (
          <APSCalculator 
            onCalculate={setApsData} 
            onNext={() => setCurrentTab(AppTab.UNI_MATCH)} 
          />
        );
      case AppTab.UNI_MATCH:
        return <UniversityMatcher apsData={apsData} onTabChange={setCurrentTab} />;
      case AppTab.LEARNERSHIPS:
        return <OpportunityFinder />;
      case AppTab.AI_ASSISTANT:
        return <AIMentor onCrisisTrigger={() => setCurrentTab(AppTab.CRISIS_SUPPORT)} />;
      case AppTab.CRISIS_SUPPORT:
        return <CrisisSupport />;
      default:
        return <Hero onCrisisClick={() => setCurrentTab(AppTab.CRISIS_SUPPORT)} onCtaClick={setCurrentTab} />;
    }
  };

  return (
    <div className={theme}>
      <div className="min-h-screen bg-app-body text-app-text font-sans selection:bg-purple-500 selection:text-white transition-colors duration-300">
        <div className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-[100] transition-all duration-300 ${isLoading ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>

        <Navigation 
          currentTab={currentTab} 
          onTabChange={setCurrentTab} 
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        
        <OnboardingTutorial 
          onComplete={() => console.log("Tutorial Completed")} 
          onTabChange={setCurrentTab}
        />

        <main className="relative min-h-screen">
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className={`absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen ${theme === 'light' ? 'bg-purple-500/5 mix-blend-multiply' : ''}`}></div>
            <div className={`absolute bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-pink-900/10 blur-[150px] rounded-full mix-blend-screen ${theme === 'light' ? 'bg-pink-500/5 mix-blend-multiply' : ''}`}></div>
          </div>
          
          <div className={`relative z-10 transition-all duration-500 ${isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {renderContent()}
          </div>
        </main>

        <Footer />
        <CrisisModal isOpen={isCrisisOpen} onClose={() => setIsCrisisOpen(false)} />
      </div>
    </div>
  );
}

export default App;