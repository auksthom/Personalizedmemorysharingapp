import { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { formatDistanceToNow } from "date-fns";

interface RecentVideo {
  id: number;
  title: string;
  uploader: string;
  uploadedAt: string; // ISO date, e.g. "2026-06-08"
  duration: string;
  thumbnail: string;
  video?: string;
  tag?: string;
  tagColor: string;
}

// Recent uploads are managed as content files under
// src/content/recent-videos/*.json — edit them directly, or use the
// /admin CMS to add a new "Recent Video" entry. Newest uploadedAt first.
const recentVideoModules = import.meta.glob<RecentVideo>("../../content/recent-videos/*.json", {
  eager: true,
  import: "default",
});

const recentVideos: RecentVideo[] = Object.values(recentVideoModules).sort(
  (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
);

const borderColors = ["#e03189", "#84bd00", "#20c6b9", "#e03189"];

export function RecentVideos() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<RecentVideo | null>(null);

  return (
    <section className="px-6 md:px-12 py-16" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
              style={{ backgroundColor: "#84bd00", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em" }}
            >
              📹 LATEST UPLOADS
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "#1c2e23", fontWeight: 700, fontSize: "2rem" }}>
              Fresh from the team
            </h2>
          </div>
          <span className="text-sm" style={{ color: "#00563a", fontFamily: "var(--font-body)", fontWeight: 600 }}>
            {recentVideos.length} videos 🎬
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring", damping: 18 }}
              onMouseEnter={() => setHoveredId(video.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setActiveVideo(video)}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                border: `3px solid ${hoveredId === video.id ? borderColors[i % borderColors.length] : "#e8f5cc"}`,
                transform: hoveredId === video.id ? "translateY(-6px) rotate(-0.5deg)" : "none",
                transition: "all 0.2s",
                boxShadow: hoveredId === video.id ? `6px 6px 0 ${borderColors[i % borderColors.length]}44` : "2px 2px 0 #e8f5cc",
                backgroundColor: "#fff",
              }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  style={{ transform: hoveredId === video.id ? "scale(1.06)" : "scale(1)", transition: "transform 0.4s" }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/media/photos/placeholder.svg"; }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
                  style={{ backgroundColor: "rgba(28,46,35,0.4)", opacity: hoveredId === video.id ? 1 : 0 }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: borderColors[i % borderColors.length] }}
                  >
                    <Play size={20} className="text-white ml-0.5" />
                  </div>
                </div>
                {video.tag && (
                  <span className="absolute top-2 left-2 text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: video.tagColor, color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700 }}
                  >
                    {video.tag}
                  </span>
                )}
                <span className="absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: "rgba(28,46,35,0.8)", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 600 }}
                >
                  {video.duration}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-sm leading-snug mb-1.5"
                  style={{ color: "#1c2e23", fontFamily: "var(--font-body)", fontWeight: 700 }}
                >
                  {video.title}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#f4fbe6", color: "#00563a", fontFamily: "var(--font-body)", fontWeight: 600 }}
                  >
                    {video.uploader}
                  </span>
                  <span className="text-xs" style={{ color: "#00563a", fontFamily: "var(--font-body)" }}>
                    · {formatDistanceToNow(new Date(video.uploadedAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video player overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(28,46,35,0.85)", backdropFilter: "blur(10px)" }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 260 }}
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#fff", border: "4px solid #84bd00", boxShadow: "10px 10px 0 #84bd0044" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-black">
                <video
                  key={activeVideo.video || activeVideo.id}
                  src={activeVideo.video}
                  poster={activeVideo.thumbnail}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                >
                  Sorry, your browser doesn't support embedded videos.
                </video>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center z-10"
                  style={{ backgroundColor: "#84bd00" }}
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
              <div className="p-5">
                <h3 style={{ fontFamily: "var(--font-display)", color: "#1c2e23", fontWeight: 700, fontSize: "1.15rem" }}>{activeVideo.title}</h3>
                <p className="text-sm mt-1" style={{ color: "#00563a", fontFamily: "var(--font-body)" }}>
                  {activeVideo.uploader} · {formatDistanceToNow(new Date(activeVideo.uploadedAt), { addSuffix: true })}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
