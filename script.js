/* Frank den Hollander Schilderwerken — script.js */

// === Footer year ===
document.getElementById('year').textContent = new Date().getFullYear();

// === Mobile nav ===
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav')) {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// === Form submit (fallback — use a real backend or Formspree in production) ===
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const naam = form.naam.value.trim();
  const email = form.email.value.trim();
  const bericht = form.bericht.value.trim();

  if (!naam || !email || !bericht) {
    alert('Vul a.u.b. uw naam, e-mail en een beschrijving in.');
    return;
  }

  // In production: replace with Formspree, Netlify Forms, or a server endpoint.
  // For now, open the mailto fallback.
  const dienst = form.dienst.value || 'niet opgegeven';
  const telefoon = form.telefoon.value || 'niet opgegeven';
  const body = encodeURIComponent(
    `Naam: ${naam}\nTelefoon: ${telefoon}\nDienst: ${dienst}\n\n${bericht}`
  );
  const subject = encodeURIComponent(`Offerte aanvraag van ${naam}`);
  window.location.href = `mailto:info@frankdenhollander.com?subject=${subject}&body=${body}`;
}

// === Scroll-triggered nav shadow ===
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.style.boxShadow = window.scrollY > 20
    ? '0 2px 20px rgba(0,0,0,0.25)'
    : '0 1px 0 rgba(255,255,255,0.07)';
}, { passive: true });
