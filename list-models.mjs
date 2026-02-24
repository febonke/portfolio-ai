const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.error("Missing GEMINI_API_KEY in env");
  process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
const res = await fetch(url);

if (!res.ok) {
  const text = await res.text();
  console.error("ListModels failed:", res.status, res.statusText, text);
  process.exit(1);
}

const json = await res.json();

console.log("Available models (must include generateContent):\n");

for (const m of json.models ?? []) {
  const methods = (m.supportedGenerationMethods ?? []).join(", ");
  console.log("-", m.name, "| methods:", methods);
}