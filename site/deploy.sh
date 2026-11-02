SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Read token from Vault credential file (not CLI --token which rejects tokens with colons)
TOKEN="${VercelToken:-$1}"
if [[ -z "$TOKEN" ]]; then
  VAULT_TOKEN_FILE="/root/.openclaw/vault/credentials/vercel-api-token.txt"
  if [[ -f "$VAULT_TOKEN_FILE" ]]; then
    TOKEN="$(cat "$VAULT_TOKEN_FILE")"
  else
    echo "ERROR: No token provided and vault file not found."
    echo "Usage: ./deploy.sh <vercel-token>"
    echo "  or set env var: VercelToken=<token> ./deploy.sh"
    exit 1
  fi
fi

export VERCEL_TOKEN="$TOKEN"

# Guard: must run from site/ directory
if [[ "$(basename "$SCRIPT_DIR")" != "site" ]]; then
  echo "ERROR: Run from the site/ directory:"
  echo "  cd projects/torchbutt/site && ./deploy.sh"
  exit 1
fi

echo "=== TorchButt Deploy ==="
echo "Verifying auth..."
WHOAMI=$(curl -s "https://api.vercel.com/v2/user" \
  -H "Authorization: Bearer $TOKEN" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('user',{}).get('username',''))" 2>/dev/null)
if [[ "$WHOAMI" != "mj1804" ]]; then
  echo "ERROR: Auth failed (got: $WHOAMI)"
  exit 1
fi
echo "Auth OK: $WHOAMI"

echo "Deploying..."
npx vercel deploy --prod --yes 2>&1
echo ""
echo "=== Deploy complete ==="
echo "Verify at: https://torchbutt.com"
