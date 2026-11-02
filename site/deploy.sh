#!/usr/bin/env bash
# TorchButt — Vercel deploy script
# Usage: ./deploy.sh <vercel-token>

set -e

TOKEN="${1:-}"
if [[ -z "$TOKEN" ]]; then
  echo "Usage: ./deploy.sh <vercel-token>"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Guard: must run from site/ directory
if [[ "$(basename "$SCRIPT_DIR")" != "site" ]]; then
  echo "ERROR: Run from the site/ directory:"
  echo "  cd projects/torchbutt/site && ./deploy.sh <token>"
  exit 1
fi

echo "=== TorchButt Deploy ==="
echo "Verifying auth..."
WHOAMI=$(npx vercel --token "$TOKEN" whoami 2>/dev/null || echo "FAIL")
if [[ "$WHOAMI" != "mj1804" ]]; then
  echo "ERROR: Auth failed (got: $WHOAMI, expected: mj1804)"
  exit 1
fi
echo "Auth OK: $WHOAMI"

echo "Deploying..."
npx vercel deploy --prod --yes --token "$TOKEN" 2>&1
echo ""
echo "=== Deploy complete ==="
echo "Verify at: https://torchbutt.vercel.app"
