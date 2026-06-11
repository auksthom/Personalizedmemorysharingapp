import { motion } from "motion/react";
import { MOODS, type Mood } from "../data/people";

interface MoodGateProps {
  onSelect: (mood: Mood) => void;
  onSkip: () => void;
}

export function MoodGate({ onSelect, onSkip }: MoodGateProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-16 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f4fbe6 0%, #e8f8f6 50%, #fce4f0 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none opacity-25" style={{ backgroundColor: "#e03189" }} />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none opacity-20" style={{ backgroundColor: "#84bd00" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 14 }}
        className="flex items-center gap-2 mb-6 px-5 py-2 rounded-full relative"
        style={{ backgroundColor: "#e03189", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.06em" }}
      >
        🎉 BEFORE WE BEGIN 🎉
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring", damping: 16 }}
        className="relative max-w-2xl"
        style={{ fontFamily: "var(--font-display)", color: "#1c2e23", lineHeight: 1.15, fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 700 }}
      >
        How are you feeling right now?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative mt-4 text-lg max-w-md"
        style={{ color: "#00563a", fontFamily: "var(--font-body)" }}
      >
        Pick a mood — we'll show you the messages that fit it best 💌
      </motion.p>

      <div className="relative flex flex-wrap justify-center gap-5 mt-10 max-w-2xl">
        {MOODS.map((mood, i) => (
          <motion.button
            key={mood.key}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, type: "spring", damping: 16 }}
            whileHover={{ scale: 1.06, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(mood.key)}
            className="flex flex-col items-center gap-2 px-9 py-7 rounded-2xl cursor-pointer"
            style={{
              backgroundColor: "#fff",
              border: `3px solid ${mood.color}`,
              color: mood.color,
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              boxShadow: `4px 4px 0 ${mood.color}33`,
              minWidth: 150,
            }}
          >
            <span style={{ fontSize: "2.8rem" }}>{mood.emoji}</span>
            <span style={{ fontSize: "1.1rem" }}>{mood.label}</span>
            <span className="text-xs text-center leading-tight" style={{ color: "#00563a", fontWeight: 400, maxWidth: 130 }}>
              {mood.desc}
            </span>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        onClick={onSkip}
        className="relative mt-10 text-sm underline"
        style={{ color: "#00563a", fontFamily: "var(--font-body)", fontWeight: 600 }}
      >
        Skip — just show me everyone
      </motion.button>
    </div>
  );
}
