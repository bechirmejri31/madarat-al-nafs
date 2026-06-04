import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Orbit, 
  Sparkles, 
  ArrowRight, 
  Brain, 
  Cpu, 
  Terminal,
  Layers,
  Fingerprint
} from 'lucide-react';
import { researchData, ResearchItem } from '../researchContent';
import { Translation } from '../translations';
import { OrbitalSymbol } from './OrbitalSymbol';

interface AIResearchNexusProps {
  t: Translation;
  currentLang: string;
  onSelect: (item: ResearchItem) => void;
  triggerAI: (prompt: string) => void;
  getResearchContent: (research: ResearchItem | null, field: keyof Omit<ResearchItem, 'id' | 'references'>) => string;
}

export const AIResearchNexus: React.FC<AIResearchNexusProps> = ({ 
  t, 
  currentLang, 
  onSelect,
  triggerAI,
  getResearchContent
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(currentLang === 'ar' ? 'الكل' : 'All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const isRtl = currentLang === 'ar';

  const categories = useMemo(() => {
    const cats = new Set(researchData.map(r => getResearchContent(r, 'category')));
    return [isRtl ? 'الكل' : 'All', ...Array.from(cats)];
  }, [currentLang, isRtl, getResearchContent]);

  const filteredResearch = useMemo(() => {
    return researchData.filter(item => {
      const title = getResearchContent(item, 'title');
      const desc = getResearchContent(item, 'description');
      const cat = getResearchContent(item, 'category');
      
      const matchesQuery = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === (isRtl ? 'الكل' : 'All') || cat === selectedCategory;
      
      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, selectedCategory, currentLang, isRtl, getResearchContent]);

  const currentHoveredItem = useMemo(() => 
    researchData.find(r => r.id === hoveredId), 
  [hoveredId]);

  return (
    <section id="دراسات" className="py-14 md:py-20 bg-black relative overflow-hidden">
      {/* Background Neural Network Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,rgba(212,175,55,0.15)_1px,transparent_0)] bg-[length:40px_40px]" />
        
        {/* Branded Watermarks */}
        <div className="absolute top-1/4 -right-20 opacity-[0.2]">
          <OrbitalSymbol size={300} type="brain" />
        </div>
        <div className="absolute bottom-1/4 -left-20 opacity-[0.2]">
          <OrbitalSymbol size={400} type="orbit" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Main Content Area */}
          <div className="flex-1 w-full">
            <div className="mb-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-10 h-10 bg-gold/10 rounded-xl border border-gold/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="text-gold text-[10px] font-black tracking-[0.4em] uppercase">
                    {isRtl ? "مُحرك البحث الذكي" : "INTELLIGENT RESEARCH ENGINE"}
                  </h2>
                  <p className="text-white/40 text-[10px] font-mono">v3.0.1 - Neural Core Active</p>
                </div>
              </motion.div>
              
              <h3 className="text-2xl md:text-4xl font-serif text-white italic mb-6 leading-tight">
                {t.latestResearchHeading}
              </h3>

              {/* Search & Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1 group">
                  <Search className={`absolute ${isRtl ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-gold transition-colors`} />
                  <input 
                    type="text" 
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full bg-[#0a0a0a] border border-white/5 ${isRtl ? 'pr-14 pl-6' : 'pl-14 pr-6'} py-5 text-white outline-none focus:border-gold/30 transition-all font-medium placeholder:text-white/20 rounded-2xl`}
                  />
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-6 py-3 text-[9px] font-black uppercase tracking-widest border rounded-full transition-all ${
                        selectedCategory === cat 
                          ? "bg-gold text-black border-gold shadow-[0_10px_20px_-5px_rgba(212,175,55,0.4)]" 
                          : "bg-white/5 border-white/5 text-white/40 hover:border-white/20"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Research Grid - Bento Style */}
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
              {filteredResearch.map((item, idx) => {
                const isDouble = idx % 5 === 0;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => onSelect(item)}
                    className={`group relative bg-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] cursor-pointer hover:border-gold/60 transition-all duration-700 overflow-hidden
                      ${isDouble ? 'md:col-span-6 lg:col-span-8' : 'md:col-span-3 lg:col-span-4'}`}
                  >
                    {/* Glowing Scan Line Animation */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent -translate-y-full group-hover:translate-y-full transition-all duration-[2000ms] ease-in-out pointer-events-none" />
                    
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4 group-hover:bg-gold/15 transition-all duration-1000" />
                    
                    <div className="flex justify-between items-start mb-10 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                          <Cpu className="w-4 h-4 text-gold group-hover:animate-spin-slow" />
                        </div>
                        <span className="text-[10px] font-black text-gold/80 uppercase tracking-widest px-3 py-1 bg-gold/5 border border-gold/10 rounded-full">
                          {getResearchContent(item, 'category')}
                        </span>
                      </div>
                      <div className="flex gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                      </div>
                    </div>

                    <h4 className={`${isDouble ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'} font-serif text-white italic mb-6 group-hover:text-gold transition-colors leading-tight relative z-10`}>
                      {getResearchContent(item, 'title')}
                    </h4>
                    
                    <p className={`text-white/40 text-[13px] leading-relaxed line-clamp-3 mb-10 group-hover:text-white/60 relative z-10 font-serif`}>
                      {getResearchContent(item, 'description')}
                    </p>

                    <div className="flex items-center justify-between pt-8 border-t border-white/5 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black">Scanning Status</span>
                          <span className="text-[10px] text-gold/60 font-mono">NEURAL_READY_0x{item.id}</span>
                        </div>
                      </div>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 group-hover:border-gold transition-colors"
                      >
                        <ArrowRight className={`w-5 h-5 text-white/20 group-hover:text-gold ${isRtl ? 'rotate-180' : ''} transition-all`} />
                      </motion.div>
                    </div>

                    {isDouble && (
                      <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 pointer-events-none">
                         <Brain className="w-64 h-64 rotate-12" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* AI Side Panel - The "Nexus" */}
          <div className="w-full lg:w-80 shrink-0 sticky top-32">
            <div className="bg-[#0a0a0a] border border-gold/20 rounded-3xl p-8 relative overflow-hidden min-h-[400px] flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                  <OrbitalSymbol size={30} type="orbit" />
                </div>
                <h4 className="text-white font-serif italic text-lg">{isRtl ? "مُساعد النيكسوس" : "Nexus Assistant"}</h4>
              </div>

              <div className="flex-1 space-y-6">
                <AnimatePresence mode="wait">
                  {currentHoveredItem ? (
                    <motion.div
                      key={currentHoveredItem.id}
                      initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2 text-[10px] text-gold/60 font-black uppercase tracking-widest">
                        <Terminal className="w-3 h-3" />
                        Scanning Layer {currentHoveredItem.id}
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed italic font-serif">
                        {isRtl 
                          ? `جارٍ فك تشفير المدار الخاص بـ "${getResearchContent(currentHoveredItem, 'title')}"...`
                          : `Decoding the orbit of "${getResearchContent(currentHoveredItem, 'title')}"...`}
                      </p>
                      <div className="p-4 bg-gold/5 border-l-2 border-gold rounded-r-xl">
                        <p className="text-[11px] text-gold/80 leading-relaxed font-medium">
                          {isRtl 
                            ? "تم رصد أنماط سلوكية معقدة تتطلب تحليلاً عصبياً معمقاً. هل تود أن يقوم الذكاء الاصطناعي برسم الخريطة الذهنية لهذا الموضوع؟"
                            : "Complex behavioral patterns detected. Would you like the AI to map the mental core of this topic?"}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/20 border border-dashed border-white/10">
                        <Layers className="w-8 h-8" />
                      </div>
                      <p className="text-white/30 text-xs font-serif italic">
                        {isRtl ? "مرر فوق أي بحث لبدء المسح النوروني" : "Hover over any research to start neural scanning"}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <button 
                  onClick={() => triggerAI(isRtl ? "قدم لي نظرة شاملة على أحدث البحوث" : "Give me a comprehensive overview of the latest research")}
                  className="w-full py-4 bg-gold/10 hover:bg-gold text-gold hover:text-black border border-gold/30 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {isRtl ? "توليد ملخص شامل" : "Generate Deep Summary"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
