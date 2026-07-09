  (function() {

    /* ── 1. PARTICLE CANVAS ────────────────────────────────── */
    const canvas = document.getElementById('wb-particles');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let W, H, particles = [];

      function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      function mkParticle() {
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 2.6 + 1.4,
          dx: (Math.random() - .5) * .4,
          dy: -(Math.random() * .5 + .15),
          alpha: Math.random() * .5 + .5,
          color: Math.random() > .5 ? '47,95,246' : '29,63,209'
        };
      }
      for (let i = 0; i < 90; i++) particles.push(mkParticle());

      function drawParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach((p, i) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
          ctx.shadowColor = `rgba(${p.color},.9)`;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
          p.x += p.dx; p.y += p.dy;
          p.alpha -= .0008;
          if (p.y < -10 || p.alpha <= 0) particles[i] = mkParticle();
        });

        /* draw connecting lines */
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(47,95,246,${.35 * (1 - dist/110)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
        requestAnimationFrame(drawParticles);
      }
      drawParticles();

      /* parallax on mousemove */
      document.addEventListener('mousemove', e => {
        const mx = e.clientX / window.innerWidth  - .5;
        const my = e.clientY / window.innerHeight - .5;
        particles.forEach(p => {
          p.dx = (Math.random() - .5) * .4 + mx * .3;
          p.dy = -(Math.random() * .5 + .15) - my * .2;
        });
      });
    }

    /* ── 2. ANIMATED COUNTER ───────────────────────────────── */
    function animateCounter(el) {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, 16);
    }

    const counters = document.querySelectorAll('.wb-stat-num');
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .4 });
    counters.forEach(c => counterObserver.observe(c));

    /* ── 3. TYPING EFFECT on hero h2 ──────────────────────── */
    const heroH2 = document.querySelector('.hero h2');
    if (heroH2) {
      const fullText = heroH2.textContent;
      heroH2.textContent = '';
      heroH2.style.minHeight = '1em';
      let idx = 0;
      const typeTimer = setInterval(() => {
        heroH2.textContent += fullText[idx++];
        if (idx >= fullText.length) clearInterval(typeTimer);
      }, 28);
    }

    /* ── 4. SECTION REVEAL TINT – alternating line accent ──── */
    const sectionTitles = document.querySelectorAll('.section-title h2');
    const titleObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('wb-title-visible');
          titleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .5 });
    sectionTitles.forEach(t => titleObserver.observe(t));

    /* ── 5. CARD TILT (subtle 3-D on mouse) ───────────────── */
    function addTilt(selector, max) {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('mousemove', e => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top  + r.height / 2;
          const rx = ((e.clientY - cy) / (r.height / 2)) * -max;
          const ry = ((e.clientX - cx) / (r.width  / 2)) *  max;
          el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
          el.style.transition = 'transform .05s linear';
        });
        el.addEventListener('mouseleave', () => {
          el.style.transform = '';
          el.style.transition = 'transform .4s ease';
        });
      });
    }
    addTilt('.featured .card', 6);
    addTilt('.cards .card-item', 5);
    addTilt('.wb-stat-item', 4);

    /* ── 6. FOOTER YEAR ────────────────────────────────────── */
    const fy = document.getElementById('footer-year');
    if (fy) fy.textContent = new Date().getFullYear();

    /* ── 7. SMOOTH SCROLL for nav links ───────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    /* ── 8. HERO IMAGE sparkle on hover ───────────────────── */
    const heroImg = document.querySelector('.hero .phone-1');
    if (heroImg) {
      heroImg.addEventListener('mouseenter', () => {
        heroImg.style.filter = 'drop-shadow(0 40px 60px rgba(0,200,224,.55))';
      });
      heroImg.addEventListener('mouseleave', () => {
        heroImg.style.filter = 'drop-shadow(0 30px 50px rgba(0,0,0,.45))';
      });
    }

    document.documentElement.lang = 'pt-AO';
  })();
  