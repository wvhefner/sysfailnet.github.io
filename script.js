// ── Active nav link ──────────────────────────────────────────
document.querySelectorAll('nav a').forEach(link => {
  if (link.hostname !== location.hostname) return;
  const linkPath = link.pathname.replace(/\/$/, '') || '/';
  const curPath  = location.pathname.replace(/\/$/, '') || '/';
  if (curPath === linkPath) {
    link.classList.add('active');
  }
});

// ── Scroll-to-top button ─────────────────────────────────────
const scrollBtn = document.getElementById('scrollTop');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  scrollBtn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Copy buttons for code blocks ─────────────────────────────
document.querySelectorAll('.prose pre').forEach(pre => {
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'copy';
  pre.style.position = 'relative';
  pre.appendChild(btn);

  btn.addEventListener('click', () => {
    const code = pre.querySelector('code');
    const text = code ? code.textContent : pre.textContent.replace('copy', '').trim();
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'copied!';
      setTimeout(() => { btn.textContent = 'copy'; }, 1800);
    }).catch(() => {
      btn.textContent = 'error';
      setTimeout(() => { btn.textContent = 'copy'; }, 1800);
    });
  });
});
