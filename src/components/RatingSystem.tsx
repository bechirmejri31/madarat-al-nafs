import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, CheckCircle2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

interface RatingSystemProps {
  t: any;
  isRtl: boolean;
}

export function RatingSystem({ t, isRtl }: RatingSystemProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const rated = localStorage.getItem('platform_rated');
    if (rated) setHasRated(true);
  }, []);

  const handleRate = async (score: number) => {
    if (hasRated || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "ratings"), {
        score,
        createdAt: serverTimestamp(),
      });
      localStorage.setItem('platform_rated', 'true');
      setRating(score);
      setHasRated(true);
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-black border-y border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[10px] font-black tracking-[0.4em] text-gold uppercase mb-4">
            {t.ratingTitle}
          </h2>
          <p className="text-white/60 text-sm mb-10 font-serif italic">
            {t.ratingSubtitle}
          </p>

          <AnimatePresence mode="wait">
            {!hasRated ? (
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRate(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    disabled={isSubmitting}
                    className="p-2 transition-colors"
                  >
                    <Star
                      className={`w-10 h-10 transition-all duration-300 ${
                        (hover || rating) >= star
                          ? "fill-gold text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                          : "text-white/10"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <div className="bg-gold/10 p-4 rounded-full border border-gold/20">
                  <CheckCircle2 className="w-8 h-8 text-gold" />
                </div>
                <p className="text-gold font-bold text-lg tracking-wide">
                  {t.ratingSuccess}
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${s <= rating ? "fill-gold text-gold" : "text-white/10"}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
