import React, { useState } from "react";
import { motion } from "motion/react";
import { Quote, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { Language } from "../translations";

interface PromoCommercialProps {
  t: any;
  currentLang: Language;
  isRtl: boolean;
}

export function PromoCommercial({ t, currentLang, isRtl }: PromoCommercialProps) {
  // State to control audio muting status (browsers require muted=1 to allow autoplay on load)
  const [isMuted, setIsMuted] = useState(true);

  // The premium promotional vertical video URL (Bechir Mejri - esteqem be nafsek)
  // Configured to autoplay by default, loop, and mute dynamically.
  // Using youtube-nocookie.com for high compatibility inside sandboxed preview iframes.
  const videoId = "MM1Oy2CCM6c";
  const videoUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=${isMuted ? "1" : "0"}&loop=1&playlist=${videoId}&controls=1&playsinline=1&modestbranding=1&rel=0&enablejsapi=1`;

  return (
    <section id="promo" className="py-12 md:py-16 relative overflow-hidden bg-gradient-to-b from-[#030303] via-[#080808] to-[#030303] border-y border-white/5">
      {/* Soft Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Texts and Quote */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6" style={{ direction: isRtl ? "rtl" : "ltr" }}>
            <div>
              {/* Note: The golden badge advertising title is fully removed as requested */}
              <h2 className="text-2xl md:text-4xl font-serif font-black text-white italic tracking-tight leading-tight mb-4">
                {t.promoSectionHeading || "تجسيد لمدارات النفس العميقة"}
              </h2>
              
              <p className="text-white/50 font-serif leading-relaxed text-sm max-w-xl">
                {t.promoSectionDescription || "من خلال هذا التعبير البصري، نسعى لفك شفرات الرحلة البشرية في بحثها المستمر عن التوازن، السكينة، والنور الكامن في أعماق كل ذات."}
              </p>
            </div>

            {/* Quote Block */}
            <div className={`p-6 md:p-8 bg-white/[0.02] border-r-2 ${isRtl ? "border-r-gold/40 border-l-0 text-right" : "border-l-2 border-l-gold/40 border-r-0 text-left"} rounded-xl relative`}>
              <Quote className={`absolute w-10 h-10 text-white/[0.02] ${isRtl ? "left-6 top-6" : "right-6 top-6"}`} />
              <div className="text-xs text-gold font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <span>{t.promoTitle || "استقم بنفسك"}</span>
              </div>
              <p className="text-white/90 font-serif italic text-lg md:text-2xl leading-relaxed relative z-10">
                "{t.promoQuote || "استقم بنفسك يستقم بك غيرك، فكيف يستقيم الظل والعود أعوج؟"}"
              </p>
            </div>
          </div>

          {/* Right Block: Premium Portrait Smartphone Device Frame with Autplaying Video */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[325px] aspect-[9/16] rounded-[2.5rem] border-[8px] border-[#151515] bg-[#000] shadow-[0_0_80px_rgba(212,175,55,0.15)] ring-1 ring-white/10 overflow-hidden"
            >
              {/* Internal camera notch detail */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-zinc-800 mr-2" />
                <div className="w-8 h-1 rounded-full bg-zinc-900" />
              </div>

              {/* YouTube Autoplay Loop Player */}
              <div className="w-full h-full relative z-10">
                <iframe 
                  src={videoUrl}
                  title="Cinematic Promotion" 
                  className="w-full h-full border-0 absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full z-20 pointer-events-none" />
            </motion.div>

            {/* Audio configuration & fallbacks */}
            <div className="mt-6 flex flex-col items-center gap-3 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMuted(!isMuted)}
                className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-serif text-sm font-semibold tracking-wide transition-all duration-300 shadow-lg ${
                  isMuted 
                    ? "bg-gold text-black hover:bg-white shadow-gold/25" 
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                }`}
              >
                {isMuted ? (
                  <>
                    <Volume2 className="w-4 h-4 animate-bounce text-black" />
                    <span>{isRtl ? "تشغيل الصوت الكامل" : "Enable Full Audio"}</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>{isRtl ? "كتم الصوت" : "Mute Sound"}</span>
                  </>
                )}
              </motion.button>

              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 uppercase tracking-wider mt-1 max-w-[280px] justify-center">
                <span className={`w-1.5 h-1.5 rounded-full ${isMuted ? "bg-amber-500" : "bg-emerald-500 animate-pulse"}`} />
                <span>
                  {isRtl 
                    ? (isMuted ? "تفرض المتصفحات وضع كتم الصوت للتشغيل التلقائي • اضغط للتشغيل مع الصوت" : "تم إلغاء كتم الصوت • تأكد من رفع صوت جهازك")
                    : (isMuted ? "Browsers mute autoplay by default • Click button to unmute" : "Audio unmuted successfully • Check device volume")
                  }
                </span>
              </div>
              
              <a 
                href={`https://youtube.com/shorts/${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors underline font-sans mt-1"
              >
                <span>{isRtl ? "مشاهدة مباشرة على يوتيوب" : "Watch directly on YouTube"}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
