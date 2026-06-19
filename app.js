const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const year = document.querySelector('[data-year]');
const leadForm = document.querySelector('[data-lead-form]');

if (year) year.textContent = new Date().getFullYear();

const onScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 16);
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
    }, { threshold: 0.14 })
  : null;

document.querySelectorAll('.reveal').forEach((element) => {
  if (observer) observer.observe(element);
  else element.classList.add('is-visible');
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
