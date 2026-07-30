/* nav.js — shared across all pages */
(function () {
  /* hamburger toggle */
  const btn = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (btn && links) {
    btn.addEventListener('click', () => links.classList.toggle('open'));
  }

  /* active nav link */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links > li > a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* fade-up on scroll */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  /* carousel */
  document.querySelectorAll('.carousel-wrap').forEach(wrap => {
    const track = wrap.querySelector('.carousel-track');
    const slides = wrap.querySelectorAll('.carousel-slide');
    const dotsWrap = wrap.closest('.carousel-root')?.querySelector('.carousel-dots');
    let cur = 0;
    const total = slides.length;

    function go(n) {
      cur = (n + total) % total;
      track.style.transform = `translateX(-${cur * 100}%)`;
      if (dotsWrap) {
        dotsWrap.querySelectorAll('span').forEach((d, i) => d.classList.toggle('active', i === cur));
      }
    }

    wrap.querySelector('.prev')?.addEventListener('click', () => go(cur - 1));
    wrap.querySelector('.next')?.addEventListener('click', () => go(cur + 1));

    if (dotsWrap) {
      slides.forEach((_, i) => {
        const d = document.createElement('span');
        if (i === 0) d.classList.add('active');
        d.addEventListener('click', () => go(i));
        dotsWrap.appendChild(d);
      });
    }
  });
})();
