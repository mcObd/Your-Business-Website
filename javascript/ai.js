// /api/hf-proxy.js
export default async function handler(req, res) {
  // Forward whatever JSON the client sends directly to HF
  const hfRes = await fetch(
    "https://api-inference.huggingface.co/models/distilbert-base-uncased",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: req.body
    }
  );

  const data = await hfRes.json();
  // Mirror status code + JSON back to client
  res.status(hfRes.status).json(data);
}
