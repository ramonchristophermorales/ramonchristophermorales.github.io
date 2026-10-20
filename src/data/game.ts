// Scoring rules for the arcade version of the portfolio.
// Keys look like "quest:pim" — the part before the colon picks the points.
export const points = {
  start: 100,
  level: 50,
  quest: 150,
  stage: 50,
  skill: 10,
  review: 25,
  contact: 500,
} as const;

export const achievements = [
  { id: 'start', name: 'Player 1 ready', desc: 'Press start' },
  { id: 'quest', name: 'First quest', desc: 'Open a project' },
  { id: 'quests', name: 'Quest log complete', desc: 'Open every project' },
  { id: 'bugs', name: 'Bug squasher', desc: 'Score 250+ in Bug Hunt' },
  { id: 'bugs2', name: 'Zero bugs in prod', desc: 'Score 600+ in Bug Hunt' },
  { id: 'career', name: 'Career mode', desc: 'Inspect every career stage' },
  { id: 'skills', name: 'Skill tree maxed', desc: 'Unlock every skill' },
  { id: 'explorer', name: 'Explorer', desc: 'Reach every level' },
  { id: 'hire', name: 'Final boss', desc: 'Get in touch' },
] as const;

// Lowest score for each rank, in ascending order.
export const ranks = [
  { min: 0, name: 'Intern' },
  { min: 400, name: 'Junior' },
  { min: 1200, name: 'Mid-level' },
  { min: 2000, name: 'Senior' },
  { min: 2800, name: 'Lead' },
  { min: 3600, name: 'Legend' },
] as const;

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
