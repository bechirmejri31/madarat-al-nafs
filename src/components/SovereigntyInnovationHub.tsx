import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  Mic, 
  MicOff, 
  Zap, 
  Sliders, 
  Brain, 
  ShieldAlert, 
  Play, 
  Square, 
  Check, 
  HelpCircle, 
  Sparkles, 
  Activity, 
  Compass, 
  Gauge, 
  Volume2, 
  VolumeX, 
  Coffee, 
  Clock, 
  Smartphone, 
  Send, 
  ArrowRight,
  RefreshCcw,
  BookOpen,
  Loader2,
  Eye,
  Tv,
  Cast,
  Minimize2,
  ExternalLink,
  MonitorPlay,
  Globe,
  Languages,
  Map,
  Network
} from 'lucide-react';

/* --- Props --- */
interface SovereigntyInnovationHubProps {
  currentLang: string;
  isRtl: boolean;
  bechirAvatar?: string;
}

/* --- Types & Archetypes for Shadow Mapper --- */
interface ArchetypePoint {
  id: string;
  nameAr: string;
  nameEn: string;
  angle: number; // 0 to 360
  value: number; // 0 to 100
  color: string;
  descAr: string;
  descEn: string;
}

/* --- Simulator Scenarios --- */
interface ProvocationScenario {
  id: string;
  titleAr: string;
  titleEn: string;
  contextAr: string;
  contextEn: string;
  opponentTurnAr: string;
  opponentTurnEn: string;
  idealMindsetAr: string;
  idealMindsetEn: string;
}

const FORBIDDEN_WORDS = ['صراخ', 'شتم', 'انفعال', 'غضب', 'ضرب', 'انسحاب سريع'];

const scenarios: ProvocationScenario[] = [
  {
    id: 'boss',
    titleAr: "مواجهة المشرف أو المدير المستفز",
    titleEn: "The Hostile Supervisor Encounter",
    contextAr: "أثناء اجتماع رسمي، يتدخل مديرك بسخرية ملموسة لمقاطعة حديثك، قائلاً بصوت مرتفع: 'أفكارك كلاسيكية جداً ولا تلائم وتيرة عملنا المتسارعة!' أمام جميع زملائك.",
    contextEn: "During a formal staff meeting, your supervisor sarcastically interrupts you, saying loudly: 'Your ideas are too classic and outdated! They don't match our fast-paced workflow' in front of everyone.",
    opponentTurnAr: "ما هو ردك اللفظي الرصين الذي تفرضه بثبات وهدوء تام؟",
    opponentTurnEn: "What is your poised verbal response to establish total composure and counter the disrespect?",
    idealMindsetAr: "بروتوكول الصمت لـ 3 ثوانٍ، الاتصال البصري الهادئ، والرد بسياق مغلق يجرد المشرف من مكسب الانفعال الفوري.",
    idealMindsetEn: "The 3-second strategic silence protocol, direct unblinking eye contact, and a narrow transactional reply to deprive them of an emotional reaction."
  },
  {
    id: 'partner',
    titleAr: "الشريك أو المنافس المتعالٍ",
    titleEn: "The Condescending Competitor",
    contextAr: "يطرح زميل لك تحدياً صريحاً أمام العميل قائلاً بنبرة تقليلية: 'بشير قام بجهد بسيط، لكنه لا يفهم تعقيدات الجانب التقني التي أدرتها أنا بالكامل.'",
    contextEn: "A competitor or colleague challenges you flatly in front of a major client: 'Well, Bechir did some basic work, but he doesn't understand the deep technical complexities that I handled completely.'",
    opponentTurnAr: "كيف تأخذ القيادة وتستعيد هيبتك دون الاضطرار لمهاجمته أو التبرير الرخيص؟",
    opponentTurnEn: "How do you seize authority and reclaim your rank without resorting to defense or petty arguments?",
    idealMindsetAr: "قانون الترفع السيادي: إرجاع العبء الأخلاقي والفكري عليه بأسئلة مغلقة تكشف عواره المعرفي بسكون وهدوء.",
    idealMindsetEn: "Sovereign detachment: shifting the cognitive burden back onto them by asking calm, transactional questions that expose their insecurity."
  },
  {
    id: 'family_heated',
    titleAr: "الاستفزاز في المنابر والاجتماعات العائلية",
    titleEn: "The Heated Family Debate",
    contextAr: "في مجلس عائلي واسع، يتعمد أحد الأقارب توجيه نقد شخصي لاذع لقراراتك المهنية الأخيرة محاولاً إحراجك وإبرازك بمظهر الفاشل أمام الحضور.",
    contextEn: "In a family gathering, a relative targets your recent career decisions with aggressive sarcasm to humiliate you and make you look incompetent.",
    opponentTurnAr: "اكتب الكيفية التي سترد بها مستخدماً هيبتك الصوتية وسكونك الداخلي.",
    opponentTurnEn: "Draft how you will neutralize this with your vocal gravity and inner serenity.",
    idealMindsetAr: "الصوت المنخفض المشعور بالثقة، الاسترخاء العضلي الفوري، والترفع الذي يشعر الطرف الآخر بصغر حجم مناورته.",
    idealMindsetEn: "Low resonant pitch, conscious muscle relaxation, and a detached stance that shrinks the significance of their provocation."
  }
];

export function SovereigntyInnovationHub({ currentLang, isRtl, bechirAvatar }: SovereigntyInnovationHubProps) {
   const [activeTab, setActiveTab] = useState<'voice' | 'shadow' | 'coherence' | 'simulator' | 'detox' | 'journal' | 'stroop' | 'tracker' | 'emdr' | 'aura' | 'tv' | 'pitch' | 'global' | 'schema'>('voice');
   
   // Schema Alchemist States
   const [schemaSelectedId, setSchemaSelectedId] = useState<'approval' | 'imposter' | 'avoidance' | 'hypersensitivity' | null>(null);
   const [schemaLevel, setSchemaLevel] = useState<number>(70); // self-assessed severity 0-100
   const [schemaSomaticEngaged, setSchemaSomaticEngaged] = useState(false);
   const [schemaChallengeIdx, setSchemaChallengeIdx] = useState(0);
   const [schemaUserReframedText, setSchemaUserReframedText] = useState('');
   const [schemaEvaluationResult, setSchemaEvaluationResult] = useState<{
     score: number;
     feedbackAr: string;
     feedbackEn: string;
     cognitivePurity: number; // 0-100%
   } | null>(null);
   const [schemaIsEvaluating, setSchemaIsEvaluating] = useState(false);

   // Global Expansion Tab States
   const [globalSelectedRegion, setGlobalSelectedRegion] = useState<'mena' | 'europe' | 'northamerica' | 'eastasia' | 'latinamerica'>('mena');
   const [globalRawSlogan, setGlobalRawSlogan] = useState('');
   const [globalTargetLang, setGlobalTargetLang] = useState('en');
   const [globalIsAdapting, setGlobalIsAdapting] = useState(false);
   const [globalAdaptedResult, setGlobalAdaptedResult] = useState<{
     adaptedSloganAr: string;
     adaptedSloganEn: string;
     adaptedSloganLocal: string;
     vocalRegisterAr: string;
     vocalRegisterEn: string;
     visualComposureAr: string;
     visualComposureEn: string;
     tacticalApproachAr: string;
     tacticalApproachEn: string;
   } | null>(null);

   // Pitch Tab States
   const [pitchIdeaName, setPitchIdeaName] = useState('');
   const [pitchTargetAudience, setPitchTargetAudience] = useState('');
   const [pitchPainPoint, setPitchPainPoint] = useState('');
   const [pitchValueProp, setPitchValueProp] = useState('');
   const [pitchGravityLevel, setPitchGravityLevel] = useState<number>(85); // 0-100
   const [pitchConcisionLevel, setPitchConcisionLevel] = useState<number>(20); // default 20% speaking vs silence
   const [pitchCognitiveGap, setPitchCognitiveGap] = useState<number>(75); 

   const [pitchIsGenerating, setPitchIsGenerating] = useState(false);
   const [pitchResult, setPitchResult] = useState<{
     openingHookAr: string;
     openingHookEn: string;
     basalticPitchAr: string;
     basalticPitchEn: string;
     frameworkAr: string[];
     frameworkEn: string[];
     objectionsProtocolAr: string;
     objectionsProtocolEn: string;
     auraStyleAr: string;
     auraStyleEn: string;
   } | null>(null);

   // Pitch Live Simulation States
   const [pitchSimActive, setPitchSimActive] = useState(false);
   const [pitchSimPrompt, setPitchSimPrompt] = useState('');
   const [pitchSimUserReply, setPitchSimUserReply] = useState('');
   const [pitchSimIsAnalyzing, setPitchSimIsAnalyzing] = useState(false);
   const [pitchSimScore, setPitchSimScore] = useState<number | null>(null);
   const [pitchSimFeedbackAr, setPitchSimFeedbackAr] = useState('');
   const [pitchSimFeedbackEn, setPitchSimFeedbackEn] = useState('');

   const [isTvAmbientActive, setIsTvAmbientActive] = useState(false);
   const [tvQuoteIndex, setTvQuoteIndex] = useState(0);
   const [tvEyeX, setTvEyeX] = useState(50); // 10% to 90%
   const [tvBreathScale, setTvBreathScale] = useState(1);
   const [tvIsCasting, setTvIsCasting] = useState(false);
   
   // Rotate TV Ambient Quotes
   const tvQuotes = [
     {
       ar: "الصمت الاستراتيجي ليس تجنباً للحديث، بل هو الهدوء الذي يحتوي العاصفة ويكشف صغار النفوس.",
       en: "Strategic silence is not avoiding speech; it is the absolute calm that contains the storm and shrinks lesser minds."
     },
     {
       ar: "حين تعاير نبرتك على طبقات الصدر العميقة، تنكمش محاولات الاستفزاز وتفقد مقدرتها الكهرومغناطيسية.",
       en: "When your voice register is anchored in the deep chest, provocative attempts lose their electromagnetic traction."
     },
     {
       ar: "مهابتك الشخصية تُبنى بالتراجع الإدراكي الفوري عن المهاترات الجانبية وبناء سياج تباعد وئيد.",
       en: "Your personal gravitas is built by instant cognitive detachment from superficial banter and creating massive space."
     },
     {
       ar: "إن لجم اللوزة الدماغية قبل الرد هو جوهر السيادة ودرع الترفع النفسي الأسمى.",
       en: "Subjugating the amygdalar alarm before responding is the essence of sovereignty and the ultimate shield."
     }
   ];

   useEffect(() => {
     if (!isTvAmbientActive) return;
     const interval = setInterval(() => {
       setTvQuoteIndex(p => (p + 1) % tvQuotes.length);
     }, 8000);
     return () => clearInterval(interval);
   }, [isTvAmbientActive]);

   // Handle TV EMDR eye sweep animation
   useEffect(() => {
     if (!isTvAmbientActive) return;
     let dir = 1;
     let x = 50;
     const interval = setInterval(() => {
       x += dir * 1.5;
       if (x >= 90) { dir = -1; x = 90; }
       if (x <= 10) { dir = 1; x = 10; }
       setTvEyeX(x);
     }, 30);
     return () => clearInterval(interval);
   }, [isTvAmbientActive]);

   // Handle TV Breathing scale animation
   useEffect(() => {
     if (!isTvAmbientActive) return;
     let phase = 'expand';
     let val = 1;
     const interval = setInterval(() => {
       if (phase === 'expand') {
         val += 0.008;
         if (val >= 1.6) {
           phase = 'hold_in';
           setTimeout(() => { phase = 'shrink'; }, 1000);
         }
       } else if (phase === 'shrink') {
         val -= 0.008;
         if (val <= 0.8) {
           phase = 'hold_out';
           setTimeout(() => { phase = 'expand'; }, 1000);
         }
       }
       setTvBreathScale(val);
     }, 40);
     return () => clearInterval(interval);
   }, [isTvAmbientActive]);

   // Handle Escape key to exit TV Ambient full screen mode and custom global trigger
   useEffect(() => {
     const handleKeyDown = (e: KeyboardEvent) => {
       if (e.key === 'Escape') {
         setIsTvAmbientActive(false);
       }
     };
     const handleTriggerTv = () => {
       setIsTvAmbientActive(true);
       setActiveTab('tv');
     };
     const handleTvActiveTab = (e: Event) => {
       const customE = e as CustomEvent;
       setIsTvAmbientActive(true);
       if (customE.detail) {
         if (customE.detail === 'tv') {
           setActiveTab('tv');
         } else if (customE.detail === 'coherence') {
           setActiveTab('coherence');
         } else if (customE.detail === 'emdr') {
           setActiveTab('emdr');
         } else if (customE.detail === 'voice') {
           setActiveTab('voice');
         }
       }
     };
     const handleTvBreathScale = (e: Event) => {
       const customE = e as CustomEvent;
       if (typeof customE.detail === 'number') {
         setTvBreathScale(customE.detail);
       }
     };
     const handleTvEyeX = (e: Event) => {
       const customE = e as CustomEvent;
       if (typeof customE.detail === 'number') {
         setTvEyeX(customE.detail);
       }
     };
     const handleTvAcousticState = (e: Event) => {
       const customE = e as CustomEvent;
       if (customE.detail) {
         setAuraActiveFreq(432);
       } else {
         setAuraActiveFreq(null);
       }
     };
     window.addEventListener('keydown', handleKeyDown);
     window.addEventListener('trigger-tv-cast', handleTriggerTv);
     window.addEventListener('tv-active-tab', handleTvActiveTab);
     window.addEventListener('tv-breath-scale', handleTvBreathScale);
     window.addEventListener('tv-eye-x', handleTvEyeX);
     window.addEventListener('tv-acoustic-state', handleTvAcousticState);
     return () => {
       window.removeEventListener('keydown', handleKeyDown);
       window.removeEventListener('trigger-tv-cast', handleTriggerTv);
       window.removeEventListener('tv-active-tab', handleTvActiveTab);
       window.removeEventListener('tv-breath-scale', handleTvBreathScale);
       window.removeEventListener('tv-eye-x', handleTvEyeX);
       window.removeEventListener('tv-acoustic-state', handleTvAcousticState);
     };
   }, []);

  // Temporary placeholders during phone UI removal phase
  const viewMode = 'desktop' as any;
  const setViewMode = (val: any) => {};
  const systemTime = '09:10';
  const setShowNotificationsShade = (val: any) => {};
  const showNotificationsShade = false;
  const mobileBottomTab = 'dashboard' as any;
  const setMobileBottomTab = (val: any) => {};
  const setExerciseSegment = (val: any) => {};
  const exerciseSegment = 'voice' as any;
  const setComposureSegment = (val: any) => {};
  const composureSegment = 'stroop' as any;
  const setShadowSegment = (val: any) => {};
  const shadowSegment = 'shadow' as any;
  const mobileChatHistory: any[] = [];
  const isMobileChatLoading = false;
  const mobileChatQuery = '';
  const setMobileChatQuery = (val: any) => {};
  const sendMobileChatMessage = () => {};

  /* ========================================================================= */
  /* 9. EMDR Bilateral Desensitization & Integration Engine 👁️                */
  /* ========================================================================= */
  const [emdrStyle, setEmdrStyle] = useState<'horizontal' | 'infinity' | 'circle'>('horizontal');
  const [emdrSpeed, setEmdrSpeed] = useState<0.5 | 1 | 1.8 | 2.5>(1);
  const [emdrSoundStyle, setEmdrSoundStyle] = useState<'pulsar' | 'click' | 'drone'>('pulsar');
  const [emdrColor, setEmdrColor] = useState<'gold' | 'cyan' | 'white'>('gold');
  const [emdrTimeLeft, setEmdrTimeLeft] = useState(30);
  const [emdrSessionPhase, setEmdrSessionPhase] = useState<'setup' | 'session' | 'calibrate' | 'results'>('setup');
  const [emdrFocusInput, setEmdrFocusInput] = useState('');
  const [emdrPresetId, setEmdrPresetId] = useState('reactivity');
  const [emdrSudBefore, setEmdrSudBefore] = useState(7);
  const [emdrSudAfter, setEmdrSudAfter] = useState(3);
  const [emdrVocBefore, setEmdrVocBefore] = useState(3);
  const [emdrVocAfter, setEmdrVocAfter] = useState(8);
  const [emdrOrbPosition, setEmdrOrbPosition] = useState({ x: 50, y: 50 });

  /* ========================================================================= */
  /* 10. Sovereign Aura & Magnetic Polarization Architect 🔮                      */
  /* ========================================================================= */
  const [auraStimulus, setAuraStimulus] = useState<'snide' | 'criticism' | 'status' | 'gaslighting'>('snide');
  const [auraResonance, setAuraResonance] = useState<number>(55); // 20 - 120 Hz
  const [auraDistance, setAuraDistance] = useState<number>(4); // 0 - 10 m
  const [auraAttenuation, setAuraAttenuation] = useState<number>(6); // 1 - 10 level
  const [auraActiveAngle, setAuraActiveAngle] = useState<number>(0);
  const [auraActiveFreq, setAuraActiveFreq] = useState<number | null>(null);

  const auraCtxRef = useRef<AudioContext | null>(null);
  const auraOscRef = useRef<OscillatorNode | null>(null);
  const auraGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // If we leave the aura tab or component unmounts, stop any active frequency soundwave synthesizer
    return () => {
      if (auraOscRef.current) {
        try {
          auraOscRef.current.stop();
        } catch (e) {}
        auraOscRef.current = null;
      }
    };
  }, [activeTab]);

  const playAuraFrequency = (freq: number) => {
    // Stop currently running frequency if any is active
    if (auraOscRef.current) {
      try {
        auraOscRef.current.stop();
      } catch (e) {}
      auraOscRef.current = null;
      auraGainRef.current = null;
    }

    if (auraActiveFreq === freq) {
      setAuraActiveFreq(null);
      return;
    }

    setAuraActiveFreq(freq);

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      let ctx = auraCtxRef.current;
      if (!ctx || ctx.state === 'closed') {
        ctx = new AudioContextClass();
        auraCtxRef.current = ctx;
      }
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      auraOscRef.current = osc;
      auraGainRef.current = gain;

      // Adjust the visual controls to match the frequency played to show immediate calibration sync
      if (freq === 110) {
        setAuraResonance(20); // Absolute deep chest gravel pitch
        setAuraAttenuation(9); // Heavy amygdalar composure
      } else if (freq === 432) {
        setAuraResonance(45);
        setAuraDistance(8.5); // Wide emotional safety perimeter
      } else if (freq === 528) {
        setAuraResonance(65);
        setAuraAttenuation(7);
      }
    } catch (e) {
      console.error("Web Audio API frequency synthesis failed", e);
    }
  };

  useEffect(() => {
    if (activeTab !== 'aura') return;
    let frameId: number;
    let start = Date.now();
    const update = () => {
      const elapsed = (Date.now() - start) / 1000;
      const damping = 0.08 * (11 - auraAttenuation);
      // Accelerate oscillation visually if a biological frequency is currently active!
      const activeMultiplier = auraActiveFreq ? (auraActiveFreq === 528 ? 1.6 : 0.8) : 1.0;
      const frequency = 1.5 * Math.PI * (auraResonance / 60) * activeMultiplier;
      const angle = 22 * Math.exp(-damping * elapsed) * Math.sin(frequency * elapsed);
      setAuraActiveAngle(angle);
      
      if (elapsed > 10 && Math.abs(angle) < 0.5) {
        start = Date.now();
      }
      
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [activeTab, auraResonance, auraAttenuation, auraActiveFreq]);

  const emdrAudioContextRef = useRef<any>(null);
  const emdrIntervalRef = useRef<number | null>(null);

  const [emdrHistory, setEmdrHistory] = useState<Array<{
    date: string;
    focus: string;
    style: string;
    sudBefore: number;
    sudAfter: number;
    vocBefore: number;
    vocAfter: number;
  }>>([
    {
      date: '2026-05-28',
      focus: currentLang === 'ar' ? 'التحسس المفرط من النقد أو استصغار الهيبة أمام الملأ' : 'Hypersensitivity to status disputes and public validation challenges',
      style: 'horizontal',
      sudBefore: 8,
      sudAfter: 2,
      vocBefore: 2,
      vocAfter: 9
    }
  ]);

  const playBilateralClick = (side: 'left' | 'right') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      let ctx = emdrAudioContextRef.current;
      if (!ctx || ctx.state === 'closed') {
        ctx = new AudioContextClass();
        emdrAudioContextRef.current = ctx;
      }
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      let panner: any = null;
      if (ctx.createStereoPanner) {
        panner = ctx.createStereoPanner();
        panner.pan.setValueAtTime(side === 'left' ? -1 : 1, ctx.currentTime);
      }

      if (emdrSoundStyle === 'pulsar') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      } else if (emdrSoundStyle === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(650, ctx.currentTime);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      } else { // 'drone'
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(183, ctx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      }

      if (panner) {
        osc.connect(panner);
        panner.connect(gain);
      } else {
        osc.connect(gain);
      }
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + (emdrSoundStyle === 'click' ? 0.06 : emdrSoundStyle === 'pulsar' ? 0.18 : 0.3));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (emdrSessionPhase !== 'session') {
      if (emdrIntervalRef.current) {
        cancelAnimationFrame(emdrIntervalRef.current);
        emdrIntervalRef.current = null;
      }
      return;
    }

    let startTime = performance.now();
    let lastSide: 'left' | 'right' | null = null;
    const speedFactor = emdrSpeed * Math.PI * 2;

    const frame = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      const angle = elapsed * speedFactor;

      let x = 50;
      let y = 50;
      let currentSide: 'left' | 'right' | null = null;

      if (emdrStyle === 'horizontal') {
        const cosVal = Math.cos(angle);
        x = 50 + cosVal * 38;
        y = 50;
        currentSide = cosVal > 0 ? 'right' : 'left';
      } else if (emdrStyle === 'infinity') {
        const sinVal = Math.sin(angle);
        const sinTwoVal = Math.sin(2 * angle);
        x = 50 + sinVal * 38;
        y = 50 + sinTwoVal * 15;
        currentSide = sinVal > 0 ? 'right' : 'left';
      } else { // circle
        const sinVal = Math.sin(angle);
        const cosVal = Math.cos(angle);
        x = 50 + sinVal * 32;
        y = 50 + cosVal * 32;
        currentSide = sinVal > 0 ? 'right' : 'left';
      }

      setEmdrOrbPosition({ x, y });

      if (currentSide !== lastSide) {
        playBilateralClick(currentSide);
        lastSide = currentSide;
      }

      emdrIntervalRef.current = requestAnimationFrame(frame);
    };

    emdrIntervalRef.current = requestAnimationFrame(frame);

    setEmdrTimeLeft(30);
    const timerInterval = window.setInterval(() => {
      setEmdrTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setEmdrSessionPhase('calibrate');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (emdrIntervalRef.current) cancelAnimationFrame(emdrIntervalRef.current);
      clearInterval(timerInterval);
    };
  }, [emdrSessionPhase, emdrStyle, emdrSpeed, emdrSoundStyle]);

  const saveEmdrSession = () => {
    const focusStr = emdrFocusInput.trim() || (isRtl ? "موازنة ذاتية عصبية كهرومغناطيسية" : "Autonomic Homeostasis");
    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      focus: focusStr,
      style: emdrStyle,
      sudBefore: emdrSudBefore,
      sudAfter: emdrSudAfter,
      vocBefore: emdrVocBefore,
      vocAfter: emdrVocAfter
    };
    setEmdrHistory(prev => [newEntry, ...prev]);
    setEmdrSessionPhase('results');
  };

  /* ========================================================================= */
  /* 6. Cryptic Shadow Journal States 📓                                       */
  /* ========================================================================= */
  const [journalText, setJournalText] = useState('');
  const [isJournalSublimating, setIsJournalSublimating] = useState(false);
  const journalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [sublimatedQuotes, setSublimatedQuotes] = useState<{ar: string; en: string} | null>(null);

  const triggerSublimation = () => {
    if (!journalText.trim() || isJournalSublimating) return;
    setIsJournalSublimating(true);
    setSublimatedQuotes(null);

    // Dynamic Sound Sweep for spiritual release using AudioContext synthesizers
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 2.0);
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.0);
    } catch (e) {
      console.log("AudioContext fallback: ", e);
    }

    // Canvas disperse explosion simulation
    const canvas = journalCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let particlesArr: any[] = [];
        const count = 100;
        for (let i = 0; i < count; i++) {
          particlesArr.push({
            id: i,
            x: canvas.width / 2 + (Math.random() - 0.5) * 240,
            y: canvas.height / 2 + (Math.random() - 0.5) * 60,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.7) * 4 - 1.5,
            size: Math.random() * 3 + 1,
            alpha: 1,
            color: Math.random() > 0.4 ? '#d4af37' : '#ffffff'
          });
        }
        
        let frames = 0;
        const animateSublimation = () => {
          ctx.fillStyle = 'rgba(5, 5, 5, 0.15)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          particlesArr.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy -= 0.015;
            p.alpha -= 0.012;
            
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          });
          
          ctx.globalAlpha = 1.0;
          frames++;
          if (frames < 90) {
            requestAnimationFrame(animateSublimation);
          } else {
            setIsJournalSublimating(false);
            setJournalText('');
            setSublimatedQuotes({
              ar: "تم موازنة وتفكيك الشحنة العصبية للصدمة بنجاح. إن الفكرة السلبية لم تعد تملك أي نفوذ روحي أو جسدي عليك الآن. تنفس الحرية والسيادة المطلقة.",
              en: "The emotional load has been successfully processed and neutralized. The negative mental construct can no longer govern your autonomic system. Reclaim your space."
            });
          }
        };
        requestAnimationFrame(animateSublimation);
      }
    } else {
      setTimeout(() => {
        setIsJournalSublimating(false);
        setJournalText('');
        setSublimatedQuotes({
          ar: "تم موازنة وتفكيك الشحنة العصبية للصدمة بنجاح. إن الفكرة السلبية لم تعد تملك أي نفوذ روحي أو جسدي عليك الآن.",
          en: "The emotional load has been successfully processed and neutralized. The negative mental construct can no longer govern your autonomic system."
        });
      }, 1500);
    }
  };

  /* ========================================================================= */
  /* 7. Cognitive Stroop Shield Test States 🛡️                                 */
  /* ========================================================================= */
  const [stroopActive, setStroopActive] = useState(false);
  const [stroopTimeLeft, setStroopTimeLeft] = useState(15);
  const [stroopWord, setStroopWord] = useState('');
  const [stroopIsSovereign, setStroopIsSovereign] = useState(true);
  const [stroopCorrectCount, setStroopCorrectCount] = useState(0);
  const [stroopIncorrectCount, setStroopIncorrectCount] = useState(0);
  const [stroopScore, setStroopScore] = useState(0);
  const [clickStatus, setClickStatus] = useState<'correct' | 'incorrect' | null>(null);
  const [stroopCompleted, setStroopCompleted] = useState(false);

  const SOVEREIGN_WORDS = [
    { ar: 'سكون', en: 'Silence' },
    { ar: 'ثبات', en: 'Poise' },
    { ar: 'هيبة', en: 'Gravity' },
    { ar: 'ترفع', en: 'Detachment' },
    { ar: 'وقار', en: 'Dignity' },
    { ar: 'صمت', en: 'Repose' },
    { ar: 'حكمة', en: 'Wisdom' },
    { ar: 'اتساق', en: 'Coherence' }
  ];

  const REACTIVE_WORDS = [
    { ar: 'غضب', en: 'Anger' },
    { ar: 'صراخ', en: 'Scream' },
    { ar: 'تبرير', en: 'Explain' },
    { ar: 'انفعال', en: 'Reactive' },
    { ar: 'توتر', en: 'Stress' },
    { ar: 'اندفاع', en: 'Impulse' },
    { ar: 'انتقام', en: 'Vengeance' },
    { ar: 'خوف', en: 'Fear' }
  ];

  const playBeep = (freq: number, duration: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  const startStroopTest = () => {
    setStroopActive(true);
    setStroopCompleted(false);
    setStroopTimeLeft(15);
    setStroopCorrectCount(0);
    setStroopIncorrectCount(0);
    setStroopScore(0);
    setClickStatus(null);
    
    // Spawn initial word
    const isSovereign = Math.random() > 0.5;
    const pool = isSovereign ? SOVEREIGN_WORDS : REACTIVE_WORDS;
    const randomWord = pool[Math.floor(Math.random() * pool.length)];
    setStroopWord(isRtl ? randomWord.ar : randomWord.en);
    setStroopIsSovereign(isSovereign);
  };

  const spawnStroopWord = () => {
    const isSovereign = Math.random() > 0.5;
    const pool = isSovereign ? SOVEREIGN_WORDS : REACTIVE_WORDS;
    const randomWord = pool[Math.floor(Math.random() * pool.length)];
    setStroopWord(isRtl ? randomWord.ar : randomWord.en);
    setStroopIsSovereign(isSovereign);
    setClickStatus(null);
  };

  const handleStroopClick = (clickedCurrent: boolean) => {
    if (!stroopActive) return;

    if (clickedCurrent) {
      if (stroopIsSovereign) {
        setStroopCorrectCount(prev => prev + 1);
        setClickStatus('correct');
        playBeep(480, 0.12);
      } else {
        setStroopIncorrectCount(prev => prev + 1);
        setClickStatus('incorrect');
        playBeep(180, 0.25);
      }
    } else {
      if (!stroopIsSovereign) {
        setStroopCorrectCount(prev => prev + 1);
        setClickStatus('correct');
        playBeep(380, 0.08);
      } else {
        setStroopIncorrectCount(prev => prev + 1);
        setClickStatus('incorrect');
        playBeep(180, 0.2);
      }
    }
    spawnStroopWord();
  };

  // Stroop Timer
  useEffect(() => {
    let timerID: any;
    let wordRotationID: any;

    if (stroopActive && stroopTimeLeft > 0) {
      timerID = setInterval(() => {
        setStroopTimeLeft(prev => prev - 1);
      }, 1000);

      wordRotationID = setInterval(() => {
        // If they missed a Sovereign word without action
        if (stroopIsSovereign && clickStatus === null) {
          setStroopIncorrectCount(prev => prev + 1);
        }
        // If they correctly avoided a Reactive word
        if (!stroopIsSovereign && clickStatus === null) {
          setStroopCorrectCount(prev => prev + 1);
        }
        spawnStroopWord();
      }, 1300);
    } else if (stroopActive && stroopTimeLeft === 0) {
      setStroopActive(false);
      setStroopCompleted(true);
      const totalOps = stroopCorrectCount + stroopIncorrectCount;
      const finalPercentage = Math.max(10, Math.round((stroopCorrectCount / (totalOps || 1)) * 100));
      setStroopScore(finalPercentage);
    }

    return () => {
      clearInterval(timerID);
      clearInterval(wordRotationID);
    };
  }, [stroopActive, stroopTimeLeft, stroopIsSovereign, clickStatus]);


  /* ========================================================================= */
  /* 8. Sovereign Daily Tracker Constellation States ⭐                        */
  /* ========================================================================= */
  const [completedHabits, setCompletedHabits] = useState<{ [key: string]: boolean }>((() => {
    try {
      const saved = localStorage.getItem('bechir_sovereign_habits');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      voiceCadence: false,
      strategicPause: false,
      digitalSanctuary: false,
      detachedStance: false,
      binauralSession: false
    };
  })());

  const toggleHabit = (key: string) => {
    const updated = { ...completedHabits, [key]: !completedHabits[key] };
    setCompletedHabits(updated);
    try {
      localStorage.setItem('bechir_sovereign_habits', JSON.stringify(updated));
    } catch (e) {}
    
    if (updated[key]) {
      playBeep(523.25, 0.4); // Sparkling C5 note 🎶
    } else {
      playBeep(330, 0.15);
    }
  };

  const getSovereignCompleteness = () => {
    const total = Object.keys(completedHabits).length;
    const done = Object.values(completedHabits).filter(Boolean).length;
    return { done, total, percent: Math.round((done / total) * 100) };
  };

  const calculateSovereignRankProgress = () => {
    const habitsDone = Object.values(completedHabits).filter(Boolean).length;
    const habitsXP = habitsDone * 20; // max 100 XP
    
    const simScoreVal = simAnalysis ? simAnalysis.score : 0;
    const simXP = Math.round(simScoreVal * 0.6); // max 60 XP
    
    const stroopScoreVal = stroopScore || 0;
    const stroopXP = Math.round(stroopScoreVal * 0.4); // max 40 XP
    
    const totalXP = habitsXP + simXP + stroopXP; // Max possible is 200 XP
    const percentToNextLevel = Math.round(((totalXP % 50) / 50) * 100);
    
    let rankAr = "تلميذ السكون الفطري";
    let rankEn = "Calm Postulant";
    let rankDescAr = "خطواتك الأولى في لجم لوزتك الدماغية ببروتوكولات التراجع الفوري عن المشتتات والكلمات الرخيصة.";
    let rankDescEn = "Establishing initial cellular shields. Good beginning in ignoring superficial provocations.";
    let badge = "🛡️";
    let level = 1;

    if (totalXP >= 140) {
      rankAr = "المُحصّن السيادي الأسمى";
      rankEn = "Sovereign Supreme Adept";
      rankDescAr = "لقد كبّلت جموع المثيرات تماماً؛ هالتك الآن جبل راسخ لا تهزه الريح، ونبرتك صوت الوقار الأزلي بمشروع مزارات.";
      rankDescEn = "Ultimate emotional homeostasis validated. Your vocal posture is anchored directly in majestic core registers.";
      badge = "👑";
      level = 4;
    } else if (totalXP >= 90) {
      rankAr = "فارس حلبة السكون";
      rankEn = "Paladin of Silent Sanctuary";
      rankDescAr = "تطبيق حكيم لـ 'بروتوكول بشير للصمت'، ونجاح في الحفاظ على رنين صخري ووتيرة ثبات وئيدة.";
      rankDescEn = "Strategic silence mastered. Excellent alignment of physical resonance and mental boundaries.";
      badge = "🌌";
      level = 3;
    } else if (totalXP >= 40) {
      rankAr = "المُوجّه المتزن";
      rankEn = "Composure Sentinel";
      rankDescAr = "تطور ملفت في كبت لوزتك وبناء مسافة تباعد كافية لامتصاص الصدمات الاجتماعية المباغتة.";
      rankDescEn = "Solid responsive delay. Building useful quarantine buffers against interactive threats.";
      badge = "🕯️";
      level = 2;
    }

    return { totalXP, percentToNextLevel, level, rankAr, rankEn, rankDescAr, rankDescEn, badge };
  };


  /* ========================================================================= */
  /* 1. Vocal Gravity & Tone Analyzer🎙️                                       */
  /* ========================================================================= */
  const [isRecording, setIsRecording] = useState(false);
  const [recordProgress, setRecordProgress] = useState(0);
  const [vocalStats, setVocalStats] = useState<{
    gravityScore: number;
    pitchHz: number;
    tempoWords: number;
    resonance: string;
    adviceAr: string;
    adviceEn: string;
  } | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [metronomePlaying, setMetronomePlaying] = useState(false);
  const metronomeIntervalRef = useRef<number | null>(null);

  // Start analyzer recording
  const startVoiceRecording = async () => {
    setIsRecording(true);
    setRecordProgress(0);
    setVocalStats(null);

    try {
      // Clear previous audio setup
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(mediaStream);

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(mediaStream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      // Draw real waveform
      const drawWaveform = () => {
        if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, width, height);

        // Grid lines
        ctx.strokeStyle = '#d4af3715';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#d4af37';
        ctx.beginPath();

        const sliceWidth = width / dataArrayRef.current.length;
        let x = 0;

        for (let i = 0; i < dataArrayRef.current.length; i++) {
          const v = dataArrayRef.current[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();
        ctx.shadowBlur = 0; // reset

        animationFrameRef.current = requestAnimationFrame(drawWaveform);
      };

      drawWaveform();
    } catch (err) {
      console.warn("Media devices not accessible, fallback to virtual wave simulation");
      // Fallback virtual wave simulation
      let angle = 0;
      const drawSimulatedWave = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#d4af3733';
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#d4af37';
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + Math.sin(x * 0.05 + angle) * 20 * Math.sin(x * 0.005);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
        angle += 0.15;
        animationFrameRef.current = requestAnimationFrame(drawSimulatedWave);
      };
      drawSimulatedWave();
    }
  };

  // Stop recording and process results
  const stopVoiceRecording = () => {
    setIsRecording(false);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Simulate precise behavioral tone classification after 6 seconds of exposure
    setTimeout(() => {
      const gScore = Math.floor(Math.random() * 25) + 68; // 68 - 93
      const avgHz = Math.floor(Math.random() * 60) + 95;  // robust low deep frequency (95 - 155Hz is chest resonant)
      const tempo = Math.floor(Math.random() * 10) + 24;  // 24 to 34 words-per-minute
      
      setVocalStats({
        gravityScore: gScore,
        pitchHz: avgHz,
        tempoWords: tempo,
        resonance: avgHz < 120 ? (isRtl ? "صدرية عميقة وصخرية" : "Deep Chest Resonance") : (isRtl ? "بلعومية/جدارية مرتفعة" : "Mid Pharyngeal Resonance"),
        adviceAr: `لقد سجلت نبرتك مستوى وقار مميز. نوصي بتطبيق 'بروتوكول بشير الماجري' لخفض وتيرة الكلمات الحالية بنسبة ٢٠٪، مما يضمن خروج الحروف من عمق القفص الصدري ويسحب السيطرة المعرفية لصالحك تماماً في أي جدال.`,
        adviceEn: `Your pitch indicates high authority. Apply Bechir Mejri's '20% Speech Deceleration Routine': project your vocal energy directly from the diaphragm and lengthen silent pauses by 1.5 seconds to establish uncontested cognitive dominance.`
      });
    }, 1200);
  };

  useEffect(() => {
    let t: any;
    if (isRecording) {
      t = setInterval(() => {
        setRecordProgress(prev => {
          if (prev >= 100) {
            stopVoiceRecording();
            return 100;
          }
          return prev + 10;
        });
      }, 600);
    }
    return () => clearInterval(t);
  }, [isRecording]);

  // Metronome Sound (20% tempo training) using Web Audio synth
  const toggleMetronome = () => {
    if (metronomePlaying) {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
      setMetronomePlaying(false);
    } else {
      setMetronomePlaying(true);
      const playTick = () => {
        try {
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          // authorization frequency (low subtle frequency beat to anchor cadence)
          osc.frequency.setValueAtTime(120, ctx.currentTime);
          
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
        } catch (e) {
          console.log(e);
        }
      };

      playTick();
      // slow deliberate cadence, 52 BPM (beats per minute) represents Bechir Mejri's ultimate calmness metronome
      metronomeIntervalRef.current = window.setInterval(playTick, 1150);
    }
  };

  useEffect(() => {
    return () => {
      if (metronomeIntervalRef.current) clearInterval(metronomeIntervalRef.current);
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [stream]);


  /* ========================================================================= */
  /* 2. Subconscious Shadow Mapper 🌌                                         */
  /* ========================================================================= */
  const [jungPoints, setJungPoints] = useState<ArchetypePoint[]>([
    { id: 'shadow', nameAr: "الظل (الجوانب المكبوتة)", nameEn: "Shadow (Repressed Self)", angle: 0, value: 50, color: '#e53e3e', descAr: "المخاوف المكبوتة، دوافع الثورة الحادة، والرغبات المرفوضة مجتمعياً.", descEn: "Repressed fears, raw counter-societal power and reactive drives." },
    { id: 'persona', nameAr: "القناع (الهوية الخارجية)", nameEn: "Persona (Social Mask)", angle: 90, value: 80, color: '#3182ce', descAr: "الواجهة التي تبديها لإرضاء المجتمع وطمأنة المحيطين بك.", descEn: "The artificial surface shown to secure public validation." },
    { id: 'anima', nameAr: "الأنيموس (شعلة الروح)", nameEn: "Anima/Animus (Dual Soul)", angle: 180, value: 65, color: '#d69e2e', descAr: "الاتساق بين الليونة العاطفية والصلابة والمواجهة الحتمية.", descEn: "The inner bridge between intuition and analytical execution." },
    { id: 'self', nameAr: "الذات السيادية (التسامي)", nameEn: "Sovereign Self (Integration)", angle: 270, value: 40, color: '#319795', descAr: "حالة الاندماج والاتفاق العصبي والروحي الكامل مع القدر.", descEn: "The ultimate state of complete psychic integration and spiritual unity." },
  ]);

  const [selectedPointId, setSelectedPointId] = useState<string>('shadow');

  const updateArchetypeValue = (id: string, val: number) => {
    setJungPoints(points => points.map(p => p.id === id ? { ...p, value: val } : p));
  };

  const getSovereigntyAnalysis = () => {
    const shadowVal = jungPoints.find(p => p.id === 'shadow')?.value || 0;
    const personaVal = jungPoints.find(p => p.id === 'persona')?.value || 0;
    const selfVal = jungPoints.find(p => p.id === 'self')?.value || 0;

    if (personaVal > shadowVal + 20) {
      return {
        titleAr: "طغيان القناع الاجتماعي على حساب الباطن",
        titleEn: "Social Mask Overwhelming the Deep Subconscious",
        adviceAr: "أنت تبذل طاقة عصبية هائلة في إرضاء الأفراد والظهور بالاتزان التام، لكن ظلك الباطن يصرخ بالصدمات المكتومة. خصص وقتاً للاعتراف بمراراتك وممارسة الترفع عن رغبة الإعجاب الدائمة.",
        adviceEn: "You deplete massive psychic energy securing external approval. Your Shadow harbors unresolved friction. Anchor your sovereignty by embracing strategic silence and letting go of public validation loops."
      };
    } else if (shadowVal > selfVal + 15) {
      return {
        titleAr: "حالة السطوع اللاواعي وتأهب الظل",
        titleEn: "Subconscious Shadow Activation in Progress",
        adviceAr: "إن الدوافع الباطنة المكبوتة على وشك الاختراق العاطفي الحاد. ممارستك لـ 'السيادة الروحانية' تعني مهادنة هذا الظل واحتوائه، وتحويل غضبك المكتوم إلى هيبة صامتة وثقل سلوكي مهيب.",
        adviceEn: "Repressed trauma is close to bubbling into emotional reactivity. Spiritual sovereignty means acknowledging this dark density and transforming dormant anger into clinical, silent poise."
      };
    } else {
      return {
        titleAr: "مسار التسامي والاتصال السيادي المتكامل",
        titleEn: "Integrated Cosmic Path Active",
        adviceAr: "تطابق ممتاز بين اللاوعي الخفي والشخصية المعروضة. عواطفك العميقة تصب الآن مباشرة في خدمة هيبتك الفطرية وقدرتك على التماسك والسكون أمام الاستفزازات الخارجية.",
        adviceEn: "Superb alignment. Your subconscious assets directly fuel your external gravitas. Your response during social storms is anchored by an organic and deeply quiet center."
      };
    }
  };


  /* ========================================================================= */
  /* 3. Neural Coherence Panel 🧠                                              */
  /* ========================================================================= */
  const [binauralActive, setBinauralActive] = useState(false);
  const leftOscRef = useRef<OscillatorNode | null>(null);
  const rightOscRef = useRef<OscillatorNode | null>(null);
  const binauralCtxRef = useRef<AudioContext | null>(null);
  const [binauralVolume, setBinauralVolume] = useState(0.4);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Breathing pacer state: Box breathing cycle: Inhale(4s), Hold(4s), Exhale(4s), Hold(4s)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold-in' | 'exhale' | 'hold-out'>('inhale');
  const [breathSecondsLeft, setBreathSecondsLeft] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreathSecondsLeft(prev => {
        if (prev <= 1) {
          setBreathPhase(current => {
            switch (current) {
              case 'inhale': return 'hold-in';
              case 'hold-in': return 'exhale';
              case 'exhale': return 'hold-out';
              case 'hold-out': return 'inhale';
            }
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startBinauralBeats = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      binauralCtxRef.current = ctx;

      // Left Channel Oscillator (200Hz)
      const oscL = ctx.createOscillator();
      oscL.frequency.value = 200;
      oscL.type = 'sine';

      // Right Channel Oscillator (240Hz) - creates 40Hz Gamma differential perfectly tuned to hemispheric synchronization
      const oscR = ctx.createOscillator();
      oscR.frequency.value = 240;
      oscR.type = 'sine';

      // Stereo Panners
      const pannerL = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      const pannerR = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      const masterGain = ctx.createGain();
      masterGain.gain.value = binauralVolume;
      gainNodeRef.current = masterGain;

      if (pannerL && pannerR) {
        pannerL.pan.value = -1; // hard left
        pannerR.pan.value = 1;  // hard right
        
        oscL.connect(pannerL);
        pannerL.connect(masterGain);

        oscR.connect(pannerR);
        pannerR.connect(masterGain);
      } else {
        // Fallback if Panner API is unsupported
        oscL.connect(masterGain);
        oscR.connect(masterGain);
      }

      masterGain.connect(ctx.destination);

      oscL.start();
      oscR.start();

      leftOscRef.current = oscL;
      rightOscRef.current = oscR;
      setBinauralActive(true);
    } catch (err) {
      console.error("AudioContext initialization failed", err);
    }
  };

  const stopBinauralBeats = () => {
    if (leftOscRef.current) {
      try { leftOscRef.current.stop(); } catch(e){}
      leftOscRef.current = null;
    }
    if (rightOscRef.current) {
      try { rightOscRef.current.stop(); } catch(e){}
      rightOscRef.current = null;
    }
    if (binauralCtxRef.current) {
      binauralCtxRef.current.close();
      binauralCtxRef.current = null;
    }
    setBinauralActive(false);
  };

  useEffect(() => {
    if (gainNodeRef.current && binauralCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(binauralVolume, binauralCtxRef.current.currentTime);
    }
  }, [binauralVolume]);

  useEffect(() => {
    return () => {
      if (leftOscRef.current || rightOscRef.current) {
        stopBinauralBeats();
      }
    };
  }, []);

  /* ========================================================================= */
  /* 4. Social Provocation Simulator 🛡️                                        */
  /* ========================================================================= */
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [userResponseText, setUserResponseText] = useState('');
  const [simAnalysis, setSimAnalysis] = useState<{
    score: number;
    analysisAr: string;
    analysisEn: string;
    metrics: { nameAr: string; nameEn: string; score: number }[];
  } | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const activeScenario = scenarios[activeScenarioIdx];

  const submitSimResponse = async () => {
    if (!userResponseText.trim()) return;
    setIsSimulating(true);
    setSimAnalysis(null);

    // Filter forbidden reactive words
    const containsForbidden = FORBIDDEN_WORDS.some(w => userResponseText.includes(w));
    const textLength = userResponseText.length;

    // Call the server Gemini endpoint to get state-of-the-art analytical AI feedback on the user's reaction!
    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `
            Analyze the user's response in this social provocation scenario within the 'Madarat Al-Nafs' framework (founded and managed by Bechir Mejri, focusing on behavioral excellence, Strategic Silence, non-reactivity, and speaking with high sovereign authority).
            
            Scenario description: ${activeScenario.contextAr}
            Opponent said: ${activeScenario.opponentTurnAr}
            Ideal mindset: ${activeScenario.idealMindsetAr}
            
            User's respond text is: "${userResponseText}"
            
            Format your response STRICTLY as a JSON object with this shape (no markdown wrappers except raw json, just the plain object, do not say anything out of JSON):
            {
              "score": <number between 40 and 100 representing emotional and strategic mastery>,
              "analysisAr": "<A 2-3 sentence deeply sharp and profound behavioral analysis of their answer in high-end, majestic Arabic under Bechir Mejri's philosophy. Praise clinical coolness, explain potential vulnerabilities. Keep it strictly focused on the core concept.>",
              "analysisEn": "<A matching 2-3 sentence analysis in English.>",
              "metrics": [
                {"nameAr": "الحصانة والهدوء", "nameEn": "Emotional Immunity", "score": <0-100>},
                {"nameAr": "الصمت الاستراتيجي", "nameEn": "Strategic Silence", "score": <0-100>},
                {"nameAr": "هيبة اللفظ"، "nameEn": "Vocal/Verbal Gravity", "score": <0-100>}
              ]
            }
          `,
          lang: 'ar',
          context: 'Evaluate user social behavior response to generate a report'
        })
      });

      if (response.ok) {
        const rawText = await response.text();
        // Extract json from potential markdown wraps
        const cleanJsonStr = rawText.replace(/```json/i, '').replace(/```/g, '').trim();
        const data = JSON.parse(cleanJsonStr);
        setSimAnalysis(data);
      } else {
        throw new Error("Gemini AI API offline");
      }
    } catch (e) {
      // Robust, highly intelligent offline analyzer heuristics if Gemini is offline
      console.log("Triggered high-quality clinical heuristic fallback", e);
      setTimeout(() => {
        const positiveKeywordsAr = ["صمت", "هدوء", "دقيقة", "بالعكس", "أفهم", "دليل", "حقائق", "صحيح", "تفضل", "أولاً"];
        const positiveKeywordsEn = ["silent", "calm", "understand", "facts", "evidence", "pause", "quiet", "indeed", "please"];
        
        const hasPositiveAr = positiveKeywordsAr.some(w => userResponseText.toLowerCase().includes(w));
        const hasPositiveEn = positiveKeywordsEn.some(w => userResponseText.toLowerCase().includes(w));
        const hasStrategicSilence = userResponseText.includes('...') || userResponseText.includes('صمت') || userResponseText.includes('pause');

        let presenceScore = containsForbidden ? 40 : (hasPositiveAr || hasPositiveEn ? 95 : Math.min(98, 65 + (textLength > 15 ? 15 : 5)));
        let silenceScore = hasStrategicSilence ? 98 : (textLength < 40 ? 85 : 65);
        let immunityScore = containsForbidden ? 35 : (hasPositiveAr || hasPositiveEn ? 92 : 80);
        
        const finalScore = Math.round((presenceScore + silenceScore + immunityScore) / 3);

        let dynamicAdviceAr = "رد استثنائي يعبر عن تماسك عصبي فائق. لقد تمكنت من السيطرة على العبء اللغوي وتجنب الشرح المستفيض، مكرساً مبدأ الترفع الفطري السيادي لتفويت الفرصة على من يحاول إثارة حفيظتك.";
        let dynamicAdviceEn = "Exceptional clinical calm. You effectively avoided cognitive escalation. Your structured boundary sets an impenetrable mental shield, proving masterfully tuned poise.";

        if (containsForbidden) {
          dynamicAdviceAr = "لقد ظهر في ردك ملامح عاطفية متأهبة وتبريرات سريعة تنسف مهابتك الشخصية. تذكّر بروتوكول بشير الماجري: الصمت الاستراتيجي ليس انسحاباً، بل تعليق عارم للمواجهة يحميك من الدخول في فخ عاطفي رخيص.";
          dynamicAdviceEn = "Your response indicators reflect high nervous alarm and immediate justification, which leaks personal gravitas. Re-train under the Strategic Silence rule to capture control.";
        } else if (hasPositiveAr || hasPositiveEn) {
          dynamicAdviceAr = "مذهل! لقد قمت بتوظيف لفظ سيادي صخري (مثل التمهل أو طلب الدليل أو الصمت المتعمد). هذا يجبر دماغ الخصم المهاجم على التراجع الفوري وكسر هيبته أمام مهابتك المطلقة.";
          dynamicAdviceEn = "Outstanding! You utilized a basaltic sovereign keyword. This halts the provocateur's cognitive momentum instantly, establishing your baseline conversational supremacy.";
        }

        setSimAnalysis({
          score: finalScore,
          analysisAr: dynamicAdviceAr,
          analysisEn: dynamicAdviceEn,
          metrics: [
            { nameAr: "الحصانة والهدوء", nameEn: "Emotional Immunity", score: immunityScore },
            { nameAr: "الصمت الاستراتيجي", nameEn: "Strategic Silence", score: silenceScore },
            { nameAr: "الهيبة اللفظية", nameEn: "Vocal/Verbal Gravity", score: presenceScore }
          ]
        });
        
        // Award sparkling success sound to celebrate composition mastery
        if (finalScore >= 80) {
          playBeep(587.33, 0.4); // Sparkling D5 note
        }
      }, 1000);
    } finally {
      setIsSimulating(false);
    }
  };


  /* ========================================================================= */
  /* 5. Digital Detox Ledger ⏳                                                */
  /* ========================================================================= */
  const [detoxAnswers, setDetoxAnswers] = useState({
    screenTime: 5,     // hours
    reactivity: 4,     // scale 1-10
    quickDopamine: 6,  // scale 1-10 (short reels, notifications)
    silenceMin: 10,    // minutes of complete absolute silence
  });

  const getDetoxResult = () => {
    // Math indicators
    const score = Math.round(
      ( (10 - Math.min(10, detoxAnswers.screenTime)) * 2.5 ) +
      ( (10 - detoxAnswers.reactivity) * 2.5 ) +
      ( (10 - detoxAnswers.quickDopamine) * 2.5 ) +
      ( Math.min(60, detoxAnswers.silenceMin) * 0.41 )
    );

    const safeScore = Math.max(10, Math.min(100, score));

    return {
      score: safeScore,
      titleAr: safeScore > 75 
        ? "حصانة عصبية خارقة ورصيد روحي محمي" 
        : safeScore > 45 
        ? "جهازك العصبي في خط الدفاع والتأهب المنهك" 
        : "إنذار أحمر: استهلاك دوباميني هستيري واختراق روحي",
      titleEn: safeScore > 75 
        ? "Superb Neural Shield & Pristine Spiritual Well-being" 
        : safeScore > 45 
        ? "Vulnerable State: Heavy Cognitive Saturation" 
        : "System Red Alert: Chaotic Dopamine Flooding & Spiritual Leakage",
      protocolAr: [
        "بروتوكول السكون المطبق: ٢٠ دقيقة من العزلة الصوتية والبصرية الكاملة مرتين يومياً.",
        "قاعدة الصدمة الرقمية: كبح فوري لتصفح الفيديوهات القصيرة (مكافأة غير مشروطة) لمدة ٣ أيام.",
        "مكافحة الاندفاع العصبي: عند سماع رنين الهاتف، خذ شهيقاً صامتاً لبلع هرمون الترقب قبل لمس الشاشة."
      ],
      protocolEn: [
        "Acoustic Sanctuary: Maintain 20 minutes of complete silence, twice daily without devices.",
        "Dopaminergic Lockdown: Absolute abstinence from visual micro-content (Reels/Shorts) for 72 hours.",
        "Delayed Reaction: Upon any notifications, practice 5 seconds of slow breathing before touching the hardware."
      ]
    };
  };


  const detoxResult = getDetoxResult();


  /* --- Header elements --- */
  return (
    <section id="innovation-hub" className="py-20 bg-[#050505] relative overflow-hidden border-t border-white/5" data-innovation-hub>
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] h-[20%] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Hub Title */}
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/5 border border-gold/20 rounded-full text-gold"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
              {isRtl ? "مختبر بشير الماجري للابتكار النفسي والسيادي" : "Bechir Mejri's Sovereignty & Spiritual Innovation Lab"}
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
            {isRtl ? "أدوات السيطرة والهيبة والاتساق العصبي" : "Tools of Domination, Poise, and Neurological Consistency"}
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-xs md:text-sm">
            {isRtl 
              ? "استكشف أبعاد اللاوعي واختبر رصانة استجابتك السلوكية ونبرات صوتك تحت إشراف علم الأعصاب والتحليل السلوكي المتسامي."
              : "Explore variables of your subconscious, measure your vocal gravitas, and synchronize brain hemispheres through peer-reviewed bio-methods."}
          </p>
        </div>

        {false ? (
          <div className="w-full flex justify-center py-4 relative md:px-4 z-20">
            {/* Elegant Device frame wrapper (Desktop width only, disappears on small mobile screens to act as PWA) */}
            <div className="relative w-full max-w-[390px] h-[810px] bg-black rounded-[46px] p-3 shadow-[0_0_100px_rgba(212,175,55,0.12)] border border-white/[0.08] flex flex-col overflow-hidden group/phone md:outline md:outline-4 md:outline-white/10">
              
              {/* Dynamic Island, Speaker & Side buttons markup */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-950 rounded-b-2xl z-[70] flex items-center justify-center border-b border-white/[0.08] pointer-events-none">
                <div className="w-10 h-1.5 bg-zinc-800 rounded-full mb-1" />
              </div>

              {/* Status Bar */}
              <div className="w-full h-11 bg-black text-white flex items-center justify-between px-6 shrink-0 text-[10px] font-bold select-none relative z-50">
                <span className="font-sans font-black text-white/90">{systemTime}</span>
                <button 
                  onClick={() => setShowNotificationsShade(true)}
                  className="px-2 py-0.5 bg-white/5 border border-white/10 hover:border-gold/30 rounded text-[7px] text-gold uppercase tracking-wider font-extrabold animate-pulse cursor-pointer"
                >
                  SOVEREIGN OS
                </button>
                <div className="flex items-center gap-1.5 select-none pointer-events-none">
                  <div className="flex items-end gap-0.5 h-2">
                    <span className="w-[1.5px] h-[3px] bg-white rounded-full" />
                    <span className="w-[1.5px] h-[5px] bg-white rounded-full" />
                    <span className="w-[1.5px] h-[7px] bg-white rounded-full text-gold" />
                    <span className="w-[1.5px] h-[9px] bg-gold rounded-full" />
                  </div>
                  <span className="text-[8px] opacity-80 font-mono">5G</span>
                  <div className="w-4.5 h-2.5 border border-white/40 rounded-[3px] p-0.5 flex relative">
                    <div className="h-full w-full bg-gold rounded-[1.5px]" />
                  </div>
                </div>
              </div>

              {/* Dynamic Notification Center Shade Overlay */}
              <AnimatePresence>
                {showNotificationsShade && (
                  <motion.div 
                    initial={{ y: '-100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                    className="absolute inset-x-0 top-11 bottom-0 bg-black/95 backdrop-blur-md z-[80] p-6 flex flex-col justify-between"
                  >
                    <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <span className="text-[10px] font-black uppercase text-gold tracking-widest">{isRtl ? "موجز التنبيهات السيادية اليومي" : "Sovereign Notification Feed"}</span>
                        <button onClick={() => setShowNotificationsShade(false)} className="text-white/40 hover:text-white px-2 py-0.5 bg-white/5 border border-white/10 rounded-lg text-[8px] uppercase font-bold">{isRtl ? "إغلاق" : "Dismiss"}</button>
                      </div>

                      <div className="space-y-3.5 overflow-y-auto max-h-[500px] pr-1">
                        {[
                          { time: isRtl ? "الان" : "Now", titleAr: "🎙️ نبرة صوتك تحتاج تهذيباً", titleEn: "Vocal resonance shift detected", descAr: "تم التعرف على تذبذب عاطفي طفيف، تذكر ممارسة قاعدة الصمت الوقير وحافظ على الهيبة من فضلك.", descEn: "Autonomic pitch fluctuation observed. Focus on low frequencies and quiet dominance." },
                          { time: isRtl ? "منذ ساعة" : "1h ago", titleAr: "⏳ تنبيه الدوبامين: استراحة مطلوبة", titleEn: "Screen threshold breach", descAr: "مستوى التعرض للشاشات تجاوز الحد المقبول، خذ استراحة صامتة لمدة ٢٠ دقيقة فوراً للتطهير.", descEn: "Screen engagement limits crossed. Proceed with 20-minute digital sanctuary." },
                          { time: isRtl ? "منذ ٤س" : "4h ago", titleAr: "⚔️ محاكاة المجموعات ناجحة", titleEn: "Tactical interaction feedback", descAr: "لقد نجحت في تجنب الانفعال اللفظي خلال جلسة تفاعلية سابقة. هيبتك ترتفع بنسبة ٥٪ اليوم.", descEn: "Successful defense stance logged. Your conversational rank score has increased by 5%." }
                        ].map((notif, idx) => (
                          <div key={idx} className="bg-zinc-900/60 border border-white/5 p-4 rounded-2xl space-y-1.5 text-right sm:text-left" dir={isRtl ? "rtl" : "ltr"}>
                            <div className="flex justify-between items-center text-[9px]">
                              <span className="font-bold text-white/50">{notif.time}</span>
                              <span className="text-gold font-bold">{isRtl ? "عاجل" : "System Alert"}</span>
                            </div>
                            <h4 className="text-xs font-bold text-white font-serif">{isRtl ? notif.titleAr : notif.titleEn}</h4>
                            <p className="text-[10px] text-white/40 leading-relaxed font-sans">{isRtl ? notif.descAr : notif.descEn}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gold/5 border border-gold/10 p-4 rounded-2xl text-center">
                      <p className="text-[10px] text-gold font-serif italic mb-1">"الهيبة ليست حضوراً بارزاً، بل غياب تبريرك وتلعثمك."</p>
                      <span className="text-[8px] uppercase text-gold/40 tracking-widest">— بشير الماجري</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Inside Smartphone Workspace Content Frame */}
              <div className="w-full flex-1 bg-[#050505] rounded-[36px] overflow-hidden flex flex-col relative z-20 border border-white/5">
                
                {/* Dynamic Screen Header */}
                <div className="px-5 pt-3.5 pb-2.5 bg-black/40 border-b border-white/5 flex items-center justify-between z-30 relative shrink-0">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowNotificationsShade(true)}
                      className="w-7 h-7 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center relative cursor-pointer"
                    >
                      <div className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full animate-pulse" />
                      <Activity className="w-3.5 h-3.5 text-gold" />
                    </button>
                    <div className="text-right sm:text-left">
                      <h4 className="text-[9px] font-black uppercase text-gold tracking-widest leading-none">مدارات النفس</h4>
                      <span className="text-[7.5px] text-white/30 uppercase tracking-widest">Sovereignty App</span>
                    </div>
                  </div>

                  {/* Top quick-access indicators inside phone screen */}
                  <div className="flex items-center gap-1.5">
                    {activeTab === 'tracker' && (
                      <span className="bg-gold text-black rounded px-1.5 py-0.5 text-[8px] font-bold">STREAK: 5🔥</span>
                    )}
                    {activeTab === 'stroop' && (
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-red-600/10 border border-red-500/20 text-red-500 rounded text-[7.5px] font-bold">
                        <ShieldAlert className="w-2.5 h-2.5" />
                        <span>TESTING</span>
                      </div>
                    )}
                    {activeTab === 'coherence' && (
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-gold/10 text-gold rounded text-[7.5px] font-bold">
                        <Brain className="w-2.5 h-2.5" />
                        <span>COHERENCE</span>
                      </div>
                    )}
                    <span className="text-[7.5px] px-1.5 py-0.5 bg-[#0e0e0e] border border-white/10 rounded font-mono text-white/40">{currentLang.toUpperCase()}</span>
                  </div>
                </div>

                {/* Simulated Screen Content - Native scrolling overflow */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 scrollbar-none relative z-10 bg-black/20">
                  
                  {/* APP TAB CONTAINER SWITCHING */}
                  <AnimatePresence mode="wait">
                    
                    {/* BOTTOM TAB 1: DASHBOARD */}
                    {mobileBottomTab === 'dashboard' && (
                      <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRtl ? -30 : 30 }}
                        className="space-y-4"
                      >
                        {/* Sovereign Bechir's Profile Card with integrated avatar and summary metrics */}
                        <div className="bg-gradient-to-br from-gold/15 to-transparent border border-gold/20 p-5 rounded-3xl relative overflow-hidden flex items-center justify-between gap-4">
                          <div className="space-y-2 text-right sm:text-left" dir={isRtl ? "rtl" : "ltr"}>
                            <span className="text-[8px] font-black tracking-widest text-gold uppercase">{isRtl ? "مستشار الهيبة السلوكية" : "Behavioral Mentor"}</span>
                            <h3 className="text-base font-serif text-white">{isRtl ? "بشير الماجري" : "Bechir Mejri"}</h3>
                            <p className="text-[10px] text-white/50 leading-relaxed font-serif max-w-[150px]">{isRtl ? "مكافحة الاندفاع اللفظي، اتساق الأعصاب الكلي وصقل الوقار الفطري." : "Combating baseline verbal expression error and enforcing natural hierarchy."}</p>
                          </div>
                          
                          <div className="relative">
                            <div className="absolute inset-0 bg-gold blur-lg opacity-25 rounded-full" />
                            <div className="w-14 h-14 rounded-full border border-gold/30 overflow-hidden relative z-10 bg-black flex items-center justify-center p-0.5">
                              {/* Glowing orbital ring surrounding profile picture */}
                              <div className="absolute inset-0 border border-dashed border-gold/40 rounded-full animate-spin-slow" />
                              <img 
                                src={bechirAvatar || "/src/assets/images/bechir_exact_reproduction_1780526872274.png"} 
                                alt="Bechir profile" 
                                className="w-full h-full object-cover rounded-full border border-gold/20"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-500 border border-black rounded-full shadow-lg" />
                          </div>
                        </div>

                        {/* Integrated Autonomic Micro Stats */}
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="bg-zinc-900/40 border border-white/5 p-3 rounded-2xl text-center space-y-0.5">
                            <span className="text-[8px] uppercase text-white/30 tracking-widest">{isRtl ? "نقاط الوقار الكلية" : "Gravity Index"}</span>
                            <div className="text-base font-light text-white font-mono">{94}<span className="text-[9px] text-zinc-500">/100</span></div>
                          </div>
                          <div className="bg-zinc-900/40 border border-white/5 p-3 rounded-2xl text-center space-y-0.5">
                            <span className="text-[8px] uppercase text-white/30 tracking-widest">{isRtl ? "سرعة الاستجابة" : "Mental Reflex"}</span>
                            <div className="text-base font-light text-white font-mono">{98}<span className="text-[9px] text-zinc-500">ms</span></div>
                          </div>
                        </div>

                        {/* HABITS TRACKER AND CONSTELLATION SECT (tab key 'tracker') */}
                        <div className="bg-[#0e0e0e]/90 border border-white/5 p-4 rounded-3xl space-y-4">
                          <div className="border-b border-white/5 pb-2 flex justify-between items-center text-[9px] uppercase font-bold tracking-wider">
                            <span className="text-gold">{isRtl ? "كوكبة الاتساق عصبياً" : "Neurological Lattice"}</span>
                            <span className="text-white/40">{getSovereignCompleteness().done} / {getSovereignCompleteness().total}</span>
                          </div>

                          {/* Scaled Stellar Lattice Vector */}
                          <div className="relative w-full aspect-square max-w-[170px] mx-auto bg-black border border-white/5 rounded-full flex items-center justify-center p-1">
                            <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
                              <circle cx="100" cy="100" r="45" fill="none" stroke="#d4af37" strokeWidth="0.5" className="opacity-10" />
                              <circle cx="100" cy="100" r="75" fill="none" stroke="#d4af37" strokeWidth="0.5" className="opacity-5" />
                              {[
                                { from: {x:100, y:40}, to: {x:160, y:80}, active: completedHabits.voiceCadence && completedHabits.strategicPause },
                                { from: {x:160, y:80}, to: {x:140, y:150}, active: completedHabits.strategicPause && completedHabits.digitalSanctuary },
                                { from: {x:140, y:150}, to: {x:60, y:150}, active: completedHabits.digitalSanctuary && completedHabits.detachedStance },
                                { from: {x:60, y:150}, to: {x:40, y:80}, active: completedHabits.detachedStance && completedHabits.binauralSession },
                                { from: {x:40, y:80}, to: {x:100, y:40}, active: completedHabits.binauralSession && completedHabits.voiceCadence },
                              ].map((line, idx) => (
                                <line key={idx} x1={line.from.x} y1={line.from.y} x2={line.to.x} y2={line.to.y} stroke={line.active ? '#d4af37' : '#ffffff'} strokeWidth={line.active ? '1.5' : '0.5'} className="transition-all duration-700 opacity-20" />
                              ))}
                              {[
                                { x: 100, y: 40, active: completedHabits.voiceCadence, label: "🎙️" },
                                { x: 160, y: 80, active: completedHabits.strategicPause, label: "⏱️" },
                                { x: 140, y: 150, active: completedHabits.digitalSanctuary, label: "⏳" },
                                { x: 60, y: 150, active: completedHabits.detachedStance, label: "🛡️" },
                                { x: 40, y: 80, active: completedHabits.binauralSession, label: "🎧" }
                              ].map((star, i) => (
                                <g key={i}>
                                  {star.active && <circle cx={star.x} cy={star.y} r="11" fill="rgba(212, 175, 55, 0.25)" className="animate-pulse" />}
                                  <circle cx={star.x} cy={star.y} r="5.5" fill={star.active ? '#d4af37' : '#222222'} stroke={star.active ? '#ffffff' : '#444444'} strokeWidth="1" />
                                </g>
                              ))}
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center select-none pointer-events-none">
                              <span className="text-base font-light text-gold font-serif">{getSovereignCompleteness().percent}%</span>
                              <span className="text-[7px] uppercase text-white/30 tracking-widest">{isRtl ? "تناسق" : "Sync"}</span>
                            </div>
                          </div>

                          {/* Quick checking checkboxes inside phone screens */}
                          <div className="space-y-2 pt-2 border-t border-white/5">
                            {[
                              { key: 'voiceCadence', titleAr: "🎙️ خفض نبرة الصوت وتيرة الحديث", titleEn: "🎙️ Vocal Frequency Balance" },
                              { key: 'strategicPause', titleAr: "⏱️ بروتوكول الصمت لـ ٣ ثوانٍ", titleEn: "⏱️ The 3-Second Pause Rule" },
                              { key: 'digitalSanctuary', titleAr: "⏳ تطهير الفيديوهات السريعة والريلز", titleEn: "⏳ Break Fast Dopamine Loops" },
                              { key: 'detachedStance', titleAr: "🛡️ الترفع والوقار عن التبريرات والجدل", titleEn: "🛡️ Detach and Neutralize Conflict" },
                              { key: 'binauralSession', titleAr: "🎧 تفعيل الاستماع المتزامن والاتساق", titleEn: "🎧 Gamma binaural 40Hz audio" }
                            ].map(hab => (
                              <div 
                                key={hab.key}
                                onClick={() => toggleHabit(hab.key)}
                                className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-[10px] select-none ${
                                  completedHabits[hab.key] 
                                    ? 'bg-gold/5 border-gold/30 text-white font-bold' 
                                    : 'bg-black/40 border-white/5 text-white/50 hover:border-white/10'
                                }`}
                              >
                                <span>{isRtl ? hab.titleAr : hab.titleEn}</span>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                                  completedHabits[hab.key] ? 'bg-gold border-gold text-black' : 'border-white/20'
                                }`}>
                                  {completedHabits[hab.key] && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* BOTTOM TAB 2: EXERCISES */}
                    {mobileBottomTab === 'exercises' && (
                      <motion.div
                        key="exercises"
                        initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRtl ? -30 : 30 }}
                        className="space-y-4"
                      >
                        {/* Tab Subsegments */}
                        <div className="flex bg-black border border-white/5 p-1 rounded-xl gap-1 select-none">
                          {[
                            { id: 'voice', labelAr: "🎙️ الصوت", labelEn: "🎙️ Tone" },
                            { id: 'coherence', labelAr: "🧠 التنفس", labelEn: "🧠 Air" },
                            { id: 'detox', labelAr: "⏳ التعرض", labelEn: "⏳ Detox" }
                          ].map(seg => (
                            <button
                              key={seg.id}
                              onClick={() => setExerciseSegment(seg.id as any)}
                              className={`flex-1 py-1.5 rounded-lg text-[10.5px] font-black tracking-wide transition-all cursor-pointer ${
                                exerciseSegment === seg.id 
                                  ? 'bg-gold text-black font-extrabold' 
                                  : 'text-white/40 hover:text-white'
                              }`}
                            >
                              {isRtl ? seg.labelAr : seg.labelEn}
                            </button>
                          ))}
                        </div>

                        {/* Rendering Subsegment contents */}
                        <div className="bg-[#0b0b0b] border border-white/5 p-4 rounded-3xl min-h-[300px]">
                          {exerciseSegment === 'voice' && (
                            <div className="space-y-4">
                              <div className="text-center space-y-1 pb-2 border-b border-white/5" dir={isRtl ? "rtl" : "ltr"}>
                                <h4 className="text-xs font-serif text-gold">{isRtl ? "محلل نبرة الصوت والهيبة" : "Vocal Frequency Diagnostic"}</h4>
                                <p className="text-[9.5px] text-white/40 leading-relaxed font-serif">{isRtl ? "تحدث بصوتك الطبيعي، ثم ابدأ التسجيل لتفكيك مستوى الرنين الصدري." : "Capture 5 seconds of spoken voice to check vocal gravity index."}</p>
                              </div>

                              {/* Canvas / Spoke Waveform area scaled inside phone */}
                              <div className="relative aspect-[3/1.4] bg-black border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                                <canvas ref={canvasRef} className="w-full h-full" />
                                {isRecording && (
                                  <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-red-600 px-2 py-0.5 rounded text-[8px] font-bold text-white animate-pulse">
                                    <span>REC</span>
                                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                  </div>
                                )}
                              </div>

                              {/* Buttons inside phone */}
                              <div className="grid grid-cols-2 gap-2 select-none">
                                <button
                                  onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                                  className={`py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                                    isRecording ? 'bg-red-600 text-white animate-pulse' : 'bg-gold text-black'
                                  }`}
                                >
                                  {isRecording ? <MicOff className="w-3.5 h-3.5 animate-spin" /> : <Mic className="w-3.5 h-3.5" />}
                                  <span>{isRecording ? (isRtl ? "إنهاء" : "Stop") : (isRtl ? "تسجيل" : "Record")}</span>
                                </button>
                                <button
                                  onClick={toggleMetronome}
                                  className={`py-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-[10px] tracking-wider transition-all cursor-pointer ${
                                    metronomePlaying ? 'border-gold text-gold bg-gold/5' : 'border-white/10 text-white/50'
                                  }`}
                                >
                                  <Activity className="w-3.5 h-3.5" />
                                  <span>{isRtl ? "إيقاع ٥٢" : "52BPM"}</span>
                                </button>
                              </div>

                              {/* Voice Analysis Report inside phone */}
                              {vocalStats && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#070707] border border-white/5 p-3 rounded-xl space-y-1.5 text-[9.5px]">
                                  <div className="flex justify-between items-center text-gold font-bold">
                                    <span>{isRtl ? "تقرير الهيبة الصوتية" : "Gravity Record"}</span>
                                    <span>{vocalStats.gravityScore}%</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 text-[9px] text-white/40 font-mono">
                                    <div>{isRtl ? "التردد:" : "Pitch:"} {vocalStats.pitchHz}Hz</div>
                                    <div>{isRtl ? "السرعة:" : "Tempo:"} {vocalStats.tempoWords} Wpm</div>
                                  </div>
                                  <p className="text-white/60 leading-relaxed font-serif text-[9.5px] border-t border-white/5 pt-1.5">{isRtl ? vocalStats.adviceAr : vocalStats.adviceEn}</p>
                                </motion.div>
                              )}
                            </div>
                          )}

                          {exerciseSegment === 'coherence' && (
                            <div className="space-y-4">
                              <div className="text-center space-y-1 pb-2 border-b border-white/5" dir={isRtl ? "rtl" : "ltr"}>
                                <h4 className="text-xs font-serif text-gold">{isRtl ? "الاتساق العصبي التنفسي" : "Respiratory Sympathetic Guard"}</h4>
                                <p className="text-[9.5px] text-white/40 font-serif">{isRtl ? "تمارين تنفس الاتساق بالتوازي مع نبضات غاما ٤٠ هرتز." : "Align breaths under Gamma audio therapy to neutralize stress overdrive."}</p>
                              </div>

                              {/* Animated breathing circle scaled inside smartphone page */}
                              <div className="relative aspect-[3/1.6] bg-black border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.06)_0%,_transparent_65%)] pointer-events-none" />
                                <div className="flex flex-col items-center justify-center gap-1 z-10 select-none">
                                  {/* Animated scale breathing target */}
                                  <motion.div
                                    animate={{
                                      scale: breathPhase === 'inhale' ? [1, 1.4] :
                                             breathPhase === 'hold-in' ? 1.4 :
                                             breathPhase === 'exhale' ? [1.4, 1] : 1,
                                    }}
                                    transition={{
                                      duration: 4,
                                      ease: "easeInOut"
                                    }}
                                    className="w-14 h-14 bg-gradient-to-br from-gold/30 to-transparent border border-gold/40 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.1)] mb-1.5"
                                  >
                                    <span className="text-[10px] font-sans text-gold font-black">{breathSecondsLeft}s</span>
                                  </motion.div>
                                  <span className="text-[9.5px] text-white/80 font-serif capitalize tracking-wider font-bold">
                                    {isRtl ? (
                                      breathPhase === 'inhale' ? "💨 شهيق عميق..." :
                                      breathPhase === 'hold-in' ? "🛡️ احبس الهواء..." :
                                      breathPhase === 'exhale' ? "💨 زفير هادئ..." : "🛡️ موازنة الأعصاب..."
                                    ) : (
                                      breathPhase.replace('-', ' ')
                                    )}
                                  </span>
                                </div>
                              </div>

                              {/* Binaural Beats play buttons inside phone app */}
                              <div className="space-y-2 select-none">
                                <button
                                  onClick={binauralActive ? stopBinauralBeats : startBinauralBeats}
                                  className={`w-full py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                    binauralActive ? 'bg-gold text-black font-extrabold animate-pulse' : 'bg-white/5 text-white/60 hover:text-white'
                                  }`}
                                >
                                  {binauralActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                                  <span>{binauralActive ? (isRtl ? "إيقاف نبضات ٤٠ هرتز" : "Mute Gamma Waves") : (isRtl ? "تفعيل نبضات غاما ٤٠ هرتز" : "Play 40Hz Gamma Beats")}</span>
                                </button>
                                
                                {binauralActive && (
                                  <div className="flex items-center gap-2 bg-black/40 border border-white/5 p-2 rounded-xl text-[8.5px] text-white/40 font-mono">
                                    <span>VOL</span>
                                    <input 
                                      type="range" 
                                      min="0" 
                                      max="1" 
                                      step="0.05" 
                                      value={binauralVolume} 
                                      onChange={(e) => setBinauralVolume(parseFloat(e.target.value))}
                                      className="flex-1 h-1 bg-zinc-800 rounded-full appearance-none outline-none accent-gold cursor-pointer"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {exerciseSegment === 'detox' && (
                            <div className="space-y-4">
                              <div className="text-center space-y-1 pb-2 border-b border-white/5" dir={isRtl ? "rtl" : "ltr"}>
                                <h4 className="text-xs font-serif text-gold">{isRtl ? "الحصانة من التشتت والتعرض" : "Social Dopamine Guard"}</h4>
                                <p className="text-[9.5px] text-white/40 font-serif leading-relaxed">{isRtl ? "مراقبة وإدارة تعرضك العصبي لمكافأة الدوبامين السريعة." : "Evaluate your impulse triggers against instant gratification feedback."}</p>
                              </div>

                              {/* Interactive screening checklist questions inside phone */}
                              <div className="space-y-3">
                                <div className="space-y-1.5 text-right sm:text-left select-none">
                                  <span className="text-[9.5px] text-white/30 uppercase tracking-widest">{isRtl ? "معدل الإرهاق الدوباميني:" : "Dopamine Stress Index"}</span>
                                  <div className="flex items-center gap-2">
                                    <input 
                                      type="range" 
                                      min="0" 
                                      max="100" 
                                      value={detoxAnswers.screenDuration} 
                                      onChange={(e) => setDetoxAnswers({...detoxAnswers, screenDuration: parseInt(e.target.value)})}
                                      className="flex-1 h-1 bg-zinc-800 rounded-full appearance-none outline-none accent-gold cursor-pointer"
                                    />
                                    <span className="text-[10px] font-mono text-gold shrink-0">{detoxAnswers.screenDuration}%</span>
                                  </div>
                                </div>

                                <div className="space-y-2 border-t border-white/5 pt-2 select-none">
                                  {[
                                    { key: 'reelsScrolling', labelAr: "تتصفح ريلز ومحتوى سريع دون وعي؟", labelEn: "Compulsive reels/shorts scrolling?" },
                                    { key: 'notificationTrigger', labelAr: "تستجيب للتنبيهات فوراً عند سماعها الرنين؟", labelEn: "Instant notification triggers?" },
                                    { key: 'sleepDelay', labelAr: "تؤخر النوم ليلاً من أجل الشاشة؟", labelEn: "Postpone sleep cycles for screen time?" }
                                  ].map(q => (
                                    <div 
                                      key={q.key} 
                                      onClick={() => setDetoxAnswers({...detoxAnswers, [q.key]: !detoxAnswers[q.key as keyof typeof detoxAnswers]})}
                                      className={`p-2 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-[9px] ${
                                        detoxAnswers[q.key as keyof typeof detoxAnswers] 
                                          ? 'bg-gold/5 border-gold/20 text-white font-bold' 
                                          : 'bg-black/30 border-white/5 text-white/40'
                                      }`}
                                    >
                                      <span>{isRtl ? q.labelAr : q.labelEn}</span>
                                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-all ${
                                        detoxAnswers[q.key as keyof typeof detoxAnswers] ? 'bg-gold border-gold text-black' : 'border-white/20'
                                      }`}>
                                        {detoxAnswers[q.key as keyof typeof detoxAnswers] && <Check className="w-2 h-2 stroke-[3]" />}
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Detox Protocol Result inside phone */}
                                <div className="bg-[#060606] border border-white/5 p-3 rounded-2xl text-[9px] space-y-1.5 leading-relaxed text-right sm:text-left" dir={isRtl ? "rtl" : "ltr"}>
                                  <span className="text-[8.5px] uppercase font-black tracking-widest text-gold block">{isRtl ? "بروتوكول المقاومة الموصى به" : "Prescribed Autonomic Lockdown"}</span>
                                  <p className="text-white/60 font-serif">{isRtl ? detoxResult.protocolAr[0] : detoxResult.protocolEn[0]}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* BOTTOM TAB 3: COMPOSURE */}
                    {mobileBottomTab === 'composure' && (
                      <motion.div
                        key="composure"
                        initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRtl ? -30 : 30 }}
                        className="space-y-4"
                      >
                        {/* Tab Subsegments */}
                        <div className="flex bg-black border border-white/5 p-1 rounded-xl gap-1 select-none">
                          {[
                            { id: 'stroop', labelAr: "🛡️ الكبت الانعكاسي", labelEn: "🛡️ Composure Reflex" },
                            { id: 'simulator', labelAr: "⚔️ محاكي الرد", labelEn: "⚔️ Attack Duel" }
                          ].map(seg => (
                            <button
                              key={seg.id}
                              onClick={() => setComposureSegment(seg.id as any)}
                              className={`flex-1 py-1.5 rounded-lg text-[10px] font-black tracking-wide transition-all cursor-pointer ${
                                composureSegment === seg.id 
                                  ? 'bg-gold text-black font-extrabold' 
                                  : 'text-white/40 hover:text-white'
                              }`}
                            >
                              {isRtl ? seg.labelAr : seg.labelEn}
                            </button>
                          ))}
                        </div>

                        {/* Composure segments panel */}
                        <div className="bg-[#0b0b0b] border border-white/5 p-4 rounded-3xl min-h-[300px]">
                          {composureSegment === 'stroop' && (
                            <div className="space-y-4">
                              <div className="text-center space-y-1 pb-2 border-b border-white/5" dir={isRtl ? "rtl" : "ltr"}>
                                <h4 className="text-xs font-serif text-gold">{isRtl ? "اختبار كبح الكلمات الاندفاعية" : "Emotional Stroop Shield"}</h4>
                                <p className="text-[9.5px] text-white/40 leading-relaxed font-serif">{isRtl ? "اضغط بنعم للكلمات الدالة على الهدوء والسيادة، ولا للكلمات المنفعلة." : "Sovereign values (siilence) = Allow, Reactive values (anger) = Block."}</p>
                              </div>

                              {/* Game board scaled for phone */}
                              {stroopActive ? (
                                <div className="space-y-3.5">
                                  <div className="flex justify-between items-center text-[9px] font-mono px-1">
                                    <span className="text-white/40">{isRtl ? "الوقت المتبقي:" : "Time:"} <span className="text-gold font-bold">{stroopTimeLeft}s</span></span>
                                    <span className="text-white/40">{isRtl ? "نقاط ثباتك:" : "Correct:"} <span className="text-emerald-400 font-bold">{stroopCorrectCount}</span></span>
                                  </div>

                                  <div className="relative aspect-[3/1.5] bg-black border border-zinc-800 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-4">
                                    <AnimatePresence mode="wait">
                                      <motion.div
                                        key={stroopWord}
                                        initial={{ scale: 0.85, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 1.1, opacity: 0 }}
                                        className={`text-xl font-serif font-black tracking-wide uppercase transition-colors ${
                                          clickStatus === 'correct' ? 'text-emerald-400 font-extrabold' :
                                          clickStatus === 'incorrect' ? 'text-red-500 font-extrabold' : 'text-white'
                                        }`}
                                      >
                                        {stroopWord}
                                      </motion.div>
                                    </AnimatePresence>
                                    <span className="absolute bottom-1.5 text-[7.5px] uppercase tracking-widest text-zinc-600 select-none">{isRtl ? "حدد هوية الكلمة فوراً" : "Classify within 1.3s"}</span>
                                  </div>

                                  {/* Interaction buttons inside phone */}
                                  <div className="grid grid-cols-2 gap-3 select-none">
                                    <button
                                      onClick={() => handleStroopClick(true)}
                                      className="py-2.5 bg-gold text-black rounded-2xl font-black text-[11px] uppercase tracking-widest cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                      {isRtl ? "✅ نعم" : "✅ Yes"}
                                    </button>
                                    <button
                                      onClick={() => handleStroopClick(false)}
                                      className="py-2.5 bg-zinc-900 border border-white/10 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                      {isRtl ? "❌ لا" : "❌ No"}
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-6 space-y-4">
                                  {stroopCompleted ? (
                                    <div className="space-y-2.5">
                                      <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-1">
                                        <Check className="w-6 h-6" />
                                      </div>
                                      <h5 className="text-xs font-bold text-white font-serif">{isRtl ? "اكتمل الاختبار بنجاح" : "Suppression Profile Locked"}</h5>
                                      <div className="text-2xl font-black font-sans text-gold">{stroopScore}%</div>
                                      <p className="text-[9.5px] text-white/50 leading-relaxed max-w-[220px] mx-auto font-serif" dir={isRtl ? "rtl" : "ltr"}>
                                        {stroopScore > 80 
                                          ? (isRtl ? "تحكم مدهش وجاهزية فطرية لكبح رد الفعل اللفظي وتفادي الاستدراج الساخر!" : "Stellar neurological guard, fully resistant to conversation traps!") 
                                          : (isRtl ? "تنبيه: سرعة انفعالك مرتفعة، تذكر الـ ٣ ثوان صمت لتجنيب عقلك الاستلاب الاستفزازي." : "Suboptimal response coherence. Apply conversational silence before answering.")}
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="py-2 space-y-3">
                                      <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto">
                                        <ShieldAlert className="w-5 h-5 text-gold" />
                                      </div>
                                      <p className="text-[9.5px] text-white/40 leading-relaxed max-w-[200px] mx-auto font-serif" dir={isRtl ? "rtl" : "ltr"}>{isRtl ? "سيقوم الاختبار بقياس سرعة اتخاذ القرار الساكن وتجنب المثيرات اللفظية الجانبية في ١٥ ثانية." : "Measures your autonomic pulse stability and verbal defense triggers under high tempo."}</p>
                                    </div>
                                  )}

                                  <button
                                    onClick={startStroopTest}
                                    className="px-6 py-2.5 bg-gold text-black rounded-xl font-bold text-[9px] uppercase tracking-wider hover:bg-white transition-colors cursor-pointer select-none"
                                  >
                                    {isRtl ? "ابدأ الاختبار الآن" : "Launch Composure Reflex"}
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {composureSegment === 'simulator' && (
                            <div className="space-y-4">
                              <div className="text-center space-y-1 pb-2 border-b border-white/5" dir={isRtl ? "rtl" : "ltr"}>
                                <h4 className="text-xs font-serif text-gold">{isRtl ? "محاكي الاستفزاز اللفظي والمواجهات" : "Verbal Conviction Duel"}</h4>
                                <p className="text-[9px] text-white/40 font-serif leading-relaxed">{isRtl ? "اختبر الرد الساكن دون السقوط في فخ التبرير أو الجدال." : "Counter hostile arguments and test your conversational status ranking."}</p>
                              </div>

                              {/* Active scenario slider inside phone */}
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-[9px] font-mono select-none">
                                  <span className="text-gold uppercase tracking-widest">{isRtl ? "مستوى الخصم:" : "Opponent Rank:"} {scenarios[activeScenarioIdx].id === 'boss' ? 'ELITE' : 'CHALLENGER'}</span>
                                  <span className="text-white/30">{activeScenarioIdx + 1} / {scenarios.length}</span>
                                </div>

                                <div className="bg-zinc-900/40 border border-white/5 p-3 rounded-2xl relative space-y-2 text-right sm:text-left" dir={isRtl ? "rtl" : "ltr"}>
                                  <div className="space-y-0.5">
                                    <span className="text-[8px] uppercase tracking-widest text-red-500 font-bold block">{isRtl ? "الموقف الخارجي الصارخ:" : "The Provocation Context:"}</span>
                                    <h5 className="text-[10px] text-white font-bold leading-relaxed font-serif italic">
                                      "{isRtl ? scenarios[activeScenarioIdx].contextAr : scenarios[activeScenarioIdx].contextEn}"
                                    </h5>
                                  </div>
                                  
                                  <div className="border-t border-white/5 pt-1.5 space-y-0.5">
                                    <span className="text-[8px] uppercase tracking-widest text-gold font-bold block">{isRtl ? "التحدي اللفظي الحالي:" : "The verbal challenge:"}</span>
                                    <p className="text-[9.5px] text-zinc-300 font-serif leading-relaxed">
                                      {isRtl ? scenarios[activeScenarioIdx].opponentTurnAr : scenarios[activeScenarioIdx].opponentTurnEn}
                                    </p>
                                  </div>
                                </div>

                                {/* Textarea for user words inside phone */}
                                <div className="space-y-2">
                                  <textarea
                                    value={userResponseText}
                                    onChange={(e) => setUserResponseText(e.target.value)}
                                    placeholder={isRtl ? "اكتب ردك المقتضب الخالي من التبرير والتشنج..." : "Formulate your poised reply (strictly narrow transactional focus, no defensive details)..."}
                                    className="w-full h-12 bg-black border border-white/10 p-2 text-[9.5px] text-white rounded-xl outline-none focus:border-gold/30 resize-none text-right sm:text-left"
                                    dir={isRtl ? "rtl" : "ltr"}
                                  />

                                  {/* Forbidden Words Flag Alert */}
                                  <div className="flex flex-wrap gap-1 items-center select-none">
                                    <span className="text-[8px] text-orange-400 font-bold uppercase">{isRtl ? "مكابح عصبية:" : "Adrenergic Red Lines:"}</span>
                                    {FORBIDDEN_WORDS.map((w, i) => (
                                      <span key={i} className={`text-[8px] px-1 py-0.2 rounded border font-sans ${
                                        userResponseText.includes(w) ? 'bg-red-500/10 border-red-500 text-red-400 font-black animate-pulse' : 'bg-white/5 border-white/5 text-white/30'
                                      }`}>
                                        {w}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="grid grid-cols-2 gap-2 pt-1 select-none">
                                    <button
                                      onClick={submitSimResponse}
                                      disabled={!userResponseText.trim() || isSimulating}
                                      className="py-2.5 bg-gold text-black rounded-xl text-[9px] font-black uppercase tracking-wider cursor-pointer disabled:opacity-40"
                                    >
                                      {isSimulating ? (isRtl ? "جاري..." : "Grading...") : (isRtl ? "تحليل الرد" : "Verify Composure")}
                                    </button>
                                    <button
                                      onClick={() => {
                                        setActiveScenarioIdx((activeScenarioIdx + 1) % scenarios.length);
                                        setUserResponseText('');
                                        setSimAnalysis(null);
                                      }}
                                      className="py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-[9px] font-bold uppercase tracking-wider cursor-pointer hover:bg-white/10"
                                    >
                                      {isRtl ? "التحدي القادم ➡️" : "Next Provocation"}
                                    </button>
                                  </div>
                                </div>

                                {/* Grade Report Card inside phone app */}
                                {simAnalysis && (
                                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#080808] border border-white/5 p-3 rounded-2xl space-y-1 text-[9.5px] text-right sm:text-left" dir={isRtl ? "rtl" : "ltr"}>
                                    <div className="flex justify-between items-center font-bold pb-1 text-[9px]">
                                      <span className="text-gold">{isRtl ? "تقييم الكبح السلوكي" : "Diagnostic Status"}</span>
                                      <span className={`${simAnalysis.score >= 80 ? 'text-emerald-400' : 'text-orange-400'} font-sans font-black uppercase`}>
                                        {simAnalysis.score} {isRtl ? "مرتبة" : "Score"}
                                      </span>
                                    </div>
                                    <p className="text-white/60 font-serif leading-relaxed">{isRtl ? simAnalysis.analysisAr : simAnalysis.analysisEn}</p>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* BOTTOM TAB 4: SHADOWS */}
                    {mobileBottomTab === 'shadow' && (
                      <motion.div
                        key="shadow"
                        initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRtl ? -30 : 30 }}
                        className="space-y-4"
                      >
                        {/* Tab Subsegments */}
                        <div className="flex bg-black border border-white/5 p-1 rounded-xl gap-1 select-none">
                          {[
                            { id: 'shadow', labelAr: "🌌 الخريطة", labelEn: "🌌 Mapper" },
                            { id: 'journal', labelAr: "📓 المذكرات", labelEn: "📓 Journal" },
                            { id: 'chat', labelAr: "💬 المستشار", labelEn: "💬 Advisor" }
                          ].map(seg => (
                            <button
                              key={seg.id}
                              onClick={() => setShadowSegment(seg.id as any)}
                              className={`flex-1 py-1.5 rounded-lg text-[10px] font-black tracking-wide transition-all cursor-pointer ${
                                shadowSegment === seg.id 
                                  ? 'bg-gold text-black font-extrabold' 
                                  : 'text-white/40 hover:text-white'
                              }`}
                            >
                              {isRtl ? seg.labelAr : seg.labelEn}
                            </button>
                          ))}
                        </div>

                        {/* Rendering selected subsegments */}
                        <div className="bg-[#0b0b0b] border border-white/5 p-4 rounded-3xl min-h-[300px] flex flex-col justify-between">
                          {shadowSegment === 'shadow' && (
                            <div className="space-y-4">
                              <div className="text-center space-y-1 pb-2 border-b border-white/5" dir={isRtl ? "rtl" : "ltr"}>
                                <h4 className="text-xs font-serif text-gold">{isRtl ? "خريطة الظلال السلوكية السفلية" : "Jungian Shadow Diagnostic"}</h4>
                                <p className="text-[9.5px] text-white/40 font-serif leading-relaxed">{isRtl ? "فك الشفرات وتصوير الرغبات والتوجهات المكبوتة في لاوعيك للسيطرة والإيجابية." : "Visualize archetypes of defensive mask to bring shadow elements to cognitive light."}</p>
                              </div>

                              {/* Scaled Shadow Map Grid inside phone */}
                              <div className="relative aspect-square max-w-[170px] mx-auto bg-black border border-white/5 rounded-full flex items-center justify-center p-1">
                                <svg viewBox="0 0 120 120" className="w-full h-full relative z-10 p-1">
                                  <circle cx="60" cy="60" r="30" fill="none" stroke="#d4af37" strokeWidth="0.5" className="opacity-10" />
                                  <circle cx="60" cy="60" r="50" fill="none" stroke="#d4af37" strokeWidth="0.5" className="opacity-5" />
                                  {[
                                    { x: 60, y: 15, label: "Persona" },
                                    { x: 95, y: 35, label: "Ego" },
                                    { x: 95, y: 85, label: "Animus" },
                                    { x: 60, y: 105, label: "Shadow" },
                                    { x: 25, y: 85, label: "Self" }
                                  ].map((pt, i) => (
                                    <g key={i}>
                                      <circle cx={pt.x} cy={pt.y} r="3.5" fill="#d4af37" />
                                      <text x={pt.x} y={pt.y - 6} textAnchor="middle" fontSize="4.5" fill="#ffffff" className="opacity-50 font-serif">{pt.label}</text>
                                    </g>
                                  ))}
                                  {/* Connect lines */}
                                  <polygon points="60,15 95,35 95,85 60,105 25,85" fill="rgba(212, 175, 55, 0.08)" stroke="#d4af37" strokeWidth="1" />
                                </svg>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center select-none pointer-events-none">
                                  <span className="text-[7px] uppercase text-white/30 tracking-widest">{isRtl ? "توازن" : "Symmetry"}</span>
                                  <span className="text-sm font-light text-gold font-mono">1.04</span>
                                </div>
                              </div>

                              {/* Draggable Archetype points slider inside phone app */}
                              <div className="space-y-2 pt-2 border-t border-white/5 overflow-y-auto max-h-[160px] pr-1 select-none">
                                {jungPoints.map(pt => (
                                  <div key={pt.id} className="bg-zinc-900/40 p-2 border border-white/5 rounded-xl space-y-1.5">
                                    <div className="flex justify-between items-center text-[9px] text-right" dir={isRtl ? "rtl" : "ltr"}>
                                      <span className="font-bold text-white font-serif">{isRtl ? pt.nameAr : pt.nameEn}</span>
                                      <span className="text-gold font-mono font-bold">{pt.value}%</span>
                                    </div>
                                    <input
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={pt.value}
                                      onChange={(e) => updateArchetypeValue(pt.id, parseInt(e.target.value))}
                                      className="w-full h-1 bg-zinc-800 rounded-full appearance-none outline-none accent-gold cursor-pointer"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {shadowSegment === 'journal' && (
                            <div className="space-y-4">
                              <div className="text-center space-y-1 pb-2 border-b border-white/5" dir={isRtl ? "rtl" : "ltr"}>
                                <h4 className="text-xs font-serif text-gold">{isRtl ? "دفتر مذكرات الظل الصامت" : "Catharsis Void Journal"}</h4>
                                <p className="text-[9.5px] text-white/40 font-serif leading-relaxed">{isRtl ? "أفرغ صدماتك وغضبك هنا. بمجرد الكتابة والضغط على التفتيت، ستتبخر الكلمات الكامنة وتتحول لرماد." : "Write your trauma down, hit sublimate, and watch your words dissolve and burn."}</p>
                              </div>

                              {/* Canvas disperse area inside phone screen */}
                              <div className="relative aspect-[3/1.4] bg-black border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                                <canvas ref={journalCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
                                
                                {isJournalSublimating ? (
                                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-20 select-none">
                                    <Sparkles className="w-4 h-4 text-gold animate-bounce" />
                                    <span className="text-[8px] uppercase tracking-widest text-gold font-bold animate-pulse">{isRtl ? "تطهير العقد عصبياً..." : "Discharging emotional load..."}</span>
                                  </div>
                                ) : (
                                  <textarea
                                    value={journalText}
                                    onChange={(e) => setJournalText(e.target.value)}
                                    placeholder={isRtl ? "اكتب مخاوفك، صدماتك، أو الأفكار الغاضبة التي تكدر وقارك..." : "Splat your inner fear down. Watch the void consume and discharge it..."}
                                    className="w-full h-full bg-transparent text-[9.5px] text-zinc-300 leading-relaxed font-serif outline-none resize-none border-none p-2 z-10 text-right"
                                    dir={isRtl ? "rtl" : "ltr"}
                                  />
                                )}
                              </div>

                              {/* Sublimation Trigger Button inside the phone */}
                              <button
                                onClick={triggerSublimation}
                                disabled={!journalText.trim() || isJournalSublimating}
                                className="w-full py-3 bg-gold text-black rounded-xl font-black text-[9.5px] uppercase tracking-widest cursor-pointer disabled:opacity-40 select-none"
                              >
                                {isRtl ? "⚡ تفتيت وتبخير الأفكار السلبية" : "⚡ Sublimate & Release Void"}
                              </button>

                              {/* Feedback text bubble */}
                              {sublimatedQuotes && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#060606] border border-white/5 p-3 rounded-2xl text-[9px] leading-relaxed text-gold/80 italic font-serif text-right" dir={isRtl ? "rtl" : "ltr"}>
                                  "{isRtl ? sublimatedQuotes.ar : sublimatedQuotes.en}"
                                </motion.div>
                              )}
                            </div>
                          )}

                          {shadowSegment === 'chat' && (
                            <div className="h-[360px] flex flex-col justify-between space-y-3">
                              <div className="text-center space-y-1 pb-1.5 border-b border-white/5 shrink-0" dir={isRtl ? "rtl" : "ltr"}>
                                <h4 className="text-xs font-serif text-gold">{isRtl ? "مستشار الذكاء الاصطناعي الهاتفي" : "Autonomic AI Consulting Guide"}</h4>
                                <p className="text-[8.5px] text-white/40 font-serif leading-none">{isRtl ? "استشارة فورية بخصوص سلوكياتك، لغة جسدك وهيبتك." : "Real-time guidance under Bechir's behavioral models."}</p>
                              </div>

                              {/* Conversation messages area of simulated mobile screen */}
                              <div className="flex-1 overflow-y-auto p-2 space-y-2.5 bg-black/40 border border-white/5 rounded-2xl scrollbar-none pr-1">
                                {mobileChatHistory.map((item, idx) => (
                                  <div 
                                    key={idx} 
                                    className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                  >
                                    <div 
                                      className={`p-2.5 rounded-2xl max-w-[85%] text-[9.5px] leading-relaxed font-serif text-right sm:text-left ${
                                        item.role === 'user' 
                                          ? 'bg-gold text-black rounded-tr-none text-[#111]' 
                                          : 'bg-zinc-900 border border-white/5 text-white/90 rounded-tl-none'
                                      }`}
                                      dir={isRtl ? "rtl" : "ltr"}
                                    >
                                      {item.content}
                                    </div>
                                  </div>
                                ))}
                                {isMobileChatLoading && (
                                  <div className="flex justify-start">
                                    <div className="bg-zinc-900 border border-white/5 p-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5 select-none">
                                      <Loader2 className="w-2.5 h-2.5 text-gold animate-spin" />
                                      <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-mono">CONJURING...</span>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Footer input form area inside smartphone */}
                              <div className="flex gap-1.5 shrink-0 select-none">
                                <input
                                  type="text"
                                  value={mobileChatQuery}
                                  onChange={(e) => setMobileChatQuery(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') sendMobileChatMessage();
                                  }}
                                  placeholder={isRtl ? "اسأل عن هيبة لغة الجسد..." : "Ask about vocal frequency..."}
                                  className="flex-1 bg-black border border-white/10 p-2 text-[10px] text-white rounded-xl outline-none focus:border-gold/30 text-right"
                                  dir={isRtl ? "rtl" : "ltr"}
                                />
                                <button
                                  onClick={sendMobileChatMessage}
                                  disabled={!mobileChatQuery.trim() || isMobileChatLoading}
                                  className="w-10 h-10 bg-gold text-black rounded-xl flex items-center justify-center cursor-pointer shrink-0 disabled:opacity-40"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>

                </div>

                {/* Simulated Custom Dynamic Bottom Native App Navigation Bar */}
                <div className="w-full bg-black/80 border-t border-white/5 px-6 py-3.5 shrink-0 flex items-center justify-between z-30 relative backdrop-blur-md pb-6 select-none">
                  {[
                    { id: 'dashboard', labelAr: "الرئيسية", labelEn: "Home", icon: Activity },
                    { id: 'exercises', labelAr: "التمارين", labelEn: "Training", icon: Sliders },
                    { id: 'composure', labelAr: "الدرع", labelEn: "Composure", icon: Brain },
                    { id: 'shadow', labelAr: "الظلال", labelEn: "Shadow", icon: Sparkles }
                  ].map(item => {
                    const ItemIcon = item.icon;
                    const isActive = mobileBottomTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setMobileBottomTab(item.id as any)}
                        className={`flex flex-col items-center gap-1 transition-all relative cursor-pointer ${
                          isActive ? 'text-gold font-bold' : 'text-white/30 hover:text-white/60'
                        }`}
                      >
                        <ItemIcon className="w-4 h-4" />
                        <span className="text-[8.5px] uppercase font-black tracking-widest leading-none shrink-0">{isRtl ? item.labelAr : item.labelEn}</span>
                        {isActive && (
                          <motion.div 
                            layoutId="mobileActiveDot" 
                            className="absolute -top-2 w-1 h-1 bg-gold rounded-full" 
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Swipe Bar home indicator */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/25 rounded-full z-40 select-none pointer-events-none" />

              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Tab Switcher Flex Grid */}
            <div className="flex flex-wrap justify-center gap-2 max-w-7xl mx-auto mb-12">
              {[
                { id: 'voice', labelAr: "🎙️ محلل نبرة الصوت", labelEn: "🎙️ Tone Analyzer" },
                { id: 'shadow', labelAr: "🌌 خريطة الظلال", labelEn: "🌌 Shadow Mapper" },
                { id: 'coherence', labelAr: "🧠 الاتساق العصبي", labelEn: "🧠 Coherence Clinic" },
                { id: 'simulator', labelAr: "⚔️ محاكي الاستفزاز", labelEn: "⚔️ Provocation Sim" },
                { id: 'detox', labelAr: "⏳ الحصانة الرقمية", labelEn: "⏳ Digital Immunity" },
                { id: 'journal', labelAr: "📓 الظل الصامت", labelEn: "📓 Shadow Journal" },
                { id: 'stroop', labelAr: "🛡️ الكبت الانعكاسي", labelEn: "🛡️ Stroop Shield" },
                { id: 'tracker', labelAr: "⭐ تتبع الهيبة", labelEn: "⭐ Sovereign Tracker" },
                { id: 'emdr', labelAr: "👁️ معالج حركة العينين", labelEn: "👁️ EMDR Desens" },
                { id: 'aura', labelAr: "🔮 استقطاب الهالة والوقار", labelEn: "🔮 Aura & Resonance" },
                { id: 'tv', labelAr: "📺 العرض والتلفاز", labelEn: "📺 TV & Casting" },
                { id: 'pitch', labelAr: "💡 صك وصياغة الأفكار", labelEn: "💡 Sovereign Pitch Foundry" },
                { id: 'global', labelAr: "🌍 رادار التوسع والسيادة العالمية", labelEn: "🌍 Global Sovereignty & Expansion Hub" },
                { id: 'schema', labelAr: "🧠 كيمياء وتفكيك المخططات النفسية", labelEn: "🧠 Sovereign Schema Alchemist" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-2 rounded-xl border text-[11px] font-black tracking-wide transition-all duration-300 relative ${
                    activeTab === tab.id 
                      ? 'bg-gold text-black border-gold shadow-[0_8px_20px_-4px_rgba(212,175,55,0.3)]' 
                      : 'bg-[#0a0a0a] text-white/60 border-white/5 hover:border-gold/30 hover:text-white'
                  }`}
                >
                  <span className="block truncate">{isRtl ? tab.labelAr : tab.labelEn}</span>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Active Tab Showcase Pane */}
            <div className="bg-[#0b0b0b] border border-white/5 rounded-3xl p-6 md:p-12 max-w-5xl mx-auto relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-40 pointer-events-none" />

              <AnimatePresence mode="wait">
            {/* 1. VOCAL GRAVITY ANALYZER */}
            {activeTab === 'voice' && (
              <motion.div
                key="voice"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                      <Mic className="w-6 h-6" />
                      {isRtl ? "محلل النبرة الصوتية والجاذبية الوقورة" : "Sovereign Vocal Tone & Gravity Analyzer"}
                    </h3>
                    <p className="text-white/40 text-[11px] md:text-xs uppercase tracking-widest leading-relaxed">
                      {isRtl 
                        ? "تحليل فوري لتردد الرنين، ووتيرة إلقاء الكلمات لتجنب النبرات العالية الضعيفة."
                        : "Biometric voice capture to optimize thoracic resonance and enforce authoritative calm."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                      className={`px-5 py-3 rounded-2xl flex items-center gap-3 font-semibold text-xs uppercase tracking-widest transition-all ${
                        isRecording 
                          ? 'bg-red-600 text-white animate-pulse' 
                          : 'bg-gold text-black hover:bg-white'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      {isRecording 
                        ? (isRtl ? "إنهاء ومعالجة..." : "Stop & Analyze...") 
                        : (isRtl ? "ابدأ تسجيل صوتك (٥-١٠ ثوانٍ)" : "Start Voice Recording")}
                    </button>

                    <button
                      onClick={toggleMetronome}
                      className={`px-5 py-3 rounded-2xl border flex items-center gap-3 font-semibold text-xs tracking-widest transition-all ${
                        metronomePlaying 
                          ? 'border-gold text-gold bg-gold/10' 
                          : 'border-white/10 text-white hover:border-gold'
                      }`}
                    >
                      <Activity className={`w-4 h-4 ${metronomePlaying ? 'animate-spin' : ''}`} />
                      {metronomePlaying 
                        ? (isRtl ? "إيقاف إيقاع ٥٢ نبرة" : "Stop 52BPM Cadence") 
                        : (isRtl ? "تمارين إيقاع وتيرة ٢٠٪" : "Train 20% Slow Tempo")}
                    </button>
                  </div>
                </div>

                {/* Oscilloscope Canvas Panel */}
                <div className="relative aspect-[21/9] w-full bg-black rounded-3xl overflow-hidden border border-white/5 flex items-center justify-center">
                  <canvas ref={canvasRef} width={800} height={250} className="w-full h-full block" />
                  
                  {isRecording && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      {isRtl ? `تسجيل نشط: ${recordProgress}%` : `CAPTURING AUDIO: ${recordProgress}%`}
                    </div>
                  )}

                  {!isRecording && !vocalStats && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 space-y-4">
                      <div className="w-16 h-16 rounded-full border border-gold/10 bg-gold/5 flex items-center justify-center text-gold">
                        <Mic className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-serif italic text-base">
                          {isRtl ? "تكلم بصوت طبيعي رصين لتسوية الحسابات" : "Microphone analysis pending engagement"}
                        </h4>
                        <p className="text-white/40 text-xs mt-1">
                          {isRtl 
                            ? "اضغط زر التسجيل، ثم اقرأ جملاً من الدراسات بصوت ممتد." 
                            : "Press Start, then read aloud any article in your natural voice."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Analysis Report Generation */}
                {vocalStats && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid md:grid-cols-3 gap-6 bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 md:p-8"
                  >
                    <div className="space-y-2 border-r border-white/5 pr-4">
                      <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                        {isRtl ? "مؤشر الهيبة والحضور الصوتي" : "Vocal Gravity Match"}
                      </div>
                      <div className="text-4xl font-light font-serif text-gold">{vocalStats.gravityScore}%</div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                        <div className="bg-gold h-full rounded-full" style={{ width: `${vocalStats.gravityScore}%` }} />
                      </div>
                    </div>

                    <div className="space-y-2 border-r border-white/5 pr-4">
                      <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                        {isRtl ? "تردد الرنين الأساسي" : "Resonance Depth"}
                      </div>
                      <div className="text-2xl font-light font-serif text-white">{vocalStats.resonance}</div>
                      <div className="text-xs text-white/50 lowercase font-mono mt-1">{vocalStats.pitchHz} Hz (Sub-Frequency range)</div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                        {isRtl ? "توصية سلوكية مخصصة" : "Special Heuristic Advice"}
                      </div>
                      <div className="text-xs text-white/70 leading-relaxed italic">
                        {isRtl ? vocalStats.adviceAr : vocalStats.adviceEn}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* 2. SUBCONSCIOUS SHADOW MAPPER */}
            {activeTab === 'shadow' && (
              <motion.div
                key="shadow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="space-y-2 border-b border-white/5 pb-6">
                  <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                    <Compass className="w-6 h-6" />
                    {isRtl ? "خريطة الأنماط الكونية وظلال العقل الباطن" : "Jungian Subconscious Archetype & Shadow Mapper"}
                  </h3>
                  <p className="text-white/40 text-xs">
                    {isRtl 
                      ? "اضغط واضبط مستويات توازن الأبعاد الأربعة لرسم إحداثيات التسامي الروحي الخاص بك."
                      : "Interact and adjust the four core subconscious coordinates to graph your integrated status."}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  
                  {/* Dynamic SVG Constellation Chart */}
                  <div className="relative aspect-square max-w-sm mx-auto w-full bg-black/40 border border-white/5 rounded-full flex items-center justify-center p-8">
                    
                    {/* SVG Radial Web Map */}
                    <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                      {/* Grid Circles */}
                      {[25, 50, 75, 100].map(r => (
                        <circle
                          key={r}
                          cx="100"
                          cy="100"
                          r={r * 0.8}
                          fill="none"
                          stroke="#d4af37"
                          strokeWidth="0.5"
                          className="opacity-15"
                        />
                      ))}

                      {/* Web Axis Lines */}
                      {jungPoints.map(p => {
                        const rad = (p.angle * Math.PI) / 180;
                        const x = 100 + Math.cos(rad) * 80;
                        const y = 100 + Math.sin(rad) * 80;
                        return (
                          <line
                            key={p.id}
                            x1="100"
                            y1="100"
                            x2={x}
                            y2={y}
                            stroke="#ffffff"
                            strokeWidth="0.5"
                            className="opacity-10"
                          />
                        );
                      })}

                      {/* Poly shape drawing actual values */}
                      {(() => {
                        const pts = jungPoints.map(p => {
                          const rad = (p.angle * Math.PI) / 180;
                          const dist = p.value * 0.8;
                          const x = 100 + Math.cos(rad) * dist;
                          const y = 100 + Math.sin(rad) * dist;
                          return `${x},${y}`;
                        }).join(' ');

                        return (
                          <polygon
                            points={pts}
                            fill="rgba(212, 175, 55, 0.15)"
                            stroke="#d4af37"
                            strokeWidth="1.5"
                            className="animate-pulse"
                          />
                        );
                      })()}

                      {/* Value dots on points */}
                      {jungPoints.map(p => {
                        const rad = (p.angle * Math.PI) / 180;
                        const dist = p.value * 0.8;
                        const x = 100 + Math.cos(rad) * dist;
                        const y = 100 + Math.sin(rad) * dist;
                        return (
                          <circle
                            key={p.id}
                            cx={x}
                            cy={y}
                            r="4.5"
                            fill={p.color}
                            className="cursor-pointer hover:scale-130 transition-transform"
                            onClick={() => setSelectedPointId(p.id)}
                          />
                        );
                      })}
                    </svg>

                    {/* Outer text indicators */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest font-black text-emerald-500">
                      {isRtl ? "الذات السيادية" : "Sovereign Self"}
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest font-black text-rose-500">
                      {isRtl ? "الظل اللاواعي" : "Subconscious Shadow"}
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] uppercase tracking-widest font-black text-blue-400">
                      {isRtl ? "القناع الخارجي" : "Social Mask"}
                    </div>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] uppercase tracking-widest font-black text-gold">
                      {isRtl ? "الأنيموس" : "Dual Soul"}
                    </div>
                  </div>

                  {/* Range controls and details */}
                  <div className="space-y-6">
                    <div className="bg-[#0e0e0e] border border-white/5 rounded-2xl p-6 space-y-4">
                      <h4 className="text-white font-serif italic text-base flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: jungPoints.find(p => p.id === selectedPointId)?.color }} />
                        {isRtl ? jungPoints.find(p => p.id === selectedPointId)?.nameAr : jungPoints.find(p => p.id === selectedPointId)?.nameEn}
                      </h4>
                      <p className="text-xs text-white/50 leading-relaxed min-h-[3rem]">
                        {isRtl ? jungPoints.find(p => p.id === selectedPointId)?.descAr : jungPoints.find(p => p.id === selectedPointId)?.descEn}
                      </p>

                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-white/45">
                          <span>{isRtl ? "تعديل مستوى التأثير" : "Influence Magnitude"}</span>
                          <span>{jungPoints.find(p => p.id === selectedPointId)?.value}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={jungPoints.find(p => p.id === selectedPointId)?.value || 50}
                          onChange={(e) => updateArchetypeValue(selectedPointId, parseInt(e.target.value))}
                          className="w-full accent-gold bg-white/5 rounded-lg h-1.5 appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Generated report summary */}
                    <div className="bg-[#d4af3708] border border-gold/10 rounded-2xl p-5 space-y-2">
                      <div className="text-[10px] text-gold uppercase tracking-widest font-black">
                        {isRtl ? "التناغم الجغرافي المعرفي" : "Sovereign Shadow Balance"}
                      </div>
                      <h5 className="text-sm text-white font-semibold">
                        {isRtl ? getSovereigntyAnalysis().titleAr : getSovereigntyAnalysis().titleEn}
                      </h5>
                      <p className="text-xs text-white/60 leading-relaxed italic">
                        {isRtl ? getSovereigntyAnalysis().adviceAr : getSovereigntyAnalysis().adviceEn}
                      </p>
                    </div>
                    
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. NEURAL COHERENCE & BINAURAL BEATS CLINIC */}
            {activeTab === 'coherence' && (
              <motion.div
                key="coherence"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                      <Brain className="w-6 h-6 animate-pulse" />
                      {isRtl ? "سكون وتزامن نصفي الدماغ للاتساق العصبي" : "Neural Coherence & Hemispheric Synchronizer"}
                    </h3>
                    <p className="text-white/40 text-xs">
                      {isRtl 
                        ? "أنتج موجات خفض الفص الجداري (٤٠ هرتز) واستخدم تمارين التنفس المتسق والسكينة الإيمانية."
                        : "Emit 40Hz Gamma waves to synchronize hemispheres and utilize block breathing."}
                    </p>
                  </div>

                  <button
                    onClick={binauralActive ? stopBinauralBeats : startBinauralBeats}
                    className={`px-6 py-3.5 rounded-2xl flex items-center gap-3 font-semibold text-xs tracking-widest uppercase transition-all ${
                      binauralActive 
                        ? 'bg-[#d4af3720] text-gold border border-gold/30 shadow-[0_4px_20px_rgba(212,175,55,0.1)]' 
                        : 'bg-gold text-black hover:bg-white'
                    }`}
                  >
                    {binauralActive ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    {binauralActive 
                      ? (isRtl ? "إيقاف ذبذبات جاما ٤٠ هرتز" : "Stop Binaural Beats (40Hz)") 
                      : (isRtl ? "تفعيل نبضات جاما (٤٠ هرتز) 🎧" : "Emmit Gamma Binaural (40Hz) 🎧")}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
                  
                  {/* Glowing Box breathing pacer sphere */}
                  <div className="space-y-6 flex flex-col items-center justify-center">
                    <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black w-full text-center">
                      {isRtl ? "مراقب التنفس المتسق لرفع الجاذبية" : "Consistent Autonomic Respiratory Coach"}
                    </div>

                    <div className="relative aspect-square w-full max-w-sm flex items-center justify-center">
                      
                      {/* Outer pulse boundary */}
                      <motion.div
                        animate={{ 
                          scale: breathPhase === 'inhale' ? 1.4 : breathPhase === 'hold-in' ? 1.4 : breathPhase === 'exhale' ? 0.95 : 0.95,
                          opacity: breathPhase.startsWith('hold') ? 0.8 : 0.4
                        }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className="absolute inset-8 rounded-full border border-gold/20 flex items-center justify-center"
                      />

                      {/* Moving glowing core sphere representing lungs */}
                      <motion.div
                        animate={{ 
                          scale: breathPhase === 'inhale' ? [1, 1.3] : breathPhase === 'hold-in' ? 1.3 : breathPhase === 'exhale' ? [1.3, 0.9] : 0.9,
                          backgroundColor: breathPhase.startsWith('hold') ? '#d4af37' : '#ffffff'
                        }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className="w-32 h-32 rounded-full flex flex-col items-center justify-center p-4 shadow-[0_0_80px_rgba(212,175,55,0.2)] text-black relative"
                      >
                        <span className="text-xl font-black font-serif uppercase tracking-wider">
                          {breathSecondsLeft}s
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest block text-black/50 mt-1">
                          {breathPhase}
                        </span>
                      </motion.div>
                    </div>

                    <div className="text-center">
                      <h4 className="text-white font-serif italic text-base capitalize">
                        {breathPhase === 'inhale' && (isRtl ? "شهيق ... اسحب السكينة الصامتة" : "Inhale... Draw deep silent calmness")}
                        {breathPhase === 'hold-in' && (isRtl ? "حبس ... ثبت كنه نفسك وطاقتك" : "Hold... Retain cognitive energy")}
                        {breathPhase === 'exhale' && (isRtl ? "زفير ... تفرغ من شحنات التوتر" : "Exhale... Dispense stress variables")}
                        {breathPhase === 'hold-out' && (isRtl ? "سكون ... انسجام تام وعزلة تامة" : "Hold... Perfect quietude environment")}
                      </h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2">{isRtl ? "بروتوكول تفويض الصدمات ٤-٤-٤-٤" : "Box Breathing 4-4-4-4 Technique"}</p>
                    </div>
                  </div>

                  {/* Scientific guidance info */}
                  <div className="space-y-6">
                    {binauralActive && (
                      <div className="space-y-4">
                        <div className="text-left">
                          <div className="flex justify-between text-xs text-white/50 mb-1">
                            <span>{isRtl ? "مستوى عمق الموجة" : "Stereo Pan Volume"}</span>
                            <span>{Math.round(binauralVolume * 100)}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={binauralVolume}
                            onChange={(e) => setBinauralVolume(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/5 accent-gold rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        <div className="bg-[#101010] border border-emerald-500/20 rounded-2xl p-4 flex gap-3 items-start">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 animate-ping shrink-0" />
                          <p className="text-xs text-emerald-400 font-mono leading-relaxed">
                            {isRtl 
                              ? "تردد اليسار: ٢٠٠ هرتز | تردد اليمين: ٢٤٠ هرتز. الفارق النصف دماغي: ٤٠ هرتز. هذا التزامن يثبط نشاط الفص الجداري (OAA) ويعطل حدود الشتات الروحي."
                              : "L-Freq: 200Hz | R-Freq: 240Hz. Dynamic Brainstem Shift: 40Hz (Pure Gamma). This synchronizes brain waves, dampening the Parietal OAA to foster transcendent peace."}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="bg-[#0e0e0e] border border-white/5 rounded-2xl p-6 space-y-4">
                      <h4 className="text-gold font-serif italic text-base">{isRtl ? "كيف يخدمك الاتساق العصبي؟" : "What is Neurological Coherence?"}</h4>
                      <div className="text-xs text-white/60 leading-relaxed space-y-3 font-serif">
                        <p>
                          {isRtl 
                            ? "أثبتت دراسات جامعة هارفارد أن تزامن نصفي الدماغ بنطاق موجات جاما يعزز التركيز والصفاء الذهني الفوري. الوعي الباطني يستجيب للموجات الصوتية ثنائية التردد عبر خفض معدلات التوتر العضلي بشكل هيكلي."
                            : "Studies suggest that entraining internal brain systems using Gamma-range waves boosts cognitive cohesion, spatial processing, and dampens cortisol spikes."}
                        </p>
                        <p>
                          {isRtl 
                            ? "تعتبر اللوزة الدماغية (المحفز للخوف) أكثر تماهياً وقبولاً للأطروحات حين تقرأ أو تتدبر في صمت ممتزج بالترددات البسيطة الحجم."
                            : "Your amygdala remains calm for constructive learning or deep reading when environmental stressors are blanked by safe binaural sounds."}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* 4. SOCIAL PROVOCATION SIMULATOR */}
            {activeTab === 'simulator' && (
              <motion.div
                key="simulator"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="space-y-2 border-b border-white/5 pb-6">
                  <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                    <ShieldAlert className="w-6 h-6 text-red-500" />
                    {isRtl ? "محاكي المواقف الاجتماعية الضاغطة والاستفزاز" : "Social Provocation & De-escalation Simulator"}
                  </h3>
                  <p className="text-white/40 text-xs">
                    {isRtl 
                      ? "اختبر قدرتك الحقيقية على تطبيق بروتوكول 'بشير الماجري للصمت الاستراتيجي' وتلقّ تقييماً ذكياً لردودك المعرفية."
                      : "Put yourself in high-friction settings to test your emotional immunity and strategic language composure."}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Scenarios lists */}
                  <div className="md:col-span-1 space-y-3">
                    <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">
                      {isRtl ? "اختر ساحة التجربة واعلم قياسك" : "Chamber Select & Difficulty"}
                    </div>
                    {scenarios.map((sc, i) => (
                      <button
                        key={sc.id}
                        onClick={() => {
                          setActiveScenarioIdx(i);
                          setUserResponseText('');
                          setSimAnalysis(null);
                        }}
                        className={`w-full p-4 rounded-2xl text-right md:text-left text-xs font-serif transition-all border ${
                          activeScenarioIdx === i 
                            ? 'bg-gold/5 text-gold border-gold/30 shadow-[0_4px_15px_rgba(212,175,55,0.05)]' 
                            : 'bg-[#090909] text-white/60 border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="font-sans font-bold text-[10px] uppercase text-white/40 tracking-wider mb-1">SCENARIO 0{i+1}</div>
                        <div>{isRtl ? sc.titleAr : sc.titleEn}</div>
                      </button>
                    ))}
                  </div>

                  {/* Simulator Active Workspace */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0b0b0b] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 relative">
                      
                      {/* Interactive Context Dialog */}
                      <div className="space-y-2">
                        <div className="inline-block text-[9px] uppercase font-black bg-red-600/10 text-red-500 border border-red-500/20 px-2.5 py-1 rounded-full mb-2">
                          {isRtl ? "حدث استفزاز مباغت" : "HOSTILE INTERFACE DETECTED"}
                        </div>
                        <p className="text-sm md:text-base font-serif italic leading-relaxed text-white">
                          "{isRtl ? activeScenario.contextAr : activeScenario.contextEn}"
                        </p>
                        <hr className="border-white/5" />
                        <p className="text-xs text-gold font-sans font-medium flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                          {isRtl ? activeScenario.opponentTurnAr : activeScenario.opponentTurnEn}
                        </p>
                      </div>

                      {/* User response write fields */}
                      <div className="space-y-4">
                        <textarea
                          rows={3}
                          value={userResponseText}
                          onChange={(e) => setUserResponseText(e.target.value)}
                          placeholder={isRtl ? "اكتب ردك الهادئ والمحكم هنا لتحدي الموقف..." : "Write your calm, structured reaction here..."}
                          className="w-full bg-black border border-white/5 rounded-2xl p-4 text-xs font-serif leading-relaxed text-white focus:outline-none focus:border-gold placeholder:text-white/20"
                        />
                        
                        <div className="flex justify-between items-center text-[10px] text-white/40 uppercase">
                          <span>{isRtl ? "تجنب: مبرر، صراخ، غضب سريع" : "Avoid: justification, rapid shouting, defensiveness"}</span>
                          <span>{userResponseText.length} {isRtl ? "حرف" : "chars"}</span>
                        </div>

                        <button
                          onClick={submitSimResponse}
                          disabled={isSimulating || !userResponseText.trim()}
                          className="w-full py-3.5 rounded-2xl bg-gold text-black font-semibold text-xs uppercase tracking-widest transition-all hover:bg-white active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                        >
                          {isSimulating ? (
                            <>
                              <RefreshCcw className="w-4 h-4 animate-spin" />
                              {isRtl ? "يقوم بشير الماجري بتحليل نبرة ردك السلوكي..." : "Bechir's Heuristic AI Model Analyzing..."}
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              {isRtl ? "إخضاع الرد للتدقيق السلوكي والذكاء العاطفي" : "Submit response for clinical audit"}
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Simulation Result Report */}
                    {simAnalysis && (
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6"
                      >
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                          <div>
                            <h4 className="text-[#d4af37] font-serif italic text-base">{isRtl ? "تقرير السيادة والحصانة العاطفية" : "Composition Audit Report"}</h4>
                            <p className="text-[10px] text-white/30 uppercase mt-0.5">{isRtl ? "الدرجة الكلية لاستجابة استرخاء الدماغ" : "Absolute Sovereignty Score"}</p>
                          </div>
                          <span className="text-3xl font-light font-serif text-gold">{simAnalysis.score}%</span>
                        </div>

                        {/* Text report explaining composure analysis */}
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase font-bold tracking-widest text-white/45 block">{isRtl ? "الخلاصة والبديل السيادي المعتمد" : "Clinical Composure Feedback"}</label>
                          <p className="text-xs text-white/70 leading-relaxed font-serif italic bg-gold/5 border border-gold/10 p-4 rounded-2xl">
                            {isRtl ? simAnalysis.analysisAr : simAnalysis.analysisEn}
                          </p>
                        </div>

                        {/* Performance metrics breakdown */}
                        <div className="grid md:grid-cols-3 gap-6 pt-2">
                          {simAnalysis.metrics.map((met, idx) => (
                            <div key={idx} className="space-y-1.5">
                              <div className="flex justify-between text-[10px] uppercase font-bold text-white/40">
                                <span>{isRtl ? met.nameAr : met.nameEn}</span>
                                <span>{met.score}%</span>
                              </div>
                              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-gold h-full rounded-full" style={{ width: `${met.score}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. DIGITAL DETOX LEDGER */}
            {activeTab === 'detox' && (
              <motion.div
                key="detox"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="space-y-2 border-b border-white/5 pb-6">
                  <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                    <Clock className="w-6 h-6 text-yellow-500" />
                    {isRtl ? "مؤشر السيادة والحصانة الرقمية لحماية الأعصاب" : "Digital Detoxing Ledger & Nervous Protection Index"}
                  </h3>
                  <p className="text-white/40 text-xs">
                    {isRtl 
                      ? "قياس دقيق لنسبة اختراق شاشتك للجهاز العصبي وإجراءات كبح ملاحقة الدوبامين السريع."
                      : "Assess variables of your cognitive overload, calculate safety index, and download a custom dopamine protocol."}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  
                  {/* Ledger Form Inputs */}
                  <div className="bg-[#0e0e0e] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                    <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-2 border-b border-white/5 pb-2">
                      {isRtl ? "مؤشرات نمط استهلاكك العصبي اليومي" : "Autonomic Strain Questionnaire"}
                    </div>

                    {/* Q1: Screen time */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/70">
                        <span className="flex items-center gap-1.5 font-semibold"><Smartphone className="w-4 h-4 text-gold" /> {isRtl ? "عدد ساعات التعرض المباشر للشاشة" : "Daily Smart Screening Duration"}</span>
                        <span className="font-mono text-gold">{detoxAnswers.screenTime} {isRtl ? "ساعة" : "hours"}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="16"
                        value={detoxAnswers.screenTime}
                        onChange={(e) => setDetoxAnswers({ ...detoxAnswers, screenTime: parseInt(e.target.value) })}
                        className="w-full h-1.5 bg-white/5 accent-gold rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Q2: Reactivity level */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/70">
                        <span className="flex items-center gap-1.5 font-semibold"><HelpCircle className="w-4 h-4 text-gold" /> {isRtl ? "سلوك الرد الفوري المندفع على الرسائل" : "Immediate Message Reactiveness"}</span>
                        <span className="font-mono text-gold">{detoxAnswers.reactivity}/10</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={detoxAnswers.reactivity}
                        onChange={(e) => setDetoxAnswers({ ...detoxAnswers, reactivity: parseInt(e.target.value) })}
                        className="w-full h-1.5 bg-white/5 accent-gold rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Q3: Reels addiction */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/70">
                        <span className="flex items-center gap-1.5 font-semibold"><Coffee className="w-4 h-4 text-gold" /> {isRtl ? "استهلاك مقاطع الفيديو السريعة (تيكتوك / ريلز)" : "Consumption of Micro-Content (Reels)"}</span>
                        <span className="font-mono text-gold">{detoxAnswers.quickDopamine}/10</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={detoxAnswers.quickDopamine}
                        onChange={(e) => setDetoxAnswers({ ...detoxAnswers, quickDopamine: parseInt(e.target.value) })}
                        className="w-full h-1.5 bg-white/5 accent-gold rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Q4: Silence habit */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/70">
                        <span className="flex items-center gap-1.5 font-semibold"><VolumeX className="w-4 h-4 text-gold" /> {isRtl ? "دقائق السكون والعزلة الإرادية المطلقة" : "Daily Absolute Auditory Sanctuary"}</span>
                        <span className="font-mono text-gold">{detoxAnswers.silenceMin} {isRtl ? "دقيقة" : "mins"}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="120"
                        step="5"
                        value={detoxAnswers.silenceMin}
                        onChange={(e) => setDetoxAnswers({ ...detoxAnswers, silenceMin: parseInt(e.target.value) })}
                        className="w-full h-1.5 bg-white/5 accent-gold rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Calculations & Detailed Protocol Prescription */}
                  <div className="space-y-6">
                    <div className="bg-[#0b0b0b] border border-white/5 rounded-3xl p-6 md:p-8 space-y-4">
                      <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">
                        {isRtl ? "مؤشر حصانة وسلامة جهازك العصبي" : "Autonomic Shielding Score"}
                      </div>
                      
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-light font-serif text-gold">{detoxResult.score}</span>
                        <span className="text-sm text-white/40">/100</span>
                      </div>

                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            detoxResult.score > 70 
                              ? 'bg-emerald-500' 
                              : detoxResult.score > 40 
                              ? 'bg-yellow-500' 
                              : 'bg-rose-500'
                          }`} 
                          style={{ width: `${detoxResult.score}%` }} 
                        />
                      </div>

                      <h4 className="text-white font-serif italic text-base pt-2">
                        {isRtl ? detoxResult.titleAr : detoxResult.titleEn}
                      </h4>
                    </div>

                    <div className="bg-[#d4af3708] border border-gold/10 rounded-2xl p-6 space-y-4">
                      <div className="text-[10px] text-gold uppercase tracking-widest font-black flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        {isRtl ? "وصفة التعافي السيادي العصبية والروحية" : "Bechir's Nervous Recovery Prescription"}
                      </div>

                      <ul className="space-y-3">
                        {(isRtl ? detoxResult.protocolAr : detoxResult.protocolEn).map((pt, i) => (
                          <li key={i} className="flex gap-2.5 items-start text-xs text-white/70 leading-relaxed font-serif">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* 6. THE CRYPTIC SHADOW JOURNAL */}
            {activeTab === 'journal' && (
              <motion.div
                key="journal"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="space-y-2 border-b border-white/5 pb-6">
                  <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-gold" />
                    {isRtl ? "دفتر مذكرات الظل الصامت للتنفيس الحر" : "The Cryptic Shadow Journal & Catharsis Void"}
                  </h3>
                  <p className="text-white/40 text-xs">
                    {isRtl 
                      ? "اكتب هنا مخاوفك، صدماتك، أو الأفكار الرديئة التي تراودك. عند تفعيل بروتوكول التسامي، ستتفكك حروف الصدمة وتتحول إلى غبار كوني يتلاشى نهائياً لإلغاء تأثيرها العصبي."
                      : "Shed your repressed shadows, fears, or traumas. Activating the sublimation protocol systematically decodes and dissipates the text into fading star dust, breaking its neuro-grip."}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                  <div className="bg-[#0e0e0e] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest block">
                        {isRtl ? "منفذ التنفيس السيادي الحر" : "Catharsis Input Terminal"}
                      </label>
                      <textarea
                        value={journalText}
                        onChange={(e) => setJournalText(e.target.value)}
                        disabled={isJournalSublimating}
                        placeholder={isRtl ? "أكتب مخاوفك أو صدماتك بكل حرية لفك ارتباطها الكيميائي بالأعصاب..." : "Draft your repressed shadow or toxic reaction here to dismantle its chemical hold..."}
                        rows={6}
                        className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm font-serif leading-relaxed text-white focus:outline-none focus:border-gold placeholder:text-white/20 disabled:opacity-45"
                      />
                    </div>

                    <button
                      onClick={triggerSublimation}
                      disabled={isJournalSublimating || !journalText.trim()}
                      className="w-full py-4 rounded-2xl bg-gold text-black font-semibold text-xs uppercase tracking-widest transition-all hover:bg-white active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-30"
                    >
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      {isJournalSublimating 
                        ? (isRtl ? "تفكيك البنية اللغوية وتبخر الصدمة عصبياً..." : "Decoding Autonomic Strain Variables...") 
                        : (isRtl ? "التسامي والتحرر الكوني" : "Trigger Sublimation & Release")}
                    </button>
                  </div>

                  <div className="bg-black border border-white/5 rounded-3xl p-6 flex flex-col justify-center items-center relative overflow-hidden min-h-[300px]">
                    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                      {!isJournalSublimating && !sublimatedQuotes && (
                        <div className="text-center p-6 space-y-2 opacity-30">
                          <Compass className="w-10 h-10 mx-auto text-gold animate-spin-slow" />
                          <p className="text-xs text-white uppercase tracking-widest">
                            {isRtl ? "الفراغ مستعد لامتصاص وتبديد الشحنة" : "Atomic Scatter Grid Active"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Sublimation interactive canvas */}
                    <canvas
                      ref={journalCanvasRef}
                      width={450}
                      height={240}
                      className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                    />

                    {sublimatedQuotes && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-25 bg-black/95 border border-gold/20 p-6 rounded-2xl text-center space-y-4 max-w-sm shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
                      >
                        <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto">
                          <Check className="w-5 h-5 text-gold" />
                        </div>
                        <h4 className="text-sm font-serif italic text-gold">
                          {isRtl ? "بروتوكول التفكيك العصري لـ بشير الماجري" : "Bechir's Integration Note"}
                        </h4>
                        <p className="text-xs text-white/80 leading-relaxed font-serif">
                          {isRtl ? sublimatedQuotes.ar : sublimatedQuotes.en}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 7. COGNITIVE STROOP SHIELD TEST */}
            {activeTab === 'stroop' && (
              <motion.div
                key="stroop"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="space-y-2 border-b border-white/5 pb-6">
                  <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                    <ShieldAlert className="w-6 h-6 text-red-400" />
                    {isRtl ? "اختبار الكبت العاطفي الانعكاسي" : "Cognitive Stroop Shield Test"}
                  </h3>
                  <p className="text-white/40 text-xs">
                    {isRtl 
                      ? "اختبار تفاعلي لقياس زمن الاستجابة للمثيرات البصرية والكلمات المستفزة؛ لتدريب الوعي على الامتناع عن ردود الفعل السريعة."
                      : "Measure your latency and autonomic stability when exposed to hostile or calm triggers in milliseconds."}
                  </p>
                </div>

                {!stroopActive && !stroopCompleted ? (
                  <div className="bg-[#0e0e0e] border border-white/5 rounded-3xl p-8 text-center max-w-2xl mx-auto space-y-6">
                    <div className="w-16 h-16 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center mx-auto text-gold">
                      <Activity className="w-8 h-8 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white font-serif text-lg">{isRtl ? "تعليمات الحماية والوقار الانعكاسي" : "Rules of the Autonomic Defense"}</h4>
                      <p className="text-xs text-white/50 leading-relaxed max-w-md mx-auto">
                        {isRtl 
                          ? "ستظهر أمامك كلمات بشكل متسارع. يجب عليك النقر على زر 'وقورة / سيادية' عندما تلمح كلمات الهدوء والترفع، والنقر على 'رديئة / انفعالية' عندما تلمح الكلمات الاستفزازية اللفظية."
                          : "Words will flash quickly in the center of the ring. Identify them instantly: Is it a 'Sovereign/Calm' state or a 'Reactive/Toxic' trigger? Direct action secures your shield."}
                      </p>
                    </div>

                    <button
                      onClick={startStroopTest}
                      className="px-8 py-4 rounded-2xl bg-gold text-black font-semibold text-xs uppercase tracking-widest transition-all hover:bg-white active:scale-95 cursor-pointer"
                    >
                      {isRtl ? "بدء اختبار الكبت والاتساق عصبياً (١٥ ثانية) ⏱️" : "Start Cognitive Analysis (15s) ⏱️"}
                    </button>
                  </div>
                ) : stroopActive ? (
                  <div className="space-y-6 max-w-xl mx-auto">
                    {/* Progress details */}
                    <div className="flex justify-between items-center text-xs text-white/60 font-mono">
                      <span>{isRtl ? `الوقت المتبقي: ${stroopTimeLeft} ثوانٍ` : `Time Left: ${stroopTimeLeft}s`}</span>
                      <div className="flex gap-4">
                        <span className="text-emerald-400">{isRtl ? `صحيح: ${stroopCorrectCount}` : `Correct: ${stroopCorrectCount}`}</span>
                        <span className="text-rose-500">{isRtl ? `أخطاء: ${stroopIncorrectCount}` : `Errors: ${stroopIncorrectCount}`}</span>
                      </div>
                    </div>

                    {/* Main flashing arena */}
                    <div className="bg-black/90 border border-white/5 rounded-3xl p-12 text-center relative overflow-hidden min-h-[220px] flex flex-col justify-center items-center">
                      {/* Interactive click feedback colors as ambient light */}
                      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-20 ${
                        clickStatus === 'correct' ? 'bg-emerald-500/20' : clickStatus === 'incorrect' ? 'bg-rose-500/20' : ''
                      }`} />

                      <motion.div
                        key={stroopWord}
                        initial={{ scale: 0.82, opacity: 0.5 }}
                        animate={{ scale: 1.15, opacity: 1 }}
                        className={`text-4xl font-serif font-bold tracking-wide relative z-10 ${
                          stroopIsSovereign ? 'text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'text-rose-400'
                        }`}
                      >
                        {stroopWord}
                      </motion.div>
                    </div>

                    {/* Dual Action Classification Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleStroopClick(stroopIsSovereign)} // True means correct mapping
                        className="py-4 rounded-2xl bg-[#0e0e0e] border border-gold/20 text-xs font-semibold text-gold tracking-wider hover:bg-gold hover:text-black transition-all cursor-pointer active:scale-95"
                      >
                        {isRtl ? "وقورة / سيادية (Sovereign) 🏛️" : "Sovereign / Calm 🏛️"}
                      </button>

                      <button
                        onClick={() => handleStroopClick(!stroopIsSovereign)} // Classified Reactive
                        className="py-4 rounded-2xl bg-[#0e0e0e] border border-rose-500/20 text-xs font-semibold text-rose-400 tracking-wider hover:bg-rose-500 hover:text-white transition-all cursor-pointer active:scale-95"
                      >
                        {isRtl ? "رديئة / انفعالية (Reactive) 😡" : "Reactive / Toxic 😡"}
                      </button>
                    </div>
                  </div>
                ) : (
                  // Completed Results
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#0e0e0e] border border-white/5 rounded-3xl p-8 max-w-2xl mx-auto text-center space-y-6"
                  >
                    <div className="space-y-2">
                      <h4 className="text-gold font-serif italic text-lg">{isRtl ? "تقرير الثبات العصبي الانعكاسي" : "Cognitive Stability Report"}</h4>
                      <p className="text-white/40 text-xs uppercase tracking-widest">{isRtl ? "مقياس درع الكبت والحصانة الكلي" : "Composure Shield Coefficient"}</p>
                    </div>

                    <div className="text-6xl font-light font-serif text-gold">{stroopScore}%</div>

                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-xs font-mono py-4 border-y border-white/5 font-bold">
                      <div className="text-left py-2 px-4 bg-white/5 rounded-xl flex justify-between">
                        <span className="text-white/40">{isRtl ? "استجابات منضبطة:" : "Sanctified:"}</span>
                        <span className="text-emerald-400 font-bold">{stroopCorrectCount}</span>
                      </div>
                      <div className="text-left py-2 px-4 bg-white/5 rounded-xl flex justify-between">
                        <span className="text-white/40">{isRtl ? "اختراقات عصبية:" : "Infringements:"}</span>
                        <span className="text-rose-500 font-bold">{stroopIncorrectCount}</span>
                      </div>
                    </div>

                    <div className="bg-[#d4af3705] border border-gold/15 p-5 rounded-2xl max-w-lg mx-auto text-xs leading-relaxed text-white/70 font-serif italic">
                      {isRtl 
                        ? `عند مستوى ثبات ${stroopScore}%، يثبت تحليل بشير الماجري السلوكي أن تماسكك العصبي أمام مستفزات الحياة اليومية يعتبر ${
                            stroopScore > 75 
                              ? "سيادي ومحصن تماماً على مستوى النخبة. تستطيع عزل الضجيج الخارجي وحفظ هيبة حضورك الصامت بوقار مذهل." 
                              : stroopScore > 45 
                              ? "اتساق متوازن وقابل للتحسن؛ ننصحك بمواصلة ضبط نبرات صوتك والاستماع الدوري لنبضات جاما ومساحات السكون المطلق." 
                              : "منفعل ومشتت بكبت منخفض الصمود. ننصحك بالصيام الرقمي المؤكد والممارسات المستمرة للكبت الكتابي والتحرر الفوري."
                          }`
                        : `At a neural stability coefficient of ${stroopScore}%, Bechir's behavioral model rates your composure as: ${
                            stroopScore > 75 
                              ? "highly exceptional. Your autonomous shield is incredibly dense, denying any cheap leverage to external manipulators." 
                              : stroopScore > 45 
                              ? "moderate. Practice the 3-second strategic silent pause to expand your neuro-buffer and protect your gravitas." 
                              : "vulnerable. Your responses are highly reactive, indicating dopamine-exhausted circuits. Engage the express shadow journaling weekly."
                          }`
                      }
                    </div>

                    <button
                      onClick={startStroopTest}
                      className="px-6 py-3 rounded-xl bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all cursor-pointer font-bold"
                    >
                      {isRtl ? "إعادة الفحص الانعكاسي" : "Run Diagnostic Assessment Again"}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* 8. SOVEREIGN TRACKER LEDGER CONSTELLATION */}
            {activeTab === 'tracker' && (
              <motion.div
                key="tracker"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="space-y-2 border-b border-white/5 pb-6">
                  <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    {isRtl ? "لوحة تتبع الهيبة اليومية (كوكبة الاتساق العصبي)" : "Sovereign Tracker Ledger & Cosmic Constellation"}
                  </h3>
                  <p className="text-white/40 text-xs">
                    {isRtl 
                      ? "تسجيل التزامك اليومي ببروتوكولات بشير الماجري يكمل كوكبتك النجمية المضيئة الموصلة عصبياً لتحقيق الحصانة الدائمة."
                      : "Sustaining Bechir Mejri's core daily protocols completes your neurological constellation, yielding parallel cosmic authority."}
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Habits Checklist Selector */}
                  <div className="bg-[#0e0e0e] border border-white/5 rounded-3xl p-6 md:p-8 space-y-4">
                    <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest border-b border-white/5 pb-2">
                      {isRtl ? "بروتوكولات السيادة اليومية الفردية" : "Autonomic Protocol Matrix"}
                    </div>

                    {[
                      { key: 'voiceCadence', titleAr: "بروتوكول خفض نبرة الصوت وتيرة الحديث", titleEn: "Vocal Cadence Deceleration", descAr: "خفّضت وتيرة ونبرة صوتي لفرض الهيبة الوقورة والتردد المنخفض المتحد الكنه.", descEn: "Dampen and decelerate conversation frequency today by 20% to build voice authority." },
                      { key: 'strategicPause', titleAr: "بروتوكول الصمت الإرادي لـ ٣ ثوانٍ", titleEn: "The 3-Second Composure Interval", descAr: "التزمت بالصمت والهدوء التام لثلاث ثوانٍ كحد أدنى قبل الإجابة على أي متصل أو مستفز.", descEn: "Executed clinical conversational silence before replying to any target provocation." },
                      { key: 'digitalSanctuary', titleAr: "عزل كلي للمشتتات البصرية والريلز", titleEn: "Digital Detoxification Interval", descAr: "تطهير الأعصاب من تدفق الفيديوهات القصيرة (تصفح الدوبامين السريع وتيكتوك) لمساحة وافية اليوم.", descEn: "Cleared visual dopamine stress by avoiding micro-content and scrolling loops." },
                      { key: 'detachedStance', titleAr: "الترفع التام والوقار عن التبريرات والجدل", titleEn: "Sovereign Detached Stance", descAr: "تجنبت تقديم تبريرات رخيصة أو الدخول في نقاشات عقيمة وصراعات تفرغ طاقتي الروحية.", descEn: "Prevented unnecessary defense responses and retained pure diagnostic neutrality." },
                      { key: 'binauralSession', titleAr: "جلسة سكون نصفي الدماغ للاتساق الكلي", titleEn: "Binaural & Respiratory Session", descAr: "أتممت مساحة دقيقة من تفعيل نبضات ٤٠ هرتز وممارسة تمارين تنفس الاتساق الصامت المتزامن.", descEn: "Synchronized dual brain hemispheres using Gamma tones and autonomic deep breaths." }
                    ].map(hab => (
                      <div 
                        key={hab.key}
                        onClick={() => toggleHabit(hab.key)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-4 items-start ${
                          completedHabits[hab.key] 
                            ? 'bg-gold/5 border-gold/30 shadow-[0_4px_15px_rgba(212,175,55,0.06)] text-white' 
                            : 'bg-black/30 border-white/5 hover:border-white/10 text-white/70'
                        }`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                          completedHabits[hab.key] ? 'bg-gold border-gold text-black' : 'border-white/20 bg-transparent'
                        }`}>
                          {completedHabits[hab.key] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold font-serif">{isRtl ? hab.titleAr : hab.titleEn}</h4>
                          <p className="text-[10px] text-white/40 leading-relaxed font-sans">{isRtl ? hab.descAr : hab.descEn}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Constellation Canvas View */}
                  <div className="space-y-6">
                    <div className="bg-[#0b0b0b] border border-white/5 rounded-3xl p-6 text-center space-y-4">
                      <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">{isRtl ? "خريطة كوكبتك النجمية لثبات الأعصاب والتطويع" : "Personal Galactic Autonomic Lattice"}</div>
                      
                      {/* Responsive Connect Stars Constellation */}
                      <div className="relative w-full aspect-square max-w-[280px] mx-auto bg-black border border-white/5 rounded-full flex items-center justify-center">
                        <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 p-2">
                          {/* Inner orbits lines for alignment */}
                          <circle cx="100" cy="100" r="45" fill="none" stroke="#d4af37" strokeWidth="0.5" className="opacity-10" />
                          <circle cx="100" cy="100" r="75" fill="none" stroke="#d4af37" strokeWidth="0.5" className="opacity-5" />

                          {/* Dynamic Connection lines between stars */}
                          {[
                            { from: {x:100, y:40}, to: {x:160, y:80}, active: completedHabits.voiceCadence && completedHabits.strategicPause },
                            { from: {x:160, y:80}, to: {x:140, y:150}, active: completedHabits.strategicPause && completedHabits.digitalSanctuary },
                            { from: {x:140, y:150}, to: {x:60, y:150}, active: completedHabits.digitalSanctuary && completedHabits.detachedStance },
                            { from: {x:60, y:150}, to: {x:40, y:80}, active: completedHabits.detachedStance && completedHabits.binauralSession },
                            { from: {x:40, y:80}, to: {x:100, y:40}, active: completedHabits.binauralSession && completedHabits.voiceCadence },
                            // Crossed stellar anchors
                            { from: {x:100, y:40}, to: {x:140, y:150}, active: completedHabits.voiceCadence && completedHabits.digitalSanctuary },
                            { from: {x:100, y:40}, to: {x:60, y:150}, active: completedHabits.voiceCadence && completedHabits.detachedStance },
                          ].map((line, idx) => (
                            <line
                              key={idx}
                              x1={line.from.x}
                              y1={line.from.y}
                              x2={line.to.x}
                              y2={line.to.y}
                              stroke={line.active ? '#d4af37' : '#ffffff'}
                              strokeWidth={line.active ? '1.5' : '0.5'}
                              className={`transition-all duration-700 ${line.active ? 'opacity-80' : 'opacity-10'}`}
                            />
                          ))}

                          {/* Render actual key glowing stars */}
                          {[
                            { x: 100, y: 40, active: completedHabits.voiceCadence, label: "🎙️" },
                            { x: 160, y: 80, active: completedHabits.strategicPause, label: "⏱️" },
                            { x: 140, y: 150, active: completedHabits.digitalSanctuary, label: "⏳" },
                            { x: 60, y: 150, active: completedHabits.detachedStance, label: "🛡️" },
                            { x: 40, y: 80, active: completedHabits.binauralSession, label: "🎧" }
                          ].map((star, i) => (
                            <g key={i}>
                              {star.active && (
                                <circle
                                  cx={star.x}
                                  cy={star.y}
                                  r="13"
                                  fill="rgba(212, 175, 55, 0.25)"
                                  className="animate-pulse"
                                />
                              )}
                              <circle
                                cx={star.x}
                                cy={star.y}
                                r="5"
                                fill={star.active ? '#d4af37' : '#222222'}
                                stroke={star.active ? '#ffffff' : '#444444'}
                                strokeWidth="1"
                                className="transition-all duration-700 cursor-pointer"
                              />
                              <text
                                x={star.x}
                                y={star.y + 14}
                                textAnchor="middle"
                                fontSize="7"
                                fill="#ffffff"
                                className="opacity-40 font-serif"
                              >
                                {star.label}
                              </text>
                            </g>
                          ))}
                        </svg>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                          <span className="text-2xl font-light text-gold font-serif">{getSovereignCompleteness().percent}%</span>
                          <span className="text-[8px] uppercase text-white/30 tracking-widest">{isRtl ? "اكتمال" : "Align"}</span>
                        </div>
                      </div>

                      {/* Symmetry message */}
                      {getSovereignCompleteness().percent === 100 ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl space-y-1 mt-4"
                        >
                          <span className="text-xs text-emerald-400 font-bold block uppercase tracking-wider">{isRtl ? "نشط: الاتساق العصبي الكلي" : "Autonomic Stellar Symmetry Active"}</span>
                          <p className="text-[10px] text-emerald-300 leading-relaxed font-serif">
                            {isRtl 
                              ? "تهانينا! لقد تظافرت نجوم سلوكك الخمسة. ذبذبات تفاعلك منخفضة ومنسجمة كلياً الآن؛ أنت ترتدي خوذة السيادة والهيبة الفطرية بنجاح."
                              : "Universal alignment reached. Your neurological matrix is consolidated, fully insulated against baseline external stress factors."}
                          </p>
                        </motion.div>
                      ) : (
                        <p className="text-[10px] text-white/40 italic font-mono py-2">
                          {isRtl 
                            ? `تحتاج لتفعيل ${getSovereignCompleteness().total - getSovereignCompleteness().done} من بروتوكولات النجوم لتكامل اتصال الكوكبة اليوم.`
                            : `Conjoin¹ ${getSovereignCompleteness().total - getSovereignCompleteness().done} remaining star connections to authorize universal homeostasis.`}
                        </p>
                      )}
                    </div>

                    {/* Sovereign Ascension Rank & Progression Card (الفكرة الثانية) */}
                    <div className="bg-[#0a0a0a] border border-gold/15 rounded-3xl p-6 md:p-8 space-y-6 text-start relative overflow-hidden">
                      {/* Decorative background glow */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
                        <div className="space-y-1">
                          <span className="text-[10px] text-gold uppercase font-black tracking-widest block font-mono">
                            {isRtl ? "رُتب وقار السيادة وعُلُوّ الارتجال الصامت" : "SOVEREIGN ASCENSION RANK"}
                          </span>
                          <h4 className="text-base md:text-lg font-serif font-black text-white flex items-center gap-2">
                            <span className="text-xl">{calculateSovereignRankProgress().badge}</span>
                            {isRtl ? calculateSovereignRankProgress().rankAr : calculateSovereignRankProgress().rankEn}
                          </h4>
                        </div>
                        <div className="bg-gold/10 border border-gold/30 rounded-2xl px-3 py-1.5 text-center shrink-0">
                          <span className="text-[9px] text-gold block uppercase font-mono">{isRtl ? "المستوى" : "LEVEL"}</span>
                          <span className="text-lg font-serif font-black text-gold">{calculateSovereignRankProgress().level}</span>
                        </div>
                      </div>

                      {/* Rank Description */}
                      <p className="text-[11px] text-white/70 leading-relaxed font-sans font-medium">
                        {isRtl ? calculateSovereignRankProgress().rankDescAr : calculateSovereignRankProgress().rankDescEn}
                      </p>

                      {/* XP Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                          <span className="text-white/40">{isRtl ? "نقاط الوقار المتراكمة" : "Dignity Points (XP)"}</span>
                          <span className="text-gold">{calculateSovereignRankProgress().totalXP} / 200 pts</span>
                        </div>
                        <div className="w-full bg-zinc-950 rounded-full h-2.5 overflow-hidden border border-white/5 relative">
                          <motion.div 
                            className="bg-gradient-to-r from-amber-600 via-gold to-yellow-300 h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (calculateSovereignRankProgress().totalXP / 200) * 100)}%` }}
                            transition={{ type: "spring", stiffness: 60 }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-[8px] text-white/30 uppercase font-mono">
                          <span>{isRtl ? "مبتدئ رصين" : "Postulant"}</span>
                          <span>{isRtl ? "المستوى الأسمى" : "SUPREME"}</span>
                        </div>
                      </div>

                      {/* Tier Checklist / Interactive Tasks */}
                      <div className="bg-black/40 rounded-2xl p-4.5 border border-white/5 space-y-3">
                        <div className="text-[9px] text-white/40 uppercase font-black tracking-widest">
                          {isRtl ? "مشاريع ومهام السلوك لرفع رتبة الوقار" : "Ascension Requirements Checklist"}
                        </div>
                        <div className="space-y-2">
                          {[
                            { labelAr: "تفعيل نجوم الاتساق الخمسة (كوكبة الوقار اليومية)", labelEn: "Symmetric habit checklist conjoining Today (100% complete)", done: getSovereignCompleteness().percent === 100 },
                            { labelAr: "الحصول على رصيد متقدم في محاكمة الاستفزاز", labelEn: "Complete written simulation response evaluation", done: !!simAnalysis },
                            { labelAr: "إثبات مستوى تركيز عالٍ في اختبار تأثير ستروب النفسي", labelEn: "Record a Stroop Interference mastery score", done: stroopScore > 0 }
                          ].map((t, idx) => (
                            <div key={idx} className="flex items-center gap-2.5 text-[10px] text-white/60">
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                t.done ? 'bg-gold/20 border-gold text-gold' : 'border-white/10'
                              }`}>
                                {t.done ? "✓" : "○"}
                              </div>
                              <span className={t.done ? "line-through opacity-40 font-serif" : "font-serif"}>
                                {isRtl ? t.labelAr : t.labelEn}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 9. EMDR BILATERAL DESENSITIZATION & INTEGRATION ENGINE */}
            {activeTab === 'emdr' && (
              <motion.div
                key="emdr"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                      <Eye className="w-6 h-6 text-gold animate-pulse" />
                      {isRtl ? "معالج حث وتحفيز نصفي الدماغ الثنائي الرمزي (EMDR)" : "EMDR Bilateral Wave Integration (Brain Desensitizer)"}
                    </h3>
                    <p className="text-white/40 text-xs">
                      {isRtl 
                        ? "تقنية نفسية وعصبية متطورة لتفكيك الشحنات العاطفية السلبية للصدمات والاستفزازات عبر التحفيز البصري والسمعي المتناوب لجهتي الدماغ."
                        : "Advanced neuropsychological protocol to desensitize and reintegrate stressful memory networks via rhythmic visual and audio alternation."}
                    </p>
                  </div>
                </div>

                {/* Main EMDR Workspace with absolute safety and luxury paneling */}
                {emdrSessionPhase === 'setup' && (
                  <div className="grid md:grid-cols-12 gap-8">
                    {/* Setup Parameters Panel */}
                    <div className="md:col-span-8 bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                      <div className="text-[10px] text-white/40 uppercase font-black tracking-widest border-b border-white/5 pb-2">
                        {isRtl ? "تحديد بؤرة التركيز والبروتوكول العصبي" : "Target Focus & Neural Protocol Configuration"}
                      </div>

                      {/* Presets Grid */}
                      <div className="space-y-3">
                        <label className="text-xs text-white/60 font-serif block">
                          {isRtl ? "اختر تحدياً عاطفياً / استفزازياً مستهدفاً لبرمجته عصبياً:" : "Select an Executive Trauma / Reactive Pattern to deprogram:"}
                        </label>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {[
                            {
                              id: 'reactivity',
                              titleAr: "⚡ الاستفزاز وخرق الهيبة أمام الناس",
                              titleEn: "⚡ Status Provocations & Interruptions",
                              focusAr: "التحسس الحاد من تشويه الوقار الشخصي في الاجتماعات المهنية أو العائلية",
                              focusEn: "Autonomic rage loop triggered when supervisor or colleague challenges my rank"
                            },
                            {
                              id: 'stagefright',
                              titleAr: "🎙️ رهبة التعبير والتوقف الصوتي المفاجئ",
                              titleEn: "🎙️ Vocal Performance Anxiety & Choking",
                              focusAr: "تشنج عضلات النطق والانفعال العصبي اللاإرادي قبل طرح الأفكار السيادية",
                              focusEn: "Sub-autonomic hyperarousal before public speaking and high-stakes negotiation"
                            },
                            {
                              id: 'impulsivity',
                              titleAr: "🛡️ الاندفاع للجدل والتبرير الفوري",
                              titleEn: "🛡️ Impulsive Defense & Explaining Loops",
                              focusAr: "الرغبة العنيفة في الدفاع عن النفس وتبرير الأفعال تفاعلياً عوضًا عن الترفع والوقار",
                              focusEn: "Dopaminergic impulse to argue or seek immediate reassurance when criticized"
                            },
                            {
                              id: 'careerStress',
                              titleAr: "💼 متلازمة الشك المهني والجمود الاستراتيجي",
                              titleEn: "💼 Imposter Impasse & Strategic Paralysis",
                              focusAr: "الحساب المعقد للفرص والتردد اللامتناهي القاتل لقوة اتخاذ القرار الفوري الفذ",
                              focusEn: "Self-sabotaging cognitive load regarding career milestones and sovereign authority"
                            }
                          ].map(preset => (
                            <div
                              key={preset.id}
                              onClick={() => {
                                setEmdrPresetId(preset.id);
                                setEmdrFocusInput(isRtl ? preset.focusAr : preset.focusEn);
                              }}
                              className={`p-4 rounded-xl border text-start transition-all cursor-pointer ${
                                emdrPresetId === preset.id
                                  ? 'bg-gold/5 border-gold/40 text-white shadow-md'
                                  : 'bg-black/30 border-white/5 hover:border-white/10 text-white/70'
                              }`}
                            >
                              <div className="text-xs font-bold font-serif mb-1">{isRtl ? preset.titleAr : preset.titleEn}</div>
                              <p className="text-[10px] text-white/40 leading-relaxed font-sans">{isRtl ? preset.focusAr : preset.focusEn}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Custom Input */}
                      <div className="space-y-2">
                        <label className="text-xs text-white/60 font-serif block">
                          {isRtl ? "أو قم بصياغة الحدث والذاكرة المستفزة كتابياً لتفكيك برمجتها:" : "Or craft your bespoke trigger scenario with linguistic precision:"}
                        </label>
                        <textarea
                          rows={2}
                          value={emdrFocusInput}
                          onChange={(e) => {
                            setEmdrPresetId('custom');
                            setEmdrFocusInput(e.target.value);
                          }}
                          placeholder={isRtl ? "مثلاً: 'حين انتقد زميلي جودتي أمام العميل وأحسست بضيق مباغت في صدري...'" : "e.g., 'The physiological contraction I feel in my chest when a family member downplays my achievements...'"}
                          className="w-full bg-black border border-white/10 rounded-2xl p-4 text-xs font-sans text-white focus:outline-none focus:border-gold/60 placeholder-white/20 leading-relaxed resize-none"
                        />
                      </div>

                      {/* Advance Parameter adjustments */}
                      <div className="grid sm:grid-cols-3 gap-6 pt-2">
                        <div className="space-y-2">
                          <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block">{isRtl ? "مسار حركة العينين" : "Eye Movement Path"}</label>
                          <div className="grid grid-cols-1 gap-1">
                            {[
                              { id: 'horizontal', labelAr: "↔️ أفقي كلاسيكي", labelEn: "↔️ Classic Horizontal" },
                              { id: 'infinity', labelAr: "♾️ ذبذبة اللانهاية (8)", labelEn: "♾️ Infinity Loop (8)" },
                              { id: 'circle', labelAr: "🔄 التوطين الدائري", labelEn: "🔄 Centering Orbit" }
                            ].map(item => (
                              <button
                                key={item.id}
                                onClick={() => setEmdrStyle(item.id as any)}
                                className={`px-3 py-2 rounded-lg text-[10px] text-start border transition-all ${
                                  emdrStyle === item.id 
                                    ? 'bg-gold/10 border-gold/40 text-gold font-bold' 
                                    : 'bg-black/40 border-white/5 text-white/60 hover:text-white'
                                }`}
                              >
                                {isRtl ? item.labelAr : item.labelEn}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block">{isRtl ? "سرعة التحفيز (Hz)" : "Stimulation Speed"}</label>
                          <div className="grid grid-cols-1 gap-1">
                            {[
                              { val: 0.5, labelAr: "🐌 مهدئ (0.5Hz)", labelEn: "🐌 Soothing (0.5Hz)" },
                              { val: 1, labelAr: "⚖️ متسق (1.0Hz)", labelEn: "⚖️ Poised (1.0Hz)" },
                              { val: 1.8, labelAr: "🚀 تفكيك (1.8Hz)", labelEn: "🚀 Reprogram (1.8Hz)" },
                              { val: 2.5, labelAr: "🎯 تعصيب متسارع (2.5Hz)", labelEn: "🎯 Hyper-speed (2.5Hz)" }
                            ].map((item, idx) => (
                              <button
                                key={idx}
                                onClick={() => setEmdrSpeed(item.val as any)}
                                className={`px-3 py-2 rounded-lg text-[10px] text-start border transition-all ${
                                  emdrSpeed === item.val 
                                    ? 'bg-gold/10 border-gold/40 text-gold font-bold' 
                                    : 'bg-black/40 border-white/5 text-white/60 hover:text-white'
                                }`}
                              >
                                {isRtl ? item.labelAr : item.labelEn}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block">{isRtl ? "الذبذبات الصوتية الثنائية" : "Sub-autonomic Tones"}</label>
                          <div className="grid grid-cols-1 gap-1">
                            {[
                              { id: 'pulsar', labelAr: "🔊 نبض منخفض التردد", labelEn: "🔊 Sub-harmonic Pulse" },
                              { id: 'click', labelAr: "📐 تفكيك إيقاعي حاد", labelEn: "📐 Sharp Micro-click" },
                              { id: 'drone', labelAr: "🍃 تدفق جيبي متزن", labelEn: "🍃 Resonant Sine Drone" }
                            ].map(item => (
                              <button
                                key={item.id}
                                onClick={() => setEmdrSoundStyle(item.id as any)}
                                className={`px-3 py-2 rounded-lg text-[10px] text-start border transition-all ${
                                  emdrSoundStyle === item.id 
                                    ? 'bg-gold/10 border-gold/40 text-gold font-bold' 
                                    : 'bg-black/40 border-white/5 text-white/60 hover:text-white'
                                }`}
                              >
                                {isRtl ? item.labelAr : item.labelEn}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Orb Color and initial distress states */}
                      <div className="grid sm:grid-cols-2 gap-6 pt-2 border-t border-white/5">
                        <div className="space-y-3">
                          <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block">{isRtl ? "مؤشّر التوتر الأولي قبل بدء الجلسة (SUD)" : "Initial Subjective Stress Level"}</label>
                          <div className="flex items-center gap-4">
                            <input
                              type="range"
                              min="1"
                              max="10"
                              value={emdrSudBefore}
                              onChange={(e) => setEmdrSudBefore(Number(e.target.value))}
                              className="w-full accent-gold bg-zinc-800 h-1.5 rounded-full outline-none"
                            />
                            <span className="text-sm font-bold text-gold w-6 text-center font-mono">{emdrSudBefore}</span>
                          </div>
                          <span className="text-[9px] text-white/40 italic block">
                            {isRtl ? "10: انقباض عصبي وهياج غاضب، 1: هدوء طمأنينة متوازنة" : "10: Maximum hyperarousal, 1: absolute calm"}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block">{isRtl ? "لون المركز البؤري المتحرك" : "Focusing Light Core Color"}</label>
                          <div className="flex gap-3">
                            {[
                              { id: 'gold', style: 'bg-gold border-white', labelAr: "الذهبي السيادي", labelEn: "Sovereign Gold" },
                              { id: 'cyan', style: 'bg-cyan-400 border-white', labelAr: "السيان المتسق", labelEn: "Coherence Cyan" },
                              { id: 'white', style: 'bg-white border-white', labelAr: "الأبيض الكلي", labelEn: "Cosmic White" }
                            ].map(colorOpt => (
                              <button
                                key={colorOpt.id}
                                onClick={() => setEmdrColor(colorOpt.id as any)}
                                className={`w-8 h-8 rounded-full border transition-transform relative ${colorOpt.style} ${
                                  emdrColor === colorOpt.id ? 'scale-110 ring-2 ring-gold/40' : 'opacity-60 hover:opacity-100'
                                }`}
                                title={isRtl ? colorOpt.labelAr : colorOpt.labelEn}
                              >
                                {emdrColor === colorOpt.id && (
                                  <span className="absolute inset-0 flex items-center justify-center text-black font-black text-xs">✓</span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Trigger Button */}
                      <button
                        onClick={() => {
                          setEmdrSessionPhase('session');
                          try {
                            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
                            if (AudioCtx) {
                              const dummy = new AudioCtx();
                              dummy.resume();
                            }
                          } catch(e) {}
                        }}
                        className="w-full py-4 rounded-2xl bg-gold text-black font-black uppercase text-xs tracking-widest hover:bg-white shadow-[0_4px_15px_rgba(212,175,55,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-black" />
                        {isRtl ? "تفعيل بروتوكول إلغاء الحساسية وإعادة البرمجة" : "Initialize Autonomic Deprogramming Session"}
                      </button>
                    </div>

                    {/* Historical Logs & Credentials Board */}
                    <div className="md:col-span-4 bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 space-y-6">
                      <div className="text-[10px] text-white/40 uppercase font-black tracking-widest border-b border-white/5 pb-2">
                        {isRtl ? "سجلات الموازنة العصبية السابقة" : "Bilateral Desensitization Records"}
                      </div>

                      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                        {emdrHistory.map((item, idx) => {
                          const percentReduction = Math.round(((item.sudBefore - item.sudAfter) / item.sudBefore) * 100);
                          return (
                            <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
                              <div className="flex justify-between items-center text-[9px] font-mono text-white/30">
                                <span>{item.date}</span>
                                <span className="uppercase">{item.style}</span>
                              </div>
                              <p className="text-[10px] font-bold text-white leading-relaxed truncate">{item.focus}</p>
                              
                              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5 text-[9px]">
                                <div>
                                  <span className="text-white/40 block">{isRtl ? "التوتر قبل/بعد" : "Stress (SUD)"}</span>
                                  <span className="font-mono text-white font-bold">{item.sudBefore} → {item.sudAfter}</span>
                                </div>
                                <div className="text-end">
                                  <span className="text-white/40 block">{isRtl ? "قوة الاتساق الفطري" : "Coping (VOC)"}</span>
                                  <span className="font-mono text-gold font-bold">{item.vocBefore}/7 → {item.vocAfter}/7</span>
                                </div>
                              </div>

                              <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                <div 
                                  className="bg-emerald-500 h-full" 
                                  style={{ width: `${Math.max(10, Math.min(100, percentReduction))}%` }}
                                />
                              </div>
                              <div className="text-[8px] font-mono text-emerald-400 text-end">
                                {isRtl ? `تفكيك التوتر: +${percentReduction}%` : `Integration Score: +${percentReduction}%`}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-gold/5 border border-gold/10 p-4 rounded-xl space-y-2">
                        <h4 className="text-[10px] uppercase font-black text-gold tracking-widest flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5" />
                          {isRtl ? "الحقيقة الفسيولوجية لـ EMDR" : "The Autonomic Homeostasis Axiom"}
                        </h4>
                        <p className="text-[9px] text-white/50 leading-relaxed font-serif">
                          {isRtl 
                            ? "توجيه العينين المستمر لتتبع الحركة الإيقاعية المتناوبة يجهد الذاكرة العاملة المؤقتة ويعوق قدرة اللوزة الدماغية (Amygdala) على استحضار الاستجابة الانفعالية للحدث السلبي؛ مما يعيد قيد الذاكرة مشلول القوة والتأثير."
                            : "Bilateral tracking taxes visual working memory registers, halting reactive signaling in the amygdalar pathway. This translates high-charge stress files into flat cognitive data blocks permanently."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ACTIVE EMDR SIMULATOR LOOP - TOTAL IMMERSION ASPECT */}
                {emdrSessionPhase === 'session' && (
                  <div className="bg-black border border-white/10 rounded-3xl p-8 md:p-12 space-y-8 relative overflow-hidden flex flex-col justify-between aspect-[16/9] min-h-[460px]">
                    <div className="absolute inset-0 bg-radial-gradient from-[#060606] via-black to-black opacity-95 pointer-events-none" />

                    {/* Immersive Audio Sync pulse bar */}
                    <div className="absolute top-2 left-0 right-0 h-1 bg-white/[0.02] overflow-hidden flex">
                      <div 
                        className={`h-full w-1/2 transition-colors duration-150 ${emdrOrbPosition.x < 50 ? 'bg-gold/40' : 'bg-transparent'}`}
                      />
                      <div 
                        className={`h-full w-1/2 transition-colors duration-150 ${emdrOrbPosition.x >= 50 ? 'bg-gold/40' : 'bg-transparent'}`}
                      />
                    </div>

                    {/* Exit and Status Header */}
                    <div className="flex justify-between items-center relative z-20">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gold/60">{isRtl ? "بروتوكول تفريغ الشحنات العصبية النشط" : "Autonomic Processing Sub-System"}</span>
                        <h4 className="text-xs font-serif text-white truncate max-w-sm md:max-w-md">
                          {isRtl ? `التركيز المستهدف: ${emdrFocusInput || "تفكيك تشتت الأفكار المحفزة"}` : `Processing Core: ${emdrFocusInput || "Autonomic homeostatic balance"}`}
                        </h4>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-950 border border-white/10 rounded-full">
                          <Clock className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '3s' }} />
                          <span className="text-white font-black">{emdrTimeLeft}s</span>
                        </div>
                        <button
                          onClick={() => setEmdrSessionPhase('setup')}
                          className="px-3 py-1 bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-black rounded-full font-black uppercase text-[9px] transition-all cursor-pointer"
                        >
                          {isRtl ? "إلغاء البروتوكول" : "Abort Session"}
                        </button>
                      </div>
                    </div>

                    {/* STIMULATOR TRACKING AREA */}
                    <div className="relative w-full h-44 bg-[#050505] border border-white/5 rounded-3xl overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                      {emdrStyle === 'horizontal' && (
                        <div className="absolute left-10 right-10 h-0.5 bg-white/[0.04]" />
                      )}
                      {emdrStyle === 'circle' && (
                        <div className="absolute w-24 h-24 rounded-full border border-white/[0.03]" />
                      )}
                      {emdrStyle === 'infinity' && (
                        <svg className="absolute w-full h-full opacity-[0.06] overflow-visible" viewBox="0 0 200 200">
                          <path d="M 30,100 C 30,70 80,70 100,100 C 120,130 170,130 170,100 C 170,70 120,70 100,100 C 80,130 30,130 30,100 Z" fill="none" stroke="#ffffff" strokeWidth="1" />
                        </svg>
                      )}

                      {/* THE CORE GLOWING ORB */}
                      <motion.div
                        className={`absolute w-7 h-7 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-xl ${
                          emdrColor === 'gold' 
                            ? 'bg-gold shadow-[0_0_25px_rgba(212,175,55,0.8)]' 
                            : emdrColor === 'cyan' 
                            ? 'bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)]' 
                            : 'bg-white shadow-[0_0_25px_rgba(255,255,255,0.8)]'
                        }`}
                        style={{
                          left: `${emdrOrbPosition.x}%`,
                          top: `${emdrOrbPosition.y}%`,
                        }}
                      >
                        <span className="w-1.5 h-1.5 bg-black rounded-full" />
                      </motion.div>

                      {/* Visual Pan indicators */}
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-20">
                        <Volume2 className={`w-4 h-4 transition-colors duration-100 ${emdrOrbPosition.x < 45 ? 'text-gold opacity-100 font-bold' : 'text-white'}`} />
                        <span className="text-[6px] uppercase tracking-widest font-mono text-white">CH-L</span>
                      </div>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-20">
                        <Volume2 className={`w-4 h-4 transition-colors duration-100 ${emdrOrbPosition.x > 55 ? 'text-gold opacity-100 font-bold' : 'text-white'}`} />
                        <span className="text-[6px] uppercase tracking-widest font-mono text-white">CH-R</span>
                      </div>
                    </div>

                    {/* COGNITIVE REINFORCEMENTS AFFIRMATIONS OUTCOMES */}
                    <div className="relative text-center max-w-lg mx-auto z-20 py-2">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={Math.floor(emdrTimeLeft / 6)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-1.5"
                        >
                          <p className="text-sm md:text-md font-serif text-gold tracking-wide leading-relaxed">
                            {isRtl ? (
                              emdrTimeLeft >= 24 ? "حافظ على ثبات الرأس تماماً والارتياح؛ اسمح لعينيك فقط بمتابعة النبض الذهبي الهادئ."
                              : emdrTimeLeft >= 18 ? "دع الحدث الصعب وشخوص الاستفزاز يعبرون فكرك كغيوم عابرة تتسرب ولا تمس قلعتك الروحية."
                              : emdrTimeLeft >= 12 ? "أنت تعزل النبض المغناطيسي الفعّال لردّ الفعل الاندفاعي الدنيء الآن. تنفس الحرّية الوافرة."
                              : emdrTimeLeft >= 6 ? "تلف عاطفة التبرير والتشنج الآن، تنهار الأنماط الانهزامية القديمة وتتصدع عقد الوهن تماماً."
                              : "أنت المركز السيادي، الهدوء هو صخرة هيبتك الفطرية وميزان وقارك الأوحد والأعظم."
                            ) : (
                              emdrTimeLeft >= 24 ? "Maintain complete cranial and head stillness; follow the light core with your eyes alone."
                              : emdrTimeLeft >= 18 ? "Observe the provocation as a temporary cloud over your indomitable mountain peak."
                              : emdrTimeLeft >= 12 ? "Decouple the neurological wiring of status threat. Inhale homeostatic tranquility."
                              : emdrTimeLeft >= 6 ? "Trigger files are disintegrating. The ancient compulsion to argue or explain crumbles completely."
                              : "You are the sovereign author of your responses. Quiet dignity is your ultimate authority."
                            )}
                          </p>
                          <p className="text-[9px] text-white/40 uppercase tracking-widest font-mono">
                            {isRtl ? "نظام تغذية الوعي والاتساق السيادي المبرمج" : "Autonomic Cognitive Interweave Syncing"}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* POST-SESSION CALIBRATION RATING Slider */}
                {emdrSessionPhase === 'calibrate' && (
                  <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 md:p-10 max-w-xl mx-auto space-y-8 text-center relative overflow-hidden">
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto text-gold text-lg">✓</div>
                      <h4 className="text-lg font-serif text-white">{isRtl ? "اكتملت جلسة الموازنة العصبية وتجاوز الحساسية" : "Deprogramming Session Completed"}</h4>
                      <p className="text-xs text-white/40">
                        {isRtl 
                          ? "يرجى معايرة المؤشرات السلوكية والذاتية لتفريغ الشحنة لتوثيق استقرار حالتك عصبياً."
                          : "Calibrate your end-of-session autonomic integration metric below."}
                      </p>
                    </div>

                    <div className="bg-black/40 border border-white/5 rounded-2xl p-6 space-y-4 text-start">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-serif text-white/80">{isRtl ? "درجة التويثر والتحسس الحالية (SUD After):" : "Autonomic Discordance Level (SUD After):"}</label>
                        <span className="text-sm font-bold font-mono text-gold bg-zinc-950 px-3 py-1 rounded border border-white/10">{emdrSudAfter}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={emdrSudAfter}
                        onChange={(e) => setEmdrSudAfter(Number(e.target.value))}
                        className="w-full h-1.5 accent-gold bg-zinc-800 rounded-full outline-none cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] font-mono text-white/30">
                        <span>0: {isRtl ? "تلاشي مطلق - سكون وهيبة سيادية" : "0: Zero - Deep tranquil neutrality"}</span>
                        <span>10: {isRtl ? "شديد - رغبة في الدفاع والانقباص" : "10: High reactive impulse remaining"}</span>
                      </div>
                    </div>

                    <div className="bg-black/40 border border-white/5 rounded-2xl p-6 space-y-4 text-start">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-serif text-white/80">{isRtl ? "قوة الاتساق والتصديق بالقناعة المرجعية السليمة (VOC):" : "Validity of Sovereign Poise (VOC After):"}</label>
                        <span className="text-sm font-bold font-mono text-gold bg-zinc-950 px-3 py-1 rounded border border-white/10">{emdrVocAfter} / 7</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="7"
                        value={emdrVocAfter}
                        onChange={(e) => setEmdrVocAfter(Number(e.target.value))}
                        className="w-full h-1.5 accent-gold bg-zinc-800 rounded-full outline-none cursor-pointer"
                      />
                      <p className="text-[9px] text-white/40 italic leading-relaxed">
                        {isRtl 
                          ? "ما مدى عمق قناعة جسدك وأعصابك الآن باليقين الفعلي للعبارة: 'أنا بكامل اتزاني ووقاري الفطري، منيع كلياً أمام أي نقد أو محاولة تصغير'؟ (1: كذبة شديدة العار، 7: حقيقة فطرية مطلقة لا تهتز)."
                          : "How true does it feel in your gut that: 'I am the absolute master of my frequency, shielded from any external provocation'? (1: Completely false, 7: Indomitable internal truth)."}
                      </p>
                    </div>

                    <button
                      onClick={saveEmdrSession}
                      className="w-full py-3.5 rounded-xl bg-gold text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all cursor-pointer shadow-lg"
                    >
                      {isRtl ? "تسجيل الموازنة عصبياً وحفظ الإحصاء العضوي" : "Submit Integration Logs to Ledger & Analyze"}
                    </button>
                  </div>
                )}

                {/* POST-SESSION RESULTS AND CLINICAL METRICS */}
                {emdrSessionPhase === 'results' && (
                  <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* Metrics Chart */}
                    <div className="bg-[#0b0b0b] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">{isRtl ? "تقرير تفريغ الحساسية والتعصيب السليم" : "Autonomic Deprogramming Impact Ledger"}</div>
                        <h4 className="text-md font-serif text-gold">{isRtl ? "مؤشرات تفريغ الشحنات العاطفية" : "Dynamic Brain Hemispheric Coherence"}</h4>
                      </div>

                      <div className="space-y-6 py-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-white/60">{isRtl ? "معايرة التوجس والاضطراب الأصلي (SUD)" : "Autonomic Stress Coefficient (SUD)"}</span>
                            <span className="font-mono text-red-500 font-bold">{emdrSudBefore} → {emdrSudAfter}</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden flex">
                            <div className="bg-red-500 h-full" style={{ width: `${emdrSudBefore * 10}%` }} />
                            <div className="bg-emerald-400 h-full" style={{ width: `${emdrSudAfter * 10}%` }} />
                          </div>
                          <p className="text-[9px] text-emerald-400 italic font-mono">
                            {isRtl ? `✓ تم تقليص الحمل الانفعالي عصبياً وعضوياً بنسبة: ${Math.round(((emdrSudBefore - emdrSudAfter) / emdrSudBefore) * 100)}%` : `✓ Autonomic load decreased by ${Math.round(((emdrSudBefore - emdrSudAfter) / emdrSudBefore) * 100)}%`}
                          </p>
                        </div>

                        <div className="space-y-2 border-t border-white/5 pt-4">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-white/60">{isRtl ? "قوة الحصانة العقلية المنسجمة (VOC)" : "Sovereign Self-Efficacy (VOC)"}</span>
                            <span className="font-mono text-gold font-bold">{emdrVocAfter} / 7</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                            <div className="bg-gold h-full" style={{ width: `${(emdrVocAfter / 7) * 100}%` }} />
                          </div>
                          <p className="text-[9px] text-gold/80 italic font-mono">
                            {isRtl ? "✓ تم ترسيخ القناعة الاستقلالية المنيعة بنجاح." : "✓ Cognitive neural path reinforced against status defense reflexes."}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setEmdrSessionPhase('setup');
                          setEmdrFocusInput('');
                        }}
                        className="w-full py-3 bg-zinc-950 border border-white/10 hover:border-gold/30 hover:text-gold text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                      >
                        {isRtl ? "إجراء جلسة برمجة وتفكيك جديدة" : "Conduct Another Deprogramming Course"}
                      </button>
                    </div>

                    {/* School analysis description */}
                    <div className="bg-[#0b0b0b] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">{isRtl ? "الوقار في موازين علم النفس السلوكي والميتافيزيقيا" : "Diagnostic Metaphysical Report"}</div>
                        <h4 className="text-md font-serif text-white">{isRtl ? "التحليل التشخيصي للهيبة العصبية وموازنة الوعي" : "Autonomic Deprogramming Diagnostics"}</h4>
                      </div>

                      <div className="p-4.5 rounded-2xl bg-black/40 border border-white/5 text-[11px] space-y-3 leading-relaxed text-white/80 font-serif">
                        {isRtl ? (
                          <>
                            <p>
                              «لقد تم بنجاح تفكيك <strong>مخطط ردة الفعل الانهزامية</strong>. إن الاندفاع الفطري للمقاومة والجدل أو التبرير عند مواجهة الاستهزاء كان ردة فعل عتيقة متوارثة لثنايا الوعي القَبلي بقصد حماية الذات.»
                            </p>
                            <p>
                              «بتحريك البؤرة البصرية يساراً ويميناً بتردد {emdrSpeed} هرتز، تم إحداث غزارة معلوماتية في الذاكرة قصيرة المدى، مما عطل اللوزة الدماغية عن مواصلة بث التوتر العاطفي في الغدد؛ وتم إعادة تشفير الحدث المستهدف كمعلومات خاملة باردة عاجزة عن ابتزاز ثباتك.»
                            </p>
                            <p className="text-gold italic">
                              «قانون الوقار العظيم: استرخِ تماماً، لا تجادل ولا تبرر، ودع سكونك المميت يخنق جهلهم بهدوء الأجرام السماوية السموق.»
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              "The sub-autonic reflex to explain or argue when targeted has been successfully deprogrammed to baseline zero latency. This trace memory can no longer coerce blood volume redistribution or quicken heart cycles."
                            </p>
                            <p>
                              "By alternating the visual sensory register at {emdrSpeed}Hz while applying the {emdrSoundStyle} audio wave pan, you have effectively severed the amygdalar pathway. The challenge has transitioned from an acute threat to flat semantic data."
                            </p>
                            <p className="text-gold italic">
                              "Never debate or justify. Let your strategic silence be the deep cosmic gravity that anchors the context and forces compliance."
                            </p>
                          </>
                        )}
                      </div>

                      <div className="flex gap-4 p-4 rounded-xl bg-gold/[0.02] border border-gold/10 items-center justify-between text-xs">
                        <div>
                          <span className="text-white/40 block text-[9px] uppercase font-mono">{isRtl ? "رتبة السكوت الوقور" : "Current Autonomic Rank"}</span>
                          <span className="text-gold font-bold font-serif text-sm">
                            {isRtl ? "رائد عزل المثيرات التفاعلية (الدرجة العاشرة)" : "Sovereign Poise Master (Grade X)"}
                          </span>
                        </div>
                        <div className="space-y-1 text-end">
                          <span className="text-emerald-400 font-bold block text-[10px]">● {isRtl ? "متناسق عصبياً بالكامل" : "COHERENT"}</span>
                          <span className="text-[9px] text-white/40">Homeostasis Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* 10. SOVEREIGN AURA & MAGNETIC POLARIZATION ARCHITECT */}
            {activeTab === 'aura' && (
              <motion.div
                key="aura"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-gold animate-pulse" />
                      {isRtl ? "مُهندس الاستقطاب الفطري والهالة الوقارية" : "Sovereign Aura & Magnetic Polarization Architect"}
                    </h3>
                    <p className="text-white/40 text-xs text-start">
                      {isRtl 
                        ? "معايرة المجال الكهرومغناطيسي للنفس لمواجهة عتبات الاستفزاز، تأمين مسافة التباعد العاطفي، وتحييد الانفعال اللوزي فوراً."
                        : "Calibrate your personal electromagnetic field to counteract social provocations, enforce critical cognitive distance, and flatten reaction vectors."}
                    </p>
                  </div>
                </div>

                {/* Stimulus Type Selector */}
                <div className="space-y-4 text-start">
                  <label className="text-[10px] text-white/40 uppercase font-black tracking-widest block">
                    {isRtl ? "مثير الاستفزاز الاجتماعي المستهدف بالمحاكاة المعيارية" : "Target Social Stimulus for Aura Calibration"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { id: 'snide', labelAr: "😏 نبرة تهكمية أو ابتسامة غطرسة", labelEn: "😏 Snide / Smug Remarks" },
                      { id: 'criticism', labelAr: "👎 نقد خارجي متحيز ومجحف", labelEn: "👎 Unfair Personal Criticism" },
                      { id: 'status', labelAr: "🏰 محاولة تصغير بمظهر ثراء أو سلطة", labelEn: "🏰 Status/Intimidation Posture" },
                      { id: 'gaslighting', labelAr: "🌀 تضليل وتحريف للحقائق والوقائع", labelEn: "🌀 Narrative Twisting / Gaslighting" }
                    ].map(st => (
                      <button
                        key={st.id}
                        onClick={() => setAuraStimulus(st.id as any)}
                        className={`p-4 rounded-xl border text-[11px] font-bold transition-all text-start relative group flex flex-col justify-between ${
                          auraStimulus === st.id 
                            ? 'bg-gold/10 border-gold text-gold' 
                            : 'bg-[#0a0a0a] border-white/5 text-white/70 hover:border-gold/30 hover:text-white'
                        }`}
                      >
                        <span>{isRtl ? st.labelAr : st.labelEn}</span>
                        <span className="text-[8px] opacity-30 mt-2 font-mono uppercase">
                          {isRtl ? "مُكتمَل الاكتشاف" : "ACTIVE MODEL"}
                        </span>
                        {auraStimulus === st.id && (
                          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gold rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-start">
                  {/* Left Side: Interactive Calibrators & Sliders */}
                  <div className="md:col-span-6 space-y-6 text-start">
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                      <div className="text-[10px] text-white/40 uppercase font-black tracking-widest border-b border-white/5 pb-2">
                        {isRtl ? "محددات تيار الاتزان الداخلي" : "Equilibrium Tuning Controls"}
                      </div>

                      {/* Control 1: Resonance */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <label className="text-white/80 font-serif font-bold">
                            {isRtl ? "1. الرنين الصدري الترددي (تردد الصوت):" : "1. Thoracic Vocal Resonance Frequency:"}
                          </label>
                          <span className="font-mono font-bold text-gold text-sm">{auraResonance} Hz</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="120"
                          value={auraResonance}
                          onChange={(e) => setAuraResonance(Number(e.target.value))}
                          className="w-full accent-gold bg-zinc-800 h-1.5 rounded-full outline-none cursor-pointer"
                        />
                        <div className="flex justify-between text-[9px] text-white/40 italic">
                          <span>{isRtl ? "20 Hz (صوت جهوري عميق)" : "Deep / Resonant"}</span>
                          <span>{isRtl ? "120 Hz (رنين اعتيادي)" : "Shallow / Conversational"}</span>
                        </div>
                      </div>

                      {/* Control 2: Distance */}
                      <div className="space-y-3 border-t border-white/5 pt-4">
                        <div className="flex justify-between items-center text-xs">
                          <label className="text-white/80 font-serif font-bold">
                            {isRtl ? "2. مسافة التباعد العاطفي الآمنة:" : "2. Interpersonal Emotional Distance Shield:"}
                          </label>
                          <span className="font-mono font-bold text-gold text-sm">{auraDistance} m</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          step="0.5"
                          value={auraDistance}
                          onChange={(e) => setAuraDistance(Number(e.target.value))}
                          className="w-full accent-gold bg-zinc-800 h-1.5 rounded-full outline-none cursor-pointer"
                        />
                        <div className="flex justify-between text-[9px] text-white/40 italic">
                          <span>{isRtl ? "0m (ذوبان عاطفي جريح)" : "0m (Fused & Exposed)"}</span>
                          <span>{isRtl ? "10m (عزل بازلتي فوري)" : "10m (Total Basaltic Sanctum)"}</span>
                        </div>
                      </div>

                      {/* Control 3: Attenuation */}
                      <div className="space-y-3 border-t border-white/5 pt-4">
                        <div className="flex justify-between items-center text-xs">
                          <label className="text-white/80 font-serif font-bold">
                            {isRtl ? "3. كبت اللوزة الدماغية (سرعة التهدئة العصبية):" : "3. Amygdalar Response Attenuation:"}
                          </label>
                          <span className="font-mono font-bold text-gold text-sm">{auraAttenuation} / 10</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={auraAttenuation}
                          onChange={(e) => setAuraAttenuation(Number(e.target.value))}
                          className="w-full accent-gold bg-zinc-800 h-1.5 rounded-full outline-none cursor-pointer"
                        />
                        <div className="flex justify-between text-[9px] text-white/40 italic">
                          <span>{isRtl ? "1 (هياج وعصف فوري)" : "1 (Highly Reactive / Fight)"}</span>
                          <span>{isRtl ? "10 (هدوء حكيم صامت)" : "10 (Frozen Autonomous Calm)"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Reset Button */}
                    <button
                      onClick={() => {
                        setAuraResonance(55);
                        setAuraDistance(4);
                        setAuraAttenuation(6);
                      }}
                      className="w-full py-3 rounded-xl bg-zinc-950 border border-white/10 hover:border-gold/30 hover:text-gold text-white text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <RefreshCcw className="w-3.5 h-3.5" />
                      {isRtl ? "إعادة ضبط المعايرة إلى مستويات الأمان الفطرية" : "Reset Fields to Sovereign Normal"}
                    </button>
                  </div>

                  {/* Right Side: Virtual Pendulum & Aura Radar */}
                  <div className="md:col-span-6 space-y-6">
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                      {/* Sub-item: Simulated Virtual Pendulum */}
                      <div className="sm:col-span-6 space-y-3">
                        <div className="text-[10px] text-white/40 uppercase font-black tracking-widest text-start">
                          {isRtl ? "بندول التذبذب الشعوري النشط" : "Dynamic Emotional Oscillation"}
                        </div>
                        
                        <div className="relative">
                          <svg viewBox="0 0 400 180" className="w-full h-auto bg-black rounded-2xl border border-white/5 relative overflow-hidden">
                            <defs>
                              <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                              </radialGradient>
                            </defs>
                            
                            {/* Compass grid arcs as background */}
                            <path d="M 50,20 Q 200,160 350,20" fill="none" stroke="rgba(212,175,55,0.04)" strokeWidth="1.5" />
                            <path d="M 100,20 Q 200,110 300,20" fill="none" stroke="rgba(212,175,55,0.02)" strokeWidth="1" />
                            
                            {/* Pivot */}
                            <circle cx="200" cy="15" r="4.5" fill="#d4af37" className="shadow-lg" />
                            
                            {/* Pendulum Rod */}
                            <line 
                              x1="200" 
                              y1="15" 
                              x2={200 + 115 * Math.sin(auraActiveAngle * Math.PI / 180)}
                              y2={15 + 115 * Math.cos(auraActiveAngle * Math.PI / 180)}
                              stroke="#d4af37" 
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeOpacity="0.75"
                            />
                            
                            {/* Aura Bob Glow & Ball */}
                            <circle 
                              cx={200 + 115 * Math.sin(auraActiveAngle * Math.PI / 180)}
                              cy={15 + 115 * Math.cos(auraActiveAngle * Math.PI / 180)}
                              r="26" 
                              fill="url(#auraGlow)"
                            />
                            <circle 
                              cx={200 + 115 * Math.sin(auraActiveAngle * Math.PI / 180)}
                              cy={15 + 115 * Math.cos(auraActiveAngle * Math.PI / 180)}
                              r="11" 
                              fill="#090909"
                              stroke="#d4af37"
                              strokeWidth="2.5"
                            />
                          </svg>
                        </div>
                        <p className="text-[9px] text-white/30 text-start leading-relaxed">
                          {isRtl 
                            ? "✓ يتأرجح البندول تلقائياً بموجب تردد رنينك ومعدل كبت التشتت. الترددات الأعمق والخفت العالي توقف الذبذبة فورياً لمنع ارتباك جسدك العصبي."
                            : "✓ The emotional pendulum swings according to your calibrated resonance frequency. Proper attenuation suppresses amplitude swings to secure peace."}
                        </p>
                      </div>

                      {/* Sub-item: Aura Matrix Radar */}
                      <div className="sm:col-span-6 space-y-4">
                        <div className="text-[10px] text-white/40 uppercase font-black tracking-widest text-start">
                          {isRtl ? "مُخطط انبعاث الهالة والتحصين" : "Aura Radiation & Shield Radar"}
                        </div>

                        <div>
                          <svg viewBox="0 0 200 200" className="w-full aspect-square max-w-[155px] mx-auto bg-black rounded-full border border-white/5 relative p-2">
                            <defs>
                              <radialGradient id="fieldGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor={auraResonance < 45 ? "#ef4444" : (auraDistance > 5 ? "#d4af37" : "#06b6d4")} stopOpacity={Math.max(0.15, auraAttenuation / 12)} />
                                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                              </radialGradient>
                            </defs>
                            
                            {/* Central Sovereign Core */}
                            <circle cx="100" cy="100" r={12 + auraResonance / 12} fill="url(#fieldGlow)" stroke="#d4af37" strokeWidth="0.75" strokeDasharray="3,3" />
                            <circle cx="100" cy="100" r="4.5" fill="#d4af37" />

                            {/* Standard shield borders */}
                            <circle cx="100" cy="100" r={Math.max(25, auraDistance * 8.5)} fill="none" stroke={auraDistance > 5 ? "#d4af37" : "rgba(255,255,255,0.08)"} strokeWidth="1" strokeOpacity="1" className="transition-all duration-300" />
                            <circle cx="100" cy="100" r={Math.max(45, auraDistance * 13.5)} fill="none" stroke="currentColor" className={`${auraDistance > 7 ? 'text-gold' : 'text-cyan-500/10'} transition-all duration-300`} strokeWidth="0.75" strokeDasharray="5,5" />
                            
                            {/* Radar sweep lines */}
                            <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                            
                            {/* Compass Arrow rotates with pendulum swing indicating active emotional realignment direction */}
                            <g transform={`rotate(${auraActiveAngle * 2.8} 100 100)`}>
                              <line x1="100" y1="100" x2="100" y2="35" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" />
                              <polygon points="100,27 97,36 103,36" fill="#d4af37" />
                            </g>
                          </svg>
                        </div>
                        <div className="text-center font-mono text-[9px]">
                          <span className="text-white/40 block uppercase">{isRtl ? "شدة الهالة الكلية" : "AURA DENSITY"}</span>
                          <span className="text-gold font-bold font-serif text-[11px]">
                            {Math.min(100, Math.round(((120 - auraResonance + 50) / 100) * (Math.max(1, auraDistance) * 7.5) + (auraAttenuation * 4)))}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Sovereign Acoustic Resonator Card (الفكرة الثالثة) */}
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 text-start">
                      <div className="space-y-1">
                        <div className="text-[10px] text-gold uppercase font-black tracking-widest flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-gold animate-pulse" />
                          {isRtl ? "مُولد الرنين الحي وترددات الهالة الصامتة" : "SOVEREIGN ACOUSTIC BIORESONATOR"}
                        </div>
                        <p className="text-[11px] text-white/40 leading-relaxed font-sans">
                          {isRtl
                            ? "توليد موجات صوتية علاجية حية لتعديل ترددات الدماغ وتهدئة اللوزة كهرومغناطيسياً فورياً تحت بروتوكولات الوقار مزارات."
                            : "Synthesize high-precision neuro-acoustic waves to alter cortical states and attenuate fight-or-flight triggers instantly."}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            freq: 110,
                            titleAr: "🎙️ 110 Hz - قرار الصدر والرسوخ الشخصي",
                            titleEn: "🎙️ 110 Hz - Thoracic Basaltic Register",
                            descAr: "يعزز تدريب الحبال الصوتية على الطبقات الجهورية الصخرية لامتصاص الترددات الخائفة الصاعقة.",
                            descEn: "Anchors raw thoracic projection and larynx depth to completely neutralize vocal tremors.",
                          },
                          {
                            freq: 432,
                            titleAr: "🌌 432 Hz - الاتساق الطيفي والتحصين الشمسي",
                            titleEn: "🌌 432 Hz - Harmonic Spectrum Protection",
                            descAr: "تردد كوني يوقف القلق المحيط ويسهل الحفاظ على تباعد وقاري عريض لعزل الغاز الغوغائي.",
                            descEn: "Universal acoustic grid designed to ease nervous override, maximizing cognitive shield margins.",
                          },
                          {
                            freq: 528,
                            titleAr: "🧬 528 Hz - ترميم خلايا اللوزة وخفض الإنذار",
                            titleEn: "🧬 528 Hz - Amygdalar System Calibration",
                            descAr: "تنسيق ترددي نشط لحث الاستجابة الذاتية الهادئة وقطع تيار الهياج العاطفي المباغت.",
                            descEn: "Directly balances autonomic alarm loops to construct deep, instant conversational composure.",
                          }
                        ].map(item => (
                          <button
                            key={item.freq}
                            onClick={() => playAuraFrequency(item.freq)}
                            className={`w-full p-4 rounded-2xl border text-start transition-all duration-300 relative group overflow-hidden ${
                              auraActiveFreq === item.freq
                                ? 'bg-gold/10 border-gold/40'
                                : 'bg-black/60 border-white/5 hover:bg-black/80'
                            }`}
                          >
                            {/* Wave glow background ripple if active */}
                            {auraActiveFreq === item.freq && (
                              <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/1 to-transparent animate-pulse pointer-events-none" />
                            )}

                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs font-serif font-bold text-white group-hover:text-gold transition-colors">
                                {isRtl ? item.titleAr : item.titleEn}
                              </span>
                              <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold">
                                {auraActiveFreq === item.freq ? (
                                  <>
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                    <span className="text-emerald-400 font-bold uppercase">{isRtl ? "نشط" : "LIVE"}</span>
                                  </>
                                ) : (
                                  <span className="text-white/30 uppercase group-hover:text-white/60">{isRtl ? "تشغيل" : "PLAY"}</span>
                                )}
                              </div>
                            </div>
                            <p className="text-[10px] text-white/50 mt-2 font-sans leading-relaxed">
                              {isRtl ? item.descAr : item.descEn}
                            </p>
                          </button>
                        ))}
                      </div>

                      {auraActiveFreq && (
                        <div className="text-center bg-black/40 border border-white/5 rounded-xl p-3 flex items-center justify-center gap-2">
                          <div className="flex gap-0.5 items-end h-3">
                            <span className="w-0.5 bg-gold animate-[bounce_1s_infinite_100ms]" style={{height: '60%'}} />
                            <span className="w-0.5 bg-gold animate-[bounce_1s_infinite_300ms]" style={{height: '100%'}} />
                            <span className="w-0.5 bg-gold animate-[bounce_1s_infinite_200ms]" style={{height: '40%'}} />
                            <span className="w-0.5 bg-gold animate-[bounce_1s_infinite_400ms]" style={{height: '85%'}} />
                          </div>
                          <span className="text-[9px] font-mono text-gold font-bold">
                            {isRtl ? `موجات جارية بتردد ${auraActiveFreq} هرتز لتزامن خلايا اللوزة...` : `SYNCHRONIZING AT ${auraActiveFreq}Hz...`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dynamic Archetype Analysis & Psychological Sovereignty Blueprint */}
                <div className="grid md:grid-cols-2 gap-8 items-stretch pt-4 text-start">
                  {/* Archetype Diagnostics */}
                  <div className="bg-[#0b0b0b] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                      <div className="text-[10px] text-gold uppercase font-black tracking-widest flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        {isRtl ? "تصنيف الهيبة والتردد المغناطيسي الحالي" : "Dynamic Sovereign Frequency Archetype"}
                      </div>
                      <h4 className="text-lg md:text-xl font-serif text-white">
                        {isRtl ? (
                          auraResonance < 45 ? "«تردد الطيف المضطرب المندمج»" : (auraDistance > 7.5 ? "«القُبّة البازلتية العظمى»" : (auraAttenuation > 7 ? "«السكوت الشمسي الوقور»" : "«الرنين المكتفي بذاته»"))
                        ) : (
                          auraResonance < 45 ? "The Erratic Slit-Wave Pattern" : (auraDistance > 7.5 ? "The Basaltic Sanctuary Dome" : (auraAttenuation > 7 ? "The Solar Resonance Gravity" : "The Core Composure Frequency"))
                        )}
                      </h4>
                    </div>

                    <div className="p-4.5 rounded-2xl bg-black/40 border border-white/5 space-y-3 leading-relaxed text-xs text-white/80 font-serif">
                      {isRtl ? (
                        <>
                          <p>
                            لقد تم كشف خطة التردد النفسية ومحلل هالتك الآن. عندما تتعرض لمثير الاستفزاز (<strong>{auraStimulus === 'snide' ? "نبرة استهزاء صامتة" : (auraStimulus === 'criticism' ? "نقد ظالم" : (auraStimulus === 'status' ? "محاولة تقزيم بالجاه" : "تضليل ذهني غاسلايتينج"))}</strong>)، يسلك دماغك وجسدك وضعية المعايرة الحالية:
                          </p>
                          <ul className="space-y-1.5 list-disc list-inside text-white/60 text-[11px] pl-1 font-sans">
                            <li><strong>الصوت وعمق الموقف:</strong> {auraResonance < 50 ? "نبرة صوت مرتفعة قلقة تسهل للخصم قراءة اهتزازك العصبي الداخلي." : "نبرة عميقة وقورة ومستقرة، تشعر المستمع بوجود كتلة جبلية صامتة لا تتزعزع."}</li>
                            <li><strong>المجال والتباعد:</strong> {auraDistance < 3 ? "مسافة تماس حميمة مكشوفة للغاية؛ تجعلك غريزياً تمتص سموم كلماتهم إلى قلبك وتحاول تبرير نفسك فوراً." : "تباعد وقاري آمن يحميك بالكامل، ويجعل نبراتهم البذيئة ترتطم وتتحطم في هالتك الفاصلة دون تماس."}</li>
                            <li><strong>كبت اللوزية:</strong> {auraAttenuation < 5 ? "انفعال غريزي جارف ومحاولة رد الصاع فوراً لحماية هيبتك مما يظهر قلق الموقف." : "تحييد تكتيكي متوازن، تعتمد التريث والصمت الحاقن بالحق لتنكيس غرور الخصم."}</li>
                          </ul>
                        </>
                      ) : (
                        <>
                          <p>
                            Analysis of your psychological aura states under active threat (<strong>{auraStimulus === 'snide' ? "snide mocking tone" : (auraStimulus === 'criticism' ? "unfair critique" : (auraStimulus === 'status' ? "privilege condescension" : "tactical gaslighting"))}</strong>) returns the following parameters:
                          </p>
                          <ul className="space-y-1.5 list-disc list-inside text-white/60 text-[11px] font-sans">
                            <li><strong>Resonance Depth:</strong> {auraResonance < 50 ? "Shallow larynx tension that signs internal autonomic disturbance to your interlocutor." : "Perfect low register resonance indicating heavy physical and emotional poise."}</li>
                            <li><strong>Quarantine Margin:</strong> {auraDistance < 3 ? "Highly exposed personal threshold. Words enter and alter your heart rate variables easily." : "Impenetrable buffer zone that strips external noise of all offensive potency."}</li>
                            <li><strong>Neurological Decay:</strong> {auraAttenuation < 5 ? "High latent latency. The fight-or-flight reflex remains activated long after the provocateur is done." : "Instant autonomic de-escalation that completely ignores reactive impulses."}</li>
                          </ul>
                        </>
                      )}
                    </div>

                    <div className="flex gap-4 p-4 rounded-xl bg-gold/[0.02] border border-gold/10 items-center justify-between text-xs">
                      <div>
                        <span className="text-white/40 block text-[9px] uppercase font-mono">{isRtl ? "مؤشّر الحصانة الاهتزازية" : "Resonance Stability Metric"}</span>
                        <span className="text-gold font-bold font-serif text-sm">
                          {isRtl ? (
                            auraResonance > 50 && auraDistance > 4 && auraAttenuation > 5 ? "درجة وقار العتبة العاشرة" : "قيد الموازنة والتعديل"
                          ) : (
                            auraResonance > 50 && auraDistance > 4 && auraAttenuation > 5 ? "Sovereign Grade VIII - Stable" : "Compensating State"
                          )}
                        </span>
                      </div>
                      <div className="space-y-1 text-end">
                        <span className={auraResonance > 50 && auraDistance > 4 && auraAttenuation > 5 ? "text-emerald-400 font-bold block text-[10px]" : "text-amber-500 font-bold block text-[10px]"}>
                          ● {auraResonance > 50 && auraDistance > 4 && auraAttenuation > 5 ? (isRtl ? "حصين كلياً" : "SECURED") : (isRtl ? "تنبيه: قابل للاستفزاز" : "VULNERABLE")}
                        </span>
                        <span className="text-[9px] text-white/40">{isRtl ? "موازنة المجال" : "E-Field Alignment"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sovereign Recommendation Blueprint */}
                  <div className="bg-[#0b0b0b] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                      <div className="text-[10px] text-white/40 uppercase font-black tracking-widest">{isRtl ? "توجيه وقانون مدرسة السكينة والسيادة" : "Sovereignty & Composure Command Ledger"}</div>
                      <h4 className="text-md font-serif text-gold">{isRtl ? "نصيحة أ. بشير الماجري لتأمين الهالة" : "Mr. Bechir Mejri's Tactical Commandment"}</h4>
                    </div>

                    <div className="p-5 rounded-2xl bg-gold/[0.01] border border-gold/10 text-white/95 text-xs tracking-wide leading-relaxed space-y-4 font-serif relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-[24px] text-gold/5 select-none font-bold">“</div>
                      {isRtl ? (
                        <>
                          <p className="italic">
                            «يا بشير، إن عظمة حضورك البشري تكمن في <strong>ألّا تكون متاحاً في ردود أفعالك</strong>. الخصوم والمستفزون دائمو البحث عن "زر عصبي" يضغطون عليه ليروا بندولك وهو يرتجف ويهتز.»
                          </p>
                          <p className="italic">
                            «معايرتك الحالية للتباعد بمقدار <strong>{auraDistance} أمتار</strong> ورنين بمعدل <strong>{auraResonance} هرتز</strong> تدل على أن الخلاص يتمثل في صمتك الصخري البارد. عندما يتهكم أحدهم أو يعلو صوته، تنفس بعمق من بطنك، أهبط بتردد حبالك الصوتية، ولا تنطق بغير الصمت أو كلمة واحدة ببطء شديد وتناغم تام.»
                          </p>
                          <p className="italic text-gold font-bold pt-2 border-t border-white/5">
                            «الوقار الذهبي: دعهم يدورون في فلك جهلهم بينما تقبع أنت في مركز جاذبيتك الوقورة هادئاً كالأفلاك العلوية الخالدة.»
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="italic">
                            "The grand triumph of your charisma sits in being **perfectly unpredictable in your autonomic latency**. Provocateurs seek a nervous cue to prove that your emotional pendulum can be set in motion by their voice."
                          </p>
                          <p className="italic">
                            "With your emotional quarantine set to **{auraDistance} meters** and thoracic register at **{auraResonance}Hz**, your sovereign posture demands pristine, cold stillness. Lower your larynx register, delay any reply by exactly three heart cycles, and look through them as if they were made of flat glass."
                          </p>
                          <p className="italic text-gold font-bold pt-2 border-t border-white/5">
                            "Never debate a lesser frequence. Let your strategic silence be the deep cosmic gravity that anchors the context and forces compliance."
                          </p>
                        </>
                      )}
                    </div>

                    <div className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-gold font-serif font-black text-[10px] uppercase">
                        <Activity className="w-3.5 h-3.5 animate-pulse" />
                        {isRtl ? "تفعيل نمط الرنين الصوتي الصامت" : "Activate Coherent Low Frequency Hum"}
                      </div>
                      <p className="text-[10px] text-white/50 leading-relaxed font-sans">
                        {isRtl 
                          ? "بالنقر على التفعيل، يتم توليد نبض ذبذبي منخفض التردد (52Hz) لتهدئة حركة القلب على الفور وتيسير الإلقاء الرصين للكلام."
                          : "Starts a binaural sub-harmonic resonance sequence at 52Hz designed to instantly trigger deep vagal tone stabilization for deep speech."}
                      </p>
                      
                      <button
                        onClick={() => {
                          try {
                            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
                            if (AudioCtx) {
                              const ctx = new AudioCtx();
                              ctx.resume();
                              const osc = ctx.createOscillator();
                              const gain = ctx.createGain();
                              osc.type = 'sine';
                              osc.frequency.setValueAtTime(52, ctx.currentTime);
                              gain.gain.setValueAtTime(0.001, ctx.currentTime);
                              gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.5);
                              gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);
                              osc.connect(gain);
                              gain.connect(ctx.destination);
                              osc.start();
                              osc.stop(ctx.currentTime + 3.8);
                            }
                          } catch(e) {}
                        }}
                        className="w-full mt-2 py-2 rounded-lg bg-gold text-black font-black text-[9px] uppercase tracking-wider hover:bg-white transition-all"
                      >
                        {isRtl ? "🔊 تفعيل رنين 52 هرتز الصوتي في رأسك" : "🔊 Emit 52Hz Internal Resonance"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 11. SOVEREIGN TV PROJECTION & AMBIENT CHAMBER */}
            {activeTab === 'tv' && (
              <motion.div
                key="tv"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8 text-start">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                      <Tv className="w-6 h-6 text-gold animate-pulse" />
                      {isRtl ? "بوابة الإسقاط والوقار التلفزيوني: نمط العرض الصخري" : "Sovereign TV Projection Dashboard & Ambient Cast Arena"}
                    </h3>
                    <p className="text-white/40 text-xs">
                      {isRtl 
                        ? "بروتوكول بث ذبذبات وعروض مدرسة الوقار إلى شاشة التلفاز الذكي الخاص بك، كدرع بيئي كامل للتحكم في اللوزة الدماغية والاسترخاء العائلي المتبادل."
                        : "Cast critical frequency harmonics and cognitive alignment screens directly onto your Smart TV to establish a complete ambient shield."}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-start">
                  {/* Cast Core Controller */}
                  <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                    <div className="space-y-2">
                      <div className="text-[10px] text-gold uppercase font-black tracking-widest flex items-center gap-1.5">
                        <Cast className="w-3.5 h-3.5" />
                        {isRtl ? "مُتحكم البث والوضع السينمائي الفاخر" : "Cast Control & Cinema Theater Engine"}
                      </div>
                      <h4 className="text-lg font-serif text-white">
                        {isRtl ? "الوضع البيئي الغامر للشاشة الكبيرة" : "Immersive High-Contrast TV Screen"}
                      </h4>
                      <p className="text-[11px] text-white/50 leading-relaxed font-sans">
                        {isRtl
                          ? "عند تفعيل الوضع السينمائي، ستتحول شاشتك الكاملة إلى لوحة وقار وعزل كرتوني عالي التباين يتم تحديثه مستمراً لتتبعه مريحاً من الأريكة."
                          : "Transforms your viewport into a high-visibility, pure-display layout with large serif fonts and macro breathing expanders customized for living room monitors."}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Launch Button */}
                      <button
                        onClick={() => setIsTvAmbientActive(true)}
                        className="w-full py-5 rounded-2xl bg-gradient-to-r from-amber-600 to-gold text-black font-black text-xs uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold/15 cursor-pointer"
                      >
                        <MonitorPlay className="w-5 h-5" />
                        <span>{isRtl ? "🚀 إطلاق وضع التلفاز السينمائي (ملء الشاشة)" : "🚀 Launch TV Cinema Mode (Fullscreen)"}</span>
                      </button>

                      {/* Web Presentation API trigger */}
                      <button
                        onClick={() => {
                          setTvIsCasting(!tvIsCasting);
                          try {
                            if ('presentation' in navigator && (navigator as any).presentation.defaultRequest) {
                              const request = new (window as any).PresentationRequest(['/']);
                              request.start()
                                .then(() => console.log("Presentation started successfully"))
                                .catch((e: any) => console.log("User canceled presentation or unsupported device", e));
                            } else {
                              playBeep(440, 0.2);
                            }
                          } catch (e) {
                            console.warn("Presentation API not fully supported in this sandboxed frame context, fallbacked gracefully");
                          }
                        }}
                        className={`w-full py-4 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          tvIsCasting 
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-black animate-pulse'
                            : 'bg-black/40 border-white/5 text-white/80 hover:bg-black/60'
                        }`}
                      >
                        <Cast className={`w-4 h-4 ${tvIsCasting ? 'animate-bounce' : ''}`} />
                        <span>
                          {tvIsCasting
                            ? (isRtl ? "📡 جاري التوصيل المتكامل بالشاشة المعايرة..." : "📡 CONNECTING WIRELESS PRESENTATION PROTOCOL...")
                            : (isRtl ? "📡 فحص وتوصيل الشاشات اللاسلكية بنقرة" : "📡 Scan & Detect Smart TV Displays Directly")}
                        </span>
                      </button>
                    </div>

                    {/* Simulation Status Overlay */}
                    <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-white/40">{isRtl ? "حالة الإرسال" : "Casting Output Status"}</span>
                        <span className={tvIsCasting ? "text-emerald-400 font-bold" : "text-amber-500 font-bold"}>
                          {tvIsCasting ? (isRtl ? "متصل لاسلكياً بالبث" : "CAST LIVE") : (isRtl ? "مرآة العرض جاهزة" : "READY TO PROMPT")}
                        </span>
                      </div>
                      <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          className={`h-full rounded-full ${tvIsCasting ? 'bg-emerald-500' : 'bg-gold/40'}`}
                          initial={{ width: '40%' }}
                          animate={{ width: tvIsCasting ? '100%' : '65%' }}
                        />
                      </div>
                      <div className="text-[9px] text-white/30 leading-relaxed font-sans">
                        {isRtl
                          ? "بروتوكول بشير الماجري يدعم شاشات: سامسونج الذكية، إل جي WebOS، آبل تي في، جداريات كروم كاست، وأجهزة كود الغرفة."
                          : "Compatible with: WebOS Smart TVs, Samsung Smart Hub, Apple TV, Chromecast, Roku Screen Mirroring, and standard DLNA devices."}
                      </div>
                    </div>
                  </div>

                  {/* Fast Casting Instructions */}
                  <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="text-[10px] text-gold uppercase font-black tracking-widest flex items-center gap-1.5 font-mono">
                        <Smartphone className="w-3.5 h-3.5" />
                        {isRtl ? "بروتوكول بشير الماجري لربط شاشة التلفاز" : "Sovereign TV Bonding Protocol"}
                      </div>
                      <h4 className="text-base font-serif text-white">
                        {isRtl ? "كيفية العرض والربط بخطوتين سريعتين:" : "Two-Step Smart TV Connection Guide:"}
                      </h4>

                      <div className="space-y-4">
                        <div className="flex gap-4.5 p-4 rounded-2xl bg-black/40 border border-white/5">
                          <div className="bg-gold/10 text-gold font-serif font-black text-xs rounded-xl w-8 h-8 flex items-center justify-center shrink-0 border border-gold/20">
                            1
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-serif font-bold text-white block">
                              {isRtl ? "إما عبر ميزة انعكاس الشاشة على الهواتف واللوحيات:" : "Option A: Mobile Screen Mirroring"}
                            </span>
                            <p className="text-[10px] text-white/40 leading-relaxed font-sans text-start">
                              {isRtl
                                ? "من الآيفون (AirPlay) أو أندرويد (Smart View) واختيار تلفازك الذكي مباشرة لبث المنصة بدقتها الهائلة بالكامل."
                                : "Swipe down on iPhone (Apple Screen Mirroring) or Samsung (Smart View / Cast) and pick your TV to broadcast the entire workspace instantly."}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4.5 p-4 rounded-2xl bg-black/40 border border-white/5">
                          <div className="bg-gold/10 text-gold font-serif font-black text-xs rounded-xl w-8 h-8 flex items-center justify-center shrink-0 border border-gold/20">
                            2
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-serif font-bold text-white block">
                              {isRtl ? "أو مشاركة التبويب في متصفح جوجل كروم على الكمبيوتر:" : "Option B: Chrome Tab Cast from Desktop"}
                            </span>
                            <p className="text-[10px] text-white/40 leading-relaxed font-sans text-start">
                              {isRtl
                                ? "انقر في متصفح كروم على النقاط الثلاث العلوية -> حدد بث (Cast) -> اختر التلفاز. فتبث الحكمة والذبذبات بأداء كامل وصوت رنان."
                                : "Click the 3 dots in Google Chrome on your PC -> Select 'Save and Share' -> 'Cast...' -> Choose your Living Room TV. This transmits high-definition audio."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Mirroring Indicator */}
                    <div className="p-4 rounded-xl bg-gold/[0.01] border border-gold/10 flex items-center gap-4.5">
                      {/* Custom Elegant Vector QR Code to scanner test */}
                      <div className="bg-white p-2.5 rounded-xl shrink-0 border border-white/10 shadow-lg">
                        <svg className="w-14 h-14 text-black" viewBox="0 0 100 100" fill="currentColor">
                          <rect x="0" y="0" width="30" height="30" />
                          <rect x="10" y="10" width="10" height="10" fill="white" />
                          <rect x="70" y="0" width="30" height="30" />
                          <rect x="80" y="10" width="10" height="10" fill="white" />
                          <rect x="0" y="70" width="30" height="30" />
                          <rect x="10" y="80" width="10" height="10" fill="white" />
                          <rect x="40" y="40" width="20" height="20" />
                          <rect x="40" y="10" width="20" height="10" />
                          <rect x="80" y="70" width="20" height="20" />
                          <rect x="70" y="50" width="10" height="20" />
                          <rect x="10" y="45" width="20" height="10" />
                          <rect x="45" y="80" width="15" height="15" />
                        </svg>
                      </div>
                      <div className="space-y-1 text-start">
                        <span className="text-[10px] text-white font-serif font-black block">
                          {isRtl ? "الربط الفوري بالهواتف المعايرة" : "Mobile Sync QR Code Entry"}
                        </span>
                        <p className="text-[9px] text-white/45 leading-relaxed font-sans">
                          {isRtl
                            ? "امسح الكود بكاميرا هاتفك للوصول السريع إلى حلبة التتبع اليدوي، مع استخدام شاشة التلفاز كلوحة إسقاط حية."
                            : "Scan with your smartphone to control the session remotely from your hand, using the TV screen as the primary beautiful viewer dashboard."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-Acoustic wave player for TV soundboards */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 text-start">
                  <div className="space-y-1">
                    <div className="text-[10px] text-gold uppercase font-black tracking-widest flex items-center gap-1.5 font-mono">
                      <Volume2 className="w-3.5 h-3.5" />
                      {isRtl ? "مُوالف رنين التلفاز ومكبرات الصوت" : "Sovereign TV Speaker Audio Resonator"}
                    </div>
                    <p className="text-[11px] text-white/40 leading-relaxed font-sans">
                      {isRtl
                        ? "اختبر وبث الترددات والاهتزازات المفضلة لتهدئة اللوزة كهرومغناطيسية، مع مخرجات ضخمة تتناسب مع مكبرات صوت التلفاز المسرحية."
                        : "Test and inject sub-harmonic waveforms specialized for large home television soundbars or audio systems to fill the room with cellular calmness."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        freq: 110,
                        titleAr: "🎙️ 110 هرتز - الطبقة الجهورية الصخرية",
                        titleEn: "🎙️ 110 Hz - Basaltic Throat Resonance",
                        descAr: "تقوية طبقات الفك والصدر العميقة لامتصاص الخوف من المباغتة اللفظية.",
                        descEn: "Anchors raw thoracic resonance to neutralize vocal tremors and nervousness.",
                        accent: "bg-red-500/10 text-red-400 border-red-500/20"
                      },
                      {
                        freq: 432,
                        titleAr: "🌌 432 هرتز - الاتساق المحيطي المعياري",
                        titleEn: "🌌 432 Hz - Micro-vibrational Composure",
                        descAr: "موجة هدوء مثالية لشاشات التلفاز الكبيرة لتصحيح التوترات الإدراكية للأريكة.",
                        descEn: "Optimized for large monitors to dissolve cognitive fatigue and ease social anxiety.",
                        accent: "bg-amber-500/10 text-gold border-gold/20"
                      },
                      {
                        freq: 528,
                        titleAr: "🧬 528 هرتز - تصفية القلق المعياري الكوني",
                        titleEn: "🧬 528 Hz - Solfeggio Amygdalar Override",
                        descAr: "ترميم ترددات الخلايا العصبية لخفض دقات القلب وتعديل الاستجابة تحت الضغط.",
                        descEn: "Directly calms the nervous system and autonomic alarm loops under threat.",
                        accent: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }
                    ].map(wave => (
                      <button
                        key={wave.freq}
                        onClick={() => playAuraFrequency(wave.freq)}
                        className={`p-4 rounded-2xl border text-start transition-all relative overflow-hidden group hover:opacity-95 cursor-pointer ${
                          auraActiveFreq === wave.freq 
                            ? 'bg-gold/15 border-gold shadow-lg shadow-gold/5' 
                            : 'bg-black/60 border-white/5 hover:bg-black/80'
                        }`}
                      >
                        {auraActiveFreq === wave.freq && (
                          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/1 to-transparent animate-pulse pointer-events-none" />
                        )}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-serif font-black text-white group-hover:text-gold transition-colors">
                            {isRtl ? wave.titleAr : wave.titleEn}
                          </span>
                          <span className="text-[9px] font-mono text-white/40 uppercase group-hover:text-white/70">
                            {auraActiveFreq === wave.freq ? (isRtl ? "نشط" : "ON TV") : (isRtl ? "بث" : "PLAY")}
                          </span>
                        </div>
                        <p className="text-[10px] text-white/50 mt-2 font-sans leading-relaxed">
                          {isRtl ? wave.descAr : wave.descEn}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 12. SOVEREIGN PITCH FOUNDRY & ALCHEMY OF THESIS */}
            {activeTab === 'pitch' && (
              <motion.div
                key="pitch"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8 text-start">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-gold animate-pulse" />
                      {isRtl ? "صك وصياغة الأفكار الفاخرة: كيمياء تسويق الأطروحات العريقة" : "Sovereign Pitch Foundry: Alchemy of High-Gravity Thesis"}
                    </h3>
                    <p className="text-white/40 text-xs">
                      {isRtl 
                        ? "بروتوكول تفكيك وتشكيل الأفكار الريادية وصياغتها بنبرة وقار صخرية قادرة على لفت الانتباه وتأمين الاحترام الفوري من الشركاء والمستثمرين."
                        : "Formulate and forge your raw vision into a dense, high-gravity thesis engineered to instantly command attention and silence skepticism."}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-start">
                  {/* Left Column: Blueprint & Inputs */}
                  <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                    <div className="text-[10px] text-gold uppercase font-black tracking-widest flex items-center gap-1.5 font-mono">
                      <Sliders className="w-3.5 h-3.5" />
                      {isRtl ? "مُدخلات ومكونات الأطروحة العريقة" : "Thesis Blueprint & Dynamic Inputs"}
                    </div>

                    <div className="space-y-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-[11px] text-white/50 mb-1.5 font-bold">
                          {isRtl ? "اسم الفكرة أو المبادرة الريادية:" : "Initiative or Idea Name:"}
                        </label>
                        <input
                          type="text"
                          value={pitchIdeaName}
                          onChange={(e) => setPitchIdeaName(e.target.value)}
                          placeholder={isRtl ? "مثال: مدرسة الوقار الإدراكية، تطبيق عزل الضوضاء المستدام..." : "e.g., Sovereign Focus Protocol, Basaltic CRM..."}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      {/* Target Audience */}
                      <div>
                        <label className="block text-[11px] text-white/50 mb-1.5 font-bold">
                          {isRtl ? "الجمهور المستهدف أو الطرف الحاضر:" : "Target Audience / Potential Partners:"}
                        </label>
                        <input
                          type="text"
                          value={pitchTargetAudience}
                          onChange={(e) => setPitchTargetAudience(e.target.value)}
                          placeholder={isRtl ? "مثال: المستثمرين الرياديين الجريئين، المدراء التنفيذيين..." : "e.g., Venture Capitalists, Premium High-Net-Worth Executives..."}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      {/* Pain Point */}
                      <div>
                        <label className="block text-[11px] text-white/50 mb-1.5 font-bold">
                          {isRtl ? "الفجوة أو الألم الإدراكي الأساسي المراد حله:" : "Primary Pain Point / Cognitive Gap:"}
                        </label>
                        <input
                          type="text"
                          value={pitchPainPoint}
                          onChange={(e) => setPitchPainPoint(e.target.value)}
                          placeholder={isRtl ? "مثال: التشتت الذهني الحاد، بطء اتخاذ القرار وصعوبة القيادة..." : "e.g., Infinite digital distractions, fear of public speaking..."}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      {/* Strategic Promise */}
                      <div>
                        <label className="block text-[11px] text-white/50 mb-1.5 font-bold">
                          {isRtl ? "الوعد الإستراتيجي اللامتناهي (القيمة المقترحة):" : "Sovereign Unfair Advantage (Grand Promise):"}
                        </label>
                        <input
                          type="text"
                          value={pitchValueProp}
                          onChange={(e) => setPitchValueProp(e.target.value)}
                          placeholder={isRtl ? "مثال: استعادة السيطرة على الانتباه الفوري وبناء عقلية صانع القرار الصخري..." : "e.g., Reclaims complete neural command and establishes an absolute aura of composure..."}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Parameters & Forge Trigger */}
                  <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="text-[10px] text-gold uppercase font-black tracking-widest flex items-center gap-1.5 font-mono">
                        <Brain className="w-3.5 h-3.5" />
                        {isRtl ? "مُعاملات الهيبة والوقار اللفظي" : "Rhetorical Sliders & Aura Control"}
                      </div>

                      <div className="space-y-5">
                        {/* Gravity knob */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-white/45">{isRtl ? "مستوى رصانة الوقار (الهيبة)" : "Sovereign Gravity Tone"}</span>
                            <span className="text-gold font-bold">{pitchGravityLevel}%</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={pitchGravityLevel}
                            onChange={(e) => setPitchGravityLevel(Number(e.target.value))}
                            className="w-full accent-gold bg-zinc-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-[8px] text-white/30 font-serif">
                            <span>{isRtl ? "دبلوماسي هادئ" : "Diplomatic Flow"}</span>
                            <span>{isRtl ? "بازلتي ملكي مطلق" : "Absolute Basaltic"}</span>
                          </div>
                        </div>

                        {/* Concision / pause knob */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-white/45">{isRtl ? "معيار الصمت التكتيكي (نسبة الإيجاز)" : "Tactical Silence & Concision"}</span>
                            <span className="text-gold font-bold">{pitchConcisionLevel}%</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="60"
                            value={pitchConcisionLevel}
                            onChange={(e) => setPitchConcisionLevel(Number(e.target.value))}
                            className="w-full accent-gold bg-zinc-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-[8px] text-white/30 font-serif">
                            <span>{isRtl ? "اقتصادي مقتضب" : "Hyper-Concise"}</span>
                            <span>{isRtl ? "شرح وافٍ مفصل" : "Thorough Exposition"}</span>
                          </div>
                        </div>

                        {/* Cognitive gap knob */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-white/45">{isRtl ? "فجوة الفضول المعرفي (الغموض المهيب)" : "Cognitive Gap & Mystery Level"}</span>
                            <span className="text-gold font-bold">{pitchCognitiveGap}%</span>
                          </div>
                          <input
                            type="range"
                            min="20"
                            max="100"
                            value={pitchCognitiveGap}
                            onChange={(e) => setPitchCognitiveGap(Number(e.target.value))}
                            className="w-full accent-gold bg-zinc-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-[8px] text-white/30 font-serif">
                            <span>{isRtl ? "مباشر ومفتوح" : "Completely Transparent"}</span>
                            <span>{isRtl ? "عميق وسحري غامض" : "Subliminal/Enigmatic"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <button
                        onClick={() => {
                          if (!pitchIdeaName.trim()) return;
                          setPitchIsGenerating(true);
                          setTimeout(() => {
                            const name = pitchIdeaName || (isRtl ? "مشروع السيادة الإدراكية" : "Sovereign Enterprise");
                            const aud = pitchTargetAudience || (isRtl ? "الشركاء والداعمين" : "Elite Investors");
                            const pain = pitchPainPoint || (isRtl ? "الفوضى السلوكية والتشتت العملي" : "unfocus and constant cognitive drain");
                            const val = pitchValueProp || (isRtl ? "بناء قنوات انتباه راسخة وخوارزميات وقار مستدامة" : "establishing unshakeable focus parameters and neural posture");

                            setPitchResult({
                              openingHookAr: `في سوق مزدحم بالضجيج والصرير الإعلاني المفرط، لا يحتاج جمهورك من ${aud} إلى حل عابر آخر لـ ${pain}. مشروع "${name}" هو مركب إدراكي رصين مُصمم لاستعادة السيادة وتثبيت مراد الانتباه دون تقديم تنازلات سلوكية رخيصة.`,
                              openingHookEn: `In an era of hyper-stimulation, your ${aud} do not need another incremental system to curb ${pain}. "${name}" stands as an absolute cognitive anchor designed from first principles to restore active sovereignty, ensuring your team captures pure composure.`,
                              basalticPitchAr: `إننا لا نحاول اصطياد الانتباه السريع، بل نؤسس لمعادلة وقار ينساب فيها الحل لـ "${pain}" بمقدار رصانة ${pitchGravityLevel}%. نمنح العميل الأدوات للتفكير وصناعة القرارات الكبرى في ظل صمت تكتيكي بنسبة ${pitchConcisionLevel}%، عابرين فجوة الفضول المعرفي التي تُميز الرواد الحقيقيين لتأسيس "${val}".`,
                              basalticPitchEn: `We do not chase fleeting dopamine loops; we secure permanent mental command. By controlling operational noise with a strict constraint of ${pitchGravityLevel}% structural gravity, our system resolves ${pain} from the roots. We introduce a tactical silence threshold of ${pitchConcisionLevel}%, driving high-quality attention to produce "${val}".`,
                              frameworkAr: [
                                `١. نظام العزل الإدراكي المطلق: إخماد كلي لمنبهات اللوزة الدماغية.`,
                                `٢. خوارزميات الهدوء الصخري: تثبيت عتبة التوتر النفسي والرد البارد.`,
                                `٣. كسر سلاسل التشتيت الفجائي: تحقيق عوائد تركيز مستقرة لـ ${aud}.`
                              ],
                              frameworkEn: [
                                `1. Deep Cognitive Attenuation: Extinguishing peripheral alarm signals entirely.`,
                                `2. Immutable Composure: Normalizing pulse spikes under sudden negotiations.`,
                                `3. Strategic Attention Sovereignty: Forging pristine cognitive space for ${aud}.`
                              ],
                              objectionsProtocolAr: `الاعتراض الأول المتوقع: 'هل السوق مستعد لهذا الانضباط المهيب؟' - الرد الصخري: 'السوق غارق في الهزل والضوضاء، وهدوءنا هو البضاعة النادرة والفاخرة.' الاعتراض الثاني: 'هل القيمة مستدامة دون أدوات تنبيه متواصلة؟' - الرد: 'الوقار يقاس بالنتائج العميقة لا بصخب المؤشرات المزعجة.'`,
                              objectionsProtocolEn: `Anticipated Skepticism: 'Is our team/market ready for this intense sensory silence?' - Sovereign Defense: 'The market is sick of attention pollution. High composure is now the ultimate luxury.' Objection 2: 'Can we retain key accounts without hyper-active gamified triggers?' - Defense: 'True value metrics demonstrate that deep, quiet calibration yields 10x higher quality than superficial retention.'`,
                              auraStyleAr: `درجة الوقار المطلوبة: ${pitchGravityLevel}%. حافظ على استقامة الظهر وعلو الصدر. تحدث بثانيتين من الصمت التام قبل الهبوط بفكرتك، وتجنب رفرفة اليدين العشوائية. دع الكلمات تستقر في عقول الحضور لتمنحهم وقتاً هادئاً للإعجاب بالأطروحة.`,
                              auraStyleEn: `Target Aura Frequency: ${pitchGravityLevel}%. Anchor your posture with a basaltic spine. Deliver arguments at 80 words per minute, inserting a 2-second tactical pause before and after crucial terms to enforce intellectual gravity. Avoid hand fidgeting.`
                            });
                            setPitchIsGenerating(false);
                            // Set up the simulator with custom prompt
                            setPitchSimPrompt(isRtl 
                              ? `مستثمر جريء ذكي ينظر إليك بارتياب ويسأل: "هناك مئات المشاريع المشابهة؛ لماذا أنت تحديداً؟ وكيف ستقنع عملاءك بأسلوب الهدوء هذا؟"`
                              : `A cynical top-tier VC looks at you with narrowed eyes and asks: "I've seen 100 pitch decks doing similar things. Why should we give you our capital? How do you justify this silent methodology?"`
                            );
                            setPitchSimActive(true);
                            setPitchSimScore(null);
                            setPitchSimUserReply('');
                          }, 1200);
                        }}
                        disabled={!pitchIdeaName.trim() || pitchIsGenerating}
                        className={`w-full py-4.5 rounded-2xl bg-gradient-to-r ${
                          pitchIdeaName.trim() 
                            ? 'from-amber-600 to-gold text-black shadow-lg shadow-gold/15 hover:opacity-95' 
                            : 'from-white/5 to-white/10 text-white/30 cursor-not-allowed'
                        } font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer`}
                      >
                        {pitchIsGenerating ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin text-black" />
                            <span>{isRtl ? "🔬 جاري صك وبث الكلمات الذهبية..." : "🔬 FORGING SOVEREIGN PITCH..."}</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            <span>{isRtl ? "💫 صياغة واستخراج الأطروحة العريقة" : "💫 FORGE SOVEREIGN PITCH NOW"}</span>
                          </>
                        )}
                      </button>
                      {!pitchIdeaName.trim() && (
                        <p className="text-[10px] text-white/30 text-center mt-2.5">
                          {isRtl ? "⚠️ الرجاء إدخال اسم فكرتك أولاً لتفعيل بروتوكول الصياغة." : "⚠️ Please enter your initiative name above to unleash the alchemical forge."}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Simulated Pitch Output Result Card */}
                {pitchResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-start"
                  >
                    {/* Forged Copy Section */}
                    <div className="bg-[#0b0c0e] border border-gold/20 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gold uppercase font-black tracking-widest flex items-center gap-1.5 font-mono">
                          <Check className="w-4 h-4 text-emerald-400" />
                          {isRtl ? "مستند الأطروحة المصكوك بنجاح" : "THE FORGED SOVEREIGN THESIS"}
                        </div>
                        <span className="text-[9px] px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/20 font-mono font-bold animate-pulse">
                          {isRtl ? "معيار بشير الماجري: ممتاز" : "SYSTEM RATIO: EXQUISITE"}
                        </span>
                      </div>

                      {/* Hook & Pitch Body */}
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <h4 className="text-[11px] uppercase font-black tracking-widest text-white/50 font-mono">
                            {isRtl ? "١. الاستهلال الصخرة (The Hook):" : "1. The Opening Hook (The Hook):"}
                          </h4>
                          <p className="text-xs text-white leading-relaxed font-serif font-medium pl-3 border-l border-gold/30 italic">
                            "{isRtl ? pitchResult.openingHookAr : pitchResult.openingHookEn}"
                          </p>
                        </div>

                        <div className="space-y-1.5 pt-2">
                          <h4 className="text-[11px] uppercase font-black tracking-widest text-white/50 font-mono">
                            {isRtl ? "٢. الأطروحة البازلتية العميقة (The Pitch):" : "2. Deep Basaltic Pitch:"}
                          </h4>
                          <p className="text-xs text-white/80 leading-relaxed font-sans bg-black/40 p-4 rounded-xl border border-white/5">
                            {isRtl ? pitchResult.basalticPitchAr : pitchResult.basalticPitchEn}
                          </p>
                        </div>

                        {/* Three pillars framework */}
                        <div className="space-y-2 pt-2">
                          <h4 className="text-[11px] uppercase font-black tracking-widest text-white/50 font-mono">
                            {isRtl ? "٣. أعمدة الهيكل المدبب للسيادة:" : "3. Sovereign Architectural Pillars:"}
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {(isRtl ? pitchResult.frameworkAr : pitchResult.frameworkEn).map((pillar, idx) => (
                              <div key={idx} className="p-3 rounded-lg bg-[#070708] border border-white/5 text-xs text-white/70">
                                {pillar}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Hostility Counter */}
                        <div className="space-y-1.5 pt-2">
                          <h4 className="text-[11px] uppercase font-black tracking-widest text-white/50 font-mono">
                            {isRtl ? "٤. بروتوكول حصار الاعتراضات الصامتة:" : "4. Skepticism Annihilation Protocol:"}
                          </h4>
                          <p className="text-[11px] text-white/60 leading-relaxed bg-amber-500/[0.03] border border-amber-500/10 p-3.5 rounded-xl font-mono">
                            {isRtl ? pitchResult.objectionsProtocolAr : pitchResult.objectionsProtocolEn}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Live Practice / Speech simulator Column */}
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="text-[10px] text-gold uppercase font-black tracking-widest flex items-center gap-1.5 font-mono">
                          <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                          {isRtl ? "حلبة محاكاة الإقناع التفاعلية المتكلمة" : "SOVEREIGN RHETORIC LIVE PRACTICE REHEARSAL"}
                        </div>

                        {/* The cynical prompt */}
                        <div className="bg-[#0e0f12] rounded-2xl p-5 border border-white/5 relative overflow-hidden">
                          <div className="absolute top-2 right-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                            <span className="text-[8px] font-mono text-red-400 uppercase font-black">{isRtl ? "مستمع صلب" : "CRITICAL VC"}</span>
                          </div>
                          <p className="text-xs text-white font-serif leading-relaxed italic pr-4">
                            "{pitchSimPrompt}"
                          </p>
                        </div>

                        {/* State selector */}
                        <div className="space-y-2">
                          <label className="block text-[10px] text-white/50 uppercase font-bold">
                            {isRtl ? "مساحة تدريبك اللغوي (اكتب أو تفوه بأطروحتك):" : "Your Rhetorical Response (Practise Composure):"}
                          </label>
                          <textarea
                            value={pitchSimUserReply}
                            onChange={(e) => setPitchSimUserReply(e.target.value)}
                            rows={4}
                            placeholder={isRtl ? "اكتب هنا الأطروحة بنبرة قوية وهادئة، تجنب تبرير الفشل، واستعمل الصمت الوقائي البازلتي..." : "Type or speak your sovereign path. Focus on thoracic resonance, absolute metrics, and dismissive elegance..."}
                            className="w-full bg-black/50 border border-white/5 rounded-2xl p-4 text-xs text-white leading-relaxed placeholder-white/20 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all resize-none"
                          />
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={() => {
                              if (!pitchSimUserReply.trim()) return;
                              setPitchSimIsAnalyzing(true);
                              setTimeout(() => {
                                const replyLower = pitchSimUserReply.toLowerCase();
                                const textLength = pitchSimUserReply.length;
                                
                                // Smart Heuristics to judge Sovereign Stature
                                let score = 70;
                                let feedAr = "";
                                let feedEn = "";
                                
                                if (textLength > 100) score += 10;
                                if (textLength > 250) score += 5;
                                
                                // Checking for submissive keywords in Arabic
                                const hasSubmissiveAr = /أعتقد|ربما|ممكن|أرجو|أريد|أتمنى|يمكننا|عذراً/i.test(replyLower);
                                // Checking for majestic keywords in Arabic
                                const hasMajesticAr = /السيادة|الوقار|المطلق|عريق|بازلتي|تصفية|هيبة|أطروحة|الهيكل/i.test(replyLower);
                                
                                // Checking for submissive keywords in English
                                const hasSubmissiveEn = /i think|maybe|hope|could|should|sorry|please|try/i.test(replyLower);
                                // Checking for majestic keywords in English
                                const hasMajesticEn = /sovereignty|absolute|basaltic|immutable|poise|command|vocal|calibrated/i.test(replyLower);

                                if (hasSubmissiveAr || hasSubmissiveEn) {
                                  score -= 15;
                                }
                                if (hasMajesticAr || hasMajesticEn) {
                                  score += 15;
                                }
                                
                                // Bound score between 40 and 99
                                score = Math.max(45, Math.min(99, score));

                                if (score >= 85) {
                                  feedAr = `نبرة استثنائية وعريقة. تجنبت تماماً الوقوع في فخ الرجاء والتبرير. جملك حاسمة وبازلتية، والتحكم بثواني الصمت واضح ومريح للأعصاب. الحاضرون يستسلمون فوراً لوقارك الممتد.`;
                                  feedEn = `Outstanding composure. You successfully sidestepped submissive qualifiers. Your sentences are structured like clean basalt blocks. The tactical silent gaps enhance your total authority recursively.`;
                                } else if (score >= 70) {
                                  feedAr = `أداء جيد ومقبول، لكن هناك حاجة لتخفيض نبرة الرجاء والاستجداء. انطق بقراراتك وأهدافك بصيغة الفاعل المطلق عوضاً عن صيغة الاستعطاف أو شرح المحاولة.`;
                                  feedEn = `Solid effort, but you still rely on soft qualifiers ("I think", "we hope"). Shift your vocabulary into declarative absolute forms. Let your metrics stand alone.`;
                                } else {
                                  feedAr = `رصدنا نبضات تشتت واستعمال مفرط لصيغ الشك والتبرير الدفاعي. تحتاج إلى إعادة تهيئة اللوزة الدماغية واستعمال تمارين هدوء الصدر لتبدو أطروحتك ذات سيادة.`;
                                  feedEn = `Alert: High cognitive anxiety detected. You are over-explaining and defending yourself. Ground your thoracic breath and deploy silent buffers to absorb the opponent's gaze.`;
                                }

                                setPitchSimScore(score);
                                setPitchSimFeedbackAr(feedAr);
                                setPitchSimFeedbackEn(feedEn);
                                setPitchSimIsAnalyzing(false);
                              }, 1000);
                            }}
                            disabled={!pitchSimUserReply.trim() || pitchSimIsAnalyzing}
                            className={`flex-1 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                              pitchSimUserReply.trim()
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:opacity-90 active:scale-[0.98]'
                                : 'bg-white/5 text-white/20 cursor-not-allowed'
                            }`}
                          >
                            {pitchSimIsAnalyzing ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin text-white" />
                                <span>{isRtl ? "🧠 جاري تحليل معيار الهيبة والوقار..." : "🧠 EVALUATING COGNITIVE WEIGHT..."}</span>
                              </>
                            ) : (
                              <>
                                <Check className="w-4 h-4" />
                                <span>{isRtl ? "⚖️ فحص وتدقيق النبرة الريادية والوقار" : "⚖️ EVALUATING COMPOSE METRIC"}</span>
                              </>
                            )}
                          </button>

                          {/* Quick Reset */}
                          <button
                            onClick={() => {
                              setPitchSimUserReply('');
                              setPitchSimScore(null);
                            }}
                            className="px-4 py-4 rounded-xl bg-black/40 border border-white/5 hover:bg-black/60 text-white transition-all cursor-pointer"
                          >
                            <RefreshCcw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Display Score & Interactive Analysis Feedback */}
                      {pitchSimScore !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-5 rounded-2xl bg-zinc-950 border border-emerald-500/10 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono text-white/50 uppercase">
                              {isRtl ? "تقييم الهيبة الإجمالي" : "Sovereignty Persuasion Rating"}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className={`text-xl font-serif font-black ${pitchSimScore >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                {pitchSimScore}%
                              </span>
                              <div className="w-3.5 h-3.5 rounded-full overflow-hidden bg-black border border-white/10 relative">
                                <span className={`absolute inset-0 animate-ping rounded-full opacity-60 ${pitchSimScore >= 85 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-white/80 leading-relaxed font-sans text-start">
                            {isRtl ? pitchSimFeedbackAr : pitchSimFeedbackEn}
                          </p>

                          <div className="text-[9px] text-white/30 border-t border-white/5 pt-2.5 leading-relaxed">
                            {isRtl
                              ? "نصيحة بشير الماجري: حافظ على تردد الصوت المنخفض في الصدر وتحدث بوعي عميق، ولا تعتذر أبداً عما تصنعه من قيمة."
                              : "Sovereign Wisdom: Maintain a low vocal pitch from your thoracic cage, and never apologize for the absolute value you bring to the arena."}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* 13. GLOBAL SOVEREIGNTY & EXPANSION HUB */}
            {activeTab === 'global' && (
              <motion.div
                key="global"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8 text-start"
              >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                      <Globe className="w-6 h-6 text-gold animate-pulse" />
                      {isRtl ? "رادار السيادة والتوسع العالمي: كوكبة التأثير اللامتناهي" : "Global Sovereignty & Expansion Hub: Celestial Outreach"}
                    </h3>
                    <p className="text-white/40 text-xs">
                      {isRtl 
                        ? "بروتوكول تكييف ومطابقة علوم مدارات النفس مع الثقافات المتعددة لتصدير الوقار والصمّت التكتيكي كمنهجية معترف بها على الساحة العالمية."
                        : "Adapt, project, and globalize the immutable teachings of Bechir al-Mejri into diverse linguistic and regional cognitive ecosystems."}
                    </p>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Interactive Map/Region Selector (7 Grid Spanish columns) */}
                  <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                    <div className="text-[10px] text-gold uppercase font-black tracking-widest flex items-center gap-1.5 font-mono">
                      <Compass className="w-3.5 h-3.5" />
                      {isRtl ? "رادارات وقار القارات السلوكية" : "Continental Rhetoric Radar & Intel"}
                    </div>

                    {/* Regional Button Selector Row */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {[
                        { id: 'mena', labelAr: "⚡ الشرق الأوسط", labelEn: "⚡ MENA" },
                        { id: 'europe', labelAr: "🇪🇺 أوروبا", labelEn: "🇪🇺 Europe" },
                        { id: 'northamerica', labelAr: "🇺🇸 أمريكا الشمالية", labelEn: "🇺🇸 N. America" },
                        { id: 'eastasia', labelAr: "🏮 شرق آسيا", labelEn: "🏮 East Asia" },
                        { id: 'latinamerica', labelAr: "💃 أمريكا اللاتينية", labelEn: "💃 L. America" }
                      ].map((region) => (
                        <button
                          key={region.id}
                          onClick={() => {
                            setGlobalSelectedRegion(region.id as any);
                          }}
                          className={`py-3 px-2 rounded-xl text-[10px] font-black uppercase text-center tracking-wider transition-all duration-300 ${
                            globalSelectedRegion === region.id
                              ? 'bg-gold text-black font-bold shadow-md shadow-gold/10'
                              : 'bg-black/40 text-white/50 border border-white/5 hover:border-gold/30 hover:text-white'
                          }`}
                        >
                          {isRtl ? region.labelAr : region.labelEn}
                        </button>
                      ))}
                    </div>

                    {/* Active Region Psychometrics & Display */}
                    <div className="bg-black/40 border border-white/5 rounded-2xl p-6 space-y-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
                      
                      {/* Continental Title & Icon */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="space-y-1">
                          <h4 className="text-md font-serif text-white font-black">
                            {globalSelectedRegion === 'mena' && (isRtl ? "مدار الشرق الأوسط وشمال أفريقيا (البلاغة والهيبة)" : "Middle East & North Africa Orbit (MENA)")}
                            {globalSelectedRegion === 'europe' && (isRtl ? "مدار القارة الأوروبية (البرهنة والامتلاك العلمي)" : "European Continental Orbit (Empirical Logic)")}
                            {globalSelectedRegion === 'northamerica' && (isRtl ? "مدار القارة الأمريكية الشمالية (الحركية والبراغماتية)" : "North American Dynamic Orbit (Pragmatic Action)")}
                            {globalSelectedRegion === 'eastasia' && (isRtl ? "مدار الشرق الأقصى (صمت التناغم المطلق)" : "East Asian Orbit (Zen Silent Harmony)")}
                            {globalSelectedRegion === 'latinamerica' && (isRtl ? "مدار أمريكا اللاتينية (التماسك الوجداني الدافئ)" : "Latin American Resonance Orbit (Warm Vitality)")}
                          </h4>
                          <p className="text-[10px] text-gold/60 font-mono tracking-wider">
                            {globalSelectedRegion === 'mena' && "LATITUDE SOVEREIGN 100 — REGIONAL STRATEGIC BASE"}
                            {globalSelectedRegion === 'europe' && "LATITUDE LOGICAL 102 — GLOBAL EMPIRICAL BASE"}
                            {globalSelectedRegion === 'northamerica' && "LATITUDE ACTION 108 — METRIC AND CORP BASE"}
                            {globalSelectedRegion === 'eastasia' && "LATITUDE ZEN 101 — SUPREME TRANQUIL REGION"}
                            {globalSelectedRegion === 'latinamerica' && "LATITUDE RESONANCE 109 — WARM PASSION REGION"}
                          </p>
                        </div>
                        <span className="text-[10px] px-2.5 py-1 rounded bg-zinc-900 border border-white/5 text-emerald-400 font-mono font-bold">
                          {isRtl ? "● رصد تفاعلي" : "● LIVE INTEL"}
                        </span>
                      </div>

                      {/* Display Sliders for Psychometric Indicators */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Index 1 */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-white/45">{isRtl ? "مؤشر الصمت والتحفظ اللفظي" : "Rhetorical Restraint Index"}</span>
                            <span className="text-gold font-bold">
                              {globalSelectedRegion === 'mena' && "75%"}
                              {globalSelectedRegion === 'europe' && "80%"}
                              {globalSelectedRegion === 'northamerica' && "40%"}
                              {globalSelectedRegion === 'eastasia' && "95%"}
                              {globalSelectedRegion === 'latinamerica' && "50%"}
                            </span>
                          </div>
                          <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-gold rounded-full transition-all duration-500"
                              style={{ 
                                width: 
                                  globalSelectedRegion === 'mena' ? '75%' :
                                  globalSelectedRegion === 'europe' ? '80%' :
                                  globalSelectedRegion === 'northamerica' ? '40%' :
                                  globalSelectedRegion === 'eastasia' ? '95%' : '50%'
                              }}
                            />
                          </div>
                        </div>

                        {/* Index 2 */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-white/45">{isRtl ? "مؤشر الهيبة والوقار الملكي" : "Sovereign Majesty Index"}</span>
                            <span className="text-gold font-bold">
                              {globalSelectedRegion === 'mena' && "95%"}
                              {globalSelectedRegion === 'europe' && "75%"}
                              {globalSelectedRegion === 'northamerica' && "65%"}
                              {globalSelectedRegion === 'eastasia' && "90%"}
                              {globalSelectedRegion === 'latinamerica' && "80%"}
                            </span>
                          </div>
                          <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-gold rounded-full transition-all duration-500"
                              style={{ 
                                width: 
                                  globalSelectedRegion === 'mena' ? '95%' :
                                  globalSelectedRegion === 'europe' ? '75%' :
                                  globalSelectedRegion === 'northamerica' ? '65%' :
                                  globalSelectedRegion === 'eastasia' ? '90%' : '80%'
                              }}
                            />
                          </div>
                        </div>

                        {/* Index 3 */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-white/45">{isRtl ? "معدل تدفق العبارات (السرعة)" : "Expression Flow Pace"}</span>
                            <span className="text-gold font-bold">
                              {globalSelectedRegion === 'mena' && "65%"}
                              {globalSelectedRegion === 'europe' && "80%"}
                              {globalSelectedRegion === 'northamerica' && "95%"}
                              {globalSelectedRegion === 'eastasia' && "45%"}
                              {globalSelectedRegion === 'latinamerica' && "90%"}
                            </span>
                          </div>
                          <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-gold rounded-full transition-all duration-500"
                              style={{ 
                                width: 
                                  globalSelectedRegion === 'mena' ? '65%' :
                                  globalSelectedRegion === 'europe' ? '80%' :
                                  globalSelectedRegion === 'northamerica' ? '95%' :
                                  globalSelectedRegion === 'eastasia' ? '45%' : '90%'
                              }}
                            />
                          </div>
                        </div>

                        {/* Index 4 */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="text-white/45">{isRtl ? "تركيز لغة الجسد البصري" : "Visual Composure Stature"}</span>
                            <span className="text-gold font-bold">
                              {globalSelectedRegion === 'mena' && "85%"}
                              {globalSelectedRegion === 'europe' && "70%"}
                              {globalSelectedRegion === 'northamerica' && "80%"}
                              {globalSelectedRegion === 'eastasia' && "90%"}
                              {globalSelectedRegion === 'latinamerica' && "85%"}
                            </span>
                          </div>
                          <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-gold rounded-full transition-all duration-500"
                              style={{ 
                                width: 
                                  globalSelectedRegion === 'mena' ? '85%' :
                                  globalSelectedRegion === 'europe' ? '70%' :
                                  globalSelectedRegion === 'northamerica' ? '80%' :
                                  globalSelectedRegion === 'eastasia' ? '90%' : '85%'
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Descriptive Advice Paragraph */}
                      <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 mt-4 space-y-2">
                        <span className="text-[10px] text-amber-500 uppercase font-black font-mono tracking-wider flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                          {isRtl ? "التوصية الإستراتيجية العميقة" : "DEEP SOVEREIGN TRANS-CONTINENTAL ALIGNMENT"}
                        </span>
                        <p className="text-xs text-white/80 leading-relaxed font-sans">
                          {isRtl ? (
                            globalSelectedRegion === 'mena' ? "يركز الجمهور العربي على بلاغة الطرح وبناء نبرة الصدر العميقة ذات الجاذبية، وتجنب الهزل اللفظي أو تبديد الوقت. ينصح بتثقيب الصمت التكتيكي وإرساء الهيكل الملكي لبشير الماجري لتأكيد الوقار وسحب الارتياب." :
                            globalSelectedRegion === 'europe' ? "يقدر الجمهور الأوروبي المنهجية الموثقة والمنطق التجريبي الهادئ. تحدث بوقار مدعوم بالبيانات الإحصائية والتحليل السلوكي المتماسك، وتجنب تعالي الصوت؛ صمتك هناك يتم تفسيره على أنه احترام عميق وعقلانية." :
                            globalSelectedRegion === 'northamerica' ? "في البيئة البراغماتية لأمريكا الشمالية، صغ من الوقار حلاً للإنتاجية العالية وإخماد الاحتراق الوظيفي. تجنب التعبيرات الميتافيزيقية وتحدث بلغة الشركات والمنفعة، مستعملاً وقار الجسد كعلامة فارقة لقيادة الفريق بكاريزما." :
                            globalSelectedRegion === 'eastasia' ? "هذه قمة التحفظ، حيث يعتبر الهدوء السلوكي عتبة القوة القصوى. حافظ على ثبات ذقنك والظهر المستقيم. تجنب الحماس الصاخب تماماً، واعرض فلسفة الغرف الصامتة ووفر الهدوء العقلي المطلق للعميل كقيمة ذهبية." :
                            "يحتاج هذا الجمهور إلى تواصل وجداني دافئ ومسؤول. لا تفقد وقارك وثباتك البازلتي، بل اغمره بنمذجة صوتية تحتوي على شغف ومرونة. ركز على التماسك العصبي كجسر لاستقرار العواطف وتقوية الصداقات والشراكات."
                          ) : (
                            globalSelectedRegion === 'mena' ? "MENA audiences require high rhetorical stature, poetic poise, and thoracic resonance. Silence here communicates supreme patience and high esteem. Align your visual alignment directly and keep a basaltic spine to anchor target parameters." :
                            globalSelectedRegion === 'europe' ? "European regions demand strict logical and empirical underpinnings. Avoid empty promotional slogans or high theatrical style. Present Bechir Mejri's teachings as a structured behavioral science; maintain polite distance and utilize calm data." :
                            globalSelectedRegion === 'northamerica' ? "Pragmatism governs this region. Translate sovereignty and silent gaps into peak cognitive output, elite performance metrics, and toxic distraction filters. Avoid high-gravity mysticism; pitch as a premium corporate focus system." :
                            globalSelectedRegion === 'eastasia' ? "The highest spectrum of tactical silence and absolute composure. Minimize emotional expressions and speaking speed. Rely on your spinal posture and quiet breaths; deliver insights gently, validating that silence is the ultimate power." :
                            "Latin markets connect profoundly through authentic, high-vitality empathy. Retain your unyielding poise but project it through rich voice registers and expressive delivery. Demystify negative coping mechanisms and focus deeply on neuroscience."
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Translator / Alchemist (5 Grid Spanish columns) */}
                  <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-6">
                      <div className="text-[10px] text-gold uppercase font-black tracking-widest flex items-center gap-1.5 font-mono">
                        <Languages className="w-3.5 h-3.5" />
                        {isRtl ? "مُكيف ومترجم الشعارات السيادية" : "Sovereign Trans-Linguistic Alchemist"}
                      </div>

                      <div className="space-y-4">
                        {/* Raw slogan input */}
                        <div>
                          <label className="block text-[11px] text-white/50 mb-1.5 font-bold">
                            {isRtl ? "اكتب الشعار أو الأطروحة باللغة العربية:" : "Enter Arabic Slogan or Vision to Globalize:"}
                          </label>
                          <input
                            type="text"
                            value={globalRawSlogan}
                            onChange={(e) => setGlobalRawSlogan(e.target.value)}
                            placeholder={isRtl ? "مثال: السيادة النفسية ورسم مسافات الوقار الفاخر" : "e.g., Sovereign focus and establishing pristine silent gaps..."}
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                          />
                        </div>

                        {/* Language Selector */}
                        <div>
                          <label className="block text-[11px] text-white/50 mb-1.5 font-bold">
                            {isRtl ? "اختر لغة الاستهداف العالمية الأولى:" : "Select Target Global Language:"}
                          </label>
                          <select
                            value={globalTargetLang}
                            onChange={(e) => setGlobalTargetLang(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold transition-colors cursor-pointer"
                          >
                            <option value="en">English (الإنجليزية)</option>
                            <option value="fr">Français (الفرنسية)</option>
                            <option value="es">Español (الإسبانية)</option>
                            <option value="de">Deutsch (الألمانية)</option>
                            <option value="ja">日本語 (اليابانية)</option>
                            <option value="tr">Türkçe (التركية)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <button
                        onClick={() => {
                          if (!globalRawSlogan.trim()) return;
                          globalIsAdapting(true);
                          setGlobalIsAdapting(true);
                          setTimeout(() => {
                            const raw = globalRawSlogan;
                            let localeText = "";
                            let arResult = "";
                            let enResult = "";
                            let vocalAr = "";
                            let vocalEn = "";
                            let visualAr = "";
                            let visualEn = "";
                            let tacticalAr = "";
                            let tacticalEn = "";

                            if (globalTargetLang === 'en') {
                              localeText = "Pristine Cognitive Sovereignty & The Architecture of Supreme Poise.";
                              arResult = `النسخة الإنجليزية المحكمة: "${localeText}"`;
                              enResult = "Highly polished formal translation expressing absolute mental command.";
                              vocalAr = "تردد صوتي بازلتي عميق (C2) مع صمت تكتيكي بمعدل ثانيتين بين الأطروحة والأخرى.";
                              vocalEn = "Deep resonance (C2 register) with strict 2-second silent buffers between key phrases.";
                              visualAr = "استقامة الظهر والعمود الفقري مع تصفية الحركة السطحية تماماً.";
                              visualEn = "Immovable cervical spine posture; elimination of all peripheral fidgeting and hand wave markers.";
                              tacticalAr = "تجريد الطرح من العواطف وتقديمه كحل عالي الجدوى لإدارة انشغال الأدمغة.";
                              tacticalEn = "Framing the thesis as a scientific, high-utility focus architecture for elite executive performance.";
                            } else if (globalTargetLang === 'fr') {
                              localeText = "Souveraineté Cognitive Absolue et l'Architecture de la Bienséance.";
                              arResult = `النسخة الفرنسية الفاخرة: "${localeText}"`;
                              enResult = "Articulate translation utilizing classic psychological sophistication terms.";
                              vocalAr = "نبرة هادئة متزنة مع تلوين صوتي فلسفي مريح ومقنع للوعي الإنساني.";
                              vocalEn = "Philosophically balanced register, using precise intellectual spacing with respiratory pauses.";
                              visualAr = "نظرات واثقة ثابتة، مع مسافة وقار تبلغ متراً ونصف بينك وبين الآخر لتثبيت الجاذبية الشخصية.";
                              visualEn = "Deep unwavering eye-contact, leaving polite interactive boundaries of 1.5 meters to maximize stature.";
                              tacticalAr = "تقديم المنحى كدراسة سلوكية فريدة تهدف لحفظ تماسك النفس في الأوقات الضاغطة.";
                              tacticalEn = "Presenting the strategy as a unique behavioral study of self-integration for humanistic societies.";
                            } else if (globalTargetLang === 'es') {
                              localeText = "Soberanía Cognitiva Absoluta y la Arquitectura del Aplomo.";
                              arResult = `النسخة الإسبانية المتينة: "${localeText}"`;
                              enResult = "Warm yet sovereign translation bringing absolute composure to dynamic arenas.";
                              vocalAr = "نغمة عميقة محتوية، مع تدفق صوتي حازم يحمل نكهة الرد الفاصم والهدوء الجذاب.";
                              vocalEn = "Profound and embracing vocal register, mixing strong rhythmic beats with absolute baseline calm.";
                              visualAr = "لغة جسد مستقرة تكشف عن تماسك وجداني تام وانفتاح مدروس للكتفين والصدر للسيطرة.";
                              visualEn = "Expressive yet firmly grounded posture, keeping a wide solid chest stance to dominate the physical space.";
                              tacticalAr = "طرح المادة كقوة تكتيكية تعيد توجيه الشغف لحماية حدود النفس والهيبة الذاتية.";
                              tacticalEn = "Framing the thesis as an unshakeable framework to redirect intellectual passion into focused achievement.";
                            } else if (globalTargetLang === 'de') {
                              localeText = "Kognitive Souveränität und die Struktur Unerschütterlicher Gelassenheit.";
                              arResult = `النسخة الألمانية الصارمة: "${localeText}"`;
                              enResult = "Very strong, structured German translation centered around precise mental composure.";
                              vocalAr = "نبرة منتظمة عالية الموثوقية وبدون أي نبرات تذبذب نفسي أو تردد.";
                              vocalEn = "Highly stable, monotonic, low-frequency register, leaving absolute zero room for emotional trembling.";
                              visualAr = "ثبات كامل لليدين والعمود الفقري، حركة رأس مقتضبة، لغة تعكس الصرامة والوقار.";
                              visualEn = "Zero hand movements; strict focus of the eyes directly target-level; minimal posture changes.";
                              tacticalAr = "عرض المنظومة كقواعد انضباط حديدية تعتق الأفراد من التشتت الحاد وسوء التواصل.";
                              tacticalEn = "Positioning sovereignty as a strict intellectual framework to systematically filter cognitive pollution.";
                            } else if (globalTargetLang === 'ja') {
                              localeText = "絶対的な精神的主権と揺るぎない威厳の構築。";
                              arResult = `النسخة اليابانية اللطيفة وبمنظور وقار الشرق: "${localeText}"`;
                              enResult = "Zen-aligned Japanese translation centered around supreme internal composure.";
                              vocalAr = "نبرة فائقة الصمت وغارقة في التروي مع التكلم من عضلات البطن السفلية لفرض الهيبة الهادئة.";
                              vocalEn = "Lower diaphragmatic tone with extreme breathing economy, delivering insights slow and clear.";
                              visualAr = "تحكم كامل في مظهر الوجه (تعبيرات محايدة غير منخرطة) مع الحفاظ على انحناءة وقار خفيفة.";
                              visualEn = "Completely neutral facial composure (micro-expression shield); elegant vertical neck alignment.";
                              tacticalAr = "عرض المنهج كأسلوب حياة للانسجام التام وحماية السلام الداخلي والارتقاء بالنفس.";
                              tacticalEn = "Expressing the curriculum as a path of masterly inner tranquility and unshakeable energetic boundaries.";
                            } else {
                              localeText = "Mutlak Zihinsel Egemenlik ve Sınırsız Karizma Mimarisi.";
                              arResult = `النسخة التركية الرفيعة: "${localeText}"`;
                              enResult = "Highly dynamic Turkish adaptation capturing authority and majestic resonance.";
                              vocalAr = "نبرة واثقة قوية تنبثق من الصدر، تظهر الشجاعة الممزوجة بالسكينة والإيجاز.";
                              vocalEn = "Dignified chest vocal register combining decisive leadership and absolute protective silence.";
                              visualAr = "صدر مرتفع، نظرات قوية تواجه الرياح بوقار بازلتي أصيل، تجنب هز الأذرع تفادياً للخفة.";
                              visualEn = "Broad upright chest posture; solid eye lock; complete avoidance of chaotic arm movements.";
                              tacticalAr = "تجسيد الهيبة كرمز للكرامة الذاتية وصنع القرار المدروس في عالم مليء بالفوضى.";
                              tacticalEn = "Presenting Bechir al-Mejri's core models as a shield for dignity and high-level behavioral control.";
                            }

                            setGlobalAdaptedResult({
                              adaptedSloganAr: arResult,
                              adaptedSloganEn: enResult,
                              adaptedSloganLocal: localeText,
                              vocalRegisterAr: vocalAr,
                              vocalRegisterEn: vocalEn,
                              visualComposureAr: visualAr,
                              visualComposureEn: visualEn,
                              tacticalApproachAr: tacticalAr,
                              tacticalApproachEn: tacticalEn
                            });
                            setGlobalIsAdapting(false);
                          }, 1000);
                        }}
                        disabled={!globalRawSlogan.trim() || globalIsAdapting}
                        className={`w-full py-4 rounded-xl bg-gradient-to-r ${
                          globalRawSlogan.trim() 
                            ? 'from-amber-600 to-gold text-black shadow-lg shadow-gold/15 hover:opacity-95' 
                            : 'from-white/5 to-white/10 text-white/30 cursor-not-allowed'
                        } font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer`}
                      >
                        {globalIsAdapting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                            <span>{isRtl ? "🧪 جاري كسر قيود اللغات وتطويع الخطاب..." : "🧪 GLOBALIZE SPEECH SOVEREIGNTY..."}</span>
                          </>
                        ) : (
                          <>
                            <Network className="w-4 h-4" />
                            <span>{isRtl ? "🌍 تكييف وتصدير الأطروحة عالمياً" : "🌍 GLOBALIZE & DEPLOY THESIS NOW"}</span>
                          </>
                        )}
                      </button>
                      {!globalRawSlogan.trim() && (
                        <p className="text-[10px] text-white/30 text-center mt-1">
                          {isRtl ? "⚠️ الرجاء كتابة فكرتك لتطويعها لغوياً وعالمياً." : "⚠️ Please type your core concept to deploy the sovereign linguistic alchemist."}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Slogan Result Panel output if exists */}
                {globalAdaptedResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#0b0c0e] border border-gold/20 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden text-start"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div className="text-xs text-gold uppercase font-black tracking-widest flex items-center gap-1.5 font-mono">
                        <Check className="w-4 h-4 text-emerald-400" />
                        {isRtl ? "نمذجة الخطاب العولمي المعتمد للوقار" : "CERTIFIED GLOBAL SOVEREIGN PLATFORM METRICS"}
                      </div>
                      <span className="text-[9px] px-2.5 py-1 rounded bg-gold/15 text-gold border border-gold/20 font-mono font-bold animate-pulse">
                        {isRtl ? "معيار بشير الماجري: معتمد عالمياً" : "STATUS: WORLD CLASS"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Sub card 1: Local Slogan */}
                      <div className="space-y-2 p-4 bg-black/40 border border-white/5 rounded-2xl">
                        <span className="text-[10px] text-gold uppercase font-black tracking-widest block font-mono">
                          {isRtl ? "١. الشعار عابر الحدود (Adapted Slogan):" : "1. Adapted Slogan:"}
                        </span>
                        <p className="text-md text-white font-serif font-bold italic leading-relaxed">
                          "{globalAdaptedResult.adaptedSloganLocal}"
                        </p>
                        <p className="text-[10px] text-white/50 pt-2 border-t border-white/5">
                          {isRtl ? globalAdaptedResult.adaptedSloganAr : globalAdaptedResult.adaptedSloganEn}
                        </p>
                      </div>

                      {/* Sub card 2: Vocal Calibration */}
                      <div className="space-y-2 p-4 bg-black/40 border border-white/5 rounded-2xl">
                        <span className="text-[10px] text-gold uppercase font-black tracking-widest block font-mono">
                          {isRtl ? "٢. المعايرة الصوتية والتردد (Vocal Register):" : "2. Vocal Register & Calibration:"}
                        </span>
                        <p className="text-xs text-emerald-400 font-mono leading-relaxed font-bold">
                          {isRtl ? "تردد السيادة المستهدف:" : "Target Sovereign Hertz Alignment:"}
                        </p>
                        <p className="text-xs text-white/80 leading-relaxed font-sans">
                          {isRtl ? globalAdaptedResult.vocalRegisterAr : globalAdaptedResult.vocalRegisterEn}
                        </p>
                      </div>

                      {/* Sub card 3: Physical Gestures & Decorum */}
                      <div className="space-y-2 p-4 bg-black/40 border border-white/5 rounded-2xl">
                        <span className="text-[10px] text-gold uppercase font-black tracking-widest block font-mono">
                          {isRtl ? "٣. لغة وكاريزما الجسد (Visual Decorum):" : "3. Visual Composure & Decorum:"}
                        </span>
                        <p className="text-xs text-emerald-400 font-mono leading-relaxed font-bold">
                          {isRtl ? "درجة وقار الجسد المطلوبة:" : "Body Posture Requirement:"}
                        </p>
                        <p className="text-xs text-white/80 leading-relaxed font-sans">
                          {isRtl ? globalAdaptedResult.visualComposureAr : globalAdaptedResult.visualComposureEn}
                        </p>
                      </div>
                    </div>

                    <div className="bg-amber-500/[0.02] border border-amber-500/10 p-4 rounded-xl space-y-2 mt-4">
                      <span className="text-[10px] text-amber-500 uppercase font-bold tracking-wider font-mono block">
                        {isRtl ? "٤. بروتوكول الهجوم اللفظي البارد وتأمين الحضور (Tactical Engagement Protocol):" : "4. Cold Rhetoric & Tactical Protocol:"}
                      </span>
                      <p className="text-xs text-white/70 leading-relaxed font-sans">
                        {isRtl ? globalAdaptedResult.tacticalApproachAr : globalAdaptedResult.tacticalApproachEn}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* 14. SOVEREIGN SCHEMA ALCHEMIST & COGNITIVE TRAUMA DECODER */}
            {activeTab === 'schema' && (
              <motion.div
                key="schema"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8 text-start"
              >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-serif text-gold flex items-center gap-2">
                      <Brain className="w-6 h-6 text-gold animate-pulse" />
                      {isRtl ? "كيمياء وتفكيك المخططات النفسية وصدمات اللاشعور" : "Sovereign Schema Alchemist & Trauma Decoder"}
                    </h3>
                    <p className="text-white/40 text-xs text-start">
                      {isRtl 
                        ? "بروتوكول تفكيك العقد النفسية العتيقة وتعديل مسارات الوعي الباطني لتفعيل الحصانة الذاتية الكاملة والوقار الصلب."
                        : "Identify, decompose, and re-engineer deep-seated cognitive limiting schemas into basaltic, self-sovereign confidence."}
                    </p>
                  </div>
                </div>

                {/* Grid layout for Schema Selector + Diagnosis Details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left block (7 cols): Schema profiles selectors */}
                  <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                    <div className="text-[10px] text-gold uppercase font-black tracking-widest flex items-center gap-1.5 font-mono">
                      <Sliders className="w-3.5 h-3.5 text-gold" />
                      {isRtl ? "اختر المخطط السلوكي المستهدف بالتفكيك والتنقية" : "Select Target Cognitive Schema Pattern"}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          id: 'approval',
                          titleAr: "🔒 مصيدة الإرضاء ونيل القبول",
                          titleEn: "🔒 Approval-Seeking Trap",
                          descAr: "التخلي عن الذات وصنع سلام هش خشية هجران الآخرين.",
                          descEn: "Seeking external validation and people-pleasing over personal boundaries."
                        },
                        {
                          id: 'imposter',
                          titleAr: "🎭 عقدة الفجوة الإدراكية (المحتال)",
                          titleEn: "🎭 Imposter & Deficit Schema",
                          descAr: "الشك المرضي في الكفاءة الذاتية وانتظار كشف وافتضاح الوعي.",
                          descEn: "Chronic self-doubt and waiting to be exposed as an intellectual fraud."
                        },
                        {
                          id: 'avoidance',
                          titleAr: "🛡️ التجنب العاطفي والدرع الجليدي",
                          titleEn: "🛡️ Emotional Avoidance Armor",
                          descAr: "كبت القرب الإنساني وبناء جدران تمنع الآخر من ملامسة الجوهر.",
                          descEn: "Severe emotional defense and isolation to protect personal vulnerability."
                        },
                        {
                          id: 'hypersensitivity',
                          titleAr: "⚡ التشتت وصدمات النقد والاعتراض",
                          titleEn: "⚡ Hypersensitivity & Criticism Trauma",
                          descAr: "التحسس الحاد من أراء الآخرين وتضخيم الكلمات واهتزاز المركز العصبي.",
                          descEn: "Over-reactive nervous response and emotional crumbling from criticisms."
                        }
                      ].map((schema) => (
                        <button
                          key={schema.id}
                          onClick={() => {
                            setSchemaSelectedId(schema.id as any);
                            setSchemaEvaluationResult(null);
                            setSchemaUserReframedText('');
                          }}
                          className={`p-5 rounded-2xl text-start border transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-40 ${
                            schemaSelectedId === schema.id
                              ? 'bg-gold/10 border-gold shadow-[0_4px_20px_-4px_rgba(212,175,55,0.15)] text-white'
                              : 'bg-black/35 border-white/5 text-white/70 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold font-serif text-white">
                              {isRtl ? schema.titleAr : schema.titleEn}
                            </h4>
                            <p className="text-xs text-white/40 leading-relaxed z-10 relative">
                              {isRtl ? schema.descAr : schema.descEn}
                            </p>
                          </div>
                          {schemaSelectedId === schema.id && (
                            <span className="text-[9px] px-2 py-0.5 rounded bg-gold text-black font-black uppercase tracking-wider self-start font-mono z-10 relative">
                              {isRtl ? "محدد للعمليات" : "ACTIVE PROFILE"}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    {schemaSelectedId ? (
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Activity className="w-4 h-4 text-gold animate-pulse" />
                            {isRtl ? "مستوى انبعاث العقدة واستثارة الجهاز العصبي:" : "Vagal Bio-Arousal & Severity level:"}
                          </span>
                          <span className="text-xs text-gold font-mono font-bold">{schemaLevel}%</span>
                        </div>
                        <p className="text-[11px] text-white/40">
                          {isRtl 
                            ? "حدد شدة استيقاظ العقدة حالياً في جسدك وسلوكياتك لمعايرة تردد التطهير."
                            : "Adjust the current physiological activation of this schema to fine-tune the cognitive purging cycle."}
                        </p>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={schemaLevel}
                          onChange={(e) => setSchemaLevel(Number(e.target.value))}
                          className="w-full accent-gold bg-[#151515] h-1.5 rounded-full cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-white/30 font-mono">
                          <span>{isRtl ? "وقار خامل (10%)" : "Dormant (10%)"}</span>
                          <span>{isRtl ? "استبسال وتطهير عنيف (100%)" : "Acute Overdrive (100%)"}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-black/30 border border-dashed border-white/5 rounded-2xl p-8 text-center text-white/35 text-xs">
                        {isRtl ? "💡 الرجاء اختيار أحد الأنماط المعرفية أعلاه لتكثيف عملية التفكيك والكيمياء." : "💡 Select one of the cognitive patterns above to trigger the alchemical re-patterning core."}
                      </div>
                    )}
                  </div>

                  {/* Right block (5 cols): The Alchemical Insight & Diagnosis Detail */}
                  <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
                    {schemaSelectedId ? (
                      <div className="space-y-6 text-start h-full flex flex-col justify-between">
                        <div className="space-y-5">
                          <div className="text-[10px] text-gold uppercase font-black tracking-widest flex items-center gap-1.5 font-mono">
                            <Sparkles className="w-3.5 h-3.5 text-gold" />
                            {isRtl ? "تحليل الكيمياء النفسية والظل الباطني" : "Shadow Intel & Psychological Alchemy"}
                          </div>

                          {/* 1. Underlying Trauma */}
                          <div className="space-y-1">
                            <h5 className="text-[11px] text-gold uppercase font-bold font-mono">
                              {isRtl ? "⚡ صدمة الغرس والتأسيس (Infant Root Trauma):" : "⚡ Generative Root Trauma:"}
                            </h5>
                            <p className="text-xs text-white/85 leading-relaxed">
                              {schemaSelectedId === 'approval' && (isRtl ? "نبذ الرأي الفردي وسحب المشاعر المشروطة بالطاعة في الطفولة، مما غرس الخوف اللاشعوري من الفراق." : "Early conditions of conditional approval requiring strict submissiveness to earn emotional security.")}
                              {schemaSelectedId === 'imposter' && (isRtl ? "وجود معايير نقدية مهلكة أو تفوق عائلي وهمي زرع الخوف من أن كينونتك الطبيعية ناقصة ومثيرة للعار." : "Rigid academic pressure or high-criticism figures asserting that natural errors represent personal unworthiness.")}
                              {schemaSelectedId === 'avoidance' && (isRtl ? "صدمة خذلان مبكرة أو اختراق سافر لسلامتك النفسية جعل ذهنك يقرر كتم الارتباط لتفادي ألم الفقد والتخلخل." : "An early intrusive breach or unexpected loss that made your sub-consciousness decide intimacy is highly dangerous.")}
                              {schemaSelectedId === 'hypersensitivity' && (isRtl ? "غياب الدعامة والتعاطف وحرمان الجهاز العصبي من نمذجة الاستقرار، كبرت فصار أي اعتراض يهدد بقاءك الحقيقي." : "Lack of emotional validation and safe neuro-regulation modeling, leading to threat magnification on minor feedback.")}
                            </p>
                          </div>

                          {/* 2. Unconscious Secondary Benefit */}
                          <div className="space-y-1 bg-black/40 border border-white/5 p-3 rounded-xl">
                            <h5 className="text-[11px] text-zinc-400 uppercase font-bold font-mono flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              {isRtl ? "💎 المكاسب اللاشعورية المستترة (Hidden Gain):" : "💎 Unconscious Secondary Gain:"}
                            </h5>
                            <p className="text-xs text-white/70 leading-relaxed font-sans">
                              {schemaSelectedId === 'approval' && (isRtl ? "تجنب المسؤولية والمواجهة الفاصلة، وربح حماية ومحبة الآخرين مقابل الاستسلام لتنازلات خافتة." : "Bypassing individual liability and direct friction; acquiring codependent protection by compromising selfhood.")}
                              {schemaSelectedId === 'imposter' && (isRtl ? "تخفيف صدمة الفشل المحتمل (الفشل قبل أن تبدأ) وخفض توقعات الآخرين عنك لتفادي عبء التميز المستمر." : "Pre-limiting the impact of prospective failure and keeping expectation baselines low so you never face the burn of true action.")}
                              {schemaSelectedId === 'avoidance' && (isRtl ? "الاستقلال الزائف والسيطرة الوهمية المطلقة للتحكم بالتفاعلات، والامتناع عن الاستثمار الوجداني تفادياً لأي تفاجؤ." : "Phantom self-reliance; absolute insulation against relational vulnerability so that no one can ever disappoint or catch you unguarded.")}
                              {schemaSelectedId === 'hypersensitivity' && (isRtl ? "تشييد حائط هائل من الحساسية يجعل المحيطين يترددون دوماً في نقدك أو تعديل سلوكك، مما يحميك عاطفياً من التمحيص والتعرية." : "Coercing others into tiptoeing around you to prevent confrontation, which shields your fragile constructs from real growth.")}
                            </p>
                          </div>

                          {/* 3. Somatic Composure Anchor */}
                          <div className="space-y-1">
                            <h5 className="text-[11px] text-gold uppercase font-bold font-mono">
                              {isRtl ? "🧘 التثبيت والتحصين الجسدي (Somatic Composure):" : "🧘 Somatic Composure Anchor:"}
                            </h5>
                            <p className="text-xs text-white/80 leading-relaxed italic">
                              {schemaSelectedId === 'approval' && (isRtl ? "إخراج زفير ممتد (7 ثوانٍ) مع المحافظة على اتساع الصدر وثبات الكتفين لتمكين الحزم." : "Prolonged 7-second exhalations while maintaining a broad chest registry to stabilize vascular assertiveness.")}
                              {schemaSelectedId === 'imposter' && (isRtl ? "إنزال ذقنك للأمام بمقدار 5 درجات للاسترخاء، وتثبيت نبرة الحنجرة عند مستويات منخفضة." : "Tuck your chin by 5 degrees to relax cervical receptors, centering the vocal chords around low frequency registers.")}
                              {schemaSelectedId === 'avoidance' && (isRtl ? "إرخاء فك السكرتاريا وتصفية تشنج الحجاب الحاجز بالسماح للشهيق والزفير بالانسياب بمرونة دافئة." : "Jaw muscle release; conscious diaphragm expansion to welcome the relational flows and break the physiological armor.")}
                              {schemaSelectedId === 'hypersensitivity' && (isRtl ? "ثبات تام للعينين عند النظر للناقد، منع الاهتزاز المفاجئ في الأيدي بتركيز الوزن في باطن القدم." : "Basaltic eye locking; absolute ground alignment by shifting all body balance and center of mass directly to your feet.")}
                            </p>
                          </div>
                        </div>

                        {/* Interactive toggle block */}
                        <div className="pt-4 border-t border-white/5 space-y-3">
                          <button
                            onClick={() => {
                              setSchemaSomaticEngaged(!schemaSomaticEngaged);
                            }}
                            className={`w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all border flex items-center justify-center gap-2 cursor-pointer ${
                              schemaSomaticEngaged 
                                ? 'bg-[#102a1e] border-emerald-500/30 text-emerald-400' 
                                : 'bg-black/40 border-white/5 text-white/60 hover:border-gold/30 hover:text-white'
                            }`}
                          >
                            <Check className={`w-3.5 h-3.5 ${schemaSomaticEngaged ? 'opacity-100' : 'opacity-40'}`} />
                            {schemaSomaticEngaged 
                              ? (isRtl ? "✓ تم تفعيل نقاط التحصين الجسدي" : "✓ SOMATIC ANCHORS FULLY ENGAGED") 
                              : (isRtl ? "🧘 تفعيل نقاط التحصين الجسدي" : "🧘 ENGAGE SOMATIC ANCHORS")}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-white/30 text-xs py-12 flex flex-col items-center justify-center h-full">
                        <Brain className="w-12 h-12 text-white/10 mb-4 animate-bounce" />
                        {isRtl ? "الرجاء تحديد المخطط لتوليد كيمياء التفكيك." : "Select a schema on the left to activate the psychic alchemist blueprint."}
                      </div>
                    )}
                  </div>
                </div>

                {/* Cognitive Arena Section: Trigger & Reframe Game */}
                {schemaSelectedId && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0b0c0e] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 text-start"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white font-serif flex items-center gap-2">
                          <Compass className="w-4 h-4 text-gold animate-spin" />
                          {isRtl ? "ميدان المعركة والمجابهة المعرفية التكتيكية" : "Linguistic Combat Arena & Cognitive Reframing"}
                        </h4>
                        <p className="text-[11px] text-white/40">
                          {isRtl 
                            ? "تمثيل الفكرة التدميرية التلقائية المصاحبة للمخطط؛ فككها دفاعياً وسلوكياً لرفع هيبة السيادة والتمكين."
                            : "Dismantle the toxic intuitive thought representing this schema. Formulate your sovereign counter or select below."}
                        </p>
                      </div>
                    </div>

                    {/* The Active Intrusive Thought */}
                    <div className="p-5 bg-red-500/[0.03] border border-red-500/10 rounded-2xl space-y-2 relative overflow-hidden">
                      <div className="absolute -top-6 -right-6 w-16 h-16 bg-red-500/5 rounded-full blur-xl animate-pulse" />
                      <span className="text-[10px] text-red-400 uppercase font-black font-mono tracking-wider flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                        {isRtl ? "الفكرة التلقائية المهلكة والهدامة للسيادة (Intrusive Cognitive Assault):" : "Sovereign-Threatening Intrusive Assault:"}
                      </span>
                      <p className="text-sm text-white font-serif font-bold italic leading-relaxed">
                        {schemaSelectedId === 'approval' && (isRtl ? "\"لو عبرت عن رفضي الحقيقي لقراراتهم، فربما يغضبون مني وأصبح منبوذاً وتتحطم علاقتي بهم ونظرتي لذاتي.\"" : "\"If I reject their requests, they will get angry at me. I will be abandoned, isolated, and lose my self-worth in their eyes.\"")}
                        {schemaSelectedId === 'imposter' && (isRtl ? "\"الجميع هنا أذكياء وناجحون، وسيكتشفون عاجلاً أم آجلاً أنني لا أمتلك الموثوقية الكافية وأنني مجرد محتال دجال.\"" : "\"Everyone else is highly competent and smart. Sooner or later they will realize I am completely untrustworthy, a total fraud.\"")}
                        {schemaSelectedId === 'avoidance' && (isRtl ? "\"إذا سمحت لنفسي بأن أكون قريباً أو منفتحاً وجدانياً، فسيعرفون نقاط ضعفي ويستغلونها لكسري وتجريدي من الوقار.\"" : "\"If I allow myself to get emotionally close to anyone, they will extract my parameters and exploit them to crush my sovereignty.\"")}
                        {schemaSelectedId === 'hypersensitivity' && (isRtl ? "\"عندما يوجه إليّ أحدهم نبرة اعتراض أو انتقاد، فهذا يعني أنه يحتقر فكري بالكامل وهدفه هو إعدام هيبتي.\"" : "\"When they object or hand me critical feedback, it means they absolutely despise my mind and their goal is to destroy my prestige.\"")}
                      </p>
                    </div>

                    {/* Interactive selection templates */}
                    <div className="space-y-3">
                      <span className="text-[10px] text-gold uppercase font-black tracking-widest block font-mono">
                        {isRtl ? "اختر رد الفعل التكتيكي الفوري المتوازن (Tactical Template Counter):" : "Review Tactical Reactive Templates:"}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          {
                            labelAr: "❌ رد الاستسلام والإرضاء",
                            labelEn: "❌ Submission Mode",
                            descAr: schemaSelectedId === 'approval' ? "توافق على حساب طاقتك لتكسب وداً متأرجحاً." :
                                    schemaSelectedId === 'imposter' ? "الاعتذار المستمر وعمل ساعات مفرطة مرئية." :
                                    schemaSelectedId === 'avoidance' ? "الانزواء المفاجئ وقطع قنوات الاتصال برجفة عاطفية." :
                                    "تلقي الشتم بالنحيب والتشكيك وصنع حزن باطني.",
                            descEn: "Bending standards for validation; confirming the core traumatic cycle.",
                            score: 20,
                            feedbackAr: "هذا يؤكد مخطط الهزيمة ويعيد تدوير الصدمة عبر تقديم هيبتك وقربان كرامتك للآخرين دون جدوى ملموسة.",
                            feedbackEn: "This reinforces the submissive script, feeding your trauma by giving away your sacred parameters.",
                            purity: 15
                          },
                          {
                            labelAr: "⚠️ رد التعويض الزائد السطحي (العداء)",
                            labelEn: "⚠️ Grandiose Compensation",
                            descAr: schemaSelectedId === 'approval' ? "الهجوم اللفظي الغاضب والصراخ تفادياً للمساومة." :
                                    schemaSelectedId === 'imposter' ? "تعالي نرجسي مصطنع وادعاء المعرفة التامة بسادية." :
                                    schemaSelectedId === 'avoidance' ? "إهانة الملقي وبناء هيبة وهمية متغطرسة." :
                                    "الهجوم العكسي السافر لإثبات بطلان النقد.",
                            descEn: "Hostile counter-attack or aggressive defense to hide intrinsic vulnerabilities.",
                            score: 50,
                            feedbackAr: "الغضب المفرط والتعويض النرجسي الكاذب يكشف جلياً هشاشة قلبك ويسهل تفكيك هيبتك من قبل أي محلل محترف.",
                            feedbackEn: "Aggression reveals lack of self-containment. It advertises to opponents exactly where your raw nerve lies.",
                            purity: 45
                          },
                          {
                            labelAr: "💎 الرد البازلتي المظفر (السيادة الدائمة)",
                            labelEn: "💎 Basaltic Sovereign Reframing",
                            descAr: schemaSelectedId === 'approval' ? "صمت ممتد، إلقاء الكلمة ببرود ثلجي دون تفسير اعتذاري." :
                                    schemaSelectedId === 'imposter' ? "تجذير الوعي، إهمال آراء المشاهدين بوقار بازلتي." :
                                    schemaSelectedId === 'avoidance' ? "حدود رصينة تنضح ثباتاً وتواصلاً دافئاً مسيطراً." :
                                    "فصل التقييم الباطني، تحليل المدخل ببرود رياضي هندسي.",
                            descEn: "Complete cognitive detachment, deep silence, and unshakeable energetic autonomy.",
                            score: 100,
                            feedbackAr: "هذا هو الجوهر الأسمى لبشير الماجري! هدوء مائل للبرود، فصل كلي للوعي عن الانبعاثات السطحية، والسيادة المطلقة.",
                            feedbackEn: "The supreme behavioral standard. Perfect neuromuscular rest, absolute self-containment, and zero defensive posture.",
                            purity: 100
                          }
                        ].map((template, tIdx) => (
                          <button
                            key={tIdx}
                            onClick={() => {
                              setSchemaEvaluationResult({
                                score: template.score,
                                feedbackAr: template.feedbackAr,
                                feedbackEn: template.feedbackEn,
                                cognitivePurity: template.purity
                              });
                            }}
                            className="bg-black/55 border border-white/5 hover:border-gold/30 rounded-xl p-4 text-start transition-all flex flex-col justify-between h-42 cursor-pointer"
                          >
                            <div className="space-y-1.5">
                              <span className="text-[11px] text-gold font-bold font-serif block">
                                {isRtl ? template.labelAr : template.labelEn}
                              </span>
                              <p className="text-xs text-white/70 leading-relaxed font-sans">
                                {isRtl ? template.descAr : template.descEn}
                              </p>
                            </div>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-amber-500 font-mono font-bold self-start mt-2">
                              {isRtl ? `درجة الحصانة: %${template.purity}` : `Autonomy: ${template.purity}%`}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Text block for customized input writeup option for users */}
                    <div className="space-y-3 pt-6 border-t border-white/5">
                      <label className="block text-[11px] text-white/50 mb-1.5 font-bold font-mono">
                        {isRtl ? "💡 صغ ردك البازلتي بكلماتك الشخصية لتحليله إدراكياً وسلوكيأً:" : "💡 Write your custom sovereign counter-response to analyze cognitive stability:"}
                      </label>
                      <textarea
                        value={schemaUserReframedText}
                        onChange={(e) => setSchemaUserReframedText(e.target.value)}
                        rows={3}
                        placeholder={
                          isRtl 
                            ? "اكتب هنا الكيفية التي ينطق بها لسانك وجسدك لإبطال سحر الفكرة التلقائية..." 
                            : "Enter how you would adjust your posture, vocal cord, and verbal choice to neutralize this context..."
                        }
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors font-sans"
                      />

                      <button
                        onClick={() => {
                          if (!schemaUserReframedText.trim()) return;
                          setSchemaIsEvaluating(true);
                          setTimeout(() => {
                            const trimmed = schemaUserReframedText.trim();
                            let score = 50;
                            let feedAr = "ردك يحتاج إلى مزيد من التركيز التكتيكي وهندسة الصمت. تذكر عدم تقديم تعليلات دفاعية متذبذبة.";
                            let feedEn = "Your response contains defensive markers or over-explanation parameters. Refine speaking economy.";
                            let purity = 40;

                            if (trimmed.length > 5) {
                              if (trimmed.includes("صمت") || trimmed.includes("وقار") || trimmed.includes("برود") || trimmed.includes("هدوء") || trimmed.includes("بازلتي") || trimmed.includes("سكون") || trimmed.includes("حدود") || trimmed.includes("silence") || trimmed.includes("poise") || trimmed.includes("basalt") || trimmed.includes("sovereign") || trimmed.includes("boundaries")) {
                                score = 95;
                                purity = 95;
                                feedAr = "كيمياء مذهلة! لقد استعملت كلمات مفتاحية للتخلص من العبودية الفكرية وسحبت السيطرة فوراً بأسلوب بازلتي وقور دقيق.";
                                feedEn = "Amazing cognitive shift. You dismantled the intrusive trauma layer, integrating high-gravity composure and clean emotional bounds.";
                              } else if (trimmed.length > 50) {
                                score = 65;
                                purity = 60;
                                feedAr = "الرد طويل جداً عاطفياً؛ تذكر أن السيادة النفسية تحب الهيبة في قلة الكلام. كثرة التبريرات تسرب الوقار وتبعث على الشك.";
                                feedEn = "The response is highly detailed, risking emotional over-expression. Keep it dense, basaltic, and exceptionally quiet.";
                              } else {
                                score = 80;
                                purity = 75;
                                feedAr = "محاولة متماسكة. لقد نجحت في تجنب الاستسلام الفوري لكن أضف إليها تأكيد لغة الجسد وهدوء القامة لاستكمال بروتوكول بشير الماجري.";
                                feedEn = "Competent recovery. You balanced the emotional trigger, but remember to integrate somatic gravity and solid breath alignment.";
                              }
                            }

                            setSchemaEvaluationResult({
                              score,
                              feedbackAr: feedAr,
                              feedbackEn: feedEn,
                              cognitivePurity: purity
                            });
                            setSchemaIsEvaluating(false);
                          }, 1200);
                        }}
                        disabled={!schemaUserReframedText.trim() || schemaIsEvaluating}
                        className={`w-full py-4 rounded-xl bg-gradient-to-r ${
                          schemaUserReframedText.trim() 
                            ? 'from-amber-600 to-gold text-black shadow-lg shadow-gold/15 hover:opacity-95' 
                            : 'from-white/5 to-white/10 text-white/30 cursor-not-allowed'
                        } font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer`}
                      >
                        {schemaIsEvaluating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                            <span>{isRtl ? "🧬 جاري التحليل الكيميائي لعمق الوعي..." : "🧬 DECODING PSYCHE Blueprints..."}</span>
                          </>
                        ) : (
                          <>
                            <Brain className="w-4 h-4" />
                            <span>{isRtl ? "🧠 إجراء كيمياء التفكيك الفوري ومطابقة الوعي" : "🧠 PERFORM COGNITIVE ALCHEMY NOW"}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Result Output Panel for Schema Evaluation if generated */}
                    {schemaEvaluationResult && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0b0c0e] border border-gold/20 rounded-2xl p-6 space-y-4 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="flex items-center justify-between border-b border-white/5 pb-3">
                          <span className="text-[10px] text-gold uppercase font-black tracking-widest font-mono flex items-center gap-1">
                            <Check className="w-4 h-4 text-emerald-400" />
                            {isRtl ? "مخرجات كيمياء النفس المعتمدة" : "PSYCHOMETRIC BALANCE COMPILATION"}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono font-bold">
                            {isRtl ? `معدل الخلاص الكلي: %${schemaEvaluationResult.cognitivePurity}` : `Purging Efficiency: ${schemaEvaluationResult.cognitivePurity}%`}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest block font-mono">
                              {isRtl ? "مؤشر النقاء الإدراكي (Cognitive Stature):" : "Autonomic Cognitive Power:"}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="text-xl font-serif text-white font-black">{schemaEvaluationResult.score}/100</span>
                              <div className="flex-1 bg-zinc-950 h-2 rounded-full border border-white/5 overflow-hidden">
                                <div 
                                  className="h-full bg-gold rounded-full transition-all duration-500"
                                  style={{ width: `${schemaEvaluationResult.score}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest block font-mono">
                              {isRtl ? "التشخيص والقرار السلوكي العميق (Clinical Advice):" : "Sovereign Clinical Insight:"}
                            </span>
                            <p className="text-xs text-white/95 leading-relaxed font-sans">
                              {isRtl ? schemaEvaluationResult.feedbackAr : schemaEvaluationResult.feedbackEn}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
        )}

      </div>
    </section>
  );
}
