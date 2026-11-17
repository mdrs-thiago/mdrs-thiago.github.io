# Gera as figuras SVG da Aula 01 (Tópicos A 2027.1) em slides/img/aula01/.
# Uso: python aula01_figuras_svg.py <pasta_dados> <pasta_png> <pasta_saida>
# <pasta_dados> e <pasta_png> saem do notebook notebooks/aula01_figuras.ipynb.
import sys, json, math, base64, numpy as np

DATA, PNG, OUT = sys.argv[1:4]
BLUE, LBLUE, RED, GREEN, ORANGE, PURPLE = '#004b87', '#007bc0', '#e53e3e', '#047857', '#d97706', '#6d28d9'
GRAY, TXT, MUTED, FILL = '#9aa5b1', '#333333', '#666666', '#e6f0f8'
FONT = "Segoe UI, Calibri, Arial, sans-serif"
SUB = str.maketrans('0123456789', '₀₁₂₃₄₅₆₇₈₉')


def svg(w, h, body, name):
    s = (f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
         f'viewBox="0 0 {w} {h}" width="{w}" height="{h}" font-family="{FONT}" font-size="16" fill="{TXT}">\n'
         f'<defs>'
         f'<marker id="a" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse" viewBox="0 0 10 10"><path d="M0,0 L10,5 L0,10 z" fill="{BLUE}"/></marker>'
         f'<marker id="ag" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse" viewBox="0 0 10 10"><path d="M0,0 L10,5 L0,10 z" fill="{GRAY}"/></marker>'
         f'<marker id="ao" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse" viewBox="0 0 10 10"><path d="M0,0 L10,5 L0,10 z" fill="{ORANGE}"/></marker>'
         f'<marker id="ar" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse" viewBox="0 0 10 10"><path d="M0,0 L10,5 L0,10 z" fill="{RED}"/></marker>'
         f'</defs>\n{body}\n</svg>\n')
    open(f'{OUT}/{name}.svg', 'w').write(s)


def t(x, y, s, size=16, fill=TXT, anchor='start', weight='normal', style='normal', extra=''):
    size = max(size, 15)  # piso para o texto continuar legível no slide
    return (f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" '
            f'font-weight="{weight}" font-style="{style}" {extra}>{str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")}</text>')


def line(x1, y1, x2, y2, c=BLUE, w=2, dash=None, marker=None, op=1):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    m = f' marker-end="url(#{marker})"' if marker else ''
    return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{c}" stroke-width="{w}" opacity="{op}"{d}{m}/>'


def circ(x, y, r, fill=FILL, stroke=BLUE, w=2):
    return f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{w}"/>'


def rect(x, y, w, h, fill=FILL, stroke=BLUE, sw=2, rx=6, op=1):
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" opacity="{op}"/>'


def poly(pts, fill='none', stroke=BLUE, w=2, op=1, dash=None):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    p = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    return f'<polyline points="{p}" fill="{fill}" stroke="{stroke}" stroke-width="{w}" opacity="{op}"{d} stroke-linejoin="round"/>'


def polygon(pts, fill, stroke='none', op=1, w=1):
    p = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    return f'<polygon points="{p}" fill="{fill}" stroke="{stroke}" stroke-width="{w}" opacity="{op}"/>'


def img(path, x, y, w, h, extra=''):
    b = base64.b64encode(open(path, 'rb').read()).decode()
    return f'<image x="{x:.1f}" y="{y:.1f}" width="{w}" height="{h}" xlink:href="data:image/png;base64,{b}" href="data:image/png;base64,{b}" style="image-rendering:pixelated" {extra}/>'


def pos(x, y, s=9):  # classe 1: círculo azul
    return f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{s}" fill="{BLUE}" stroke="white" stroke-width="1.5"/>'


def neg(x, y, s=9):  # classe 0: quadrado vermelho
    return f'<rect x="{x-s:.1f}" y="{y-s:.1f}" width="{2*s}" height="{2*s}" fill="{RED}" stroke="white" stroke-width="1.5"/>'


class Plane:
    """Mapeia coordenadas de dados para a tela."""
    def __init__(self, x0, y0, w, h, xr, yr):
        self.x0, self.y0, self.w, self.h, self.xr, self.yr = x0, y0, w, h, xr, yr

    def X(self, x): return self.x0 + (x - self.xr[0]) / (self.xr[1] - self.xr[0]) * self.w
    def Y(self, y): return self.y0 + self.h - (y - self.yr[0]) / (self.yr[1] - self.yr[0]) * self.h
    def P(self, x, y): return (self.X(x), self.Y(y))

    def frame(self, xl='x₁', yl='x₂', ticks=False, axes0=False):
        o = [rect(self.x0, self.y0, self.w, self.h, fill='none', stroke='#d0d5db', sw=1, rx=0)]
        if axes0:
            if self.xr[0] < 0 < self.xr[1]: o.append(line(self.X(0), self.y0, self.X(0), self.y0 + self.h, '#c4cad1', 1))
            if self.yr[0] < 0 < self.yr[1]: o.append(line(self.x0, self.Y(0), self.x0 + self.w, self.Y(0), '#c4cad1', 1))
        o.append(t(self.x0 + self.w - 4, self.y0 + self.h + 20, xl, 15, MUTED, 'end'))
        o.append(t(self.x0 - 8, self.y0 + 14, yl, 15, MUTED, 'end'))
        return ''.join(o)

    def clip_line(self, a, b, c):
        """Segmento de a*x + b*y + c = 0 dentro da janela."""
        (x0, x1), (y0, y1) = self.xr, self.yr
        pts = []
        if abs(b) > 1e-12:
            for x in (x0, x1):
                y = -(a * x + c) / b
                if y0 - 1e-9 <= y <= y1 + 1e-9: pts.append((x, y))
        if abs(a) > 1e-12:
            for y in (y0, y1):
                x = -(b * y + c) / a
                if x0 - 1e-9 <= x <= x1 + 1e-9: pts.append((x, y))
        pts = sorted(set((round(p[0], 9), round(p[1], 9)) for p in pts))
        return pts[0], pts[-1]

    def halfplane(self, a, b, c, positive=True):
        """Polígono da região a*x+b*y+c >= 0 (ou <= 0) dentro da janela."""
        (x0, x1), (y0, y1) = self.xr, self.yr
        poly_ = [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]
        s = 1 if positive else -1
        f = lambda p: s * (a * p[0] + b * p[1] + c)
        out = []
        for i in range(4):
            p, q = poly_[i], poly_[(i + 1) % 4]
            fp, fq = f(p), f(q)
            if fp >= 0: out.append(p)
            if fp * fq < 0:
                r = fp / (fp - fq); out.append((p[0] + r * (q[0] - p[0]), p[1] + r * (q[1] - p[1])))
        return [self.P(*p) for p in out]

    def seg(self, a, b, c, col=BLUE, w=3, dash=None):
        p, q = self.clip_line(a, b, c)
        return line(*self.P(*p), *self.P(*q), col, w, dash)


def neuron_node(x, y, label, r=24, fill=FILL, stroke=BLUE, size=18):
    return circ(x, y, r, fill, stroke) + t(x, y + 6, label, size, TXT, 'middle')


# ---------------------------------------------------------------- F1: duas formas
def f_pipeline():
    o = []
    d4 = f'{PNG}/digit_4_0.png'
    for row, y in ((0, 30), (1, 200)):
        o.append(img(d4, 20, y + 10, 100, 100))
        o.append(line(130, y + 60, 190, y + 60, BLUE, 2.5, marker='a'))
        o.append(line(820, y + 60, 880, y + 60, BLUE, 2.5, marker='a'))
        o.append(t(940, y + 75, '“4”', 40, BLUE, 'middle', 'bold'))
    # linha 1: features à mão
    o.append(rect(200, 40, 330, 100, '#fffbeb', ORANGE))
    o.append(t(365, 68, 'Features escritas à mão', 18, ORANGE, 'middle', 'bold'))
    o.append(t(365, 94, 'nº de laços fechados, traço vertical', 15, TXT, 'middle'))
    o.append(t(365, 116, 'à direita, proporção altura/largura…', 15, TXT, 'middle'))
    o.append(line(540, 90, 600, 90, BLUE, 2.5, marker='a'))
    o.append(rect(610, 50, 200, 80))
    o.append(t(710, 86, 'Classificador', 18, BLUE, 'middle', 'bold'))
    o.append(t(710, 110, '(aprendido)', 15, MUTED, 'middle'))
    # linha 2: rede
    o.append(rect(200, 196, 610, 128, '#f0fdf4', GREEN))
    xs = [260, 400, 540, 680]
    labs = ['pixels', 'traços', 'partes', 'dígito']
    for i, x in enumerate(xs):
        n = [6, 5, 4, 3][i]
        for k in range(n):
            yy = 268 + (k - (n - 1) / 2) * 13
            o.append(circ(x, yy, 5, 'white', GREEN, 1.5))
        o.append(t(x, 316, labs[i], 14, GREEN, 'middle'))
        if i < 3: o.append(line(x + 18, 268, xs[i + 1] - 18, 268, GREEN, 1.5, marker=None))
    o.append(t(505, 222, 'Rede neural: as features também são aprendidas', 16, GREEN, 'middle', 'bold'))
    o.append(t(20, 22, 'Aprendizado de máquina clássico', 17, ORANGE, weight='bold'))
    o.append(t(20, 182, 'Deep learning', 17, GREEN, weight='bold'))
    svg(1000, 335, '\n'.join(o), 'pipeline')


# ---------------------------------------------------------------- F2: o que a rede aprende
def f_pesos_mlp():
    o = []
    acc = json.load(open(f'{DATA}/data.json'))['mlp_acc']
    W = np.load(f'{DATA}/mlp_w1.npy')
    # escolhe 8 neurônios mais "estruturados" (maior suavidade espacial relativa)
    sc = []
    for i, r in enumerate(W):
        a = r.reshape(28, 28); v = np.abs(a).sum() + 1e-9
        rough = np.abs(np.diff(a, axis=0)).sum() + np.abs(np.diff(a, axis=1)).sum()
        sc.append(rough / v)
    idx = sorted(np.argsort(sc)[:8])
    for j, i in enumerate(idx):
        x = 20 + (j % 4) * 130; y = 20 + (j // 4) * 135
        o.append(img(f'{PNG}/mlp_w{i:02d}.png', x, y, 112, 112))
        o.append(f'<rect x="{x}" y="{y}" width="112" height="112" fill="none" stroke="#d0d5db"/>')
        o.append(t(x + 56, y + 128, f'neurônio {j+1}', 13, MUTED, 'middle'))
    # legenda
    o.append(rect(560, 30, 22, 22, BLUE, 'none', rx=3)); o.append(t(592, 47, 'peso positivo: pixel aceso aumenta a ativação', 15))
    o.append(rect(560, 64, 22, 22, RED, 'none', rx=3)); o.append(t(592, 81, 'peso negativo: pixel aceso diminui', 15))
    o.append(t(560, 130, 'Rede 784 → 16 → 10 treinada no MNIST', 15, TXT, weight='bold'))
    o.append(t(560, 154, f'(acurácia no teste: {acc*100:.1f}%)'.replace('.', ','), 15, MUTED))
    o.append(t(560, 196, 'Cada quadrado são os 784 pesos de um', 15))
    o.append(t(560, 218, 'neurônio oculto, redesenhados como', 15))
    o.append(t(560, 240, 'imagem 28 × 28. Ninguém os escreveu:', 15))
    o.append(t(560, 262, 'saíram do treino.', 15))
    svg(990, 300, '\n'.join(o), 'pesos_mlp')


# ---------------------------------------------------------------- F3: por que agora
def f_agora():
    o = []
    ev = [(1943, 'McCulloch & Pitts', 'neurônio lógico'), (1958, 'Rosenblatt', 'perceptron'),
          (1969, 'Minsky & Papert', 'limites do perceptron'), (1986, 'Rumelhart, Hinton, Williams', 'backpropagation'),
          (2012, 'Krizhevsky et al.', 'AlexNet vence o ImageNet')]
    X = lambda yr: 40 + (yr - 1940) / (2015 - 1940) * 560
    o.append(line(30, 150, 620, 150, BLUE, 3))
    for i, (yr, who, what) in enumerate(ev):
        x = X(yr); up = i % 2 == 0
        o.append(circ(x, 150, 7, BLUE if yr != 2012 else ORANGE, 'white', 2))
        y0 = 108 if up else 192
        o.append(line(x, 150 + (-8 if up else 8), x, y0 + (8 if up else -18), GRAY, 1))
        o.append(t(x, y0 - 34 if up else y0 + 2, str(yr), 18, BLUE if yr != 2012 else ORANGE, 'middle', 'bold'))
        o.append(t(x, y0 - 14 if up else y0 + 22, who, 13.5, TXT, 'middle'))
        o.append(t(x, y0 + 2 if up else y0 + 40, what, 13.5, MUTED, 'middle'))
    # barras ImageNet
    bx, by, bh = 680, 50, 200
    o.append(t(bx, 26, 'ImageNet: erro top-5 do vencedor', 16, TXT, weight='bold'))
    bars = [('2010', 28.2, BLUE), ('2011', 25.8, BLUE), ('2012', 15.3, ORANGE)]
    for i, (lab, v, c) in enumerate(bars):
        x = bx + 20 + i * 95; h = v / 30 * bh
        o.append(rect(x, by + bh - h, 60, h, c, 'none', rx=2))
        o.append(t(x + 30, by + bh - h - 8, f'{v:.1f}%'.replace('.', ','), 16, c, 'middle', 'bold'))
        o.append(t(x + 30, by + bh + 22, lab, 15, TXT, 'middle'))
    o.append(line(bx, by + bh, bx + 300, by + bh, GRAY, 1))
    o.append(t(bx + 20 + 2 * 95 + 30, by + bh + 42, 'AlexNet (2º: 26,2%)', 13.5, ORANGE, 'middle'))
    svg(1000, 320, '\n'.join(o), 'por_que_agora')


# ---------------------------------------------------------------- F4: McCulloch & Pitts
def f_mp():
    o = []
    for k, (name, th, col) in enumerate((('AND', 2, BLUE), ('OR', 1, GREEN))):
        ox = k * 470
        o.append(t(ox + 20, 26, f'{name}: dispara se x₁ + x₂ ≥ {th}', 18, col, weight='bold'))
        o.append(neuron_node(ox + 50, 80, 'x₁')); o.append(neuron_node(ox + 50, 170, 'x₂'))
        o.append(line(ox + 76, 86, ox + 176, 116, col, 2.5, marker='a'))
        o.append(line(ox + 76, 164, ox + 176, 134, col, 2.5, marker='a'))
        o.append(t(ox + 120, 88, '1', 15, MUTED)); o.append(t(ox + 120, 172, '1', 15, MUTED))
        o.append(circ(ox + 210, 125, 32, FILL, col)); o.append(t(ox + 210, 131, f'≥ {th}', 18, TXT, 'middle'))
        o.append(line(ox + 244, 125, ox + 290, 125, col, 2.5, marker='a'))
        o.append(t(ox + 302, 131, 'y', 20, TXT, style='italic'))
        # tabela
        tx = ox + 330
        rows = [(0, 0), (0, 1), (1, 0), (1, 1)]
        o.append(t(tx + 20, 62, 'x₁ x₂', 14, MUTED, 'middle')); o.append(t(tx + 85, 62, 'soma', 14, MUTED, 'middle')); o.append(t(tx + 125, 62, 'y', 14, MUTED, 'middle', style='italic'))
        for i, (a, b) in enumerate(rows):
            y = 88 + i * 28; s = a + b; on = s >= th
            o.append(t(tx + 20, y, f'{a}  {b}', 16, TXT, 'middle'))
            o.append(t(tx + 85, y, str(s), 16, TXT, 'middle'))
            o.append(t(tx + 125, y, '1' if on else '0', 16, col if on else MUTED, 'middle', 'bold'))
    svg(940, 210, '\n'.join(o), 'mcculloch_pitts')


# ---------------------------------------------------------------- F5: Mark I
def f_mark1():
    o = []
    # retina
    o.append(t(20, 24, 'Retina', 17, BLUE, weight='bold'))
    gx, gy, cs = 20, 40, 9
    on = set()
    for r in range(20):
        for c in range(20):
            # um "C" desenhado na retina
            rr, cc = r - 9.5, c - 9.5
            d = math.hypot(rr, cc)
            if 5 < d < 8 and not (cc > 3 and abs(rr) < 4): on.add((r, c))
    for r in range(20):
        for c in range(20):
            o.append(f'<rect x="{gx+c*cs}" y="{gy+r*cs}" width="{cs-1}" height="{cs-1}" fill="{BLUE if (r,c) in on else "#eef2f6"}"/>')
    o.append(t(20 + 90, 240, '400 fotocélulas (20 × 20)', 14, MUTED, 'middle'))
    # unidades A
    ax = 430
    ays = [50 + i * 24 for i in range(8)]
    rng = np.random.default_rng(3)
    for y in ays:
        for _ in range(3):
            r, c = rng.integers(0, 20, 2)
            o.append(line(gx + c * cs + 4, gy + r * cs + 4, ax - 10, y, GRAY, 0.8, op=0.7))
    for y in ays: o.append(circ(ax, y, 9, 'white', GREEN, 2))
    o.append(t(ax, 24, 'Unidades A', 17, GREEN, 'middle', 'bold'))
    o.append(t(ax, 240, '512 unidades', 14, MUTED, 'middle'))
    o.append(t(300, 270, 'conexões fixas e aleatórias', 14, MUTED, 'middle', style='italic'))
    # pesos + R
    rx, ry = 660, 135
    for y in ays:
        o.append(line(ax + 10, y, rx - 30, ry, ORANGE, 2))
    o.append(circ(rx, ry, 28, '#fffbeb', ORANGE)); o.append(t(rx, ry + 6, 'R', 20, ORANGE, 'middle', 'bold'))
    o.append(t(rx, 24, 'Unidades R', 17, ORANGE, 'middle', 'bold'))
    o.append(t(rx, 240, '8 respostas', 14, MUTED, 'middle'))
    o.append(t(545, 270, 'pesos ajustáveis', 14, ORANGE, 'middle', style='italic'))
    o.append(t(545, 290, '(potenciômetros girados por motores)', 13, MUTED, 'middle', style='italic'))
    o.append(line(rx + 30, ry, rx + 90, ry, ORANGE, 2.5, marker='ao'))
    o.append(t(rx + 100, ry + 6, '“C” ou “não C”', 16, TXT))
    svg(930, 300, '\n'.join(o), 'mark1')


# ---------------------------------------------------------------- F6: neurônio-base
def neuron_diagram(nums=None):
    """Diagrama de um neurônio. nums = dict com valores numéricos (x, w, b, z, y)."""
    o = []
    ys = [60, 150, 240] if nums is None else [85, 215]
    labels = ['x₁', 'x₂', 'x₃'] if nums is None else [f'x₁ = {nums["x"][0]}', f'x₂ = {nums["x"][1]}']
    sx, sy = 330, 150
    for i, y in enumerate(ys):
        if nums is None:
            o.append(neuron_node(60, y, labels[i]))
        else:
            o.append(rect(10, y - 22, 110, 44, FILL, BLUE)); o.append(t(65, y + 6, labels[i], 18, TXT, 'middle'))
        x0 = 86 if nums is None else 122
        o.append(line(x0, y, sx - 34, sy + (y - sy) * 0.18, BLUE, 2.5, marker='a'))
        wl = f'w{str(i+1).translate(SUB)}' if nums is None else f'w{str(i+1).translate(SUB)} = {nums["w"][i]}'
        mx, my = (x0 + sx - 34) / 2, (y + sy + (y - sy) * 0.18) / 2
        o.append(t(mx, my - 10, wl, 17, BLUE, 'middle', 'bold'))
    # bias
    o.append(line(sx, 290, sx, sy + 36, ORANGE, 2.5, marker='ao'))
    o.append(t(sx, 312, 'b' if nums is None else f'b = {nums["b"]}', 17, ORANGE, 'middle', 'bold'))
    o.append(circ(sx, sy, 32)); o.append(t(sx, sy + 9, 'Σ', 28, TXT, 'middle'))
    o.append(line(sx + 34, sy, 455, sy, BLUE, 2.5, marker='a'))
    o.append(t(415, sy - 12, 'z' if nums is None else f'z = {nums["z"]}', 17, TXT, 'middle', style='italic'))
    o.append(rect(462, sy - 32, 74, 64, '#f0fdf4', GREEN)); o.append(t(499, sy + 8, 'g', 24, GREEN, 'middle', style='italic'))
    o.append(line(538, sy, 600, sy, BLUE, 2.5, marker='a'))
    o.append(t(612, sy + 8, 'ŷ' if nums is None else f'ŷ = {nums["y"]}', 22, TXT))
    return '\n'.join(o)


def f_neuron():
    svg(700, 330, neuron_diagram(), 'neuronio')
    svg(720, 330, neuron_diagram({'x': ['−1', '2'], 'w': ['3', '−2'], 'b': '1', 'z': '−6', 'y': '0'}), 'neuronio_conta')


# ---------------------------------------------------------------- F8: a conta é uma reta
def f_reta():
    a, b, c = 3, -2, 1
    P = Plane(60, 20, 400, 400, (-3, 3), (-3, 3))
    o = [polygon(P.halfplane(a, b, c, True), '#e6f0f8'), polygon(P.halfplane(a, b, c, False), '#fdecec'), P.frame(axes0=True)]
    o.append(P.seg(a, b, c, GREEN, 3.5))
    # w normal
    x0 = (-0.2, (3 * -0.2 + 1) / 2)
    n = np.array([3, -2]) / math.hypot(3, 2) * 1.1
    o.append(line(*P.P(*x0), *P.P(x0[0] + n[0], x0[1] + n[1]), BLUE, 3, marker='a'))
    o.append(t(P.X(x0[0] + n[0]) + 8, P.Y(x0[1] + n[1]) + 18, 'w', 20, BLUE, weight='bold'))
    # pontos da conta
    o.append(neg(*P.P(-1, 2), 9)); o.append(t(P.X(-1.55), P.Y(2) + 32, '(−1, 2): z = −6 → ŷ = 0', 15, RED, 'middle', 'bold'))
    o.append(pos(*P.P(1, 1), 9)); o.append(t(P.X(1.8), P.Y(1) - 18, '(1, 1): z = 2 → ŷ = 1', 15, BLUE, 'middle', 'bold'))
    o.append(t(P.X(1.6), P.Y(-2.3), 'z > 0', 18, BLUE, 'middle', 'bold'))
    o.append(t(P.X(-2), P.Y(-0.6), 'z < 0', 18, RED, 'middle', 'bold'))
    o.append(t(P.X(1.3), P.Y(2.7), '3x₁ − 2x₂ + 1 = 0', 15, GREEN, 'end', 'bold'))
    svg(480, 450, '\n'.join(o), 'reta')


# ---------------------------------------------------------------- F9: o que w e b controlam
def f_wb():
    o = []
    cfg = [((1, 1, -1), 'w = (1, 1), b = −1', 'ponto de partida'),
           ((1, -0.4, -1), 'w = (1, −0,4), b = −1', 'mudar w gira a reta'),
           ((1, 1, 1), 'w = (1, 1), b = +1', 'mudar b desloca a reta')]
    for k, ((a, b, c), lab, sub) in enumerate(cfg):
        P = Plane(30 + k * 300, 40, 240, 240, (-2.5, 2.5), (-2.5, 2.5))
        o.append(polygon(P.halfplane(a, b, c, True), '#e6f0f8'))
        o.append(P.frame(axes0=True)); o.append(P.seg(a, b, c, GREEN, 3.5))
        if k > 0:
            a0, b0, c0 = cfg[0][0]; o.append(P.seg(a0, b0, c0, GRAY, 2, '6 5'))
        o.append(t(P.x0 + 120, 26, lab, 16, TXT, 'middle', 'bold'))
        o.append(t(P.x0 + 120, 312, sub, 15, MUTED, 'middle', style='italic'))
    svg(920, 325, '\n'.join(o), 'w_e_b')


# ---------------------------------------------------------------- F10: o perceptron aprendendo
def f_aprende():
    rng = np.random.default_rng(12)
    Xp = rng.normal([1.2, 1.4], 0.5, (7, 2)); Xn = rng.normal([-0.6, -0.3], 0.5, (7, 2))
    X = np.r_[Xp, Xn]; y = np.r_[np.ones(7), -np.ones(7)]
    w = np.array([-1.0, 0.5]); b = 0.5
    frames = [(w.copy(), b, None)]
    order = rng.permutation(14)
    for ep in range(10):
        changed = False
        for i in order:
            if y[i] * (X[i] @ w + b) <= 0:
                w = w + y[i] * X[i] * 0.5; b = b + y[i] * 0.5
                frames.append((w.copy(), b, i)); changed = True
        if not changed: break
    sel = [frames[0], frames[1], frames[2], frames[-1]] if len(frames) > 4 else frames
    o = []
    for k, (wk, bk, i) in enumerate(sel):
        P = Plane(20 + k * 245, 46, 210, 210, (-2, 2.6), (-2, 2.6))
        o.append(polygon(P.halfplane(wk[0], wk[1], bk, True), '#e6f0f8'))
        o.append(P.frame())
        if k > 0:
            wp, bp, _ = sel[k - 1]; o.append(P.seg(wp[0], wp[1], bp, GRAY, 2, '6 5'))
        o.append(P.seg(wk[0], wk[1], bk, GREEN, 3.5))
        for j, (p, yy) in enumerate(zip(X, y)):
            o.append((pos if yy > 0 else neg)(*P.P(*p), 7))
        nxt = sel[k + 1][2] if k + 1 < len(sel) else None
        if nxt is not None and k < len(sel) - 1:
            o.append(circ(*P.P(*X[nxt]), 14, 'none', ORANGE, 3))
        title = ['início', '1º erro corrigido', '2º erro corrigido', f'fim ({len(frames)-1} correções)'][k] if len(sel) == 4 else f'passo {k}'
        o.append(t(P.x0 + 105, 30, title, 16, TXT, 'middle', 'bold'))
    o.append(circ(30, 292, 9, 'none', ORANGE, 3)); o.append(t(46, 297, 'ponto classificado errado: é ele que move a reta no passo seguinte', 14, MUTED))
    o.append(line(560, 292, 590, 292, GRAY, 2, '6 5')); o.append(t(598, 297, 'reta anterior', 14, MUTED))
    svg(1000, 310, '\n'.join(o), 'perceptron_aprende')


# ---------------------------------------------------------------- F11: MNIST 0 vs 1
def f_mnist():
    h = json.load(open(f'{DATA}/data.json'))['perc_mnist']
    o = []
    bx, by, bw, bh = 60, 40, 420, 210
    ups = [r[3] for r in h[1:]]
    mx = 60
    o.append(t(bx, 24, 'Erros (= correções) do perceptron em cada época', 16, TXT, weight='bold'))
    for i, u in enumerate(ups):
        x = bx + 10 + i * 41; hh = u / mx * bh
        o.append(rect(x, by + bh - hh, 30, hh, BLUE, 'none', rx=2))
        o.append(t(x + 15, by + bh - hh - 6, str(u), 13, BLUE, 'middle'))
        o.append(t(x + 15, by + bh + 18, str(i + 1), 13, MUTED, 'middle'))
    o.append(line(bx, by + bh, bx + bw, by + bh, GRAY, 1))
    o.append(t(bx + bw / 2, by + bh + 40, 'época (uma passada pelas 12.665 imagens de treino)', 14, MUTED, 'middle'))
    # pesos
    o.append(t(560, 24, 'Os 784 pesos aprendidos', 16, TXT, weight='bold'))
    o.append(img(f'{PNG}/perc_weights.png', 560, 40, 168, 168))
    o.append(f'<rect x="560" y="40" width="168" height="168" fill="none" stroke="#d0d5db"/>')
    for j in range(3):
        o.append(img(f'{PNG}/digit_0_{j}.png', 750 + j * 50, 50, 44, 44))
        o.append(img(f'{PNG}/digit_1_{j}.png', 750 + j * 50, 150, 44, 44))
    o.append(rect(750, 108, 18, 18, RED, 'none', rx=3)); o.append(t(776, 123, 'puxa para “0”', 14, RED))
    o.append(rect(750, 208, 18, 18, BLUE, 'none', rx=3)); o.append(t(776, 223, 'puxa para “1”', 14, BLUE))
    te = h[1][2] * 2115
    o.append(t(560, 262, f'Erro no teste após 1 época: {round(te)} de 2.115 imagens', 15, GREEN, weight='bold'))
    o.append(t(560, 284, f'Treino sem erros na época 10', 15, GREEN, weight='bold'))
    svg(920, 300, '\n'.join(o), 'mnist_perceptron')


# ---------------------------------------------------------------- F12: XOR e retas
def xor_points(P, s=11):
    return neg(*P.P(0, 0), s) + pos(*P.P(0, 1), s) + pos(*P.P(1, 0), s) + neg(*P.P(1, 1), s)


def f_xor():
    o = []
    tries = [((1, 1, -0.5), (0, 0), (1, 1)), ((1, -1, 0.5), (1, 0), (0, 0)), ((0.2, 1, -0.6), (0, 0), (1, 0))]
    titles = ['erra (1, 1)', 'erra (1, 0)', 'erra (1, 0) e (1, 1)']
    for k, ((a, b, c), _, _) in enumerate(tries):
        P = Plane(40 + k * 300, 40, 220, 220, (-0.4, 1.4), (-0.4, 1.4))
        o.append(polygon(P.halfplane(a, b, c, True), '#e6f0f8'))
        o.append(P.frame()); o.append(P.seg(a, b, c, GREEN, 3))
        o.append(xor_points(P))
        for (px, py) in [(0, 0), (0, 1), (1, 0), (1, 1)]:
            lab = 1 if (px ^ py) else 0
            pred = 1 if a * px + b * py + c >= 0 else 0
            if lab != pred:
                o.append(circ(*P.P(px, py), 18, 'none', ORANGE, 3))
        o.append(t(P.x0 + 110, 26, f'tentativa {k+1}: {titles[k]}', 16, TXT, 'middle', 'bold'))
    o.append(t(40, 300, 'Região azul: o neurônio diz 1. Círculo laranja: ponto classificado errado.', 15, MUTED))
    svg(940, 310, '\n'.join(o), 'xor_tentativas')


# ---------------------------------------------------------------- F13: XOR em 3D
def f_xor3d():
    o = []
    # projeção oblíqua
    O = np.array([150, 330]); ex = np.array([230, 0]); ey = np.array([110, -80]); ez = np.array([0, -200])
    Pj = lambda x, y, z: tuple(O + x * ex + y * ey + z * ez)
    # cubo
    for a in (0, 1):
        for b in (0, 1):
            o.append(line(*Pj(0, a, b), *Pj(1, a, b), '#d0d5db', 1.2))
            o.append(line(*Pj(a, 0, b), *Pj(a, 1, b), '#d0d5db', 1.2))
            o.append(line(*Pj(a, b, 0), *Pj(a, b, 1), '#d0d5db', 1.2))
    # plano x1 + x2 - 2 x3 = 0.5, recortado ao cubo em x3
    pts = [(0.5, 0, 0), (1, 0, 0.25), (1, 1, 0.75), (0, 1, 0.25), (0, 0.5, 0)]
    o.append(polygon([Pj(*p) for p in pts], GREEN, GREEN, 0.18, 1.5))
    o.append(t(*np.add(Pj(1, 1, 0.75), (14, 4)), 'plano separador', 15, GREEN, weight='bold'))
    # pontos
    o.append(neg(*Pj(0, 0, 0), 10)); o.append(pos(*Pj(0, 1, 0), 10)); o.append(pos(*Pj(1, 0, 0), 10)); o.append(neg(*Pj(1, 1, 1), 10))
    o.append(t(*np.add(Pj(0, 0, 0), (-12, 26)), '(0, 0, 0)', 14, MUTED, 'middle'))
    o.append(t(*np.add(Pj(1, 0, 0), (0, 28)), '(1, 0, 0)', 14, MUTED, 'middle'))
    o.append(t(*np.add(Pj(0, 1, 0), (-50, 4)), '(0, 1, 0)', 14, MUTED, 'middle'))
    o.append(t(*np.add(Pj(1, 1, 1), (0, -18)), '(1, 1, 1)', 14, MUTED, 'middle'))
    o.append(t(*np.add(Pj(1.08, 0, 0), (0, 5)), 'x₁', 16, MUTED))
    o.append(t(*np.add(Pj(0, 1.12, 0), (0, 0)), 'x₂', 16, MUTED))
    o.append(t(*np.add(Pj(0, 0, 1.05), (-30, 0)), 'x₁·x₂', 16, ORANGE, weight='bold'))
    svg(640, 380, '\n'.join(o), 'xor_3d')


# ---------------------------------------------------------------- F14: rede do XOR + duas retas
def f_xor_rede():
    o = []
    # rede
    N = {'x1': (50, 70), 'x2': (50, 230), 'h1': (230, 70), 'h2': (230, 230), 'y': (400, 150)}
    E = [('x1', 'h1', '1', BLUE), ('x2', 'h1', '1', BLUE), ('x1', 'h2', '1', PURPLE), ('x2', 'h2', '1', PURPLE), ('h1', 'y', '+1', GREEN), ('h2', 'y', '−1', RED)]
    for a, b, w, c in E:
        (x1, y1), (x2, y2) = N[a], N[b]
        d = math.hypot(x2 - x1, y2 - y1); ux, uy = (x2 - x1) / d, (y2 - y1) / d
        o.append(line(x1 + ux * 26, y1 + uy * 26, x2 - ux * 30, y2 - uy * 30, c, 2.5))
        tx, ty = x1 + (x2 - x1) * 0.32, y1 + (y2 - y1) * 0.32
        o.append(t(tx + (0 if a == 'x1' and b == 'h1' else 0), ty - 8, w, 15, c, 'middle', 'bold'))
    for k, (x, y) in N.items():
        lab = {'x1': 'x₁', 'x2': 'x₂', 'h1': 'h₁', 'h2': 'h₂', 'y': 'ŷ'}[k]
        o.append(neuron_node(x, y, lab, 26, FILL, {'h1': BLUE, 'h2': PURPLE}.get(k, BLUE)))
    o.append(t(230, 30, 'b = −0,5 (OR)', 15, BLUE, 'middle', 'bold'))
    o.append(t(230, 282, 'b = −1,5 (AND)', 15, PURPLE, 'middle', 'bold'))
    o.append(t(400, 196, 'b = −0,5', 15, GREEN, 'middle', 'bold'))
    # plano
    P = Plane(520, 30, 240, 240, (-0.4, 1.4), (-0.4, 1.4))
    band = P.halfplane(1, 1, -0.5, True)
    o.append(polygon(P.halfplane(1, 1, -0.5, True), '#e6f0f8'))
    o.append(polygon(P.halfplane(1, 1, -1.5, True), 'white'))
    o.append(P.frame())
    o.append(P.seg(1, 1, -0.5, BLUE, 3)); o.append(P.seg(1, 1, -1.5, PURPLE, 3))
    o.append(xor_points(P))
    o.append(t(P.X(-0.32), P.Y(0.62), 'h₁', 17, BLUE, weight='bold'))
    o.append(t(P.X(0.48), P.Y(1.25), 'h₂', 17, PURPLE, weight='bold'))
    o.append(t(P.x0 + 120, 312, 'ŷ = 1 na faixa entre as duas retas', 15, MUTED, 'middle'))
    svg(790, 322, '\n'.join(o), 'xor_rede')


# ---------------------------------------------------------------- F15: dobras em 1D (4 passos)
def f_dobras():
    units = [(1.0, -0.4, 1.2, BLUE), (-1.0, 1.0, 0.8, GREEN), (1.0, -1.5, -2.5, ORANGE)]
    b0 = 0.3
    xs = np.linspace(0, 2, 201)
    relu = lambda z: np.maximum(z, 0)
    panels = [('1. Três retas', [(a * xs + c, col) for a, c, v, col in units], (-1.6, 2.0)),
              ('2. ReLU corta o negativo', [(relu(a * xs + c), col) for a, c, v, col in units], (-1.6, 2.0)),
              ('3. Cada uma ganha um peso', [(v * relu(a * xs + c), col) for a, c, v, col in units], (-1.6, 2.0)),
              ('4. Soma + viés = saída', [(b0 + sum(v * relu(a * xs + c) for a, c, v, _ in units), TXT)], (-0.2, 2.0))]
    o = []
    for k, (title, curves, yr) in enumerate(panels):
        P = Plane(30 + k * 245, 46, 205, 190, (0, 2), yr)
        o.append(P.frame('x', 'h' if k < 3 else 'ŷ', axes0=True))
        for ys, col in curves:
            o.append(poly([P.P(x, min(max(y, yr[0]), yr[1])) for x, y in zip(xs, ys)], stroke=col, w=3))
        if k == 3:
            for j, (a, c, v, col) in enumerate(units):
                xj = -c / a; yj = b0 + sum(vv * max(aa * xj + cc, 0) for aa, cc, vv, _ in units)
                o.append(circ(*P.P(xj, yj), 6, col, 'white', 1.5))
        o.append(t(P.x0 + 102, 30, title, 16, TXT, 'middle', 'bold'))
        if k < 3: o.append(t(P.x0 + 205 + 20, P.y0 + 100, '→', 24, GRAY, 'middle'))
    o.append(t(520, 272, 'Cada neurônio contribui com uma dobra (os pontos coloridos). A saída é linear por partes.', 15, MUTED, 'middle'))
    svg(1010, 285, '\n'.join(o), 'dobras_1d')


# ---------------------------------------------------------------- F16: aproximação com 3, 10, 50 dobras
def f_aprox():
    f = lambda x: np.sin(2.5 * x) + 0.35 * np.sin(9 * x)
    xs = np.linspace(0, 2, 400)
    o = []
    for k, n in enumerate((3, 10, 50)):
        P = Plane(40 + k * 320, 40, 270, 200, (0, 2), (-1.6, 1.6))
        o.append(P.frame('x', 'y', axes0=True))
        o.append(poly([P.P(x, f(x)) for x in xs], stroke=GRAY, w=3, dash='7 5'))
        knots = np.linspace(0, 2, n + 1)
        o.append(poly([P.P(x, f(x)) for x in knots], stroke=BLUE, w=3))
        o.append(t(P.x0 + 135, 26, f'{n} neurônios ReLU', 17, BLUE, 'middle', 'bold'))
    o.append(line(330, 282, 370, 282, GRAY, 3, '7 5')); o.append(t(378, 287, 'função alvo', 15, MUTED))
    o.append(line(500, 282, 540, 282, BLUE, 3)); o.append(t(548, 287, 'rede com uma camada oculta', 15, MUTED))
    svg(1000, 300, '\n'.join(o), 'aproximacao')


# ---------------------------------------------------------------- F17: regiões em 2D
def f_regioes():
    rng = np.random.default_rng(1)
    ang = rng.uniform(0, 2 * np.pi, 70); rad = np.r_[rng.uniform(0, 0.75, 35), rng.uniform(1.25, 1.8, 35)]
    pts = np.c_[rad * np.cos(ang), rad * np.sin(ang)]; lab = np.r_[np.ones(35), np.zeros(35)]
    o = []
    R = 1.0
    for k, n in enumerate((4, 6, 16)):
        P = Plane(30 + k * 320, 46, 250, 250, (-2, 2), (-2, 2))
        o.append(P.frame())
        th = np.arange(n) * 2 * np.pi / n + (np.pi / 4 if n == 4 else 0)
        # interseção dos semiplanos: polígono regular circunscrito
        rr = R / math.cos(math.pi / n)
        verts = [P.P(rr * math.cos(a + math.pi / n), rr * math.sin(a + math.pi / n)) for a in th]
        o.append(polygon(verts, '#e6f0f8'))
        for a in th:
            # reta  cos(a) x + sin(a) y = R
            o.append(P.seg(math.cos(a), math.sin(a), -R, GREEN, 1.6 if n < 16 else 1.0))
        for p, l in zip(pts, lab):
            o.append((pos if l else neg)(*P.P(*p), 5.5))
        o.append(t(P.x0 + 125, 30, f'{n} neurônios ocultos', 17, TXT, 'middle', 'bold'))
    o.append(t(500, 330, 'Cada neurônio oculto é uma reta. A saída liga quando todos estão do lado de dentro: região azul.', 15, MUTED, 'middle'))
    svg(1000, 345, '\n'.join(o), 'regioes_2d')


# ---------------------------------------------------------------- MLP diagramas
def mlp_diagram(layers, w, h, labels=None, colors=None, name=None, title=None):
    o = []
    L = len(layers)
    xs = [60 + i * (w - 120) / (L - 1) for i in range(L)]
    pos_ = []
    for i, n in enumerate(layers):
        gap = min(70, (h - 60) / max(n, 1))
        ys = [h / 2 + (k - (n - 1) / 2) * gap for k in range(n)]
        pos_.append([(xs[i], y) for y in ys])
    for i in range(L - 1):
        for (x1, y1) in pos_[i]:
            for (x2, y2) in pos_[i + 1]:
                o.append(line(x1 + 20, y1, x2 - 20, y2, '#9fb7cc', 1.3))
    for i, layer in enumerate(pos_):
        col = (colors or {}).get(i, BLUE)
        for k, (x, y) in enumerate(layer):
            lab = ''
            if i == 0: lab = f'x{str(k+1).translate(SUB)}'
            elif i == L - 1: lab = 'ŷ' if len(layer) == 1 else f'ŷ{str(k+1).translate(SUB)}'
            o.append(circ(x, y, 19, FILL if i in (0, L - 1) else '#f0fdf4', col))
            if lab: o.append(t(x, y + 6, lab, 16, TXT, 'middle'))
        if labels: o.append(t(xs[i], h - 6, labels[i], 15, MUTED, 'middle'))
    return '\n'.join(o)


def f_mlps():
    svg(560, 330, mlp_diagram([3, 4, 1], 560, 330, ['entrada x', 'camada oculta h', 'saída'], {1: GREEN}), 'mlp_1oculta')
    svg(700, 330, mlp_diagram([3, 4, 4, 4, 2], 700, 330, ['x', 'h⁽¹⁾', 'h⁽²⁾', 'h⁽³⁾', 'ŷ'], {1: GREEN, 2: GREEN, 3: GREEN}), 'mlp_profunda')


# ---------------------------------------------------------------- ativações (miniaturas)
def f_ativ():
    xs = np.linspace(-4, 4, 161)
    from math import erf
    fs = {'degrau': (xs >= 0).astype(float), 'sigmoide': 1 / (1 + np.exp(-xs)), 'tanh': np.tanh(xs),
          'relu': np.maximum(xs, 0) / 2, 'gelu': np.array([0.5 * x * (1 + erf(x / math.sqrt(2))) for x in xs]) / 2}
    for name, ys in fs.items():
        P = Plane(4, 4, 112, 72, (-4, 4), (-1.15, 2.1))
        o = [line(P.X(-4), P.Y(0), P.X(4), P.Y(0), '#c4cad1', 1), line(P.X(0), P.Y(-1.15), P.X(0), P.Y(2.1), '#c4cad1', 1)]
        if name == 'degrau':
            o.append(poly([P.P(-4, 0), P.P(0, 0)], stroke=BLUE, w=3)); o.append(poly([P.P(0, 1), P.P(4, 1)], stroke=BLUE, w=3))
        else:
            o.append(poly([P.P(x, y) for x, y in zip(xs, ys)], stroke=BLUE, w=3))
        svg(120, 80, '\n'.join(o), f'ativ_{name}')


# ---------------------------------------------------------------- lote N × D
def f_lote():
    o = []
    X = [[0, 0], [0, 1], [1, 0], [1, 1]]
    cx, cy, cw, ch = 110, 50, 60, 40
    o.append(t(cx + cw, 34, 'X', 20, BLUE, 'middle', 'bold'))
    for j, lab in enumerate(['x₁', 'x₂']): o.append(t(cx + j * cw + cw / 2, cy + 4 * ch + 24, lab, 15, MUTED, 'middle'))
    for i, r in enumerate(X):
        o.append(t(cx - 12, cy + i * ch + 26, f'exemplo {i+1}', 13, MUTED, 'end'))
        for j, v in enumerate(r):
            o.append(rect(cx + j * cw, cy + i * ch, cw, ch, 'white' if i % 2 else FILL, BLUE, 1, 0))
            o.append(t(cx + j * cw + cw / 2, cy + i * ch + 26, str(v), 17, TXT, 'middle'))
    o.append(t(cx + cw, cy + 4 * ch + 48, 'N × D = 4 × 2', 15, BLUE, 'middle', 'bold'))
    o.append(t(290, 140, '@', 26, TXT, 'middle'))
    # W1^T  D x H
    wx, wy = 330, 90
    o.append(t(wx + 2 * cw, wy - 16, 'W₁ᵀ', 20, GREEN, 'middle', 'bold'))
    for i in range(2):
        for j in range(4):
            o.append(rect(wx + j * cw, wy + i * ch, cw, ch, '#f0fdf4', GREEN, 1, 0))
    o.append(t(wx + 2 * cw, wy + 2 * ch + 24, 'D × H = 2 × 4', 15, GREEN, 'middle', 'bold'))
    o.append(t(600, 140, '→', 26, TXT, 'middle'))
    hx, hy = 640, 50
    o.append(t(hx + 2 * cw, 34, 'H', 20, PURPLE, 'middle', 'bold'))
    for i in range(4):
        for j in range(4):
            o.append(rect(hx + j * cw, hy + i * ch, cw, ch, '#f5f3ff', PURPLE, 1, 0))
    o.append(t(hx + 2 * cw, hy + 4 * ch + 48, 'N × H = 4 × 4', 15, PURPLE, 'middle', 'bold'))
    svg(900, 270, '\n'.join(o), 'lote')


# ---------------------------------------------------------------- resumo
def f_resumo():
    o = []
    titles = ['Um neurônio', 'O XOR', 'Camada oculta', 'Rede profunda']
    subs = ['desenha uma reta', 'pede mais de uma reta', 'combina retas', 'combina combinações']
    for k in range(4):
        x0 = 20 + k * 245
        o.append(t(x0 + 105, 24, titles[k], 17, BLUE, 'middle', 'bold'))
        o.append(t(x0 + 105, 236, subs[k], 15, MUTED, 'middle', style='italic'))
        if k < 3: o.append(t(x0 + 225, 125, '→', 26, GRAY, 'middle'))
    P = Plane(40, 40, 170, 170, (-2, 2), (-2, 2))
    o.append(polygon(P.halfplane(1, 0.6, -0.2, True), '#e6f0f8')); o.append(P.frame('', '')); o.append(P.seg(1, 0.6, -0.2, GREEN, 3))
    P = Plane(285, 40, 170, 170, (-0.4, 1.4), (-0.4, 1.4)); o.append(P.frame('', '')); o.append(xor_points(P, 9))
    P = Plane(530, 40, 170, 170, (-2, 2), (-2, 2))
    th = np.arange(6) * np.pi / 3; rr = 1 / math.cos(math.pi / 6)
    o.append(polygon([P.P(rr * math.cos(a + math.pi / 6), rr * math.sin(a + math.pi / 6)) for a in th], '#e6f0f8'))
    o.append(P.frame('', ''))
    for a in th: o.append(P.seg(math.cos(a), math.sin(a), -1, GREEN, 1.6))
    sub = mlp_diagram([2, 3, 3, 1], 440, 340)
    o.append(f'<g transform="translate(745,40) scale(0.5)">{sub}</g>')
    svg(1000, 250, '\n'.join(o), 'resumo')


# ---------------------------------------------------------------- sem ativação: colapso
def f_colapso():
    o = []
    def box(x, y, w, lab, col):
        return rect(x, y, w, 56, '#f0fdf4' if col == GREEN else FILL, col) + t(x + w / 2, y + 36, lab, 20, col, 'middle', 'bold')
    def chain(y, parts):
        out = [neuron_node(40, y + 28, 'x')]
        x = 70
        for lab, col, w in parts:
            out.append(line(x, y + 28, x + 40, y + 28, BLUE, 2.5, marker='a')); x += 46
            out.append(box(x, y, w, lab, col)); x += w
        out.append(line(x, y + 28, x + 40, y + 28, BLUE, 2.5, marker='a'))
        out.append(t(x + 52, y + 36, 'ŷ', 22))
        return ''.join(out)
    o.append(t(20, 26, 'Duas camadas sem ativação', 18, TXT, weight='bold'))
    o.append(chain(40, [('W₁, b₁', BLUE, 110), ('W₂, b₂', BLUE, 110)]))
    o.append(t(200, 140, '=', 34, MUTED, 'middle'))
    o.append(t(20, 176, 'Uma camada só', 18, TXT, weight='bold'))
    o.append(chain(190, [('W′ = W₂W₁,  b′', GREEN, 200)]))
    P = Plane(640, 30, 220, 220, (-0.4, 1.4), (-0.4, 1.4))
    o.append(polygon(P.halfplane(1, 0.4, -0.7, True), '#e6f0f8'))
    o.append(P.frame()); o.append(P.seg(1, 0.4, -0.7, GREEN, 3)); o.append(xor_points(P))
    o.append(t(P.x0 + 110, 280, 'a fronteira continua uma reta', 16, MUTED, 'middle', style='italic'))
    svg(900, 290, '\n'.join(o), 'colapso')


for f in (f_colapso, f_pipeline, f_pesos_mlp, f_agora, f_mp, f_mark1, f_neuron, f_reta, f_wb, f_aprende, f_mnist,
          f_xor, f_xor3d, f_xor_rede, f_dobras, f_aprox, f_regioes, f_mlps, f_ativ, f_lote, f_resumo):
    f()
print('ok')
