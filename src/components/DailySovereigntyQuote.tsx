import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, Bookmark, Feather, Heart, Share2, Quote } from 'lucide-react';
import { Translation } from '../translations';

interface DailySovereigntyQuoteProps {
  t: any;
  currentLang: string;
  isRtl: boolean;
}

interface SovereignQuote {
  id: number;
  text: { ar: string; en: string; fr: string };
  focus: { ar: string; en: string; fr: string };
  reflectionPrompt: { ar: string; en: string; fr: string };
}

const quotesList: SovereignQuote[] = [
  {
    id: 1,
    text: {
      ar: "الوقار ليس رداءً ترتديه لتلفت الأنظار، بل هو صمت مهيب ينبع من عمق تقديرك لذاتك واحترام حدود الآخرين.",
      en: "Dignity is not a cloak you wear to grab attention, but a majestic silence rising from the depth of your self-esteem.",
      fr: "La dignité n'est pas un manteau qu'on porte pour attirer l'attention, mais un silence majestueux issu de l'estime de soi."
    },
    focus: {
      ar: "السيادة والتقدير الذاتي",
      en: "Sovereignty & Self-Esteem",
      fr: "Souveraineté & Estime de soi"
    },
    reflectionPrompt: {
      ar: "ما هو السلوك اليومي الذي تقوم به ويجسد تقديرك الصامت لنفسك؟",
      en: "What daily behavior of yours embodies your quiet self-respect?",
      fr: "Quel comportement quotidien incarne le mieux votre respect silencieux ?"
    }
  },
  {
    id: 2,
    text: {
      ar: "عندما تتقن لغة الصمت المنظم، تصبح إيماءاتك البسيطة ونظراتك المتزنة أشد بلاغة من مئات الكلمات المتسارعة.",
      en: "When you master structured silence, your simple gestures and balanced eye contact become more eloquent than a thousand rushed words.",
      fr: "Quand vous maîtrisez le silence structuré, vos gestes simples et votre regard équilibré deviennent plus éloquents qu'un millier de mots pressés."
    },
    focus: {
      ar: "لغة الجسد الكاريزمية",
      en: "Charismatic Body Language",
      fr: "Langage corporel charismatique"
    },
    reflectionPrompt: {
      ar: "تأمل في حوارك القادم: كيف يمكنك تقليل سرعة حديثك وزيادة حضورك البصري؟",
      en: "In your next conversation, how can you reduce your speaking speed and increase your eye contact?",
      fr: "Dans votre prochaine conversation, comment ralentir votre parole et renforcer votre présence visuelle ?"
    }
  },
  {
    id: 3,
    text: {
      ar: "توكيد ذاتك يبدأ بقدرتك على قول 'لا' بابتسامة وقورة هادئة، دون تبرير فائض أو شعور بالذنب.",
      en: "Asserting yourself begins with your ability to say 'No' with a calm, dignified smile, without over-explaining or feeling guilty.",
      fr: "S'affirmer commence par la capacité de dire 'Non' avec un sourire calme et digne, sans sur-justification ni culpabilité."
    },
    focus: {
      ar: "رسم الحدود الذاتية",
      en: "Setting Personal Boundaries",
      fr: "Poser des limites personnelles"
    },
    reflectionPrompt: {
      ar: "ما هي الحدود الشخصية التي تجد صعوبة في حمايتها حالياً، وكيف ستبدأ في فرضها بلباقة؟",
      en: "Which personal boundary do you struggle to protect, and how will you start enforcing it gracefully?",
      fr: "Quelle limite personnelle avez-vous du mal à protéger, et comment allez-vous commencer à l'imposer avec tact ?"
    }
  }
];

export const DailySovereigntyQuote: React.FC<DailySovereigntyQuoteProps> = ({ t, currentLang, isRtl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reflectionInput, setReflectionInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedThought, setSubmittedThought] = useState<string | null>(null);

  useEffect(() => {
    // Select quote of the day based on day of the month
    const day = new Date().getDate();
    setCurrentIndex(day % quotesList.length);
  }, []);

  const activeQuote = quotesList[currentIndex];

  const handleNextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotesList.length);
    setReflectionInput("");
    setSubmittedThought(null);
  };

  const handleAnalyzeReflection = () => {
    if (!reflectionInput.trim()) return;
    setIsSubmitting(true);
    
    // Simulate deep philosophical introspection analysis trigger
    setTimeout(() => {
      setSubmittedThought(reflectionInput);
      setIsSubmitting(false);
      
      // Dispatch event to open AI assistant with custom analysis prompt
      const promptText = currentLang === 'ar'
        ? `كتبت تأملاً حول خاطرة اليوم النفسية لـ "${activeQuote.focus.ar}": "${reflectionInput}". بصفتك مرشداً نفسياً في منصة مدارات النفس لـ بشير الماجري، قدم لي تحليلاً عميقاً وداعماً ومحفزاً لهذا التأمل في 3 أسطر بليغة.`
        : `I wrote a reflection about "${activeQuote.focus.en}": "${reflectionInput}". Analyze my reflection with deep psychological insights as an AI supervisor for Bechir Mejri's platform.`;

      window.dispatchEvent(new CustomEvent('trigger-ai-assistant', {
        detail: {
          prompt: promptText,
          isOpen: true
        }
      }));
    }, 1200);
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-y border-white/5 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gold/5 border border-gold/10 rounded-full mb-6">
            <Feather className="w-4 h-4 text-gold animate-bounce" />
            <span className="text-[10px] font-black tracking-[0.4em] text-gold uppercase">
              {currentLang === 'ar' ? 'خاطرة السيادة اليومية' : 'Daily Sovereignty Reflection'}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-white italic">
            {currentLang === 'ar' ? 'تأملات يومية في علوم الوقار والسلوك' : 'Daily Intuition on Dignity & Behavior'}
          </h2>
        </div>

        <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 p-4 opacity-5 pointer-events-none">
            <Quote className="w-24 h-24 text-gold" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold/80 bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                  {activeQuote.focus[currentLang as 'ar' | 'en' | 'fr'] || activeQuote.focus.ar}
                </span>
              </div>

              <p className="text-xl md:text-2xl font-serif text-white leading-relaxed italic border-r-2 border-gold/30 pr-6">
                "{activeQuote.text[currentLang as 'ar' | 'en' | 'fr'] || activeQuote.text.ar}"
              </p>

              <div className="pt-6 border-t border-white/5">
                <h4 className="text-gold text-xs font-bold uppercase tracking-wider mb-3">
                  {currentLang === 'ar' ? 'سؤال للتفكر اليومي:' : 'Daily Self-Inquiry:'}
                </h4>
                <p className="text-white/70 text-base mb-6 font-serif">
                  {activeQuote.reflectionPrompt[currentLang as 'ar' | 'en' | 'fr'] || activeQuote.reflectionPrompt.ar}
                </p>

                <div className="space-y-4">
                  <textarea
                    value={reflectionInput}
                    onChange={(e) => setReflectionInput(e.target.value)}
                    placeholder={currentLang === 'ar' ? 'اكتب تأملك الصادق ودعه يرشد مسارك...' : 'Write your honest reflection...'}
                    className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-gold/30 transition-all text-sm min-h-[100px] resize-none font-serif"
                  />
                  
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={handleNextQuote}
                      className="text-white/40 hover:text-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      {currentLang === 'ar' ? 'خاطرة عشوائية أخرى' : 'Next Quote'}
                    </button>

                    <button
                      onClick={handleAnalyzeReflection}
                      disabled={isSubmitting || !reflectionInput.trim()}
                      className="bg-gold text-black px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer shadow-[0_10px_20px_-10px_rgba(212,175,55,0.4)]"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{currentLang === 'ar' ? 'جاري التحليل...' : 'Analyzing...'}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>{currentLang === 'ar' ? 'حلل تـأمـلـي ذكـيـاً' : 'Analyze with AI'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
