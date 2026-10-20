import './game';

const root = document.documentElement;

// Theme toggle: cycles light/dark, remembers the choice.
function currentTheme(): 'light' | 'dark' {
  const set = root.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {}
});

// Highlight the level link for the section in view.
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav]')];
const sections = navLinks
  .map((a) => document.querySelector<HTMLElement>(a.getAttribute('href')!))
  .filter((s): s is HTMLElement => !!s);
const navObserver = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`));
    }
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
sections.forEach((s) => navObserver.observe(s));

// Reveal on scroll.
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        revealObserver.unobserve(e.target);
      }
    }
  },
  { rootMargin: '0px 0px -8% 0px' },
);
document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

// Dialogs (projects, achievements).
document.querySelectorAll<HTMLButtonElement>('[data-open]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const dialog = document.getElementById(btn.dataset.open!) as HTMLDialogElement | null;
    if (!dialog) return;
    dialog.showModal();
    dialog.querySelector<HTMLElement>('[data-track]')?.scrollTo({ left: 0 });
  });
});
document.querySelectorAll<HTMLDialogElement>('dialog.modal').forEach((dialog) => {
  // Click on the backdrop closes the dialog.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    // Return focus to the button that opened it.
    document.querySelector<HTMLElement>(`[data-open="${dialog.id}"]`)?.focus();
  });
});

// Galleries: scroll-snap track with prev/next buttons and a counter.
document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((gallery) => {
  const track = gallery.querySelector<HTMLElement>('[data-track]')!;
  const prev = gallery.querySelector<HTMLButtonElement>('[data-prev]');
  const next = gallery.querySelector<HTMLButtonElement>('[data-next]');
  const counter = gallery.querySelector<HTMLElement>('[data-counter]');
  const total = track.children.length;
  if (total < 2) return;

  const index = () => Math.round(track.scrollLeft / track.clientWidth);
  const go = (i: number) => track.scrollTo({ left: Math.max(0, Math.min(total - 1, i)) * track.clientWidth, behavior: 'smooth' });
  const update = () => {
    const i = index();
    if (counter) counter.textContent = `${i + 1} / ${total}`;
    if (prev) prev.disabled = i === 0;
    if (next) next.disabled = i === total - 1;
  };
  prev?.addEventListener('click', () => go(index() - 1));
  next?.addEventListener('click', () => go(index() + 1));
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  gallery.closest('dialog')?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') go(index() + 1);
    if (e.key === 'ArrowLeft') go(index() - 1);
  });
  update();
});

// Copy email.
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy!);
      btn.classList.add('is-copied');
      setTimeout(() => btn.classList.remove('is-copied'), 2000);
    } catch {
      location.href = `mailto:${btn.dataset.copy}`;
    }
  });
});
