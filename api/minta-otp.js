// api/minta-otp.js
export default async function handler(req, res) {
  // CORS minimal
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // ENV dari Vercel
  const AUTHORIZATION = process.env.AUTHORIZATION;
  const ID_TELEGRAM   = process.env.ID_TELEGRAM;
  const PASSWORD      = process.env.PASSWORD;

  const { nomor_hp } = req.body || {};
  if (!nomor_hp) return res.status(400).json({ error: "nomor_hp wajib diisi" });

  const upstream = await fetch("https://api.hidepulsa.com/api/v1/minta-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": AUTHORIZATION },
    body: JSON.stringify({ id_telegram: ID_TELEGRAM, password: PASSWORD, nomor_hp })
  });

  const text = await upstream.text(); // teruskan apa adanya
  res.status(upstream.status)
     .setHeader("Content-Type","application/json; charset=utf-8")
     .send(text);
}
