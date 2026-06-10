import { useEffect, useState } from "react";
import { X, Play, Pause, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Person {
  id: number;
  name: string;
  role: string;
  photo: string;
  message: string;
  duration: string;
  accent: string;
}

interface VideoModalProps {
  person: Person | null;
  onClose: () => void;
}

export function VideoModal({ person, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (person) { setIsPlaying(false); setProgress(0); setLiked(false); }
  }, [person]);

  useEffect(() => {
    if (!isPlaying) return;
    const iv = setInterval(() => {
      setProgress((p) => { if (p >= 100) { clearInterval(iv); setIsPlaying(false); return 100; } return p + 0.5; });
    }, 80);
    return () => clearInterval(iv);
  }, [isPlaying]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const accent = person?.accent || "#e03189";

  return (
    <AnimatePresence>
      {person && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(28,46,35,0.85)", backdropFilter: "blur(10px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30, rotate: -1 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
            className="relative w-full max-w-lg rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "#fff",
              border: `4px solid ${accent}`,
              boxShadow: `10px 10px 0 ${accent}44`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video area */}
            <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: "#1c2e23" }}>
              <img
                src={`${person.photo}&w=640&h=360&fit=crop&auto=format`}
                alt={person.name}
                className="w-full h-full object-cover"
                style={{ filter: isPlaying ? "brightness(0.75)" : "brightness(0.55)" }}
              />

              {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-0.5 px-4 pb-4 h-16">
                  {Array.from({ length: 44 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, Math.random() * 26 + 6, 4] }}
                      transition={{ duration: 0.35 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.02 }}
                      className="w-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: accent, opacity: 0.9 }}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.93 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: accent, boxShadow: `0 0 0 6px ${accent}44` }}
                >
                  {isPlaying ? <Pause size={22} className="text-white" /> : <Play size={22} className="text-white ml-1" />}
                </motion.div>
              </button>

              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accent }}
              >
                <X size={14} className="text-white" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-1.5" style={{ backgroundColor: "#e8f5cc" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ width: `${progress}%`, backgroundColor: accent }}
              />
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", color: "#1c2e23", fontWeight: 700, fontSize: "1.15rem" }}>{person.name}</h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
                    style={{ backgroundColor: `${accent}18`, color: accent, fontFamily: "var(--font-body)", fontWeight: 600 }}
                  >
                    {person.role}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setLiked(!liked)}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: liked ? `${accent}22` : "#f4fbe6", border: `2px solid ${liked ? accent : "#e8f5cc"}` }}
                >
                  <Heart size={16} fill={liked ? accent : "none"} style={{ color: liked ? accent : "#00563a" }} />
                </motion.button>
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: "#f4fbe6", border: `2px solid ${accent}33` }}>
                <p className="text-sm leading-relaxed" style={{ color: "#00563a", fontFamily: "var(--font-body)", fontWeight: 500 }}>
                  "{person.message}"
                </p>
              </div>

              <p className="text-xs mt-3 text-right" style={{ color: "#00563a", fontFamily: "var(--font-body)", opacity: 0.7 }}>
                Duration: {person.duration}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
