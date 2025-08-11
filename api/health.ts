import { ok, isOptions, json } from "./_utils";
export const config = { runtime: "edge" };
export default async function handler(req: Request) {
  if (isOptions(req)) return json({}, 204);
  return ok({ status: "ok" });
}
