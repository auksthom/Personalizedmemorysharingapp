import { useState } from "react";
import "../styles/fonts.css";
import { HeroSection } from "./components/HeroSection";
import { RecentVideos } from "./components/RecentVideos";
import { MoodGate } from "./components/MoodGate";
import { PhotoMosaic } from "./components/PhotoMosaic";
import { PeopleGrid } from "./components/PeopleGrid";
import { MOODS, type Mood } from "./data/people";

{/* MARKER-MAKE-KIT-INVOKED */}

const navLinks = [
  { label: "Videos 🎬", href: "#videos", color: "#84bd00" },
  { label: "Photos 📸", href: "#photos", color: "#20c6b9" },
  { label: "People 👥", href: "#people", color: "#84bd00" },
];

export default function App() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [viewAll, setViewAll] = useState(false);

  // Show the mood gate first, unless the visitor chose to skip it
  if (!mood && !viewAll) {
    return <MoodGate onSelect={setMood} onSkip={() => setViewAll(true)} />;
  }

  const activeMood = mood ?? MOODS[0].key;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fff", fontFamily: "var(--font-body)" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-12 py-3"
        style={{
          backgroundColor: "#fff",
          borderBottom: "3px solid #e8f5cc",
          boxShadow: "0 2px 0 #e8f5cc",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
            style={{ backgroundColor: "#e03189" }}
          >
            💚
          </div>
          <span style={{ fontFamily: "var(--font-display)", color: "#1c2e23", fontWeight: 700, fontSize: "1.2rem" }}>
            Farewell
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full ml-1"
            style={{ backgroundColor: "#84bd00", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700 }}
          >
            for you ✨
          </span>
        </div>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm px-3 py-1.5 rounded-full transition-all duration-150"
              style={{ color: "#1c2e23", fontFamily: "var(--font-body)", fontWeight: 600 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = link.color;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#1c2e23";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <HeroSection />

        <div id="videos">
          <RecentVideos />
        </div>

        {/* Wavy divider going into photos */}
        <div className="overflow-hidden" style={{ height: 32, backgroundColor: "#f4fbe6" }}>
          <svg viewBox="0 0 1200 32" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C150,32 350,0 600,16 C850,32 1050,0 1200,16 L1200,0 Z" fill="#ffffff" />
          </svg>
        </div>

        <div id="photos">
          <PhotoMosaic />
        </div>

        <div className="overflow-hidden" style={{ height: 32, backgroundColor: "#f4fbe6" }}>
          <svg viewBox="0 0 1200 32" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C300,32 600,0 900,24 C1050,32 1150,8 1200,16 L1200,0 Z" fill="#fff" />
          </svg>
        </div>

        <div id="people">
          <PeopleGrid
            mood={activeMood}
            viewAll={viewAll}
            onToggleViewAll={() => setViewAll((v) => !v)}
            onChangeMood={() => { setMood(null); setViewAll(false); }}
          />
        </div>

        {/* Footer */}
        <footer
          className="text-center py-14 px-6 relative overflow-hidden"
          style={{ backgroundColor: "#1c2e23" }}
        >
          {/* Colorful dots */}
          {["#e03189","#84bd00","#20c6b9","#e03189","#84bd00"].map((c, i) => (
            <div key={i} className="absolute w-4 h-4 rounded-full opacity-60 pointer-events-none"
              style={{ backgroundColor: c, left: `${10 + i * 20}%`, top: i % 2 === 0 ? "15%" : "75%" }}
            />
          ))}

          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
            style={{ backgroundColor: "#e03189" }}
          >
            💚
          </div>
          <p style={{ fontFamily: "var(--font-display)", color: "#fff", fontWeight: 700, fontSize: "1.4rem" }}>
            Go well. You were loved here.
          </p>
          <p className="mt-2 text-sm" style={{ color: "#84bd00", fontFamily: "var(--font-body)", fontWeight: 600 }}>
            Made with 💖 by the people who worked beside you
          </p>
        </footer>
      </main>
    </div>
  );
}
