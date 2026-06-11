// Stores "Leave a message" submissions in Upstash Redis (free tier) so they
// can show up on the Message Wall instantly, without a redeploy.
//
// Requires two env vars set in Vercel (Project Settings -> Environment Variables):
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN
// Get these from your Upstash Redis database -> "REST API" section.

const REDIS_KEY = "remember-us-messages";

export default async function handler(req, res) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    res.status(500).json({ error: "Message storage is not configured yet." });
    return;
  }

  const headers = { Authorization: `Bearer ${token}` };

  if (req.method === "GET") {
    try {
      // Single-command REST format: POST to root with ["LRANGE", key, start, stop]
      const r = await fetch(url, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(["LRANGE", REDIS_KEY, "0", "199"]),
      });
      const data = await r.json();
      const messages = (data.result || [])
        .map((s) => {
          try {
            let parsed = JSON.parse(s);
            // Tolerate older entries that were accidentally double-wrapped in an array
            if (Array.isArray(parsed)) parsed = JSON.parse(parsed[0]);
            return parsed;
          } catch {
            return null;
          }
        })
        .filter(Boolean);
      res.status(200).json({ messages });
    } catch {
      res.status(500).json({ error: "Failed to load messages." });
    }
    return;
  }

  if (req.method === "POST") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const name = (body?.name || "").toString().trim().slice(0, 80);
      const message = (body?.message || "").toString().trim().slice(0, 1000);

      if (!name || !message) {
        res.status(400).json({ error: "Name and message are required." });
        return;
      }

      const entry = JSON.stringify({
        id: Date.now(),
        name,
        message,
        date: new Date().toISOString(),
      });

      // Single-command REST format: POST to root with ["LPUSH", key, value]
      await fetch(url, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(["LPUSH", REDIS_KEY, entry]),
      });

      res.status(200).json({ ok: true });
    } catch {
      res.status(500).json({ error: "Failed to save message." });
    }
    return;
  }

  res.setHeader("Allow", "GET, POST");
  res.status(405).json({ error: "Method not allowed" });
}
