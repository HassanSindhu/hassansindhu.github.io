const featuredApps = [
  {
    key: 'plant', title: 'CM AI Plant Doctor', category: 'APPLIED AI / PLANT CARE',
    question: 'What if better plant care started with a photo?',
    description: 'Photo-based plant identification, potential disease detection, and practical care guidance, with English and Urdu support.',
    tags: ['Android', 'Image analysis', 'Plant recognition'],
    images: ['assets/apps/plant-screen-1.jpg', 'assets/apps/plant-screen-2.png'],
    package: 'com.plantdoctor'
  },
  {
    key: 'monitoring', title: 'Project Monitoring & Evaluation', category: 'GOVERNMENT / FIELD OPERATIONS',
    question: 'How do you turn field updates into a clearer picture?',
    description: 'Centralized project records, synchronized progress updates, and structured evaluation tools for Punjab Forest Department teams.',
    tags: ['Android', 'Progress tracking', 'Field workflows'],
    images: ['assets/apps/monitoring-screen-2.png', 'assets/apps/monitoring-screen-3.png'],
    package: 'com.gisforestry.pme'
  },
  {
    key: 'fire', title: 'Forest Fire Reporting', category: 'GEOSPATIAL / INCIDENT REPORTING',
    question: 'What does a complete incident record look like?',
    description: 'Geographic boundaries, field photos, timestamped response actions, and downloadable reports, brought into one mobile workflow.',
    tags: ['Android', 'GIS & KML', 'Incident reports'],
    images: ['assets/apps/fire-screen-1.jpg', 'assets/apps/fire-screen-2.jpg'],
    package: 'com.forest.firereporting', landscape: true
  },
  {
    key: 'nursery', title: 'Nursery Management', category: 'FORESTRY / CONNECTED OPERATIONS',
    question: 'How do you keep every plant movement accounted for?',
    description: 'Inventory records, plant transfers, and disposal documentation for nursery teams, supported by photographic and document evidence.',
    tags: ['Android', 'Inventory', 'Plant transfers'],
    images: ['assets/apps/nursery-screen-1.png', 'assets/apps/nursery-screen-2.png'],
    package: 'com.forest.nurserymanagement', landscape: true
  },
  {
    key: 'trees', title: 'Punjab Tree Enumeration', category: 'GIS / FIELD SURVEYS',
    question: 'How do you turn a tree survey into a reliable field record?',
    description: 'GPS-linked surveys, tree measurements, condition assessments, and supervisory verification for linear plantations across Punjab.',
    tags: ['Android', 'Tree surveys', 'GPS mapping'],
    images: ['assets/apps/trees-screen-1.png', 'assets/apps/trees-screen-2.png'],
    package: 'com.treeenum'
  },
  {
    key: 'plantation', title: 'Pakistan Plantation App (PPMS)', category: 'PLANTATION / GROWTH MONITORING',
    question: 'What happens after a tree is planted?',
    description: 'Geo-tagged planting records, photo evidence, QR access, and growth follow-ups help public and departmental users document progress.',
    tags: ['Android', 'Geo-tagging', 'Growth tracking'],
    images: ['assets/apps/plantation-screen-1.png', 'assets/apps/plantation-screen-2.png'],
    package: 'com.pakistanafforestationsystem'
  }
];

let featuredIndex = 0;
const explorerTabs = [...document.querySelectorAll('[data-explore]')];
const explorerPanel = document.querySelector('#explorer-panel');
const explorerMedia = document.querySelector('.explorer-media');

function selectFeatured(index, focusTab = false) {
  featuredIndex = (index + featuredApps.length) % featuredApps.length;
  const app = featuredApps[featuredIndex];
  const number = String(featuredIndex + 1).padStart(2, '0');
  explorerTabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === featuredIndex));
    tab.tabIndex = i === featuredIndex ? 0 : -1;
  });
  explorerPanel.setAttribute('aria-labelledby', `tab-${app.key}`);
  document.querySelector('#explorer-title').textContent = app.title;
  document.querySelector('#explorer-category').textContent = app.category;
  document.querySelector('#explorer-question').textContent = app.question;
  document.querySelector('#explorer-description').textContent = app.description;
  document.querySelector('#explorer-count').textContent = `${number} / ${String(featuredApps.length).padStart(2, '0')}`;
  document.querySelector('#explorer-media-number').textContent = number;
  document.querySelector('.explorer-store').href = `https://play.google.com/store/apps/details?id=${app.package}${['trees', 'plantation'].includes(app.key) ? '&hl=en&gl=PK' : ''}`;
  const tags = document.querySelector('#explorer-tags');
  tags.replaceChildren(...app.tags.map(text => {
    const tag = document.createElement('span');
    tag.textContent = text;
    return tag;
  }));
  explorerMedia.classList.toggle('is-landscape', Boolean(app.landscape));
  ['#explorer-shot-back', '#explorer-shot-front'].forEach((selector, i) => {
    const image = document.querySelector(selector);
    image.src = app.images[i];
    image.alt = `${app.title} — official Google Play artwork ${i + 1}`;
  });
  if (focusTab) explorerTabs[featuredIndex].focus({ preventScroll: true });
}

explorerTabs.forEach((tab, index) => tab.addEventListener('click', () => selectFeatured(index)));
document.querySelector('.explorer-tabs').addEventListener('keydown', event => {
  let next;
  if (event.key === 'ArrowRight') next = featuredIndex + 1;
  if (event.key === 'ArrowLeft') next = featuredIndex - 1;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = featuredApps.length - 1;
  if (next === undefined) return;
  event.preventDefault();
  selectFeatured(next, true);
});
document.querySelector('.explorer-prev').addEventListener('click', () => selectFeatured(featuredIndex - 1));
document.querySelector('.explorer-next').addEventListener('click', () => selectFeatured(featuredIndex + 1));
document.querySelector('.explorer-details').addEventListener('click', event => openProject(featuredApps[featuredIndex].key, event.currentTarget));

let dragStart = null;
explorerMedia.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0 || event.target.closest('button,a')) return;
  dragStart = { x: event.clientX, y: event.clientY };
  explorerMedia.setPointerCapture(event.pointerId);
});
explorerMedia.addEventListener('pointerup', event => {
  if (!dragStart) return;
  const dx = event.clientX - dragStart.x;
  const dy = event.clientY - dragStart.y;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) selectFeatured(featuredIndex + (dx < 0 ? 1 : -1));
  dragStart = null;
});
explorerMedia.addEventListener('pointercancel', () => { dragStart = null; });

const effectsButton = document.querySelector('.effects-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function setEffects(enabled) {
  enabled = enabled && !reducedMotion.matches;
  effectsButton.disabled = reducedMotion.matches;
  document.body.classList.toggle('effects-paused', !enabled);
  effectsButton.setAttribute('aria-pressed', String(enabled));
  effectsButton.setAttribute('aria-label', reducedMotion.matches ? 'Ambient effects disabled by your reduced-motion preference' : enabled ? 'Pause ambient effects' : 'Enable ambient effects');
  effectsButton.querySelector('.effects-label').textContent = enabled ? 'FX ON' : 'FX OFF';
}
setEffects(!reducedMotion.matches);
effectsButton.addEventListener('click', () => setEffects(effectsButton.getAttribute('aria-pressed') !== 'true'));
reducedMotion.addEventListener('change', event => setEffects(!event.matches));

const railLinks = [...document.querySelectorAll('.section-rail a')];
const sectionObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting);
  if (!visible.length) return;
  const current = visible[0].target.id;
  railLinks.forEach(link => {
    const active = link.hash === `#${current}`;
    link.classList.toggle('is-current', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-10% 0px -60% 0px' });
railLinks.forEach(link => sectionObserver.observe(document.querySelector(link.hash)));
