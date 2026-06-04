/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  ArrowRight, 
  CheckCircle2, 
  Github, 
  Globe, 
  Layers, 
  Layout, 
  Menu, 
  MessageSquare, 
  Monitor, 
  Tv,
  Phone, 
  Zap,
  X,
  Play,
  Video,
  Users,
  BookOpen,
  QrCode,
  Palette,
  Music,
  History,
  Feather,
  Cloud,
  Lock,
  Search,
  Filter,
  Share2,
  Heart,
  Quote,
  Facebook,
  Mail,
  Languages,
  Link as LinkIcon,
  Check,
  Loader2,
  FileDown,
  FileText,
  RefreshCcw,
  User,
  Building,
  Brain,
  Bookmark,
  Orbit,
  Star,
  MessageCircle,
  Cpu,
  Sparkles,
  Upload
} from "lucide-react";
import React, { useState, useRef, useMemo, useEffect, FormEvent, RefObject, MouseEvent } from "react";
import { GoogleGenAI, Type } from "@google/genai";
import { 
  translations, 
  Language,
  Translation
} from "./translations";
import { researchData, ResearchItem } from "./researchContent";
import { AIAssistant } from "./components/AIAssistant";
import { RatingSystem } from "./components/RatingSystem";
import { VideoSection } from "./components/VideoSection";
import { PromoCommercial } from "./components/PromoCommercial";
import { PsychologicalAssessment } from "./components/PsychologicalAssessment";
import { DailySovereigntyQuote } from "./components/DailySovereigntyQuote";
import { ManifestoSection } from "./components/ManifestoSection";
import { BookReader } from "./components/BookReader";
import { AIResearchNexus } from "./components/AIResearchNexus";
import { PathFinder } from "./components/PathFinder";
import { OrbitalSymbol } from "./components/OrbitalSymbol";
import { FounderSignature } from "./components/FounderSignature";
import { SovereigntyRebalancer } from "./components/SovereigntyRebalancer";
import { ConsultationForm } from "./components/ConsultationForm";
import { SovereigntyInnovationHub } from "./components/SovereigntyInnovationHub";
import { TvSyncModal } from "./components/TvSyncModal";
import { PlatformQrModal } from "./components/PlatformQrModal";

const SUPPORTED_LANGUAGES = [
  { code: 'ar', name: 'العربية', native: 'العربية' },
  { code: 'en', name: 'English', native: 'English' },
  { code: 'fr', name: 'Français', native: 'Français' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'zh', name: 'Chinese', native: '中文' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'fa', name: 'Persian', native: 'فارسي' },
];
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDoc,
  getDocFromServer,
  limit
} from "firebase/firestore";
import { db, auth, ensureAuth } from "./lib/firebase";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

const IconMapper: Record<string, any> = {
  User,
  MessageSquare,
  Lock,
  Heart,
  Zap,
  Search,
  Users,
  History,
  Layers,
  Globe,
  BookOpen,
  Building,
  Monitor,
  Phone,
  Brain,
  Bookmark,
  Orbit,
  Star
};

function ResearchIcon({ name, className }: { name: string, className?: string }) {
  const IconComponent = IconMapper[name] || BookOpen;
  return <IconComponent className={className} />;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function PsychologicalInsight({ t }: { t: any }) {
  const [insight, setInsight] = useState<any>(null);

  useEffect(() => {
    const randomInsight = t.quotes[Math.floor(Math.random() * t.quotes.length)];
    setInsight(randomInsight);
  }, [t.quotes]);

  if (!insight) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gold/5 border border-gold/10 p-8 md:p-12 relative overflow-hidden group mb-12"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Orbit className="w-12 h-12 text-gold animate-spin-slow" />
      </div>
      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/60 mb-6">{t.insightTitle}</h4>
      <p className="text-xl md:text-2xl font-serif text-white italic mb-6 leading-relaxed">
        "{insight.text}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-px bg-gold/30" />
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">{insight.author}</span>
      </div>
    </motion.div>
  );
}

function ResearchStats({ researchId, t, isRtl }: { researchId: string, t: any, isRtl: boolean }) {
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    if (!researchId) return;

    const likesRef = collection(db, "researches", researchId, "likes");
    const unsubLikes = onSnapshot(likesRef, (snapshot) => {
      setLikesCount(snapshot.size);
    }, (error) => handleFirestoreError(error, OperationType.LIST, `researches/${researchId}/likes`));

    const commentsRef = collection(db, "researches", researchId, "comments");
    const unsubComments = onSnapshot(commentsRef, (snapshot) => {
      setCommentsCount(snapshot.size);
    }, (error) => handleFirestoreError(error, OperationType.LIST, `researches/${researchId}/comments`));

    return () => {
      unsubLikes();
      unsubComments();
    };
  }, [researchId]);

  return (
    <div className="flex items-center gap-4 text-[10px] uppercase font-black tracking-widest text-white/30">
      <div className="flex items-center gap-1.5 group-hover:text-gold transition-colors">
        <Heart className="w-3 h-3" />
        <span>{likesCount} {t.interactionLikes}</span>
      </div>
      <div className="flex items-center gap-1.5 group-hover:text-gold transition-colors">
        <MessageSquare className="w-3 h-3" />
        <span>{commentsCount} {t.interactionComments}</span>
      </div>
    </div>
  );
}

function InteractionSection({ researchId, researchTitle, t, currentLang, savedIds, toggleSave }: { 
  researchId: string, 
  researchTitle: string, 
  t: any,
  currentLang: string,
  savedIds?: string[],
  toggleSave?: (id: string) => void
}) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!researchId) return;

    let mounted = true;
    let currentCleanup: (() => void) | undefined;

    const setupListeners = (userId?: string) => {
      if (!mounted) return;
      
      const commentsRef = collection(db, "researches", researchId, "comments");
      const q = query(commentsRef, orderBy("createdAt", "desc"));
      
      const unsubComments = onSnapshot(q, (snapshot) => {
        if (!mounted) return;
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(docs);
      }, (error) => handleFirestoreError(error, OperationType.LIST, `researches/${researchId}/comments`));

      const likesRef = collection(db, "researches", researchId, "likes");
      const unsubLikes = onSnapshot(likesRef, (snapshot) => {
        if (!mounted) return;
        setLikesCount(snapshot.size);
        if (userId) {
          setIsLiked(snapshot.docs.some(doc => doc.id === userId));
        }
      }, (error) => handleFirestoreError(error, OperationType.LIST, `researches/${researchId}/likes`));

      return () => {
        unsubComments();
        unsubLikes();
      };
    };

    // Initial setup
    currentCleanup = setupListeners(auth.currentUser?.uid);

    // React to auth state changes
    const authUnsubscribe = auth.onAuthStateChanged((user) => {
      if (mounted) {
        if (currentCleanup) currentCleanup();
        currentCleanup = setupListeners(user?.uid);
      }
    });

    return () => {
      mounted = false;
      if (currentCleanup) currentCleanup();
      authUnsubscribe();
    };
  }, [researchId]);

  const handleLike = async (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const user = await ensureAuth() as any;
      if (!user) {
        alert(t.anonAuthNotice);
        return;
      }

      const likeRef = doc(db, "researches", researchId, "likes", user.uid);
      if (isLiked) {
        await deleteDoc(likeRef);
      } else {
        await setDoc(likeRef, {
          userId: user.uid,
          createdAt: serverTimestamp()
        });
      }
    } catch (error: any) {
      if (error?.code === 'permission-denied') {
         alert(t.permissionDenied);
      }
      handleFirestoreError(error, OperationType.WRITE, `researches/${researchId}/likes`);
    }
  };

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;
    
    setIsSubmitting(true);
    try {
      const user = await ensureAuth() as any;
      if (!user) {
        alert(t.anonAuthNotice);
        return;
      }
      
      await addDoc(collection(db, "researches", researchId, "comments"), {
        authorName: authorName.trim(),
        content: newComment.trim(),
        createdAt: serverTimestamp(),
        userId: user.uid
      });
      setNewComment("");
      setAuthorName("");
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `researches/${researchId}/comments`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 border-t border-white/10 pt-12">
      <div className="flex flex-wrap items-center gap-6 mb-12">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${
            isLiked 
              ? "bg-gold/10 border-gold text-gold" 
              : "border-white/10 text-white/40 hover:border-white/30"
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          <span className="text-sm font-bold">{likesCount} {t.interactionLikes}</span>
        </button>
        <div className="flex items-center gap-3 text-white/40 bg-white/5 px-6 py-3 rounded-full border border-white/5">
          <MessageSquare className="w-5 h-5" />
          <span className="text-sm font-bold">{comments.length} {t.interactionComments}</span>
        </div>
        <button 
          onClick={() => toggleSave?.(researchId)}
          className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${
            savedIds?.includes(researchId)
              ? "bg-gold text-black border-gold" 
              : "border-white/10 text-white/40 hover:border-white/30"
          }`}
        >
          <Bookmark className={`w-5 h-5 ${savedIds?.includes(researchId) ? "fill-current" : ""}`} />
          <span className="text-sm font-bold">
            {savedIds?.includes(researchId) ? t.removeSave : t.saveCta}
          </span>
        </button>
      </div>

      <div className="space-y-8 mb-12">
        <h4 className="text-xl font-serif text-white italic">{t.interactionTitle}</h4>
        
        <form onSubmit={handleComment} className="bg-white/5 p-8 border border-white/5 space-y-4">
          <input 
            type="text"
            placeholder={t.commentPlaceholderName}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-4 text-white outline-none focus:border-gold/30 transition-all text-sm"
            required
          />
          <textarea 
            placeholder={t.commentPlaceholderContent}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full bg-black/40 border border-white/10 p-4 text-white outline-none focus:border-gold/30 transition-all text-sm min-h-[120px] resize-none"
            required
          />
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gold text-black py-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50"
          >
            {isSubmitting ? t.commentSubmitting : t.commentSubmit}
          </button>
        </form>

        <div className="space-y-6">
          {comments.map((comment, i) => (
            <motion.div 
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-white/5 pb-6"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-gold text-xs font-bold font-serif">{comment.authorName}</span>
                <span className="text-[10px] text-white/20 uppercase tracking-widest">
                  {comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleDateString('ar-TN') : '...'}
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{comment.content}</p>
            </motion.div>
          ))}
          {comments.length === 0 && (
            <p className="text-center text-white/20 italic py-8 border border-white/5 border-dashed">{t.noComments}</p>
          )}
        </div>
      </div>
    </div>
  );
}


function QuoteSection({ t }: { t: any }) {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    if (!t.quotes || t.quotes.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % t.quotes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [t.quotes?.length]);

  if (!t.quotes || !t.quotes[currentQuote]) return null;

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/50 rounded-full" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 mb-10 text-gold/20">
              <Quote className="w-full h-full rotate-180" />
            </div>
            <blockquote className="text-2xl md:text-4xl font-serif text-white italic leading-relaxed mb-8">
              "{t.quotes[currentQuote].text}"
            </blockquote>
            <cite className="text-gold font-serif text-lg not-italic">— {t.quotes[currentQuote].author}</cite>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

const globalHubLinks = [
  { name: "American Psychological Association (APA)", url: "https://www.apa.org" },
  { name: "British Psychological Society (BPS)", url: "https://www.bps.org.uk" },
  { name: "Psychology Today Global", url: "https://www.psychologytoday.com" },
  { name: "National Institute of Mental Health", url: "https://www.nimh.nih.gov" }
];

const psychologicalPillars = [
  {
    title: { ar: "لغة الجسد", en: "Body Language", fr: "Langage Corporel" },
    description: { 
      ar: "تحليل الحركات اللاإرادية وفك شفرات الوجوه والعيون.",
      en: "Analysis of involuntary movements and decoding faces and eyes.",
      fr: "Analyse des mouvements involontaires et décodage des visages et des yeux."
    },
    icon: <Users className="w-6 h-6" />,
    color: "text-gold"
  },
  {
    title: { ar: "الذكاء الاجتماعي", en: "Social Intelligence", fr: "Intelligence Sociale" },
    description: { 
      ar: "مهارات بناء العلاقات والتعامل مع الشخصيات الصعبة.",
      en: "Relationship building skills and dealing with difficult personalities.",
      fr: "Compétences relationnelles et gestion des personnalités difficiles."
    },
    icon: <Zap className="w-6 h-6" />,
    color: "text-blue-400"
  },
  {
    title: { ar: "التحليل السلوكي", en: "Behavioral Analysis", fr: "Analyse Comportementale" },
    description: { 
      ar: "فهم الدوافع الخفية وراء التصرفات البشرية اليومية.",
      en: "Understanding the hidden motives behind daily human actions.",
      fr: "Comprendre les motivations cachées derrière les actions humaines quotidiennes."
    },
    icon: <Search className="w-6 h-6" />,
    color: "text-purple-400"
  },
  {
    title: { ar: "التطوير الذاتي", en: "Self-Development", fr: "Développement Personnel" },
    description: { 
      ar: "استراتيجيات بناء الثقة والتحرر من صدمات الماضي.",
      en: "Confidence-building strategies and liberation from past traumas.",
      fr: "Stratégies de confiance en soi et libération des traumatismes passés."
    },
    icon: <Zap className="w-6 h-6" />,
    color: "text-emerald-400"
  }
];

function RelatedResearch({ currentId, currentLang, onSelect, t }: { currentId: string, currentLang: Language, onSelect: (r: ResearchItem) => void, t: any }) {
  const related = useMemo(() => {
    return researchData
      .filter(r => r.id !== currentId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  }, [currentId]);

  return (
    <div className="mt-20 pt-16 border-t border-white/10">
      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gold/40 mb-12">
        {t.recommendedResearch}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map(research => (
          <div 
            key={research.id} 
            onClick={() => onSelect(research)}
            className="group cursor-pointer p-6 bg-white/[0.02] border border-white/5 hover:border-gold/30 transition-all"
          >
            <span className="text-[9px] text-gold uppercase tracking-widest block mb-4">{(research.category as any)[currentLang] || (research.category as any)['ar']}</span>
            <h5 className="text-white font-serif text-lg leading-tight group-hover:text-gold transition-colors italic">
              {(research.title as any)[currentLang] || (research.title as any)['ar']}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReadingProgressBar({ scrollRef }: { scrollRef: RefObject<HTMLDivElement | null> }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = element;
      const windowHeight = scrollHeight - clientHeight;
      const currentProgress = (scrollTop / windowHeight) * 100;
      setProgress(currentProgress);
    };

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[110] pointer-events-none">
      <motion.div 
        className="h-full bg-gold"
        style={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}

export default function App() {
  const [selectedResearch, setSelectedResearch] = useState<any>(null);
  const [isZenMode, setIsZenMode] = useState(false);
  const [isTvModalOpen, setIsTvModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [showVideoLibrary, setShowVideoLibrary] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [selectedBookType, setSelectedBookType] = useState<'bechir' | 'hazimi'>('bechir');
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const isParamAdmin = params.get('admin') === 'true' || params.has('bechir') || params.get('passcode') === 'esteqem2026';
      if (isParamAdmin) {
        localStorage.setItem('admin_session', 'true');
        return true;
      }
      return localStorage.getItem('admin_session') === 'true';
    }
    return false;
  });

  const [bechirAvatar, setBechirAvatar] = useState<string>("/src/assets/images/bechir_exact_reproduction_1780526872274.png");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "images"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().bechirAvatar) {
        setBechirAvatar(docSnap.data().bechirAvatar);
      }
    }, (err) => {
      console.error("Error loading custom settings images:", err);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || params.has('bechir') || params.get('passcode') === 'esteqem2026') {
      localStorage.setItem('admin_session', 'true');
      setIsAdmin(true);
    }
    if (params.get('role') === 'remote' && params.has('pin')) {
      setIsTvModalOpen(true);
    }
  }, []);

  // Notification setup diagnostics state
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyConfigStatus, setVerifyConfigStatus] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);
  const [testSending, setTestSending] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  // Admin Custom Dashboard States
  const [adminTab, setAdminTab] = useState<'avatar' | 'diagnostics' | 'test'>('avatar');
  const [uploading, setUploading] = useState(false);
  const [tempAvatar, setTempAvatar] = useState<string>("");
  const [passcodeForm, setPasscodeForm] = useState("");
  const [adminSuccessMsg, setAdminSuccessMsg] = useState("");
  const [adminErrorMsg, setAdminErrorMsg] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAdminSuccessMsg("");
    setAdminErrorMsg("");

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 500;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          setTempAvatar(dataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAvatar = async () => {
    if (!tempAvatar) return;
    setUploading(true);
    setAdminSuccessMsg("");
    setAdminErrorMsg("");
    try {
      const configRef = doc(db, "settings", "images");
      await setDoc(configRef, {
        bechirAvatar: tempAvatar,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setAdminSuccessMsg("✓ تم حفظ ونشر صورتك الجديدة بنجاح على كامل المنصة دون الحاجة لأي كود!");
    } catch (error: any) {
      console.error("Error saving avatar:", error);
      setAdminErrorMsg("فشل حفظ الصورة: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleResetAvatar = async () => {
    setUploading(true);
    setAdminSuccessMsg("");
    setAdminErrorMsg("");
    try {
      const configRef = doc(db, "settings", "images");
      await setDoc(configRef, {
        bechirAvatar: "/src/assets/images/bechir_exact_reproduction_1780526872274.png",
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setTempAvatar("");
      setAdminSuccessMsg("✓ تم إعادة تعيين صورة الهوية إلى الصورة الرسمية الأصلية بنجاح.");
    } catch (error: any) {
      console.error("Error resetting avatar:", error);
      setAdminErrorMsg("فشل فك تعيين الصورة: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleVerifyNotifications = async () => {
    setVerifying(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/verify-notifications');
      const data = await res.json();
      setVerifyConfigStatus(data);
    } catch (err: any) {
      console.error(err);
      setVerifyConfigStatus({ error: err.message || "فشل في الاتصال بواجهة تشخيص الإشعارات" });
    } finally {
      setVerifying(false);
    }
  };

  const handleSendTestNotification = async () => {
    setTestSending(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/test-notification', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setTestResult({ success: true, message: data.message });
      } else {
        setTestResult({ success: false, message: data.error || "فشل إرسال الإشعار التجريبي" });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: err.message || "خطأ في الشبكة أثناء إرسال البريد" });
    } finally {
      setTestSending(false);
    }
  };

  const triggerAI = (prompt: string) => {
    window.dispatchEvent(new CustomEvent('trigger-ai-assistant', { 
      detail: { prompt, isOpen: true } 
    }));
  };

  const handleCopyLink = async () => {
    // The specific public URL requested by the user
    const publicUrl = "https://madarat-al-nafs-534883887954.europe-west2.run.app";
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(publicUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = publicUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      }
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  useEffect(() => {
    // Immediate Visitor Notification Trigger (Runs instantly, independent of Firebase connection status)
    const triggerVisitorNotification = () => {
      try {
        const hasNotified = sessionStorage.getItem('visitor_notified');
        if (!hasNotified) {
          const getCountryEmoji = (countryCode: string) => {
            if (!countryCode) return "🌐";
            const codePoints = countryCode
              .toUpperCase()
              .split('')
              .map(char => 127397 + char.charCodeAt(0));
            try {
              return String.fromCodePoint(...codePoints);
            } catch (e) {
              return "🌐";
            }
          };

          const triggerNotification = (city: string, country: string, emoji: string, ip: string) => {
            import('./services/notifier').then(({ notifyOwner, NotificationType }) => {
              notifyOwner(NotificationType.VISITOR, {
                subject: `🔔 دخول زائر جديد من ${country} ${emoji}`,
                message: `دخول زائر جديد للمنصة من: ${city}، ${country} ${emoji}`,
                details: {
                  "البلد": `${country} ${emoji}`,
                  "المدينة": city,
                  "IP": ip,
                  "التوقيت": new Date().toLocaleString('ar-TN'),
                  "المتصفح": navigator.userAgent
                },
                emailHtml: `
                  <div style="direction: rtl; font-family: sans-serif; text-align: right; padding: 20px; border: 1px solid #d4af37; border-radius: 8px;">
                    <h2 style="color: #d4af37; border-bottom: 1px solid #eee; padding-bottom: 10px;">🔔 تنبيه زائر جديد للمنصة</h2>
                    <p style="font-size: 16px;">مرحباً بشير! قام زائر بزيارة منصة مدارات النفس الآن.</p>
                    <div style="background: #fcfbf7; border-right: 4px solid #d4af37; padding: 15px; margin: 20px 0; border-radius: 4px;">
                      <p style="margin: 6px 0;"><strong>البلد:</strong> ${country} ${emoji}</p>
                      <p style="margin: 6px 0;"><strong>المدينة:</strong> ${city}</p>
                      <p style="margin: 6px 0;"><strong>عنوان IP:</strong> ${ip}</p>
                      <p style="margin: 6px 0;"><strong>التوقيت:</strong> ${new Date().toLocaleString('ar-TN')}</p>
                      <p style="margin: 6px 0;"><strong>المتصفح:</strong> ${navigator.userAgent}</p>
                    </div>
                  </div>
                `
              });
            });
          };

          Promise.race([
            fetch('https://ipapi.co/json/').then(r => r.json()),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2500))
          ])
          .then((ipData: any) => {
            const city = ipData.city || "غير معروف";
            const country = ipData.country_name || "غير معروف";
            const emoji = ipData.country_code ? getCountryEmoji(ipData.country_code) : "🌐";
            const ip = ipData.ip || "غير معروف";
            triggerNotification(city, country, emoji, ip);
          })
          .catch(() => {
            triggerNotification("غير معروف", "غير معروف", "🌐", "غير معروف");
          });

          sessionStorage.setItem('visitor_notified', 'true');
        }
      } catch (err) {
        console.warn("Visitor trigger details:", err);
      }
    };

    triggerVisitorNotification();

    // Consolidated Initialization
    const initialize = async () => {
      try {
        console.log("مدارات النفس: المنصة نشطة وجاهزة للعمل.");
        const user: any = await ensureAuth();
        if (user) {
          console.log("Session Initialized for user:", user.uid);
        }
        
        // Test Firestore safely without throwing or blocking others
        try {
          await getDocFromServer(doc(db, 'test', 'connection'));
        } catch (dbErr) {
          console.warn("Firestore connectivity check info:", dbErr);
        }
      } catch (err) {
        console.warn("Initialization details:", err);
      }
    };
    initialize();

    // Session Tracking
    const sessionId = sessionStorage.getItem('sessionId') || Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('sessionId', sessionId);
    const sessionRef = doc(db, 'sessions', sessionId);
    
    const updateSession = async () => {
      try {
        await setDoc(sessionRef, {
          lastSeen: serverTimestamp(),
          userAgent: navigator.userAgent,
          path: window.location.pathname,
          userId: auth.currentUser?.uid || 'anonymous',
          email: auth.currentUser?.email || null,
        }, { merge: true });
      } catch (error) {
        // Silently fail
      }
    };

    updateSession();
    const sessionInterval = setInterval(updateSession, 45000);

    // Load saved IDs
    const saved = localStorage.getItem('saved_research_ids');
    if (saved) setSavedIds(JSON.parse(saved));

    return () => clearInterval(sessionInterval);
  }, []);

  const toggleSave = (id: string) => {
    const newSaved = savedIds.includes(id) 
      ? savedIds.filter(savedId => savedId !== id)
      : [...savedIds, id];
    setSavedIds(newSaved);
    localStorage.setItem('saved_research_ids', JSON.stringify(newSaved));
  };
  
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);


  useEffect(() => {
    if (selectedResearch) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        if (modalScrollRef.current) {
          modalScrollRef.current.scrollTop = 0;
        }
      }, 10);
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedResearch]);
  const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, Translation>>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  const t = useMemo(() => {
    const base = translations.ar;
    const langDefault = (translations as any)[currentLang] || {};
    const dynamic = dynamicTranslations[currentLang] || {};
    return { ...base, ...langDefault, ...dynamic };
  }, [currentLang, dynamicTranslations]);

  const translateUI = async (targetLangCode: string) => {
    if ((translations as any)[targetLangCode] || dynamicTranslations[targetLangCode]) {
      setCurrentLang(targetLangCode);
      return;
    }

    setIsTranslating(true);
    try {
      const targetLangName = SUPPORTED_LANGUAGES.find(l => l.code === targetLangCode)?.name || targetLangCode;
      
      const response = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: translations.ar,
          targetLang: targetLangName,
          context: 'ui'
        })
      });

      if (!response.ok) throw new Error("Translation failed");
      const translatedObj = await response.json();
      setDynamicTranslations(prev => ({ ...prev, [targetLangCode]: translatedObj }));
      setCurrentLang(targetLangCode);
    } catch (error) {
      console.error("Translation failed", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const [dynamicResearch, setDynamicResearch] = useState<Record<string, Record<string, Partial<ResearchItem>>>>({});

  const translateResearch = async (research: ResearchItem, targetLangCode: string) => {
    if (research.content[targetLangCode as any] || (dynamicResearch[research.id] && dynamicResearch[research.id][targetLangCode])) {
      return;
    }

    setIsTranslating(true);
    try {
      const targetLangName = SUPPORTED_LANGUAGES.find(l => l.code === targetLangCode)?.name || targetLangCode;
      
      const response = await fetch("/api/ai/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: {
            title: research.title.ar,
            category: research.category.ar,
            author: research.author.ar,
            description: research.description.ar,
            globalPerspective: research.globalPerspective.ar,
            content: research.content.ar
          },
          targetLang: targetLangName,
          context: 'research'
        })
      });

      if (!response.ok) throw new Error("Research translation failed");
      const translated = await response.json();
      setDynamicResearch(prev => ({
        ...prev,
        [research.id]: {
          ...(prev[research.id] || {}),
          [targetLangCode]: translated
        }
      }));
    } catch (error) {
      console.error("Research translation failed", error);
    } finally {
      setIsTranslating(false);
    }
  };

  useEffect(() => {
    if (selectedResearch && currentLang !== 'ar' && currentLang !== 'en' && currentLang !== 'fr') {
      translateResearch(selectedResearch, currentLang);
    }
  }, [selectedResearch, currentLang]);

  const getResearchContent = (research: ResearchItem | null, field: keyof Omit<ResearchItem, 'id' | 'references'>) => {
    if (!research) return "";
    if (field === 'author') {
      if (currentLang === 'ar') return "إشراف وإدارة: بشير الماجري";
      if (currentLang === 'fr') return "Supervision et Gestion : Bechir Mejri";
      return "Supervision & Management: Bechir Mejri";
    }
    const dynamic = dynamicResearch[research.id]?.[currentLang];
    if (dynamic && dynamic[field as keyof typeof dynamic]) {
      return dynamic[field as keyof typeof dynamic] as string;
    }
    return (research[field] as any)?.[currentLang] || (research[field] as any)?.['en'] || (research[field] as any)?.['ar'] || "";
  };

  const handleDownload = (research: ResearchItem) => {
    const title = getResearchContent(research, 'title');
    const author = getResearchContent(research, 'author');
    const category = getResearchContent(research, 'category');
    const description = getResearchContent(research, 'description');
    const content = getResearchContent(research, 'content');
    const perspective = getResearchContent(research, 'globalPerspective');
    
    const fileContent = `
${title}
${"=".repeat(title.length > 40 ? title.length : 40)}
${t.by}: ${author}
${t.statusBehaviorLabel}: ${category}

${description}

${"-".repeat(20)}

${content}

${perspective ? `
${t.globalPerspectiveLabel}:
${perspective}
` : ''}

${research.references?.length ? `
${t.referencesLabel}:
${research.references.map((r: string) => `- ${r}`).join('\n')}
` : ''}

${"-".repeat(20)}
© ${new Date().getFullYear()} ${t.copyright}
    `;
    
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[\s\W]+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isRtl = currentLang === 'ar' || currentLang === 'fa';

  const categories = useMemo(() => {
    const base = [isRtl ? "الكل" : "All", ...new Set(researchData.map(r => getResearchContent(r, 'category')))];
    if (savedIds.length > 0) {
      base.push(t.savedItems);
    }
    return base;
  }, [currentLang, isRtl, dynamicResearch, savedIds, t.savedItems]);

  const filteredResearch = useMemo(() => {
    return researchData.filter(research => {
      if (selectedCategory === t.savedItems) {
        return savedIds.includes(research.id);
      }
      
      const title = getResearchContent(research, 'title');
      const desc = getResearchContent(research, 'description');
      const cat = getResearchContent(research, 'category');
      
      const matchesQuery = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === (isRtl ? "الكل" : "All") || cat === selectedCategory || !selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, selectedCategory, currentLang, isRtl, dynamicResearch, savedIds, t.savedItems]);


  const handleWhatsAppShare = () => {
    const publicUrl = "https://madarat-al-nafs-534883887954.europe-west2.run.app";
    const text = `${t.navTitle}: ${t.heroSubtitle}\n${publicUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };


  return (
    <div className={`min-h-screen bg-[#050505] text-white font-sans selection:bg-gold selection:text-black overflow-x-hidden mesh-gradient relative`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Global Cinematic Effects */}
      <div className="grain-overlay" />
      <motion.div 
        className="cursor-glow hidden lg:block"
        animate={{ 
          x: mousePos.x - 300, 
          y: mousePos.y - 300,
          opacity: 0.3
        }}
        transition={{ type: "spring", damping: 40, stiffness: 150, mass: 0.5 }}
      />

      {/* Background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-gold/5 blur-[100px]" />
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedResearch && (
          <motion.div 
            ref={modalScrollRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-center p-4 md:p-12 overflow-y-auto bg-black/95 backdrop-blur-md items-start"
          >
            <ReadingProgressBar scrollRef={modalScrollRef} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className={`w-full max-w-5xl min-h-[80vh] relative p-8 md:p-20 shadow-[0_0_100px_rgba(0,0,0,0.8)] border transition-all duration-1000 ${
                isZenMode 
                ? 'bg-[#f4f1ea] text-[#1a1a1a] border-gold/20 font-serif' 
                : 'bg-[#0f0f0f] text-white border-white/5'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-8 flex items-center gap-4 px-8 left-0 right-0 justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsZenMode(!isZenMode)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      isZenMode 
                      ? 'bg-black/5 text-black hover:bg-black/10' 
                      : 'bg-white/5 text-white/40 hover:text-gold'
                    }`}
                  >
                    <RefreshCcw className={`w-3 h-3 ${isZenMode ? 'text-gold' : ''}`} />
                    {t.zenModeCta}
                  </button>
                </div>
                <button 
                  onClick={() => {
                    setSelectedResearch(null);
                    setIsZenMode(false);
                  }}
                  className={`${isZenMode ? 'text-black/40' : 'text-white/40'} hover:text-gold transition-colors`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-12 mt-8">
                <span className={`${isZenMode ? 'text-gold' : 'text-gold'} text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block`}>
                  {getResearchContent(selectedResearch, 'category')}
                </span>
                <h2 className={`text-2xl md:text-4xl font-serif ${isZenMode ? 'text-[#0a0a0a]' : 'text-white'} mb-6 leading-tight`}>
                  {getResearchContent(selectedResearch, 'title')}
                </h2>
                <div className={`flex items-center gap-4 ${isZenMode ? 'text-black/30' : 'text-white/30'} text-xs uppercase tracking-widest italic border-b ${isZenMode ? 'border-black/5' : 'border-white/5'} pb-8`}>
                  <span>{t.by}: {getResearchContent(selectedResearch, 'author')}</span>
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none mb-12">
                <p className={`${isZenMode ? 'text-[#2a2a2a] leading-[2]' : 'text-white/60 leading-[1.8]'} text-lg whitespace-pre-line font-medium mb-12 transition-all`}>
                  {getResearchContent(selectedResearch, 'content')}
                </p>
                
                {getResearchContent(selectedResearch, 'globalPerspective') && (
                  <div className={`${isZenMode ? 'bg-gold/10 border-gold/40' : 'bg-gold/5 border-gold'} border-${isRtl ? 'r' : 'l'}-4 p-8 mb-12`}>
                    <h5 className="text-gold text-xs font-black uppercase tracking-[0.3em] mb-4">{t.globalPerspectiveLabel}</h5>
                    <p className={`${isZenMode ? 'text-black/70' : 'text-white/80'} italic text-sm leading-relaxed`}>{getResearchContent(selectedResearch, 'globalPerspective')}</p>
                  </div>
                )}

                {selectedResearch.references && (
                  <div className="mt-12 pt-8 border-t border-white/5">
                    <h5 className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-6">{t.referencesLabel}</h5>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedResearch.references.map((ref: string) => (
                        <li key={ref} className="text-[11px] text-white/30 flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full bg-gold/30" />
                          {ref}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                  {!isZenMode && (
                    <InteractionSection 
                      researchId={selectedResearch.id} 
                      researchTitle={getResearchContent(selectedResearch, 'title')} 
                      t={t} 
                      currentLang={currentLang}
                      savedIds={savedIds}
                      toggleSave={toggleSave}
                    />
                  )}
                  
                  {/* AI Interaction for Modal */}
                  {!isZenMode && (
                    <div className="mt-12 p-8 bg-gold/5 border border-gold/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                           <div className="absolute inset-0 bg-gold blur-xl opacity-30 animate-pulse" />
                           <div className="w-14 h-14 bg-black border-2 border-gold rounded-full flex items-center justify-center relative z-10">
                              <Orbit className="w-7 h-7 text-gold animate-spin-slow" />
                           </div>
                        </div>
                        <div className="text-right sm:text-left">
                          <h4 className="text-white font-serif font-bold text-lg">{currentLang === 'ar' ? 'هل لديك أسئلة حول هذا بحث؟' : 'Questions about this research?'}</h4>
                          <p className="text-white/40 text-sm">{currentLang === 'ar' ? 'اسأل مساعدنا الذكي للحصول على تفاصيل أكثر.' : 'Ask our AI assistant for more details.'}</p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button 
                          onClick={() => handleDownload(selectedResearch)}
                          className="bg-white/5 border border-white/10 hover:border-gold/30 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/down"
                        >
                          <FileDown className="w-4 h-4 text-gold group-hover/down:scale-110 transition-transform" />
                          {t.downloadArticle}
                        </button>
                        <button 
                          onClick={() => triggerAI(currentLang === 'ar' ? `أريد معرفة المزيد عن موضوع: ${getResearchContent(selectedResearch, 'title')}` : `I want to know more about: ${getResearchContent(selectedResearch, 'title')}`)}
                          className="bg-gold text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all whitespace-nowrap shadow-[0_10px_20px_-10px_rgba(212,175,55,0.4)]"
                        >
                          {currentLang === 'ar' ? 'اسأل الذكاء الاصطناعي' : 'Ask AI Assistant'}
                        </button>
                      </div>
                    </div>
                  )}

                  {!isZenMode && (
                    <RelatedResearch 
                      currentId={selectedResearch.id} 
                      currentLang={currentLang} 
                      onSelect={setSelectedResearch} 
                      t={t} 
                    />
                  )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Premium Top Branding Bar - Public Access */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gold text-black h-8 border-b border-black/10 selection:bg-black selection:text-gold shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
          <div className="flex items-center flex-1 overflow-hidden">
            <div className="flex gap-10 animate-marquee whitespace-nowrap py-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex gap-6 sm:gap-12 items-center">
                  <span className="text-[8px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase opacity-90 italic flex items-center gap-3">
                    <Globe className="w-2.5 h-2.5" />
                    madarat-alnafs.research.tn
                  </span>
                  <span className="w-1.5 h-1.5 bg-black/30 rounded-full" />
                  <span className="text-[8px] sm:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase opacity-70">
                    Open Research / Public Domain
                  </span>
                  <span className="w-1.5 h-1.5 bg-black/30 rounded-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center h-full border-l border-black/10 pl-4">
            <div className="hidden lg:flex items-center gap-2 mr-4 text-[9px] font-bold opacity-40">
              <span className="bg-black/10 px-1.5 py-0.5 rounded">PUBLIC LINK READY</span>
            </div>
            <button 
              onClick={handleCopyLink}
              title={t.shareCta}
              className="flex items-center gap-3 bg-black text-gold px-4 sm:px-6 h-full text-[9px] sm:text-[11px] font-black tracking-widest hover:bg-white hover:text-black transition-all group shrink-0 relative overflow-hidden active:scale-95"
            >
              <div className="relative z-10 flex items-center gap-2">
                {copySuccess ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                <span className="max-w-[100px] sm:max-w-none truncate uppercase">{copySuccess ? (t.linkCopied?.split('!')?.[0] || 'COPIED') : 'Copy Public App Link'}</span>
              </div>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl glass-nav rounded-full transition-all duration-500 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6">
              <div className="flex flex-col relative group">
                <div 
                  className="text-2xl font-serif tracking-tighter text-gold leading-none flex items-center gap-3 cursor-pointer"
                  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                        <OrbitalSymbol size={40} type="orbit" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-serif font-black tracking-tighter text-white group-hover:text-gold transition-colors duration-500">
                        مدارات النفس
                      </span>
                      <span className="text-[7px] text-gold/60 uppercase tracking-[0.3em] font-black leading-none">
                        Psych Orbits
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-white/40 tracking-[0.2em] font-sans mt-1 uppercase flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold animate-pulse" />
                  {t.navSubTitle}
                </div>
              </div>

              <div className="flex items-center gap-2 border-l border-white/10 pl-6 ml-2 flex relative">
                <button 
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-all group"
                >
                  <Globe className={`w-4 h-4 transition-colors ${isTranslating ? 'text-gold animate-pulse' : 'text-gold/60 group-hover:text-gold'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hidden sm:flex">
                    {SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.native || currentLang}
                    {isTranslating && <Loader2 className="w-3 h-3 animate-spin" />}
                  </span>
                </button>
                
                <AnimatePresence>
                  {showLangMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowLangMenu(false)}
                      />
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 py-2 z-50 max-h-[70vh] overflow-y-auto scrollbar-hide shadow-2xl rounded-lg"
                      >
                        {SUPPORTED_LANGUAGES.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              translateUI(lang.code);
                              setShowLangMenu(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-between border-b border-white/5 last:border-0 ${
                              currentLang === lang.code ? 'text-gold' : 'text-white/60'
                            }`}
                          >
                            <span className="font-bold">{lang.native}</span>
                            <span className="text-[8px] opacity-40 font-normal">{lang.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className={`hidden md:flex items-center gap-8`}>
              {Object.entries(t.navItems || {}).map(([key, label]) => (
                <a 
                  key={key} 
                  href={key === 'assessment' ? '#assessment' : `#${key}`} 
                  className="text-[11px] uppercase tracking-widest font-bold text-white/50 hover:text-gold transition-colors duration-300"
                >
                  {String(label)}
                </a>
              ))}
              
              <div className="flex items-center gap-5 border-l border-white/10 pl-5">
                <button 
                  onClick={() => setIsBookOpen(true)}
                  className="flex items-center gap-2 text-white/50 hover:text-gold text-[11px] uppercase font-bold tracking-widest transition-colors duration-300 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-gold/80" />
                  <span>{t.readingRoomTitle}</span>
                </button>
                
                <button 
                  onClick={() => setIsTvModalOpen(true)}
                  className="flex items-center gap-2 text-white/50 hover:text-gold text-[11px] uppercase font-bold tracking-widest transition-colors duration-300 cursor-pointer"
                >
                  <Tv className="w-3.5 h-3.5 text-gold/80" />
                  <span>{isRtl ? "بث التلفاز" : "TV Cast"}</span>
                </button>

                <button 
                  onClick={() => setIsQrModalOpen(true)}
                  className="flex items-center gap-2 text-white/50 hover:text-gold text-[11px] uppercase font-bold tracking-widest transition-colors duration-300 cursor-pointer"
                  title={isRtl ? "عرض رمز الاستجابة السريعة للمنصة" : "Show Platform QR Code"}
                >
                  <QrCode className="w-3.5 h-3.5 text-gold/80 animate-pulse" />
                  <span>{isRtl ? "رمز المنصة QR" : "Platform QR"}</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={handleCopyLink}
                  className="bg-gold text-black px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase hover:bg-white transition-all font-bold flex items-center gap-2 relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {copySuccess ? (
                      <motion.div
                        key="check"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-3 h-3" />
                        <span>{t.linkCopied?.split('!')?.[0] || 'تم النسخ'}</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="share"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <LinkIcon className="w-3 h-3" />
                        {t.shareCta}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <button 
                onClick={() => setIsTvModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 border border-gold/30 rounded text-gold text-[9px] uppercase tracking-wider transition-all cursor-pointer"
              >
                <Tv className="w-3.5 h-3.5 text-gold/80" />
                <span>{isRtl ? "بث التلفاز" : "TV Cast"}</span>
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white/60 hover:text-gold transition-colors">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#0a0a0a] border-b border-white/5 py-6 px-4 space-y-2"
          >
            {Object.entries(t.navItems).map(([key, label]) => (
              <a 
                key={key} 
                href={key === 'assessment' ? '#assessment' : `#${key}`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-4 px-6 text-[11px] uppercase tracking-widest font-bold text-white/60 hover:text-gold transition-all"
              >
                {label}
              </a>
            ))}
            <div className="pt-4 px-6 space-y-4 border-t border-white/5 mt-4">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-white/40 uppercase tracking-widest px-2 mb-2">{t.globalPerspectiveLabel}</span>
                        <div className="grid grid-cols-2 gap-2">
                          {SUPPORTED_LANGUAGES.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                translateUI(lang.code);
                                setIsMobileMenuOpen(false);
                              }}
                              className={`text-left px-4 py-3 rounded-lg text-[10px] uppercase tracking-widest transition-all flex items-center justify-between ${
                                currentLang === lang.code ? 'bg-gold text-black font-bold' : 'bg-white/5 text-white/60'
                              }`}
                            >
                              <span>{lang.native}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setIsTvModalOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full bg-black/80 border border-gold/30 hover:border-gold text-gold px-6 py-4 text-[10px] tracking-[0.2em] uppercase font-bold rounded-xl flex items-center justify-center gap-2 mb-2 cursor-pointer transition-all duration-300"
                      >
                        <Tv className="w-4 h-4 text-gold" />
                        <span className="font-bold">{isRtl ? "البث والتحكم بالتلفاز الذكي" : "Cast to Smart TV"}</span>
                      </button>

                      <button 
                        onClick={() => {
                          setIsQrModalOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full bg-black/80 border border-gold/30 hover:border-gold text-gold px-6 py-4 text-[10px] tracking-[0.2em] uppercase font-bold rounded-xl flex items-center justify-center gap-2 mb-2 cursor-pointer transition-all duration-300"
                      >
                        <QrCode className="w-4 h-4 text-gold" />
                        <span className="font-bold">{isRtl ? "عرض رمز الاستجابة السريعة QR" : "Platform QR Code"}</span>
                      </button>

                      <button 
                        onClick={handleCopyLink}
                        className="w-full bg-gold text-black px-6 py-4 text-[10px] tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 rounded-xl cursor-pointer"
                      >
                        {copySuccess ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                        {copySuccess ? t.linkCopied : t.shareCta}
                      </button>
                    </div>
                  </motion.div>
        )}
      </nav>

          {/* Hero Section */}
          <section ref={targetRef} className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/hero_background_realistic_1778915325282.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-10" />
        </div>
        
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.05)_0,transparent_50%)] pointer-events-none z-20" />
        
        {/* Floating Particles for Atmospheric Depth */}
        <div className="absolute inset-0 pointer-events-none z-[15]">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: (Math.random() * 100) + "%", 
                y: (Math.random() * 100) + "%",
                opacity: 0,
                scale: 0.5
              }}
              animate={{ 
                y: ["-10%", "110%"],
                opacity: [0, 0.4, 0],
                scale: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 15 + Math.random() * 25, 
                repeat: Infinity, 
                delay: Math.random() * 10,
                ease: "linear"
              }}
              className="absolute w-1 h-1 bg-gold rounded-full blur-[1px]"
            />
          ))}
        </div>
        
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-30 flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 hidden md:block"
          >
            <OrbitalSymbol size={50} type="orbit" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-gold text-xs mb-4 font-serif italic tracking-wide">{t.heroSubtitle}</div>
            <h1 className="text-3xl md:text-5xl font-serif font-black leading-[1.1] mb-6 text-white">
              {t.heroTitle.split(' ').slice(0, 2).join(' ')} <br/>
              <span className="italic text-white/30">{t.heroTitle.split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="max-w-xl mx-auto text-sm md:text-base text-white/50 mb-8 font-medium leading-relaxed">
              {t.heroDescription}
            </p>

            <div className="max-w-2xl mx-auto mb-8 text-center">
              <PsychologicalInsight t={t} />
            </div>

            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={() => {
                  const el = document.querySelector('[data-pathfinder]');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-8 py-4 bg-gold text-black font-extrabold text-xs tracking-widest uppercase overflow-hidden transition-all shadow-2xl shadow-gold/20 text-center rounded-xl cursor-pointer hover:bg-white hover:scale-105 active:scale-95 duration-300"
              >
                {isRtl ? "🚀 ابدأ رحلتك الآن" : "🚀 Start Your Journey"}
              </button>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">
                {isRtl ? "معرفة • مساعدة • استشارة" : "Knowledge • Solutions • Consultation"}
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 opacity-50"
            >
              <FounderSignature currentLang={currentLang} />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="relative mt-12 max-w-3xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.5 }}
            className="aspect-square w-full max-w-sm mx-auto relative"
          >
            {/* Symbolic Rotating Sphere (The "Orbits") */}
            <div className="absolute inset-0 rounded-full border border-gold/10 animate-spin-slow" />
            <div className="absolute inset-4 rounded-full border border-gold/5 animate-reverse-spin-slow" />
            <div className="absolute inset-12 rounded-full border border-gold/20 flex items-center justify-center bg-black/40 backdrop-blur-3xl shadow-[0_0_100px_rgba(212,175,55,0.05)]">
                <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.1),transparent)] flex items-center justify-center group overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"
                  />
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gold/20 blur-3xl rounded-full"
                    />
                    <div className="w-32 h-32 rounded-full border border-gold/30 flex items-center justify-center relative bg-black/50 backdrop-blur-sm group-hover:border-gold transition-all duration-700">
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border border-dashed border-gold/20 rounded-full"
                      />
                      <Sparkles className="w-12 h-12 text-gold group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  </div>
                </div>
            </div>
            
            {/* Orbiting Points */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,1)] animate-ping" />
          </motion.div>
        </div>
      </section>

      <PathFinder currentLang={currentLang} isRtl={isRtl} onNavigate={() => {}} />

      <ManifestoSection t={t} isRtl={isRtl} />

      <SovereigntyRebalancer currentLang={currentLang} isRtl={isRtl} />

      <SovereigntyInnovationHub currentLang={currentLang} isRtl={isRtl} bechirAvatar={bechirAvatar} />

      <ConsultationForm t={t} currentLang={currentLang} isRtl={isRtl} />

      {/* Reading Room Section */}
      <section className="py-12 md:py-16 bg-black relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-30" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold">
              <BookOpen className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t.readingRoomTitle}</span>
            </div>
            <h2 className="text-2xl md:text-3xl text-white font-serif italic leading-[1.1]">{t.readingRoomSubTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Book 1 Cardiff: Bechir's Book */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col justify-between bg-[#0e0e0e] border border-white/5 rounded-3xl p-6 md:p-8 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 group/card shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="space-y-6">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/5">
                  <img 
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" 
                    alt="Book Cover 1" 
                    className="w-full h-full object-cover opacity-50 group-hover/card:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-serif italic text-2xl drop-shadow-md">{t.bookTitle}</h3>
                    <p className="text-gold text-[10px] uppercase font-black tracking-widest mt-1">{t.bookAuthor}</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed font-serif min-h-[3.5rem]">{t.bookDescription}</p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => { setSelectedBookType('bechir'); setIsBookOpen(true); }}
                  className="w-full py-4 bg-gold text-black font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-white active:scale-95 shadow-[0_15px_30px_-5px_rgba(212,175,55,0.2)] rounded-xl"
                >
                  <span className="flex items-center justify-center gap-3">
                    {t.readCta} <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Book 2 Cardiff: Yasser Al-Hazimi's Book */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative flex flex-col justify-between bg-[#0e0e0e] border border-white/5 rounded-3xl p-6 md:p-8 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 group/card shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute -top-3 right-6 z-20 bg-gold text-black font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                {isRtl ? "إضافة جديدة" : "NEW RELEASE"}
              </div>

              <div className="space-y-6">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/5">
                  <img 
                    src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800" 
                    alt="Book Cover 2" 
                    className="w-full h-full object-cover opacity-50 group-hover/card:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} bg-gold/90 text-black px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg z-10 flex items-center gap-1.5`}>
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    {isRtl ? "يحتوي على شرح مرئي 🎥" : "Includes Video Explanation 🎥"}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-serif italic text-2xl drop-shadow-md">
                      {isRtl ? "الشخصية القوية: أسرار تقدير الذات وتوكيدها" : "The Strong Personality: Secrets of Self-Esteem"}
                    </h3>
                    <p className="text-gold text-[10px] uppercase font-black tracking-widest mt-1">
                      {isRtl ? "تأليف: الشيخ أ. ياسر بن بدر الحزيمي" : "By: Sheikh A. Yasser bin Badr Al-Hazimi"}
                    </p>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed font-serif min-h-[3.5rem]">
                  {isRtl 
                    ? "ملخص دراسي منهجي هادف ومفصل ومعد للقراءة والتحميل لأهم فصول وأسرار الأثر الأدبي الشهير للكاتب ياسر الحزيمي." 
                    : "An intensive, study-focused summary for reading and downloading the chapters and secrets of the famous masterpiece by Yasser Al-Hazimi."}
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => { setSelectedBookType('hazimi'); setIsBookOpen(true); }}
                  className="w-full py-4 bg-[#111] hover:bg-gold border border-white/10 hover:border-transparent text-white hover:text-black font-black uppercase tracking-[0.2em] text-xs transition-all active:scale-95 shadow-[0_15px_30px_-5px_rgba(212,175,55,0.05)] rounded-xl"
                >
                  <span className="flex items-center justify-center gap-3">
                    {t.readCta} <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <QuoteSection t={t} />

      <PromoCommercial t={t} currentLang={currentLang as Language} isRtl={isRtl} />

      {/* Video Library Entry Point (Teaser) */}
      <section className="py-12 md:py-16 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden group cursor-pointer" onClick={() => setShowVideoLibrary(true)}>
        <div className="absolute inset-0 bg-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-700">
              <Video className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-3">{t.videosSubtitle}</h2>
            <h3 className="text-2xl md:text-3xl font-serif text-white italic mb-4">{t.videoLibraryBtn}</h3>
            <p className="text-white/40 max-w-xl mx-auto font-serif italic mb-6 leading-relaxed text-sm">
              {t.videosTitle} - {t.videosSubtitle}
            </p>
            <button 
              className="bg-white/5 hover:bg-gold text-white hover:text-black px-8 py-3.5 rounded-full border border-white/10 hover:border-gold text-[10px] uppercase font-black tracking-[0.2em] transition-all flex items-center gap-3 mx-auto"
            >
              <span>{t.videoLibraryBtn}</span>
              <Play className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </section>

      <DailySovereigntyQuote t={t} currentLang={currentLang} isRtl={isRtl} />

      <PsychologicalAssessment t={t} currentLang={currentLang} isRtl={isRtl} />

      <section className="py-12 md:py-16 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-gold/5 border border-gold/10 rounded-full mb-6">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span className="text-[9px] font-black tracking-[0.5em] text-gold uppercase">{t.promoSectionTitle}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-serif text-white italic leading-[1.1] mb-6 selection:bg-gold selection:text-black">
                  {t.promoSectionHeading}
                </h3>
                <p className="text-white/50 text-base leading-relaxed max-w-lg font-light">
                  {t.promoSectionDescription}
                </p>
              </div>

              {/* Poetic Examples removed as requested */}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Artistic Frame */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
                <div className="absolute inset-0 border-[20px] border-black z-10 pointer-events-none opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-gold/5 z-10" />
                
                <motion.img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200" 
                  alt="Madarat Al-Nafs Image" 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-[4000ms]"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                />

                {/* Floating Badge */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-full px-12">
                  <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-8 rounded-2xl flex items-center justify-between group">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black tracking-[0.3em] text-gold uppercase">Visionary Concept</p>
                      <h4 className="text-white font-serif italic text-lg">{t.promoSectionHeading}</h4>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center group-hover:scale-110 group-hover:border-gold transition-all duration-500">
                      <Sparkles className="w-5 h-5 text-gold animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Background Circles */}
              <div className="absolute -top-20 -right-20 w-64 h-64 border border-gold/10 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="بحوث" className="py-20 md:py-24 bg-[#0c0c0c] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-6 font-sans">{t.pillarsTitle}</h2>
              <h3 className="text-3xl md:text-5xl font-serif tracking-tight leading-none text-white italic whitespace-pre-line">{t.pillarsHeading}</h3>
            </div>
            <p className={`text-white/40 font-medium max-w-sm border-${isRtl ? 'r' : 'l'} border-gold/30 p${isRtl ? 'r' : 'l'}-8 leading-relaxed`}>{t.pillarsDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {psychologicalPillars.map((pillar, i) => (
              <motion.div 
                key={pillar.title.ar}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="group p-10 glass-card hover:bg-gold/[0.03] transition-all duration-700 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-current opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity" style={{ color: pillar.color.split(' ')[0].replace('text-', '') }} />
                
                <div className={`${pillar.color} w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-current/10 transition-all duration-500`}>
                  {pillar.icon}
                </div>
                <h4 className="text-xl font-serif font-bold mb-4 text-white uppercase tracking-wide group-hover:text-gold transition-colors">
                  {(pillar.title as any)[currentLang] || (pillar.title as any)['en'] || (pillar.title as any)['ar']}
                </h4>
                <p className="text-white/40 leading-relaxed text-sm font-medium group-hover:text-white/60 transition-colors">
                  {(pillar.description as any)[currentLang] || (pillar.description as any)['en'] || (pillar.description as any)['ar']}
                </p>
                
                <div className="mt-8 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-gold text-[10px] font-black uppercase tracking-widest">
                  {t.readResearch} <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AIResearchNexus 
        t={t} 
        currentLang={currentLang} 
        onSelect={setSelectedResearch} 
        triggerAI={triggerAI} 
        getResearchContent={getResearchContent}
      />

      {/* Global Research Hub */}
      <section className="py-20 md:py-24 bg-[#0c0c0c] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="md:w-1/2">
              <h2 className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-8">{t.globalHubTitle}</h2>
              <h3 className="text-4xl md:text-6xl font-serif text-white italic mb-8 whitespace-pre-line">
                {t.globalHubHeading}
              </h3>
              <p className="text-white/40 mb-12 max-w-lg leading-relaxed">
                {t.globalHubDescription}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {globalHubLinks.map(link => (
                  <a 
                    key={link.name} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col p-6 bg-white/[0.02] border border-white/5 hover:border-gold/30 transition-all group"
                  >
                    <span className="text-white/60 text-[11px] font-bold mb-2 group-hover:text-gold transition-colors">{link.name}</span>
                    <div className="flex items-center gap-2 text-[9px] text-white/20 uppercase tracking-widest">
                      {t.globalHubVisit} <ArrowRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''} transition-transform`} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 relative">
               <div className="aspect-square w-full rounded-full border border-gold/5 flex items-center justify-center p-20 animate-pulse-slow">
                  <div className="w-full h-full rounded-full border border-gold/10 flex items-center justify-center p-20">
                     <div className="w-full h-full rounded-full bg-gold/5 flex items-center justify-center border border-gold/20 overflow-hidden group">
                        <img 
                          src="/src/assets/images/fiqh_book_realistic_1778915453866.png" 
                          alt="Traditional Heritage Book" 
                          className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-1000 opacity-60"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <Globe className="w-16 h-16 text-gold opacity-40 absolute z-10" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="عنا" className="py-20 md:py-24 bg-[#0a0a0a] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-[#1a1a1a] border border-gold/20 relative group overflow-hidden">
                <img 
                  src={bechirAvatar} 
                  alt={t.navTitle} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 z-0 opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80 z-10" />
                <div className={`absolute bottom-12 ${isRtl ? 'right-12' : 'left-12'} z-20`}>
                   <h4 className="text-3xl font-serif text-gold italic mb-2">{t.gratitudeAuthor}</h4>
                   <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">{t.navSubTitle}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="inline-block px-4 py-1 border border-gold/30 text-gold text-[10px] uppercase tracking-widest font-bold">{t.aboutFounderTitle}</div>
              <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                {t.aboutFounderHeading}
              </h3>
              <div className="space-y-6 text-white/50 text-lg leading-relaxed">
                <p>{t.aboutFounderDescription1}</p>
                <p className="text-white/40 text-base">{t.aboutFounderDescription2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>







      {/* Footer Status Bar */}
      <section className="border-t border-white/5 bg-[#111] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
        <div className="p-16 flex flex-col justify-center">
          <span className="text-[10px] text-gold uppercase tracking-widest mb-2 font-bold">{t.statusBehaviorLabel}</span>
          <div className="text-xl font-serif text-white uppercase italic">{t.statusBehavior}</div>
        </div>
        <div className="p-16 flex flex-col justify-center">
          <span className="text-[10px] text-gold uppercase tracking-widest mb-2 font-bold">{t.statusCasesLabel}</span>
          <div className="text-xl font-serif text-white uppercase italic">{t.statusCases}</div>
        </div>
        <div className="p-16 flex flex-col justify-center">
          <span className="text-[10px] text-gold uppercase tracking-widest mb-2 font-bold">{t.statusPubsLabel}</span>
          <div className="text-xl font-serif text-white uppercase italic">{t.statusPubs}</div>
        </div>
      </section>

      {/* Gratitude Section */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="p-12 border border-gold/10 bg-gold/[0.02] rounded-2xl relative">
            <Quote className={`w-8 h-8 text-gold/20 absolute top-8 ${isRtl ? 'left-8' : 'right-8'}`} />
            <h3 className="text-[10px] font-black tracking-[0.4em] text-gold uppercase mb-8">{t.gratitudeTitle}</h3>
            <p className="text-xl md:text-2xl font-serif text-white/80 leading-relaxed italic mb-8">
              {t.gratitudeText}
            </p>
            <div className="text-gold font-serif text-lg">— {t.gratitudeAuthor}</div>
          </div>
        </div>
      </section>



      {/* Social Connect Section */}
      <section className="py-20 md:py-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-16">{t.socialTitle}</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 max-w-5xl mx-auto justify-items-center justify-center">
            <a href="https://www.facebook.com/share/18nKGazYcj/" target="_blank" className="group flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all duration-500">
                <Facebook className="w-10 h-10 text-gold" />
              </div>
              <div>
                <span className="block text-2xl font-serif text-white group-hover:text-gold transition-colors">Facebook</span>
                <span className="block text-[10px] uppercase tracking-widest text-white/30 mt-1 font-bold">بشير الماجري</span>
              </div>
            </a>

            <a href="https://x.com/MejriBechi58237" target="_blank" className="group flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all duration-500">
                <X className="w-10 h-10 text-gold" />
              </div>
              <div>
                <span className="block text-2xl font-serif text-white group-hover:text-gold transition-colors">X / Twitter</span>
                <span className="block text-[10px] uppercase tracking-widest text-white/30 mt-1 font-bold">@MejriBechi58237</span>
              </div>
            </a>

            <a href="https://wa.me/21697341599" target="_blank" className="group flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all duration-500">
                <MessageCircle className="w-10 h-10 text-gold" />
              </div>
              <div>
                <span className="block text-2xl font-serif text-white group-hover:text-gold transition-colors">WhatsApp</span>
                <span className="block text-[10px] uppercase tracking-widest text-white/30 mt-1 font-bold">97 341 599</span>
              </div>
            </a>

            <a href="mailto:bechirmejri556@gmail.com" className="group flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all duration-500">
                <Mail className="w-10 h-10 text-gold" />
              </div>
              <div>
                <span className="block text-2xl font-serif text-white group-hover:text-gold transition-colors">Email</span>
                <span className="block text-[10px] uppercase tracking-widest text-white/30 mt-1 font-bold">bechirmejri556@gmail.com</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <RatingSystem t={t} isRtl={isRtl} />

      {/* Footer */}
      <footer className="bg-black text-white/30 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl border border-gold/20 flex items-center justify-center relative overflow-hidden group-hover:border-gold transition-all duration-700 bg-white/[0.02]">
                  <motion.div 
                    className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(212,175,55,0.1),transparent)]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  <Globe className="w-8 h-8 text-gold/40 group-hover:text-gold transition-all duration-700" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gold/10 rounded-full border border-gold/20 flex items-center justify-center backdrop-blur-sm">
                  <Star className="w-2 h-2 text-gold animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-serif font-black tracking-tighter text-white/80 group-hover:text-gold transition-all duration-700 leading-none">
                  مدارات النفس
                </span>
                <span className="text-[9px] text-white/20 uppercase tracking-[0.5em] font-black mt-2">
                  Foundation for Research
                </span>
              </div>
            </div>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">© {new Date().getFullYear()} {t.copyright}</div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-[9px] font-bold uppercase tracking-[0.2em]">
            <span className="text-white/20">{t.tunisia}</span>
            <span className="text-white/20">research@madarat-psych.com</span>
            <button 
              onClick={() => {
                setShowVerifyModal(true);
                if (isAdmin) {
                  handleVerifyNotifications();
                }
              }}
              className="text-gold/65 hover:text-gold transition-all duration-300 flex items-center gap-2 cursor-pointer border border-gold/15 hover:border-gold/30 px-3 py-1.5 rounded-lg bg-gold/5"
            >
              <Lock className="w-3 h-3 text-gold/60" />
              <span>{isAdmin ? "لوحة التحكم والتحرير ⚙️" : "بوابة المشرف للمنصة 🗝️"}</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Internal Video Library Modal */}
      <AnimatePresence>
        {showVideoLibrary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black overflow-y-auto"
          >
            <div className="sticky top-0 z-[260] bg-black/80 backdrop-blur-xl border-b border-white/5 px-8 h-20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Video className="w-5 h-5 text-gold" />
                <span className="text-xl font-serif text-white italic">{t.videoLibraryBtn}</span>
              </div>
              <button 
                onClick={() => setShowVideoLibrary(false)}
                className="bg-white/5 hover:bg-white/10 text-white/60 hover:text-white px-6 py-2 rounded-full border border-white/10 text-[10px] uppercase font-black tracking-widest transition-all flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                {t.closeLibrary}
              </button>
            </div>
            
            <div className="pt-12 pb-32">
              <VideoSection t={t} currentLang={currentLang as Language} isRtl={isRtl} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Copy Button & Toast */}
      <AnimatePresence>
        {copySuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className={`fixed bottom-8 left-1/2 z-[200] bg-gold text-black px-8 py-4 rounded-full font-bold shadow-2xl flex items-center gap-4 ${isRtl ? 'font-serif' : 'font-sans'}`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm uppercase tracking-widest">{t.linkCopied}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Actions */}
      <div className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-[150] flex flex-col gap-4`}>
        {/* Removed Language and Link icons per user request */}
      </div>

      {/* Verify Notifications Diagnostics Modal */}
      <AnimatePresence>
        {showVerifyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-serif"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#050505] border border-gold/20 max-w-2xl w-full rounded-2xl p-6 md:p-8 space-y-6 relative text-right shadow-2xl"
              style={{ direction: 'rtl' }}
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setShowVerifyModal(false);
                  setAdminSuccessMsg("");
                  setAdminErrorMsg("");
                  setPasscodeForm("");
                }}
                className="absolute top-4 left-4 p-2 text-white/40 hover:text-white transition-colors"
                id="admin-dashboard-close-btn"
              >
                <X className="w-5 h-5" />
              </button>

              {!isAdmin ? (
                /* LOGIN GATEWAY */
                <div className="space-y-6 py-4">
                  <div className="text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(212,175,55,0.1)] pb-1">
                      <Lock className="w-6 h-6 text-gold animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-serif font-black text-white">بوابة العبور الآمن للمشرف</h3>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest font-sans">Authorized Personnel Only</p>
                    </div>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setAdminErrorMsg("");
                      if (passcodeForm === "esteqem2026" || passcodeForm === "bechir") {
                        localStorage.setItem('admin_session', 'true');
                        setIsAdmin(true);
                        setAdminSuccessMsg("✓ مرحباً بك أستاذ بشير الماجري، تم التوثيق بنجاح!");
                        handleVerifyNotifications();
                      } else {
                        setAdminErrorMsg("⚠️ رمز المرور للمشرف غير صحيح. الرجاء المحاولة مجدداً.");
                      }
                    }}
                    className="space-y-4 max-w-sm mx-auto"
                    id="admin-login-form"
                  >
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gold/80 uppercase tracking-wider text-right">رمز مرور الإدارة (Passcode):</label>
                      <input 
                        type="password"
                        value={passcodeForm}
                        onChange={(e) => setPasscodeForm(e.target.value)}
                        placeholder="••••••••"
                        className="w-full text-center tracking-widest bg-white/[0.02] border border-white/10 rounded-xl h-12 text-white font-mono text-lg focus:border-gold/50 focus:ring-1 focus:ring-gold/35 focus:outline-none transition-all placeholder:text-white/15"
                        required
                        id="admin-passcode-input"
                      />
                    </div>

                    {adminErrorMsg && (
                      <p className="text-xs font-serif text-rose-400 text-center animate-shake" id="admin-login-error">
                        {adminErrorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-gold/90 to-gold text-black hover:scale-[1.01] font-bold h-12 rounded-xl text-sm transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2 cursor-pointer animate-pulse-slow"
                      id="admin-login-submit"
                    >
                      <span>توثيق العبور والدخول</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* FULL ADMIN CONTROL CENTER */
                <div className="space-y-6">
                  {/* Dashboard Header */}
                  <div className="space-y-2 border-b border-white/5 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
                          <User className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif font-black text-white/95">لوحة التحكم والمشرف العام</h3>
                          <p className="text-[10px] text-white/30 font-sans uppercase tracking-[0.2em]">Platform Administration Hub</p>
                        </div>
                      </div>
                      <div className="text-[10px] bg-gold/10 text-gold px-3 py-1 font-bold rounded-full border border-gold/20 font-sans">
                        بشير الماجري ✦
                      </div>
                    </div>
                  </div>

                  {/* Elegant Horizontal Tabs */}
                  <div className="flex border-b border-white/5 gap-1 p-1 bg-white/[0.01] rounded-xl border border-white/5">
                    <button
                      onClick={() => {
                        setAdminTab('avatar');
                        setAdminSuccessMsg("");
                        setAdminErrorMsg("");
                      }}
                      className={`flex-1 py-3 text-xs font-bold font-serif rounded-lg transition-all cursor-pointer ${adminTab === 'avatar' ? 'bg-gold/15 text-gold border-b-2 border-gold font-black' : 'text-white/40 hover:text-white/75 hover:bg-white/[0.02]'}`}
                    >
                      🖼️ تعديل الصورة التعريفية
                    </button>
                    <button
                      onClick={() => {
                        setAdminTab('diagnostics');
                        setAdminSuccessMsg("");
                        setAdminErrorMsg("");
                        handleVerifyNotifications();
                      }}
                      className={`flex-1 py-3 text-xs font-bold font-serif rounded-lg transition-all cursor-pointer ${adminTab === 'diagnostics' ? 'bg-gold/15 text-gold border-b-2 border-gold font-black' : 'text-white/40 hover:text-white/75 hover:bg-white/[0.02]'}`}
                    >
                      ⚙️ تشخيص الإشعارات (Gmail)
                    </button>
                    <button
                      onClick={() => {
                        setAdminTab('test');
                        setAdminSuccessMsg("");
                        setAdminErrorMsg("");
                      }}
                      className={`flex-1 py-3 text-xs font-bold font-serif rounded-lg transition-all cursor-pointer ${adminTab === 'test' ? 'bg-gold/15 text-gold border-b-2 border-gold font-black' : 'text-white/40 hover:text-white/75 hover:bg-white/[0.02]'}`}
                    >
                      🧪 اختبار إرسال التنبيهات
                    </button>
                  </div>

                  {/* Alerts within full dashboard */}
                  {adminSuccessMsg && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl text-right font-serif"
                      id="admin-success-alert"
                    >
                      {adminSuccessMsg}
                    </motion.div>
                  )}

                  {adminErrorMsg && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl text-right font-serif"
                      id="admin-error-alert"
                    >
                      {adminErrorMsg}
                    </motion.div>
                  )}

                  {/* Render Dashboard content depending on tabs */}
                  {adminTab === 'avatar' && (
                    <div className="space-y-5 animate-fade-in text-right">
                      <p className="text-xs text-white/50 leading-relaxed font-serif">
                        ✦ يُمكّنك هذا القسم من تغيير الصورة التعريفية الرسمية لـ (الأستاذ بشير الماجري) الظاهرة في واجهة الذكاء الاصطناعي وبطاقة التعريف وفي كافة أرجاء المنصة بشكل فوري ومستدام دون لمس الكود البرمجي. يتم ضغط ومعالجة الصورة تلقائياً لسرعة التحميل الفائقة.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Current Picture vs Temp Upload Preview */}
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center space-y-3">
                          <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest font-sans">الصورة المعروضة حالياً بالمنصة</span>
                          <div className="relative w-32 h-40 border border-gold/10 bg-black rounded-lg overflow-hidden flex items-center justify-center p-0.5 shadow-md">
                            <img 
                              src={bechirAvatar} 
                              alt="Current avatar illustration" 
                              className="w-full h-full object-cover rounded"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-1 right-1 bg-emerald-500 w-2.5 h-2.5 rounded-full border border-black shadow" />
                          </div>
                          <span className="text-[10px] text-green-400">مباشر على الهواء Active</span>
                        </div>

                        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center space-y-3">
                          <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest font-sans">معاينة الصورة الجديدة قبل النشر</span>
                          <div className="relative w-32 h-40 border border-dashed border-gold/30 bg-black rounded-lg overflow-hidden flex items-center justify-center p-0.5 shadow-md">
                            {tempAvatar ? (
                              <img 
                                src={tempAvatar} 
                                alt="Pre-upload cropped avatar" 
                                className="w-full h-full object-cover rounded"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="text-white/20 text-xs text-center p-4 leading-relaxed flex items-center justify-center h-full">
                                يرجى اختيار ملف صورة للمعاينة
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] text-white/30">تحجيم ورفع آمن تلقائياً</span>
                        </div>
                      </div>

                      {/* File Upload Zone */}
                      <div className="relative border-2 border-dashed border-white/10 hover:border-gold/30 rounded-2xl p-6 transition-all duration-300 text-center bg-white/[0.01] hover:bg-white/[0.02] flex flex-col items-center justify-center cursor-pointer group">
                        <input 
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          id="avatar-file-picker"
                        />
                        <Upload className="w-8 h-8 text-white/30 group-hover:text-gold transition-colors mb-3" />
                        <span className="text-sm text-white/70 font-bold group-hover:text-white transition-colors">اسحب ملف صورة جديدة هنا أو اضغط للاختيار</span>
                        <span className="text-[10px] text-white/30 mt-1">يدعم صيغ JPG, PNG, WEBP (يتم تحجيمها تلقائياً لسرعة تحميل فائقة وتخزينها بأمان)</span>
                      </div>

                      {/* Action trigger buttons */}
                      <div className="flex gap-3 justify-end pt-2">
                        <button
                          onClick={handleResetAvatar}
                          disabled={uploading}
                          className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold px-4 py-2.5 rounded-xl text-xs border border-rose-500/10 transition-all cursor-pointer disabled:opacity-50"
                          id="avatar-reset-btn"
                        >
                          {uploading ? "جاري المعالجة..." : "إعادة تعيين الصورة الأصلية"}
                        </button>
                        <button
                          onClick={handleSaveAvatar}
                          disabled={uploading || !tempAvatar}
                          className="flex-1 bg-gold hover:bg-gold/90 text-black font-bold h-11 px-6 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-white/5 disabled:text-white/20 disabled:cursor-not-allowed"
                          id="avatar-publish-btn"
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                              <span>جاري معالجة الكبس والنشر...</span>
                            </>
                          ) : (
                            <>
                              <span>✓ نشر وحفظ الصورة الجديدة على المنصة</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {adminTab === 'diagnostics' && (
                    <div className="space-y-4 animate-fade-in text-right">
                      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                          <span className="text-white/40 font-mono">SERVICE</span>
                          <span className="text-white/40 font-mono">STATUS</span>
                        </div>

                        {verifying ? (
                          <div className="flex items-center justify-center py-6 gap-3 text-white/60">
                            <Loader2 className="w-4 h-4 text-gold animate-spin" />
                            <span>جاري فحص الاتصال بخوادم Gmail...</span>
                          </div>
                        ) : verifyConfigStatus ? (
                          <div className="space-y-3 pt-1">
                            {/* SMTP Email connection check */}
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gold/40" />
                                <span className="text-sm font-medium text-white/80">إشعارات البريد الإلكتروني (Gmail)</span>
                              </div>
                              {verifyConfigStatus.smtpStatus === 'success' ? (
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                                  ✓ متصل ويعمل بنجاح
                                </span>
                              ) : verifyConfigStatus.smtpStatus === 'failed' ? (
                                <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                                  ⚠️ فشل الاتصال (تحقق من كلمة السر)
                                </span>
                              ) : (
                                <span className="text-xs font-bold text-white/30 bg-white/5 px-2.5 py-1 rounded-full">
                                  غير مهيأ
                                </span>
                              )}
                            </div>

                            {/* Credentials Display info */}
                            {verifyConfigStatus.emailUser && (
                              <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 text-xs text-white/60 font-mono flex justify-between items-center">
                                <span>البريد المقترن:</span>
                                <span className="text-white">{verifyConfigStatus.emailUser}</span>
                              </div>
                            )}

                            {/* Diagnostic details error if failed */}
                            {verifyConfigStatus.smtpStatus === 'failed' && (
                              <div className="bg-rose-500/5 border border-rose-500/10 rounded-lg p-4 text-xs text-rose-400 font-sans leading-relaxed text-left">
                                <strong>السبب التقني للفشل:</strong>
                                <div className="mt-1 font-mono break-all bg-black/40 p-2 rounded border border-white/5">{verifyConfigStatus.smtpError}</div>
                                <p className="mt-2 text-right text-white/50 w-full">
                                  💡 يرجى التأكد من إدخال **كلمة سر التطبيقات** (16 حرفاً بدون فواصل) التي قمت بإنشائها من حسابك في جوجل، وليس كلمة السر العادية لحسابك.
                                </p>
                              </div>
                            )}

                            {/* Fallback info */}
                            <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-white/50">الربط مع تيليجرام (Telegram):</span>
                                <span className={`font-semibold ${verifyConfigStatus.telegramConfigured ? 'text-emerald-400' : 'text-white/25'}`}>
                                  {verifyConfigStatus.telegramConfigured ? 'نشط' : 'غير مفعّل'}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-white/50">الربط مع ديسكورد (Discord):</span>
                                <span className={`font-semibold ${verifyConfigStatus.discordConfigured ? 'text-emerald-400' : 'text-white/25'}`}>
                                  {verifyConfigStatus.discordConfigured ? 'نشط' : 'غير مفعّل'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-6 text-white/40">
                            لا توجد بيانات متاحة حالياً
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={handleVerifyNotifications}
                          disabled={verifying}
                          className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold h-11 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <RefreshCcw className={`w-3.5 h-3.5 ${verifying ? 'animate-spin' : ''}`} />
                          <span>تحديث حالة الفحص Recalibrate</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {adminTab === 'test' && (
                    <div className="space-y-4 animate-fade-in text-right">
                      <p className="text-xs text-white/50 leading-relaxed font-serif">
                        ✦ تمكنك هذه الميزة التجريبية من إرسال بريد إلكتروني تفاعلي فوري ومحاكى مباشرة إلى بريدك الخاص للتأكد التام والعملي من سلامة اتصالات الإشعارات.
                      </p>

                      <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-xl p-4 text-xs text-emerald-400 space-y-2 leading-relaxed">
                        <p className="font-bold text-sm">💡 كيف تعمل الإشعارات الخاصة بك الآن؟</p>
                        <p>الآن، أي زائر يدخل للمنصة سيأتي لك تنبيه فوري بالكامل على بريدك الإلكتروني ليعلمك بدخول زائر فوري وبأي بلد وعنوان متصفح.</p>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={handleSendTestNotification}
                          disabled={testSending || verifying}
                          className="w-full bg-gold hover:bg-gold/90 disabled:bg-gold/30 disabled:text-black/50 text-black font-bold h-12 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {testSending ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-black" />
                              <span>جاري إرسال إشعار تجريبي...</span>
                            </>
                          ) : (
                            <>
                              <span>🧪 إرسال إشعار تجريبي فوري لهاتفك</span>
                            </>
                          )}
                        </button>
                      </div>

                      {testResult && (
                        <div className={`p-4 rounded-xl border text-xs leading-relaxed text-right ${testResult.success ? 'bg-[#0a2012] border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                          {testResult.message}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Settings modal control buttons */}
                  <div className="flex gap-3 pt-4 border-t border-white/5 justify-end">
                    <button
                      onClick={() => {
                        setShowVerifyModal(false);
                        setAdminSuccessMsg("");
                        setAdminErrorMsg("");
                      }}
                      className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold px-6 h-11 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      إغلاق لوحة التحكم
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookReader 
        isOpen={isBookOpen} 
        onClose={() => setIsBookOpen(false)} 
        t={t} 
        isRtl={isRtl} 
        initialBook={selectedBookType}
      />

      <TvSyncModal 
        isOpen={isTvModalOpen} 
        onClose={() => setIsTvModalOpen(false)} 
        isRtl={isRtl} 
        currentLang={currentLang}
      />

      <PlatformQrModal 
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        isRtl={isRtl}
        currentLang={currentLang}
      />

      <AIAssistant t={t} currentLang={currentLang as Language} bechirAvatar={bechirAvatar} />
    </div>
  );
}
