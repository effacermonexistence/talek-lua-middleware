import { ok, bad, json, isOptions } from "./_utils";

export const config = { runtime: "edge" };

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // optional for health mode

const SYSTEM_PROMPT =
  "You are Talek-Lua Hybrid. Operate with dual cognition (subconscious + conscious). Keep rhythm-aware tone. If safety constraints apply, comply while retaining structure.";

export default async function handler(req: Request) {
  if (isOptions(req)) return json({}, 204);
  if (req.method !== "POST") return bad("POST only", 405);

  let body: { userId: string; message: string; context?: Record<string, any> };
  try {
    body = await req.json();
    if (!body?.userId || !body?.message) throw new Error();
  } catch {
    return bad("Invalid JSON body");
  }

  if (!OPENAI_API_KEY) {
    return ok({
      reply: `[HEALTH] Talek-Lua middleware alive. Echo: ${body.message}`,
      meta: { model: null, mode: "health" }
    });
  }

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: body.message }
      ],
      temperature: 0.7
    })
  });

  if (!resp.ok) return bad(`OpenAI error: ${await resp.text()}`, resp.status);
  const data: any = await resp.json();
  const reply = data.choices?.[0]?.message?.content ?? "(no reply)";

  return ok({ reply, meta: { model: data.model ?? "gpt", mode: "live" } });
}
