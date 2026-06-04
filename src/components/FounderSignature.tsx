import React from 'react';
import { motion } from 'motion/react';

export const FounderSignature: React.FC<{ currentLang: string }> = ({ currentLang }) => {
  const isRtl = currentLang === 'ar';
  
  return (
    <div className={`mt-16 pt-8 border-t border-white/5 flex flex-col ${isRtl ? 'items-end' : 'items-start'}`}>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="font-serif italic text-2xl text-gold/60 mb-2 opacity-80"
      >
        {isRtl ? "بشير الماجري" : "Bechir Mejri"}
      </motion.div>
      <div className="flex items-center gap-4">
        <div className="h-[1px] w-12 bg-gold/20" />
        <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">
          {isRtl ? "إشراف وإدارة" : "SUPERVISION & MANAGEMENT"}
        </span>
      </div>
    </div>
  );
};
