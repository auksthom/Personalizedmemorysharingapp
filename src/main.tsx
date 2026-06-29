import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import MessagePage from "./app/MessagePage.tsx";
import { PasswordGate } from "./app/components/PasswordGate.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      {/* Main site — password protected */}
      <Route path="/" element={<PasswordGate><App /></PasswordGate>} />
      {/* /message contribution page — no password, share this link freely */}
      <Route path="/message" element={<MessagePage />} />
    </Routes>
  </BrowserRouter>
);
