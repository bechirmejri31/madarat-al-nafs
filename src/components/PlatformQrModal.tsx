import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Copy, Check, Sparkles, Share2, HelpCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface PlatformQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRtl: boolean;
  currentLang: string;
}

export function PlatformQrModal({ isOpen, onClose, isRtl, currentLang }: PlatformQrModalProps) {
  const [copied, setCopied] = useState(false);
  const platformUrl = "https://madarat-al-nafs-534883887954.europe-west2.run.app";

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(platformUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = platformUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" 
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md bg-[#090909] border border-gold/30 rounded-3xl p-6 md:p-8 shadow-[0_0_80px_rgba(212,175,55,0.2)] text-center overflow-hidden"
          id="platform-qr-modal-container"
        >
          {/* Glowing Aura background decorator */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-gold/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/40 hover:text-white hover:bg-white/5 p-2 rounded-xl transition-all cursor-pointer"
            id="platform-qr-modal-close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Title */}
          <div className="flex flex-col items-center mt-4 mb-6 space-y-2">
            <div className="p-3 bg-gold/10 text-gold rounded-full border border-gold/20 mb-2">
              <QrCode className="w-8 h-8 animate-pulseAndGlow" />
            </div>
            <h3 className="text-white font-serif font-black text-xl">
              {isRtl ? "رمز الاستجابة السريعة للمنصة (QR Code)" : "Platform QR Code Key"}
            </h3>
            <p className="text-xs text-gold/70 font-sans max-w-xs leading-relaxed">
              {isRtl 
                ? "امسح الرمز أدناه بكاميرا الهاتف المحمول للانتقال الفوري إلى منصة مدارات النفس السلوكية." 
                : "Scan this code with your mobile camera to launch the Madarat Al-Nafs platform instantly."}
            </p>
          </div>

          {/* Main QR Container card */}
          <div className="relative bg-white/5 border border-white/5 rounded-3xl p-6 mb-6 flex flex-col items-center justify-center">
            {/* Visual focus framework lines representing scanner reticle */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold/40 pointer-events-none" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-gold/40 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-gold/40 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold/40 pointer-events-none" />

            {/* Glowing active barcode radar scanner line */}
            <div className="absolute inset-x-8 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_0_10px_rgba(212,175,55,0.4)] animate-[bounce_4s_infinite_ease-in-out]" />

            {/* QR design wrapper */}
            <div className="p-5 bg-white rounded-2xl shadow-xl border-4 border-gold/20 transition-all hover:scale-105 duration-300">
              <QRCodeSVG 
                value={platformUrl}
                size={180}
                level="Q"
                imageSettings={{
                  src: "/favicon.ico",
                  x: undefined,
                  y: undefined,
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
            </div>
            
            <span className="text-[10px] text-white/40 block mt-4 font-mono select-all">
              {platformUrl}
            </span>
          </div>

          {/* Option buttons */}
          <div className="space-y-3 font-sans">
            <button
              onClick={handleCopy}
              className="w-full py-3.5 bg-gold text-black hover:bg-white font-black text-xs tracking-widest uppercase rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold/10"
              id="platform-qr-copy-btn"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span>{isRtl ? "✓ تم نسخ الرابط!" : "✓ Link Copied!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{isRtl ? "نسخ رابط المنصة" : "Copy Platform Link"}</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 justify-center py-2 text-[10px] text-white/50 bg-white/[0.02] border border-white/5 rounded-xl p-2.5">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>
                {isRtl 
                  ? "قم بتوجيه هاتفك فقط وسينقلك مباشرة إلى واجهة الاستكشاف." 
                  : "Simply point your mobile device and open dynamically inside external viewer."}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
