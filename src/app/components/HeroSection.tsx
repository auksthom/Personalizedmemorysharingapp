import { motion } from "motion/react";

const confetti = [
  { x: "8%", y: "18%", color: "#e03189", rotate: 25, size: 18 },
  { x: "90%", y: "12%", color: "#84bd00", rotate: -15, size: 14 },
  { x: "5%", y: "72%", color: "#20c6b9", rotate: 40, size: 12 },
  { x: "92%", y: "68%", color: "#e03189", rotate: -30, size: 20 },
  { x: "50%", y: "8%", color: "#84bd00", rotate: 10, size: 10 },
  { x: "78%", y: "85%", color: "#20c6b9", rotate: 55, size: 16 },
  { x: "22%", y: "90%", color: "#e03189", rotate: -45, size: 11 },
  { x: "65%", y: "20%", color: "#84bd00", rotate: 20, size: 13 },
];

const stars = ["⭐", "✨", "🎉", "💚", "💖", "🎊", "🌟", "💙"];

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f4fbe6 0%, #e8f8f6 50%, #fce4f0 100%)" }}
    >
      {/* Floating confetti squares */}
      {confetti.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm pointer-events-none"
          style={{ left: c.x, top: c.y, width: c.size, height: c.size, backgroundColor: c.color, rotate: c.rotate, opacity: 0.7 }}
          animate={{ y: [0, -12, 0], rotate: [c.rotate, c.rotate + 15, c.rotate] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Floating emoji */}
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          style={{ left: `${10 + i * 11}%`, top: i % 2 === 0 ? "5%" : "88%" }}
          animate={{ y: [0, -8, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 1.8 + i * 0.25, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        >
          {s}
        </motion.span>
      ))}

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 14 }}
        className="flex items-center gap-2 mb-6 px-5 py-2 rounded-full"
        style={{ backgroundColor: "#e03189", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.06em" }}
      >
        🎉 A FAREWELL JUST FOR YOU 🎉
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring", damping: 16 }}
        style={{ fontFamily: "var(--font-display)", color: "#1c2e23", lineHeight: 1.1, fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 700 }}
        className="max-w-3xl"
      >
        We made something{" "}
        <span
          style={{
            color: "#e03189",
            WebkitTextStroke: "2px #e03189",
            textShadow: "4px 4px 0 #84bd0044",
          }}
        >
          special
        </span>{" "}
        for you 💚
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.6 }}
        className="mt-5 text-lg max-w-xl leading-relaxed"
        style={{ color: "#00563a", fontFamily: "var(--font-body)", fontWeight: 400 }}
      >
        The people you worked with recorded messages, shared memories, and
        picked songs — all for the day you need to remember you were loved here.
      </motion.p>

      {/* Wavy bottom border */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: 32 }}>
        <svg viewBox="0 0 1200 32" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,16 C150,32 350,0 600,16 C850,32 1050,0 1200,16 L1200,32 L0,32 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
