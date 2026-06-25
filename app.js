const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const year = document.querySelector('[data-year]');
const leadForm = document.querySelector('[data-lead-form]');
const scrollProgress = document.querySelector('[data-scroll-progress] span');
const parallaxLayer = document.querySelector('[data-parallax]');
const particlesRoot = document.querySelector('[data-particles]');
const fitcheckItems = document.querySelectorAll('[data-fitcheck-item]');

if (year) year.textContent = new Date().getFullYear();

const onScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 16);

  if (scrollProgress) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
  }

  if (parallaxLayer && !prefersReducedMotion) {
    const offset = window.scrollY * 0.15;
    parallaxLayer.style.transform = `translateY(calc(-50% + ${offset}px))`;
  }
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

nav?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  : null;

document.querySelectorAll('.reveal').forEach((element) => {
  if (observer) observer.observe(element);
  else element.classList.add('is-visible');
});

const animateCounter = (element) => {
  const target = parseFloat(element.dataset.count || '0');
  const decimals = parseInt(element.dataset.decimals || '0', 10);
  if (Number.isNaN(target)) return;

  if (prefersReducedMotion) {
    element.textContent = target.toFixed(decimals);
    return;
  }

  const duration = 1400;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = (target * eased).toFixed(decimals);
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const counterObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 })
  : null;

document.querySelectorAll('[data-count]').forEach((element) => {
  if (counterObserver) counterObserver.observe(element);
  else animateCounter(element);
});

if (particlesRoot && !prefersReducedMotion) {
  for (let i = 0; i < 18; i += 1) {
    const particle = document.createElement('span');
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 14}s`;
    particle.style.animationDuration = `${10 + Math.random() * 10}s`;
    particlesRoot.appendChild(particle);
  }
}

if (fitcheckItems.length) {
  let activeIndex = 0;
  const cycleFitCheck = () => {
    if (prefersReducedMotion) return;
    fitcheckItems.forEach((item, index) => {
      item.classList.toggle('is-active', index === activeIndex);
    });
    activeIndex = (activeIndex + 1) % fitcheckItems.length;
  };
  cycleFitCheck();
  setInterval(cycleFitCheck, 2800);
}

document.querySelectorAll('[data-tilt]').forEach((card) => {
  if (prefersReducedMotion || window.matchMedia('(max-width: 980px)').matches) return;

  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

document.querySelectorAll('[data-magnetic]').forEach((button) => {
  if (prefersReducedMotion || window.matchMedia('(max-width: 980px)').matches) return;

  button.addEventListener('mousemove', (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
  });
});

document.querySelectorAll('[data-ripple]').forEach((element) => {
  element.addEventListener('click', (event) => {
    if (prefersReducedMotion) return;
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    element.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(leadForm);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const goal = String(data.get('goal') || '').trim();
  const time = String(data.get('time') || '').trim();

  const message = [
    'היי שי, אני רוצה לקבוע שיחת התאמה לתכלס Gym.',
    name ? `שם: ${name}` : '',
    phone ? `טלפון: ${phone}` : '',
    goal ? `מטרה: ${goal}` : '',
    time ? `נוח לחזור אליי: ${time}` : ''
  ].filter(Boolean).join('\n');

  const url = `https://wa.me/972543986795?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
});
