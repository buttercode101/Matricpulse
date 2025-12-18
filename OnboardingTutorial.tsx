import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, Camera, Calculator, GraduationCap, Bot } from 'lucide-react';
import { AppTab } from '../types';

interface OnboardingTutorialProps {
  onComplete: () => void;
  onTabChange: (tab: AppTab) => void;
}

const STEPS = [
  {
    title: "Welcome to MatricPulse!",
    text: "Your AI-powered study companion for Matric success. Let us show you around.",
    icon: Sparkles,
    tab: AppTab.HOME
  },
  {
    title: "Snap & Study",
    text: "Upload a photo of your textbook or type any topic. Our AI will break it down into easy-to-understand summaries, flashcards, and quizzes.",
    icon: Camera,
    tab: AppTab.STUDY_RESOURCES
  },
  {
    title: "Calculate Your APS",
    text: "Enter your subjects and marks to calculate your Admission Point Score. We use official NSC standards with Life Orientation capped at 3 points.",
    icon: Calculator,
    tab: AppTab.APS_CALC
  },
  {
    title: "Find Your Perfect University",
    text: "Get matched with universities and programs based on your APS. Our AI searches live data to find the best options for you.",
    icon: GraduationCap,
    tab: AppTab.UNI_MATCH
  },
  {
    title: "AI Mentor – Always Here",
    text: "Chat with our AI in any of the 11 official South African languages. Get help with homework, career advice, or just someone to talk to.",
    icon: Bot,
    tab: AppTab.AI_ASSISTANT
  }
];

const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onComplete, onTabChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('has_seen_tutorial_v3');
    if (!hasSeenTutorial) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (STEPS[nextStep].tab) {
        onTabChange(STEPS[nextStep].tab);
      }
    } else {
      finishTour();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      if (STEPS[prevStep].tab) {
        onTabChange(STEPS[prevStep].tab);
      }
    }
  };

  const finishTour = () => {
    if (dontShowAgain) {
      localStorage.setItem('has_seen_tutorial_v3', 'true');
    }
    setIsVisible(false);
    onComplete();
    onTabChange(AppTab.HOME);
  };

  if (!isVisible) return null;

  const step = STEPS[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#11131a] border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden animate-fadeIn">
        <div className="p-8 pb-4 relative">
          <button 
            onClick={finishTour}
            className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center mt-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-purple-500/20">
              <Icon size={32} className="text-white" />
            </div>

            <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
              {step.title}
            </h3>
            
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 px-2">
              {step.text}
            </p>

            <div className="flex gap-2 mb-8">
              {STEPS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 transition-all duration-300 rounded-full ${i === currentStep ? 'w-8 bg-purple-500' : 'w-2 bg-gray-700'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 py-6 border-t border-white/5 flex items-center justify-between bg-white/[0.02]">
          <button 
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-1 font-bold text-sm transition-opacity ${currentStep === 0 ? 'opacity-0' : 'text-gray-400 hover:text-white'}`}
          >
            <ChevronLeft size={18} />
            Back
          </button>

          <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            {currentStep + 1} of {STEPS.length}
          </div>

          <button 
            onClick={handleNext}
            className="bg-purple-600 hover:bg-purple-500 text-white font-black py-3 px-6 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-500/10"
          >
            {currentStep === STEPS.length - 1 ? "Let's Go!" : 'Next'}
            {currentStep < STEPS.length - 1 && <ChevronRight size={18} />}
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 animate-fadeIn">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input 
              type="checkbox" 
              className="peer hidden"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
            />
            <div className="w-5 h-5 border-2 border-gray-600 rounded peer-checked:bg-purple-600 peer-checked:border-purple-600 transition-all flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <span className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors">
            Don't show this again
          </span>
        </label>

        <button 
          onClick={finishTour}
          className="text-gray-500 text-sm font-bold hover:text-white transition-colors underline underline-offset-4 decoration-gray-700"
        >
          Skip tutorial
        </button>
      </div>
    </div>
  );
};

export default OnboardingTutorial;