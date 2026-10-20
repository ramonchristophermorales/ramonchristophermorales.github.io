import type { ImageMetadata } from 'astro';

import pim1 from '../assets/projects/pim-one.png';
import pim2 from '../assets/projects/pim-two.png';
import pim3 from '../assets/projects/pim-three.png';
import pim4 from '../assets/projects/pim-four.png';
import kt1 from '../assets/projects/kt-one.png';
import kt2 from '../assets/projects/kt-two.png';
import kt3 from '../assets/projects/kt-three.png';
import kt4 from '../assets/projects/kt-four.png';
import kt5 from '../assets/projects/kt-five.png';
import bk1 from '../assets/projects/bk-one.png';
import nes1 from '../assets/projects/nes-one.png';
import nes2 from '../assets/projects/nes-two.png';
import nes3 from '../assets/projects/nes-three.png';
import ups1 from '../assets/projects/ups-one.png';
import rc1 from '../assets/projects/rc-one.png';
import ws1 from '../assets/projects/ws-one.png';
import eb1 from '../assets/projects/eb-one.png';
import io1 from '../assets/projects/io-one.png';

export const profile = {
  name: 'Ramon Christopher Morales',
  shortName: 'Ramon',
  role: 'Full-Stack Web Developer',
  location: 'Angeles City, Philippines',
  availability: 'Open to freelance & remote roles',
  headline: 'I build reliable web platforms that teams and customers depend on.',
  intro:
    'Full-stack developer with 10+ years shipping Laravel, Vue and TypeScript products for clients across the Netherlands, Australia and Asia — from greenfield builds to high-traffic platforms that need to stay up.',
  about: [
    "I've worked on everything from small business tools to large-scale web platforms, and served as Scrum Master, Development Team Lead, Lead Developer and Senior Programmer along the way.",
    'I care about the whole lifecycle: understanding the problem, designing a solution that will scale, shipping it, and keeping it healthy long after launch. Clients keep working with me for years because I take ownership and deliver when deadlines are tight.',
  ],
  email: 'ramon@moralesprojects.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/ramonchristophermorales/',
    github: 'https://github.com/ramonchristophermorales',
  },
  stats: [
    { value: '10+', label: 'Years shipping production software' },
    { value: '9', label: 'Featured client products' },
    { value: '3', label: 'Continents of clients' },
  ],
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  date: string;
  summary: string;
  role: string;
  technologies: string[];
  images: ImageMetadata[];
  url?: string;
  status?: string;
};

export const projects: Project[] = [
  {
    slug: 'pim',
    name: 'R-Go Tools PIM',
    category: 'Web App',
    date: 'Oct 2024 — Present',
    url: 'https://pim.r-go-tools.nl/',
    technologies: ['Laravel', 'Vue.js', 'SOAP API', 'XML / Excel exports'],
    images: [pim1, pim2, pim4, pim3],
    summary:
      'A Product Information Management portal for R-Go Tools that gives partners self-service access to high-resolution product imagery, certificates, brochures and complete product specifications in XML and Excel formats.',
    role:
      'Led development from scratch as the full-stack developer — backend, frontend and integrations — so partners can find and download product data and assets on their own.',
  },
  {
    slug: 'keystest',
    name: 'KeysTest',
    category: 'Web App',
    date: 'Mar 2022 — Present',
    url: 'https://www.keystest.nl/',
    technologies: ['Laravel', 'WordPress', 'Vue.js', 'WebSockets', 'REST API', 'PDF generation'],
    images: [kt1, kt2, kt3, kt4, kt5],
    summary:
      'An interactive personality and development platform by the Keys Foundation (NL). Users discover their strengths, values, talents, focus and perspective through a three-step track — Discover, Activate, Multiply — with optional certified coaches.',
    role:
      'Full-stack developer building and maintaining the assessment engine, coach interactions and personalised growth journeys across the whole platform.',
  },
  {
    slug: 'nespresso',
    name: 'Nespresso Philippines',
    category: 'E-commerce',
    date: 'Aug 2017 — May 2022',
    url: 'https://www.nespresso.ph/',
    technologies: ['WordPress', 'WooCommerce', 'REST API', 'Warehouse (WMS) API'],
    images: [nes1, nes2, nes3],
    summary:
      'The online store for Nespresso in the Philippines — a premium shopping experience for machines, capsules and accessories on web and mobile, with next-day delivery in Metro Manila.',
    role:
      'Pioneered the platform by customising WordPress and WooCommerce and integrating warehouse APIs for real-time inventory and delivery.',
  },
  {
    slug: 'brookz',
    name: 'Brookz Kennisbank',
    category: 'Web App',
    date: 'Sep 2020 — Mar 2023',
    url: 'https://www.brookz.nl/kennisbank',
    technologies: ['Python', 'BEM', 'CSS', 'JavaScript'],
    images: [bk1],
    summary:
      'The knowledge centre of the Brookz platform: a rich content library supporting entrepreneurs, investors and advisors through buying, selling, valuing and financing businesses in the Dutch SME market.',
    role:
      'Frontend-focused developer owning the user interface and its integration with backend services.',
  },
  {
    slug: 'ups',
    name: 'UPS Workflow System',
    category: 'Web App',
    date: 'Sep 2019 — Mar 2020',
    url: 'https://ops.upsystems.com.au/',
    technologies: ['Laravel', 'Vue.js', 'REST API'],
    images: [ups1],
    summary:
      'A secure cloud portal for Universal Property Systems that coordinates offshore virtual assistants and Australian real-estate clients — task management, performance monitoring and workflow automation.',
    role:
      'Laravel developer building and maintaining task coordination, workflow automation and performance tracking.',
  },
  {
    slug: 'reward-centre',
    name: 'Reward Centre',
    category: 'Web App',
    date: 'Jan 2016 — Sep 2019',
    status: 'Acquired by Blackhawk Network',
    technologies: ['PHP', 'JavaScript', 'Jaspersoft', 'REST API'],
    images: [rc1],
    summary:
      "Solterbeck's incentive management software powering points-based and tiered programs: sales incentives, employee recognition, channel incentives, call-centre R&R, lead generation and peer nomination.",
    role:
      'Started as developer, promoted to Team Lead and Scrum Master — leading development of the reward programs through to the acquisition.',
  },
  {
    slug: 'wisebread',
    name: 'Wise Bread',
    category: 'Website',
    date: 'Jul 2016 — May 2017',
    url: 'https://www.wisebread.com/',
    technologies: ['PHP', 'JavaScript', 'REST API', 'CSS'],
    images: [ws1],
    summary:
      'A personal-finance community with more than a million monthly views that needed continuous monitoring and improvement for its editors and readers.',
    role:
      'PHP developer delivering custom modules, performance optimisations and ongoing fixes on a high-traffic site.',
  },
  {
    slug: 'earlybird',
    name: 'Earlybird',
    category: 'Web App',
    date: 'Oct 2015 — Jan 2016',
    url: 'https://www.earlybird.dk/',
    technologies: ['Laravel', 'Drupal', 'JavaScript', 'Responsive design'],
    images: [eb1],
    summary:
      'Makes fine dining in Denmark 33% more affordable. The existing application was rebuilt to be faster, simpler and mobile-friendly, with new features that made operations more efficient.',
    role: 'Full-stack developer on the revamp and the new operational features.',
  },
  {
    slug: 'insightout',
    name: 'InsightOut',
    category: 'MVP',
    date: 'Jun 2015 — Nov 2015',
    technologies: ['Laravel', 'CouchDB', 'IoT', 'NoSQL'],
    images: [io1],
    summary:
      'An analytics platform that improves indoor spaces — schools, government buildings, offices — by analysing internal climate and energy consumption.',
    role: 'Full-stack developer on the MVP used to validate the product with early users.',
  },
];

export const experience = [
  {
    company: 'Freelance',
    position: 'Full-Stack Developer',
    place: 'Angeles City, Philippines',
    date: 'Mar 2022 — Present',
    description:
      'Designing, building and maintaining web applications for clients in the Netherlands and beyond — including KeysTest and the R-Go Tools PIM.',
    skills: ['Laravel', 'Vue.js', 'TypeScript', 'WordPress'],
  },
  {
    company: 'CodingChiefs (CCTalents)',
    position: 'Lead Developer',
    place: 'Clark, Philippines',
    date: 'Sep 2020 — Mar 2022',
    description:
      'Led development and maintenance of client applications, setting standards for tooling and code quality.',
    skills: ['Laravel', 'Vue.js', 'TypeScript', 'WordPress'],
  },
  {
    company: 'Cloudstaff',
    position: 'Senior Software Engineer & Scrum Master',
    place: 'Angeles City, Philippines',
    date: 'Jan 2016 — Sep 2020',
    description:
      'Worked on stakeholder access for iWon Data Systems and on a reward management platform later acquired by Blackhawk Network, growing from senior developer into Scrum Master.',
    skills: ['Scrum', 'Laravel', 'Vue.js', 'PHP', 'JavaScript'],
  },
  {
    company: 'Koodi Systems',
    position: 'Senior Web Developer',
    place: 'City of San Fernando, Philippines',
    date: 'Nov 2014 — Sep 2015',
    description: 'Team lead and developer across multiple client projects.',
    skills: ['Laravel', 'Node.js', 'WordPress'],
  },
];

export const skills = [
  { title: 'Languages', items: ['PHP', 'TypeScript', 'JavaScript', 'SQL', 'HTML', 'CSS'] },
  { title: 'Frameworks & Platforms', items: ['Laravel', 'Vue.js', 'Node.js', 'WordPress', 'WooCommerce', 'Electron', 'CodeIgniter'] },
  { title: 'Data', items: ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB', 'Redis', 'CouchDB'] },
  { title: 'Ways of working', items: ['Agile / Scrum', 'Git', 'Jira', 'ClickUp', 'DigitalOcean', 'Ubuntu'] },
];

export const certifications = [
  'Certified Scrum Product Owner®',
  'Certified ScrumMaster®',
  'Leadership Training',
  'Professional Civil Service',
];

export const education = [
  {
    school: 'Tarlac State University',
    degree: 'Master of Information Technology',
    date: '2013 — 2016',
    note: 'Coursework completed',
  },
  {
    school: 'Tarlac State University',
    degree: 'Bachelor of Science in Information Systems',
    date: '2006 — 2012',
  },
];

export const testimonials = [
  {
    quote:
      'Ramon is a true full-stack developer — capable, reliable, and always thinking one step ahead. No matter how complex or urgent the challenge, Ramon shows up — present, focused, and determined to see it through. Ramon is someone you want on your team when quality, flexibility, and trust matter.',
    author: 'John Roeland',
    position: 'Founder, Bij het VUUR coaching',
    location: 'Amsterdam, Netherlands',
  },
  {
    quote:
      'With Ramon’s technical skill and teamwork we’ve added structure and reliability to our new-feature development, reduced reopens and even had months without any bugs.',
    author: 'Dan Libbesson',
    position: 'International Lead, Corporate Technology — Blackhawk Network APAC',
    location: 'Melbourne, Australia',
  },
  {
    quote:
      'He is someone very reliable especially when it comes to complex projects involving tight deadlines, he always delivers. He thinks along on cost-effective solutions for client requests.',
    author: 'Ingrid Leenders',
    position: 'Perm Consultant, Gi Group',
    location: 'Amsterdam, Netherlands',
  },
  {
    quote:
      'He always met required deadlines and proved to have a strong work ethic. He enthusiastically tackled every task using his solid problem solving and skilled technical proficiencies.',
    author: 'Sarah Sandas',
    position: 'Head of Customer Relations, Universal Property Systems',
    location: 'Sylvania, Australia',
  },
  {
    quote:
      '[Ramon] always did his best to deliver products to clients ASAP with no issue. He always thought out of the box which was a great bonus for us.',
    author: 'Orod Semsarzadeh',
    position: 'Head of Technology, Solterbeck',
    location: 'Melbourne, Australia',
  },
];
