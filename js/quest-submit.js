// Shared client for the narrow quiz/desafio write path (see gamification/apps-script.gs doPost).
// Used only by pages under puc_ia/quiz/ and puc_ia/desafios/ — every other quest on the site
// stays validated by hand in the Sheet, as documented in docs/gamification-setup.md.
//
// Usage on a quiz/desafio page:
//   const aluno = await QuestSubmit.getAlunoId('puc-pi-ia');       // { id, nome } or null
//   const status = await QuestSubmit.checkStatus('puc-pi-ia', aluno.id, 'pi-ia-a1-quiz');
//   if (status.done) { /* render locked state with status.detalhe */ }
//   const result = await QuestSubmit.submit('puc-pi-ia', aluno.id, 'pi-ia-a1-quiz', '8/8');
//   if (result.status === 'duplicate') { /* someone else/race - show status.detalhe */ }
(function () {
    const STORAGE_KEY = 'quest_submit_aluno_id';

    function hasBackend() {
        return typeof APPS_SCRIPT_URL !== 'undefined' && !!APPS_SCRIPT_URL;
    }

    async function fetchJson(url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error('network error');
        return res.json();
    }

    async function postJson(url, body) {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error('network error');
        return res.json();
    }

    // Resolves the student identity: ?aluno= in the URL, then a cached value in
    // localStorage, then an inline prompt validated against the roster. Returns
    // { id, nome } (nome may be null if not found in the roster) or null if the
    // student declines to enter one.
    async function getAlunoId(disciplina) {
        const params = new URLSearchParams(window.location.search);
        let id = params.get('aluno') || localStorage.getItem(STORAGE_KEY);

        if (!id) {
            id = window.prompt('Digite sua matrícula para continuar:');
            if (!id) return null;
        }
        id = id.trim();
        localStorage.setItem(STORAGE_KEY, id);

        let nome = null;
        if (hasBackend()) {
            try {
                const aluno = await fetchJson(`${APPS_SCRIPT_URL}?action=aluno&disciplina=${encodeURIComponent(disciplina)}&aluno_id=${encodeURIComponent(id)}`);
                if (aluno && aluno.nome) nome = aluno.nome;
            } catch (e) { /* name is a nice-to-have; proceed without it */ }
        }
        return { id, nome };
    }

    // Returns { done: boolean, detalhe: string }. If the backend isn't configured yet,
    // always returns not-done so the page still works during local development.
    async function checkStatus(disciplina, alunoId, questId) {
        if (!hasBackend() || !alunoId) return { done: false, detalhe: '' };
        try {
            const rows = await fetchJson(`${APPS_SCRIPT_URL}?action=progress_detail&disciplina=${encodeURIComponent(disciplina)}&aluno_id=${encodeURIComponent(alunoId)}`);
            const row = rows.find(r => r.quest_id === questId);
            return row ? { done: true, detalhe: row.detalhe } : { done: false, detalhe: '' };
        } catch (e) {
            return { done: false, detalhe: '' };
        }
    }

    // Submits a completed quest. Returns { status: 'ok' | 'duplicate' | 'error', detalhe? }.
    // The server re-checks for duplicates itself, so this is safe even if two tabs race.
    async function submit(disciplina, alunoId, questId, detalhe) {
        if (!hasBackend()) return { status: 'no_backend' };
        try {
            return await postJson(APPS_SCRIPT_URL, { disciplina, aluno_id: alunoId, quest_id: questId, detalhe: detalhe || '' });
        } catch (e) {
            return { status: 'error' };
        }
    }

    window.QuestSubmit = { getAlunoId, checkStatus, submit, hasBackend };
})();
