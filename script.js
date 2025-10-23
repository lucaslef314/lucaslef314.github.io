// Theme toggle (adds/removes .dark on :root)
document.addEventListener('DOMContentLoaded', () => {
	const root = document.documentElement;
	const themeToggle = document.getElementById('theme-toggle');
	const navToggle = document.getElementById('nav-toggle');
	const primaryNav = document.getElementById('primary-nav');
	const yearEl = document.getElementById('year');

	// set current year
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// restore theme from localStorage
	const stored = localStorage.getItem('theme');
	if (stored === 'dark') root.classList.add('dark');

	themeToggle?.addEventListener('click', () => {
		const isDark = root.classList.toggle('dark');
		themeToggle.setAttribute('aria-pressed', String(isDark));
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
		themeToggle.textContent = isDark ? '☀️' : '🌙';
	});

	// mobile nav
	navToggle?.addEventListener('click', () => {
		const expanded = navToggle.getAttribute('aria-expanded') === 'true';
		navToggle.setAttribute('aria-expanded', String(!expanded));
		const hidden = primaryNav.getAttribute('aria-hidden') === 'false';
		primaryNav.setAttribute('aria-hidden', String(!hidden));
	});

	// close mobile nav when a link is clicked
	primaryNav?.addEventListener('click', (e) => {
		if (e.target.matches('a')) {
			primaryNav.setAttribute('aria-hidden', 'true');
			navToggle.setAttribute('aria-expanded', 'false');
		}
	});
});


const words = ["exploring mathematics", "coding", "probability", "sharing knowledge", "baseball stats"];
const textElement = document.getElementById("changing-text");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;
let delay = 0;

let SPEED = 80; // typing speed in ms

function type() {
  const currentWord = words[wordIndex];
  
  if (!deleting) {
    textElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      deleting = true;
      delay = SPEED * 8; // pause before deleting
    } else {
      delay = SPEED;
    }
  } else {
    textElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = SPEED * 2; // pause before typing next word
    } else {
      delay = SPEED / 2;
    }
  }

  setTimeout(type, delay);
}

const counters = document.querySelectorAll('.counter');
const options = { threshold: 0.5 };

const startCounter = (entry) => {
  const counter = entry.target;
  const target = +counter.getAttribute('data-target');
  let count = 0;
  const increment = target / 100.;

  const update = () => {
    count += increment;
    if(count < target) {
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  };
  update();
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      startCounter(entry);
      observer.unobserve(entry.target);
    }
  });
}, options);

counters.forEach(counter => observer.observe(counter));


type();
