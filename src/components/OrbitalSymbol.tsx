import React from 'react';
import { motion } from 'motion/react';

interface OrbitalSymbolProps {
  className?: string;
  size?: number;
  type?: 'eye' | 'brain' | 'orbit' | 'seed';
}

export const OrbitalSymbol: React.FC<OrbitalSymbolProps> = ({ 
  className = "", 
  size = 100,
  type = 'orbit' 
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Outer Glow Ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border border-gold/10 rounded-full"
      />
      
      {/* Pulsing Core */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-1/3 h-1/3 bg-gold/10 blur-xl rounded-full"
      />

      {/* Symbol Graphics (Custom SVG Paths) */}
      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 fill-none stroke-gold/40 stroke-[1.5]">
        {type === 'orbit' && (
          <>
            <circle cx="50" cy="50" r="15" className="stroke-gold/60" />
            <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(45 50 50)" />
            <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(-45 50 50)" />
            <circle cx="50" cy="50" r="2" fill="currentColor" />
          </>
        )}
        {type === 'eye' && (
          <>
            <path d="M10 50 Q50 10 90 50 Q50 90 10 50" />
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
            <path d="M40 30 Q50 20 60 30" className="opacity-50" />
          </>
        )}
        {type === 'brain' && (
          <>
            <path d="M50 80 Q30 80 25 60 Q20 50 30 40 Q35 20 50 20 Q65 20 70 40 Q80 50 75 60 Q70 80 50 80" />
            <path d="M50 20 V80 M30 40 H70 M25 60 H75" className="stroke-[0.5] opacity-30" />
            <circle cx="50" cy="40" r="1" fill="currentColor" />
            <circle cx="35" cy="55" r="1" fill="currentColor" />
            <circle cx="65" cy="55" r="1" fill="currentColor" />
          </>
        )}
      </svg>
      
      {/* Orbital Points */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 8 + i * 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-full h-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_10px_#d4af37]" />
        </motion.div>
      ))}
    </div>
  );
};
