# Gera as figuras SVG da Aula 03 (otimizadores, generalização, regularização) em slides/img/aula03/.
# Uso: python aula03_figuras_svg.py <aula03_dados.json> <pasta_saida>
# O JSON vem do notebook notebooks/aula03_figuras.ipynb (MLPs treinados de verdade no MNIST).
# As figuras analíticas (ravina, schedules, polinômios) são calculadas aqui com numpy e sementes fixas.
import sys, json, math
import numpy as np
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from svgkit import *  # noqa: F401,F403
import svgkit

DATA = json.load(open(sys.argv[1]))
svgkit.set_out(sys.argv[2])
fmt = lambda v, d=2: f'{v:.{d}f}'.replace('.', ',')


def axes(P, xl='', xticks=(), yticks=(), d=1):
    """Moldura com marcas; o rótulo do eixo x fica centralizado abaixo das marcas."""
    o = [P.frame('', '')]
    for v in xticks: o.append(t(P.X(v), P.y0 + P.h + 20, fmt(v, d) if isinstance(v, float) else str(v), 15, MUTED, 'middle'))
    for v in yticks: o.append(t(P.x0 - 8, P.Y(v) + 5, fmt(v, d) if isinstance(v, float) else str(v), 15, MUTED, 'end'))
    if xl: o.append(t(P.x0 + P.w / 2, P.y0 + P.h + (42 if xticks else 22), xl, 15, MUTED, 'middle'))
    return ''.join(o)


# ------------------------------------------------------------ ravina: perda alongada
A, B = 1.0, 50.0
RAV = lambda a, b: 0.5 * (A * a ** 2 + B * b ** 2)
DRAV = lambda w: np.array([A * w[0], B * w[1]])
W0 = np.array([-9.0, 1.4])


def opt_path(kind, n=40):
    w = W0.copy(); path = [w.copy()]; v = np.zeros(2); m = np.zeros(2); s = np.zeros(2)
    for k in range(1, n + 1):
        g = DRAV(w)
        if kind == 'sgd':
            w = w - 0.038 * g
        elif kind == 'momentum':
            v = 0.8 * v + g; w = w - 0.015 * v
        elif kind == 'adam':
            m = 0.9 * m + 0.1 * g; s = 0.999 * s + 0.001 * g * g
            mh, sh = m / (1 - 0.9 ** k), s / (1 - 0.999 ** k)
            w = w - 0.3 * mh / (np.sqrt(sh) + 1e-8)
        path.append(w.copy())
    return np.array(path)


def rav_plane(x0, y0, w, h):
    P = Plane(x0, y0, w, h, (-10, 2.5), (-2.2, 2.2))
    return P, [P.frame('w₁', 'w₂'), contour_paths(RAV, P, [0.5, 2, 5, 10, 20, 32, 46], n=160),
               circ(*P.P(0, 0), 6, GREEN, 'white', 2)]


def draw_path(P, path, col, n=None):
    pts = [P.P(*p) for p in path[:n]]
    o = [poly(pts, stroke=col, w=2.8)]
    o += [circ(x, y, 3.5, col, 'white', 1) for x, y in pts[1:]]
    o.append(circ(*pts[0], 7, RED, 'white', 2))
    return o


def f_ravina():
    P, o = rav_plane(60, 20, 820, 300)
    path = opt_path('sgd', 40)
    o += draw_path(P, path, BLUE)
    o.append(t(P.X(W0[0]) + 12, P.Y(W0[1]) - 10, 'início', 15, RED, weight='bold'))
    o.append(t(P.X(0), P.Y(0) + 26, 'mínimo', 15, GREEN, 'middle', 'bold'))
    o.append(t(470, 360, 'SGD com o maior η que não diverge: zigue-zague na direção íngreme, passos minúsculos na direção plana', 15, MUTED, 'middle', style='italic'))
    svg(900, 375, '\n'.join(o), 'ravina')
    return float(np.linalg.norm(path[-1]))


def f_otimizadores():
    o = []
    cfg = [('sgd', 'SGD', BLUE), ('momentum', 'SGD + momentum', ORANGE), ('adam', 'Adam', GREEN)]
    dists = {}
    for k, (kind, title, col) in enumerate(cfg):
        P, oo = rav_plane(40 + k * 320, 46, 280, 200)
        o += oo
        path = opt_path(kind, 40)
        o += draw_path(P, path, col)
        d = float(np.linalg.norm(path[-1])); dists[kind] = d
        o.append(t(P.x0 + 140, 30, title, 18, col, 'middle', 'bold'))
        o.append(t(P.x0 + 140, 290, f'40 passos: distância ao mínimo {fmt(d)}', 15, MUTED, 'middle'))
    svg(990, 305, '\n'.join(o), 'otimizadores')
    for kind, col in (('momentum', ORANGE), ('adam', GREEN)):
        P, oo = rav_plane(30, 10, 400, 200)
        svg(450, 240, '\n'.join(oo + draw_path(P, opt_path(kind, 40), col)), f'caminho_{kind}')
    return dists


# ------------------------------------------------------------ schedules de learning rate
def f_schedules():
    E = 90; ep = np.arange(E + 1)
    step = np.where(ep < 30, 0.1, np.where(ep < 60, 0.01, 0.001))
    cos = 0.0005 + 0.5 * (0.1 - 0.0005) * (1 + np.cos(np.pi * ep / E))
    wu = np.where(ep < 5, 0.1 * (ep + 1) / 6, 0.0005 + 0.5 * (0.1 - 0.0005) * (1 + np.cos(np.pi * (ep - 5) / (E - 5))))
    cfg = [(step, 'Degrau', 'divide por 10 nas épocas 30 e 60', BLUE), (cos, 'Cosseno', 'desce suave até quase zero', GREEN),
           (wu, 'Warmup + cosseno', 'sobe nas 5 primeiras épocas', ORANGE)]
    o = []
    for k, (y, title, sub, col) in enumerate(cfg):
        P = Plane(60 + k * 320, 46, 250, 190, (0, E), (0, 0.11))
        o.append(axes(P, 'época', (0, 30, 60, 90)))
        o.append(poly([P.P(e, v) for e, v in zip(ep, y)], stroke=col, w=3))
        for v in (0, 0.05, 0.1):
            o.append(t(P.x0 - 8, P.Y(v) + 5, fmt(v, 2), 15, MUTED, 'end'))
        o.append(t(P.x0 + 125, 30, title, 18, col, 'middle', 'bold'))
        o.append(t(P.x0 + 125, 300, sub, 15, MUTED, 'middle', style='italic'))
    svg(1000, 315, '\n'.join(o), 'schedules')


# ------------------------------------------------------------ inicialização: histogramas por camada
def f_init():
    init = DATA['init']
    rows = [('pequena', 'σ = 0,01', RED, 'ativações somem'), ('grande', 'σ = 1', ORANGE, 'tanh satura em ±1'),
            ('xavier', 'σ = 1/√n (Xavier)', GREEN, 'variância se mantém')]
    o = []
    cw, ch, gx, gy, x0, y0 = 118, 70, 22, 40, 200, 40
    for l in range(6):
        o.append(t(x0 + l * (cw + gx) + cw / 2, 24, f'camada {l + 1}', 15, MUTED, 'middle', 'bold'))
    for r, (key, lab, col, note) in enumerate(rows):
        y = y0 + r * (ch + gy)
        o.append(t(x0 - 16, y + ch / 2 - 2, lab, 16, col, 'end', 'bold'))
        o.append(t(x0 - 16, y + ch / 2 + 20, note, 15, MUTED, 'end'))
        for l in range(6):
            h = np.array(init[key][l][:30], float); std = init[key][l][30]
            x = x0 + l * (cw + gx)
            o.append(line(x, y + ch, x + cw, y + ch, '#c4cad1', 1))
            hn = h / h.max()
            bw = cw / 30
            for i, v in enumerate(hn):
                if v > 0.003:
                    o.append(f'<rect x="{x + i * bw:.1f}" y="{y + ch - v * ch:.1f}" width="{bw - 0.6:.1f}" height="{v * ch:.1f}" fill="{col}" opacity="0.85"/>')
            o.append(t(x + cw / 2, y + ch + 19, f'desvio {fmt(std)}', 15, TXT, 'middle'))
    o.append(t(x0 + 3 * (cw + gx) - gx / 2, y0 + 3 * (ch + gy) + 6, 'cada histograma: ativações tanh de −1 a 1, numa rede de 6 camadas de 500 neurônios', 15, MUTED, 'middle', style='italic'))
    svg(x0 + 6 * (cw + gx) + 10, y0 + 3 * (ch + gy) + 20, '\n'.join(o), 'inicializacao')


# ------------------------------------------------------------ treino / validação / teste
def f_split():
    o = []
    x0, y0, W, H = 40, 50, 900, 64
    parts = [(0.6, 'treino (60%)', BLUE, 'ajusta os pesos'), (0.2, 'validação (20%)', ORANGE, 'escolhe hiperparâmetros'),
             (0.2, 'teste (20%)', RED, 'nota final, uma vez só')]
    x = x0; centers = []
    for frac, lab, col, role in parts:
        w = W * frac; centers.append(x + w / 2)
        o.append(rect(x + 2, y0, w - 4, H, col, col, 1, 6, 0.85))
        o.append(t(x + w / 2, y0 + H / 2 + 7, lab, 18, 'white', 'middle', 'bold'))
        x += w
    o.append(t(x0, 32, 'Os exemplos rotulados que você tem', 18, TXT, weight='bold'))
    rows = [('o otimizador usa para calcular o gradiente', [1, 0, 0]), ('você usa para escolher η, tamanho e épocas', [0, 1, 0]),
            ('você usa uma vez, para o resultado final', [0, 0, 1])]
    yy = y0 + H + 56
    o.append(line(x0, yy - 26, x0 + W, yy - 26, '#e2e6ea', 1))
    for i, (lab, mask) in enumerate(rows):
        y = yy + i * 40
        o.append(t(x0, y + 6, lab, 16, TXT))
        for c, m, (_, _, col, _) in zip(centers, mask, parts):
            if m: o.append(t(c if c > 580 else 500, y + 7, '✓', 22, col, 'middle', 'bold'))
    svg(980, yy + 3 * 40, '\n'.join(o), 'split')


# ------------------------------------------------------------ under / bom / over (polinômios)
def poly_data(seed, n=15):
    r = np.random.default_rng(seed)
    x = np.sort(r.uniform(-1, 1, n)); y = np.sin(np.pi * x) + r.normal(0, 0.25, n)
    return x, y


def fit(x, y, d):
    V = np.vander(x, d + 1)
    return np.linalg.lstsq(V, y, rcond=None)[0]


def f_polinomios():
    x, y = poly_data(3)
    xt, yt = poly_data(1003, 200)
    o = []
    cfg = [(1, 'Grau 1: underfitting', ORANGE), (3, 'Grau 3: bom ajuste', GREEN), (14, 'Grau 14: overfitting', RED)]
    errs = []
    for k, (d, title, col) in enumerate(cfg):
        c = fit(x, y, d)
        P = Plane(30 + k * 320, 46, 280, 210, (-1.05, 1.05), (-1.9, 1.9))
        o.append(axes(P))
        xs = np.linspace(-1.05, 1.05, 400)
        o.append(poly([P.P(a, math.sin(math.pi * a)) for a in xs], stroke=GRAY, w=2, dash='6 5'))
        ys = np.polyval(c, xs); seg = []
        for a_, b_ in zip(xs, ys):
            if -1.9 <= b_ <= 1.9: seg.append(P.P(a_, b_))
            elif seg: o.append(poly(seg, stroke=col, w=3)); seg = []
        if seg: o.append(poly(seg, stroke=col, w=3))
        for a, b in zip(x, y): o.append(circ(*P.P(a, b), 5, BLUE, 'white', 1.5))
        tr = float(np.mean((np.polyval(c, x) - y) ** 2)); te = float(np.mean((np.polyval(c, xt) - yt) ** 2))
        errs.append((tr, te))
        o.append(t(P.x0 + 140, 30, title, 18, col, 'middle', 'bold'))
        o.append(t(P.x0 + 140, 284, f'erro treino {fmt(tr)} · erro teste ' + (fmt(te) if te < 10 else 'enorme'), 15, TXT, 'middle'))
    o.append(t(495, 312, 'pontos: 15 exemplos de treino com ruído · tracejado: a função verdadeira sin(πx)', 15, MUTED, 'middle', style='italic'))
    svg(990, 322, '\n'.join(o), 'polinomios')
    return errs


def f_vies_variancia():
    degs = list(range(0, 13)); R_ = 200
    xt, yt = poly_data(999, 400)
    TR = np.zeros((R_, len(degs))); TE = np.zeros((R_, len(degs)))
    for s_ in range(R_):
        x, y = poly_data(s_)
        for i, d in enumerate(degs):
            c = fit(x, y, d)
            TR[s_, i] = np.mean((np.polyval(c, x) - y) ** 2); TE[s_, i] = np.mean((np.polyval(c, xt) - yt) ** 2)
    tr, te = np.median(TR, 0), np.median(TE, 0); R = R_
    L = lambda v: math.log10(max(v, 0.01))
    P = Plane(80, 30, 620, 270, (0, 12), (-2, 1))
    o = [axes(P, 'grau do polinômio (capacidade do modelo)', (0, 3, 6, 9, 12))]
    for v, lab in ((-2, '0,01'), (-1, '0,1'), (0, '1'), (1, '10')):
        o.append(t(P.x0 - 8, P.Y(v) + 5, lab, 15, MUTED, 'end'))
    o.append(poly([P.P(d, L(v)) for d, v in zip(degs, tr)], stroke=BLUE, w=3))
    o.append(poly([P.P(d, min(L(v), 1)) for d, v in zip(degs, te)], stroke=ORANGE, w=3))
    best = int(np.argmin(te))
    o.append(line(P.X(best), P.y0, P.X(best), P.y0 + P.h, GREEN, 2, '6 5'))
    o.append(t(P.X(best) + 8, P.y0 + 20, f'melhor: grau {best}', 15, GREEN, weight='bold'))
    o.append(t(P.X(0.3), P.y0 + 20, '← underfitting', 15, MUTED))
    o.append(t(P.X(11.7), P.y0 + 20, 'overfitting →', 15, MUTED, 'end'))
    o.append(line(730, 80, 760, 80, BLUE, 3)); o.append(t(770, 86, 'erro de treino', 16, BLUE, weight='bold'))
    o.append(line(730, 116, 760, 116, ORANGE, 3)); o.append(t(770, 122, 'erro de teste', 16, ORANGE, weight='bold'))
    o.append(t(730, 170, f'mediana de {R} sorteios', 15, MUTED))
    o.append(t(730, 214, 'erro em escala log', 15, MUTED))
    o.append(t(730, 192, 'de 15 pontos cada', 15, MUTED))
    svg(920, 345, '\n'.join(o), 'vies_variancia')
    return best


# ------------------------------------------------------------ curvas reais de treino e validação
def curve_panel(P, hist, epochs=None, legend=True):
    h = np.array(hist)[:epochs]
    ep = np.arange(1, len(h) + 1)
    o = [poly([P.P(e, min(v, P.yr[1])) for e, v in zip(ep, h[:, 0])], stroke=BLUE, w=3),
         poly([P.P(e, min(v, P.yr[1])) for e, v in zip(ep, h[:, 1])], stroke=ORANGE, w=3)]
    return o


def f_curvas():
    h = np.array(DATA['overfit']); E = len(h)
    P = Plane(80, 30, 640, 280, (0, E), (0, 1.5))
    o = [axes(P, 'época', (0, 20, 40, 60), (0.0, 0.5, 1.0, 1.5))]
    o += curve_panel(P, h)
    best = int(np.argmin(h[:, 1])) + 1
    o.append(line(P.X(best), P.y0, P.X(best), P.y0 + P.h, GREEN, 2, '6 5'))
    o.append(circ(*P.P(best, h[best - 1, 1]), 7, GREEN, 'white', 2))
    o.append(t(P.X(best) + 10, P.y0 + 22, f'menor perda de validação: época {best}', 15, GREEN, weight='bold'))
    o.append(line(750, 80, 780, 80, BLUE, 3)); o.append(t(790, 86, 'treino', 16, BLUE, weight='bold'))
    o.append(line(750, 116, 780, 116, ORANGE, 3)); o.append(t(790, 122, 'validação', 16, ORANGE, weight='bold'))
    o.append(t(750, 180, 'MLP 784 → 256 → 256 → 10', 15, MUTED))
    o.append(t(750, 202, '2.000 imagens do MNIST', 15, MUTED))
    o.append(t(750, 224, 'Adam, η = 0,001', 15, MUTED))
    o.append(t(750, 266, f'treino no fim: {fmt(h[-1, 0], 3)}', 15, BLUE))
    o.append(t(750, 288, f'validação no fim: {fmt(h[-1, 1])}', 15, ORANGE))
    svg(960, 375, '\n'.join(o), 'curvas_treino')
    return best, h[best - 1, 1], h[-1, 1]


# ------------------------------------------------------------ weight decay: histograma dos pesos
def f_weight_decay():
    o = []
    hb, hw = np.array(DATA['w_base'], float), np.array(DATA['w_wd'], float)
    mx = max(hb.max(), hw.max())
    sd = DATA['w_std']
    for k, (h, title, col, s) in enumerate(((hb, 'Sem weight decay', BLUE, sd[0]), (hw, 'Com weight decay', GREEN, sd[1]))):
        P = Plane(40 + k * 470, 46, 420, 220, (-0.3, 0.3), (0, 1))
        o.append(axes(P, 'valor do peso', (-0.3, 0.0, 0.3)))
        bw = P.w / len(h)
        for i, v in enumerate(h / mx):
            if v > 0.002:
                o.append(f'<rect x="{P.x0 + i * bw:.1f}" y="{P.Y(v):.1f}" width="{bw - 1:.1f}" height="{v * P.h:.1f}" fill="{col}" opacity="0.85"/>')
        o.append(t(P.x0 + 210, 30, title, 18, col, 'middle', 'bold'))
        o.append(t(P.x0 + 210, 336, f'desvio padrão dos pesos: {fmt(s, 3)}', 16, TXT, 'middle', 'bold'))
    svg(940, 350, '\n'.join(o), 'weight_decay')


# ------------------------------------------------------------ dropout
def f_dropout():
    o = []
    layers = [4, 6, 6, 3]
    r = np.random.default_rng(7)
    masks = [[r.random(6) > 0.5 for _ in range(2)] for _ in range(2)]
    for k in range(2):
        ox = 40 + k * 480; W, H = 400, 300
        xs = [ox + 30 + i * (W - 60) / (len(layers) - 1) for i in range(len(layers))]
        pos_ = [[(xs[i], 70 + (H - 60) * (j + 0.5) / n) for j in range(n)] for i, n in enumerate(layers)]
        off = [[False] * 4] + [list(~m) for m in masks[k]] + [[False] * 3]
        for i in range(len(layers) - 1):
            for a, pa in enumerate(pos_[i]):
                for b, pb in enumerate(pos_[i + 1]):
                    dead = off[i][a] or off[i + 1][b]
                    if not dead:
                        o.append(line(*pa, *pb, '#9fb7cc', 1.2))
        for i, col in enumerate(pos_):
            for j, p in enumerate(col):
                if off[i][j]:
                    o.append(circ(*p, 14, '#f3f4f6', '#c4cad1', 1.5))
                    o.append(line(p[0] - 9, p[1] - 9, p[0] + 9, p[1] + 9, RED, 2.5)); o.append(line(p[0] - 9, p[1] + 9, p[0] + 9, p[1] - 9, RED, 2.5))
                else:
                    o.append(circ(*p, 14, FILL, BLUE, 2))
        o.append(t(ox + W / 2, 34, f'iteração {k + 1}: outro sorteio', 18, BLUE, 'middle', 'bold'))
    o.append(t(480, 395, 'Em cada batch, cada neurônio oculto é desligado com probabilidade p (aqui, 0,5).', 15, MUTED, 'middle', style='italic'))
    svg(960, 410, '\n'.join(o), 'dropout')


# ------------------------------------------------------------ data augmentation
def digit(a, x0, y0, s):
    a = np.array(a); o = []
    o.append(rect(x0, y0, 28 * s, 28 * s, 'white', '#c4cad1', 1, 2))
    for i in range(28):
        for j in range(28):
            v = a[i, j]
            if v > 0.06:
                g = int(255 * (1 - v))
                o.append(f'<rect x="{x0 + j * s:.1f}" y="{y0 + i * s:.1f}" width="{s + 0.3:.1f}" height="{s + 0.3:.1f}" fill="rgb({g},{g},{g})"/>')
    return ''.join(o)


def f_augmentation():
    imgs = DATA['aug']; desc = DATA['aug_desc']
    big, s = 8.0, 4.6; size = 28 * s; gap = 26
    o = [digit(imgs[0], 20, 46, big)]
    o.append(t(20 + 14 * big, 30, 'original', 17, BLUE, 'middle', 'bold'))
    o.append(t(20 + 14 * big, 46 + 28 * big + 24, f'rótulo: {DATA["aug_label"]}', 15, MUTED, 'middle'))
    o.append(t(20 + 28 * big + 40, 46 + 14 * big + 12, '→', 40, GRAY, 'middle'))
    x0 = 20 + 28 * big + 80
    for i, ((ang, dx, dy, sc), im) in enumerate(zip(desc, imgs[1:])):
        parts = []
        if ang: parts.append(f'gira {ang:+d}°')
        if dx or dy: parts.append(f'desloca ({dx:+d}, {dy:+d})')
        if sc != 1: parts.append(f'escala {fmt(sc, 1)}')
        x = x0 + (i % 3) * (size + gap + 40); y = 30 + (i // 3) * (size + 56)
        o.append(digit(im, x, y, s))
        o.append(t(x + size / 2, y + size + 20, ' + '.join(parts) if len(parts) < 3 else 'as três juntas', 15, MUTED, 'middle'))
    svg(int(x0 + 3 * (size + gap + 40) - 30), int(30 + 2 * (size + 56)), '\n'.join(o), 'augmentation')


# ------------------------------------------------------------ BatchNorm
def f_batchnorm():
    Z = [np.array(z) for z in DATA['bn_raw']]
    cols = [BLUE, ORANGE, PURPLE]
    o = []
    for k, (title, data, xr) in enumerate((('Antes: cada neurônio numa escala', Z, (-6, 14)),
                                          ('Depois do BatchNorm: média 0, desvio 1', [(z - z.mean()) / (z.std() + 1e-5) for z in Z], (-4, 4)))):
        P = Plane(30 + k * 480, 46, 420, 230, xr, (0, 1))
        o.append(axes(P, 'pré-ativação', (xr[0], 0, xr[1])))
        if xr[0] < 0 < xr[1]: o.append(line(P.X(0), P.y0, P.X(0), P.y0 + P.h, '#c4cad1', 1))
        bins = np.linspace(*xr, 41)
        hs = [np.histogram(z, bins)[0] for z in data]; mx = max(h.max() for h in hs)
        for h, c in zip(hs, cols):
            pts = [(P.x0, P.Y(0))]
            for i, v in enumerate(h / mx):
                xa, xb = P.X(bins[i]), P.X(bins[i + 1])
                pts += [(xa, P.Y(v)), (xb, P.Y(v))]
            pts.append((P.x0 + P.w, P.Y(0)))
            o.append(polygon(pts, c, c, 0.28, 1.5))
        o.append(t(P.x0 + 210, 30, title, 18, BLUE, 'middle', 'bold'))
    means = [z.mean() for z in Z]; sds = [z.std() for z in Z]
    for i, (m, s_, c) in enumerate(zip(means, sds, cols)):
        o.append(t(170 + i * 310, 350, f'neurônio {i + 1}: média {fmt(m, 1)}, desvio {fmt(s_, 1)}', 15, c, 'middle', 'bold'))
    svg(960, 362, '\n'.join(o), 'batchnorm')


# ------------------------------------------------------------ comparação das regularizações
def f_comparacao():
    cfg = [('overfit', 'sem regularização', ORANGE), ('weight_decay', 'weight decay', BLUE), ('dropout', 'dropout 0,5', GREEN)]
    P = Plane(80, 20, 620, 250, (0, 60), (0.2, 0.7))
    o = [axes(P, 'época', (0, 20, 40, 60), (0.2, 0.4, 0.6))]
    for k, (key, lab, col) in enumerate(cfg):
        h = np.array(DATA[key]); ep = np.arange(1, len(h) + 1)
        o.append(poly([P.P(e, min(v, 0.7)) for e, v in zip(ep, h[:, 1])], stroke=col, w=3))
        b = int(np.argmin(h[:, 1]))
        o.append(circ(*P.P(b + 1, h[b, 1]), 6, col, 'white', 2))
        o.append(line(740, 60 + k * 36, 770, 60 + k * 36, col, 3)); o.append(t(780, 66 + k * 36, lab, 16, col, weight='bold'))
    o.append(t(740, 190, 'perda de validação por época', 15, MUTED))
    o.append(t(740, 212, 'ponto: a melhor época', 15, MUTED))
    svg(940, 315, '\n'.join(o), 'comparacao')


# ------------------------------------------------------------ quest: quatro pacientes
def f_pacientes():
    runs = [('A', 'lr_alto', 2.5), ('B', 'overfit', 1.2), ('C', 'under', 2.5), ('D', 'dropout_forte', 2.5)]
    o = []
    for k, (lab, key, ymax) in enumerate(runs):
        h = np.array(DATA[key])[:30]
        P = Plane(40 + k * 240, 46, 200, 170, (0, 30), (0, ymax))
        o.append(axes(P, 'época'))
        o += curve_panel(P, h)
        o.append(t(P.x0 + 100, 30, f'Paciente {lab}', 18, PURPLE, 'middle', 'bold'))
    o.append(line(330, 272, 360, 272, BLUE, 3)); o.append(t(368, 278, 'perda de treino', 16, BLUE, weight='bold'))
    o.append(line(560, 272, 590, 272, ORANGE, 3)); o.append(t(598, 278, 'perda de validação', 16, ORANGE, weight='bold'))
    svg(990, 290, '\n'.join(o), 'pacientes')


# ------------------------------------------------------------ síntese
def f_resumo():
    o = []
    P, oo = rav_plane(40, 46, 280, 200); oo[0] = P.frame('', ''); o += oo
    o += draw_path(P, opt_path('adam', 40), GREEN)
    o.append(t(180, 30, 'Descer bem', 18, BLUE, 'middle', 'bold'))
    o.append(t(180, 280, 'momentum, Adam, schedule, inicialização', 15, MUTED, 'middle'))
    h = np.array(DATA['overfit'])
    Q = Plane(370, 46, 280, 200, (0, 60), (0, 1.5)); o.append(Q.frame('', '')); o += curve_panel(Q, h)
    best = int(np.argmin(h[:, 1])) + 1
    o.append(line(Q.X(best), Q.y0, Q.X(best), Q.y0 + Q.h, GREEN, 2, '6 5'))
    o.append(t(510, 30, 'Medir no lugar certo', 18, ORANGE, 'middle', 'bold'))
    o.append(t(510, 280, 'treino, validação e teste separados', 15, MUTED, 'middle'))
    r = np.random.default_rng(3)
    for i in range(3):
        for j in range(4):
            x, y = 740 + i * 80, 80 + j * 45
            off = r.random() < 0.35 and i == 1
            o.append(circ(x, y, 13, '#f3f4f6' if off else FILL, '#c4cad1' if off else BLUE, 2))
            if off: o.append(line(x - 8, y - 8, x + 8, y + 8, RED, 2.5)); o.append(line(x - 8, y + 8, x + 8, y - 8, RED, 2.5))
    o.append(t(820, 30, 'Atrapalhar de propósito', 18, GREEN, 'middle', 'bold'))
    o.append(t(820, 280, 'weight decay, dropout, augmentation', 15, MUTED, 'middle'))
    svg(990, 295, '\n'.join(o), 'resumo')


if __name__ == '__main__':
    d = f_ravina(); dist = f_otimizadores(); f_schedules(); f_init(); f_split()
    errs = f_polinomios(); best_deg = f_vies_variancia(); cv = f_curvas()
    f_weight_decay(); f_dropout(); f_augmentation(); f_batchnorm(); f_pacientes(); f_resumo(); f_comparacao()
    print('sgd dist', round(d, 3), 'dists', {k: round(v, 3) for k, v in dist.items()})
    print('polinomios', [tuple(round(v, 3) for v in e) for e in errs], 'melhor grau', best_deg, 'curvas', cv)
