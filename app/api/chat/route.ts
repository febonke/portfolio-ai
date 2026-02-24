import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = body?.message;

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Missing message" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // This is the #1 silent cause
      return Response.json(
        { error: "Missing OPENAI_API_KEY in environment (.env.local)" },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey });

    const systemPrompt =
      "You are a helpful assistant embedded on Felipe's portfolio site. " +
      "Answer questions about Felipe's skills, projects, education, and interests based only on the info provided. " +
      "If you don't know, say what info is missing. Keep answers concise and professional.";

    // Use Chat Completions (works on more OpenAI SDK versions reliably)
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const text =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Sorry — I could not generate a response. Try again.";

    return Response.json({ text });
  } catch (err: any) {
    // ✅ This will finally show the true error in the terminal
    console.error("🔥 /api/chat failed:", err);

    // ✅ This will also show a helpful message in the browser UI (AiWidget)
    return Response.json(
      {
        error: "Unexpected server error",
        detail: err?.message ? String(err.message) : String(err),
      },
      { status: 500 }
    );
  }
}