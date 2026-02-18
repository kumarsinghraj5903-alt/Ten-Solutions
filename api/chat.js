export default async function handler(req, res) {
  const userMsg = req.body.message;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `
You are Ten Solutions AI Tutor.
Only help CBSE Class 9–12 students.
Explain simply. No adult content.
Question: ${userMsg}
`
          }]
        }]
      })
    }
  );

  const data = await response.json();
  res.status(200).json({
    reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "Try again."
  });
}
