// English-first i18n for the personal site (home, projects, writing, publications, advising).
// Disciplinas is intentionally out of scope — it stays Portuguese-only (taught in PT).
const UI_STRINGS = {
    en: {
        nav_about: 'About', nav_research: 'Research', nav_projects: 'Projects', nav_publications: 'Publications',
        nav_writing: 'Writing', nav_teaching: 'Disciplinas', nav_advising: 'Advising',
        hero_kicker: 'Researcher & Lecturer', hero_cta_research: 'Research', hero_cta_teaching: 'Disciplinas',
        stat_papers: 'Papers', stat_citations: 'Citations', stat_hindex: 'h-index', stat_students: 'Advisees',
        section_about_eyebrow: 'About', section_about_title: 'Research & Teaching in AI',
        section_research_eyebrow: 'Current Research', section_research_title: 'Active Projects',
        section_research_sub: 'Ongoing work — see the full project list for completed work too.',
        link_all_projects: 'All projects', link_view_project: 'View project',
        section_publications_eyebrow: 'Scholarly Output', section_publications_title: 'Publications',
        section_publications_sub: 'Synced automatically via Semantic Scholar.',
        link_google_scholar: 'Google Scholar',
        section_writing_eyebrow: 'In Progress', section_writing_title: 'Writing',
        section_writing_sub: 'Preprints under review and informal notes not yet formally published.',
        section_teaching_eyebrow: 'Teaching', section_teaching_title: 'Disciplinas',
        section_teaching_body: 'Course materials, schedules and projects for the courses I teach at PUC-Rio and UERJ.',
        link_view_disciplinas: 'View Disciplinas',
        section_advising_eyebrow: 'Advising', section_advising_title: 'Advisees',
        section_advising_sub: 'Undergraduate, master’s and undergraduate-research projects.',
        search_placeholder: 'Search by name, project or tag...',
        filter_all: 'All', filter_masters: 'Master’s', filter_undergrad: 'Undergraduate', filter_ic: 'Undergrad Research',
        filter_active: 'Active', filter_done: 'Completed',
        section_contact_eyebrow: 'Contact', section_contact_title: 'Let’s talk',
        link_schedule: 'Schedule time with me',
        footer_line: 'Systems and Computer Engineering Department',
        loading: 'Loading...'
    },
    pt: {
        nav_about: 'Sobre', nav_research: 'Pesquisa', nav_projects: 'Projetos', nav_publications: 'Publicações',
        nav_writing: 'Escrita', nav_teaching: 'Disciplinas', nav_advising: 'Orientações',
        hero_kicker: 'Pesquisador & Docente', hero_cta_research: 'Pesquisa', hero_cta_teaching: 'Disciplinas',
        stat_papers: 'Papers', stat_citations: 'Citações', stat_hindex: 'h-index', stat_students: 'Orientações',
        section_about_eyebrow: 'Sobre', section_about_title: 'Pesquisa & Ensino em IA',
        section_research_eyebrow: 'Pesquisa Atual', section_research_title: 'Projetos Ativos',
        section_research_sub: 'Trabalhos em andamento — veja a lista completa de projetos para os já concluídos também.',
        link_all_projects: 'Todos os projetos', link_view_project: 'Ver projeto',
        section_publications_eyebrow: 'Produção Acadêmica', section_publications_title: 'Publicações',
        section_publications_sub: 'Sincronizado automaticamente via Semantic Scholar.',
        link_google_scholar: 'Google Scholar',
        section_writing_eyebrow: 'Em Andamento', section_writing_title: 'Escrita',
        section_writing_sub: 'Preprints em avaliação e notas informais ainda não publicadas formalmente.',
        section_teaching_eyebrow: 'Ensino', section_teaching_title: 'Disciplinas',
        section_teaching_body: 'Materiais, cronogramas e projetos das disciplinas que ministro na PUC-Rio e na UERJ.',
        link_view_disciplinas: 'Ver Disciplinas',
        section_advising_eyebrow: 'Orientação', section_advising_title: 'Orientações',
        section_advising_sub: 'Projetos de graduação, mestrado e iniciação científica.',
        search_placeholder: 'Buscar por nome, projeto ou tag...',
        filter_all: 'Todos', filter_masters: 'Mestrado', filter_undergrad: 'Graduação', filter_ic: 'Iniciação Científica',
        filter_active: 'Ativos', filter_done: 'Concluídos',
        section_contact_eyebrow: 'Contato', section_contact_title: 'Vamos conversar?',
        link_schedule: 'Agendar uma conversa',
        footer_line: 'Departamento de Engenharia de Sistemas e Computação',
        loading: 'Carregando...'
    }
};

function getLang() {
    return localStorage.getItem('site_lang') || 'en';
}

function t(field) {
    // field is either a plain string (no translation available) or {en, pt}
    if (field == null) return '';
    if (typeof field === 'string') return field;
    const lang = getLang();
    return field[lang] || field.en || '';
}

function applyStaticStrings() {
    const lang = getLang();
    const dict = UI_STRINGS[lang] || UI_STRINGS.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (dict[key]) el.textContent = dict[key];
    });
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    const toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.textContent = lang === 'en' ? '🇧🇷' : '🇺🇸';
    const toggleMobile = document.getElementById('lang-toggle-mobile');
    if (toggleMobile) toggleMobile.textContent = lang === 'en' ? '🇧🇷 PT' : '🇺🇸 EN';
}

function setLang(lang) {
    localStorage.setItem('site_lang', lang);
    applyStaticStrings();
    document.dispatchEvent(new CustomEvent('langchange'));
}

document.addEventListener('DOMContentLoaded', () => {
    applyStaticStrings();
    document.getElementById('lang-toggle')?.addEventListener('click', () => {
        setLang(getLang() === 'en' ? 'pt' : 'en');
    });
});
