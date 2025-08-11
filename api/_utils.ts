export function json(res: any, status = 200) {
  return new Response(JSON.stringify(res), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type, authorization"
    }
  });
}
export function ok<T>(data: T) { return json({ ok: true, ...data }); }
export function bad(message: string, code = 400) { return json({ ok: false, error: message }, code); }
export function isOptions(req: Request) { return req.method === "OPTIONS"; }
