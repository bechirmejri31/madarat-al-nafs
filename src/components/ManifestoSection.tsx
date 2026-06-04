import { motion } from "motion/react";
import { Translation } from "../translations";

interface ManifestoSectionProps {
  t: Translation;
  isRtl: boolean;
}

export function ManifestoSection({ t, isRtl }: ManifestoSectionProps) {
  return (
    <section className="py-14 md:py-20 bg-black relative overflow-hidden flex items-center justify-center">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-gold/40 via-transparent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="space-y-3">
            <span className="text-[10px] font-black tracking-[0.5em] text-gold uppercase">{t.navItems.عنا}</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white italic leading-tight">
              {t.manifestoHeading}
            </h2>
          </div>

          <p className="text-white/40 text-lg md:text-2xl font-serif italic leading-[1.6] max-w-3xl mx-auto">
            "{t.manifestoText}"
          </p>

          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-px bg-gold/50 mb-2" />
             <p className="text-gold font-serif italic text-lg">
               {t.manifestoSignature}
             </p>
          </div>
        </motion.div>
      </div>
      
      {/* Architectural Accents */}
      <div className={`absolute top-0 ${isRtl ? 'right-0' : 'left-0'} p-12 opacity-5 hidden lg:block`}>
        <div className="text-[10rem] font-serif italic leading-none text-white font-black">M</div>
      </div>
    </section>
  );
}
