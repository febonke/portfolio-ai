import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("KEY:", process.env.GEMINI_API_KEY);
    console.log("TEST_ENV:", process.env.TEST_ENV);
    console.log("GEMINI:", process.env.GEMINI_API_KEY);
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Missing message" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Missing GEMINI_API_KEY in environment" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Good general model for chat-style responses
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt =
      "You are a helpful assistant embedded on Felipe's portfolio site. " +
      "Answer questions about Felipe's skills, projects, education, and interests based only on the info provided. " +
      "If you don't know, say what info is missing. Keep answers concise and professional.\n\n" +
      "Portfolio info:\n" +
      "- Name: Felipe\n" +
      "- Education: Associate’s UCNJ (08/2022–12/2024), Bachelor’s Kean University (01/2025–12/2026)\n" +
      "- Projects: Temperature Tracker (Java), Grades Analyzer (Java), Java Calculator\n" +
      "- Skills: Python, Java, HTML, PowerShell, Next.js\n" +
      "- Interests: programming, data analysis, video games\n";

    const result = await model.generateContent(
      `${systemPrompt}\nUser: ${message}\nAssistant:`
    );

    const text = result.response.text()?.trim() || "No response generated.";

    return Response.json({ text });
  } catch (err: any) {
    console.error("🔥 /api/chat failed:", err);
    return Response.json(
      { error: "Unexpected server error", detail: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}