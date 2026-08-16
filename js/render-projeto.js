// Shared renderer for individual project pages (projetos/*.html).
// Each page sets `const PROJECT_ID = '...'` before loading this script.
(function () {
    const STATUS_LABEL = {
        em_andamento: { en: 'Ongoing', pt: 'Em andamento' },
        concluido: { en: 'Completed', pt: 'Concluído' }
    };
    const ROLE_LABEL = {
        coordenador: { en: 'Coordinator', pt: 'Coordenador' },
        integrante: { en: 'Team member', pt: 'Integrante' }
    };

    function render(p) {
        document.title = `${t(p.titulo)} — Thiago Medeiros`;

        document.getElementById('project-eyebrow').textContent = t(STATUS_LABEL[p.status]) + ' · ' + t(p.natureza);
        document.getElementById('project-title').textContent = t(p.titulo);
        document.getElementById('project-period').textContent = p.periodo;

        const meta = document.getElementById('project-meta');
        const rows = [
            [getLang() === 'pt' ? 'Papel' : 'Role', t(ROLE_LABEL[p.papel_thiago])],
            [getLang() === 'pt' ? 'Coordenação' : 'Coordinated by', p.coordenador],
        ];
        if (p.alunos_envolvidos) rows.push([getLang() === 'pt' ? 'Alunos envolvidos' : 'Students involved', t(p.alunos_envolvidos)]);
        meta.innerHTML = rows.map(([k, v]) => `<div><dt class="byline">${k}</dt><dd class="text-sm mt-1">${v}</dd></div>`).join('');

        const equipeC = document.getElementById('project-equipe');
        if (p.equipe && p.equipe.length) {
            equipeC.innerHTML = p.equipe.map(name => `<span class="tag-pill">${name}</span>`).join('');
        }

        const bodyC = document.getElementById('project-body');
        if (p.fases) {
            bodyC.innerHTML = p.fases.map(f => `
                <h3 class="font-serif text-lg font-semibold mt-8 mb-3">${t(f.titulo)}</h3>
                <div class="prose-editorial"><p>${t(f.descricao)}</p></div>
            `).join('');
        } else {
            bodyC.innerHTML = `<div class="prose-editorial"><p>${t(p.descricao || p.resumo)}</p></div>`;
        }

        const pubsSection = document.getElementById('project-publications-section');
        const pubsC = document.getElementById('project-publications');
        if (p.publicacoes_relacionadas && p.publicacoes_relacionadas.length && window.portfolioData.publicacoes) {
            const matches = window.portfolioData.publicacoes.filter(pub => p.publicacoes_relacionadas.includes(pub.titulo));
            if (matches.length) {
                pubsSection.classList.remove('hidden');
                pubsC.innerHTML = matches.map(pub => `
                    <div class="relative pl-4 py-1" style="border-left:2px solid var(--line)">
                        <p class="byline mb-1">${pub.revista}</p>
                        <h4 class="font-serif text-base font-medium leading-snug"><a href="${pub.link}" target="_blank" class="text-link">${pub.titulo}</a></h4>
                    </div>`).join('');
            }
        }
    }

    function init() {
        if (!window.portfolioData || typeof PROJECT_ID === 'undefined') return;
        const p = window.portfolioData.projetos.find(x => x.id === PROJECT_ID);
        if (!p) return;
        render(p);
        document.addEventListener('langchange', () => render(p));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
