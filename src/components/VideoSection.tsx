import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Video, Plus, X, Trash2, ExternalLink, Shield, ShieldCheck, LogIn, LogOut, Key, Mail, Lock } from "lucide-react";
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { Language } from "../translations";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "firebase/auth";

interface VideoData {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  url: string;
  thumbnail: string;
  category: "adults" | "children";
  createdAt: any;
}

interface VideoSectionProps {
  t: any;
  currentLang: Language;
  isRtl: boolean;
}

export function VideoSection({ t, currentLang, isRtl }: VideoSectionProps) {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "adults" | "children">("all");
  const [newVideo, setNewVideo] = useState({
    url: "",
    titleAr: "",
    titleEn: "",
    titleFr: "",
    descAr: "",
    descEn: "",
    descFr: "",
    category: "adults" as "adults" | "children"
  });

  // Admin Login States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPasscode, setLoginPasscode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginTab, setLoginTab] = useState<"passcode" | "email" | "google">("passcode");

  useEffect(() => {
    let isOverride = localStorage.getItem('bechir_admin_override') === 'true';
    
    // Check URL parameters for automatic admin activation
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || params.has('bechir') || params.get('passcode') === 'esteqem2026') {
      localStorage.setItem('bechir_admin_override', 'true');
      isOverride = true;
    }

    if (isOverride) {
      setIsAdmin(true);
    }

    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (user?.email === 'bechirmejri556@gmail.com') {
        setIsAdmin(true);
      } else if (!isOverride) {
        setIsAdmin(false);
      }
    });

    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    const unsubVideos = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as VideoData[];
      setVideos(docs);
    });

    return () => {
      unsubAuth();
      unsubVideos();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoginError("");
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user?.email === 'bechirmejri556@gmail.com') {
        setIsAdmin(true);
        setShowLoginModal(false);
      } else {
        await signOut(auth);
        setLoginError(isRtl ? "عذراً، هذا الحساب ليس حساب بشير الماجري المصرح له." : "Unauthorized. This is not Bechir Mejri's authorized account.");
      }
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      setLoginError(isRtl ? "فشل تسجيل الدخول: " + err.message : "Sign-in failed: " + err.message);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const result = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      if (result.user?.email === 'bechirmejri556@gmail.com') {
        setIsAdmin(true);
        setShowLoginModal(false);
      } else {
        await signOut(auth);
        setLoginError(isRtl ? "عذراً، هذا الحساب ليس حساب بشير الماجري المصرح له." : "Unauthorized. This is not Bechir's authorized account.");
      }
    } catch (err: any) {
      console.error("Email Sign-In Error:", err);
      setLoginError(isRtl ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : "Incorrect email or password");
    }
  };

  const handlePasscodeSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPasscode = loginPasscode.trim();
    if (cleanPasscode === "esteqem2026" || cleanPasscode === "بشير2026") {
      localStorage.setItem('bechir_admin_override', 'true');
      setIsAdmin(true);
      setShowLoginModal(false);
      setLoginError("");
      setLoginPasscode("");
    } else {
      setLoginError(isRtl ? "رمز المرور غير صحيح" : "Incorrect passcode");
    }
  };

  const handleSignOut = async () => {
    localStorage.removeItem('bechir_admin_override');
    await signOut(auth);
    setIsAdmin(false);
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      await addDoc(collection(db, "videos"), {
        url: newVideo.url,
        title: { ar: newVideo.titleAr, en: newVideo.titleEn, fr: newVideo.titleFr },
        description: { ar: newVideo.descAr, en: newVideo.descEn, fr: newVideo.descFr },
        category: newVideo.category,
        createdAt: serverTimestamp(),
      });
      setShowAddModal(false);
      setNewVideo({ url: "", titleAr: "", titleEn: "", titleFr: "", descAr: "", descEn: "", descFr: "", category: "adults" });
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  const handleEditVideo = (video: VideoData) => {
    setEditingVideoId(video.id);
    setNewVideo({
      url: video.url,
      titleAr: video.title.ar || "",
      titleEn: video.title.en || "",
      titleFr: video.title.fr || "",
      descAr: video.description.ar || "",
      descEn: video.description.en || "",
      descFr: video.description.fr || "",
      category: video.category || "adults"
    });
    setShowEditModal(true);
  };

  const handleUpdateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideoId || !isAdmin) return;

    try {
      await updateDoc(doc(db, "videos", editingVideoId), {
        url: newVideo.url,
        title: { ar: newVideo.titleAr, en: newVideo.titleEn, fr: newVideo.titleFr },
        description: { ar: newVideo.descAr, en: newVideo.descEn, fr: newVideo.descFr },
        category: newVideo.category,
      });
      setShowEditModal(false);
      setEditingVideoId(null);
      setNewVideo({ url: "", titleAr: "", titleEn: "", titleFr: "", descAr: "", descEn: "", descFr: "", category: "adults" });
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!isAdmin || !window.confirm(t.deleteConfirm)) return;
    try {
      await deleteDoc(doc(db, "videos", id));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const getEmbedUrl = (url: string) => {
    // Advanced regex to extract exactly the 11-character video ID from any YouTube link format
    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
    const match = url.match(ytRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1&rel=0`;
    }
    
    // TikTok
    const ttMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com)\/.*\/video\/(\d+)/);
    if (ttMatch && ttMatch[1]) {
      return `https://www.tiktok.com/embed/v2/${ttMatch[1]}`;
    }

    return url;
  };

  // Custom premium default fallback videos of Bechir Mejri when Firestore is empty
  const defaultVideos: VideoData[] = [
    {
      id: "default-bechir-1",
      title: {
        ar: "مقولة استقم بنفسك - بشير الماجري",
        en: "Esteqem Be Nafsek - Bechir Mejri",
        fr: "Esteqem Be Nafsek - Bechir Mejri"
      },
      description: {
        ar: "المقطع التعريفي والإرشادي لمدارات النفس البشرية وفهم الذات.",
        en: "The educational and introductory guide to the human psyche and self-awareness.",
        fr: "Le guide éducatif et d'introduction à la psyché humaine et à la conscience de soi."
      },
      url: "https://www.youtube.com/watch?v=MM1Oy2CCM6c",
      thumbnail: "",
      category: "adults",
      createdAt: null
    },
    {
      id: "default-bechir-2",
      title: {
        ar: "قوة البناء النفسي والسكينة - بشير الماجري",
        en: "Psychological Building & Serenity - Bechir Mejri",
        fr: "Construction Psychologique & Sérénité - Bechir Mejri"
      },
      description: {
        ar: "تفصيل وتحليل إرشادي لرحلة السكينة والنور النفسي وفهم الذات وتجاوز مدارات المتاهة.",
        en: "A detailed guidance analysis of the journey to psychological serenity, self-understanding, and overcoming labyrinth paths.",
        fr: "Analyse détaillée du voyage vers la sérénité psychologique, la compréhension de soi et le dépassement des chemins du labyrinthe."
      },
      url: "https://youtu.be/pJ0auP7dbcY?si=sTtdL98ZgbZhadgE",
      thumbnail: "",
      category: "adults",
      createdAt: null
    }
  ];

  const displayVideos = videos.length > 0 ? videos : defaultVideos;
  const filteredVideos = displayVideos.filter(v => selectedCategory === "all" || v.category === selectedCategory);

  return (
    <section id="videos" className="py-32 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:max-w-2xl"
          >
            <h2 className="text-[10px] font-black tracking-[0.4em] text-gold uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gold" />
              {t.videosTitle}
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              {t.videosSubtitle}
            </h3>
          </motion.div>

          <div className="flex flex-col gap-4 items-end">
            <div className="flex flex-wrap items-center gap-3">
              {isAdmin ? (
                <div className="flex items-center gap-3 bg-white/5 border border-gold/20 rounded-full px-4 py-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[11px] text-white/80 font-serif font-bold">
                    {isRtl ? "مرحباً بشير • وضع المشرف نشط" : "Welcome Bechir • Admin Mode Active"}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-white/40 hover:text-red-400 transition-colors flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest pl-2 border-l border-white/10"
                    title={isRtl ? "تسجيل الخروج" : "Sign Out"}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{isRtl ? "خروج" : "Exit"}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setLoginError("");
                    setShowLoginModal(true);
                  }}
                  className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-gold rounded-full px-4 py-2.5 text-[10px] uppercase font-black tracking-widest transition-all"
                >
                  <Shield className="w-3.5 h-3.5 text-gold animate-pulse" />
                  <span>{isRtl ? "بوابة الإشراف" : "Admin Portal"}</span>
                </button>
              )}

              {isAdmin && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(true)}
                  className="bg-gold text-black px-6 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
                >
                  <Plus className="w-4 h-4" />
                  {t.addVideoTitle}
                </motion.button>
              )}
            </div>

            <div className={`flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {[
                { id: "all", label: t.catAll },
                { id: "adults", label: t.catAdults },
                { id: "children", label: t.catChildren }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-black transition-all ${
                    selectedCategory === cat.id 
                      ? "bg-gold text-black" 
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredVideos.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
            <Video className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/40">{t.noVideos}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:border-gold/30 transition-all duration-500"
              >
                {/* Video Play Container */}
                <div className="aspect-video relative overflow-hidden bg-black">
                  <iframe 
                    src={getEmbedUrl(video.url)}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-white group-hover:text-gold transition-colors">
                      {video.title[currentLang] || video.title['ar']}
                    </h4>
                    {isAdmin && (
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleEditVideo(video)}
                          className="text-white/40 hover:text-gold transition-colors p-2"
                        >
                          <Plus className="w-4 h-4 rotate-45" style={{ transform: 'none' }} />
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button 
                          onClick={() => handleDeleteVideo(video.id)}
                          className="text-red-500/50 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-white/60 text-sm line-clamp-2 font-serif italic mb-4">
                    {video.description?.[currentLang] || video.description?.['ar']}
                  </p>
                  
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest font-black">
                        <Play className="w-3 h-3 text-gold" />
                        {t.videoEducationalGuide}
                      </div>
                      <span className="text-[8px] text-gold/50 uppercase tracking-[0.3em] font-black">
                        {video.category === "children" ? t.catChildren : t.catAdults}
                      </span>
                    </div>
                    <a 
                      href={video.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/20 hover:text-gold transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Video Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#111] border border-white/10 p-8 rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{t.addVideoTitle}</h3>
                <button onClick={() => setShowAddModal(false)} className="text-white/40 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gold mb-2 font-black">{t.videoUrlLabel}</label>
                  <input 
                    required
                    type="url"
                    value={newVideo.url}
                    onChange={e => setNewVideo({...newVideo, url: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black">{t.videoSelectCategory}</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setNewVideo({...newVideo, category: 'adults'})}
                        className={`flex-1 py-3 rounded-xl border text-[10px] uppercase font-black tracking-widest transition-all ${
                          newVideo.category === 'adults' 
                          ? 'bg-gold border-gold text-black' 
                          : 'bg-white/5 border-white/10 text-white/40'
                        }`}
                      >
                        {t.catAdults}
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewVideo({...newVideo, category: 'children'})}
                        className={`flex-1 py-3 rounded-xl border text-[10px] uppercase font-black tracking-widest transition-all ${
                          newVideo.category === 'children' 
                          ? 'bg-gold border-gold text-black' 
                          : 'bg-white/5 border-white/10 text-white/40'
                        }`}
                      >
                        {t.catChildren}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black">{t.videoTitleEn}</label>
                    <input 
                      value={newVideo.titleEn}
                      onChange={e => setNewVideo({...newVideo, titleEn: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black">{t.videoTitleAr}</label>
                  <input 
                    required
                    value={newVideo.titleAr}
                    onChange={e => setNewVideo({...newVideo, titleAr: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black">{t.videoDescAr}</label>
                  <textarea 
                    rows={3}
                    value={newVideo.descAr}
                    onChange={e => setNewVideo({...newVideo, descAr: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gold text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-gold/80 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  {t.saveVideoBtn}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Video Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {setShowEditModal(false); setEditingVideoId(null);}}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#111] border border-white/10 p-8 rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{t.editVideoTitle}</h3>
                <button onClick={() => {setShowEditModal(false); setEditingVideoId(null);}} className="text-white/40 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleUpdateVideo} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gold mb-2 font-black">{t.videoUrlLabel}</label>
                  <input 
                    required
                    type="url"
                    value={newVideo.url}
                    onChange={e => setNewVideo({...newVideo, url: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black">{t.videoSelectCategory}</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setNewVideo({...newVideo, category: 'adults'})}
                        className={`flex-1 py-3 rounded-xl border text-[10px] uppercase font-black tracking-widest transition-all ${
                          newVideo.category === 'adults' 
                          ? 'bg-gold border-gold text-black' 
                          : 'bg-white/5 border-white/10 text-white/40'
                        }`}
                      >
                        {t.catAdults}
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewVideo({...newVideo, category: 'children'})}
                        className={`flex-1 py-3 rounded-xl border text-[10px] uppercase font-black tracking-widest transition-all ${
                          newVideo.category === 'children' 
                          ? 'bg-gold border-gold text-black' 
                          : 'bg-white/5 border-white/10 text-white/40'
                        }`}
                      >
                        {t.catChildren}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black">{t.videoTitleEn}</label>
                    <input 
                      value={newVideo.titleEn}
                      onChange={e => setNewVideo({...newVideo, titleEn: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black">{t.videoTitleAr}</label>
                  <input 
                    required
                    value={newVideo.titleAr}
                    onChange={e => setNewVideo({...newVideo, titleAr: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black">{t.videoDescAr}</label>
                  <textarea 
                    rows={3}
                    value={newVideo.descAr}
                    onChange={e => setNewVideo({...newVideo, descAr: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gold text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-gold/80 transition-all flex items-center justify-center gap-2"
                >
                  {t.saveChangesBtn}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#111] border border-white/10 p-8 rounded-[2rem] max-w-md w-full max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl"
              style={{ direction: isRtl ? "rtl" : "ltr" }}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-gold">
                  <Shield className="w-5 h-5 text-gold" />
                  <h3 className="text-xl font-bold font-serif">{isRtl ? "بوابة إشراف المنصة" : "Platform Admin Portal"}</h3>
                </div>
                <button onClick={() => setShowLoginModal(false)} className="text-white/40 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Login Method Tabs */}
              <div className="flex border-b border-white/10 mb-6 font-serif">
                <button
                  type="button"
                  onClick={() => { setLoginTab("passcode"); setLoginError(""); }}
                  className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all ${
                    loginTab === "passcode" ? "border-gold text-gold" : "border-transparent text-white/40 hover:text-white"
                  }`}
                >
                  {isRtl ? "رمز المرور" : "Passcode"}
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginTab("email"); setLoginError(""); }}
                  className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all ${
                    loginTab === "email" ? "border-gold text-gold" : "border-transparent text-white/40 hover:text-white"
                  }`}
                >
                  {isRtl ? "البريد الإلكتروني" : "Email"}
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginTab("google"); setLoginError(""); }}
                  className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all ${
                    loginTab === "google" ? "border-gold text-gold" : "border-transparent text-white/40 hover:text-white"
                  }`}
                >
                  {isRtl ? "جوجل" : "Google"}
                </button>
              </div>

              {loginError && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-serif leading-relaxed">
                  {loginError}
                </div>
              )}

              {/* Tab 1: Passcode Form */}
              {loginTab === "passcode" && (
                <form onSubmit={handlePasscodeSignIn} className="space-y-4">
                  <p className="text-white/50 text-xs leading-relaxed mb-4">
                    {isRtl 
                      ? "أهلاً بك يا بشير. أدخل رمز المرور الخاص بك لتفعيل وضع التحكم وإضافة محتواك المرئي مباشرة."
                      : "Welcome Bechir. Please enter your administrator passcode to enable full control."
                    }
                  </p>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black text-right">
                      {isRtl ? "رمز مدير المنصة" : "MANAGEMENT PASSCODE"}
                    </label>
                    <div className="relative">
                      <Key className="w-4 h-4 text-white/30 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        required
                        type="password"
                        placeholder="••••••••"
                        value={loginPasscode}
                        onChange={e => setLoginPasscode(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-gold outline-none text-center font-mono"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold/80 hover:scale-[1.02] active:scale-[0.98] text-black font-black uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isRtl ? "تأكيد وتفعيل الإشراف" : "Verify Admin"}</span>
                  </button>
                  <p className="text-white/30 text-[10px] text-center italic mt-2">
                    {isRtl ? "تلميح: الرمز الافتراضي هو esteqem2026" : "Hint: Default passcode is esteqem2026"}
                  </p>
                </form>
              )}

              {/* Tab 2: Firebase Email / Password */}
              {loginTab === "email" && (
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black text-right">
                      {isRtl ? "البريد الإلكتروني المعتمد" : "AUTHORIZED EMAIL"}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-white/30 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        required
                        type="email"
                        placeholder="bechirmejri556@gmail.com"
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-gold outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-black text-right">
                      {isRtl ? "كلمة المرور" : "PASSWORD"}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-white/30 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        required
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-gold outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold/80 hover:scale-[1.02] active:scale-[0.98] text-black font-black uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{isRtl ? "تسجيل دخول" : "Sign In"}</span>
                  </button>
                </form>
              )}

              {/* Tab 3: Google Sign-In */}
              {loginTab === "google" && (
                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                  <p className="text-white/50 text-xs text-center leading-relaxed max-w-xs">
                    {isRtl 
                      ? "اضغط للدخول المباشر بحساب جوجل الخاص بك. يجب أن يكون الحساب هو bechirmejri556@gmail.com لتفعيل الأدوات."
                      : "Sign in with Google using bechirmejri556@gmail.com to directly activate the admin workspace."
                    }
                  </p>
                  <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="w-full bg-white hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] text-black font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" width="100%" height="100%">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.29 1.5-.1.08-1.5 1.5l.08.08 3.12 2.42c1.8-1.67 2.8-4.14 2.8-7.22z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.12-2.42c-.87.59-1.99.95-3.21.95-2.46 0-4.55-1.63-5.3-3.83L5.07 18.91C7.07 22.87 11.2 24 12 24z" />
                      <path fill="#FBBC05" d="M6.7 15.79A6.92 6.92 0 0 1 6.3 12c0-.66.11-1.31.3-1.92L3.38 7.55A11.96 11.96 0 0 0 0 12c0 1.63.33 3.2 1 4.62l5.7-4.83z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.96 1.19 15.24 0 12 0 7.7 0 3.97 2.45 2.05 6.09l5.3 4.12A6.93 6.93 0 0 1 12 4.75z" />
                    </svg>
                    <span>{isRtl ? "تسجيل دخول بواسطة Google" : "Sign in with Google"}</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
