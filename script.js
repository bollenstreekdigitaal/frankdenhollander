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

// === Form submit via Formbridge ===
const FORMBRIDGE_URL = 'https://forms.bollenstreekdigitaal.nl/api/v1/s/f_4377553d0237';
const formLoadTime = Date.now();

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

  const btn = form.querySelector('.form-submit');
  const origText = btn.textContent;
  btn.textContent = 'Verzenden...';
  btn.disabled = true;

  const data = {
    naam,
    email,
    telefoon: form.telefoon.value || '',
    dienst: form.dienst.value || '',
    bericht,
    _ts: formLoadTime,
    _gotcha: ''
  };

  fetch(FORMBRIDGE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok) throw new Error('Submission failed');
      form.reset();
      btn.textContent = 'Verstuurd!';
      btn.style.background = 'var(--forest)';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = origText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
      }, 4000);
    })
    .catch(() => {
      alert('Er is iets fout gegaan. Probeer het later opnieuw.');
      btn.textContent = origText;
      btn.disabled = false;
    });
}

// === Scroll-triggered nav shadow ===
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.style.boxShadow = window.scrollY > 20
    ? '0 2px 20px rgba(0,0,0,0.25)'
    : '0 1px 0 rgba(255,255,255,0.07)';
}, { passive: true });
