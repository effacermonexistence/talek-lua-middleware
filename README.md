# Talek‑Lua Middleware (Vercel‑first)

One HTTPS endpoint you deploy once, then call from iPhone / iPad / Mac.

## Endpoints
- `POST /api/chat` → body: `{ "userId": "ben", "message": "ping" }`
- `GET  /api/health`

## Deploy (quick)
1. Push this folder to GitHub as a repo.
2. On Vercel → "Add New Project" → import the repo.
3. (Optional) Add `OPENAI_API_KEY` in Project → Settings → Environment Variables.
4. Deploy. You’ll get URLs like `https://<app>.vercel.app/api/chat`.

## Test
```bash
curl -X POST https://<app>.vercel.app/api/chat   -H "content-type: application/json"   -d '{"userId":"ben","message":"ping"}'
```

If `OPENAI_API_KEY` is unset, the endpoint replies in health mode (echo).
