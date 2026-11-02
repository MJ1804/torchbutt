// TorchButt — Comic site interactions

// ─── Comic Reader Modal ───
const reader = document.querySelector('#reader');
const fullComic = document.querySelector('#full-comic');
const closeBtn = document.querySelector('#close');

if (reader) {
  document.querySelectorAll('[data-comic]').forEach(el => {
    el.addEventListener('click', () => {
      fullComic.src = el.dataset.comic;
      reader.showModal();
    });
  });

  closeBtn.addEventListener('click', () => reader.close());
  reader.addEventListener('click', e => {
    if (e.target === reader) reader.close();
  });
}

// ─── Share on X (Twitter) ───
const shareBtn = document.getElementById('share');
if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    const url = new URL(location.href);
    url.hash = 'latest';
    const text = encodeURIComponent('The coin incident. Of course. 🔥 #Torchbutt');
    const encodedUrl = encodeURIComponent(url.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
      '_blank',
      'noopener,noreferrer'
    );
  });
}

// ═══════════════════════════════════════════════
//   PUNCHLINE EDITOR — live preview + download
// ═══════════════════════════════════════════════

const PLACEHOLDER = 'YOUR BAD IDEA HERE.';
const CARD_W = 1600;
const CARD_H = 1200;

const punchForm = document.getElementById('punchline-form');
const punchInput = document.getElementById('punchline-input');
const punchPreview = document.getElementById('punchline-text');
const punchCount = document.getElementById('punchline-count');

// Keep a handle on the character image (used for canvas rendering)
let characterImg = null;
function getCharacterImage() {
  if (characterImg) return Promise.resolve(characterImg);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { characterImg = img; resolve(img); };
    img.onerror = reject;
    img.src = 'assets/torchbutt.png';
  });
}

/** Break text into lines that fit within maxWidth at the given font. */
function wrapText(ctx, text, maxWidth) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Rough char-per-line estimate for the on-page preview box. */
function estimatePreviewLines(text) {
  const CHARS_PER_LINE = 16;
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (test.length > CHARS_PER_LINE && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function updatePreview() {
  if (!punchInput || !punchPreview) return;
  const raw = punchInput.value.trim();

  if (punchCount) punchCount.textContent = punchInput.value.length;

  if (!raw) {
    punchPreview.innerHTML = 'YOUR BAD<br>IDEA HERE.';
    punchPreview.classList.remove('is-filled');
    return;
  }

  punchPreview.classList.add('is-filled');
  punchPreview.textContent = estimatePreviewLines(raw.toUpperCase())
    .join('\n');
  // Use pre-line so our explicit newlines render
  punchPreview.style.whiteSpace = 'pre-line';
}

punchInput?.addEventListener('input', updatePreview);
punchInput?.addEventListener('change', updatePreview);

// ─── Download the personalised card ───
punchForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const raw = (punchInput?.value || '').trim();
  const caption = raw || PLACEHOLDER;

  const btn = document.getElementById('punchline-download');
  const originalLabel = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'RENDERING…';

  try {
    const img = await getCharacterImage();

    const canvas = document.createElement('canvas');
    canvas.width = CARD_W;
    canvas.height = CARD_H;
    const ctx = canvas.getContext('2d');

    // ── Paper background ──
    ctx.fillStyle = '#eeeade';
    ctx.fillRect(0, 0, CARD_W, CARD_H);

    // ── Borders ──
    ctx.strokeStyle = '#191a16';
    ctx.lineWidth = 10;
    ctx.strokeRect(24, 24, CARD_W - 48, CARD_H - 48);
    ctx.lineWidth = 4;
    ctx.strokeRect(42, 40, CARD_W - 84, CARD_H - 120);

    // ── Character, bottom-right ──
    const charH = 850;
    const charW = (img.width / img.height) * charH;
    ctx.drawImage(img, CARD_W - 80 - charW, 280, charW, charH);

    // ── Caption block, top-left ──
    const boxX = 90;
    const boxY = 120;
    const boxW = 660;

    // Measure and wrap the caption
    ctx.font = '900 62px Impact, "Arial Black", sans-serif';
    const lines = wrapText(ctx, caption.toUpperCase(), boxW - 60);
    const lineHeight = 68;
    const boxH = Math.max(150, lines.length * lineHeight + 70);

    // White caption panel
    ctx.save();
    ctx.translate(boxX + boxW / 2, boxY + boxH / 2);
    ctx.rotate(-3 * Math.PI / 180);
    ctx.translate(-(boxX + boxW / 2), -(boxY + boxH / 2));

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(boxX, boxY, boxW, boxH);
    ctx.strokeStyle = '#191a16';
    ctx.lineWidth = 8;
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    // Caption text
    ctx.fillStyle = '#191a16';
    ctx.textBaseline = 'top';
    lines.forEach((line, i) => {
      ctx.fillText(line, boxX + 30, boxY + 36 + i * lineHeight);
    });
    ctx.restore();

    // ── Footer stamp ──
    ctx.fillStyle = '#191a16';
    ctx.font = 'bold 25px "Courier New", monospace';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('TORCHBUTT / MAKE IT WEIRDER.', 75, CARD_H - 60);

    // ── Deliver the file ──
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `torchbutt-${slugify(caption)}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      btn.disabled = false;
      btn.textContent = originalLabel;
      if (typeof showToast === 'function') showToast('CARD DOWNLOADED. GO BE TERRIBLE.');
    }, 'image/png');
  } catch (err) {
    console.error('Card render failed:', err);
    btn.disabled = false;
    btn.textContent = originalLabel;
    if (typeof showToast === 'function') showToast('RENDER FAILED. TRY AGAIN.');
  }
});

function slugify(str) {
  return (str || 'meme')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'meme';
}

// ─── Toast helper ───
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.style.display = 'block';
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => { toast.style.display = 'none'; }, 350);
  }, 2500);
}
