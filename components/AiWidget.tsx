"use client";

import { useState } from "react";

type ChatItem = { role: "user" | "ai"; text: string };

export default function AiWidget() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState<ChatItem[]>([
    { role: "ai", text: "Ask me anything about this portfolio (education, projects, skills)." },
  ]);
  const [loading, setLoading] = useState(false);

  async function send() {
    const msg = input.trim();
    if (!msg || loading) return;

    setItems((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();

      if (!res.ok) {
        setItems((prev) => [
          ...prev,
          { role: "ai", text: `Error: ${data?.error ?? "Request failed"}` },
        ]);
      } else {
        setItems((prev) => [...prev, { role: "ai", text: data.text }]);
      }
    } catch (e: any) {
      setItems((prev) => [...prev, { role: "ai", text: `Error: ${String(e)}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="max-h-56 space-y-3 overflow-auto pr-1">
        {items.map((it, idx) => (
          <div
            key={idx}
            className={
              it.role === "user"
                ? "ml-auto w-fit max-w-[85%] rounded-2xl bg-white px-3 py-2 text-sm text-zinc-950"
                : "mr-auto w-fit max-w-[85%] rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100"
            }
          >
            {it.text}
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="Type a question…"
          className="flex-1 rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-white/20"
        />
        <button
          onClick={send}
          disabled={loading}
          className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-zinc-950 disabled:opacity-50"
        >
          {loading ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}