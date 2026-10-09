const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navLinks.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  navLinks.classList.toggle('is-open', expanded);
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.nav')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);

const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project-card');
const publishedAppCount = document.querySelectorAll('.published-card').length + document.querySelectorAll('.app-directory-card').length;
document.querySelectorAll('[data-published-count]').forEach(element => { element.textContent = publishedAppCount; });
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  let visibleCount = 0;
  projects.forEach(project => {
    const visible = button.dataset.filter === 'all' || project.dataset.category.split(' ').includes(button.dataset.filter);
    project.hidden = !visible;
    if (visible) visibleCount++;
  });
  document.querySelector('.work-count').textContent = `${visibleCount} selected project${visibleCount === 1 ? '' : 's'}`;
  document.querySelector('.app-directory').hidden = button.dataset.filter === 'ai';
}));

// Published app features are grounded in their Google Play listings.
// Client experience and the vision project come from the supplied portfolio.
const projectDetails = {
  trees: {
    category: 'PUBLISHED APP · GIS & TREE SURVEYS',
    title: 'Punjab Tree Enumeration',
    intro: 'A mobile survey tool for the Punjab Forest Department, published on Google Play for documenting linear plantations.',
    context: 'Forestry teams need consistent records for trees along roads, canals, and railway corridors, with location evidence and officer review.',
    contributions: ['Record tree measurements, condition assessments, and GPS locations in the field.', 'Manage enumeration, afforestation, and pole-crop survey records alongside disposal documentation.', 'Support hierarchical verification and dashboards filtered by division, block, and year.'],
    tools: ['Android', 'GPS mapping', 'Field surveys', 'Verification workflows'],
    store: 'https://play.google.com/store/apps/details?id=com.treeenum&hl=en&gl=PK',
    screenshots: ['assets/apps/trees-screen-1.png', 'assets/apps/trees-screen-2.png', 'assets/apps/trees-screen-3.png']
  },
  plantation: {
    category: 'PUBLISHED APP · PLANTATION & GROWTH',
    title: 'Pakistan Plantation App (PPMS)',
    intro: 'A published plantation and growth monitoring application for public users and government departments.',
    context: 'Connecting planting activity with location evidence and later growth observations creates a clearer record of plantation progress.',
    contributions: ['Record plantation sites, species, counts, GPS coordinates, and photo evidence.', 'Access plantation records through QR codes and review previous activities.', 'Submit growth follow-ups with survival rates, plant height, notes, and photos.'],
    tools: ['Android', 'Geo-tagging', 'QR workflows', 'Growth monitoring'],
    store: 'https://play.google.com/store/apps/details?id=com.pakistanafforestationsystem&hl=en&gl=PK',
    screenshots: ['assets/apps/plantation-screen-1.png', 'assets/apps/plantation-screen-2.png', 'assets/apps/plantation-screen-3.png']
  },
  plant: {
    category: 'PUBLISHED APP · APPLIED AI',
    title: 'CM AI Plant Doctor',
    intro: 'A published Android plant-care application from the Forest GIS Lab, Punjab Forest & Wildlife Department, and part of my recent mobile development work.',
    context: 'Helping gardeners and field professionals understand plants through photos, with accessible care guidance in English and Urdu.',
    contributions: ['Photo-based plant identification and analysis of potential diseases or nutrient deficiencies.', 'Plant-specific care guidance covering watering, light, soil, and seasonal needs.', 'A saved plant collection and bilingual access for users in Pakistan.'],
    tools: ['Android', 'Plant recognition', 'Image analysis', 'Bilingual experience'],
    store: 'https://play.google.com/store/apps/details?id=com.plantdoctor',
    screenshots: ['assets/apps/plant-screen-1.jpg', 'assets/apps/plant-screen-2.png', 'assets/apps/plant-screen-3.png']
  },
  monitoring: {
    category: 'PUBLISHED APP · PROJECT OVERSIGHT',
    title: 'Project Monitoring & Evaluation',
    intro: 'An Android application for Punjab Forest Department project oversight, published by the Forestry and Wildlife Department Punjab.',
    context: 'Connecting field progress with centralized project information so teams can follow ongoing work and evaluate outcomes.',
    contributions: ['Structured workflows and dashboards for ongoing and upcoming projects.', 'Synchronized field updates and progress tracking.', 'Evaluation indicators and reporting with role-based access for authorized staff.'],
    tools: ['Android', 'Field workflows', 'Progress tracking', 'Project evaluation'],
    store: 'https://play.google.com/store/apps/details?id=com.gisforestry.pme',
    screenshots: ['assets/apps/monitoring-screen-1.png', 'assets/apps/monitoring-screen-2.png', 'assets/apps/monitoring-screen-3.png']
  },
  fire: {
    category: 'PUBLISHED APP · GEOSPATIAL REPORTING',
    title: 'Forest Fire Reporting App',
    intro: 'A mobile reporting tool for authorized forest officers, published by the Forestry and Wildlife Department Punjab.',
    context: 'Bringing incident details, locations, photographic evidence, and response actions into one field workflow.',
    contributions: ['Capture fire details, coordinates, KML boundaries, and map snapshots.', 'Record photographs and timestamped response actions.', 'Export consolidated PDF incident reports for documentation and review.'],
    tools: ['Android', 'GIS & KML', 'Media capture', 'PDF reports'],
    store: 'https://play.google.com/store/apps/details?id=com.forest.firereporting',
    screenshots: ['assets/apps/fire-screen-1.jpg', 'assets/apps/fire-screen-2.jpg', 'assets/apps/fire-screen-3.jpg']
  },
  nursery: {
    category: 'PUBLISHED APP · NURSERY OPERATIONS',
    title: 'Nursery Management App',
    intro: 'An Android nursery operations application, published by the Forestry and Wildlife Department Punjab.',
    context: 'Moving plant inventory and nursery transactions into structured mobile records with supporting evidence.',
    contributions: ['Record stock by nursery, block, season, and plant height class.', 'Document plant disposal and transfers between nurseries.', 'Update quantities and attach photos or documents to support traceable records.'],
    tools: ['Android', 'Inventory tracking', 'Plant transfers', 'Field documentation'],
    store: 'https://play.google.com/store/apps/details?id=com.forest.nurserymanagement',
    screenshots: ['assets/apps/nursery-screen-1.png', 'assets/apps/nursery-screen-2.png', 'assets/apps/nursery-screen-3.png']
  },
  health: {
    category: 'HEALTHCARE · WEB & MOBILE',
    title: 'Connecting the healthcare experience.',
    intro: 'Web and mobile application development for Doconline, an Italian healthcare company, from March 2023 to October 2024.',
    context: 'Working remotely with an international healthcare team, I contributed to web and mobile applications and the integrations that connected them to backend services.',
    contributions: ['Developed web and mobile applications for the healthcare domain.', 'Integrated third-party APIs into application workflows.', 'Maintained backend services used by mobile clients.'],
    tools: ['Web development', 'Mobile development', 'Third-party APIs', 'Backend services'],
    note: 'The portfolio artwork is a conceptual healthcare interface, not a screenshot of the Doconline product or a claim about its features.'
  },
  vision: {
    category: 'APPLIED AI · COMPUTER VISION',
    title: 'Making the invisible, visible.',
    intro: 'Social Distance & Mask Detection Using Camera: a real-time computer vision project built with Python and OpenCV.',
    context: 'Created around the public health challenges of COVID-19, this project explored how live video could support automated monitoring of mask usage and social distancing.',
    contributions: ['Worked with live camera input for real-time visual monitoring.', 'Built a system to detect face mask usage in video.', 'Used computer vision to measure social distancing within the camera view.'],
    tools: ['Python', 'OpenCV', 'Computer vision', 'Real-time video'],
    note: 'The detection artwork illustrates the project concept. It does not represent measured accuracy, a live feed, or a production monitoring system.'
  }
};

const dialog = document.querySelector('.project-dialog');
let dialogTrigger;
function openProject(projectKey, trigger) {
  const project = projectDetails[projectKey];
  if (!project) return;
  dialogTrigger = trigger;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-intro').textContent = project.intro;
  const content = document.querySelector('#dialog-content');
  content.replaceChildren();
  const addText = (tag, text) => {
    const element = document.createElement(tag);
    element.textContent = text;
    content.append(element);
    return element;
  };
  addText('h3', 'The context');
  addText('p', project.context);
  addText('h3', project.store ? 'App highlights' : 'My contribution');
  const list = document.createElement('ul');
  project.contributions.forEach(contribution => {
    const item = document.createElement('li');
    item.textContent = contribution;
    list.append(item);
  });
  content.append(list);
  addText('h3', project.store ? 'Platform & focus' : 'Tools & focus');
  const tags = document.createElement('div');
  tags.className = 'tags';
  project.tools.forEach(tool => {
    const tag = document.createElement('span');
    tag.textContent = tool;
    tags.append(tag);
  });
  content.append(tags);
  if (project.store) {
    addText('h3', 'From the Google Play listing');
    const gallery = document.createElement('div');
    gallery.className = 'store-gallery';
    gallery.setAttribute('role', 'region');
    gallery.setAttribute('aria-label', `${project.title} store artwork. Scroll to see more.`);
    gallery.tabIndex = 0;
    project.screenshots.forEach((source, index) => {
      const link = document.createElement('a');
      link.href = source;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `Open ${project.title} screenshot ${index + 1} at full size`);
      const image = document.createElement('img');
      image.src = source;
      image.alt = `${project.title} — official store artwork ${index + 1}`;
      image.loading = 'lazy';
      link.append(image);
      gallery.append(link);
    });
    content.append(gallery);
    const storeLink = document.createElement('a');
    storeLink.className = 'button store-button';
    storeLink.href = project.store;
    storeLink.target = '_blank';
    storeLink.rel = 'noopener noreferrer';
    storeLink.textContent = 'View app on Google Play ↗';
    content.append(storeLink);
  } else {
    addText('h3', 'About the visuals');
    addText('p', project.note);
  }
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('modal-open');
}
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project, button)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  dialogTrigger?.focus({ preventScroll: true });
});

let copyTimeout;
document.querySelector('.copy-email').addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  clearTimeout(copyTimeout);
  try {
    await navigator.clipboard.writeText('hassanjutt7437@gmail.com');
    status.textContent = 'Email copied!';
  } catch {
    status.textContent = 'Select the email address to copy it.';
  }
  copyTimeout = setTimeout(() => { status.textContent = ''; }, 4500);
});
document.querySelector('#year').textContent = new Date().getFullYear();
