import React from 'react';
import { motion } from 'motion/react';
import { Compass, BookOpen, Brain, MessageSquare, ArrowRight, ClipboardCheck } from 'lucide-react';

interface PathFinderProps {
  currentLang: string;
  isRtl: boolean;
  onNavigate: (sectionId: string) => void;
}

export const PathFinder: React.FC<PathFinderProps> = ({ currentLang, isRtl, onNavigate }) => {
  const content = {
    ar: {
      title: "من أين تود أن تبدأ رحلتك؟",
      subtitle: "اختر المسار الذي يناسب احتياجاتك النفسية الآن",
      paths: [
        {
          id: "nexus",
          title: "مسار المعرفة",
          desc: "البحث عن دراسات وبحوث سلوكية معمقة وغنية بالنصائح التمكينية",
          icon: BookOpen,
          target: "دراسات"
        },
        {
          id: "assessment",
          title: "مسار القياس والتشخيص",
          desc: "مقياس سلوكي تفاعلي يسبر أغوار اتزانك وسيادتك النفسية والاجتماعية",
          icon: ClipboardCheck,
          target: "assessment"
        },
        {
          id: "ai",
          title: "مسار الحلول المباشرة",
          desc: "استشارة وبصيرة فورية مع المساعد الذكي المدعوم بالذكاء الاصطناعي",
          icon: Brain,
          target: "ai-assistant"
        }
      ]
    },
    en: {
      title: "Where do you want to start?",
      subtitle: "Choose the path that fits your psychological needs",
      paths: [
        {
          id: "nexus",
          title: "Knowledge Path",
          desc: "Explore deep behavioral studies and research on human dynamics",
          icon: BookOpen,
          target: "دراسات"
        },
        {
          id: "assessment",
          title: "Assessment & Diagnosis",
          desc: "Interactive behavioral index testing your sovereignty and balance",
          icon: ClipboardCheck,
          target: "assessment"
        },
        {
          id: "ai",
          title: "Instant Solutions",
          desc: "Get immediate insights and direct consultation with the AI assistant",
          icon: Brain,
          target: "ai-assistant"
        }
      ]
    }
  };

  const t = (content as any)[currentLang] || content.ar;

  return (
    <section data-pathfinder className="py-12 -mt-12 relative z-40 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#0f0f0f] border border-white/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] rounded-3xl p-6 md:p-8 backdrop-blur-3xl">
          <div className="text-center mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-3"
            >
              <Compass className="w-5 h-5 text-gold animate-spin-slow" />
              <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">
                {isRtl ? "مُحدد المسار" : "PATH FINDER"}
              </span>
            </motion.div>
            <h3 className="text-2xl md:text-4xl font-serif text-white italic mb-4">{t.title}</h3>
            <p className="text-white/40 text-sm">{t.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.paths.map((path: any, idx: number) => (
              <motion.button
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => {
                  if (path.id === 'ai') {
                    window.dispatchEvent(new CustomEvent('trigger-ai-assistant', { 
                      detail: { isOpen: true } 
                    }));
                  } else {
                    const el = document.getElementById(path.target);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold/30 hover:bg-gold/[0.03] transition-all text-right sm:text-left flex flex-col items-center md:items-start"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center border border-gold/20 mb-6 group-hover:scale-110 transition-transform">
                  <path.icon className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-lg text-white font-serif italic mb-2 group-hover:text-gold transition-colors">{path.title}</h4>
                <p className="text-xs text-white/30 leading-relaxed mb-6 group-hover:text-white/50">{path.desc}</p>
                <div className={`mt-auto flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 transition-all ${isRtl ? '-translate-x-4' : 'translate-x-4'} group-hover:translate-x-0`}>
                   <span className="text-[9px] font-black uppercase tracking-widest">{isRtl ? "ابدأ الآن" : "START NOW"}</span>
                   <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
