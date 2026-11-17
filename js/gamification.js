// Read-only quest/progress display for gamified disciplines (puc-pi-ia, puc-pi-si, topicos-a).
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

    // Disciplines with a `gamificacao` config (topicos-a) get levels, a grade estimate,
    // block badges computed from completion, and bonus quests kept out of the base total.
    // Everything else (PUC) keeps the original flat rendering below.
    function questRow(q, done, alunoId) {
        let href = q.link ? `../${q.link}` : null;
        if (href && alunoId) href += `${href.includes('?') ? '&' : '?'}aluno=${encodeURIComponent(alunoId)}`;
        const titleHtml = href ? `<a href="${href}" class="text-link">${q.titulo}</a>` : q.titulo;
        const tag = q.xp === 0 ? 'feedback' : `${q.bonus ? '+' : ''}${q.xp} pts`;
        return `<div class="quest-row">
            <span class="quest-check ${done ? 'done' : ''}"><i class="fas fa-check"></i></span>
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                    <h4 class="text-sm font-medium">${titleHtml}</h4>
                    <span class="quest-xp-tag">${tag}</span>
                </div>
                <p class="text-xs mt-1" style="color:var(--ink-muted)">${q.descricao || ''}</p>
            </div>
        </div>`;
    }

    function renderLeveled(disc, completedIds, studentName, alunoId) {
        const cfg = disc.gamificacao;
        const quests = disc.quests || [];
        const baseXp = quests.reduce((s, q) => s + (q.bonus ? 0 : q.xp), 0);
        const badgeDone = (disc.badges || []).filter(b => {
            const items = quests.filter(q => q.bloco === b.bloco && !q.bonus && q.xp > 0);
            return items.length > 0 && items.every(q => completedIds.has(q.id));
        });
        const earnedXp = quests.reduce((s, q) => s + (completedIds.has(q.id) ? q.xp : 0), 0)
            + badgeDone.length * (cfg.badge_bonus_xp || 0);
        const meta = cfg.xp_meta || baseXp;
        const nota = Math.min(10, (10 * earnedXp) / meta);
        const niveis = cfg.niveis || [];
        const nivel = niveis.filter(n => earnedXp >= n.xp).pop();
        const prox = niveis.find(n => n.xp > earnedXp);
        const pct = Math.min(100, Math.round((earnedXp / meta) * 100));

        const summaryC = document.getElementById('progress-summary');
        if (summaryC) {
            summaryC.innerHTML = `
                <div class="flex items-center justify-between mb-1">
                    <span class="text-sm font-medium">${studentName ? studentName : 'Progresso'}${nivel ? ` · ${nivel.nome}` : ''}</span>
                    <span class="byline">${earnedXp} / ${meta} XP</span>
                </div>
                <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
                <div class="flex items-center justify-between mt-2 text-xs" style="color:var(--ink-muted)">
                    <span>Nota da gamificação (estimada): <strong>${nota.toFixed(1)}</strong> / 10</span>
                    <span>${prox ? `Próximo nível: ${prox.nome} (${prox.xp} XP)` : 'Nível máximo!'}</span>
                </div>`;
        }

        const badgesC = document.getElementById('badges-container');
        if (badgesC) {
            badgesC.innerHTML = (disc.badges || []).map(b => {
                const ok = badgeDone.includes(b);
                return `<span class="tag-pill" style="${ok ? '' : 'opacity:.35'}" title="${ok ? 'Conquistado' : 'Complete todas as quests, desafios e o lab do bloco'}"><i class="fas ${b.icone || 'fa-award'} mr-1"></i>${b.titulo}</span>`;
            }).join('');
        }

        const questsC = document.getElementById('quests-container');
        if (questsC) {
            const groups = [];
            (disc.badges || []).forEach(b => groups.push({ titulo: b.titulo, items: quests.filter(q => q.bloco === b.bloco) }));
            const rest = quests.filter(q => !q.bloco);
            if (rest.length) groups.push({ titulo: 'Bônus', items: rest });
            questsC.innerHTML = groups.map(g => `
                <details class="mb-4" ${g.items.some(q => !completedIds.has(q.id) && !q.bonus) ? 'open' : ''}>
                    <summary class="eyebrow cursor-pointer mb-2">${g.titulo} · ${g.items.filter(q => completedIds.has(q.id)).length}/${g.items.length}</summary>
                    ${g.items.map(q => questRow(q, completedIds.has(q.id), alunoId)).join('')}
                </details>`).join('');
        }
    }

    function render(disc, completedIds, studentName, alunoId) {
        if (disc.gamificacao) return renderLeveled(disc, completedIds, studentName, alunoId);
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
            render(disc, new Set(questIds), studentName, alunoId);
        } catch (e) {
            render(disc, new Set(), studentName, alunoId);
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
