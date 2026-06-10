import { useState } from "react";
import { motion } from "motion/react";
import { VideoModal } from "./VideoModal";

const people = [
  { id: 1, name: "Sarah Chen", role: "Product Designer", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&auto=format", message: "I still remember our first project review — you walked in completely prepared and made everyone excited about the work. That energy was contagious every single day.", duration: "1:42", accent: "#e03189" },
  { id: 2, name: "Marcus Williams", role: "Engineering Lead", photo: "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?w=300&h=300&fit=crop&auto=format", message: "You taught me that good code isn't just about being clever — it's about being kind to the next person who reads it. That lesson stuck with me. So did you.", duration: "2:15", accent: "#84bd00" },
  { id: 3, name: "Emma Rodriguez", role: "Marketing Director", photo: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=300&h=300&fit=crop&auto=format", message: "Every campaign we ran together was better because of your perspective. You saw things none of us saw. The whole team is going to feel your absence.", duration: "1:58", accent: "#20c6b9" },
  { id: 4, name: "James Park", role: "Data Scientist", photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&h=300&fit=crop&auto=format", message: "The numbers we crunched, the models we broke, the coffee at 11pm trying to figure out why the pipeline failed again — those are the moments I'll treasure.", duration: "2:37", accent: "#e03189" },
  { id: 5, name: "Lily Thompson", role: "Head of People", photo: "https://images.unsplash.com/photo-1630939687530-241d630735df?w=300&h=300&fit=crop&auto=format", message: "You made this place feel safe. You advocated for others without being asked. You showed up — really showed up. That's the rarest thing.", duration: "3:02", accent: "#84bd00" },
  { id: 6, name: "Aisha Okonkwo", role: "Customer Success", photo: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?w=300&h=300&fit=crop&auto=format", message: "You always knew what the customer actually needed — not what they said they needed. That kind of empathy is something you can't train. It's just who you are.", duration: "1:30", accent: "#20c6b9" },
  { id: 7, name: "David Kim", role: "Frontend Engineer", photo: "https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=300&h=300&fit=crop&auto=format", message: "I'll miss having someone who cares about the pixels. The animations, the spacing, the way things felt — you made our product beautiful and never let us forget it mattered.", duration: "2:08", accent: "#e03189" },
  { id: 8, name: "Nina Patel", role: "Operations Manager", photo: "https://images.unsplash.com/photo-1573496527892-904f897eb744?w=300&h=300&fit=crop&auto=format", message: "Behind every launch, every event, every smooth quarterly review — there you were, quietly making everything work. The backbone we never talked about enough.", duration: "2:51", accent: "#84bd00" },
];

export function PeopleGrid() {
  const [selectedPerson, setSelectedPerson] = useState<typeof people[0] | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
            Everyone recorded something just for you. Tap their face to watch 👇
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {people.map((person, i) => (
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
                  ▶ {person.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <VideoModal person={selectedPerson} onClose={() => setSelectedPerson(null)} />
    </section>
  );
}
