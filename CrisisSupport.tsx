import React from 'react';
import { Phone, MessageSquare, ExternalLink, ShieldAlert, Heart, UserPlus, Book } from 'lucide-react';

interface CrisisItem {
  name: string;
  phone: string;
  website: string;
  desc: string;
  status?: string;
  sms?: string;
}

interface CrisisSection {
  title: string;
  icon: React.ElementType;
  items: CrisisItem[];
}

const CrisisSupport: React.FC = () => {
  const sections: CrisisSection[] = [
    {
      title: "Mental Health",
      icon: Heart,
      items: [
        { name: "Lifeline South Africa", phone: "0861 322 322", website: "https://lifelinesa.co.za", status: "24/7", desc: "24-hour crisis counselling and support for people in distress." },
        { name: "SADAG Depression & Anxiety Helpline", phone: "0800 567 567", sms: "31393", website: "https://www.sadag.org", status: "24/7", desc: "Support for depression, anxiety, and other mental health issues." },
        { name: "Suicide Crisis Line", phone: "0800 567 567", website: "https://www.sadag.org", status: "24/7", desc: "Immediate support for those experiencing suicidal thoughts." },
      ]
    },
    {
      title: "Abuse & Violence",
      icon: ShieldAlert,
      items: [
        { name: "Childline South Africa", phone: "0800 055 555", website: "https://www.childlinesa.org.za", status: "24/7", desc: "Support for children and youth experiencing abuse or difficulties." },
        { name: "Gender-Based Violence Command Centre", phone: "0800 428 428", sms: "31531", website: "https://gbv.org.za", status: "24/7", desc: "Report and get help for gender-based violence." },
      ]
    },
    {
      title: "Substance Abuse",
      icon: UserPlus,
      items: [
        { name: "SANCA National Helpline", phone: "0861 472 622", website: "https://sancanational.org.za", desc: "Help for substance abuse and addiction." },
      ]
    },
    {
      title: "General Support",
      icon: UserPlus,
      items: [
        { name: "loveLife", phone: "0800 121 900", website: "https://lovelife.org.za", desc: "Youth-focused health and wellbeing support." },
      ]
    },
    {
      title: "Academic Support",
      icon: Book,
      items: [
        { name: "Department of Education Helpline", phone: "0800 202 933", website: "https://www.education.gov.za", desc: "Help with school and education-related issues." },
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
           <Heart className="text-red-500 fill-red-500" size={32} />
        </div>
        <h2 className="text-4xl font-black text-app-text tracking-tight uppercase mb-4">Crisis <span className="text-red-500">Support</span></h2>
        <p className="text-app-muted text-lg max-w-xl mx-auto">You are not alone. Free, confidential support is available 24/7. Reach out to any of these trusted resources.</p>
      </div>

      <div className="bg-red-500/5 border border-red-500/20 rounded-[2rem] p-8 mb-12 text-center relative overflow-hidden">
         <div className="relative z-10">
           <ShieldAlert className="text-red-500 mx-auto mb-4" size={32} />
           <p className="text-xl font-black text-app-text mb-4">In immediate danger?</p>
           <p className="text-app-text font-bold">Call <a href="tel:10111" className="text-red-500 underline">10111</a> (Police) or <a href="tel:10177" className="text-red-500 underline">10177</a> (Ambulance)</p>
         </div>
      </div>

      <div className="space-y-12">
        {sections.map(section => (
          <div key={section.title}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-app-input border border-app-border rounded-xl flex items-center justify-center">
                 <section.icon size={20} className="text-purple-500" />
              </div>
              <h3 className="text-2xl font-black text-app-text uppercase">{section.title}</h3>
            </div>

            <div className="space-y-4">
              {section.items.map(item => (
                <div key={item.name} className="glass-panel rounded-[2rem] p-8 border border-app-border hover:border-purple-500/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                       <h4 className="text-xl font-black text-app-text">{item.name}</h4>
                       <p className="text-app-muted text-sm mt-1">{item.desc}</p>
                     </div>
                     {item.status && (
                       <span className="flex items-center gap-1.5 px-3 py-1 bg-app-input border border-app-border rounded-full text-[10px] font-black uppercase text-app-text">
                         <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                         {item.status}
                       </span>
                     )}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <a href={`tel:${item.phone.replace(/\s/g, '')}`} className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-6 bg-app-input border border-app-border rounded-xl font-black text-app-text hover:bg-app-card transition-colors">
                      <Phone size={18} className="text-purple-500" /> {item.phone}
                    </a>
                    {item.sms && (
                      <a href={`sms:${item.sms}`} className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-6 bg-app-input border border-app-border rounded-xl font-black text-app-text hover:bg-app-card transition-colors">
                        <MessageSquare size={18} className="text-purple-500" /> SMS: {item.sms}
                      </a>
                    )}
                    <a href={item.website} target="_blank" className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-6 bg-app-input border border-app-border rounded-xl font-black text-app-text hover:bg-app-card transition-colors">
                      <ExternalLink size={18} className="text-purple-500" /> Visit Website
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-app-muted text-sm mt-16 font-bold">
        All these services are free and confidential. Your wellbeing matters.
      </p>
    </div>
  );
};

export default CrisisSupport;