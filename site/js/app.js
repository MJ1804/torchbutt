// TorchButt — interactions

const shareBtn = document.getElementById('share-btn');
const btnText = shareBtn?.querySelector('.btn-text');
const btnSuccess = shareBtn?.querySelector('.btn-success');
const toast = document.getElementById('toast');

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

async function shareImage() {
  const imgUrl = window.location.origin + '/assets/torchbutt.png';
  const shareData = {
    title: 'TorchButt',
    text: 'TorchButt — The Meme That Lights Your Behind. 🔥',
    url: imgUrl,
  };

  // Try native share (mobile)
  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      if (err.name === 'AbortError') return; // user cancelled, fine
    }
  }

  // Fallback: copy image URL to clipboard
  try {
    await navigator.clipboard.writeText(imgUrl);
    btnText.style.display = 'none';
    btnSuccess.style.display = 'inline';
    showToast('LINK COPIED!');
    setTimeout(() => {
      btnText.style.display = 'inline';
      btnSuccess.style.display = 'none';
    }, 2000);
  } catch (err) {
    // Last resort: prompt
    prompt('Copy this link:', imgUrl);
  }
}

shareBtn?.addEventListener('click', shareImage);
