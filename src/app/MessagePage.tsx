import { MessageForm } from "./components/MessageForm";

// Standalone "leave a message" page — share this link (rememberus.uk/message)
// with people instead of the main site, so the surprise farewell page stays hidden.
export default function MessagePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f4fbe6", fontFamily: "var(--font-body)" }}>
      <header className="px-6 py-6 text-center">
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-full text-2xl mx-auto mb-2"
          style={{ backgroundColor: "#e03189" }}
        >
          💌
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", color: "#1c2e23", fontWeight: 700, fontSize: "1.6rem" }}>
          Leave a message
        </h1>
        <p className="mt-1 text-sm max-w-md mx-auto" style={{ color: "#00563a" }}>
          We're putting together something special — drop a quick note below and it might just show up on it 👀
        </p>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="w-full">
          <MessageForm />
        </div>
      </main>

      <footer className="text-center py-6 text-xs" style={{ color: "#6b8c7a" }}>
        Thanks for taking the time 💚
      </footer>
    </div>
  );
}
