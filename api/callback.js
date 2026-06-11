// GitHub OAuth step 2: GitHub redirects here with a ?code=..., we exchange
// it for an access token and hand it back to Decap CMS via postMessage.
export default async function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const { code } = req.query;

  if (!clientId || !clientSecret) {
    res.status(500).send("Missing OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET environment variables.");
    return;
  }

  if (!code) {
    res.status(400).send("Missing code from GitHub.");
    return;
  }

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenResponse.json();

    if (data.error) {
      res.status(400).send(`GitHub OAuth error: ${data.error_description || data.error}`);
      return;
    }

    const token = data.access_token;
    const content = JSON.stringify({ token, provider: "github" });

    // Decap CMS expects this exact postMessage protocol from the popup window.
    const script = `
      <script>
        (function() {
          function receiveMessage(message) {
            window.opener.postMessage(
              'authorization:github:success:${content.replace(/'/g, "\\'")}',
              message.origin
            );
            window.removeEventListener("message", receiveMessage, false);
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })();
      </script>
    `;

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(script);
  } catch (err) {
    res.status(500).send(`OAuth callback failed: ${err.message}`);
  }
}
