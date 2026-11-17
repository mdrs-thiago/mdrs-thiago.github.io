// Tópicos Especiais A · 2027.1 — monta o layout UERJ e inicializa o Reveal.
//
// Convenções de autoria (cada aulaNN.html contém só conteúdo):
//   <body data-footer="Aula 01 · Do neurônio ao MLP">
//   <section class="cover" data-kicker="..." data-h1="..." data-h3="..."></section>
//   <section class="divider" data-num="Parte 1" data-h1="..." data-sub="..." data-variant="quest|lab|boss"></section>
//   <section data-title="1.1 — Título"> ...conteúdo... </section>
(function () {
  const LOGO = 'https://www.uerj.br/wp-content/uploads/2018/02/cropped-logomarca-uerj.png';

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function buildCover(s) {
    const d = s.dataset;
    s.setAttribute('data-transition', 'fade');
    s.innerHTML = `
      <div class="cover-wrap">
        <img src="${LOGO}" alt="UERJ">
        <h5>${d.kicker || 'Tópicos Especiais A · 2027.1'}</h5>
        <h1>${d.h1 || ''}</h1>
        <h3>${d.h3 || ''}</h3>
        <div class="bar"></div>
        <p style="font-size:22px;margin:0;"><strong>Thiago Medeiros</strong></p>
        <p class="small" style="margin-top:5px;">Universidade do Estado do Rio de Janeiro · Deep Learning</p>
        ${s.innerHTML.trim() ? `<div class="badge-row">${s.innerHTML}</div>` : ''}
      </div>`;
  }

  function buildDivider(s) {
    const d = s.dataset;
    s.setAttribute('data-transition', 'fade');
    s.innerHTML = `
      <div class="section-divider ${d.variant || ''}">
        <div class="section-num">${d.num || ''}</div>
        <h1>${d.h1 || ''}</h1>
        <div class="divider-line"></div>
        <div class="section-sub">${d.sub || ''}</div>
      </div>`;
  }

  function buildContent(s) {
    const header = el('div', 'ppt-header');
    header.appendChild(el('h2', '', s.dataset.title));
    const img = el('img');
    img.src = LOGO;
    img.alt = 'UERJ';
    header.appendChild(img);

    const content = el('div', 'ppt-content');
    while (s.firstChild) content.appendChild(s.firstChild);
    s.appendChild(header);
    s.appendChild(content);
    if (!s.hasAttribute('data-transition')) s.setAttribute('data-transition', 'none');
  }

  function buildFooter() {
    const footer = el('div', 'ppt-global-footer');
    footer.appendChild(el('div', '', 'Universidade do Estado do Rio de Janeiro (UERJ)'));
    footer.appendChild(el('div', '', `Tópicos Especiais A · 2027.1 · ${document.body.dataset.footer || ''}`));
    document.body.appendChild(footer);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal .slides > section').forEach(s => {
      if (s.classList.contains('cover')) buildCover(s);
      else if (s.classList.contains('divider')) buildDivider(s);
      else if (s.dataset.title) buildContent(s);
    });
    buildFooter();

    Reveal.initialize({
      hash: true,
      slideNumber: 'c/t',
      transition: 'slide',
      width: 1280,
      height: 720,
      margin: 0.04,
      plugins: [RevealHighlight, RevealNotes, RevealMath.KaTeX]
    });
  });
})();
