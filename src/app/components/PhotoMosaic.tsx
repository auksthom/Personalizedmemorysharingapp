import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn } from "lucide-react";

const mosaicPhotos = [
  { id: 1, url: "https://images.unsplash.com/photo-1758520144658-c87be518b87e?w=400&h=400&fit=crop&auto=format", caption: "Team kickoff 2024 🚀", span: "col-span-2 row-span-2", accent: "#e03189" },
  { id: 2, url: "https://images.unsplash.com/photo-1758691737584-a8f17fb34475?w=200&h=200&fit=crop&auto=format", caption: "Friday celebrations 🎉", accent: "#84bd00" },
  { id: 3, url: "https://images.unsplash.com/photo-1758873268933-e0765262e58d?w=200&h=200&fit=crop&auto=format", caption: "The annual retreat 🏕️", accent: "#20c6b9" },
  { id: 4, url: "https://images.unsplash.com/photo-1758691737433-2269d5cdd910?w=200&h=200&fit=crop&auto=format", caption: "Late nights together 🌙", accent: "#e03189" },
  { id: 5, url: "https://images.unsplash.com/photo-1758691737535-57edd2a11d73?w=200&h=200&fit=crop&auto=format", caption: "Project launch day 🎊", accent: "#84bd00" },
  { id: 6, url: "https://images.unsplash.com/photo-1758873268904-89520408d4bc?w=400&h=200&fit=crop&auto=format", caption: "Epic team selfie 📸", span: "col-span-2", accent: "#20c6b9" },
  { id: 7, url: "https://images.unsplash.com/photo-1758691737138-7b9b1884b1db?w=200&h=200&fit=crop&auto=format", caption: "Morning stand-ups ☕", accent: "#e03189" },
  { id: 8, url: "https://images.unsplash.com/photo-1758518730523-c9f6336ebdae?w=200&h=400&fit=crop&auto=format", caption: "Offsite adventures 🗺️", span: "row-span-2", accent: "#84bd00" },
  { id: 9, url: "https://images.unsplash.com/photo-1758520144661-73849bde0da1?w=200&h=200&fit=crop&auto=format", caption: "Goodbye lunch 🍽️", accent: "#20c6b9" },
  { id: 10, url: "https://images.unsplash.com/photo-1758691737492-48e8fdd336f7?w=400&h=200&fit=crop&auto=format", caption: "Last day memories 💚", span: "col-span-2", accent: "#e03189" },
  { id: 11, url: "https://images.unsplash.com/photo-1758691737538-220c1902b1ca?w=200&h=200&fit=crop&auto=format", caption: "Rooftop drinks 🥂", accent: "#84bd00" },
];

interface Photo { id: number; url: string; caption: string; span?: string; accent: string }

export function PhotoMosaic() {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  return (
    <section className="px-6 md:px-12 py-16 relative overflow-hidden" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
              style={{ backgroundColor: "#20c6b9", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em" }}
            >
              📸 PHOTO WALL
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "#1c2e23", fontWeight: 700, fontSize: "2rem" }}>
              The moments we shared
            </h2>
            <p className="mt-1 text-base" style={{ color: "#00563a", fontFamily: "var(--font-body)" }}>
              Click any photo to see it up close 🔍
            </p>
          </div>
          <span className="text-3xl select-none">🖼️</span>
        </div>

        {/* Mosaic grid */}
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: "140px" }}
        >
          {mosaicPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.045, type: "spring", damping: 18 }}
              onClick={() => setLightboxPhoto(photo)}
              className={`relative overflow-hidden cursor-pointer group ${photo.span || ""}`}
              style={{
                borderRadius: "16px",
                border: `3px solid transparent`,
                transition: "all 0.2s",
              }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
              {/* Colored hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2"
                style={{ backgroundColor: `${photo.accent}cc` }}
              >
                <ZoomIn size={22} className="text-white" />
                <span className="text-xs text-center px-3 text-white font-bold" style={{ fontFamily: "var(--font-body)" }}>
                  {photo.caption}
                </span>
              </div>
              {/* Colored border on hover via box-shadow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 3px ${photo.accent}` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(28,46,35,0.88)", backdropFilter: "blur(12px)" }}
            onClick={() => setLightboxPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 260 }}
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden"
              style={{ border: `5px solid ${lightboxPhoto.accent}`, boxShadow: `10px 10px 0 ${lightboxPhoto.accent}55` }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxPhoto.url.replace("w=200&h=200", "w=900&h=600").replace("w=400&h=400", "w=900&h=600").replace("w=400&h=200", "w=900&h=450").replace("w=200&h=400", "w=600&h=900")}
                alt={lightboxPhoto.caption}
                className="w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4"
                style={{ background: `linear-gradient(to top, ${lightboxPhoto.accent}ee, transparent)` }}
              >
                <p style={{ fontFamily: "var(--font-display)", color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>{lightboxPhoto.caption}</p>
              </div>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: lightboxPhoto.accent }}
              >
                <X size={16} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
