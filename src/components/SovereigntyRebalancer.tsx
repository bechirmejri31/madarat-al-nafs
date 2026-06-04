import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, ShieldAlert, ShieldCheck, Eye, Volume2, UserCheck, Flame, Scale, Sparkles, Sliders, Play, RotateCcw } from 'lucide-react';

interface Scenario {
  id: string;
  title: { ar: string; en: string; fr: string };
  trigger: { ar: string; en: string; fr: string };
  reactiveResponse: { ar: string; en: string; fr: string };
  composureResponse: { ar: string; en: string; fr: string };
  bodyLanguage: { ar: string; en: string; fr: string };
  composureScore: number;
  presenceScore: number;
}

const scenarios: Scenario[] = [
  {
    id: "criticism",
    title: {
      ar: "النقد المجحف والمفاجئ",
      en: "Unjust & Sudden Criticism",
      fr: "Critique Injuste et Soudaine"
    },
    trigger: {
      ar: "شخص يوجه لك انتقاداً ساخراً أو متعمداً أمام الآخرين لتقليل هيبتك وإثارة ارتباكك.",
      en: "Someone unleashes a sarcastic or unfair criticism in front of colleagues to undermine your composure.",
      fr: "Quelqu'un critique de façon sarcastique ou injuste devant collègues pour miner votre dignité."
    },
    reactiveResponse: {
      ar: "التبرير المسرع ونبرات صوتية مهتزة أو مهاجمة المنتقد كلامياً بالمثل (يجعلك تبدو في وضع دفاعي ضعيف).",
      en: "Rushed self-defense, shaky high-pitched voice, or throwing aggressive insults back (makes you look defensive).",
      fr: "Mise en défense précipitée, voix chevrotante ou insultes agressives en retour (vous donne l'air fragile)."
    },
    composureResponse: {
      ar: "التزام صمت وقور لثلاث ثوانٍ بتواصل بصري متزن ثم الرد بسياق موجز وهادئ: 'رأيك سُجل، لكنه يفتقر للموضوعية والإنصاف. كيف ننتقل للنقطة العملية التالية؟'",
      en: "Hold dignified silence for 3 seconds with calm eye contact, then deliver a targeted reply: 'Your perspective is noted, but it lacks objectivity. Shall we move to the next actionable topic?'",
      fr: "Garder un silence digne pendant 3 secondes avec contact visuel calme, puis répondre : 'Votre avis est noté, bien qu'il manque d'objectivité. Passons-nous au point suivant ?'"
    },
    bodyLanguage: {
      ar: "إنزال الأكتاف لأسفل، عدم تشبيك الأيدي، ثبات الرأس والصدر مع إيقاع تنفس عميق ومنتظم.",
      en: "Broad shoulders downward, uncrossed arms, stable high forehead, and slow rhythmic diaphragmatic breathing.",
      fr: "Épaules détendues, bras non croisés, tête haute et stable, et respiration diaphragmatique lente."
    },
    composureScore: 95,
    presenceScore: 90
  },
  {
    id: "interruption",
    title: {
      ar: "محاولات مقاطعة الكلام",
      en: "Interruption Attempts",
      fr: "Tentatives d'Interruption"
    },
    trigger: {
      ar: "بينما تطرح نقطة جوهرية، يتعمد أحد الحاضرين الحديث بنغمة مرتفعة لقطع تدفق أفكارك.",
      en: "While explaining a key milestone, a speaker raises their voice over you to break your cognitive flow.",
      fr: "Alors que vous expliquez un point clé, un participant hausse le ton pour interrompre votre flux."
    },
    reactiveResponse: {
      ar: "الصمت السريع الممتعض مع تراجع تعبيرات الوجه، أو الاستمرار في الحديث بالصراخ للتغلب على صوته.",
      en: "Immediate submissive silence with visible annoyance, or shouting louder to forcefully stomp their voice.",
      fr: "Silence soumis et irrité instantané, ou hausser excessivement la voix pour couvrir la leur."
    },
    composureResponse: {
      ar: "الاستمرار في قول فكرتك بنفس النبرة الهادئة والسرعة المنتظمة تماماً، ورفع ظهر اليد اليمنى بارتفاع متوسط وصامت كإشارة توقف وقورة مع مواصلة الحديث، ثم إعطاؤه دوراً: 'سأنتهي سرياً ثم نسمع كلينا لإضافتك.'",
      en: "Maintain your smooth tempo and pitch, lift the back of your hand slightly as a elegant pause signal, complete your statement, then turn to them: 'I will finalize this thought, and then we are keen to hear your input.'",
      fr: "Maintenir votre rythme et ton constants, lever légèrement le revers de la main pour signaler une pause digne, terminer la phrase puis dire : 'Je finis cette idée, puis nous écouterons votre apport.'"
    },
    bodyLanguage: {
      ar: "إيماءة توجيه حركة يد رصينة تسحب الصدارة، عدم هز الرأس أو إظهار القلق، ثبات نبرات الأوتار الصوتية.",
      en: "Deliberate and slow hand gestures, zero head shaking, complete stability of vocal cords.",
      fr: "Gestes lents et délibérés, aucun mouvement de tête brusque, stabilité totale des cordes vocales."
    },
    composureScore: 90,
    presenceScore: 95
  },
  {
    id: "omission",
    title: {
      ar: "التجاهل أو التهميش الاجتماعي",
      en: "Social Omission & Disrespect",
      fr: "Omission ou Mépris Social"
    },
    trigger: {
      ar: "دخول موقع أو مكان جماعي دون أن يعيرك الحضور ترحيباً أو ينظروا لوجودك عمداً لإشعارك بضعف تقديرك.",
      en: "Entering a social setting or room where key figures ignore your entrance intentionally to lower your rank.",
      fr: "Entrer dans un lieu où les personnes présentes ignorent votre venue délibérément pour réduire votre aura."
    },
    reactiveResponse: {
      ar: "التودد والتوسل الحركي للفت الأنظار، العبث المستمر بالهاتف، أو إبداء الارتباك والانسحاب الخفي السريع.",
      en: "Needy interaction attempts, micro-fidgeting with your phone, or showing visible discomfort and leaving early.",
      fr: "Tentatives serviles de plaire, manipuler nerveusement le téléphone, ou s'éclipser rapidement de gêne."
    },
    composureResponse: {
      ar: "التقدم بخطوات واثقة ومستقيمة لمنتصف المكان، اتخاذ وضعية جلوس مريحة وممتدة لتملأ المساحة، وتوجيه تحية عامة واحدة بنبرة واضحة ومستقرة، دون السعي لإرضاء أو كسب انتباه أحد.",
      en: "Walk to the center with steady strides, occupy comfortable physical space, address the room with a single clear 'Good day' then resume your activities with full poise without waiting for approval.",
      fr: "S'avancer avec assurance, prendre une assise confortable en occupant l'espace, saluer une seule fois d'une voix posée, sans mendier aucune attention."
    },
    bodyLanguage: {
      ar: "الذقن موازية للأرض، الأيدي مستقرة على ركبتيك في اتساع، الحفاظ على نظرات فاحصة وبطيئة للمحيط.",
      en: "Chin parallel to the floor, open body posture, slow sweeping visual connection across the environment.",
      fr: "Menton parallèle au sol, posture ouverte, balayage visuel lent et serein de l'espace environnant."
    },
    composureScore: 88,
    presenceScore: 92
  },
  {
    id: "anger",
    title: {
      ar: "الغضب الانفعالي للآخر",
      en: "Others' Aggressive Anger",
      fr: "Colère Agressive d'Autrui"
    },
    trigger: {
      ar: "عميل، أو شريك سلوكي يصرخ في وجهك بحرارة وغضب جراء مشكلة ما لترهيبك ودفعك تحت سياق التنازل الانهزامي.",
      en: "A client or associate yells or aggressive complains to intimidate you into compliance.",
      fr: "Un client ou associé hurle de colère pour vous intimider et vous faire plier sous la panique."
    },
    reactiveResponse: {
      ar: "مبادلة الصراخ والانحدار لنفس المستنقع العاطفي، أو الرضوخ والانكسار الحركي ومسارقة النظر للمخارج.",
      en: "Yelling back and drowning in emotional mud, or shrinking away with apologetic, submissive body cues.",
      fr: "Crier à votre tour et sombrer dans l'invective, ou s'écraser avec des excuses serviles et angoissées."
    },
    composureResponse: {
      ar: "البقاء صامداً بهدوء تام كالمرآة يبعث الرهبة لامتصاص طاقة الغضب، والقول بنبرة حيادية واضحة وخفيضة: 'أتفهم حجم المشكلة وسأناقش حلولها العبقرية معك بمجرد هدوء أصواتنا لنسمع بعضنا البعض جيداً.'",
      en: "Remain still like a mirror, absorbing their fire. Speak in a lowered, crystal-clear tone: 'I understand the gravity of the situation. I will fully discuss options with you once the volume is down so we can hear each other.'",
      fr: "Rester perfectly immobile et calme, agissant comme un miroir. Dire d'un ton bas et limpide : 'Je comprends l'importance du problème. Nous en discuterons dès que le calme reviendra pour bien nous entendre.'"
    },
    bodyLanguage: {
      ar: "استرخاء عضلات الفك، عدم الانحناء للأمام، النفوذ البصري المستقر لمنطقة العين اليسرى للمتكلم.",
      en: "Relaxed jaw muscles, straight neutral spine without leaning backward, stable deep focus on the speaker's eyes.",
      fr: "Mâchoire détendue, colonne vertébrale droite sans recul, regard fixe et neutre sur la zone oculaire de l'autre."
    },
    composureScore: 97,
    presenceScore: 94
  }
];

interface SovereigntyRebalancerProps {
  currentLang: string;
  isRtl: boolean;
}

export const SovereigntyRebalancer: React.FC<SovereigntyRebalancerProps> = ({ currentLang, isRtl }) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("criticism");
  const [viewStep, setViewStep] = useState<'comparison' | 'body_blueprint'>('comparison');
  const [pressureMultiplier, setPressureMultiplier] = useState<number>(100); // 50% to 150%
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<'head' | 'throat' | 'shoulders' | 'core'>('head');

  const currentScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  // Adjust scores dynamically based on the pressure multiplier
  const dynamicComposure = Math.min(100, Math.max(10, Math.round(currentScenario.composureScore * (pressureMultiplier / 100))));
  const dynamicPresence = Math.min(100, Math.max(10, Math.round(currentScenario.presenceScore * (pressureMultiplier / 100))));
  const averageScore = Math.round((dynamicComposure + dynamicPresence) / 2);

  const getLocalizedText = (obj: { ar: string; en: string; fr: string }) => {
    return obj[currentLang as 'ar' | 'en' | 'fr'] || obj.ar;
  };

  const menuLabels = {
    ar: {
      heading: "معاير الرصانة والوقار السلوكي",
      subheading: "برمجية قياس نضج رد الفعل النفسي وتحجيم الانفعالات الاجتماعية الطارئة بدقة متناهية.",
      comparisonTab: "تحليل الاستجابة المقارن",
      blueprintTab: "معيار لغة الجسد والهيبة",
      triggerLabel: "المستثير الاجتماعي المفاجئ",
      reactiveTitle: "نمط الانفعال المندفع (تبديد الهيبة والكاريزما)",
      composureTitle: "منهج السيادة والوقار (صمت ملكي مهيب)",
      scoreCalibrator: "مؤشر الرصانة والاتزان الكلي",
      composureMetric: "الثبات الفلسفي",
      presenceMetric: "سلطة الحضور الاجتماعي",
      tryConcept: "نموذج الاتزان الفلسفي الذكي",
      alertNotice: "الاستسلام للمستثيرات السلوكية العاطفية يعزل حصانة ذاتك ويمنح الطرف الآخر السيطرة الكاملة على قراراتك.",
      pressureLevel: "اختيار شدة المثير الاجتماعي",
      calibrating: "جاري المعايرة الهيكلية..."
    },
    en: {
      heading: "Sovereign Composure & Gravitas Calibrator",
      subheading: "An advanced psychological simulator to measure, refine, and master reaction mechanics under high social pressure.",
      comparisonTab: "Comparative Impulse Analysis",
      blueprintTab: "Body Language & Aura Guidelines",
      triggerLabel: "Sudden Social Provocation",
      reactiveTitle: "Impulsive Reaction Mode (Charisma Dissipation)",
      composureTitle: "Sovereign Demeanor Mode (Regal Silence & Calm Authority)",
      scoreCalibrator: "Total Gravitas & Poise Indicator",
      composureMetric: "Philosophical Mind-Control",
      presenceMetric: "Social Presence Command",
      tryConcept: "Sovereign Composure System",
      alertNotice: "Submitting to immediate emotional reactions shatters your personal armor and transfers executive control of your mind directly to the instigator.",
      pressureLevel: "Simulated Conflict Pressure Intensity",
      calibrating: "Calibrating behavioral patterns..."
    },
    fr: {
      heading: "Calibrateur de Gravitas et Souveraineté",
      subheading: "Simulateur psychologique avancé de réglage du détachement et de la prestance face aux conflits sociaux inattendus.",
      comparisonTab: "Analyse d'Impulsions Comparée",
      blueprintTab: "Charte Corporelle de la Prestance",
      triggerLabel: "Provocation Sociale Soudaine",
      reactiveTitle: "Mode Réactif Impulsif (Dissipation Immédiate du Charisme)",
      composureTitle: "Postures de Souveraineté (Silence Royal & Registre Grave)",
      scoreCalibrator: "Indicateur Global de Gravitas et d'Équilibre",
      composureMetric: "Contrôle Mental Philosophique",
      presenceMetric: "Autorité de la Présence Sociale",
      tryConcept: "Système de Souveraineté Comportementale",
      alertNotice: "Céder aux micro-réactions instinctives annihile l'architecture de votre autorité et offre à autrui le pouvoir ultime de piloter vos humeurs.",
      pressureLevel: "Intensité de la Pression Conflituelle",
      calibrating: "Calibrage structurel en cours..."
    }
  }[currentLang as 'ar' | 'en' | 'fr'] || {
    heading: "معاير الرصانة والوقار السلوكي",
    subheading: "برمجية قياس نضج رد الفعل النفسي وتحجيم الانفعالات الاجتماعية الطارئة بدقة متناهية.",
    comparisonTab: "تحليل الاستجابة المقارن",
    blueprintTab: "معيار لغة الجسد والهيبة",
    triggerLabel: "المستثير الاجتماعي المفاجئ",
    reactiveTitle: "نمط الانفعال المندفع (تبديد الهيبة والكاريزما)",
    composureTitle: "منهج السيادة والوقار (صمت ملكي مهيب)",
    scoreCalibrator: "مؤشر الرصانة والاتزان الكلي",
    composureMetric: "الثبات الفلسفي",
    presenceMetric: "سلطة الحضور الاجتماعي",
    tryConcept: "نموذج الاتزان الفلسفي الذكي",
    alertNotice: "الاستسلام للمستثيرات السلوكية العاطفية يعزل حصانة ذاتك ويمنح الطرف الآخر السيطرة الكاملة على قراراتك.",
    pressureLevel: "اختيار شدة المثير الاجتماعي",
    calibrating: "جاري المعايرة الهيكلية..."
  };

  const handleRecalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
    }, 850);
  };

  return (
    <section id="soul-caliber" className="py-20 md:py-28 bg-[#030303] border-y border-white/5 relative overflow-hidden">
      {/* Immersive luxurious glowing mesh backgrounds */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-gold/10 via-transparent to-transparent rounded-full filter blur-[120px] pointer-events-none opacity-40" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-gold/5 via-transparent to-transparent rounded-full filter blur-[150px] pointer-events-none opacity-30" />
      
      {/* Majestic Thin Golden Thread Accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
        
        {/* Superior Heading Design with Luxury Branding Core */}
        <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-gold/15 via-gold/5 to-transparent border border-gold/30 rounded-full"
          >
            <Compass className="w-4 h-4 text-gold animate-spin-slow" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gold">
              {menuLabels.tryConcept}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-serif text-white italic tracking-tight font-black leading-tight selection:bg-gold selection:text-black">
            {menuLabels.heading}
          </h2>

          <div className="w-16 h-px bg-gold/40 mx-auto my-3" />

          <p className="text-white/60 text-sm md:text-base font-serif italic max-w-2xl mx-auto leading-relaxed">
            {menuLabels.subheading}
          </p>
        </div>

        {/* Dynamic Multi-Step Calibration Tab Strip */}
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar scroll-smooth justify-start md:justify-center mb-12 border-b border-white/5 relative">
          {scenarios.map((scen, idx) => {
            const isActive = scen.id === activeScenarioId;
            return (
              <button
                key={scen.id}
                onClick={() => {
                  setActiveScenarioId(scen.id);
                  setViewStep('comparison');
                  handleRecalibrate();
                }}
                className={`py-3.5 px-6 rounded-2xl text-xs font-serif italic shrink-0 transition-all duration-500 border flex items-center gap-3 shadow-lg cursor-pointer ${
                  isActive 
                    ? 'bg-gradient-to-b from-gold to-[#c59b27] text-black font-extrabold border-gold shadow-[0_12px_24px_rgba(212,175,55,0.25)] scale-[1.03]' 
                    : 'bg-white/[0.02] text-white/50 border-white/5 hover:border-gold/30 hover:bg-gold/[0.02] hover:text-white'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-black animate-pulse' : 'bg-gold/40'}`} />
                <span className="tracking-wide">
                  <span className="text-[9px] opacity-60 font-mono block text-left">0{idx + 1}.</span>
                  {getLocalizedText(scen.title)}
                </span>
              </button>
            );
          })}
        </div>

        {/* The Bento Core Control Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Context Left Panel (8 columns wide for detailed analytics) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            
            {/* Massive Dramatic Conflict Arena Banner */}
            <div className="bg-gradient-to-b from-[#0a0a0a] to-[#040404] border border-white/5 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[170px]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-gold/5 via-transparent to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/[0.01] rounded-full filter blur-xl pointer-events-none" />
              
              <div className="flex items-start gap-4 z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/30 flex-shrink-0 animate-pulse">
                  <Flame className="w-6 h-6 text-gold" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-gold font-mono uppercase tracking-[0.3em] font-black block">
                    {menuLabels.triggerLabel}
                  </span>
                  <div className="h-0.5 w-10 bg-gold/50 my-1" />
                  <blockquote className="text-white font-serif italic text-lg md:text-xl leading-relaxed text-shadow max-w-4xl antialiased">
                    "{getLocalizedText(currentScenario.trigger)}"
                  </blockquote>
                </div>
              </div>

              {/* simulated pressure trigger slider bar to feel live response change */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pt-6 mt-6 border-t border-white/5 z-10">
                <div className="flex items-center gap-3">
                  <Sliders className="w-4 h-4 text-gold/60" />
                  <span className="text-xs text-white/50 font-serif italic">
                    {menuLabels.pressureLevel}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="50" 
                    max="140" 
                    value={pressureMultiplier}
                    onChange={(e) => {
                      setPressureMultiplier(Number(e.target.value));
                    }}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold glow-slider"
                  />
                  <span className="text-xs font-mono text-gold font-bold min-w-[40px] text-center">
                    {pressureMultiplier}%
                  </span>
                </div>
              </div>
            </div>

            {/* Premium Selector: Comparative Response Mode vs Body Blueprint Mode */}
            <div className="flex border-b border-white/5 gap-8">
              <button 
                onClick={() => setViewStep('comparison')}
                className={`pb-4 text-[11px] uppercase tracking-[0.2em] font-black transition-all relative cursor-pointer ${viewStep === 'comparison' ? 'text-gold' : 'text-white/40 hover:text-white/70'}`}
              >
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{menuLabels.comparisonTab}</span>
                </div>
                {viewStep === 'comparison' && (
                  <motion.div layoutId="hoverUnderline" className="absolute bottom-0 inset-x-0 h-[2px] bg-gold" />
                )}
              </button>
              
              <button 
                onClick={() => setViewStep('body_blueprint')}
                className={`pb-4 text-[11px] uppercase tracking-[0.2em] font-black transition-all relative cursor-pointer ${viewStep === 'body_blueprint' ? 'text-gold' : 'text-white/40 hover:text-white/70'}`}
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{menuLabels.blueprintTab}</span>
                </div>
                {viewStep === 'body_blueprint' && (
                  <motion.div layoutId="hoverUnderline" className="absolute bottom-0 inset-x-0 h-[2px] bg-gold" />
                )}
              </button>
            </div>

            {/* Core Dynamic Content Displays */}
            <div className="min-h-[260px] flex flex-col justify-stretch">
              <AnimatePresence mode="wait">
                {isCalibrating ? (
                  <motion.div 
                    key="calibrating-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full bg-black/40 border border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center space-y-4 min-h-[220px]"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
                    <span className="text-xs text-gold/80 font-mono tracking-widest">{menuLabels.calibrating}</span>
                  </motion.div>
                ) : viewStep === 'comparison' ? (
                  <motion.div
                    key="comparison-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {/* Defeated Reaction Card */}
                    <div className="bg-[#180808]/40 border border-red-950/40 rounded-3xl p-6 space-y-5 hover:border-red-900/40 transition-all duration-500 flex flex-col justify-between group">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2.5 text-red-400">
                          <div className="w-6 h-6 rounded-full bg-red-950/80 flex items-center justify-center">
                            <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                          </div>
                          <span className="text-[9px] uppercase font-mono tracking-[0.15em] font-black">
                            {menuLabels.reactiveTitle}
                          </span>
                        </div>
                        <div className="w-12 h-[1px] bg-red-900/20" />
                        <p className="text-white/60 text-sm leading-relaxed font-serif italic group-hover:text-white/80 transition-colors">
                          "{getLocalizedText(currentScenario.reactiveResponse)}"
                        </p>
                      </div>
                      <div className="pt-4 border-t border-white/5">
                        <div className="text-[10px] text-red-500/40 font-serif italic">
                          ⊘ {menuLabels.alertNotice}
                        </div>
                      </div>
                    </div>

                    {/* Master Sovereign Composure Card */}
                    <div className="bg-gradient-to-b from-[#0a0a0a] to-[#040404] border border-gold/40 rounded-3xl p-7 space-y-5 hover:border-gold transition-all duration-700 flex flex-col justify-between shadow-[0_15px_30px_rgba(212,175,55,0.06)] relative group">
                      {/* Premium gold glow effect on top */}
                      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50 block" />
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2.5 text-gold">
                          <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center shadow-inner">
                            <ShieldCheck className="w-4 h-4 text-gold" />
                          </div>
                          <span className="text-[10px] uppercase font-mono tracking-[0.2em] font-black">
                            {menuLabels.composureTitle}
                          </span>
                        </div>
                        <div className="w-16 h-[1px] bg-gold/30" />
                        <p className="text-white text-base md:text-lg leading-relaxed font-serif italic font-medium antialiased text-glow">
                          "{getLocalizedText(currentScenario.composureResponse)}"
                        </p>
                      </div>
                      <div className="pt-5 border-t border-gold/20">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-gold uppercase tracking-[0.2em] font-black flex items-center gap-1.5">
                            <UserCheck className="w-4 h-4" />
                            {currentLang === 'ar' ? 'نمط السيادة المفعل' : 'Active Sovereignty'}
                          </span>
                          <span className="text-[10px] text-white/50 italic font-mono bg-white/5 px-2 py-0.5 rounded-full">
                            Composure Premium +{currentScenario.composureScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="blueprint-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#0b0b0b] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/[0.01] rounded-bl-full pointer-events-none" />
                    
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 flex-shrink-0">
                        <UserCheck className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="text-white text-base font-serif italic text-glow font-bold leading-tight">
                          {currentLang === 'ar' ? 'نموذج محاكاة هالة الوقار والجسد المتزن' : 'Interactive Gravitas Aura & Body Simulator'}
                        </h4>
                        <p className="text-white/50 text-xs font-serif italic">
                          {currentLang === 'ar' ? 'انقر على مفاقط الطاقة السلوكية بالذهب لتعديل وتحليل استجابة الجسد اللاشعورية' : 'Click on the golden behavioral hotspots to analyze and modulate involuntary body language response'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-black/60 p-6 rounded-2xl border border-white/5">
                      {/* The Interactive Gold Silhouette Vector */}
                      <div className="md:col-span-5 flex flex-col items-center justify-center p-2 bg-gradient-to-b from-white/[0.01] to-transparent rounded-xl border border-white/5">
                        <div className="relative w-full flex justify-center">
                          <svg viewBox="0 0 200 280" className="w-[180px] h-[250px] text-gold overflow-visible">
                            {/* Inner ambient glow rings */}
                            <circle cx="100" cy="140" r="100" className="stroke-gold/5 fill-none stroke-[0.5] stroke-dasharray-[2_6] animate-spin-slow" />
                            <circle cx="100" cy="140" r="70" className="stroke-gold/5 fill-none stroke-[0.5]" />
                            <circle cx="100" cy="140" r="40" className="stroke-gold/10 fill-none stroke-[0.5]" />

                            {/* Human Contour Silhouette */}
                            {/* Spine Line */}
                            <path d="M100 45 Q100 85 100 130 T100 240" className="stroke-gold/30 fill-none stroke-[1]" />
                            {/* Head Oval */}
                            <circle cx="100" cy="35" r="14" className="stroke-gold/40 fill-none stroke-[1.2]" />
                            {/* Face feature path */}
                            <path d="M94 40 Q100 45 106 40" className="stroke-gold/50 fill-none stroke-[0.8]" />
                            {/* Robust Composed Shoulders */}
                            <path d="M68 70 C 80 60, 120 60, 132 70" className="stroke-gold/70 fill-none stroke-[1.8]" />
                            {/* Lateral Chest Profile */}
                            <path d="M68 70 L74 130 L84 220" className="stroke-gold/25 fill-none stroke-[1]" />
                            <path d="M132 70 L126 130 L116 220" className="stroke-gold/25 fill-none stroke-[1]" />
                            {/* Restive uncrossed composed hands of presence */}
                            <path d="M68 70 L58 125 L68 165" className="stroke-gold/35 fill-none stroke-[1]" />
                            <path d="M132 70 L142 125 L132 165" className="stroke-gold/35 fill-none stroke-[1]" />

                            {/* Pulsing Aura field linked to selected hotspot */}
                            {activeHotspot === 'head' && <circle cx="100" cy="28" r="22" className="stroke-gold/20 fill-gold/[0.02] stroke-[0.5] animate-pulse" />}
                            {activeHotspot === 'throat' && <circle cx="100" cy="56" r="20" className="stroke-gold/20 fill-gold/[0.02] stroke-[0.5] animate-pulse" />}
                            {activeHotspot === 'shoulders' && <circle cx="100" cy="74" r="25" className="stroke-gold/20 fill-gold/[0.02] stroke-[0.5] animate-pulse" />}
                            {activeHotspot === 'core' && <circle cx="100" cy="115" r="25" className="stroke-gold/20 fill-gold/[0.02] stroke-[0.5] animate-pulse" />}

                            {/* HOTSPOT 1: Head */}
                            <g className="cursor-pointer" onClick={() => setActiveHotspot('head')}>
                              <circle cx="100" cy="28" r="7" className={`fill-[#050505] transition-all duration-300 ${activeHotspot === 'head' ? 'stroke-gold stroke-[3] fill-gold/20' : 'stroke-gold/55 stroke-[1.5] hover:stroke-gold/90'}`} />
                              <circle cx="100" cy="28" r="16" className={`stroke-gold/30 fill-none stroke-[0.5] ${activeHotspot === 'head' ? 'animate-ping' : 'opacity-0'}`} />
                            </g>

                            {/* HOTSPOT 2: Throat */}
                            <g className="cursor-pointer" onClick={() => setActiveHotspot('throat')}>
                              <circle cx="100" cy="56" r="7" className={`fill-[#050505] transition-all duration-300 ${activeHotspot === 'throat' ? 'stroke-gold stroke-[3] fill-gold/20' : 'stroke-gold/55 stroke-[1.5] hover:stroke-gold/90'}`} />
                              <circle cx="100" cy="56" r="16" className={`stroke-gold/30 fill-none stroke-[0.5] ${activeHotspot === 'throat' ? 'animate-ping' : 'opacity-0'}`} />
                            </g>

                            {/* HOTSPOT 3: Shoulders */}
                            <g className="cursor-pointer" onClick={() => setActiveHotspot('shoulders')}>
                              <circle cx="100" cy="74" r="7" className={`fill-[#050505] transition-all duration-300 ${activeHotspot === 'shoulders' ? 'stroke-gold stroke-[3] fill-gold/20' : 'stroke-gold/55 stroke-[1.5] hover:stroke-gold/90'}`} />
                              <circle cx="100" cy="74" r="16" className={`stroke-gold/30 fill-none stroke-[0.5] ${activeHotspot === 'shoulders' ? 'animate-ping' : 'opacity-0'}`} />
                            </g>

                            {/* HOTSPOT 4: Core Diaphragm */}
                            <g className="cursor-pointer" onClick={() => setActiveHotspot('core')}>
                              <circle cx="100" cy="115" r="7" className={`fill-[#050505] transition-all duration-300 ${activeHotspot === 'core' ? 'stroke-gold stroke-[3] fill-gold/20' : 'stroke-gold/55 stroke-[1.5] hover:stroke-gold/90'}`} />
                              <circle cx="100" cy="115" r="16" className={`stroke-gold/30 fill-none stroke-[0.5] ${activeHotspot === 'core' ? 'animate-ping' : 'opacity-0'}`} />
                            </g>
                          </svg>

                          <div className="absolute top-2 left-2 bg-black/[0.6] px-2 py-1 rounded border border-white/5 font-mono text-[8px] text-white/40">
                            COORD // ACTIVE
                          </div>
                        </div>

                        {/* Interactive Selection Legend Pills */}
                        <div className="flex flex-wrap gap-1.5 justify-center mt-3 pt-3 border-t border-white/5 w-full">
                          {[
                            { key: 'head', label: currentLang === 'ar' ? 'التاج' : 'Crown' },
                            { key: 'throat', label: currentLang === 'ar' ? 'الصوت' : 'Resonance' },
                            { key: 'shoulders', label: currentLang === 'ar' ? 'الكتف والقامة' : 'Shoulders' },
                            { key: 'core', label: currentLang === 'ar' ? 'الباطن' : 'Core' }
                          ].map(item => (
                            <button
                              key={item.key}
                              target-id={`legend-pill-${item.key}`}
                              onClick={() => setActiveHotspot(item.key as any)}
                              className={`px-2 py-0.5 rounded-full text-[8px] font-mono transition-all border cursor-pointer ${activeHotspot === item.key ? 'bg-gold/20 text-gold border-gold/30' : 'bg-white/5 text-white/40 border-transparent hover:text-white'}`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Display Info Details for Selected Hotspot */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl space-y-3 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gold/[0.01] rounded-bl-full pointer-events-none" />
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-gold/70">
                              HOTSPOT // ZONE_{activeHotspot.toUpperCase()}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                          </div>

                          <h5 className="text-white text-lg font-serif italic text-glow font-bold">
                            { {
                              head: currentLang === 'ar' ? "التاج والصمت المهيب" : "The Silent Regal Crown",
                              throat: currentLang === 'ar' ? "مركز الرنين الصوتي الصامت" : "Vocal Resonance Core",
                              shoulders: currentLang === 'ar' ? "درع الهيكل والقام الوقور" : "Posture & Shoulder Alignment Armor",
                              core: currentLang === 'ar' ? "الحجاب الحاجز والهدوء الباطني" : "Solar Diaphragmatic Core"
                            }[activeHotspot] }
                          </h5>

                          <div className="w-10 h-px bg-gold/30" />

                          <p className="text-white/85 text-sm leading-relaxed font-serif italic antialiased leading-[1.6]">
                            { {
                              head: currentLang === 'ar' ? "إبقاء الرأس ثابتاً، رفع الذقن موازياً للأرض، وتجنب الرمش السريع أو هز الرأس الموافقة اللاشعورية للمستثيرين. هذا يعكس حصانة داخلية ورفض الخضوع تحت العاطفة." : "Keep your head perfectly steady, chin parallel to the floor, and avoid rapid blinking or reflexive nodding. This signals solid immune integrity of your mind and absolute refusal of external psychological takeover.",
                              throat: currentLang === 'ar' ? "توليد نبرة صوتية هادئة ومنخفضة التردد، يتم إخراجها من عمق الصدر مع وتيرة حديث أبطأ بنسبة ٢٠٪. السكون السمعي يثبت أنك مسيطر تماماً على زمام الموقف وقدراتك العقلية." : "Channel low, slow, chest-resonant vocal pitches. Lowering your speaking tempo by 20% displays overwhelming control, forcing speakers or provokers to lower their tone to match your solid gravity.",
                              shoulders: currentLang === 'ar' ? "توسيع الكتفين وخفضهما لأسفل بشكل مسترخٍ تماماً، مع تجنب تشبيك الأيدي أو العبث بالهاتف والأصابع. اتخاذ جسد ممتد يفرغ لغة الجسد الدفاعية ويثبت طمأنينة السيادة الكلية." : "Broaden and relax your shoulders downward, locking your hands gently or resting them open on surfaces. Avoid defensive shields like crossing arms or fidgeting, demonstrating fearless spatial dominance.",
                              core: currentLang === 'ar' ? "تنفس بطني بطيء وعميق (شهيق من الأنف ٤ ثوان، زفير هادئ ٦ ثوان). هذا الإيقاع يجبر العصب الحائر على كبح الأدرينالين وخفض ضربات القلب لتظل عقليتك باردة ومشرطية التشريح." : "Maintain deep diaphragmatic breathing (4s inhale, 6s exhale). This deliberate tempo stimulates the vagus nerve to actively suppress adrenaline surges, keeping your cortical brain cold, analytical, and untouched."
                            }[activeHotspot] }
                          </p>
                        </div>

                        {/* Animated wave analyzer specific to the active zone */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                            <span className="text-[9px] text-white/30 block uppercase font-mono">{currentLang === 'ar' ? 'تردد الهالة' : 'Aura Resonance'}</span>
                            <span className="text-xs text-gold font-medium font-mono">{activeHotspot === 'head' ? 'Ultra Solid 1.2Hz' : activeHotspot === 'throat' ? 'Deep Resonant 85Hz' : activeHotspot === 'shoulders' ? 'Aligned Neutral' : 'Calm Vagal 60bpm'}</span>
                          </div>
                          
                          <div className="bg-white/[0.01] border border-white/5 p-3 rounded-xl">
                            <span className="text-[9px] text-white/30 block uppercase font-mono">{currentLang === 'ar' ? 'الحصانة السلوكية' : 'Behavioral Immunity'}</span>
                            <span className="text-xs text-white/80 font-medium font-mono">+{activeHotspot === 'head' ? '98%' : activeHotspot === 'throat' ? '95%' : activeHotspot === 'shoulders' ? '92%' : '97%'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Majestic Royal Calibrator Gauge (Right 4 columns) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#090909] to-[#040404] border border-white/5 rounded-3xl p-6.5 flex flex-col justify-between space-y-8 relative overflow-hidden shadow-2xl min-h-[500px]">
            {/* Elegant corner lighting */}
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-gold/10 rounded-full filter blur-xl pointer-events-none" />
            
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 block text-center lg:text-left">
                {menuLabels.scoreCalibrator}
              </span>
              <div className="h-0.5 w-12 bg-gold/30 mx-auto lg:mx-0" />

              {/* Composition Radial Meter Shield Model */}
              <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                
                {/* Back Outer Ambient Aura Ring */}
                <div className="absolute inset-0 rounded-full border border-gold/5 scale-110 pointer-events-none" />
                
                {/* SVG circular track */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="68"
                    className="stroke-white/5 fill-none"
                    strokeWidth="5"
                  />
                  <motion.circle
                    cx="88"
                    cy="88"
                    r="68"
                    className="stroke-gold fill-none"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="427.26"
                    initial={{ strokeDashoffset: 427.26 }}
                    animate={{ strokeDashoffset: 427.26 - (427.26 * averageScore) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>

                <div className="absolute flex flex-col items-center">
                  <motion.span 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="text-4xl md:text-5xl font-serif text-white font-black text-shadow"
                  >
                    {averageScore}%
                  </motion.span>
                  <span className="text-[9px] text-gold uppercase tracking-[0.2em] font-black font-mono">
                    Sovereign Index
                  </span>
                </div>
              </div>
            </div>

            {/* Live Sliders showing metrics dynamically modified by simulated pressure */}
            <div className="space-y-5 pt-8 border-t border-white/5">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70 font-serif italic">{menuLabels.composureMetric}</span>
                  <span className="text-gold font-mono font-bold">{dynamicComposure}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${dynamicComposure}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-gold/50 to-gold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/70 font-serif italic">{menuLabels.presenceMetric}</span>
                  <span className="text-gold font-mono font-bold">{dynamicPresence}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${dynamicPresence}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-gold/50 to-gold"
                  />
                </div>
              </div>
            </div>

            {/* Signature Quote of Calibrator */}
            <div className="p-5 bg-gold/[0.02] border border-gold/10 rounded-2xl relative overflow-hidden">
              <div className="absolute bottom-1 right-2 opacity-5">
                <Compass className="w-12 h-12 text-gold" />
              </div>
              <p className="text-xs text-white/50 italic font-serif leading-relaxed text-center relative z-10 antialiased font-medium leading-[1.6]">
                {currentLang === 'ar' 
                  ? '"الوقار لا يبثه الصراخ، بل ينبع من عمق سيادة هدوء الذات وصمود الوعي على عواصف الانفعالات اللحظية."' 
                  : '"Power is not projected by noise, but is crafted through quiet dominance of the self over external storms."'}
              </p>
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
};
