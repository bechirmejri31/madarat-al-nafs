import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardCheck, ArrowRight, ArrowLeft, RefreshCw, ChevronRight, ChevronLeft, Sparkles, Brain, Heart, Users } from 'lucide-react';
import { Translation } from '../translations';

interface Question {
  id: number;
  text: { [key: string]: string };
  options: {
    label: { [key: string]: string };
    score: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: {
      ar: "كيف تتعامل عادة مع المواقف التي تتطلب مواجهة؟",
      en: "How do you usually handle situations that require confrontation?",
      fr: "Comment gérez-vous habituellement les situations qui nécessitent une confrontation ?"
    },
    options: [
      { label: { ar: "أتجنبها تماماً للحفاظ على الهدوء", en: "Avoid it completely to maintain peace", fr: "Je l'évite complètement pour maintenir la paix" }, score: 1 },
      { label: { ar: "أواجه بحدة للتأكد من وصول وجهة نظري", en: "Confront sharply to ensure my point is made", fr: "Je confronte vivement pour m'assurer que mon point de vue est entendu" }, score: 3 },
      { label: { ar: "أحاول التعبير عن مشاعري بهدوء ووضوح", en: "Try to express my feelings calmly and clearly", fr: "J'essaie d'exprimer mes sentiments calmement et clairement" }, score: 5 }
    ]
  },
  {
    id: 2,
    text: {
      ar: "عندما تشعر بالتوتر، ما هو رد فعلك الغالب؟",
      en: "When you feel stressed, what is your most common reaction?",
      fr: "Quand vous vous sentez stressé, quelle est votre réaction la plus courante ?"
    },
    options: [
      { label: { ar: "العزلة والابتعاد عن الناس", en: "Isolation and distancing from people", fr: "L'isolement et la mise à distance des gens" }, score: 2 },
      { label: { ar: "التعبير عن الغضب تجاه المحيطين", en: "Expressing anger towards those around me", fr: "Exprimer de la colère envers mon entourage" }, score: 1 },
      { label: { ar: "ممارسة نشاط يساعدني على التوازن", en: "Engage in an activity that helps me balance", fr: "Pratiquer une activité qui m'aide à m'équilibrer" }, score: 5 }
    ]
  },
  {
    id: 3,
    text: {
      ar: "كيف تصف قدرتك على فهم مشاعر الآخرين؟",
      en: "How would you describe your ability to understand others' feelings?",
      fr: "Comment décririez-vous votre capacité à comprendre les sentiments des autres ?"
    },
    options: [
      { label: { ar: "أجد صعوبة في قراءة تلميحات الناس", en: "I find it hard to read people's cues", fr: "J'ai du mal à lire les signaux des gens" }, score: 2 },
      { label: { ar: "أفهمهم أحياناً ولكن لا أعرف كيف أتفاعل", en: "I understand them sometimes but don't know how to react", fr: "Je les comprends parfois mais je ne sais pas comment réagir" }, score: 3 },
      { label: { ar: "أستطيع وضع نفسي مكان الآخرين بسهولة", en: "I can easily put myself in others' shoes", fr: "Je peux facilement me mettre à la place des autres" }, score: 5 }
    ]
  },
  {
    id: 4,
    text: {
      ar: "عندما تتحدث مع شخص ما، كيف تركز على لغة جسده؟",
      en: "When speaking with someone, how do you focus on their body language?",
      fr: "Lorsque vous parlez avec quelqu'un, comment vous concentrez-vous sur son langage corporel ?"
    },
    options: [
      { label: { ar: "لا أنتبه لتفاصيل لغة الجسد وأركز على الكلمات فقط", en: "I don't notice body language and focus only on words", fr: "Je ne remarque pas le langage corporel et me concentre uniquement sur les mots" }, score: 1 },
      { label: { ar: "ألاحظ بعض الحركات اللاإرادية لكن دون فهم دقيق لمعناها", en: "I notice some involuntary movements but without clear understanding", fr: "Je remarque certains mouvements involontaires mais sans compréhension claire" }, score: 3 },
      { label: { ar: "ألاحظ نبرة الصوت، التواصل البصري، وحركات اليدين بدقة لفك الشفرات المعنوية", en: "I precisely analyze tone, eye contact, and hand gestures to decode subtext", fr: "J'analyse précisément le ton de voix, le contact visuel et les gestes pour décoder le sous-texte" }, score: 5 }
    ]
  },
  {
    id: 5,
    text: {
      ar: "إذا طلب منك صديق خدمة تفوق قدرتك وتزاحم جدولك، كيف تتصرف؟",
      en: "If a friend asks you for a favor that exceeds your capability and interferes with your schedule, what do you do?",
      fr: "Si un ami vous demande un service qui dépasse vos capacités et interfère avec votre emploi du temps, que faites-vous ?"
    },
    options: [
      { label: { ar: "أوافق على مضض تجنباً لإحراجه ولو كان ذلك على حساب راحتي", en: "Agree reluctantly to avoid embarrassing them, even at my own expense", fr: "J'accepte à contrecœur pour éviter de les embarrasser, même à mes propres dépens" }, score: 1 },
      { label: { ar: "أتهرب من الإجابة أو أتعذر بأعذار غير مباشرة", en: "Evade answering or make indirect excuses", fr: "J'esquive la réponse ou trouve des excuses indirectes" }, score: 3 },
      { label: { ar: "أعتذر بلطف ووضوح مع تبيان عدم قدرتي في الوقت الحالي", en: "Decline politely and clearly explaining my current inability", fr: "Je décline gentiment et clairement en expliquant mon incapacité actuelle" }, score: 5 }
    ]
  },
  {
    id: 6,
    text: {
      ar: "كيف تتلقى عادة الانتقادات الموجهة لأفكارك أو عملك؟",
      en: "How do you usually receive criticism directed at your ideas or work?",
      fr: "Comment recevez-vous habituellement les critiques adressées à vos idées ou à votre travail ?"
    },
    options: [
      { label: { ar: "أشعر بالإحباط الشديد والتشكيك في قدراتي الباطنية", en: "Feel deeply frustrated and doubt my own abilities", fr: "Je me sens profondément frustré et je doute de mes propres capacités" }, score: 1 },
      { label: { ar: "أدافع عن نفسي فوراً بغضب لإثبات خطأ الطرف الآخر", en: "Defend myself angrily to prove the other party wrong", fr: "Je me défends immédiatement avec colère pour prouver que l'autre a tort" }, score: 2 },
      { label: { ar: "أستمع بهدوء، أقيم النقد بموضوعية، وأستخرج منه الفائدة دون تأثر تقديري لذاتي", en: "Listen calmly, evaluate objectively, and extract benefit without shaking my self-esteem", fr: "J'écoute calmement, j'évalue objectivement et j'en tire bénéfice sans ébranler mon estime de soi" }, score: 5 }
    ]
  }
];

interface PsychologicalAssessmentProps {
  t: Translation;
  currentLang: string;
  isRtl: boolean;
}

export const PsychologicalAssessment: React.FC<PsychologicalAssessmentProps> = ({ t, currentLang, isRtl }) => {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [emailSent, setEmailSent] = useState(false);

  const startTest = () => {
    setStep('test');
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setEmailSent(false);
  };

  const handleAnswer = (optionScore: number) => {
    setAnswers(prev => [...prev, optionScore]);
    const newScore = score + optionScore;
    setScore(newScore);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('result');
    }
  };

  const getResult = () => {
    const maxScore = questions.length * 5;
    const percentage = (score / maxScore) * 100;

    if (percentage >= 80) return {
      title: { ar: "توازن عالٍ وسيادة نفسية", en: "High Balance & Sovereignty", fr: "Équilibre Élevé & Souveraineté" },
      description: { 
        ar: "تمتلك وعياً ذاتياً ممتازاً وقدرة رائعة على إدارة عواطفك وتوكيد ذاتك ورسم حدود رصينة مع الآخرين.", 
        en: "You possess excellent self-awareness, great emotional management, assertiveness, and solid boundary setting.",
        fr: "Vous possédez une excellente conscience de soi, une grande gestion émotionnelle et une capacité à poser des limites claires."
      },
      icon: <Sparkles className="w-12 h-12 text-gold" />
    };
    if (percentage >= 50) return {
      title: { ar: "نمو فكري مستقر", en: "Stable Growth & Development", fr: "Croissance Stable" },
      description: { 
        ar: "أنت في مسار سليم وصحي نحو التوازن، لكن بعض جوانب لغة الجسد وتوكيد الحدود تحتاج لمزيد من التجربة والممارسة.", 
        en: "You are on a stable path to psychological balance, but some aspects of body language and assertiveness need practice.",
        fr: "Vous êtes sur une voie stable vers l'équilibre, mais certains aspects de la communication méritent d'être approfondis."
      },
      icon: <Brain className="w-12 h-12 text-gold/60" />
    };
    return {
      title: { ar: "تحتاج إلى تركيز وبناء سيادة", en: "Needs Focus & Assertiveness", fr: "Besoin de Concentration" },
      description: { 
        ar: "قد تواجه بعض التحديات في التعبير عن مشاعرك أو فهم الآخرين ورسم حدودك الشخصية. مدارات النفس هنا لتكون دليلاً لك.", 
        en: "You may face challenges in expressing yourself, reading social cues, or setting personal boundaries. We are here to guide you.",
        fr: "Vous pouvez rencontrer des difficultés à vous exprimer ou à poser des limites. Orbites Psy est à vos côtés pour vous guider."
      },
      icon: <Heart className="w-12 h-12 text-gold/40" />
    };
  };

  const result = getResult();

  React.useEffect(() => {
    if (step === 'result' && !emailSent) {
      const sendReport = async () => {
        try {
          const { notifyOwner, NotificationType } = await import('../services/notifier');
          await notifyOwner(NotificationType.ASSESSMENT, {
            subject: `تقرير المقياس النفسي - ${result.title[currentLang] || result.title['en']}`,
            message: `أكمل زائر المقياس النفسي بنتيجة: ${result.title[currentLang] || result.title['en']}`,
            details: {
              "النتيجة": result.title[currentLang] || result.title['en'],
              "الوصف": result.description[currentLang] || result.description['en'],
              "المعدل": `${Math.round((score / (questions.length * 5)) * 100)}%`
            },
            emailHtml: `
                <h2>نتائج المقياس النفسي - مدارات النفس</h2>
                <p><strong>النتيجة:</strong> ${result.title[currentLang] || result.title['en']}</p>
                <p><strong>التشخيص:</strong> ${result.description[currentLang] || result.description['en']}</p>
                <p><strong>النسبة المئوية:</strong> ${Math.round((score / (questions.length * 5)) * 100)}%</p>
                <p style="margin-top: 20px;">هذا التقرير جزء من تجربة "مدارات النفس".</p>
              `
          });
          setEmailSent(true);
        } catch (error) {
          console.error('Failed to send email report:', error);
        }
      };
      sendReport();
    }
  }, [step, emailSent, result, currentLang]);

  return (
    <section id="assessment" className="py-12 md:py-16 bg-black border-y border-white/5 relative overflow-hidden">
      {/* Decorative Orbits */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gold/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/[0.02] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 mx-auto">
                <ClipboardCheck className="w-8 h-8 text-gold" />
              </div>
              <h2 className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-3">{t.assessmentTitle || "المقياس النفسي والسلوكي"}</h2>
              <h3 className="text-2xl md:text-3xl font-serif text-white italic mb-4">{t.assessmentHeading || "اكتشف معالم السيادة النفسية لديك"}</h3>
              <p className="text-white/40 text-sm md:text-base font-serif italic mb-6 leading-relaxed max-w-2xl mx-auto">
                {t.assessmentDescription || "مقياس سلوكي متكامل يهدف إلى قياس مستويات توكيد الذات، فهم لغة الجسد، الاتزان النفسي وبناء الوقار والسيادة الاجتماعية."}
              </p>
              <button
                onClick={startTest}
                className="bg-gold text-black px-10 py-4 rounded-full text-[10px] uppercase font-black tracking-[0.2em] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto cursor-pointer"
              >
                <span>{t.assessmentBtn || "ابدأ الاختبار الآن"}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </motion.div>
          )}

          {step === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-3xl"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">
                  {currentQuestionIndex + 1} / {questions.length}
                </span>
                <div className="h-1 flex-1 mx-8 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h4 className="text-2xl md:text-3xl font-serif text-white italic mb-12 min-h-[80px]">
                {questions[currentQuestionIndex].text[currentLang] || questions[currentQuestionIndex].text['en']}
              </h4>

              <div className="space-y-4">
                {questions[currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.score)}
                    className="w-full text-right group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-gold hover:bg-gold/5 transition-all flex items-center justify-between cursor-pointer"
                    style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
                  >
                    <span className="text-white/80 group-hover:text-white transition-colors text-lg">
                      {option.label[currentLang] || option.label['en']}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-gold group-hover:bg-gold flex items-center justify-center transition-all">
                      {isRtl ? <ChevronLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 text-black transition-opacity" /> : <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-black transition-opacity" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'result' && (() => {
            const defaultAnswers = [3, 3, 3, 3, 3, 3];
            const getA = (idx: number) => {
              if (answers && answers[idx] !== undefined) {
                return answers[idx];
              }
              return defaultAnswers[idx];
            };

            const assertivenessScore = Math.round(((getA(0) + getA(4)) / 10) * 100);
            const emotionalResilienceScore = Math.round(((getA(1) + getA(5)) / 10) * 100);
            const bodyLanguageScore = Math.round(((getA(2) + getA(3)) / 10) * 100);

            const dimensions = [
              {
                id: "assertiveness",
                title: { 
                  ar: "توكيد الذات والسيادة النفسية", 
                  en: "Assertiveness & Sovereignty",
                  fr: "Assertivité & Souveraineté"
                },
                score: assertivenessScore,
                description: {
                  ar: "رسم حدود المساحة الشخصية والجهر بالرأي بكل قوة ووقار.",
                  en: "Drawing firm personal space boundaries and speaking truth with quiet dignity.",
                  fr: "Fixer des limites d'espace personnel et exprimer sa vérité avec dignité."
                }
              },
              {
                id: "resilience",
                title: { 
                  ar: "المرونة والاتزان الوجداني", 
                  en: "Emotional Resilience & Wisdom",
                  fr: "Résilience Émotionnelle & Sagesse"
                },
                score: emotionalResilienceScore,
                description: {
                  ar: "التنظيم العاطفي بمواقف التوتر والتحكم بزمام ردات الفعل دون شطط.",
                  en: "Emotional resilience under stress, keeping composure in challenging events.",
                  fr: "Résilience émotionnelle sous stress, maintenant un calme souverain."
                }
              },
              {
                id: "body-language",
                title: { 
                  ar: "لغة الجسد وقراءة المحيط", 
                  en: "Body Language & Subtext Decoding",
                  fr: "Décryptage du Langage Corporel"
                },
                score: bodyLanguageScore,
                description: {
                  ar: "تفكيك حركات العيون والإيماءات اللاإرادية ونبرة القياس بنجاح.",
                  en: "Decoding subtext, micro-expressions and tone accurately during interactions.",
                  fr: "Décoder avec précision l'intonation et les expressions inconscientes."
                }
              }
            ];

            return (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-12"
              >
                <div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center mb-8 mx-auto"
                  >
                    {result.icon}
                  </motion.div>
                  <h3 className="text-4xl md:text-5xl font-serif text-white italic mb-4">
                    {result.title[currentLang] || result.title['en']}
                  </h3>
                  <p className="text-white/60 text-lg font-serif italic max-w-2xl mx-auto leading-relaxed">
                    {result.description[currentLang] || result.description['en']}
                  </p>
                </div>

                {/* Dashboard Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-12 text-right sm:text-left">
                  {dimensions.map((dim, i) => (
                    <motion.div
                      key={dim.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:border-gold/30 hover:bg-gold/[0.02] transition-all relative group flex flex-col items-center justify-between text-center min-h-[320px]"
                    >
                      <div className="flex flex-col items-center space-y-6">
                        {/* Beautiful Animated Circle Ring */}
                        <div className="relative w-28 h-28 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="56"
                              cy="56"
                              r="44"
                              className="stroke-white/5"
                              strokeWidth="5"
                              fill="transparent"
                            />
                            <motion.circle
                              cx="56"
                              cy="56"
                              r="44"
                              className="stroke-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                              strokeWidth="5"
                              fill="transparent"
                              strokeDasharray={276}
                              initial={{ strokeDashoffset: 276 }}
                              animate={{ strokeDashoffset: 276 - (276 * dim.score) / 100 }}
                              transition={{ duration: 1.8, ease: "easeOut", delay: i * 0.15 }}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-2xl font-black text-white font-mono">{dim.score}%</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-white font-serif font-bold text-lg group-hover:text-gold transition-colors">
                            {dim.title[currentLang] || dim.title['en']}
                          </h4>
                          <p className="text-white/40 text-xs leading-relaxed font-sans max-w-[220px]">
                            {dim.description[currentLang] || dim.description['en']}
                          </p>
                        </div>
                      </div>

                      <div className="w-full mt-6 pt-4 border-t border-white/5">
                        <span className="text-[10px] font-black tracking-widest text-[#d4af37] uppercase">
                          {dim.score >= 80 ? (currentLang === 'ar' ? 'نموذج السيادة' : 'Sovereign Spec') : dim.score >= 50 ? (currentLang === 'ar' ? 'مسار ريادي' : 'Leading path') : (currentLang === 'ar' ? 'بحاجة لصقل' : 'Focus Required')}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                  <button
                    onClick={startTest}
                    className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full text-[11px] uppercase font-black tracking-[0.2em] transition-all hover:bg-white/10 flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    {currentLang === 'ar' ? 'إعادة المقياس' : 'Retake Test'}
                  </button>
                  <button
                    onClick={() => {
                      const selector = document.getElementById('دراسات');
                      if (selector) selector.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto bg-gold text-black px-10 py-5 rounded-full text-[11px] uppercase font-black tracking-[0.2em] transition-all hover:scale-105 flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    {currentLang === 'ar' ? 'استكشف البحوث السلوكية' : currentLang === 'fr' ? 'Explorer les Recherches' : 'Explore Research'}
                  </button>
                </div>

                {/* AI Integration */}
                <div className="pt-6">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-4 p-4 rounded-2xl bg-gold/5 border border-gold/10 cursor-pointer hover:bg-gold/10 transition-colors"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('trigger-ai-assistant', { 
                        detail: { 
                        prompt: currentLang === 'ar' 
                          ? `لقد حصلت على نتائج مقياس السيادة والاتزان النفسي التالية:\n- توكيد الذات: ${assertivenessScore}%\n- الذكاء العاطفي: ${emotionalResilienceScore}%\n- لغة الجسد: ${bodyLanguageScore}%\nأريد نصائح تفصيلية وعملية تفيدني في تدريبي السلوكي والشخصي تحت إشراف البروفيسور بشير الماجري.` 
                          : `I completed my Psychological Balance indicators:\n- Assertiveness: ${assertivenessScore}%\n- Resilience: ${emotionalResilienceScore}%\n- Body Language: ${bodyLanguageScore}%\nSuggest deep customized advice to maximize my emotional sovereignty.`,
                        isOpen: true 
                        } 
                      }));
                    }}
                  >
                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-black" />
                    </div>
                    <div className="text-right sm:text-left" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                      <p className="text-gold text-[10px] font-black uppercase tracking-widest">{currentLang === 'ar' ? 'تحليل ذكي تفصيلي' : 'Deep AI Analysis'}</p>
                      <p className="text-white/60 text-xs">{currentLang === 'ar' ? 'اضغط لتحليل مؤشراتك السلوكية السابقة مع المساعد الذكي' : 'Click to analyze your detailed metrics with our AI'}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
};
