// ========== CONFIG ==========
const SEMANTIC_SCHOLAR_ID = '2059104813';
const SS_API = 'https://api.semanticscholar.org/graph/v1';

// ========== INIT ==========
function renderAll() {
    if (!window.portfolioData) return;
    const d = window.portfolioData;
    try {
        renderBio(d.bio);
        renderResearch(d.research_areas);
        renderActiveProjects(d.projetos);
        renderStudentsTable(d.students);
        renderNews(d.news);
        renderEscrita(d.escrita);
    } catch (e) { console.error('Render error:', e); }
}

document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    fetchScholarData();
});

document.addEventListener('langchange', renderAll);

// ========== MOBILE MENU ==========
document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('hidden');
});

// ========== NAVBAR SCROLL ==========
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 20) nav?.classList.add('shadow-sm');
    else nav?.classList.remove('shadow-sm');
});

// ========== BIO ==========
function renderBio(bio) {
    const c = document.getElementById('about-container');
    if (!bio || !c) return;
    c.innerHTML = bio.paragrafos.map(p => `<p>${t(p)}</p>`).join('');
    const tagsC = document.getElementById('about-tags');
    if (tagsC && bio.tags) {
        tagsC.innerHTML = bio.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('');
    }
}

// ========== RESEARCH AREAS (tags, folded into About) ==========
function renderResearch(areas) {
    const c = document.getElementById('research-tags-container');
    if (!areas || !c) return;
    c.innerHTML = areas.map(a => `<span class="tag-pill" title="${t(a.description)}">${t(a.title)}</span>`).join('');
}

// ========== CURRENT RESEARCH (active projects) ==========
function renderActiveProjects(projetos) {
    const c = document.getElementById('projects-container');
    if (!projetos || !c) return;
    const active = projetos.filter(p => p.status === 'em_andamento');
    c.innerHTML = active.map(p => `<a href="projetos/${p.id}.html" class="group block h-full">
        <div class="editorial-card h-full p-7 flex flex-col">
            <span class="byline mb-3">${p.periodo}</span>
            <h3 class="font-serif text-lg font-semibold mb-2 leading-snug group-hover:text-[var(--accent)] transition-colors">${t(p.titulo)}</h3>
            <p class="prose-editorial text-sm flex-grow"><span>${t(p.resumo)}</span></p>
            <div class="mt-5 pt-4 border-t flex items-center justify-between text-xs font-medium" style="border-color:var(--line); color:var(--ink-faint)">
                <span data-i18n="link_view_project">${UI_STRINGS[getLang()].link_view_project}</span>
                <i class="fas fa-arrow-right"></i>
            </div>
        </div>
    </a>`).join('');
}

// ========== NEWS ==========
function renderNews(news) {
    if (!news || !news.length) return;
    const section = document.getElementById('news-section');
    const c = document.getElementById('news-container');
    if (!section || !c) return;
    section.classList.remove('hidden');
    c.innerHTML = news.map(n => `<div class="flex items-start gap-3 py-2">
        <span class="byline w-20 shrink-0 mt-0.5">${n.date||''}</span>
        <span class="text-sm">${n.icon?`<i class="fas ${n.icon} mr-2" style="color:var(--accent)"></i>`:''}${n.text || n}</span>
    </div>`).join('');
}

// ========== ESCRITA / WRITING ==========
function renderEscrita(items) {
    const c = document.getElementById('escrita-container');
    if (!items || !items.length || !c) return;
    const lang = getLang();
    const tipoLabel = { preprint: { en: 'Preprint', pt: 'Preprint' }, ideia: { en: 'Note', pt: 'Ideia' } };
    c.innerHTML = items.map(d => `<div class="editorial-card p-6">
        <div class="flex items-center gap-3 mb-2">
            <span class="byline">${d.data || ''}</span>
            <span class="tag-pill">${t(tipoLabel[d.tipo]) || d.tipo}</span>
        </div>
        <h4 class="font-serif text-base font-medium leading-snug mb-2">${d.link_opcional ? `<a href="${d.link_opcional}" target="_blank" class="text-link">${t(d.titulo)}</a>` : t(d.titulo)}</h4>
        <p class="prose-editorial text-sm"><span>${t(d.resumo)}</span></p>
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

        const sp = document.getElementById('stat-papers');
        const sc = document.getElementById('stat-citations');
        const sh = document.getElementById('stat-hindex');
        if (sp) animateCounter(sp, author.paperCount || 0);
        if (sc) animateCounter(sc, author.citationCount || 0);
        if (sh) animateCounter(sh, author.hIndex || 0);

        renderPublications(papers.data || []);
    } catch (e) {
        console.warn('Semantic Scholar fallback:', e);
        if (window.portfolioData?.publicacoes) renderPublicationsFallback(window.portfolioData.publicacoes);
        ['stat-papers','stat-citations','stat-hindex'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '—';
        });
    }
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
    if (!papers.length) { c.innerHTML = '<p class="text-sm italic" style="color:var(--ink-faint)">—</p>'; return; }
    c.innerHTML = papers.map(p => {
        const doi = p.externalIds?.DOI ? `https://doi.org/${p.externalIds.DOI}` : (p.url || '#');
        return `<div class="relative pl-4 py-1" style="border-left:2px solid var(--line)">
            <div class="flex items-baseline gap-3 mb-1">
                <span class="byline" style="color:var(--accent)">${p.year||''}</span>
                <span class="byline">${p.venue||''}</span>
                ${p.citationCount?`<span class="byline">· ${p.citationCount} cit.</span>`:''}
            </div>
            <h4 class="font-serif text-base font-medium leading-snug"><a href="${doi}" target="_blank" class="text-link">${p.title}</a></h4>
        </div>`;
    }).join('');
}

function renderPublicationsFallback(pubs) {
    const c = document.getElementById('publications-list');
    if (!c || !pubs) return;
    c.innerHTML = pubs.map(p => `<div class="relative pl-4 py-1" style="border-left:2px solid var(--line)">
        <p class="byline mb-1">${p.revista}</p>
        <h4 class="font-serif text-base font-medium leading-snug"><a href="${p.link}" target="_blank" class="text-link">${p.titulo}</a></h4>
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
        (s.tags || []).some(tag => tag.toLowerCase().includes(search))
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
    tbody.innerHTML = filtered.map((s) => {
        const isActive = s.status !== 'Concluído';
        const dot = isActive ? 'background:#5C8A6E' : 'background:var(--line-strong)';
        const tags = (s.tags || []).map(tag => `<span class="tag-pill">${tag}</span>`).join(' ');
        const links = [];
        if (s.thesis_link) links.push(`<a href="${s.thesis_link}" target="_blank" class="text-link text-xs"><i class="fas fa-file-alt mr-1"></i>${getLang()==='pt'?'Texto':'Text'}</a>`);
        if (s.github_link) links.push(`<a href="${s.github_link}" target="_blank" class="text-link text-xs"><i class="fab fa-github mr-1"></i>Code</a>`);
        return `<tr class="cursor-pointer" style="border-bottom:1px solid var(--line)" onclick="this.nextElementSibling.classList.toggle('open')">
            <td class="px-5 py-3"><p class="text-sm font-medium">${s.name}</p><p class="byline mt-1 truncate max-w-[250px]">${s.project}</p></td>
            <td class="px-5 py-3 hidden sm:table-cell"><span class="byline">${s.level}</span></td>
            <td class="px-5 py-3 hidden md:table-cell byline">${s.period||''}</td>
            <td class="px-5 py-3 text-right"><div class="inline-flex items-center gap-2"><span class="w-2 h-2 rounded-full" style="${dot}"></span><span class="byline">${s.status}</span></div></td>
        </tr>
        <tr class="expandable-row"><td colspan="4" class="px-5 py-3" style="background:var(--paper); border-bottom:1px solid var(--line)">
            <div class="flex flex-wrap gap-1.5 mb-2">${tags}</div>
            <div class="flex gap-4">${links.join('')}</div>
        </td></tr>`;
    }).join('');
    const countEl = document.getElementById('student-count');
    if (countEl) countEl.textContent = `${filtered.length} / ${allStudents.length}`;
}

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
