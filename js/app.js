(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const hearts = ['♥︎', '♥︎', '♡︎', '♥︎'];
      const colors = ['#a8d5a2', '#71b78a', '#c4dda0', '#f0d98f'];
      let lastClick = 0;

      function launchHeart() {
        if (reducedMotion.matches || document.hidden) return;
        const heart = document.createElement('span');
        heart.className = 'flying-heart';
        heart.setAttribute('aria-hidden', 'true');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.setProperty('--x', `${Math.random() * 96 + 2}vw`);
        heart.style.setProperty('--size', `${Math.random() * 15 + 16}px`);
        heart.style.setProperty('--duration', `${Math.random() * 3 + 6}s`);
        heart.style.setProperty('--drift', `${Math.random() * 120 - 60}px`);
        heart.style.setProperty('--spin', `${Math.random() * 50 - 25}deg`);
        heart.style.setProperty('--heart-color', colors[Math.floor(Math.random() * colors.length)]);
        document.body.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove(), { once: true });
      }

      function showLovePop(x, y) {
        const now = Date.now();
        if (now - lastClick < 450) return;
        lastClick = now;

        const pop = document.createElement('div');
        pop.className = 'love-pop';
        pop.setAttribute('aria-hidden', 'true');
        pop.textContent = 'Ти в мене найкраща!!! 💛';
        pop.style.setProperty('--pop-x', `${x}px`);
        pop.style.setProperty('--pop-y', `${y}px`);
        document.body.appendChild(pop);
        pop.addEventListener('animationend', () => pop.remove(), { once: true });

        if (!reducedMotion.matches) {
          for (let i = 0; i < 4; i++) window.setTimeout(launchHeart, i * 90);
        }
      }

      function showBoar() {
        document.querySelector('.boar-reveal')?.remove();
        const reveal = document.createElement('div');
        reveal.className = 'boar-reveal';
        if (reducedMotion.matches) reveal.classList.add('still');
        reveal.setAttribute('aria-hidden', 'true');
        reveal.innerHTML = `
          <div class="boar-runner">
            <div class="boar-speech">Ха-ха, ти кабанчик!</div>
            <span class="dust-puff" style="--puff-size:26px;--puff-delay:-.15s"></span>
            <span class="dust-puff" style="--puff-size:34px;--puff-delay:-.5s;bottom:24px;left:-8px"></span>
            <span class="dust-puff" style="--puff-size:20px;--puff-delay:-.72s;bottom:7px;left:18px"></span>
            <img class="boar-character" src="assets/boar.png" alt="Кабанчик біжить">
          </div>`;
        document.body.appendChild(reveal);
        reveal.addEventListener('animationend', (event) => {
          if (event.animationName === 'boar-dash') reveal.remove();
        });
        if (!reducedMotion.matches) {
          for (let i = 0; i < 3; i++) window.setTimeout(launchHeart, i * 100);
        } else {
          window.setTimeout(() => reveal.remove(), 2400);
        }
      }

      document.addEventListener('click', (event) => {
        if (event.target instanceof Element && event.target.closest('#egg-trigger')) {
          showBoar();
          return;
        }
        showLovePop(event.clientX, event.clientY);
      });
      document.addEventListener('keydown', (event) => {
        if (event.target instanceof Element && event.target.closest('#egg-trigger')) return;
        if (event.key === 'Enter' || event.key === ' ') {
          showLovePop(window.innerWidth / 2, window.innerHeight / 2);
        }
      });

      if (!reducedMotion.matches) {
        window.setInterval(launchHeart, 850);
        window.setTimeout(launchHeart, 300);
      }
    })();
