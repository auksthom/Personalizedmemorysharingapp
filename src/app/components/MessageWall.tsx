import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface WallMessage {
  id: number;
  name: string;
  message: string;
  date?: string;
}

// Curated/seed messages live as content files under src/content/messages/*.json —
// add new ones via the /admin CMS ("Messages" collection) if you want to hand-pick some.
const messageModules = import.meta.glob<WallMessage>("../../content/messages/*.json", {
  eager: true,
  import: "default",
});

const ACCENTS = ["#e03189", "#84bd00", "#20c6b9"];

const seedMessages: WallMessage[] = Object.values(messageModules);

export function MessageWall() {
  const [liveMessages, setLiveMessages] = useState<WallMessage[]>([]);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => (res.ok ? res.json() : { messages: [] }))
      .then((data) => setLiveMessages(data.messages || []))
      .catch(() => setLiveMessages([]));
  }, []);

  // Live submissions (newest first) appear above the curated/seed messages
  const messages: WallMessage[] = [...liveMessages, ...seedMessages].sort(
    (a, b) => (b.id || 0) - (a.id || 0)
  );

  return (
    <section className="px-6 md:px-12 py-16" style={{ backgroundColor: "#f4fbe6" }}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
            style={{ backgroundColor: "#e03189", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em" }}
          >
            💌 MESSAGES
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "#1c2e23", fontWeight: 700, fontSize: "2rem" }}>
            Notes from everyone
          </h2>
          <p className="mt-1 text-base" style={{ color: "#00563a", fontFamily: "var(--font-body)" }}>
            A few things people wanted you to know 💚
          </p>
        </div>

        {messages.length === 0 ? (
          <p className="text-center text-sm" style={{ color: "#6b8c7a", fontFamily: "var(--font-body)" }}>
            Messages will appear here soon...
          </p>
        ) : (
          <div className="space-y-4">
            {messages.map((m, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              const align = i % 2 === 0 ? "items-start" : "items-end";
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: (i % 6) * 0.05, type: "spring", damping: 18 }}
                  className={`flex flex-col ${align}`}
                >
                  <div
                    className="max-w-[85%] sm:max-w-[70%] rounded-2xl px-5 py-3.5"
                    style={{
                      backgroundColor: "#fff",
                      border: `2px solid ${accent}`,
                      borderBottomLeftRadius: i % 2 === 0 ? "4px" : "16px",
                      borderBottomRightRadius: i % 2 === 0 ? "16px" : "4px",
                    }}
                  >
                    <p style={{ color: "#1c2e23", fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                      {m.message}
                    </p>
                    <p
                      className="mt-2 text-xs"
                      style={{ color: accent, fontFamily: "var(--font-body)", fontWeight: 700 }}
                    >
                      — {m.name}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
