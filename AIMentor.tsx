import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, MessageSquare } from 'lucide-react';
import { ChatMessage, SA_LANGUAGES } from '../types';
import { chatWithMentor } from '../services/aiService';

interface AIMentorProps {
  onCrisisTrigger: () => void;
}

const AIMentor: React.FC<AIMentorProps> = ({ onCrisisTrigger }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('English');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const upperInput = textToSend.toUpperCase();
    if (upperInput.includes('SUICIDE') || upperInput.includes('HELP') || upperInput.includes('KILL MYSELF')) {
        onCrisisTrigger();
        return;
    }

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await chatWithMentor(
          messages.map(m => ({ role: m.role, text: m.text })), 
          userMsg.text, 
          language
      );
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Eish, connection issue.", isError: true }]);
    } finally {
      setLoading(false);
    }
  };

  const chips = [
    "Help me understand quadratic equations",
    "What careers can I pursue with Physical Sciences?",
    "Explain photosynthesis simply",
    "How do I prepare for my final exams?"
  ];

  return (
    <div className="h-[calc(100vh-80px)] pt-32 pb-4 px-4 max-w-4xl mx-auto flex flex-col">
      <div className="flex items-center justify-between mb-8">
         <h2 className="text-4xl font-black text-app-text tracking-tight uppercase">AI <span className="pulse-gradient-text">Mentor</span></h2>
         <select 
           value={language}
           onChange={(e) => setLanguage(e.target.value)}
           className="bg-app-card text-app-text border border-app-border rounded-xl px-4 py-2 text-sm font-bold outline-none"
         >
           {SA_LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
         </select>
      </div>

      <div className="flex-1 glass-panel rounded-[3rem] overflow-hidden flex flex-col relative border border-app-border shadow-2xl">
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto py-10">
                <div className="w-20 h-20 bg-app-input border border-app-border rounded-3xl flex items-center justify-center mb-10 shadow-xl">
                   <Bot size={40} className="text-purple-500" />
                </div>
                <h3 className="text-3xl font-black text-app-text mb-4 leading-tight">Hello! I am your <span className="pulse-gradient-text">MatricPulse Mentor.</span></h3>
                <p className="text-app-muted text-lg font-medium mb-12">How can I help you today? I speak all 11 official languages.</p>
                
                <div className="flex flex-wrap justify-center gap-3">
                   {chips.map(chip => (
                     <button 
                       key={chip} 
                       onClick={() => handleSend(chip)}
                       className="px-6 py-3 bg-app-input border border-app-border rounded-2xl text-app-text text-sm font-bold hover:bg-app-card transition-all active:scale-95"
                     >
                       {chip}
                     </button>
                   ))}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-6 rounded-[2rem] shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-purple-600 text-white rounded-tr-none' 
                    : 'bg-app-input text-app-text border border-app-border rounded-tl-none'
                  }`}>
                    {msg.role === 'model' && <Bot size={18} className="mb-3 text-purple-400" />}
                    <p className="text-base md:text-lg font-medium leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-app-input p-4 rounded-2xl rounded-tl-none animate-pulse">
                  <Sparkles size={18} className="text-purple-400" />
                </div>
              </div>
            )}
        </div>

        <div className="p-6 md:p-8 bg-app-card border-t border-app-border">
          <div className="relative group">
             <input 
               type="text" 
               className="w-full bg-app-input border border-app-border text-app-text rounded-2xl py-5 pl-8 pr-16 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-xl text-lg font-medium transition-all"
               placeholder="Type your message..."
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
             />
             <button 
               onClick={() => handleSend()}
               disabled={loading || !input.trim()}
               className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-colors disabled:opacity-50"
             >
                <Send size={24} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMentor;