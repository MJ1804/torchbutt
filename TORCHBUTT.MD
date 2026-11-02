# TorchButt — Quick Reference

**Live:** https://torchbutt.com
**GitHub:** github.com/MJ1804/torchbutt
**Vercel:** `prj_BY8CUXvOG4ae0HYf5JGgq8aR49Go` (team `mj1804s-projects`)
**Deploy:** `cd projects/torchbutt/site && ./deploy.sh` (auto-reads token from vault)

---

## What It Is
Dick Butt–style meme site. A butt with a torch and an emerald flame. Comics, downloads, and an interactive punchline card generator.
Built in plain HTML/CSS/JS — no framework.

## Pages
- `index.html` — Hero + latest comic + archive + downloads
- `archive.html` — Full archive of all issues
- `css/styles.css` — Paper-grain aesthetic (cream `#eeeade`, ink `#191a16`, green `#77ef43`)
- `js/app.js` — Comic modal, X share, punchline editor + canvas renderer

## Comic Issues
| Issue | File | Description |
|---|---|---|
| 001 | `assets/issue-01.png` | The Bathroom Incident — TP surprise |
| 002 | `assets/issue-02.png` | Holiday Special — Grinch / wrapping paper |
| 003 | `assets/issue-03.png` | The Coin Incident — memecoin culture (full scroll, 1363×3989) |

## Assets
- `assets/torchbutt.png` — main mascot (transparent PNG)
- `assets/issue-01.png` — Issue 001 strip
- `assets/issue-02.png` — Issue 002 strip
- `assets/issue-03.png` — Issue 003 full scroll

## Punchline Card Generator
- Textarea in the Downloads section — user types caption (80 chars max)
- Live preview updates as they type
- Download renders a 1600×1200 PNG via HTML Canvas:
  - Paper background + double border
  - User caption in rotated white panel, top-left, Impact font, auto-wrapped
  - TorchButt bottom-right
  - Footer stamp: "TORCHBUTT / MAKE IT WEIRDER."
  - Filename: `torchbutt-{slugified-caption}.png`

## Deploy Checklist
1. `cd projects/torchbutt`
2. `git add -A && git commit -m "message" && git push origin main`
3. `cd site && ./deploy.sh` (script auto-hides workspace `.vercel` to target correct project)
4. Verify: `curl -s https://torchbutt.com | grep 'Torchbutt'`

## Known Issues
- Vercel CLI token contains `:` chars — passes via `VERCEL_TOKEN` env var, NOT `--token` flag
- Deploy script uses `mv /root/.openclaw/workspace/.vercel /root/.vercel.bak` trick to prevent wrong project targeting
- Image analysis model unavailable (401 auth error) — use curl + PIL for pixel inspection instead
- Browser automation (Camoufox) unavailable — RAM limit on this machine

## TODO
- More comic issues
- Isolated transparent character PNG variants for meme templates
- Custom domain `torchbutt.com` already configured → just needs renewal (expires 2027-11-02)
