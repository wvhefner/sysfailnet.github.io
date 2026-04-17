const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

document.querySelectorAll('[data-nav] a').forEach(link => {
  if (link.hostname !== window.location.hostname) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#')) return;
  const linkPath = link.pathname.replace(/\/$/, '') || '/';
  if (linkPath === currentPath) {
    link.classList.add('active');
  }
});

const scrollBtn = document.getElementById('scrollTop');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  scrollBtn.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.querySelectorAll('.prose pre').forEach(pre => {
  const button = document.createElement('button');
  button.className = 'copy-btn';
  button.type = 'button';
  button.textContent = 'copy';
  pre.appendChild(button);

  button.addEventListener('click', async () => {
    const code = pre.querySelector('code');
    const text = code ? code.textContent : pre.textContent.replace('copy', '').trim();
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'copied';
    } catch {
      button.textContent = 'error';
    }

    window.setTimeout(() => {
      button.textContent = 'copy';
    }, 1500);
  });
});
