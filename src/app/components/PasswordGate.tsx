import { useState } from "react";
import { motion } from "motion/react";

// Set the password via Vercel environment variable: VITE_SITE_PASSWORD
// (Project Settings → Environment Variables → add VITE_SITE_PASSWORD)
// Falls back to "rememberus" if the env var isn't set.
const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || "rememberus";
const SESSION_KEY = "ru_unlocked";

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === SITE_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "linear-gradient(135deg, #f4fbe6 0%, #e8f8f6 60%, #fce4f0 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="fixed -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-20" style={{ backgroundColor: "#e03189" }} />
      <div className="fixed -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none opacity-15" style={{ backgroundColor: "#84bd00" }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 18 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4"
            style={{ backgroundColor: "#e03189" }}
          >
            💚
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", color: "#1c2e23", fontWeight: 700, fontSize: "1.8rem", textAlign: "center" }}>
            Something special<br />awaits
          </h1>
          <p className="mt-2 text-sm text-center" style={{ color: "#00563a", fontFamily: "var(--font-body)" }}>
            Enter the password to continue
          </p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl p-6"
          style={{ backgroundColor: "#fff", border: "3px solid #e8f5cc", boxShadow: "6px 6px 0 #e8f5cc" }}
        >
          <label
            className="block text-sm mb-2"
            style={{ color: "#1c2e23", fontFamily: "var(--font-body)", fontWeight: 700 }}
          >
            Password
          </label>
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            autoFocus
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl outline-none text-base"
            style={{
              border: `2px solid ${error ? "#e03189" : "#e8f5cc"}`,
              fontFamily: "var(--font-body)",
              color: "#1c2e23",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = "#84bd00"; }}
            onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = "#e8f5cc"; }}
          />
          {error && (
            <p className="mt-2 text-xs" style={{ color: "#e03189", fontFamily: "var(--font-body)", fontWeight: 600 }}>
              Wrong password — try again
            </p>
          )}
          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-full font-bold text-white text-sm"
            style={{ backgroundColor: "#84bd00", fontFamily: "var(--font-body)" }}
          >
            Enter →
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
}
