// ========== CONFIG ==========
const SEMANTIC_SCHOLAR_ID = '2059104813';
const SS_API = 'https://api.semanticscholar.org/graph/v1';

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    try {
        if (window.portfolioData) {
            const d = window.portfolioData;
            renderDisciplines(d.disciplinas);
            renderResearch(d.research_areas);
            renderStudentsTable(d.students);
            renderNews(d.news);
        }
        fetchScholarData();
        initParticles();
    } catch (e) { console.error('Render error:', e); }
});

// ========== PARTICLES ==========
function initParticles() {
    if (!window.particlesJS) return;
    const isPUC = document.title.includes('PUC');
    const color = isPUC ? '#ef4444' : '#3b82f6';
    particlesJS('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 900 } },
            color: { value: color },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 140, color: color, opacity: 0.12, width: 1 },
            move: { enable: true, speed: 0.8, direction: 'none', random: true, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, resize: true },
            modes: { grab: { distance: 150, line_linked: { opacity: 0.3 } } }
        },
        retina_detect: true
    });
}

// ========== MOBILE MENU ==========
document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('hidden');
});

// ========== CALENDAR ==========
window.addEventListener('load', () => {
    if (window.calendar && window.calendar.schedulingButton) {
        const url = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1GxktoqIhTXg5VZ3HGFtYUxYaFERBXp2gcLD8NKTFauB790ebZtnud1zyFA7IYeUIS2SB0AnvK?gv=true';
        const t1 = document.getElementById('calendar-widget-container-desktop');
        const t2 = document.getElementById('calendar-widget-container-contact');
        if (t1) calendar.schedulingButton.load({ url, color: '#1e293b', label: 'Agendar conversa', target: t1 });
        if (t2) calendar.schedulingButton.load({ url, color: '#2563eb', label: 'Agendar uma conversa comigo', target: t2 });
    }
});

// ========== NAVBAR SCROLL ==========
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 20) nav?.classList.add('shadow-sm');
    else nav?.classList.remove('shadow-sm');
});

// ========== DISCIPLINES ==========
function renderDisciplines(disciplinas) {
    const container = document.getElementById('disciplinas-container');
    const dd = document.getElementById('ensino-dropdown-desktop');
    const dm = document.getElementById('ensino-dropdown-mobile');
    if (!disciplinas || !container) return;
    let ddH = '', dmH = '';
    const cards = disciplinas.map(disc => {
        const r = disc.rota || '#';
        ddH += `<a href="${r}" class="block px-4 py-2 text-sm text-slate-600 hover:text-accent hover:bg-slate-50 transition-colors rounded-lg mx-1">${disc.nome}</a>`;
        dmH += `<a href="${r}" class="block pl-4 py-1.5 text-sm font-medium text-slate-500 hover:text-accent">↳ ${disc.nome}</a>`;
        const n = disc.aulas ? disc.aulas.length : 0;
        return `<a href="${r}" class="group block"><div class="editorial-card p-7 rounded-2xl relative overflow-hidden h-full">
            <div class="absolute top-0 left-0 w-full h-1 bg-slate-100 group-hover:bg-accent transition-colors duration-300"></div>
            <div class="flex items-center gap-4 mb-5"><div class="w-11 h-11 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300"><i class="fas ${disc.icone}"></i></div><div><h3 class="font-serif text-lg font-bold text-slate-900 leading-tight group-hover:text-accent transition-colors">${disc.nome}</h3><span class="text-[10px] text-accent font-semibold tracking-wider uppercase">Semestre Atual</span></div></div>
            <p class="text-sm text-slate-500 font-light leading-relaxed mb-5">${disc.descricao || ''}</p>
            <div class="flex items-center gap-3 text-xs text-slate-400 mb-5"><span><i class="fas fa-book-open mr-1"></i> ${n} aula${n!==1?'s':''}</span></div>
            <div class="pt-3 border-t border-slate-50 flex items-center justify-between text-sm font-semibold text-slate-400 group-hover:text-accent transition-colors"><span>Acessar</span><i class="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform"></i></div>
        </div></a>`;
    }).join('');
    container.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">${cards}</div>`;
    if (dd) dd.innerHTML = ddH;
    if (dm) dm.innerHTML = dmH;
}

// ========== RESEARCH ==========
function renderResearch(areas) {
    const c = document.getElementById('research-container');
    if (!areas || !c) return;
    c.innerHTML = areas.map(a => `<div class="editorial-card p-7 rounded-2xl text-left group">
        <div class="w-11 h-11 bg-slate-50 border border-slate-100 text-slate-700 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"><i class="fas ${a.icon} text-lg"></i></div>
        <h3 class="font-serif text-lg font-bold text-slate-900 mb-2">${a.title}</h3>
        <p class="text-slate-500 text-sm font-light leading-relaxed">${a.description}</p>
    </div>`).join('');
}

// ========== NEWS ==========
function renderNews(news) {
    if (!news || !news.length) return;
    const section = document.getElementById('news-section');
    const c = document.getElementById('news-container');
    if (!section || !c) return;
    section.classList.remove('hidden');
    c.innerHTML = news.map(n => `<div class="flex items-start gap-3 py-2">
        <span class="text-xs font-semibold text-slate-400 w-20 shrink-0 mt-0.5">${n.date||''}</span>
        <span class="text-sm text-slate-700">${n.icon?`<i class="fas ${n.icon} text-accent mr-2"></i>`:''}${n.text}</span>
    </div>`).join('');
}

// ========== SEMANTIC SCHOLAR ==========
async function fetchScholarData() {
    try {
        const [authorRes, papersRes] = await Promise.all([
            fetch(`${SS_API}/author/${SEMANTIC_SCHOLAR_ID}?fields=name,paperCount,citationCount,hIndex`),
            fetch(`${SS_API}/author/${SEMANTIC_SCHOLAR_ID}/papers?fields=title,year,venue,citationCount,url,externalIds&limit=50&sort=year:desc`)
        ]);
        if (!authorRes.ok || !papersRes.ok) throw new Error('API error');
        const author = await authorRes.json();
        const papers = await papersRes.json();

        // Stats
        const sp = document.getElementById('stat-papers');
        const sc = document.getElementById('stat-citations');
        const sh = document.getElementById('stat-hindex');
        if (sp) animateCounter(sp, author.paperCount || 0);
        if (sc) animateCounter(sc, author.citationCount || 0);
        if (sh) animateCounter(sh, author.hIndex || 0);

        // Publications
        renderPublications(papers.data || []);
    } catch (e) {
        console.warn('Semantic Scholar fallback:', e);
        if (window.portfolioData?.publicacoes) renderPublicationsFallback(window.portfolioData.publicacoes);
        ['stat-papers','stat-citations','stat-hindex'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '—';
        });
    }
    // Students count
    const ss = document.getElementById('stat-students');
    if (ss && window.portfolioData?.students) animateCounter(ss, window.portfolioData.students.length);
}

function animateCounter(el, target) {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
    }, 30);
}

function renderPublications(papers) {
    const c = document.getElementById('publications-list');
    if (!c) return;
    if (!papers.length) { c.innerHTML = '<p class="text-sm text-slate-400 italic">Nenhuma publicação encontrada.</p>'; return; }
    c.innerHTML = papers.map(p => {
        const doi = p.externalIds?.DOI ? `https://doi.org/${p.externalIds.DOI}` : (p.url || '#');
        return `<div class="group relative pl-4 border-l-2 border-slate-100 hover:border-accent transition-colors py-1">
            <div class="flex items-baseline gap-3 mb-1">
                <span class="text-xs font-bold text-accent tabular-nums">${p.year||''}</span>
                <span class="text-xs text-slate-400 font-medium">${p.venue||''}</span>
                ${p.citationCount?`<span class="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-semibold"><i class="fas fa-quote-right mr-1"></i>${p.citationCount}</span>`:''}
            </div>
            <h4 class="font-serif text-base font-medium text-slate-900 leading-snug"><a href="${doi}" target="_blank" class="hover:text-accent transition-colors">${p.title}</a></h4>
        </div>`;
    }).join('');
}

function renderPublicationsFallback(pubs) {
    const c = document.getElementById('publications-list');
    if (!c || !pubs) return;
    c.innerHTML = pubs.map(p => `<div class="group relative pl-4 border-l-2 border-slate-100 hover:border-accent transition-colors py-1">
        <p class="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-1">${p.revista}</p>
        <h4 class="font-serif text-base font-medium text-slate-900 leading-snug"><a href="${p.link}" target="_blank" class="hover:text-accent transition-colors">${p.titulo}</a></h4>
    </div>`).join('');
}

// ========== STUDENTS TABLE ==========
let allStudents = [];
let currentSort = { key: null, asc: true };
let currentLevelFilter = 'all';
let currentStatusFilter = 'all';

function renderStudentsTable(students) {
    if (!students) return;
    allStudents = students;
    renderFilteredStudents();
}

function renderFilteredStudents() {
    let filtered = [...allStudents];
    const search = (document.getElementById('student-search')?.value || '').toLowerCase();
    if (search) filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(search) ||
        s.project.toLowerCase().includes(search) ||
        (s.tags || []).some(t => t.toLowerCase().includes(search))
    );
    if (currentLevelFilter !== 'all') filtered = filtered.filter(s => s.level === currentLevelFilter);
    if (currentStatusFilter !== 'all') filtered = filtered.filter(s => s.status === currentStatusFilter);
    if (currentSort.key) {
        filtered.sort((a, b) => {
            const va = (a[currentSort.key] || '').toLowerCase();
            const vb = (b[currentSort.key] || '').toLowerCase();
            return currentSort.asc ? va.localeCompare(vb) : vb.localeCompare(va);
        });
    }
    const tbody = document.getElementById('students-table-body');
    if (!tbody) return;
    tbody.innerHTML = filtered.map((s, i) => {
        const isActive = s.status !== 'Concluído';
        const dot = isActive ? 'bg-emerald-400' : 'bg-slate-300';
        const stxt = isActive ? 'text-slate-700' : 'text-slate-400';
        const tags = (s.tags || []).map(t => `<span class="tag-pill">${t}</span>`).join(' ');
        const links = [];
        if (s.thesis_link) links.push(`<a href="${s.thesis_link}" target="_blank" class="text-accent hover:underline text-xs"><i class="fas fa-file-alt mr-1"></i>Texto</a>`);
        if (s.github_link) links.push(`<a href="${s.github_link}" target="_blank" class="text-slate-500 hover:text-accent text-xs"><i class="fab fa-github mr-1"></i>Código</a>`);
        return `<tr class="group hover:bg-slate-50 transition-colors cursor-pointer" onclick="this.nextElementSibling.classList.toggle('open')">
            <td class="px-5 py-3"><p class="text-sm font-medium text-slate-900">${s.name}</p><p class="text-xs text-slate-500 mt-0.5 truncate max-w-[250px]">${s.project}</p></td>
            <td class="px-5 py-3 hidden sm:table-cell"><span class="text-xs font-medium text-slate-500 border border-slate-200 bg-white px-2 py-1 rounded-md">${s.level}</span></td>
            <td class="px-5 py-3 hidden md:table-cell text-xs text-slate-500">${s.period||''}</td>
            <td class="px-5 py-3 text-right"><div class="inline-flex items-center gap-2"><span class="w-2 h-2 rounded-full ${dot}"></span><span class="text-xs font-medium ${stxt}">${s.status}</span></div></td>
        </tr>
        <tr class="expandable-row"><td colspan="4" class="px-5 py-3 bg-slate-50/50 border-b border-slate-100">
            <div class="flex flex-wrap gap-1.5 mb-2">${tags}</div>
            <div class="flex gap-4">${links.join('')}</div>
        </td></tr>`;
    }).join('');
    const countEl = document.getElementById('student-count');
    if (countEl) countEl.textContent = `${filtered.length} de ${allStudents.length} orientações`;
}

// Filters
document.getElementById('student-search')?.addEventListener('input', renderFilteredStudents);
document.getElementById('level-filters')?.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('#level-filters .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLevelFilter = btn.dataset.filter;
    renderFilteredStudents();
});
document.getElementById('status-filters')?.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('#status-filters .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentStatusFilter = btn.dataset.status;
    renderFilteredStudents();
});
document.querySelectorAll('.sort-header').forEach(th => {
    th.addEventListener('click', () => {
        const key = th.dataset.sort;
        if (currentSort.key === key) currentSort.asc = !currentSort.asc;
        else { currentSort.key = key; currentSort.asc = true; }
        renderFilteredStudents();
    });
});
