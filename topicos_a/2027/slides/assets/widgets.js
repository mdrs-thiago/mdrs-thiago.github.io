// Tópicos Especiais A · 2027.1 — widgets interativos (SVG puro, sem dependências).
//
// Uso nos slides:
//   <div class="widget" data-widget="perceptron" data-dataset="OR"></div>
//   <div class="widget" data-widget="relu-fold"></div>
//   <div class="widget" data-widget="activations"></div>
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const C = { blue: '#004b87', light: '#007bc0', red: '#e53e3e', green: '#047857', orange: '#d97706', purple: '#6d28d9', grid: '#e2e8f0', ink: '#333' };

  function svgEl(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function html(tag, cls, inner, parent) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (inner !== undefined) e.innerHTML = inner;
    if (parent) parent.appendChild(e);
    return e;
  }
  function slider(row, label, min, max, step, value, onInput) {
    const l = html('label', '', label, row);
    const r = html('input', '', undefined, l);
    Object.assign(r, { type: 'range', min, max, step, value });
    const o = html('output', '', '', l);
    const fmt = v => (Number.isInteger(+step) ? String(v) : (+v).toFixed(1).replace('.', ','));
    o.textContent = fmt(value);
    r.addEventListener('input', () => { o.textContent = fmt(r.value); onInput(+r.value); });
    // Evita que as setas do teclado mudem de slide enquanto o slider tem foco
    r.addEventListener('keydown', e => e.stopPropagation());
    return r;
  }

  // ---------- Perceptron em 2D: AND / OR / XOR ----------
  const DATASETS = {
    AND: [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]],
    OR:  [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 1]],
    XOR: [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0]],
  };

  function perceptron(root) {
    const W = 340, H = 300, lo = -0.5, hi = 1.5;
    const sx = x => 30 + (x - lo) / (hi - lo) * (W - 40);
    const sy = y => H - 30 - (y - lo) / (hi - lo) * (H - 40);
    const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, 'font-family': 'Segoe UI, Arial', 'font-size': 13 }, root);
    const region = svgEl('polygon', { fill: '#dbeafe', opacity: 0.8 }, svg);
    for (const v of [0, 1]) {
      svgEl('line', { x1: sx(v), y1: sy(lo), x2: sx(v), y2: sy(hi), stroke: C.grid }, svg);
      svgEl('line', { x1: sx(lo), y1: sy(v), x2: sx(hi), y2: sy(v), stroke: C.grid }, svg);
    }
    svgEl('line', { x1: sx(lo), y1: sy(lo), x2: sx(hi), y2: sy(lo), stroke: '#999' }, svg);
    svgEl('line', { x1: sx(lo), y1: sy(lo), x2: sx(lo), y2: sy(hi), stroke: '#999' }, svg);
    svgEl('text', { x: sx(hi) - 14, y: sy(lo) + 22 }, svg).textContent = 'x₁';
    svgEl('text', { x: sx(lo) - 24, y: sy(hi) + 10 }, svg).textContent = 'x₂';
    for (const v of [0, 1]) {
      svgEl('text', { x: sx(v) - 4, y: sy(lo) + 16, fill: '#777', 'font-size': 11 }, svg).textContent = v;
      svgEl('text', { x: sx(lo) - 14, y: sy(v) + 4, fill: '#777', 'font-size': 11 }, svg).textContent = v;
    }
    const line = svgEl('line', { stroke: C.green, 'stroke-width': 3 }, svg);
    const pts = svgEl('g', {}, svg);

    const row = html('div', 'controls-row', '', root);
    const p = { w1: 1, w2: 1, b: -1.5, ds: root.dataset.dataset || 'OR' };
    const btns = {};
    for (const name of Object.keys(DATASETS)) {
      const bt = html('button', '', name, row);
      bt.addEventListener('click', () => { p.ds = name; draw(); });
      btns[name] = bt;
    }
    slider(row, 'w₁', -2, 2, 0.1, p.w1, v => { p.w1 = v; draw(); });
    slider(row, 'w₂', -2, 2, 0.1, p.w2, v => { p.w2 = v; draw(); });
    slider(row, 'b', -2, 2, 0.1, p.b, v => { p.b = v; draw(); });
    const status = html('span', 'status', '', row);
    const legend = html('div', 'caption', '● classe 1 &nbsp;&nbsp; ■ classe 0 &nbsp;&nbsp; área azul: ŷ = 1', root);
    legend.style.textAlign = 'left';

    // Recorta o semiplano w·x + b ≥ 0 contra o quadrado visível
    function halfPlane() {
      const box = [[lo, lo], [hi, lo], [hi, hi], [lo, hi]];
      const f = q => p.w1 * q[0] + p.w2 * q[1] + p.b;
      const out = [];
      for (let i = 0; i < 4; i++) {
        const a = box[i], c = box[(i + 1) % 4], fa = f(a), fc = f(c);
        if (fa >= 0) out.push(a);
        if ((fa >= 0) !== (fc >= 0)) {
          const t = fa / (fa - fc);
          out.push([a[0] + t * (c[0] - a[0]), a[1] + t * (c[1] - a[1])]);
        }
      }
      return out;
    }

    function draw() {
      Object.entries(btns).forEach(([k, b]) => b.classList.toggle('on', k === p.ds));
      const hp = halfPlane();
      region.setAttribute('points', hp.map(q => `${sx(q[0])},${sy(q[1])}`).join(' '));
      // Reta w1 x1 + w2 x2 + b = 0
      if (Math.abs(p.w2) > 1e-9) {
        const y = x => -(p.w1 * x + p.b) / p.w2;
        line.setAttribute('x1', sx(lo - 5)); line.setAttribute('y1', sy(y(lo - 5)));
        line.setAttribute('x2', sx(hi + 5)); line.setAttribute('y2', sy(y(hi + 5)));
      } else if (Math.abs(p.w1) > 1e-9) {
        const x = -p.b / p.w1;
        line.setAttribute('x1', sx(x)); line.setAttribute('y1', sy(lo - 5));
        line.setAttribute('x2', sx(x)); line.setAttribute('y2', sy(hi + 5));
      }
      pts.innerHTML = '';
      let ok = 0;
      for (const [x1, x2, y] of DATASETS[p.ds]) {
        const yhat = p.w1 * x1 + p.w2 * x2 + p.b >= 0 ? 1 : 0;
        if (yhat === y) ok++;
        const col = y ? C.blue : C.red;
        if (y) svgEl('circle', { cx: sx(x1), cy: sy(x2), r: 10, fill: col, stroke: yhat === y ? 'white' : '#111', 'stroke-width': yhat === y ? 2 : 3 }, pts);
        else svgEl('rect', { x: sx(x1) - 9, y: sy(x2) - 9, width: 18, height: 18, fill: col, stroke: yhat === y ? 'white' : '#111', 'stroke-width': yhat === y ? 2 : 3 }, pts);
      }
      status.textContent = `${ok}/4 corretos`;
      status.className = 'status ' + (ok === 4 ? 'ok' : 'bad');
    }
    // A reta pode sair do quadro: limita com clip
    const clip = svgEl('clipPath', { id: 'clip-' + Math.random().toString(36).slice(2) });
    svgEl('rect', { x: sx(lo), y: sy(hi), width: sx(hi) - sx(lo), height: sy(lo) - sy(hi) }, clip);
    const defs = svgEl('defs', {}, svg); defs.appendChild(clip);
    line.setAttribute('clip-path', `url(#${clip.id})`);
    draw();
  }

  // ---------- Plot genérico de funções 1-D ----------
  function axes(svg, W, H, xr, yr, pad) {
    const sx = x => pad + (x - xr[0]) / (xr[1] - xr[0]) * (W - 2 * pad);
    const sy = y => H - pad - (y - yr[0]) / (yr[1] - yr[0]) * (H - 2 * pad);
    if (yr[0] < 0 && yr[1] > 0) svgEl('line', { x1: sx(xr[0]), y1: sy(0), x2: sx(xr[1]), y2: sy(0), stroke: '#aaa' }, svg);
    else svgEl('line', { x1: sx(xr[0]), y1: sy(yr[0]), x2: sx(xr[1]), y2: sy(yr[0]), stroke: '#aaa' }, svg);
    if (xr[0] < 0 && xr[1] > 0) svgEl('line', { x1: sx(0), y1: sy(yr[0]), x2: sx(0), y2: sy(yr[1]), stroke: '#aaa' }, svg);
    return { sx, sy };
  }
  function path(svg, f, xr, s, attrs, n = 300) {
    let d = '';
    for (let i = 0; i <= n; i++) {
      const x = xr[0] + (xr[1] - xr[0]) * i / n;
      d += (i ? 'L' : 'M') + s.sx(x).toFixed(1) + ',' + s.sy(f(x)).toFixed(1);
    }
    return svgEl('path', Object.assign({ d, fill: 'none', 'stroke-width': 3 }, attrs), svg);
  }

  // erf (Abramowitz & Stegun 7.1.26) para a GELU exata x·Φ(x)
  function erf(x) {
    const s = Math.sign(x); x = Math.abs(x);
    const t = 1 / (1 + 0.3275911 * x);
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return s * y;
  }
  const Phi = x => 0.5 * (1 + erf(x / Math.SQRT2));
  const phi = x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
  const sig = x => 1 / (1 + Math.exp(-x));

  function activations(root) {
    const fns = [
      { k: 'Sigmoide', c: C.orange, f: sig, d: x => sig(x) * (1 - sig(x)) },
      { k: 'Tanh', c: C.purple, f: Math.tanh, d: x => 1 - Math.tanh(x) ** 2 },
      { k: 'ReLU', c: C.blue, f: x => Math.max(0, x), d: x => (x > 0 ? 1 : 0) },
      { k: 'GELU', c: C.green, f: x => x * Phi(x), d: x => Phi(x) + x * phi(x) },
    ];
    const W = 520, H = 280, xr = [-4, 4];
    const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, 'font-family': 'Segoe UI, Arial', 'font-size': 13 }, root);
    const row = html('div', 'controls-row', '', root);
    const st = { deriv: false, on: { Sigmoide: true, Tanh: true, ReLU: true, GELU: true } };
    const btns = fns.map(fn => {
      const b = html('button', '', fn.k, row);
      b.style.borderColor = fn.c;
      b.addEventListener('click', () => { st.on[fn.k] = !st.on[fn.k]; draw(); });
      return [fn, b];
    });
    const db = html('button', '', 'mostrar derivadas', row);
    db.addEventListener('click', () => { st.deriv = !st.deriv; draw(); });
    function draw() {
      svg.innerHTML = '';
      const yr = st.deriv ? [-0.2, 1.2] : [-1.2, 2.2];
      const s = axes(svg, W, H, xr, yr, 26);
      for (const v of (st.deriv ? [0.25, 1] : [-1, 1, 2])) {
        svgEl('line', { x1: s.sx(xr[0]), y1: s.sy(v), x2: s.sx(xr[1]), y2: s.sy(v), stroke: C.grid, 'stroke-dasharray': '4 4' }, svg);
        svgEl('text', { x: 2, y: s.sy(v) + 4, fill: '#777', 'font-size': 11 }, svg).textContent = String(v).replace('.', ',');
      }
      svgEl('text', { x: W - 34, y: s.sy(0) + 18, fill: '#777' }, svg).textContent = 'z';
      for (const [fn, b] of btns) {
        b.classList.toggle('on', st.on[fn.k]);
        b.style.background = st.on[fn.k] ? fn.c : '#fff';
        b.style.color = st.on[fn.k] ? '#fff' : fn.c;
        if (st.on[fn.k]) path(svg, st.deriv ? fn.d : fn.f, xr, s, { stroke: fn.c });
      }
      db.classList.toggle('on', st.deriv);
      svgEl('text', { x: 34, y: 18, fill: C.ink, 'font-weight': 600 }, svg).textContent = st.deriv ? 'Derivada f′(z)' : 'Ativação f(z)';
    }
    draw();
  }

  // ---------- ReLU "dobra" a reta: k neurônios → até k dobras ----------
  // Uma camada oculta com k ReLUs e entrada 1-D representa exatamente funções
  // lineares por partes com até k pontos de quebra. Aqui interpolamos a função alvo
  // em k+1 nós igualmente espaçados (uma construção possível, não a ótima).
  function reluFold(root) {
    const target = x => Math.sin(x) + 0.3 * x;
    const xr = [0, 2 * Math.PI], W = 520, H = 260;
    const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H, 'font-family': 'Segoe UI, Arial', 'font-size': 13 }, root);
    const row = html('div', 'controls-row', '', root);
    const info = html('span', 'status', '', row);
    let k = 3;
    slider(row, 'neurônios ReLU (k)', 1, 16, 1, k, v => { k = v; draw(); });
    row.insertBefore(info, null);
    function draw() {
      svg.innerHTML = '';
      const s = axes(svg, W, H, xr, [-1.4, 2.8], 26);
      const knots = Array.from({ length: k + 1 }, (_, i) => xr[0] + (xr[1] - xr[0]) * i / k);
      const vals = knots.map(target);
      const pl = x => {
        let i = Math.min(k - 1, Math.floor((x - xr[0]) / (xr[1] - xr[0]) * k));
        const t = (x - knots[i]) / (knots[i + 1] - knots[i]);
        return vals[i] + t * (vals[i + 1] - vals[i]);
      };
      path(svg, target, xr, s, { stroke: '#999', 'stroke-dasharray': '6 5', 'stroke-width': 2.5 });
      path(svg, pl, xr, s, { stroke: C.blue }, 600);
      for (let i = 1; i < k; i++) svgEl('circle', { cx: s.sx(knots[i]), cy: s.sy(vals[i]), r: 4, fill: C.orange }, svg);
      let err = 0;
      for (let i = 0; i <= 600; i++) { const x = xr[0] + (xr[1] - xr[0]) * i / 600; err = Math.max(err, Math.abs(pl(x) - target(x))); }
      info.textContent = `${k - 1} dobra${k - 1 === 1 ? '' : 's'} · erro máx. ${err.toFixed(3).replace('.', ',')}`;
      svgEl('text', { x: 34, y: 18, fill: '#777' }, svg).textContent = '- - alvo: sin(x) + 0,3x';
      svgEl('text', { x: 34, y: 36, fill: C.blue }, svg).textContent = '—— rede com k ReLUs';
    }
    draw();
  }

  const REG = { perceptron, activations, 'relu-fold': reluFold };
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-widget]').forEach(el => {
      const fn = REG[el.dataset.widget];
      if (fn) fn(el);
    });
  });
})();
