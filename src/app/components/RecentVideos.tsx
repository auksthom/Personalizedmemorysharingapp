import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "motion/react";

const recentVideos = [
  {
    id: 1,
    title: "A message from the whole team",
    uploader: "Team Lead",
    uploadedAt: "2 hours ago",
    duration: "3:24",
    thumbnail: "https://images.unsplash.com/photo-1758691737584-a8f17fb34475?w=480&h=270&fit=crop&auto=format",
    tag: "NEW ✨",
    tagColor: "#e03189",
  },
  {
    id: 2,
    title: "Our best memories together",
    uploader: "Marketing Team",
    uploadedAt: "Yesterday",
    duration: "5:12",
    thumbnail: "https://images.unsplash.com/photo-1758520144658-c87be518b87e?w=480&h=270&fit=crop&auto=format",
    tag: null,
    tagColor: "#84bd00",
  },
  {
    id: 3,
    title: "From our Friday rituals",
    uploader: "Everyone 🎉",
    uploadedAt: "3 days ago",
    duration: "2:48",
    thumbnail: "https://images.unsplash.com/photo-1758873268904-89520408d4bc?w=480&h=270&fit=crop&auto=format",
    tag: null,
    tagColor: "#20c6b9",
  },
  {
    id: 4,
    title: "The roast — a loving tribute",
    uploader: "Dev Squad",
    uploadedAt: "5 days ago",
    duration: "7:05",
    thumbnail: "https://images.unsplash.com/photo-1758691737138-7b9b1884b1db?w=480&h=270&fit=crop&auto=format",
    tag: null,
    tagColor: "#84bd00",
  },
];

const borderColors = ["#e03189", "#84bd00", "#20c6b9", "#e03189"];

export function RecentVideos() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                border: `3px solid ${hoveredId === video.id ? borderColors[i] : "#e8f5cc"}`,
                transform: hoveredId === video.id ? "translateY(-6px) rotate(-0.5deg)" : "none",
                transition: "all 0.2s",
                boxShadow: hoveredId === video.id ? `6px 6px 0 ${borderColors[i]}44` : "2px 2px 0 #e8f5cc",
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
                />
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
                  style={{ backgroundColor: "rgba(28,46,35,0.4)", opacity: hoveredId === video.id ? 1 : 0 }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: borderColors[i] }}
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
                  <span className="text-xs" style={{ color: "#00563a", fontFamily: "var(--font-body)" }}>· {video.uploadedAt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
