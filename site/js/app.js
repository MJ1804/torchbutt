// TorchButt — Comic site interactions

// ─── Comic Reader Modal ───
const reader = document.querySelector('#reader');
const fullComic = document.querySelector('#full-comic');
const closeBtn = document.querySelector('#close');

// Open comic in modal
document.querySelectorAll('[data-comic]').forEach(el => {
  el.addEventListener('click', () => {
    fullComic.src = el.dataset.comic;
    reader.showModal();
  });
});

// Close modal
closeBtn.addEventListener('click', () => reader.close());
reader.addEventListener('click', e => {
  if (e.target === reader) reader.close();
});

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

// ─── Meme Template Generator (Canvas) ───
const templateBtn = document.getElementById('template-download');
if (templateBtn) {
  templateBtn.addEventListener('click', function (e) {
    if (this.dataset.ready) return;
    e.preventDefault();

    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = 1600;
      c.height = 1200;
      const ctx = c.getContext('2d');

      // Paper background
      ctx.fillStyle = '#eeeade';
      ctx.fillRect(0, 0, 1600, 1200);

      // Outer border
      ctx.strokeStyle = '#191a16';
      ctx.lineWidth = 10;
      ctx.strokeRect(24, 24, 1552, 1152);

      // Inner border
      ctx.lineWidth = 4;
      ctx.strokeRect(42, 40, 1518, 1118);

      // Draw Torchbutt, scaled to 850px tall, positioned bottom-right
      const targetH = 850;
      const targetW = (img.width / img.height) * targetH;
      ctx.drawImage(img, 1520 - targetW, 280, targetW, targetH);

      // Caption text
      ctx.fillStyle = '#191a16';
      ctx.font = 'bold 25px monospace';
      ctx.fillText('TORCHBUTT / MAKE IT WEIRDER.', 75, 1120);

      // Trigger download
      this.href = c.toDataURL('image/png');
      this.dataset.ready = 'true';
      this.click();
    };
    img.src = 'assets/torchbutt.png';
  });
}

// ─── Toast helper (for future use) ───
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => { toast.style.display = 'none'; }, 350);
  }, 2500);
}
