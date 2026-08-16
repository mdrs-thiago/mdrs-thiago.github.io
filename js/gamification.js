// Read-only quest/progress display for gamified disciplines (puc-pi-ia, puc-pi-si).
//
// The Google Sheet is the source of truth: the professor validates each completed quest
// by adding a row to the `progress` tab directly (see docs/gamification-setup.md). There
// is no self-declaration UI here — this script only ever reads.
//
// A student is identified via a personal link: `?aluno=<matrícula>` in the URL. With no
// APPS_SCRIPT_URL configured yet (js/config.js), the page still renders the full quest
// list so it's never broken, just with nothing marked done.
(function () {
    const hasBackend = typeof APPS_SCRIPT_URL !== 'undefined' && !!APPS_SCRIPT_URL;

    async function fetchJson(url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error('network error');
        return res.json();
    }

    function render(disc, completedIds, studentName) {
        const quests = disc.quests || [];
        const totalXp = quests.reduce((sum, q) => sum + q.xp, 0);
        const earnedXp = quests.reduce((sum, q) => sum + (completedIds.has(q.id) ? q.xp : 0), 0);
        const pct = totalXp ? Math.round((earnedXp / totalXp) * 100) : 0;

        const summaryC = document.getElementById('progress-summary');
        if (summaryC) {
            summaryC.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium">${studentName ? studentName : 'Progresso'}</span>
                    <span class="byline">${earnedXp} / ${totalXp}</span>
                </div>
                <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
            `;
        }

        const badgesC = document.getElementById('badges-container');
        if (badgesC && disc.badges) {
            const earned = disc.badges.filter(b => quests.some(q => q.badge === b.id && completedIds.has(q.id)));
            badgesC.innerHTML = earned.length
                ? earned.map(b => `<span class="tag-pill"><i class="fas fa-award mr-1"></i>${b.titulo}</span>`).join('')
                : '';
        }

        const questsC = document.getElementById('quests-container');
        if (questsC) {
            questsC.innerHTML = quests.map(q => {
                const done = completedIds.has(q.id);
                const titleHtml = q.link
                    ? `<a href="../${q.link}" class="text-link">${q.titulo}</a>`
                    : q.titulo;
                return `<div class="quest-row">
                    <span class="quest-check ${done ? 'done' : ''}"><i class="fas fa-check"></i></span>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                            <h4 class="text-sm font-medium">${titleHtml}</h4>
                            <span class="quest-xp-tag">${q.xp} pts</span>
                        </div>
                        <p class="text-xs mt-1" style="color:var(--ink-muted)">${q.descricao || ''}</p>
                    </div>
                </div>`;
            }).join('');
        }
    }

    function showNotice(message) {
        const el = document.getElementById('gamification-notice');
        if (el) { el.textContent = message; el.classList.remove('hidden'); }
    }

    async function init(disc) {
        const params = new URLSearchParams(window.location.search);
        const alunoId = params.get('aluno');

        if (!alunoId) {
            render(disc, new Set(), null);
            showNotice('Acesse pelo link pessoal enviado pelo professor para ver seu progresso individual.');
            return;
        }

        if (!hasBackend) {
            render(disc, new Set(), null);
            showNotice('Painel de progresso ainda não conectado à planilha — fale com o professor se isso persistir.');
            return;
        }

        let studentName = null;
        try {
            const aluno = await fetchJson(`${APPS_SCRIPT_URL}?action=aluno&disciplina=${encodeURIComponent(disc.id)}&aluno_id=${encodeURIComponent(alunoId)}`);
            if (aluno && aluno.nome) studentName = aluno.nome;
        } catch (e) { /* name is a nice-to-have; proceed without it */ }

        try {
            const questIds = await fetchJson(`${APPS_SCRIPT_URL}?action=progress&disciplina=${encodeURIComponent(disc.id)}&aluno_id=${encodeURIComponent(alunoId)}`);
            render(disc, new Set(questIds), studentName);
        } catch (e) {
            render(disc, new Set(), studentName);
            showNotice('Não foi possível carregar seu progresso agora — tente recarregar a página.');
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (!window.portfolioData || typeof DISCIPLINE_ID === 'undefined') return;
        const disc = window.portfolioData.disciplinas.find(d => d.id === DISCIPLINE_ID);
        if (!disc || !disc.gamified) return;
        init(disc);
    });
})();
