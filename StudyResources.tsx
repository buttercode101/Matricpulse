import React, { useState, useRef } from 'react';
import { Camera, Type, Image as ImageIcon, Search, ExternalLink, Loader2, BookOpen, Sparkles } from 'lucide-react';
import { analyzeStudyMaterial } from '../services/aiService';
import { AIResponse } from '../types';

const StudyResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'camera'>('text');
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if ((activeTab === 'text' && !inputText) || (activeTab === 'camera' && !selectedImage)) return;
    setLoading(true);
    setResult(null);
    try {
      const imageBase64 = selectedImage ? selectedImage.split(',')[1] : undefined;
      const res = await analyzeStudyMaterial(inputText, imageBase64);
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-app-text font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-app-text tracking-tight mb-4">
          SNAP & <span className="pulse-gradient-text">STUDY</span>
        </h2>
        <p className="text-app-muted max-w-xl mx-auto text-lg">
          From textbook to study pack in seconds. Upload a photo or type a topic to get summaries, quizzes, and free legal book links.
        </p>
      </div>

      <div className="max-w-3xl mx-auto glass-panel rounded-[2.5rem] p-4 mb-12">
        <div className="flex bg-app-input p-1 rounded-2xl mb-6">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'text' ? 'bg-app-card text-app-text shadow-sm' : 'text-app-muted'
            }`}
          >
            <Type size={18} /> Type Topic
          </button>
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'camera' ? 'bg-app-card text-app-text shadow-sm' : 'text-app-muted'
            }`}
          >
            <Camera size={18} /> Snap Photo
          </button>
        </div>

        <div className="px-2">
          {activeTab === 'text' ? (
            <div className="space-y-4">
              <label className="block text-xs font-black text-app-muted uppercase tracking-widest">Topic or Question</label>
              <textarea
                rows={4}
                placeholder="e.g. Grade 12 Calculus, Homeostasis, Photosynthesis..."
                className="w-full bg-app-input border border-app-border text-app-text rounded-2xl p-6 focus:ring-2 focus:ring-purple-500 outline-none resize-none text-lg font-medium"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-4">
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className={`border-2 border-dashed border-app-border rounded-2xl p-12 cursor-pointer hover:bg-app-input transition-all flex flex-col items-center justify-center gap-4 ${selectedImage ? 'bg-app-input border-purple-500' : ''}`}
               >
                 {selectedImage ? (
                   <img src={selectedImage} alt="Preview" className="max-h-64 rounded-xl shadow-2xl" />
                 ) : (
                   <>
                     <div className="w-16 h-16 bg-app-card rounded-full flex items-center justify-center border border-app-border shadow-sm">
                        <ImageIcon className="text-purple-500" size={32} />
                     </div>
                     <p className="font-black text-app-text text-lg">Select Textbook Photo</p>
                   </>
                 )}
                 <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
               </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || (activeTab === 'text' && !inputText) || (activeTab === 'camera' && !selectedImage)}
            className="w-full mt-6 bg-purple-700 hover:bg-purple-600 text-white font-black py-5 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
            ANALYZE NOW
          </button>
        </div>
      </div>

      {result && (
        <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 glass-panel p-8 rounded-[2.5rem]">
              <div className="prose prose-invert prose-lg max-w-none">
                 {result.text.split('\n').map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return <br key={i} />;
                    if (trimmed.startsWith('##')) return <h2 key={i} className="text-2xl font-black text-purple-400 mt-8 mb-4">{renderFormattedText(trimmed.replace(/^##\s*/, ''))}</h2>;
                    if (trimmed.startsWith('###')) return <h3 key={i} className="text-xl font-bold text-pink-400 mt-6 mb-2">{renderFormattedText(trimmed.replace(/^###\s*/, ''))}</h3>;
                    return <p key={i} className="text-app-text/90 mb-4 leading-relaxed">{renderFormattedText(line)}</p>;
                 })}
              </div>
           </div>
           <div className="lg:col-span-1 space-y-6">
              <div className="glass-panel p-6 rounded-3xl border border-purple-500/20">
                <h4 className="text-sm font-black text-purple-400 uppercase tracking-widest mb-4">Study Links</h4>
                <div className="space-y-3">
                  {result.groundingChunks?.map((chunk, idx) => chunk.web?.uri && (
                    <a key={idx} href={chunk.web.uri} target="_blank" className="block p-4 bg-app-card border border-app-border rounded-xl hover:border-purple-500 transition-all group">
                       <p className="text-xs font-bold text-app-muted mb-1 truncate">{chunk.web.uri}</p>
                       <p className="text-sm font-black text-app-text group-hover:text-purple-500 flex items-center justify-between">
                         {chunk.web.title} <ExternalLink size={14} />
                       </p>
                    </a>
                  ))}
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default StudyResources;