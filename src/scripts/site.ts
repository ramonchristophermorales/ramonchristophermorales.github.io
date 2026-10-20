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

// Header background once the page scrolls.
const header = document.querySelector<HTMLElement>('[data-header]');
const onScroll = () => header?.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Highlight the nav link for the section in view.
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

// Close the mobile menu after choosing a link.
document.querySelectorAll('[data-close-menu]').forEach((a) =>
  a.addEventListener('click', () => document.getElementById('mobile-nav')?.hidePopover?.()),
);

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

// Project dialogs.
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
    // Return focus to the card that opened it.
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

// Hero code editor: types the highlighted code out, then leaves a blinking caret.
// The full code is in the HTML, so it still shows without JS or with reduced motion.
const typewriter = document.querySelector<HTMLElement>('[data-typewriter]');
if (typewriter) {
  const caret = document.createElement('span');
  caret.className = 'caret';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) {
    typewriter.querySelector('code')?.append(caret);
  } else {
    // Lock the size so the card doesn't grow while typing.
    typewriter.style.height = `${typewriter.offsetHeight}px`;

    const walker = document.createTreeWalker(typewriter, NodeFilter.SHOW_TEXT);
    const nodes: { node: Text; text: string; instant: boolean }[] = [];
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      nodes.push({ node, text: node.data, instant: !!node.parentElement?.closest('.ln') });
      node.data = '';
    }

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const type = async () => {
      caret.classList.add('is-typing');
      for (const { node, text, instant } of nodes) {
        node.after(caret);
        if (instant) {
          node.data = text;
          continue;
        }
        for (const ch of text) {
          node.data += ch;
          // Linger on line ends and punctuation so it feels like someone typing.
          await sleep(ch === '\n' ? 180 : /[,{}()[\];]/.test(ch) ? 60 : 18 + Math.random() * 30);
        }
      }
      caret.classList.remove('is-typing');
    };

    // Start once the hero is on screen (it usually is on load).
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        setTimeout(type, 700);
      }
    });
    io.observe(typewriter);
  }
}

// Copy email.
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy!);
      btn.classList.add('is-done');
      setTimeout(() => btn.classList.remove('is-done'), 2000);
    } catch {
      location.href = `mailto:${btn.dataset.copy}`;
    }
  });
});
