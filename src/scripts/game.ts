import { points, achievements, ranks } from '../data/game';

// Score state: one-time points for things the visitor did, plus their best Bug Hunt round.
// Saved in localStorage so the score survives a reload; the page works fine without it.
const STORE = 'rcm-arcade';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE) ?? 'null');
    if (s && Array.isArray(s.earned)) {
      return { earned: s.earned as string[], bugBest: Number(s.bugBest) || 0, ach: Array.isArray(s.ach) ? (s.ach as string[]) : [] };
    }
  } catch {}
  return { earned: [], bugBest: 0, ach: [] };
}
const saved = load();
const earned = new Set(saved.earned);
const unlocked = new Set(saved.ach);
let bugBest = saved.bugBest;

function save() {
  try {
    localStorage.setItem(STORE, JSON.stringify({ earned: [...earned], bugBest, ach: [...unlocked] }));
  } catch {}
}

// Everything that can be collected on this page.
const keys = new Set<string>();
document.querySelectorAll<HTMLElement>('[data-collect]').forEach((el) => keys.add(el.dataset.collect!));
document.querySelectorAll<HTMLElement>('[data-level]').forEach((el) => keys.add(`level:${el.dataset.level}`));
document.querySelectorAll<HTMLElement>('[data-review]').forEach((el) => keys.add(el.dataset.review!));
// Forget keys from older versions of the page (the 404 page has none, so leave it alone).
if (keys.size) for (const k of earned) if (!keys.has(k)) earned.delete(k);

const valueOf = (key: string) => points[key.split(':')[0] as keyof typeof points] ?? 0;
const total = () => [...earned].reduce((t, k) => t + valueOf(k), 0) + bugBest;
export const best = () => bugBest;

const ofKind = (kind: string) => [...keys].filter((k) => k.startsWith(`${kind}:`));
const all = (kind: string) => ofKind(kind).length > 0 && ofKind(kind).every((k) => earned.has(k));
const any = (kind: string) => ofKind(kind).some((k) => earned.has(k));

const rules: Record<(typeof achievements)[number]['id'], () => boolean> = {
  start: () => earned.has('start'),
  quest: () => any('quest'),
  quests: () => all('quest'),
  bugs: () => bugBest >= 250,
  bugs2: () => bugBest >= 600,
  career: () => all('stage'),
  skills: () => all('skill'),
  explorer: () => all('level'),
  hire: () => earned.has('contact'),
};

// Floating "+150" text near whatever earned it (or the HUD score).
const scoreAnchor = document.querySelector<HTMLElement>('.hud [data-score]');
export function pop(text: string, from?: Element | null, tone?: 'bad' | 'gold') {
  // A button that just opened a dialog is hidden behind it; show the points on the dialog title instead.
  const open = document.querySelector('dialog[open]');
  const anchor = open && from && !open.contains(from) ? open.querySelector('h3') : (from ?? scoreAnchor);
  if (!anchor) return;
  const r = anchor.getBoundingClientRect();
  const el = document.createElement('span');
  el.className = `pop${tone ? ` is-${tone}` : ''}`;
  el.textContent = text;
  el.style.left = `${r.left + r.width / 2}px`;
  el.style.top = `${r.top + Math.min(r.height / 2, 24)}px`;
  el.setAttribute('aria-hidden', 'true');
  raise(el);
  setTimeout(() => el.remove(), 1100);
}

// Popovers sit in the top layer, so pops and toasts also show above an open dialog.
function raise(el: HTMLElement) {
  if (!el.isConnected) {
    el.popover = 'manual';
    document.body.append(el);
  }
  try {
    el.hidePopover();
    el.showPopover();
  } catch {}
}

const toasts = document.createElement('div');
toasts.className = 'toasts';
toasts.setAttribute('role', 'status');
raise(toasts);
function toast(title: string, text: string) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = '<span class="toast-icon" aria-hidden="true">★</span><div><p class="toast-title"></p><p class="toast-text"></p></div>';
  el.querySelector('.toast-title')!.textContent = title;
  el.querySelector('.toast-text')!.textContent = text;
  toasts.append(el);
  raise(toasts);
  setTimeout(() => el.classList.add('is-leaving'), 3600);
  setTimeout(() => el.remove(), 4000);
}

function check(announce: boolean) {
  for (const a of achievements) {
    if (unlocked.has(a.id) || !rules[a.id]()) continue;
    unlocked.add(a.id);
    if (announce) toast(`Achievement unlocked: ${a.name}`, a.desc);
  }
}

const pad = (n: number) => String(Math.max(0, n)).padStart(6, '0');
let shown = 0;
function render() {
  const target = total();
  const from = shown;
  shown = target;
  const scoreEls = document.querySelectorAll<HTMLElement>('[data-score]');
  if (reduce || from === target) {
    scoreEls.forEach((e) => (e.textContent = pad(target)));
  } else {
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 600);
      const v = Math.round(from + (target - from) * (1 - (1 - p) ** 3));
      scoreEls.forEach((e) => (e.textContent = pad(v)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const rank = ranks.filter((r) => target >= r.min).at(-1)!.name;
  document.querySelectorAll<HTMLElement>('[data-rank]').forEach((e) => (e.textContent = rank));
  document
    .querySelectorAll<HTMLElement>('[data-ach-count]')
    .forEach((e) => (e.textContent = `${unlocked.size}/${achievements.length}`));
  const pct = keys.size ? Math.round((earned.size / keys.size) * 100) : 0;
  document.querySelectorAll<HTMLElement>('[data-progress]').forEach((e) => {
    e.style.setProperty('--p', `${pct}%`);
    e.setAttribute('aria-valuenow', String(pct));
  });
  document.querySelectorAll<HTMLElement>('[data-progress-text]').forEach((e) => (e.textContent = `${pct}%`));

  document
    .querySelectorAll<HTMLElement>('[data-collect], [data-reached]')
    .forEach((el) => el.classList.toggle('is-done', earned.has(el.dataset.collect ?? el.dataset.reached!)));
  document
    .querySelectorAll<HTMLElement>('[data-ach]')
    .forEach((el) => el.classList.toggle('is-unlocked', unlocked.has(el.dataset.ach!)));
}

export function collect(key: string, from?: Element | null) {
  if (earned.has(key) || !keys.has(key)) return;
  earned.add(key);
  check(true);
  save();
  pop(`+${valueOf(key)}`, from);
  render();
}

// Returns true when the round beat the previous best.
export function submitBugScore(score: number) {
  if (score <= bugBest) return false;
  const gain = score - bugBest;
  bugBest = score;
  check(true);
  save();
  pop(`+${gain}`);
  render();
  return true;
}

document.addEventListener('click', (e) => {
  const el = (e.target as Element).closest<HTMLElement>('[data-collect]');
  if (el) collect(el.dataset.collect!, el);
});

// Reaching a level is worth points too.
const levelObserver = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      levelObserver.unobserve(e.target);
      const el = e.target as HTMLElement;
      collect(`level:${el.dataset.level}`, el.querySelector('h2'));
    }
  },
  { rootMargin: '0px 0px -45% 0px' },
);
document.querySelectorAll('[data-level]').forEach((el) => levelObserver.observe(el));

document.querySelector('[data-reset]')?.addEventListener('click', () => {
  if (!confirm('Reset your score and achievements?')) return;
  try {
    localStorage.removeItem(STORE);
  } catch {}
  location.hash = '';
  location.reload();
});

check(false);
render();
