import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Orbit, 
  Sparkles,
  Brain,
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  MessageSquare,
  Minimize2,
  Maximize2,
  Cpu
} from "lucide-react";
import { Translation, Language } from "../translations";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  citations?: { title: string; uri: string }[];
}

interface AIAssistantProps {
  t: Translation;
  currentLang: Language;
  bechirAvatar?: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ t, currentLang, bechirAvatar }) => {
  const BECHIR_AVATAR_PATH = bechirAvatar || "/src/assets/images/bechir_exact_reproduction_1780526872274.png";
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTrigger = (e: any) => {
      const { prompt, isOpen: shouldOpen } = e.detail || {};
      if (shouldOpen !== undefined) setIsOpen(shouldOpen);
      if (prompt) {
        setInput(prompt);
        // We don't auto-send because user might want to edit, 
        // but we'll open it if a prompt is sent.
        setIsOpen(true);
        setIsMinimized(false);
      }
    };

    window.addEventListener('trigger-ai-assistant', handleTrigger);
    return () => window.removeEventListener('trigger-ai-assistant', handleTrigger);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Show immediately and stay forever until opened
    setShowHint(true);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Notify owner on first message of the session
    const hasNotifiedChat = sessionStorage.getItem('chat_notified');
    if (!hasNotifiedChat) {
      import('../services/notifier').then(({ notifyOwner, NotificationType }) => {
        notifyOwner(NotificationType.CONSULTATION, {
          subject: "تنبيه: بدأ زائر استشارة ذكية جديدة",
          message: `بدأ زائر محادثة مع المساعد الذكي الآن: "${userMessage}"`,
          details: {
            "الرسالة الأولى": userMessage,
            "توقيت الاستشارة": new Date().toLocaleString('ar-TN')
          },
          emailHtml: `
            <div style="direction: rtl; font-family: sans-serif;">
              <h2 style="color: #d4af37;">إشعار استشارة ذكية - مدارات النفس</h2>
              <p>بدأ زائر محادثة مع المساعد الذكي الآن.</p>
              <p><strong>أول رسالة للزائر:</strong> "${userMessage}"</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
              <p><strong>توقيت الاستشارة:</strong> ${new Date().toLocaleString('ar-TN')}</p>
              <p><strong>رابط المنصة:</strong> <a href="${window.location.origin}">${window.location.origin}</a></p>
            </div>
          `
        });
      });
      sessionStorage.setItem('chat_notified', 'true');
    }

    try {
      const response = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMessage,
          lang: currentLang,
          history: messages, // Send history for context awareness
          context: "Psychology, personality, and social behavior research platform 'Madarat Al-Nafs' by Bechir Mejri."
        })
      });

      const data = await response.json();
      if (data.answer) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.answer,
          citations: data.citations
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: t.aiAssistantError }]);
      }
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: t.aiAssistantError }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isRtl = currentLang === 'ar';

  return (
    <div id="ai-assistant" className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-[100] flex flex-col items-start`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "62px" : "540px",
              width: "380px"
            }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="mb-4 bg-gradient-to-b from-[#0a0704]/98 to-black/98 backdrop-blur-2xl border-2 border-gold/35 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col transition-all duration-300"
          >
            {/* Header with Luxury gold dynamic gradient */}
            <div className="p-4 bg-gradient-to-b from-[#1c1409] to-[#040301] border-b border-gold/25 flex items-center justify-between relative">
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gold/30 blur-md rounded-full animate-pulse" />
                  <div className="relative w-9 h-9 rounded-full border-2 border-gold/55 overflow-hidden bg-black p-0.5 flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.45)]">
                    <img 
                      src={BECHIR_AVATAR_PATH} 
                      alt="Bechir Mejri" 
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif italic text-gold text-sm tracking-wide font-medium leading-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{currentLang === 'ar' ? 'المستشار الذكي (أ. بشير الماجري)' : 'Smart Advisor (Mr. Bechir Mejri)'}</span>
                  <span className="text-[9px] text-[#fbf0cc]/50 font-sans uppercase tracking-[0.15em] mt-1">{currentLang === 'ar' ? 'نموذج محاكاة مدارات النفس' : 'Madarat Al-Nafs Simulation'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/40 hover:text-gold transition-colors p-1 rounded-md hover:bg-white/5"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4 text-gold/80" /> : <Minimize2 className="w-4 h-4 text-gold/80" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-gold transition-colors p-1 rounded-md hover:bg-white/5"
                >
                  <X className="w-4 h-4 text-gold/80" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages with custom beautiful glass look */}
                <div 
                  className="flex-1 overflow-y-auto p-4 space-y-4 selection:bg-gold selection:text-black custom-scrollbar relative"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#d4af37 rgba(255,255,255,0.02)'
                  }}
                >
                  {/* Internal Subtle Pattern / Luxury Brand Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] select-none p-12 z-0">
                    <img 
                      src="/src/assets/images/madarat_logo_gold_1779019384553.png" 
                      alt="Watermark Logo" 
                      className="w-full max-w-[240px] h-auto object-contain"
                    />
                  </div>

                  {messages.length === 0 && (
                    <div className="text-center py-6 relative z-10">
                      <div className="relative w-18 h-18 mx-auto mb-4">
                        <div className="absolute inset-0 bg-gold/30 blur-lg rounded-full animate-pulse" />
                        <div className="relative w-18 h-18 bg-gradient-to-b from-[#1c1409] to-black border-2 border-gold/50 rounded-full flex items-center justify-center p-0.5 overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                          <img 
                            src={BECHIR_AVATAR_PATH} 
                            alt="Bechir Mejri Portrait" 
                            className="w-full h-full object-cover rounded-full"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      <p className="text-gold/80 text-xs leading-relaxed max-w-[260px] mx-auto mb-6 font-serif px-2">
                        {t.aiAssistantWelcome}
                      </p>
                      
                      <div className="flex flex-wrap justify-center gap-2 max-w-[340px] mx-auto">
                        {(currentLang === 'ar' ? [
                          "تفكيك لغة الجسد وكشف الكذب",
                          "بناء السيادة الشخصية وتوكيد الذات",
                          "التعامل السليم مع الشخصيات المعقدة",
                          "الاتزان العاطفي والتحكم المظهري"
                        ] : [
                          "Decoding Body Language & Lie Detection",
                          "Personal Sovereignty & Boundary Setting",
                          "Smart Dealing with Toxic Personalities",
                          "Emotional Control & Professional Calm"
                        ]).map((prompt, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setInput(prompt);
                            }}
                            className="text-[10px] px-3.5 py-2 bg-[#120e08]/60 border border-gold/25 hover:bg-gold/15 rounded-xl text-gold/80 hover:text-white hover:border-gold/60 transition-all duration-300 font-medium whitespace-nowrap shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                          >
                            ✦ {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 items-start ${msg.role === 'user' ? 'flex-row-reverse self-end animate-fade-in' : 'flex-row self-start'} max-w-[92%] relative z-10`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full border border-gold/50 flex-shrink-0 overflow-hidden bg-black shadow-[0_0_10px_rgba(212,175,55,0.35)] mt-1">
                          <img 
                            src={BECHIR_AVATAR_PATH} 
                            alt="Bechir Mejri AI Advisor" 
                            className="w-full h-full object-cover rounded-full"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      
                      <div className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-[0_4px_12px_rgba(0,0,0,0.5)] ${
                        msg.role === 'user' 
                          ? 'bg-gradient-to-br from-[#d4af37] to-[#aa8c2c] text-black font-bold rounded-tr-none border border-gold/30' 
                          : 'bg-[#15110a]/85 backdrop-blur-md text-white/95 border border-gold/25 rounded-tl-none font-serif'
                      }`}>
                        {msg.content}
                        
                        {msg.citations && msg.citations.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-gold/15 space-y-1.5">
                            <p className="text-[9px] text-[#fbf0cc]/50 uppercase tracking-widest font-black flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5 text-gold" />
                              {currentLang === 'ar' ? 'المصادر المرجعية:' : 'Reference Sources:'}
                            </p>
                            {msg.citations.map((cite, idx) => (
                              <a 
                                key={idx} 
                                href={cite.uri} 
                                target="_blank" 
                                rel="noreferrer"
                                className="block text-[10px] text-gold hover:text-white hover:underline truncate"
                              >
                                • {cite.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start gap-3 items-start relative z-10">
                      <div className="w-8 h-8 rounded-full border border-gold/50 flex-shrink-0 overflow-hidden bg-black shadow-[0_0_10px_rgba(212,175,55,0.35)] mt-1">
                        <img 
                          src={BECHIR_AVATAR_PATH} 
                          alt="AI Advisor loading" 
                          className="w-full h-full object-cover rounded-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="bg-[#15110a]/80 backdrop-blur-md text-white/70 border border-gold/25 p-3.5 rounded-2xl rounded-tl-none text-xs flex items-center gap-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.5)] font-serif">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-gold" />
                        {t.aiAssistantLoading}
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input with elegant gilded borders */}
                <form onSubmit={handleSend} className="p-4 border-t border-gold/15 bg-gradient-to-b from-black to-[#0d0a06]">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={t.aiAssistantPlaceholder}
                      className="w-full bg-[#070503] border border-gold/25 hover:border-gold/40 focus:border-gold rounded-xl py-2.5 px-4 pr-11 text-xs text-white placeholder-white/30 focus:outline-none focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gold disabled:opacity-30 p-2 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-gold" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {showHint && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-full mb-4 left-0 whitespace-nowrap bg-black/95 backdrop-blur-md text-gold px-4 py-2.5 rounded-xl text-xs font-serif border border-gold/40 shadow-[0_4px_25px_rgba(212,175,55,0.3)] flex items-center gap-2.5 cursor-pointer z-50 hover:border-gold hover:text-white transition-all duration-300"
              onClick={() => {
                setIsOpen(true);
                setShowHint(false);
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span className="tracking-wide font-medium leading-normal">{t.aiAssistantGreeting}</span>
              <div className="absolute bottom-[-8px] left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-gold/40" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ 
            scale: 1.06,
            boxShadow: [
              "0 0 35px 8px rgba(212, 175, 55, 0.45)",
              "0 0 70px 25px rgba(212, 175, 55, 0.25)",
              "0 0 35px 8px rgba(212, 175, 55, 0.45)"
            ]
          }}
          whileTap={{ scale: 0.96 }}
          animate={!isOpen ? {
            boxShadow: [
              "0 0 25px 0 rgba(212, 175, 55, 0.35)",
              "0 0 55px 15px rgba(212, 175, 55, 0.18)",
              "0 0 25px 0 rgba(212, 175, 55, 0.35)"
            ]
          } : {}}
          transition={!isOpen ? {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowHint(false);
          }}
          className="bg-gradient-to-b from-[#1c140a] via-[#0b0805] to-black text-gold w-24 h-24 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.3)] flex items-center justify-center border-2 border-gold/50 group overflow-hidden relative z-40 transition-all duration-500 hover:border-gold-light"
        >
          {/* Concentric Orbiting Spheres & Rings matching the Logo's theme */}
          <div className="absolute inset-1 border border-gold/20 rounded-full pointer-events-none group-hover:scale-105 group-hover:border-gold/40 transition-all duration-700" />
          <div className="absolute inset-2.5 border border-dashed border-gold/15 rounded-full pointer-events-none animate-spin-slow" />
          <div className="absolute inset-4.5 border border-dotted border-gold/10 rounded-full pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '30s', animationName: 'spin-slow' }} />
          
          {/* Orbital nodes (Floating glowing points of light representing Mind, Heart, Connection) */}
          <div className="absolute w-1.5 h-1.5 bg-gold rounded-full top-2 left-1/2 -ml-0.75 animate-ping opacity-60 pointer-events-none" />
          <div className="absolute w-1 h-1 bg-gold rounded-full top-2 left-1/2 -ml-0.5 shadow-[0_0_8px_#d4af37] pointer-events-none" />
          <div className="absolute w-1 h-1 bg-gold/80 rounded-full bottom-3 right-6 shadow-[0_0_6px_#d4af37] pointer-events-none" />
          
          {/* Deluxe Metallic Light Sweep / Luxury Shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
          
          {/* Back light glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.25)_0%,transparent_70%)] opacity-80 group-hover:opacity-100 transition-opacity" />

          {isOpen ? (
            <X className="w-8 h-8 relative z-10 text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] hover:rotate-90 transition-transform duration-300" />
          ) : (
            <div className="relative w-full h-full p-3 flex items-center justify-center">
              <motion.div 
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.7, 0.95, 0.7]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-3 bg-gold/25 blur-xl rounded-full" 
              />
              <div className="relative z-10 w-full h-full flex items-center justify-center rounded-full overflow-hidden p-0.5">
                <img 
                  src={BECHIR_AVATAR_PATH} 
                  alt="Bechir Mejri AI Advisor Launcher" 
                  className="w-full h-full object-cover group-hover:scale-112 group-hover:rotate-3 transition-all duration-500 rounded-full drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-0 right-1">
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                </div>
              </div>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
};
