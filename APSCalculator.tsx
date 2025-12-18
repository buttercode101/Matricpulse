import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowRight, Calculator, Info, Sparkles } from 'lucide-react';
import { Subject, APSResult, SUBJECT_OPTIONS } from '../types';

interface APSCalculatorProps {
  onCalculate: (result: APSResult) => void;
  onNext: () => void;
}

const APSCalculator: React.FC<APSCalculatorProps> = ({ onCalculate, onNext }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    // Initial subjects
    setSubjects([
      { id: '1', name: 'English Home Language', percent: 0 },
      { id: '2', name: 'Mathematics', percent: 0 },
      { id: '3', name: 'Life Orientation', percent: 0 },
      { id: '4', name: 'Physical Sciences', percent: 0 },
    ]);
  }, []);

  const [result, setResult] = useState<APSResult | null>(null);

  const calculatePoints = (percent: number) => {
    if (percent >= 80) return 7;
    if (percent >= 70) return 6;
    if (percent >= 60) return 5;
    if (percent >= 50) return 4;
    if (percent >= 40) return 3;
    if (percent >= 30) return 2;
    if (percent > 0) return 1;
    return 0;
  };

  const handleCalculate = () => {
    let total = 0;
    const breakdown: { subject: string; points: number }[] = [];

    const validSubjects = subjects.filter(s => s.name && s.percent > 0);
    
    // Official APS rule: Top 6 subjects + specific weighting for LO (often 1-3 pts or 0)
    // Most unis: Top 6 subjects excluding LO, or LO capped at 3.
    const loSubject = validSubjects.find(s => s.name.toLowerCase().includes("life orientation"));
    const otherSubjects = validSubjects.filter(s => !s.name.toLowerCase().includes("life orientation"));

    otherSubjects.sort((a, b) => calculatePoints(b.percent) - calculatePoints(a.percent));

    // Universities usually take the top 6 subjects excluding LO
    const top6 = otherSubjects.slice(0, 6);
    
    top6.forEach(s => {
      const pts = calculatePoints(s.percent);
      total += pts;
      breakdown.push({ subject: s.name, points: pts });
    });

    // Handle LO if present (usually max 3 points in SA context if included at all)
    if (loSubject) {
      const loPts = Math.min(3, Math.floor(calculatePoints(loSubject.percent) / 2)); 
      // Simplified: LO points are usually lower value.
      total += loPts;
      breakdown.push({ subject: loSubject.name, points: loPts });
    }

    const calculatedResult = { totalScore: total, breakdown, subjects: validSubjects };
    setResult(calculatedResult);
    onCalculate(calculatedResult);
  };

  const updateSubject = (id: string, field: keyof Subject, value: string | number) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addSubject = () => {
    if (subjects.length < 12) {
      setSubjects([...subjects, { id: Date.now().toString(), name: '', percent: 0 }]);
    }
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-5xl font-black text-app-text tracking-tight mb-3 uppercase">APS <span className="pulse-gradient-text">Engine</span></h2>
        <p className="text-app-muted text-lg">Calculate your Admission Point Score using official NSC standards.</p>
      </div>
      
      <div className="glass-panel p-6 md:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Calculator size={160} />
        </div>

        <div className="space-y-4 relative z-10">
          {subjects.map((subject, index) => (
            <div key={subject.id} className="flex flex-col md:flex-row gap-4 items-center animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="w-full md:w-8 text-app-muted font-black text-xs uppercase tracking-widest">{index + 1}</div>
              
              <div className="flex-1 w-full">
                <select 
                  className="w-full bg-app-input border border-app-border text-app-text rounded-2xl px-5 py-4 focus:ring-2 focus:ring-purple-500 outline-none appearance-none font-bold shadow-sm"
                  value={subject.name}
                  onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                >
                  <option value="">Select Subject</option>
                  {SUBJECT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-32 relative">
                <input 
                  type="number" 
                  placeholder="%" 
                  max="100"
                  min="0"
                  className="w-full bg-app-input border border-app-border text-app-text rounded-2xl px-5 py-4 focus:ring-2 focus:ring-purple-500 outline-none text-center font-black text-lg shadow-sm"
                  value={subject.percent || ''}
                  onChange={(e) => updateSubject(subject.id, 'percent', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-app-muted font-bold">%</span>
              </div>

              <button 
                onClick={() => removeSubject(subject.id)}
                className="p-4 text-app-muted hover:text-red-500 transition-colors bg-app-card border border-app-border rounded-2xl shadow-sm hover:border-red-500/30"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4 relative z-10">
          <button 
            onClick={addSubject}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-dashed border-app-border text-app-muted font-black uppercase text-xs hover:text-app-text hover:border-purple-500 transition-all tracking-widest"
          >
            <Plus size={16} /> Add Subject
          </button>
        </div>

        <div className="mt-12 pt-10 border-t border-app-border flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="w-full md:w-auto">
            <button 
              onClick={handleCalculate}
              className="w-full px-12 py-5 bg-app-text text-app-body font-black rounded-[2rem] hover:scale-[1.03] transition-all shadow-2xl flex items-center justify-center gap-3 text-lg"
            >
              CALCULATE SCORE
            </button>
          </div>

          {result && (
            <div className="flex items-center gap-8 animate-fadeIn">
              <div className="text-right">
                <div className="text-[10px] text-app-muted uppercase tracking-[0.3em] font-black mb-1">YOUR APS</div>
                <div className="text-7xl font-black pulse-gradient-text leading-none">{result.totalScore}</div>
              </div>
              <button 
                onClick={onNext}
                className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-3xl text-white shadow-2xl hover:scale-110 active:scale-95 transition-all group"
              >
                <ArrowRight size={32} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center gap-3 text-app-muted text-xs p-4 bg-app-input/50 rounded-2xl italic">
           <Info size={14} className="text-purple-500 flex-shrink-0" />
           <span>This score uses the official 1-7 point scale. Life Orientation is capped at 3 points in this calculation.</span>
        </div>
      </div>
    </div>
  );
};

export default APSCalculator;