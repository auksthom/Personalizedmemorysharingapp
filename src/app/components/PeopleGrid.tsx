import { useState } from "react";
import { motion } from "motion/react";
import { VideoModal } from "./VideoModal";
import { MOODS, PEOPLE, type Mood, type Person } from "../data/people";

interface PeopleGridProps {
  mood: Mood;
  viewAll: boolean;
  onToggleViewAll: () => void;
  onChangeMood: () => void;
}

export function PeopleGrid({ mood, viewAll, onToggleViewAll, onChangeMood }: PeopleGridProps) {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const moodInfo = MOODS.find((m) => m.key === mood)!;

  return (
    <section className="px-6 md:px-12 py-16 relative overflow-hidden"
      style={{ backgroundColor: "#f4fbe6" }}
    >
      {/* Decorative circles */}
      <div className="absolute top-8 right-8 w-32 h-32 rounded-full pointer-events-none opacity-20" style={{ backgroundColor: "#20c6b9" }} />
      <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full pointer-events-none opacity-20" style={{ backgroundColor: "#e03189" }} />

      <div className="max-w-6xl mx-auto relative">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
            style={{ backgroundColor: "#84bd00", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em" }}
          >
            👥 CLICK A FACE
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "#1c2e23", fontWeight: 700, fontSize: "2rem" }}>
            A message from each of us 🎤
          </h2>
          <p className="mt-2 text-base" style={{ color: "#00563a", fontFamily: "var(--font-body)" }}>
            {viewAll
              ? "Showing every message from everyone — tap a face to watch 👇"
              : "Everyone recorded something just for you. Tap their face to watch 👇"}
          </p>

          {/* Mood / view-all controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            {!viewAll && (
              <span
                className="text-sm px-4 py-1.5 rounded-full"
                style={{ backgroundColor: moodInfo.color, color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700 }}
              >
                {moodInfo.emoji} Mood: {moodInfo.label}
              </span>
            )}
            <button
              onClick={onChangeMood}
              className="text-sm px-4 py-1.5 rounded-full transition-colors"
              style={{ backgroundColor: "#fff", color: "#1c2e23", border: "2px solid #e8f5cc", fontFamily: "var(--font-body)", fontWeight: 600 }}
            >
              🔄 Change mood
            </button>
            <button
              onClick={onToggleViewAll}
              className="text-sm px-4 py-1.5 rounded-full transition-colors"
              style={{ backgroundColor: viewAll ? "#1c2e23" : "#fff", color: viewAll ? "#fff" : "#1c2e23", border: "2px solid #1c2e23", fontFamily: "var(--font-body)", fontWeight: 600 }}
            >
              {viewAll ? "✓ Viewing all people" : "View all people"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {PEOPLE.map((person, i) => {
            const content = person.messages[mood];
            return (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.07, type: "spring", damping: 18 }}
                className="flex flex-col items-center gap-3 cursor-pointer"
                onMouseEnter={() => setHoveredId(person.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedPerson(person)}
                whileHover={{ y: -6 }}
              >
                {/* Card */}
                <div
                  className="w-full flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-200"
                  style={{
                    backgroundColor: "#fff",
                    border: `3px solid ${hoveredId === person.id ? person.accent : "#e8f5cc"}`,
                    boxShadow: hoveredId === person.id ? `6px 6px 0 ${person.accent}33` : "3px 3px 0 #e8f5cc",
                  }}
                >
                  {/* Face + ring */}
                  <div className="relative">
                    <div
                      className="w-20 h-20 rounded-full overflow-hidden"
                      style={{
                        border: `4px solid ${hoveredId === person.id ? person.accent : "#e8f5cc"}`,
                        transition: "border-color 0.2s",
                      }}
                    >
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        style={{ transform: hoveredId === person.id ? "scale(1.1)" : "scale(1)", transition: "transform 0.3s" }}
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/media/photos/placeholder.svg"; }}
                      />
                    </div>

                    {/* Play badge */}
                    <motion.div
                      animate={{ scale: hoveredId === person.id ? 1 : 0 }}
                      transition={{ type: "spring", damping: 15, stiffness: 320 }}
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: person.accent }}
                    >
                      <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
                        <path d="M2 1.5L8.5 5.5L2 9.5V1.5Z" fill="white" />
                      </svg>
                    </motion.div>
                  </div>

                  <div className="text-center">
                    <p style={{ color: "#1c2e23", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem" }}>{person.name}</p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
                      style={{ backgroundColor: `${person.accent}18`, color: person.accent, fontFamily: "var(--font-body)", fontWeight: 600 }}
                    >
                      {person.role}
                    </span>
                  </div>

                  {/* Duration pill */}
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: hoveredId === person.id ? person.accent : "#f4fbe6", color: hoveredId === person.id ? "#fff" : "#00563a", fontFamily: "var(--font-body)", fontWeight: 600, transition: "all 0.2s" }}
                  >
                    ▶ {content.duration}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <VideoModal person={selectedPerson} mood={mood} onClose={() => setSelectedPerson(null)} />
    </section>
  );
}
