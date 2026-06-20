# ClutchFuel — Clutch Score MVP

Public **Clutch Score** assessment: 60-second hydration quiz, email capture, personalized score, and feedback — backed by **Supabase** (Lovable Cloud).

| | |
|---|---|
| **GitHub** | https://github.com/Clutchfuel/pixel-perfect-exact-88-b80bf162 |
| **Published (Lovable)** | https://pixel-perfect-exact-88-b80bf162.lovable.app |
| **Athlete app** | https://clutch-athlete-insight.lovable.app |

Built with **TanStack Start**, **React 19**, **Vite 7**, synced from [Lovable](https://lovable.dev).

Deploy workflow: **[SETUP.md](./SETUP.md)**

## Quick start

```bash
bun install
cp .env.example .env   # add Supabase keys from Lovable Cloud
bun run dev            # http://localhost:5173
```

## Scripts

| Command | Purpose |
|---------|---------|
| `bun run dev` | Local development |
| `bun run build` | Production build |
| `bun run lint` | ESLint + Prettier |
| `bun run format` | Format all files |

## Environment variables

Copy [`.env.example`](./.env.example) to `.env`. **Never commit `.env`.**

| Variable | Required |
|----------|----------|
| `VITE_SUPABASE_URL` | Yes |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Yes |
| `VITE_SITE_URL` | Optional (defaults to Lovable published URL) |

In Lovable: **Project → Settings → Environment** (or connect Supabase in Lovable Cloud).

## Product scope

Single route (`/`): landing → 5 questions → email → Clutch Score result → feedback.

This repo is the **new build** — separate from legacy `pixel-perfect-exact-88` and the full athlete platform in `clutch-athlete-insight`.

## License

[MIT](./LICENSE)
