import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn } from "lucide-react";

interface Photo {
  id: number;
  image: string;
  caption: string;
  accent?: string;
}

// Photos are managed as content files under src/content/photos/*.json —
// edit them directly, or use the /admin CMS to add a new "Photo".
const photoModules = import.meta.glob<Photo>("../../content/photos/*.json", {
  eager: true,
  import: "default",
});

const ACCENTS = ["#e03189", "#84bd00", "#20c6b9"];

const mosaicPhotos: Required<Photo>[] = Object.values(photoModules)
  .sort((a, b) => a.id - b.id)
  .map((photo, i) => ({
    ...photo,
    accent: photo.accent || ACCENTS[i % ACCENTS.length],
  }));

export function PhotoMosaic() {
  const [lightboxPhoto, setLightboxPhoto] = useState<Required<Photo> | null>(null);

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
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gridAutoRows: "160px" }}
        >
          {mosaicPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.045, type: "spring", damping: 18 }}
              onClick={() => setLightboxPhoto(photo)}
              className="relative overflow-hidden cursor-pointer group"
              style={{
                borderRadius: "16px",
                border: `3px solid transparent`,
                transition: "all 0.2s",
              }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
            >
              <img
                src={photo.image}
                alt={photo.caption}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/media/photos/placeholder.svg"; }}
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
                src={lightboxPhoto.image}
                alt={lightboxPhoto.caption}
                className="w-full object-cover"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/media/photos/placeholder.svg"; }}
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
