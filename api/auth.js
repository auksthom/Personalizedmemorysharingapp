// GitHub OAuth step 1: redirect the CMS to GitHub's "authorize" page.
// Required Vercel env vars: OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET (set in
// Vercel project settings, never committed to the repo).
export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;

  if (!clientId) {
    res.status(500).send("Missing OAUTH_CLIENT_ID environment variable.");
    return;
  }

  const state = Math.random().toString(36).slice(2);
  const redirectUri = `https://${req.headers.host}/api/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo,user",
    state,
  });

  res.writeHead(302, {
    Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
  });
  res.end();
}
