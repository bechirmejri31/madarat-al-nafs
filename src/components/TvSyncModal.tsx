import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tv, 
  Smartphone, 
  Wifi, 
  X, 
  Check, 
  Loader2, 
  Sparkles, 
  MonitorPlay, 
  HelpCircle, 
  QrCode, 
  Camera, 
  Copy, 
  Monitor, 
  Laptop, 
  ArrowRightLeft, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  Radio, 
  Activity, 
  Eye, 
  Zap, 
  RefreshCw, 
  Maximize2, 
  Minimize2,
  Settings,
  Flame,
  ArrowRight,
  Database,
  Grid
} from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, setDoc, onSnapshot, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { QRCodeSVG } from 'qrcode.react';
import { Html5Qrcode } from 'html5-qrcode';

interface TvSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRtl: boolean;
  currentLang: string;
}

// 1. Dual-tone Web Audio Synthesizer for high-end tactile feel
const playSynthAudio = (type: 'click' | 'success' | 'fail' | 'keypress', pitchMultiplier = 1) => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    if (type === 'keypress') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      // mechanical subtle keyclick frequency
      const freq = 850 * pitchMultiplier;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq / 2.5, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.008, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(980 * pitchMultiplier, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'success') {
      // Golden dual-tone major chord Arpeggio (C5 then E5)
      const playTone = (freq: number, startDelay: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);
        gain.gain.setValueAtTime(0.015, ctx.currentTime + startDelay);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startDelay + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + startDelay);
        osc.stop(ctx.currentTime + startDelay + duration + 0.05);
      };
      playTone(523.25, 0, 0.15); // C5
      playTone(659.25, 0.08, 0.25); // E5
    } else if (type === 'fail') {
      // Warm frequency pitch drop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch (e) {
    console.warn("High fidelity synthesizer blocked/muted:", e);
  }
};

// 2. Physical haptics feedback
const playHapticNotification = (intensity = 15) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(intensity);
    } catch {
      // Catch silently
    }
  }
};

export function TvSyncModal({ isOpen, onClose, isRtl, currentLang }: TvSyncModalProps) {
  const [mode, setMode] = useState<'selection' | 'tv-screen' | 'phone-controller'>('selection');
  const [activeTab, setActiveTab] = useState<'wireless' | 'interactive' | 'direct'>('interactive');
  const [copied, setCopied] = useState(false);
  const [pin, setPin] = useState('');
  const [inputPin, setInputPin] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [tvSessionState, setTvSessionState] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannerError, setScannerError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [telemetryLatency, setTelemetryLatency] = useState(24);
  const [signalCoherence, setSignalCoherence] = useState(98);

  // Animated breathing and EMDR positions for the live simulated preview
  const [simulatedBreath, setSimulatedBreath] = useState(1);
  const [simulatedEmdrPos, setSimulatedEmdrPos] = useState(50);
  const [emdrDirection, setEmdrDirection] = useState(1);

  // Auto animation for live simulated preview (runs when modal is in selection or TV screen modes)
  useEffect(() => {
    let breathInterval: any;
    let emdrInterval: any;

    if (isOpen) {
      // 1. Simulated Breathing Sine-wave
      let time = 0;
      breathInterval = setInterval(() => {
        time += 0.05;
        // Breathing scale cycles smoothly
        setSimulatedBreath(1 + Math.sin(time) * 0.4);
      }, 50);

      // 2. Simulated EMDR horizontal bounce
      emdrInterval = setInterval(() => {
        setSimulatedEmdrPos((prev) => {
          let next = prev + emdrDirection * 4;
          if (next >= 90) {
            setEmdrDirection(-1);
            return 90;
          }
          if (next <= 10) {
            setEmdrDirection(1);
            return 10;
          }
          return next;
        });
      }, 40);
    }

    return () => {
      clearInterval(breathInterval);
      clearInterval(emdrInterval);
    };
  }, [isOpen, emdrDirection]);

  // Tab changes
  const handleTabChange = (tab: 'wireless' | 'interactive' | 'direct') => {
    setActiveTab(tab);
    setMode('selection');
    playSynthAudio('click', 1.05);
    playHapticNotification(14);
  };

  const handleModeChange = (targetMode: 'selection' | 'tv-screen' | 'phone-controller') => {
    setMode(targetMode);
    playSynthAudio('click', 0.95);
    playHapticNotification(18);
  };

  // Telemetry fluctuation simulator
  useEffect(() => {
    if (!connected) return;
    const interval = setInterval(() => {
      setTelemetryLatency(Math.floor(12 + Math.random() * 10));
      setSignalCoherence(Math.floor(95 + Math.random() * 5));
    }, 4000);
    return () => clearInterval(interval);
  }, [connected]);

  // 1. ACT AS TV SCREEN (Receiver Host)
  useEffect(() => {
    if (mode !== 'tv-screen') return;

    // Generate secure randomized unique pin code
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();
    setPin(newPin);

    const sessionRef = doc(db, 'tv_sessions', newPin);
    setDoc(sessionRef, {
      pinCode: newPin,
      activeTab: 'tv',
      isTvAmbientActive: true,
      currentResearchId: null,
      isPlayingAcoustic: false,
      tvBreathScale: 1.0,
      tvEyeX: 50,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }).then(() => {
      // Watch real-time controller commands inside Firestore
      const unsubscribe = onSnapshot(sessionRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setTvSessionState(data);
          setConnected(true);
          
          // Audio cue on connection or state edits
          playSynthAudio('keypress', 1.1);

          // Dispatch window events to propagate actions across other components
          if (data.activeTab) {
            window.dispatchEvent(new CustomEvent('tv-active-tab', { detail: data.activeTab }));
          }
          if (data.currentResearchId) {
            window.dispatchEvent(new CustomEvent('tv-open-research', { detail: data.currentResearchId }));
          }
          if (data.tvBreathScale !== undefined) {
            window.dispatchEvent(new CustomEvent('tv-breath-scale', { detail: data.tvBreathScale }));
          }
          if (data.tvEyeX !== undefined) {
            window.dispatchEvent(new CustomEvent('tv-eye-x', { detail: data.tvEyeX }));
          }
          if (data.isPlayingAcoustic !== undefined) {
            window.dispatchEvent(new CustomEvent('tv-acoustic-state', { detail: data.isPlayingAcoustic }));
          }
          
          // Smoothly map connection parameters onto the URL bar silently
          const params = new URLSearchParams(window.location.search);
          if (params.get('pin') !== newPin) {
            params.set('pin', newPin);
            window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
          }
        }
      });

      return () => unsubscribe();
    }).catch(err => {
      console.error("Failed to host Firebase TV broadcasting session:", err);
    });
  }, [mode]);

  // 2. ACT AS SMARTPHONE CONTROLLER (Sender Command Panel)
  const connectWithPin = async (pinCode: string) => {
    if (!pinCode || pinCode.length !== 4) return false;
    setConnecting(true);
    playSynthAudio('click', 1.25);

    try {
      const docRef = doc(db, 'tv_sessions', pinCode);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setConnected(true);
        setPin(pinCode);
        localStorage.setItem('paired_tv_pin_v2', pinCode);

        // Tell system client acts as remote controller
        window.dispatchEvent(new CustomEvent('tv-paired-as-controller', { detail: pinCode }));
        
        // Listen dynamically for bidirectional synchrony
        onSnapshot(docRef, (snapshot) => {
          if (snapshot.exists()) {
            setTvSessionState(snapshot.data());
          }
        });
        playSynthAudio('success');
        playHapticNotification(40);
        return true;
      } else {
        playSynthAudio('fail');
        alert(isRtl 
          ? '⚠️ رمز الاقتران غير صحيح أو انتهى وقته. يرجى إعادة مراجعته على شاشة التلفاز.' 
          : '⚠️ Active Session PIN is invalid or expired. Verify the code showing on your TV screen.');
        return false;
      }
    } catch (err) {
      playSynthAudio('fail');
      console.error("Television connection error:", err);
      return false;
    } finally {
      setConnecting(false);
    }
  };

  const handleConnectPhone = async () => {
    await connectWithPin(inputPin);
  };

  // 3. CAMERA BARCODE INSTANT SCANNER
  useEffect(() => {
    let html5QrCode: Html5Qrcode | null = null;
    
    if (isScanning && isOpen && mode === 'phone-controller' && !connected) {
      setScannerError(null);
      
      const timer = setTimeout(() => {
        try {
          html5QrCode = new Html5Qrcode("qr-reader");
          html5QrCode.start(
            { facingMode: "environment" },
            {
              fps: 15,
              qrbox: (width, height) => {
                const min = Math.min(width, height);
                const size = Math.floor(min * 0.75);
                return { width: size, height: size };
              }
            },
            async (decodedText) => {
              try {
                let targetPin = '';
                if (decodedText.startsWith('http')) {
                  const url = new URL(decodedText);
                  targetPin = url.searchParams.get('pin') || '';
                } else {
                  targetPin = decodedText.trim();
                }
                
                if (targetPin && targetPin.length === 4 && /^\d+$/.test(targetPin)) {
                  setIsScanning(false);
                  playSynthAudio('success');
                  if (html5QrCode) {
                    await html5QrCode.stop().catch(err => console.warn("Scanner shutdown notice:", err));
                  }
                  await connectWithPin(targetPin);
                }
              } catch (e) {
                console.error("QR match error:", e);
              }
            },
            () => {}
          ).catch(err => {
            console.error("Camera permissions blocked:", err);
            setScannerError(
              isRtl 
                ? "⚠️ لم نستطع تنشيط موجة الكاميرا المباشرة. يرجى السماح بالرخصة في متصفحك أو استخدام الإدخال اليدوي."
                : "⚠️ Camera stream was blocked. Please authorize permission in your browser or key in the PIN."
            );
          });
        } catch (e) {
          console.error("Scanner startup error:", e);
        }
      }, 150);

      return () => {
        clearTimeout(timer);
        if (html5QrCode && html5QrCode.isScanning) {
          html5QrCode.stop().catch(err => console.warn("Cleanup scanner stop error:", err));
        }
      };
    }
    
    return () => {};
  }, [isScanning, isOpen, mode, connected]);

  // Firestore update abstraction
  const updateSessionField = async (field: string, value: any) => {
    if (!pin) return;
    try {
      const sessionRef = doc(db, 'tv_sessions', pin);
      await updateDoc(sessionRef, {
        [field]: value,
        updatedAt: serverTimestamp()
      });
      playSynthAudio('keypress', 1.05);
      playHapticNotification(8);
    } catch (e) {
      console.error("Sync telemetry update failed:", e);
    }
  };

  // Virtual Keypad input handler
  const handleVirtualKeyPress = (key: string) => {
    playSynthAudio('keypress', 0.9 + (inputPin.length * 0.08));
    playHapticNotification(11);
    
    if (key === 'C') {
      setInputPin('');
    } else if (key === '<') {
      setInputPin(prev => prev.slice(0, -1));
    } else if (/^\d$/.test(key)) {
      if (inputPin.length < 4) {
        const nextPin = inputPin + key;
        setInputPin(nextPin);
        if (nextPin.length === 4) {
          // Autocomplete handshake trigger
          setTimeout(() => {
            connectWithPin(nextPin);
          }, 300);
        }
      }
    }
  };

  // Flush connection
  const handleDisconnect = () => {
    playSynthAudio('fail');
    playHapticNotification(30);
    setConnected(false);
    setPin('');
    setInputPin('');
    setTvSessionState(null);
    setMode('selection');
    localStorage.removeItem('paired_tv_pin_v2');
    window.dispatchEvent(new CustomEvent('tv-disconnected'));
  };

  // Automatic handshake pairing from localstorage on initialization
  useEffect(() => {
    if (!isOpen) return;
    
    const savedPin = localStorage.getItem('paired_tv_pin_v2');
    const params = new URLSearchParams(window.location.search);
    const urlPin = params.get('pin');
    const urlRole = params.get('role');

    // Priority 1: URL Pairing Request Link
    if (urlPin && urlPin.length === 4 && urlRole === 'remote' && !connected && !connecting) {
      setMode('phone-controller');
      setInputPin(urlPin);
      connectWithPin(urlPin);
    } 
    // Priority 2: Standard localStorage auto reconnection check
    else if (savedPin && savedPin.length === 4 && !connected && !connecting) {
      const docRef = doc(db, 'tv_sessions', savedPin);
      getDoc(docRef).then((snap) => {
        if (snap.exists()) {
          setConnected(true);
          setPin(savedPin);
          setMode('phone-controller');
          window.dispatchEvent(new CustomEvent('tv-paired-as-controller', { detail: savedPin }));
          onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
              setTvSessionState(snapshot.data());
            }
          });
          playSynthAudio('success');
        }
      });
    }
  }, [isOpen]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://madarat-al-nafs-534883887954.europe-west2.run.app");
    setCopied(true);
    playSynthAudio('success');
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-3 md:p-6 bg-black/98 md:bg-black/95 backdrop-blur-3xl overflow-y-auto transition-all duration-300 ${
        isFullscreen ? 'p-0 bg-black' : ''
      }`} 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <motion.div 
        initial={{ scale: 0.96, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full bg-[#030303] border border-white/[0.06] text-white font-sans overflow-hidden transition-all duration-500 z-10 ${
          isFullscreen 
            ? 'w-screen h-screen border-none rounded-none p-5 md:p-10 flex flex-col justify-between' 
            : 'max-w-4xl rounded-[40px] p-4 md:p-8 my-4 shadow-[0_0_120px_rgba(212,175,55,0.06),inset_0_1px_1px_rgba(255,255,255,0.05)] border-t-gold/25'
        }`}
        id="tv-sync-modal-panel"
      >
        {/* Ambient background glows for professional mood */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.03),transparent_70%)] pointer-events-none" />
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_95%,rgba(212,175,55,0.02))] pointer-events-none" />

        {/* Modal Top Header Bar */}
        <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/[0.04] relative z-20">
          <div className="flex items-center gap-3.5">
            <div className="relative p-3 bg-gradient-to-b from-[#151515] to-[#0a0a0a] text-gold rounded-[18px] border border-white/5 flex items-center justify-center shadow-inner">
              <Tv className="w-6 h-6 animate-pulse" />
              {connected && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#030303] animate-ping" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base md:text-xl font-serif font-black tracking-wide text-white leading-tight">
                  {isRtl ? "مدارات الاستقبال الذكي والتلفزة" : "Cinematic TV Casting System"}
                </h3>
                <span className="px-1.5 py-0.5 bg-gold/10 text-gold text-[8px] font-mono rounded border border-gold/20 uppercase tracking-widest leading-none">V2.0 PRO</span>
              </div>
              <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase mt-0.5">
                {isRtl ? "نظام ربط ومزامنة الشاشات التفاعلية فائق السرعة" : "Ultra-Low-Latency Handshake & Master Transmission Hub"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* TV Screen Fullscreen Toggle Button */}
            {mode === 'tv-screen' && (
              <button
                onClick={() => {
                  setIsFullscreen(!isFullscreen);
                  playSynthAudio('click', 1.15);
                  playHapticNotification(15);
                }}
                className="p-2 text-white/50 hover:text-gold hover:bg-white/5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono border border-white/5"
                title={isRtl ? "تنشيط ملء الشاشة لعرض كامل" : "Full Theater Mode"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                <span className="hidden md:inline font-bold">{isFullscreen ? (isRtl ? "تصغير" : "Minimize") : (isRtl ? "شاشة كاملة" : "Fullscreen")}</span>
              </button>
            )}

            <button 
              onClick={onClose}
              className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all cursor-pointer border border-white/5 bg-white/[0.01]"
              id="tv-sync-close-button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global tab selector - Hidden during fullscreen receiver or active controller for cleaner focus */}
        {(!connected || mode !== 'phone-controller') && !isFullscreen && (
          <div className="grid grid-cols-3 bg-[#0a0a0a] border border-white/[0.04] p-1 rounded-2xl mb-5 relative z-10 shadow-inner">
            <button
              onClick={() => handleTabChange('interactive')}
              className={`py-3 md:py-4 rounded-xl text-[10px] md:text-sm font-bold tracking-wider flex flex-col md:flex-row items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                activeTab === 'interactive' || mode !== 'selection'
                  ? 'bg-gradient-to-r from-gold via-amber-500 to-amber-600 text-black shadow-[0_4px_20px_rgba(212,175,55,0.15)] font-black' 
                  : 'text-white/60 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <ArrowRightLeft className="w-4 h-4 shrink-0" />
              <span>{isRtl ? "الربط التفاعلي الذكي (الريموت)" : "Tactile Smart Remote"}</span>
            </button>

            <button
              onClick={() => handleTabChange('wireless')}
              className={`py-3 md:py-4 rounded-xl text-[10px] md:text-sm font-bold tracking-wider flex flex-col md:flex-row items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                activeTab === 'wireless' && mode === 'selection'
                  ? 'bg-gradient-to-r from-gold via-amber-500 to-amber-600 text-black shadow-[0_4px_20px_rgba(212,175,55,0.15)] font-black' 
                  : 'text-white/60 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Wifi className="w-4 h-4 shrink-0" />
              <span>{isRtl ? "البث اللاسلكي الكلاسيكي" : "Wireless Mirroring"}</span>
            </button>

            <button
              onClick={() => handleTabChange('direct')}
              className={`py-3 md:py-4 rounded-xl text-[10px] md:text-sm font-bold tracking-wider flex flex-col md:flex-row items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                activeTab === 'direct' && mode === 'selection'
                  ? 'bg-gradient-to-r from-gold via-amber-500 to-amber-600 text-black shadow-[0_4px_20px_rgba(212,175,55,0.15)] font-black' 
                  : 'text-white/60 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Monitor className="w-4 h-4 shrink-0" />
              <span>{isRtl ? "متصفح التلفاز المباشر" : "Smart TV Browser"}</span>
            </button>
          </div>
        )}

        {/* 1. SELECTION & WIRELESS CAST OVERVIEW */}
        {mode === 'selection' && activeTab === 'wireless' && (
          <div className="space-y-6 relative z-10 py-2">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex gap-2 items-center px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-[10px] text-gold uppercase font-mono tracking-widest font-black">
                <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                <span>{isRtl ? "دعم شبكات الاتصال المباشر" : "CLASSIC NATIVE AIR-MIRRORING"}</span>
              </div>
              <h4 className="text-white font-serif font-black text-lg md:text-2xl tracking-wide">
                {isRtl ? "البث اللاسلكي الفوري بكامل الدقة والسرعة" : "Display Instantly Via Standard TV Cast Settings"}
              </h4>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-xl mx-auto font-sans">
                {isRtl 
                  ? "جميع التلفزيونات والحواسيب الحديثة مجهزة بتقنيات البث اللاسلكي التلقائي. لا حاجة لإضافات! ما عليك سوى التمرير بهاتفك وبث الصورة:"
                  : "Every modern smartphone is built with an native screen-mirroring client. Cast your entire desktop or handset display straight to the living room TV:"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
              {/* Apple AirPlay Block */}
              <div className="bg-[#070707] border border-white/[0.04] bg-gradient-to-b from-white/[0.02] to-transparent p-6 rounded-3xl flex gap-x-4 hover:border-gold/30 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl pointer-events-none group-hover:bg-gold/5 transition-all" />
                <div className="bg-white/[0.03] border border-white/5 text-white/90 p-3 rounded-2xl h-fit shrink-0 font-serif font-black text-center shadow-lg"> iOS</div>
                <div className="space-y-2">
                  <h5 className="text-gold font-black text-xs md:text-sm">
                    {isRtl ? "نظام آبل والآيفون (Apple AirPlay)" : "Apple AirPlay (iOS / MacOS)"}
                  </h5>
                  <ul className="text-[11px] md:text-xs text-white/40 space-y-2 list-inside list-decimal leading-relaxed">
                    <li>{isRtl ? "اسحب لأسفل لفتح مركز التحكم بهاتفك." : "Drag down to view iOS Control Center."}</li>
                    <li>{isRtl ? "انقر على رمز انعكاس الشاشة 🔲 (Screen Mirroring)." : "Tap the Screen Mirroring 🔲 logo."}</li>
                    <li>{isRtl ? "ابحث عن اسم تلفازك الذكي للمشاركة." : "Select your active living room Apple TV."}</li>
                  </ul>
                </div>
              </div>

              {/* Android Cast Block */}
              <div className="bg-[#070707] border border-white/[0.04] bg-gradient-to-b from-white/[0.02] to-transparent p-6 rounded-3xl flex gap-x-4 hover:border-gold/30 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl pointer-events-none group-hover:bg-gold/5 transition-all" />
                <div className="bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 p-3 rounded-2xl h-fit shrink-0 font-serif font-black text-center shadow-lg">🤖 AND</div>
                <div className="space-y-2">
                  <h5 className="text-gold font-black text-xs md:text-sm">
                    {isRtl ? "نظام أندرويد وسامسونج (Smart View)" : "Android Screen Share (Smart View / Cast)"}
                  </h5>
                  <ul className="text-[11px] md:text-xs text-white/40 space-y-2 list-inside list-decimal leading-relaxed">
                    <li>{isRtl ? "اسحب لوحة الإشعارات السريعة مرتين لأسفل." : "Swipe down to open Quick Settings."}</li>
                    <li>{isRtl ? "انقر على بث الشاشة (Cast / Smart View)." : "Tap Cast, Screen Share, or Smart View."}</li>
                    <li>{isRtl ? "اختر شاشتك الكبيرة وانقر البدء الآن." : "Choose target TV to initiate synchronous cast."}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Helper Tips with animations */}
            <div className="p-4 bg-gradient-to-r from-zinc-950 via-zinc-900/60 to-zinc-950 border border-gold/15 rounded-2xl flex items-start gap-3.5 max-w-xl mx-auto shadow-xl">
              <Laptop className="w-5.5 h-5.5 text-gold shrink-0 mt-0.5 animate-pulse" />
              <div className="text-[11px] md:text-xs text-white/70 leading-relaxed">
                <span className="font-bold text-gold block mb-0.5">{isRtl ? "💻 البث المباشر الفوري باستخدام متصفح كروم" : "💻 Computer Casting (Google Chrome)"}</span>
                {isRtl 
                  ? "على جهاز اللابتوب الخاص بك، انقر بزر الماوس الأيمن في أي مساحة فارغة بالمنصة واضغط على 'إرسال...' (Cast) لتصدير الصورة فوراً وبث المحتوى للتلفاز."
                  : "On your Chrome browser, click top-right custom options menu -> select 'Save and Share' -> then choose 'Cast...' to pipeline this workspace of مدارات النفس."}
              </div>
            </div>

            <div className="text-center pt-3">
              <button 
                onClick={onClose}
                className="px-10 py-4 bg-gradient-to-r from-gold to-amber-500 text-black font-extrabold text-xs tracking-widest uppercase rounded-2xl hover:brightness-110 hover:scale-[1.02] active:scale-98 transition-all duration-300 cursor-pointer shadow-lg shadow-gold/15"
              >
                {isRtl ? "فهمت الخطوات، أنا مستعد للعرض" : "READY — LET'S INITIATE SCREEN MIRRORING"}
              </button>
            </div>
          </div>
        )}

        {/* 2. DIRECT TV BROWSER CONFIG */}
        {mode === 'selection' && activeTab === 'direct' && (
          <div className="space-y-6 relative z-10 text-center py-2 flex flex-col items-center">
            <div className="max-w-xl mx-auto space-y-2">
              <h4 className="text-white font-serif font-black text-lg md:text-2xl mt-1 leading-tight">
                {isRtl ? "تحميل المنصة كـ تطبيق ويب مدمج بالتلفاز" : "Run Directly Inside your Smart TV Web Browser"}
              </h4>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed font-sans">
                {isRtl 
                  ? "افتح متصفح الويب المدمج في تلفازك الذكي واكتب الرابط المباشر للمنصة لتجربة غامرة واستجابة فورية:"
                  : "Load the default internet browser app built into your Smart TV (Samsung, LG, Sony, etc.) and enter this short link:"}
              </p>
            </div>

            <div className="p-6 bg-zinc-950/80 border border-white/[0.04] rounded-[28px] flex flex-col items-center gap-4 max-w-md w-full shadow-2xl relative">
              <span className="text-[10px] text-gold uppercase font-mono tracking-[0.25em] font-black block">
                {isRtl ? "عنوان الرابط لتلفزيونك" : "WEB ADDRESS ENDPOINT"}
              </span>
              
              <div className="w-full bg-black/90 border border-white/10 rounded-2xl py-4 px-4 flex items-center justify-between text-xs font-mono text-white/90 select-all overflow-hidden shadow-inner">
                <span className="truncate text-gold/90 font-bold">https://madarat-al-nafs-534883887954.europe-west2.run.app</span>
                <button
                  onClick={handleCopyLink}
                  className="ml-2 shrink-0 p-2.5 bg-white/5 hover:bg-gold hover:text-black rounded-xl transition-all text-white cursor-pointer"
                  title="Copy Link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copied && (
                <span className="text-[10px] text-emerald-400 font-bold animate-pulse">
                  {isRtl ? "✓ تم نسخ العنوان بنجاح لمشاركته مع التلفاز!" : "✓ Address copied to clipboard!"}
                </span>
              )}
            </div>

            {/* Smart TV Scanner QR Code with beautiful decorations */}
            <div className="flex flex-col items-center space-y-4 pt-2">
              <div className="p-5 bg-white rounded-3xl border-8 border-gold/10 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-103 relative">
                <QRCodeSVG 
                  value="https://madarat-al-nafs-534883887954.europe-west2.run.app"
                  size={140}
                  level="Q"
                  includeMargin={true}
                />
                <span className="absolute bottom-2 text-[8px] font-mono tracking-widest text-[#050505] font-black uppercase">MADARAT TV</span>
              </div>
              <span className="text-[10px] text-white/50 block leading-relaxed font-sans max-w-sm">
                {isRtl ? "مسح هذا الرمز يفتح لك الرابط فورًا في جهازك للتحكم أو العرض الفائق" : "Or scan this code dynamically to synchronize endpoints to any controller device."}
              </span>
            </div>
          </div>
        )}

        {/* 3. INTERACTIVE TACTILE REMOTE (Handshake Bridge selection with Hardware Device Mockups!) */}
        {mode === 'selection' && activeTab === 'interactive' && (
          <div className="space-y-6 relative z-10 py-1">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex gap-2 items-center px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-[10px] text-gold uppercase font-mono tracking-widest font-black">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>{isRtl ? "أعجوبة التزامن اللاسلكي" : "ESTABLISH DIRECT DEVICE HANDSHAKE"}</span>
              </div>
              <h4 className="text-white font-serif font-black text-lg md:text-2xl">
                {isRtl ? "الربط الزاوي التفاعلي بين الهاتف والتلفاز" : "Interact In Real-Time Across Devices"}
              </h4>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-xl mx-auto font-sans">
                {isRtl 
                  ? "تفوق برمجي يمنحك السيطرة: استخدم التلفاز كـ لوحة عرض رئيسية هادئة (Receiver)، وهاتفك الذكي كـ ريموت تحكم حسي ملموس (Controller)!"
                  : "Bridging physical and digital. Turn your big screen TV, iPad, or computer into a dedicated ambient display, and use your smartphone as a private hardware tactile remote!"}
              </p>
            </div>

            {/* HIGH-END DEVICE OUTLINE ANIMATED MOCKUPS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto font-sans">
              
              {/* Device 1 Card: Smart TV outline mock */}
              <button
                onClick={() => handleModeChange('tv-screen')}
                className="group relative p-6 bg-gradient-to-tr from-zinc-950 via-black to-[#050505] border border-white/[0.04] hover:border-gold/30 rounded-[32px] transition-all duration-500 hover:-translate-y-1.5 shadow-2xl flex flex-col items-center cursor-pointer text-center"
              >
                {/* Glowing subtle ring behind outline */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/0 via-gold/[0.005] to-gold/[0.015] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[32px] pointer-events-none" />

                {/* Simulated CSS Television display silhouette */}
                <div className="w-36 h-22 bg-[#121212] group-hover:bg-[#1a1a1a] border-4 border-[#333] rounded-xl flex flex-col items-center justify-between p-2 relative shadow-inner mb-5 group-hover:scale-105 group-hover:border-gold/40 transition-all duration-300">
                  <div className="w-full flex justify-between items-center text-[6px] font-mono text-white/30">
                    <span>• INPUT 1</span>
                    <Radio className="w-1.5 h-1.5 text-gold animate-pulse" />
                  </div>
                  {/* Miniature animation on selection screen */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[8px] font-serif text-gold tracking-widest font-black uppercase">MADARAT TV</span>
                    <span className="text-[5px] font-mono text-white/40">{isRtl ? "بانتظار الإشارة..." : "Telemetry Idle..."}</span>
                  </div>
                  <div className="w-full flex justify-center">
                    <div className="w-6 h-1.5 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center">
                      <span className="w-3 h-[2px] bg-gold animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Television Stand footer bar */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-10 h-2 bg-[#222]" />
                  <div className="absolute top-[110%] left-1/2 -translate-x-1/2 w-16 h-1 bg-[#151515] rounded-full" />
                </div>

                <h4 className="text-white font-serif font-black text-sm md:text-base mb-1.5 group-hover:text-gold transition-colors flex items-center gap-2">
                  <Tv className="w-4.5 h-4.5 text-gold" />
                  {isRtl ? "📺 (1) هذا الجهاز هو التلفاز الذكي" : "📺 (1) Run as the TV Screen"}
                </h4>
                <p className="text-[11px] text-white/40 leading-relaxed max-w-[250px]">
                  {isRtl 
                    ? "اختر هذا الخيار إذا كنت تتصفح المنصة من التلفاز أو شاشة صالونك الكبيرة ليعرض لك كود الاقتران الذهبي والـ QR."
                    : "Select this option on your smart TV. It puts the window into Receiver mode, waiting for your phone to connect."}
                </p>
              </button>

              {/* Device 2 Card: Smart phone outline mock */}
              <button
                onClick={() => handleModeChange('phone-controller')}
                className="group relative p-6 bg-gradient-to-tr from-zinc-950 via-black to-[#050505] border border-white/[0.04] hover:border-gold/30 rounded-[32px] transition-all duration-500 hover:-translate-y-1.5 shadow-2xl flex flex-col items-center cursor-pointer text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/0 via-gold/[0.005] to-gold/[0.015] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[32px] pointer-events-none" />

                {/* Simulated CSS Handheld phone controller silhouette */}
                <div className="w-18 h-28 bg-[#121212] group-hover:bg-[#1a1a1a] border-4 border-[#333] rounded-[24px] flex flex-col items-center p-2 relative shadow-inner mb-3.5 group-hover:scale-105 group-hover:border-gold/40 transition-all duration-300">
                  {/* Ear speaker line */}
                  <div className="w-6 h-1 bg-black rounded-full mb-1" />
                  
                  <div className="flex-1 w-full bg-black/60 rounded-[14px] p-1 flex flex-col justify-between items-center text-[6px] font-mono">
                    <span className="text-white/20">LIVE REMOTE</span>
                    <div className="grid grid-cols-2 gap-1 w-full">
                      <div className="h-3 bg-gold/10 rounded border border-gold/20 flex items-center justify-center text-gold text-[4px] font-black">DIR</div>
                      <div className="h-3 bg-white/5 rounded border border-white/5 flex items-center justify-center text-white/40 text-[4px]">EMDR</div>
                    </div>
                    {/* Tiny joystick/trackpad visual */}
                    <div className="w-4 h-4 rounded-full bg-[#222] border border-white/5 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                    </div>
                  </div>
                  
                  {/* Bottom rounded screen handle / Home indicator */}
                  <div className="w-5 h-1 bg-white/20 rounded-full mt-1" />
                </div>

                <h4 className="text-white font-serif font-black text-sm md:text-base mb-1.5 group-hover:text-gold transition-colors flex items-center gap-2">
                  <Smartphone className="w-4.5 h-4.5 text-gold" />
                  {isRtl ? "📱 (2) هذا الجهاز هو هاتفي المحمول" : "📱 (2) Run as Mobile Remote"}
                </h4>
                <p className="text-[11px] text-white/40 leading-relaxed max-w-[250px]">
                  {isRtl 
                    ? "اختر هذا من جوالك لتحويل شاشته لريموت تحسّي متكامل، تحرك أدوات التلفاز وتتحكم بها من الأريكة."
                    : "Select this option on your smartphone handset. This converts the display into a tactical digital controller panel."}
                </p>
              </button>

            </div>
          </div>
        )}

        {/* 4. ACTIVE TV SCREEN RECEIVER STATE (Displays PIN, Barcode, and Interactive Simulated Live View!) */}
        {mode === 'tv-screen' && (
          <div className="space-y-6 text-center relative z-10 flex flex-col items-center transition-all duration-500">
            
            {/* Realtime Streaming Pulse Indicator */}
            <div className="bg-[#0c0c0c] text-gold px-4 py-2 rounded-full border border-gold/15 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2.5 animate-pulse font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span>{isRtl ? "موجة بث النفس مستمرة... بانتظار اتصال الريموت" : "BROADCAST TRANSMITTER ONLINE — WAITING FOR PAIRING HANDSHAKE..."}</span>
            </div>

            {/* Split layout: QR & PIN */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center w-full max-w-2xl py-2 ${
              isFullscreen ? 'justify-items-center' : ''
            }`}>
              
              {/* Left Column: Visual PIN display */}
              <div className="flex flex-col items-center space-y-4">
                <span className="text-[10px] text-white/40 tracking-[0.25em] font-mono uppercase font-black">
                  {isRtl ? "رمز الاقتران الفردي الفعال" : "REAL-TIME SYNC PIN"}
                </span>
                
                <div className="flex items-center justify-center gap-3">
                  {pin.length > 0 ? (
                    pin.split('').map((char, index) => (
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        key={index} 
                        className="w-14 h-22 bg-gradient-to-b from-[#121212] via-[#090909] to-black text-gold border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_30px_rgba(0,0,0,0.8)] text-4.5xl font-mono font-black rounded-2xl flex items-center justify-center min-w-[56px]"
                      >
                        {char}
                      </motion.div>
                    ))
                  ) : (
                    <Loader2 className="w-8 h-8 text-gold animate-spin" />
                  )}
                </div>
                
                <p className="text-[11px] text-white/50 leading-relaxed max-w-[240px] font-sans">
                  {isRtl 
                    ? "أدخل هذه الأرقام الأربعة في هاتفك المحمول بعد تحويله لوضع ريموت الهاتف المحمول."
                    : "Key in these numerical digits directly in your companion phone device client to authorize."}
                </p>
              </div>

              {/* Grid separator vertical line */}
              <div className="hidden md:block w-px h-36 bg-gradient-to-b from-transparent via-white/10 to-transparent justify-self-center" />

              {/* Right Column: QR and Camera alignment instructions */}
              <div className="flex flex-col items-center space-y-4">
                <span className="text-[10px] text-white/40 tracking-[0.25em] font-mono uppercase font-black">
                  {isRtl ? "مسح ضوئي فوري لسهولة الاتصال" : "CAMERA SMART BARCODE SCAN"}
                </span>
                
                <div className="p-4 bg-white rounded-[32px] border-4 border-gold/20 shadow-[0_15px_45px_rgba(212,175,55,0.12)] flex items-center justify-center transition-transform hover:scale-[1.01] duration-300 relative group">
                  {/* Subtle red scanner laser visual line */}
                  <div className="absolute inset-x-0 h-0.5 bg-red-500 opacity-0 group-hover:opacity-75 blur-[1px] animate-[bounce_2s_infinite] top-0" />
                  <QRCodeSVG 
                    value={`https://madarat-al-nafs-534883887954.europe-west2.run.app${window.location.pathname}?role=remote&pin=${pin}`}
                    size={140}
                    level="Q"
                    includeMargin={true}
                  />
                </div>
                
                <div className="text-[10px] text-gold font-bold tracking-widest uppercase flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>{isRtl ? "وجه كاميرا هاتفك هنا للربط المباشر" : "AIM SENSORS HERE TO SPEED CONNECT"}</span>
                </div>
              </div>
            </div>

            {/* HIGH-IMPACT PREMIUM ADDITION: INTERACTIVE LIVE STATE SIMULATOR! */}
            {!isFullscreen && (
              <div className="w-full max-w-xl bg-gradient-to-b from-zinc-950/80 to-[#070707] border border-white/[0.04] rounded-3xl p-5 shadow-2xl relative overflow-hidden font-sans text-start">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 blur-[35px] pointer-events-none" />
                <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-white/[0.04]">
                  <span className="text-[10px] text-gold uppercase tracking-wider font-mono font-black flex items-center gap-1.5">
                    <Activity className="w-4 h-4 animate-pulse" />
                    {isRtl ? "شاشة التلفاز التفاعلية في صالتك الآن" : "LIVE AMBIENT STATE FORECAST_"}
                  </span>
                  <span className="text-[9px] text-white/30 font-mono">IDLE / WATCHING</span>
                </div>

                {/* Animated graphic mockup showing real activity of the couch display */}
                <div className="bg-black/95 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[140px] relative">
                  
                  {/* Scenario A: Default general view simulation */}
                  {(!tvSessionState?.activeTab || tvSessionState?.activeTab === 'tv') && (
                    <div className="text-center space-y-3 flex flex-col items-center">
                      <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">{isRtl ? "المشهد والمساق العام نشط" : "AMBIENT COHERENCE ACTIVE"}</span>
                      {/* Pulse circle simulator representing breathing rhythm */}
                      <div 
                        style={{ transform: `scale(${simulatedBreath})` }}
                        className="w-14 h-14 rounded-full bg-gradient-to-t from-gold/30 to-amber-500/10 border-2 border-gold flex items-center justify-center transition-transform duration-100 ease-out shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                      />
                      <div className="text-[9px] text-gold font-mono tracking-widest">{isRtl ? "شهيق • زفير" : "INHALE • EXHALE"}</div>
                    </div>
                  )}

                  {/* Scenario B: EMDR Active bouncing target indicator */}
                  {tvSessionState?.activeTab === 'emdr' && (
                    <div className="w-full text-center space-y-4">
                      <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase block">{isRtl ? "تمرين EMDR لإزالة الحساسية" : "Ophthalmic Target Tracker (EMDR)"}</span>
                      
                      {/* Bouncing line slider track */}
                      <div className="w-full h-1.5 bg-white/5 rounded-full relative overflow-hidden border border-white/10">
                        <div 
                          style={{ left: `${simulatedEmdrPos}%` }}
                          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold shadow-[0_0_15px_#d4af37] transition-all duration-400 ease-out"
                        />
                      </div>
                      <span className="text-[9px] text-gold/60 font-mono tracking-wide block">{isRtl ? "حرك نظرات عينيك مع الكرة الذهبية بالتلفزيون" : "Follow horizontal target sweeps left & right"}</span>
                    </div>
                  )}

                  {/* Scenario C: Neurological audio waves */}
                  {tvSessionState?.activeTab === 'coherence' && (
                    <div className="text-center space-y-3">
                      <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase block">{isRtl ? "مساق الاتساق العصبي الصوتي" : "Neurological Sine Resonance"}</span>
                      
                      {/* Jumping absolute audio equalizer visual bars */}
                      <div className="flex justify-center items-end gap-1.5 h-12 w-40 mx-auto">
                        {[40, 75, 90, 50, 70, 85, 30, 60, 95, 45, 80].map((baseVal, idx) => {
                          const computedHeight = Math.min(100, Math.max(10, baseVal * simulatedBreath));
                          return (
                            <div 
                              key={idx}
                              style={{ height: `${computedHeight}%` }}
                              className="w-1.5 bg-gradient-to-t from-gold/30 via-gold to-amber-400 rounded-full transition-all duration-200"
                            />
                          );
                        })}
                      </div>
                      <span className="text-[9px] text-gold/60 font-mono tracking-widest block">{isRtl ? "بث ترددات وموجات Solfeggio" : "Harmonic Solfeggio audio stream syncing"}</span>
                    </div>
                  )}

                  {/* Scenario D: Voice Analyzer active */}
                  {tvSessionState?.activeTab === 'voice' && (
                    <div className="text-center space-y-3">
                      <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase block">{isRtl ? "مُحلل رنين نبرة الصوت" : "VOCAL FREQUENCY ACOUSTIC FIELD"}</span>
                      <div className="text-xs text-gold font-mono flex items-center justify-center gap-1.5 animate-pulse">
                        <Radio className="w-5 h-5 text-gold" />
                        <span>{isRtl ? "🎤 يستقبل الموجات الصوتية النشطة الآن" : "🎤 FEED COMMITTED — WAITING FOR AUDIO SOURCE"}</span>
                      </div>
                      <span className="text-[9px] text-white/40 block leading-tight">{isRtl ? "تحدث بجانب هاتفك المحمول ليحلل التلفاز طبقات صوتك الفسيولوجية" : "Acoustic signatures process live through companion mic."}</span>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* Connection feedback success alerts */}
            {connected && tvSessionState && (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 w-full max-w-md justify-center shadow-lg"
              >
                <Check className="w-5.5 h-5.5 text-emerald-400 animate-bounce shrink-0" />
                <span className="text-emerald-400 text-xs font-bold leading-tight">
                  {isRtl 
                    ? "✓ تم الاقتران اللاسلكي الفعلي! هاتفك متصل الآن كـ وحدة تحكم رئيسية بنجاح." 
                    : "✓ Device Handshake Complete! Smartphone paired successfully as master controller."}
                </span>
              </motion.div>
            )}

            {/* Quick installation guideline steps */}
            {!isFullscreen && (
              <div className="max-w-xl bg-white/[0.01] border border-white/[0.04] p-5 rounded-3xl space-y-3.5 text-start w-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gold" />
                <h5 className="text-[11px] text-gold uppercase tracking-[0.1em] font-black">
                  {isRtl ? "📌 خطوات إتمام عملية الاتصال بالهاتف" : "📌 COMPANION PAIRING GUIDES"}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] md:text-xs text-white/50 leading-relaxed font-sans">
                  <div className="flex gap-2.5 items-start">
                    <span className="bg-gold/10 text-gold w-5.5 h-5.5 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 border border-gold/15">1</span>
                    <p>{isRtl ? "افتح كاميرا هاتفك الخاص وامسح رمز القارئ السريع الموضح لليمين." : "Aim your smartphone device camera directly at the QR code frame showing above."}</p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="bg-gold/10 text-gold w-5.5 h-5.5 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 border border-gold/15">2</span>
                    <p>{isRtl ? "سيفتح هاتفك صفحة ريموت المزامنة، لتبدأ بالتحقيق والتحكم من بُعد فوريًا." : "Your phone will automatically load our physical-touch remote dashboard."}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleDisconnect}
              className="mt-4 text-white/30 hover:text-white hover:underline text-xs cursor-pointer tracking-widest uppercase font-mono transition-all"
            >
              {isRtl ? "🔌 إعادة توليد كود اقتران جديد" : "🔌 RESET SECURITY HANDSHAKE & GENERATE NEW TOKEN"}
            </button>
          </div>
        )}

        {/* 5. PHONE CONTROLLER REMOTE MODE (Tactile Smartphone Remote Interface with virtual keypad) */}
        {mode === 'phone-controller' && (
          <div className="space-y-5 py-2 relative z-10 flex flex-col items-center">
            
            {!connected ? (
              isScanning ? (
                /* Advanced Camera scanner frame with laser lines */
                <div className="text-center space-y-5 flex flex-col items-center w-full max-w-sm">
                  <div className="space-y-1.5 bg-zinc-950/40 p-4 rounded-3xl border border-white/5 w-full">
                    <h4 className="text-white font-serif font-black text-sm flex items-center gap-2 justify-center">
                      <Radio className="w-4 h-4 text-gold animate-pulse" />
                      {isRtl ? "عدسة القراءة والمزامنة للتلفزيون" : "Television Laser Barcode Scanner"}
                    </h4>
                    <p className="text-[10px] text-white/50 leading-relaxed">
                      {isRtl 
                        ? "وجه كاميرا جوالك وصوبها نحو كود المربع المعروض على شاشة التلفاز لإتمام التزامن."
                        : "Aim your smart device camera directly towards the QR barcode shown on your TV receiver."}
                    </p>
                  </div>

                  {/* High fidelity scanner boundary reticle */}
                  <div className="relative w-64 h-64 rounded-[36px] overflow-hidden border-2 border-gold/30 shadow-[0_0_60px_rgba(212,175,55,0.12)] bg-black/90 flex items-center justify-center">
                    <div id="qr-reader" className="w-full h-full object-cover rounded-[34px]" />
                    
                    {/* Laser scanner ticker */}
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-95 shadow-[0_0_20px_#d4af37] animate-[bounce_4s_infinite_ease-in-out] top-0" />
                    
                    {/* Retro UI corner brackets */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold/80" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-gold/80" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-gold/80" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold/80" />
                  </div>

                  {scannerError && (
                    <p className="text-red-400 font-sans text-xs max-w-xs leading-relaxed bg-red-950/40 p-3 rounded-2xl border border-red-500/10">
                      {scannerError}
                    </p>
                  )}

                  <button
                    onClick={() => {
                      setIsScanning(false);
                      playSynthAudio('click', 0.85);
                      playHapticNotification(10);
                    }}
                    className="px-6 py-3 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:bg-white/5 text-white font-bold text-[10px] tracking-widest uppercase cursor-pointer transition-all"
                  >
                    {isRtl ? "❌ إلغاء والعودة للإدخال اليدوي" : "❌ BACK TO TYPE PIN CODE"}
                  </button>
                </div>
              ) : (
                /* Hardware-feeling Manual Entry Screen with custom Keypad! */
                <div className="text-center space-y-5 flex flex-col items-center w-full max-w-sm">
                  <div className="p-4 bg-gradient-to-b from-[#111] to-[#050505] border border-white/5 rounded-full text-white/50 relative shadow-inner">
                    <Smartphone className="w-9 h-9 animate-bounce" />
                    <div className="absolute inset-2 w-9 h-9 bg-gold/15 rounded-full blur-md pointer-events-none" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-white font-serif font-black text-sm md:text-base">
                      {isRtl ? "مزامنة ريموت الويب المحمول" : "Tactile Smart Pair Authorization"}
                    </h4>
                    <p className="text-[10px] md:text-xs text-white/50 leading-relaxed font-sans px-4">
                      {isRtl 
                        ? "اكتب الرمز المربع المكون من 4 أرقام المعروض على جهاز التلفاز الخاص بك للربط البيني:"
                        : "Key inside the secure four-digit token showing on your TV screen receiver to sync:"}
                    </p>
                  </div>

                  {/* Segmented PIN displays */}
                  <div className="flex gap-2.5 justify-center w-full my-2 font-mono" dir="ltr">
                    {[0, 1, 2, 3].map((idx) => {
                      const value = inputPin[idx] || '';
                      const isFocused = inputPin.length === idx;
                      return (
                        <div 
                          key={idx}
                          className={`w-11 h-16 rounded-xl border text-2xl font-black flex items-center justify-center transition-all ${
                            isFocused 
                              ? 'border-gold bg-gold/5 text-gold shadow-[0_0_15px_rgba(212,175,55,0.1)] scale-102' 
                              : value
                                ? 'border-white/20 bg-zinc-950 text-white'
                                : 'border-white/5 bg-black text-white/10'
                          }`}
                        >
                          {value || '•'}
                        </div>
                      );
                    })}
                  </div>

                  {/* VIRTUAL KEYPAD for high end mechanical physical device feeling */}
                  <div className="w-full max-w-[280px] bg-zinc-950/80 border border-white/[0.04] p-3 rounded-[28px] grid grid-cols-3 gap-2.5 shadow-2xl relative">
                    {/* Glow backdrop inside keypad */}
                    <div className="absolute inset-0 bg-gold/[0.005] rounded-[28px] pointer-events-none" />
                    
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '<'].map((key) => {
                      const isControl = key === 'C' || key === '<';
                      return (
                        <button
                          key={key}
                          onClick={() => handleVirtualKeyPress(key)}
                          className={`py-3.5 rounded-2xl text-sm font-mono font-black flex items-center justify-center transition-all duration-150 active:scale-90 cursor-pointer shadow-sm select-none ${
                            isControl 
                              ? 'bg-[#151515] border border-white/5 text-white/40 hover:text-white hover:bg-white/5' 
                              : 'bg-[#0a0a0a] border border-white/[0.04] text-white/80 hover:bg-[#111] hover:border-gold/20'
                          }`}
                        >
                          {key === '<' ? <RefreshCw className="w-4 h-4 text-gold/60" /> : key}
                        </button>
                      );
                    })}
                  </div>

                  <div className="w-full max-w-[280px] space-y-3 font-sans">
                    <button
                      onClick={handleConnectPhone}
                      disabled={inputPin.length !== 4 || connecting}
                      className="w-full py-4 bg-gradient-to-r from-gold via-amber-500 to-amber-600 text-black font-extrabold text-xs tracking-widest uppercase rounded-2xl hover:brightness-110 active:scale-98 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold/15"
                    >
                      {connecting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>{isRtl ? "جاري ترابط موجة البث..." : "SECURE BONDING..."}</span>
                        </>
                      ) : (
                        <>
                          <Wifi className="w-4 h-4 text-black" />
                          <span>{isRtl ? "اتصال ومزامنة لاسلكية" : "CONNECT CONTROLLER"}</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center my-1">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="px-3 text-[9px] text-white/30 uppercase font-mono tracking-widest">{isRtl ? "أو مسح الكاميرا" : "Or use camera"}</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <button
                      onClick={() => {
                        setIsScanning(true);
                        playSynthAudio('click', 1.1);
                        playHapticNotification(15);
                      }}
                      className="w-full py-3 bg-[#0a0a0a] hover:bg-[#121212] border border-gold/15 hover:border-gold text-gold font-bold text-[10px] tracking-widest uppercase rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-gold/5"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{isRtl ? "📸 مسح باركود التلفاز" : "📸 CAMERA AUTO SYNC"}</span>
                    </button>
                  </div>
                </div>
              )
            ) : (
              /* THE UPGRADED GLASSMORPHIC PHYSICAL REMOTE CONTROLLER (Full Control console) */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm bg-gradient-to-b from-[#0e0e0e] via-[#040404] to-black border-2 border-gold/15 rounded-[46px] p-5 shadow-[0_15px_50px_rgba(212,175,55,0.12),inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col items-center"
                id="physical-remote-body"
              >
                {/* Visual tactile phone speaker indent top bar */}
                <div className="w-16 h-1 w-full flex justify-center mb-4">
                  <div className="w-12 h-1 bg-white/15 rounded-full" />
                </div>

                {/* Real-time sync connection dynamic telemetry board */}
                <div className="w-full bg-[#0a0a0a] border border-white/[0.04] p-3.5 rounded-3xl flex items-center justify-between mb-4 font-mono shadow-inner">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="text-[10px] text-emerald-400 font-bold tracking-wider">
                      {isRtl ? `موصول (كود ${pin})` : `CONNECTED (${pin})`}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-white/40 text-[9px] select-none">
                    <Activity className="w-3.5 h-3.5 text-gold shrink-0 animate-pulse" />
                    <span>{telemetryLatency}ms</span>
                    <span className="text-[10px] text-white/10">|</span>
                    <span className="text-gold/90 font-bold">{signalCoherence}% CQ</span>
                  </div>
                </div>

                {/* Big Active Mode Dashboard Screen */}
                <div className="w-full text-center pb-2.5 mb-2 relative">
                  <span className="text-[9px] font-bold text-white/30 tracking-[0.25em] block uppercase font-mono mb-1">
                    {isRtl ? "القناة المفعّلة حالياً على شاشة التلفاز" : "ACTIVE TV CHANNEL OVERLAY"}
                  </span>
                  
                  <div className="px-4 py-2.5 bg-gold/5 border border-gold/20 rounded-2xl inline-flex gap-2 items-center text-xs text-gold font-bold shadow-md">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                    <span className="font-serif">
                      {tvSessionState?.activeTab === 'tv' && (isRtl ? "المساق العام لمدارات النفس" : "General Coherence Waves")}
                      {tvSessionState?.activeTab === 'coherence' && (isRtl ? "مساق الرنين والاتساق العصبي" : "Acoustic Neurological Harmony")}
                      {tvSessionState?.activeTab === 'emdr' && (isRtl ? "مسار العلاج بحركة العينين EMDR" : "Ophthalmic EMDR Desensitizer")}
                      {tvSessionState?.activeTab === 'voice' && (isRtl ? "مستشعر رنين وتحليل نبرة الصوت" : "Phonetic Vocal Analyzer Unit")}
                    </span>
                  </div>
                </div>

                {/* Category navigation title */}
                <div className="w-full text-start px-1 mb-2 font-sans">
                  <span className="text-[9px] text-white/40 tracking-wider font-bold block mb-1 font-mono uppercase">
                    {isRtl ? "🔘 مفاتيح توجيه وبث المساقات التلقائية" : "🔘 CONTROLLERS / COGNITIVE CHANNELS"}
                  </span>
                </div>

                {/* Sleek physical console key button grid */}
                <div className="grid grid-cols-2 gap-3 w-full font-serif pb-4">
                  <button
                    onClick={() => updateSessionField('activeTab', 'tv')}
                    className={`p-4 rounded-3xl border text-xs font-bold leading-tight uppercase flex flex-col items-center justify-center gap-2.5 shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer ${
                      tvSessionState?.activeTab === 'tv'
                        ? 'bg-gradient-to-b from-[#151515] to-[#040404] border-gold text-gold shadow-[0_0_20px_rgba(212,175,55,0.12)] font-black'
                        : 'bg-white/[0.01] border-white/[0.04] text-white/50 hover:text-white hover:border-white/10 hover:bg-white/[0.03]'
                    }`}
                  >
                    {tvSessionState?.activeTab === 'tv' && (
                      <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                    )}
                    <Tv className="w-5.5 h-5.5 text-gold" />
                    <span className="text-[11px] font-serif font-bold tracking-wide">{isRtl ? "المساق المفتوح" : "General Ambient"}</span>
                  </button>

                  <button
                    onClick={() => updateSessionField('activeTab', 'coherence')}
                    className={`p-4 rounded-3xl border text-xs font-bold leading-tight uppercase flex flex-col items-center justify-center gap-2.5 shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer ${
                      tvSessionState?.activeTab === 'coherence'
                        ? 'bg-gradient-to-b from-[#151515] to-[#040404] border-gold text-gold shadow-[0_0_20px_rgba(212,175,55,0.12)] font-black'
                        : 'bg-white/[0.01] border-white/[0.04] text-white/50 hover:text-white hover:border-white/10 hover:bg-white/[0.03]'
                    }`}
                  >
                    {tvSessionState?.activeTab === 'coherence' && (
                      <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                    )}
                    <Activity className="w-5.5 h-5.5 text-gold animate-pulse" />
                    <span className="text-[11px] font-serif font-bold tracking-wide">{isRtl ? "رنين الاتساق" : "Neurological"}</span>
                  </button>

                  <button
                    onClick={() => updateSessionField('activeTab', 'emdr')}
                    className={`p-4 rounded-3xl border text-xs font-bold leading-tight uppercase flex flex-col items-center justify-center gap-2.5 shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer ${
                      tvSessionState?.activeTab === 'emdr'
                        ? 'bg-gradient-to-b from-[#151515] to-[#040404] border-gold text-gold shadow-[0_0_20px_rgba(212,175,55,0.12)] font-black'
                        : 'bg-white/[0.01] border-white/[0.04] text-white/50 hover:text-white hover:border-white/10 hover:bg-white/[0.03]'
                    }`}
                  >
                    {tvSessionState?.activeTab === 'emdr' && (
                      <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                    )}
                    <Eye className="w-5.5 h-5.5 text-gold" />
                    <span className="text-[11px] font-serif font-bold tracking-wide">{isRtl ? "مسار EMDR" : "EMDR Track"}</span>
                  </button>

                  <button
                    onClick={() => updateSessionField('activeTab', 'voice')}
                    className={`p-4 rounded-3xl border text-xs font-bold leading-tight uppercase flex flex-col items-center justify-center gap-2.5 shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer ${
                      tvSessionState?.activeTab === 'voice'
                        ? 'bg-gradient-to-b from-[#151515] to-[#040404] border-gold text-gold shadow-[0_0_20px_rgba(212,175,55,0.12)] font-black'
                        : 'bg-white/[0.01] border-white/[0.04] text-white/50 hover:text-white hover:border-white/10 hover:bg-white/[0.03]'
                    }`}
                  >
                    {tvSessionState?.activeTab === 'voice' && (
                      <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                    )}
                    <Radio className="w-5.5 h-5.5 text-gold animate-pulse" />
                    <span className="text-[11px] font-serif font-bold tracking-wide">{isRtl ? "التحليل الصوتي" : "Voice Resonance"}</span>
                  </button>
                </div>

                {/* Sub parameters adjustments (Speed pacing & acoustics toggles) */}
                <div className="w-full bg-[#0a0a0a] border border-white/[0.03] p-4 rounded-3xl mb-4 space-y-4 font-sans text-start shadow-inner">
                  
                  {/* Breath Wave velocity adjustment range */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-white/40 uppercase font-mono tracking-widest block font-bold">
                      {isRtl ? "🌊 تعديل سرعة تدفق إيقاع التنفس" : "🌊 PACING / BREATHING VELOCITY"}
                    </span>
                    <div className="grid grid-cols-3 gap-2.5 text-[10px] text-center font-mono font-black">
                      {[0.6, 1.0, 1.4].map((scale) => {
                        const isActive = tvSessionState?.tvBreathScale === scale || (!tvSessionState?.tvBreathScale && scale === 1.0);
                        return (
                          <button
                            key={scale}
                            onClick={() => updateSessionField('tvBreathScale', scale)}
                            className={`py-2 px-1 text-[9px] rounded-xl border transition-all cursor-pointer ${
                              isActive 
                                ? 'bg-gradient-to-r from-gold to-amber-500 border-gold text-black font-extrabold shadow-md' 
                                : 'bg-black border-white/5 text-white/50 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {scale === 0.6 && (isRtl ? "0.6x بطيء" : "SLOW 0.6x")}
                            {scale === 1.0 && (isRtl ? "1.0x عادي" : "NORMAL 1.0x")}
                            {scale === 1.4 && (isRtl ? "1.4x سريع" : "SPEED 1.4x")}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Audio toggling acoustic switch */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                    <span className="text-[9px] text-white/40 uppercase font-mono tracking-widest font-black">
                      {isRtl ? "🔊 صوت رنين الشفاء بالتلفزيون" : "🔊 SOLFEGGIO TV ACOUSTICS"}
                    </span>
                    
                    <button
                      onClick={() => updateSessionField('isPlayingAcoustic', !tvSessionState?.isPlayingAcoustic)}
                      className={`px-3.5 py-2 text-[9px] font-mono font-bold uppercase rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                        tvSessionState?.isPlayingAcoustic
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-red-500/5 border-red-500/10 text-red-400/80 hover:bg-red-500/10'
                      }`}
                    >
                      {tvSessionState?.isPlayingAcoustic ? (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isRtl ? "نشط" : "ACTIVE SOUND"}</span>
                        </>
                      ) : (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>{isRtl ? "صامت" : "MUTED"}</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

                {/* Handshake Termination button */}
                <div className="w-full">
                  <button
                    onClick={handleDisconnect}
                    className="w-full py-4 bg-gradient-to-b from-red-950/20 to-red-950/40 hover:bg-red-900/30 border border-red-500/20 text-red-400 hover:text-red-300 font-bold text-xs tracking-wider rounded-3xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-inner"
                  >
                    <span>🔌 {isRtl ? "قطع الاتصال وإنهاء البث" : "DISCONNECT & DISMISS DUET"}</span>
                  </button>
                </div>

              </motion.div>
            )}

            <button
              onClick={() => {
                setMode('selection');
                playSynthAudio('click', 0.8);
                playHapticNotification(10);
              }}
              className="block w-full text-center mt-4 text-white/30 hover:text-white text-xs font-mono tracking-wider uppercase transition-all"
            >
              {isRtl ? "🔙 الرجوع لخيارات المزامنة" : "🔙 Return to portal selection"}
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
