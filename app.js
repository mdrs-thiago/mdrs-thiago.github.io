// ========== CONFIG ==========
const SEMANTIC_SCHOLAR_ID = '2059104813';
const SS_API = 'https://api.semanticscholar.org/graph/v1';

// ========== INIT ==========
function renderAll() {
    if (!window.portfolioData) return;
    const d = window.portfolioData;
    try {
        renderBio(d.bio);
        renderTeaching(d.disciplinas);
        renderActiveProjects(d.projetos);
        renderStudentsTable(d.students);
        renderEvents(d.events);
        renderEscrita(d.escrita);
    } catch (e) { console.error('Render error:', e); }
}

document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    fetchScholarData();
    loadSheetContent();
});

// Advising and events come live from the content sheet; site-data.js is the fallback.
async function loadSheetContent() {
    const d = window.portfolioData;
    const [students, events] = await Promise.allSettled([fetchStudents(), fetchEvents()]);
    if (students.status === 'fulfilled' && students.value.length) {
        d.students = students.value;
        renderStudentsTable(d.students);
        updateStudentCount();
    } else if (students.status === 'rejected') console.warn('Advising sheet fallback:', students.reason);
    if (events.status === 'fulfilled') {
        d.events = events.value;
        renderEvents(d.events);
    } else console.warn('Events sheet fallback:', events.reason);
}

function esc(v) {
    return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

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
}

// ========== TEACHING (course list in the dark band) ==========
function renderTeaching(disciplinas) {
    const c = document.getElementById('teach-list');
    if (!disciplinas || !c) return;
    c.innerHTML = disciplinas.map(d => {
        const n = (d.aulas || []).filter(a => a.link && a.link !== '#').length;
        return `<li>
        <a href="${esc(d.rota)}" class="teach-row group">
            <span class="teach-inst">${esc(d.institution)}</span>
            <span class="teach-name">${esc(d.nome)}</span>
            <span class="teach-count">${n ? `${n} ${getLang() === 'pt' ? 'aulas' : 'lectures'}` : ''}</span>
            <i class="fas fa-arrow-right teach-arrow"></i>
        </a>
    </li>`;
    }).join('');
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

// ========== EVENTS ==========
// The first event in the sheet is the "next" one and gets the signal treatment.
function renderEvents(events) {
    const c = document.getElementById('news-container');
    if (!c) return;
    const dict = UI_STRINGS[getLang()];
    if (!events || !events.length) {
        c.innerHTML = `<div class="event-empty"><span class="event-empty-dot"></span><p>${dict.events_empty}</p></div>`;
        return;
    }
    c.innerHTML = events.map((ev, i) => {
        const link = /^https?:\/\//.test(ev.link || '') ? `<a href="${esc(ev.link)}" target="_blank" rel="noopener" class="event-link">${dict.link_event} &rarr;</a>` : '';
        return `<article class="event-card${i === 0 ? ' is-next' : ''}">
            <h3 class="font-serif event-title">${esc(ev.name)}</h3>
            ${ev.description ? `<p class="event-desc">${esc(ev.description)}</p>` : ''}
            ${link}
        </article>`;
    }).join('');
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
            <span class="byline" style="color:var(--accent)">${t(tipoLabel[d.tipo]) || d.tipo}</span>
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
    updateStudentCount();
}

function updateStudentCount() {
    const ss = document.getElementById('stat-students');
    if (ss && window.portfolioData?.students) animateCounter(ss, window.portfolioData.students.length);
}

function animateCounter(el, target) {
    clearInterval(el._counter);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    el._counter = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(el._counter); }
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
// The site shows only two situations: "Concluiu" in the sheet, or anything else = in progress.
const SITUACAO_LABELS = {
    done: { en: 'Completed', pt: 'Concluiu' },
    active: { en: 'In progress', pt: 'Em andamento' }
};
const LEVEL_LABELS = {
    'Graduação': { en: 'Undergraduate', pt: 'Graduação' },
    'Mestrado': { en: 'Master’s', pt: 'Mestrado' },
    'Doutorado': { en: 'Ph.D.', pt: 'Doutorado' },
    'Iniciação Científica': { en: 'Undergrad Research', pt: 'Iniciação Científica' }
};
const isDone = s => s.situacao === 'Concluiu';

let allStudents = [];
let currentSort = { key: null, asc: true };
let currentLevelFilter = 'all';
let currentStatusFilter = 'all';

function renderStudentsTable(students) {
    if (!students) return;
    allStudents = students;
    renderCohort(students);
    renderFilteredStudents();
}

// Each advisee is one point, grouped by university: filled = completed,
// ring = in progress, larger = master's.
function renderCohort(students) {
    const c = document.getElementById('cohort');
    if (!c) return;
    const dict = UI_STRINGS[getLang()];
    const groups = [...new Set(students.map(s => s.institution))];
    c.innerHTML = `<div class="cohort-groups">${groups.map(inst => {
        const members = students.filter(s => s.institution === inst)
            .sort((a, b) => Number(isDone(b)) - Number(isDone(a)) || (b.level === 'Mestrado') - (a.level === 'Mestrado'));
        return `<div class="cohort-group">
            <div class="cohort-head"><span class="font-serif cohort-inst">${esc(inst)}</span><span class="byline">${members.length}</span></div>
            <div class="cohort-dots">${members.map(s => {
                const label = `${s.name}${s.title ? ` · ${s.title}` : ''}`;
                return `<span class="cohort-dot${isDone(s) ? ' done' : ''}${s.level === 'Mestrado' ? ' masters' : ''}" tabindex="0" title="${esc(label)}" aria-label="${esc(label)}"></span>`;
            }).join('')}</div>
        </div>`;
    }).join('')}</div>
    <div class="cohort-legend byline">
        <span><i class="cohort-dot done"></i>${dict.cohort_done}</span>
        <span><i class="cohort-dot"></i>${dict.cohort_active}</span>
        <span><i class="cohort-dot masters"></i>${dict.cohort_masters}</span>
    </div>`;
}

function renderFilteredStudents() {
    let filtered = [...allStudents];
    const search = (document.getElementById('student-search')?.value || '').toLowerCase();
    if (search) filtered = filtered.filter(s => s.name.toLowerCase().includes(search) || (s.title || '').toLowerCase().includes(search));
    if (currentLevelFilter !== 'all') filtered = filtered.filter(s => s.level === currentLevelFilter);
    if (currentStatusFilter === 'active') filtered = filtered.filter(s => !isDone(s));
    if (currentStatusFilter === 'done') filtered = filtered.filter(isDone);
    if (currentSort.key) {
        filtered.sort((a, b) => {
            const va = (a[currentSort.key] || '').toLowerCase();
            const vb = (b[currentSort.key] || '').toLowerCase();
            return currentSort.asc ? va.localeCompare(vb) : vb.localeCompare(va);
        });
    }
    const tbody = document.getElementById('students-table-body');
    if (!tbody) return;
    tbody.innerHTML = filtered.map(s => {
        const dot = isDone(s) ? 'background:var(--line-strong)' : 'background:var(--accent)';
        const situacao = t(SITUACAO_LABELS[isDone(s) ? 'done' : 'active']);
        const level = LEVEL_LABELS[s.level] ? t(LEVEL_LABELS[s.level]) : s.level;
        return `<tr style="border-bottom:1px solid var(--line)">
            <td class="px-5 py-3"><p class="text-sm font-bold">${esc(s.name)}</p>${s.title ? `<p class="text-sm mt-1" style="color:var(--ink-muted)">${esc(s.title)}</p>` : ''}<p class="byline mt-1 sm:hidden">${esc(level)} · ${esc(s.institution)}</p></td>
            <td class="px-5 py-3 hidden sm:table-cell"><span class="byline">${esc(level)}</span></td>
            <td class="px-5 py-3 hidden md:table-cell"><span class="institution-badge">${esc(s.institution)}</span></td>
            <td class="px-5 py-3 text-right"><div class="inline-flex items-center gap-2"><span class="w-2 h-2 rounded-full" style="${dot}"></span><span class="byline">${esc(situacao)}</span></div></td>
        </tr>`;
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
