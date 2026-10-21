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

document.querySelectorAll('.project-toggle').forEach((button) => button.addEventListener('click', () => {
    const project = button.closest('.project, .experiment-project');
    if (!button.dataset.label) button.dataset.label = button.textContent;
    const open = project.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? button.dataset.closeLabel || 'Close case study' : button.dataset.label || button.textContent;
}));

document.querySelectorAll('.experiment-card').forEach((card) => card.addEventListener('click', (event) => {
    if (event.target.closest('button, a')) return;
    card.querySelector('.project-toggle').click();
}));

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

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const header = document.querySelector('.site-header');
let lastScroll = window.scrollY;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    header.classList.toggle('hidden', currentScroll > lastScroll + 8 && currentScroll > 120);
    if (currentScroll < lastScroll - 8 || currentScroll < 20) header.classList.remove('hidden');
    lastScroll = currentScroll;
}, { passive: true });
