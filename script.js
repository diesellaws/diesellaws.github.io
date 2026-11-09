const processSteps = [
    ['Listen & Learn', 'I listen to clients, asking the right questions to fully understand their needs, goals, and user challenges.'],
    ['Define Direction', 'Together, we align user needs with business goals, creating a clear roadmap for the project.'],
    ['Brainstorm', 'We explore ideas through whiteboards and discussion, thinking creatively to find solutions that delight users.'],
    ['Wireframe', 'I transform ideas into wireframes, sketching the structure and flow to ensure everything makes sense.'],
    ['Test & Iterate', 'We discuss and improve conceptual wireframes, then run external user testing when required.'],
    ['Design & Prototype', 'I build polished designs and prototypes so clients can see and test how the experience works.'],
    ['Delivery & Handover', 'I work closely with engineers and teams to ensure the design is implemented effectively.'],
    ['Iterate & Test', 'I listen to feedback, user reviews and clickthroughs, then improve the implemented work.']
];

const processTabs = Array.from(document.querySelectorAll('.process-tab'));
const processCopy = document.querySelector('.process-copy');
let activeProcess = 0;
let processTimer;

function showProcess(index) {
    activeProcess = index;
    processTabs.forEach((tab, tabIndex) => {
        const active = tabIndex === index;
        tab.classList.toggle('active', active);
        tab.setAttribute('aria-selected', String(active));
    });
    const number = String(index + 1).padStart(2, '0');
    processCopy.innerHTML = `<span>${number} / 08</span><h3>${processSteps[index][0]}</h3><p>${processSteps[index][1]}</p>`;
}

function startProcessTimer() {
    clearInterval(processTimer);
    processTimer = setInterval(() => showProcess((activeProcess + 1) % processSteps.length), 7000);
}

if (processCopy && processTabs.length > 0) {
    processTabs.forEach((tab) => tab.addEventListener('click', () => {
        showProcess(Number(tab.dataset.tab));
        startProcessTimer();
    }));
    startProcessTimer();
}

document.querySelectorAll('.project').forEach((project) => {
    const button = project.querySelector('.project-toggle');
    const visual = project.querySelector('.project-visual');
    const details = project.querySelector('.project-details');
    if (!button || !visual || !details) return;
    const title = project.querySelector('.project-copy h3')?.textContent || 'case study';
    button.dataset.label = button.textContent;
    visual.tabIndex = 0;
    visual.setAttribute('role', 'button');
    visual.setAttribute('aria-expanded', 'false');
    visual.setAttribute('aria-label', `Open ${title}`);
    const toggleProject = () => {
        const open = project.classList.toggle('open');
        button.setAttribute('aria-expanded', String(open));
        button.textContent = open ? button.dataset.closeLabel || 'Close case study' : button.dataset.label;
        visual.setAttribute('aria-expanded', String(open));
        visual.setAttribute('aria-label', `${open ? 'Close' : 'Open'} ${title}`);
        if (open) requestAnimationFrame(() => details.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    };
    button.addEventListener('click', toggleProject);
    visual.addEventListener('click', toggleProject);
    visual.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        toggleProject();
    });
});

document.querySelectorAll('.copy-email').forEach((button) => button.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText('diesel@diesellaws.com');
        const original = button.textContent;
        button.textContent = 'Email copied';
        setTimeout(() => button.textContent = original, 1800);
    } catch (error) {
        window.location.href = 'mailto:diesel@diesellaws.com';
    }
}));

const menuToggle = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('#site-navigation');
if (menuToggle && siteNavigation) {
    const closeNavigation = () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
        siteNavigation.classList.remove('open');
    };
    menuToggle.addEventListener('click', () => {
        const open = menuToggle.getAttribute('aria-expanded') !== 'true';
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        siteNavigation.classList.toggle('open', open);
    });
    siteNavigation.querySelectorAll('a, button').forEach((control) => control.addEventListener('click', closeNavigation));
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || menuToggle.getAttribute('aria-expanded') !== 'true') return;
        closeNavigation();
        menuToggle.focus();
    });
    window.matchMedia('(max-width: 640px)').addEventListener('change', (event) => {
        if (!event.matches) closeNavigation();
    });
}

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
