import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";

// Sign up free at https://formspree.io, create a form, and paste its
// endpoint URL here (looks like "https://formspree.io/f/abcdwxyz").
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgoblnql";

export function MessageForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: email.trim() || "anonymous@rememberus.uk", message }),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="px-6 md:px-12 py-16" style={{ backgroundColor: "#f4fbe6" }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
            style={{ backgroundColor: "#e03189", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em" }}
          >
            ✍️ LEAVE A MESSAGE
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "#1c2e23", fontWeight: 700, fontSize: "2rem" }}>
            Got something to say?
          </h2>
          <p className="mt-1 text-base" style={{ color: "#00563a", fontFamily: "var(--font-body)" }}>
            Drop a quick note — we'll add the good ones to the page 💌
          </p>
        </div>

        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: "#fff", border: "3px solid #84bd00" }}
          >
            <CheckCircle2 size={36} style={{ color: "#84bd00" }} className="mx-auto mb-3" />
            <p style={{ fontFamily: "var(--font-display)", color: "#1c2e23", fontWeight: 700, fontSize: "1.1rem" }}>
              Thanks! Your message was sent 🎉
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-sm px-4 py-2 rounded-full"
              style={{ backgroundColor: "#f4fbe6", color: "#00563a", fontFamily: "var(--font-body)", fontWeight: 600 }}
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl p-6 md:p-8 space-y-4"
            style={{ backgroundColor: "#fff", border: "3px solid #e8f5cc" }}
          >
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#1c2e23", fontFamily: "var(--font-body)", fontWeight: 700 }}>
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Sarah Chen"
                className="w-full px-4 py-2.5 rounded-xl outline-none"
                style={{ border: "2px solid #e8f5cc", fontFamily: "var(--font-body)", color: "#1c2e23" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#84bd00")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e8f5cc")}
              />
            </div>

            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#1c2e23", fontFamily: "var(--font-body)", fontWeight: 700 }}>
                Your email <span style={{ fontWeight: 400, color: "#00563a" }}>(optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. sarah@example.com"
                className="w-full px-4 py-2.5 rounded-xl outline-none"
                style={{ border: "2px solid #e8f5cc", fontFamily: "var(--font-body)", color: "#1c2e23" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#84bd00")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e8f5cc")}
              />
            </div>

            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#1c2e23", fontFamily: "var(--font-body)", fontWeight: 700 }}>
                Your message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                placeholder="Share a memory, well-wish, or inside joke..."
                className="w-full px-4 py-2.5 rounded-xl outline-none resize-none"
                style={{ border: "2px solid #e8f5cc", fontFamily: "var(--font-body)", color: "#1c2e23" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#84bd00")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#e8f5cc")}
              />
            </div>

            {status === "error" && (
              <p className="text-sm" style={{ color: "#e03189", fontFamily: "var(--font-body)", fontWeight: 600 }}>
                Something went wrong — please try again in a moment.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full transition-transform"
              style={{
                backgroundColor: "#84bd00",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                opacity: status === "sending" ? 0.7 : 1,
              }}
            >
              <Send size={16} />
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
