import { useState } from "react";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Mood = "happy" | "sad" | "tired" | "emotional";

const moods: {
  key: Mood; label: string; emoji: string;
  color: string; textColor: string; bg: string; desc: string;
}[] = [
  { key: "happy",     label: "Happy",     emoji: "😄", color: "#84bd00", textColor: "#fff", bg: "#f4fbe6", desc: "You want to laugh and remember the good times" },
  { key: "sad",       label: "Sad",       emoji: "🥺", color: "#20c6b9", textColor: "#fff", bg: "#e8f8f6", desc: "You're missing everyone and that's totally okay" },
  { key: "tired",     label: "Tired",     emoji: "😴", color: "#00563a", textColor: "#fff", bg: "#e6f2ec", desc: "You need a warm voice to ease the day" },
  { key: "emotional", label: "Emotional", emoji: "🫀", color: "#e03189", textColor: "#fff", bg: "#fce4f0", desc: "Real words from people who really care" },
];

const moodVideos: Record<Mood, { title: string; from: string; thumbnail: string; quote: string; duration: string }> = {
  happy: {
    title: "Remember the pizza Friday? 🍕",
    from: "The whole crew",
    thumbnail: "https://images.unsplash.com/photo-1758520144623-65998e96a7d8?w=800&h=450&fit=crop&auto=format",
    quote: "You made every Monday feel worth showing up for. Thank you for that energy!",
    duration: "2:12",
  },
  sad: {
    title: "We're going to miss you so much 💙",
    from: "Your desk neighbours",
    thumbnail: "https://images.unsplash.com/photo-1758691737535-57edd2a11d73?w=800&h=450&fit=crop&auto=format",
    quote: "The office won't be the same. But we're so proud of where you're going.",
    duration: "3:40",
  },
  tired: {
    title: "A quiet word from us 🌿",
    from: "The night-owls club",
    thumbnail: "https://images.unsplash.com/photo-1758691737433-2269d5cdd910?w=800&h=450&fit=crop&auto=format",
    quote: "Rest well. You gave everything you had — and it showed. We saw it every single day.",
    duration: "1:55",
  },
  emotional: {
    title: "What you meant to us 💖",
    from: "Everyone who worked with you",
    thumbnail: "https://images.unsplash.com/photo-1758873268933-e0765262e58d?w=800&h=450&fit=crop&auto=format",
    quote: "You changed this place. You changed us. And we'll carry that forever.",
    duration: "4:18",
  },
};

export function MoodBoard() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleMoodSelect = (mood: Mood) => {
    if (selectedMood === mood) { setSelectedMood(null); setIsPlaying(false); setProgress(0); return; }
    setSelectedMood(mood); setIsPlaying(false); setProgress(0);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const iv = setInterval(() => {
        setProgress((p) => { if (p >= 100) { clearInterval(iv); setIsPlaying(false); return 100; } return p + 0.3; });
      }, 80);
    }
  };

  const video = selectedMood ? moodVideos[selectedMood] : null;
  const moodData = moods.find((m) => m.key === selectedMood);

  return (
    <section
      className="px-6 md:px-12 py-16 relative overflow-hidden"
      style={{ backgroundColor: "#f4fbe6" }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none opacity-30"
        style={{ backgroundColor: "#e03189" }} />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none opacity-25"
        style={{ backgroundColor: "#20c6b9" }} />

      <div className="max-w-6xl mx-auto relative">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
            style={{ backgroundColor: "#e03189", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em" }}
          >
            🎭 MOOD BOARD
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "#1c2e23", fontWeight: 700, fontSize: "2rem" }}>
            How are you feeling right now?
          </h2>
          <p className="mt-2 text-base" style={{ color: "#00563a", fontFamily: "var(--font-body)" }}>
            Pick a mood — we picked a video just for that moment 💌
          </p>
        </div>

        {/* Mood buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {moods.map((mood) => (
            <motion.button
              key={mood.key}
              whileHover={{ scale: 1.08, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelect(mood.key)}
              className="flex flex-col items-center gap-2 px-8 py-5 rounded-2xl transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: selectedMood === mood.key ? mood.color : "#fff",
                border: `3px solid ${mood.color}`,
                color: selectedMood === mood.key ? mood.textColor : mood.color,
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                boxShadow: selectedMood === mood.key ? `5px 5px 0 ${mood.color}55` : "3px 3px 0 #e8f5cc",
                minWidth: 130,
              }}
            >
              <span style={{ fontSize: "2.5rem" }}>{mood.emoji}</span>
              <span style={{ fontSize: "1rem" }}>{mood.label}</span>
              <span
                className="text-xs text-center leading-tight"
                style={{ color: selectedMood === mood.key ? "rgba(255,255,255,0.85)" : "#00563a", fontWeight: 400, maxWidth: 100 }}
              >
                {mood.desc}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Video reveal */}
        <AnimatePresence mode="wait">
          {video && moodData && (
            <motion.div
              key={selectedMood}
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ type: "spring", damping: 22, stiffness: 220 }}
              className="rounded-2xl overflow-hidden max-w-3xl mx-auto"
              style={{
                backgroundColor: "#fff",
                border: `4px solid ${moodData.color}`,
                boxShadow: `8px 8px 0 ${moodData.color}33`,
              }}
            >
              {/* Video area */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  style={{ filter: isPlaying ? "brightness(0.8)" : "brightness(0.6)" }}
                />
                {isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-0.5 px-6 pb-6 h-20">
                    {Array.from({ length: 52 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [3, Math.random() * 32 + 6, 3] }}
                        transition={{ duration: 0.3 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.016 }}
                        className="w-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: moodData.color, opacity: 0.9 }}
                      />
                    ))}
                  </div>
                )}
                <button onClick={handlePlay} className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.93 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: moodData.color, boxShadow: `0 0 0 6px ${moodData.color}44` }}
                  >
                    {isPlaying
                      ? <Pause size={30} className="text-white" />
                      : <Play size={30} className="text-white ml-1" />
                    }
                  </motion.div>
                </button>
                <div className="absolute top-4 left-4">
                  <span className="text-sm px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: moodData.color, color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700 }}
                  >
                    {moodData.emoji} {moodData.label}
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="h-1.5" style={{ backgroundColor: moodData.bg }}>
                <motion.div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: moodData.color }} />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 style={{ fontFamily: "var(--font-display)", color: "#1c2e23", fontWeight: 700, fontSize: "1.2rem" }}>{video.title}</h3>
                <p className="text-sm mt-1" style={{ color: "#00563a", fontFamily: "var(--font-body)" }}>From {video.from} · {video.duration}</p>
                <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: moodData.bg }}>
                  <p className="text-sm leading-relaxed"
                    style={{ color: moodData.color === "#00563a" ? "#00563a" : moodData.color === "#84bd00" ? "#527c00" : moodData.color, fontFamily: "var(--font-body)", fontWeight: 600 }}
                  >
                    "{video.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
