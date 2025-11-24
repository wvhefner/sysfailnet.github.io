// Matrix Rain Effect
const canvas = document.getElementById('matrix-rain');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix characters - mixture of katakana, numbers, and symbols
const matrixChars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+-=[]{}|;:,.<>?';
const chars = matrixChars.split('');

const fontSize = 16;
const columns = canvas.width / fontSize;

// Array to store y-position of each drop
const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * -100;
}

// Draw the Matrix rain
function drawMatrix() {
  // Semi-transparent black background for trail effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff00';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    // Random character
    const text = chars[Math.floor(Math.random() * chars.length)];

    // Draw the character
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reset drop to top randomly after it crosses screen
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    // Increment y-coordinate
    drops[i]++;
  }
}

// Animation loop
setInterval(drawMatrix, 50);

// Resize canvas when window is resized
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Recalculate columns
  const newColumns = canvas.width / fontSize;
  drops.length = 0;
  for (let i = 0; i < newColumns; i++) {
    drops[i] = Math.random() * -100;
  }
});

// Add click effect to terminal buttons
document.querySelector('.btn-close').addEventListener('click', () => {
  if (confirm('Are you sure you want to exit the Matrix?')) {
    document.body.innerHTML = '<div style="color: #00ff00; font-family: monospace; text-align: center; padding-top: 50vh; font-size: 2rem;">Connection terminated...</div>';
  }
});

document.querySelector('.btn-minimize').addEventListener('click', () => {
  document.querySelector('.terminal').style.transform = 'scale(0.5)';
  setTimeout(() => {
    document.querySelector('.terminal').style.transform = 'scale(1)';
  }, 1000);
});

document.querySelector('.btn-maximize').addEventListener('click', () => {
  document.querySelector('.terminal').style.transform = 'scale(1.1)';
  setTimeout(() => {
    document.querySelector('.terminal').style.transform = 'scale(1)';
  }, 1000);
});

// Add smooth transition for terminal
document.querySelector('.terminal').style.transition = 'transform 0.5s ease';

// Easter egg: Konami code detector
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);

  if (konamiCode.join(',') === konamiSequence.join(',')) {
    triggerEasterEgg();
  }
});

function triggerEasterEgg() {
  // Change colors to rainbow
  const terminal = document.querySelector('.terminal');
  terminal.style.animation = 'rainbow 2s infinite';

  // Add rainbow animation
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes rainbow {
      0% { border-color: #ff0000; box-shadow: 0 0 50px #ff0000; }
      16% { border-color: #ff7f00; box-shadow: 0 0 50px #ff7f00; }
      33% { border-color: #ffff00; box-shadow: 0 0 50px #ffff00; }
      50% { border-color: #00ff00; box-shadow: 0 0 50px #00ff00; }
      66% { border-color: #0000ff; box-shadow: 0 0 50px #0000ff; }
      83% { border-color: #4b0082; box-shadow: 0 0 50px #4b0082; }
      100% { border-color: #9400d3; box-shadow: 0 0 50px #9400d3; }
    }
  `;
  document.head.appendChild(style);

  alert('🎮 KONAMI CODE ACTIVATED! 🎮\nYou found the secret!');
}

// Random glitch effect on page load
function randomGlitch() {
  const glitchText = document.querySelector('.glitch-text');
  const originalText = glitchText.textContent;

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  let glitched = '';

  for (let i = 0; i < originalText.length; i++) {
    if (Math.random() > 0.7) {
      glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
    } else {
      glitched += originalText[i];
    }
  }

  glitchText.textContent = glitched;

  setTimeout(() => {
    glitchText.textContent = originalText;
  }, 100);
}

// Trigger random glitch every 5-10 seconds
setInterval(() => {
  if (Math.random() > 0.5) {
    randomGlitch();
  }
}, Math.random() * 5000 + 5000);
