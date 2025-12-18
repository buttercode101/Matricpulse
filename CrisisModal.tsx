import React from 'react';
import { Phone, X, Heart } from 'lucide-react';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-lg">
      <div className="bg-white rounded-[2.5rem] max-w-md w-full p-8 relative shadow-2xl animate-float">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <Heart className="text-red-600 fill-current" size={32} />
          </div>
          
          <h3 className="text-2xl font-black text-slate-900 mb-2">YOU ARE NOT ALONE</h3>
          <p className="text-gray-600 mb-8">
            Matric is stressful, but your life is worth more than any mark. Talk to someone who cares right now.
          </p>

          <a 
            href="tel:0800567567" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-red-200 mb-4"
          >
            <Phone size={20} />
            CALL SADAG (0800 567 567)
          </a>

           <a 
            href="sms:31393" 
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors"
          >
            SMS "HELP" TO 31393
          </a>

          <p className="mt-6 text-xs text-gray-400">Available 24/7 • Free • Confidential</p>
        </div>
      </div>
    </div>
  );
};

export default CrisisModal;