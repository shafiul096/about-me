const themeToggle = document.querySelector('.theme-toggle');
const languageToggle = document.querySelector('.language-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const projectDialog = document.getElementById('projectDialog');
const projectForm = document.getElementById('projectForm');
const projectGrid = document.getElementById('projectGrid');
const emptyProjects = document.getElementById('emptyProjects');
const formError = document.getElementById('formError');
const PROJECTS_KEY = 'shafiulProjects';

const translations = {
  bn: {
    navAbout: 'সম্পর্কে', navWork: 'কাজ', navExperience: 'অভিজ্ঞতা', navContact: 'যোগাযোগ',
    eyebrow: 'ওয়েব ডেভেলপার · Developer', heroTitle: 'মোঃ শাফিউল<br><em>ইসলাম</em>',
    heroText: 'আমি একজন ডেভেলপার। ওয়েব ও ডিজিটাল প্রোডাক্ট তৈরি এবং উন্নয়নে কাজ করি।',
    viewWork: 'আমার কাজ', contactMe: 'যোগাযোগ করুন', sectionAbout: 'পরিচিতি',
    aboutHeading: 'আমি মোঃ শাফিউল ইসলাম। <em>ওয়েব ডেভেলপমেন্ট</em> ও প্রোডাক্ট তৈরিতে আগ্রহী।',
    aboutText: 'এখানে আপনার কাজের ধরন, দক্ষতা ও প্রজেক্ট সম্পর্কে সংক্ষিপ্তভাবে লিখতে পারেন।',
    learnMore: 'আরও জানুন', sectionWork: 'নির্বাচিত কাজ', manageProjects: 'পোর্টফোলিও যোগ করুন',
    emptyProjects: 'এখনও কোনো প্রজেক্ট যোগ করা হয়নি।', addProject: 'প্রজেক্ট যোগ করুন',
    sectionExperience: 'অভিজ্ঞতা', experiencePeriod: 'আপনার সময়কাল',
    experienceRole: 'আপনার পদবি', experienceOrg: 'প্রতিষ্ঠান বা স্বনির্ভর কাজ',
    experienceDetail: 'এখানে কাজের সংক্ষিপ্ত বর্ণনা লিখুন। আপনার নিজস্ব প্রকল্প ও অর্জন অনুযায়ী তথ্য দিন।',
    sectionSkills: 'দক্ষতা', sectionContact: 'যোগাযোগ', contactHeading: 'চলুন কথা বলি।',
    contactText: 'প্রকল্প, কাজ বা সহযোগিতার বিষয়ে যোগাযোগ করুন।', backTop: 'উপরে যান',
    portfolioManager: 'পোর্টফোলিও ম্যানেজার', projectTitle: 'প্রজেক্টের নাম',
    projectCategory: 'ক্যাটাগরি', projectDescription: 'সংক্ষিপ্ত বিবরণ',
    projectUrl: 'লাইভ লিংক বা GitHub URL', projectImage: 'প্রজেক্টের ছবি',
    exportProjects: 'Export JSON', importProjects: 'Import JSON', saveProject: 'সেভ করুন',
    deleteProject: 'মুছুন', openProject: 'প্রজেক্ট দেখুন', requiredTitle: 'প্রজেক্টের নাম দিন।'
  },
  en: {
    navAbout: 'About', navWork: 'Work', navExperience: 'Experience', navContact: 'Contact',
    eyebrow: 'Web Developer · Developer', heroTitle: 'Md. Shafiul<br><em>Islam</em>',
    heroText: 'I am a developer working on web and digital product development.',
    viewWork: 'View my work', contactMe: 'Get in touch', sectionAbout: 'About',
    aboutHeading: 'I am Md. Shafiul Islam. Interested in <em>web development</em> and product building.',
    aboutText: 'You can add a brief overview of your work, skills, and projects here.',
    learnMore: 'Learn more', sectionWork: 'Selected work', manageProjects: 'Manage portfolio',
    emptyProjects: 'No projects have been added yet.', addProject: 'Add project',
    sectionExperience: 'Experience', experiencePeriod: 'Your timeline',
    experienceRole: 'Your role', experienceOrg: 'Organization or independent work',
    experienceDetail: 'Add a brief description of your work based on your own projects and achievements.',
    sectionSkills: 'Skills', sectionContact: 'Contact', contactHeading: 'Let us talk.',
    contactText: 'Get in touch about projects, work, or collaboration.', backTop: 'Back to top',
    portfolioManager: 'Portfolio manager', projectTitle: 'Project name',
    projectCategory: 'Category', projectDescription: 'Brief description',
    projectUrl: 'Live or GitHub URL', projectImage: 'Project image',
    exportProjects: 'Export JSON', importProjects: 'Import JSON', saveProject: 'Save project',
    deleteProject: 'Delete', openProject: 'View project', requiredTitle: 'Enter a project name.'
  }
};

let currentLanguage = localStorage.getItem('language') || 'bn';

function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.body.classList.toggle('english', language === 'en');
  localStorage.setItem('language', language);
  languageToggle.textContent = language === 'bn' ? 'EN' : 'বাংলা';
  languageToggle.setAttribute('aria-label', language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন');
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[language][key]) element.innerHTML = translations[language][key];
  });
  renderProjects();
}

languageToggle.addEventListener('click', () => applyLanguage(currentLanguage === 'bn' ? 'en' : 'bn'));

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggle.setAttribute('aria-label', 'লাইট মোড চালু করুন');
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
});

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

function getProjects() {
  try {
    return JSON.parse(localStorage.getItem(PROJECTS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveProjects(projects) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  renderProjects();
}

function escapeHtml(value = '') {
  const element = document.createElement('div');
  element.textContent = value;
  return element.innerHTML;
}

function renderProjects() {
  const projects = getProjects();
  emptyProjects.hidden = projects.length > 0;
  projectGrid.hidden = projects.length === 0;
  projectGrid.innerHTML = projects.map((project, index) => `
    <article class="project ${index === 0 ? 'project-featured' : ''}">
      <a class="project-image project-upload" href="${project.url ? escapeHtml(project.url) : '#'}" ${project.url ? 'target="_blank" rel="noreferrer"' : ''} aria-label="${escapeHtml(project.title)}">
        ${project.image ? `<img src="${project.image}" alt="${escapeHtml(project.title)}">` : '<div class="project-placeholder"><span>SI</span></div>'}
        <span class="project-arrow">↗</span>
      </a>
      <div class="project-meta">
        <div><p>${escapeHtml(project.category)}</p><h3>${escapeHtml(project.title)}</h3></div>
        <button class="delete-project" type="button" data-index="${index}">${translations[currentLanguage].deleteProject}</button>
      </div>
      ${project.description ? `<p class="project-description">${escapeHtml(project.description)}</p>` : ''}
    </article>
  `).join('');

  projectGrid.querySelectorAll('.delete-project').forEach((button) => {
    button.addEventListener('click', () => {
      const projects = getProjects();
      projects.splice(Number(button.dataset.index), 1);
      saveProjects(projects);
    });
  });
}

function openProjectDialog() {
  formError.textContent = '';
  if (typeof projectDialog.showModal === 'function') projectDialog.showModal();
  else projectDialog.setAttribute('open', '');
}

document.getElementById('manageProjects').addEventListener('click', openProjectDialog);
document.getElementById('addFirstProject').addEventListener('click', openProjectDialog);
document.getElementById('closeDialog').addEventListener('click', () => projectDialog.close());

projectDialog.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

projectForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(projectForm);
  const title = String(formData.get('title') || '').trim();
  if (!title) {
    formError.textContent = translations[currentLanguage].requiredTitle;
    projectForm.elements.title.focus();
    return;
  }

  const imageFile = projectForm.elements.image.files[0];
  if (imageFile && imageFile.size > 2 * 1024 * 1024) {
    formError.textContent = currentLanguage === 'bn' ? 'ছবির সাইজ ২ MB-এর বেশি হবে না।' : 'Image size must be under 2 MB.';
    return;
  }

  let image = '';
  if (imageFile) {
    image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  }

  const projects = getProjects();
  projects.unshift({
    title,
    category: String(formData.get('category') || '').trim(),
    description: String(formData.get('description') || '').trim(),
    url: String(formData.get('url') || '').trim(),
    image
  });
  saveProjects(projects);
  projectForm.reset();
  projectDialog.close();
});

document.getElementById('exportProjects').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(getProjects(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'shafiul-islam-portfolios.json';
  link.click();
  URL.revokeObjectURL(url);
});

document.getElementById('importProjects').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const projects = JSON.parse(await file.text());
    if (!Array.isArray(projects)) throw new Error('Invalid JSON');
    saveProjects(projects);
    formError.textContent = '';
  } catch {
    formError.textContent = currentLanguage === 'bn' ? 'সঠিক JSON ফাইল নির্বাচন করুন।' : 'Select a valid JSON file.';
  }
  event.target.value = '';
});

applyLanguage(currentLanguage);
