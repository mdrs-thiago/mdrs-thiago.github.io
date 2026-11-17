# Gera as figuras SVG da Aula 02 (perda, gradiente descendente, backprop) em slides/img/aula02/.
# Uso: python aula02_figuras_svg.py <pasta_saida>
# Todas as figuras com dados são calculadas aqui (numpy), com sementes fixas.
import sys, math
import numpy as np
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from svgkit import *  # noqa: F401,F403
import svgkit

svgkit.set_out(sys.argv[1])


def arrow_label(x1, y1, x2, y2, lab, col=BLUE, above=True, size=15):
    o = [line(x1, y1, x2, y2, col, 2.5, marker={BLUE: 'a', ORANGE: 'ao', RED: 'ar'}.get(col, 'a'))]
    o.append(t((x1 + x2) / 2, (y1 + y2) / 2 + (-9 if above else 22), lab, size, col, 'middle', 'bold'))
    return ''.join(o)


# ------------------------------------------------------------ 1. do XOR aos milhões de pesos
def f_escala():
    o = []
    o.append(f'<g transform="translate(20,40)">{mlp_diagram([2, 2, 1], 300, 230)}</g>')
    o.append(t(170, 26, 'XOR (Aula 01)', 18, BLUE, 'middle', 'bold'))
    o.append(t(170, 300, '9 pesos, escolhidos à mão', 16, TXT, 'middle'))
    o.append(t(390, 165, '→', 40, GRAY, 'middle'))
    o.append(f'<g transform="translate(450,46) scale(0.55)">{mlp_diagram([6, 8, 7, 4], 900, 440)}</g>')
    o.append(t(700, 26, 'Um MLP para o MNIST: 784 → 128 → 64 → 10', 18, BLUE, 'middle', 'bold'))
    o.append(t(700, 300, '109.386 pesos: impossível escolher à mão', 16, RED, 'middle', 'bold'))
    svg(980, 320, '\n'.join(o), 'escala')


# ------------------------------------------------------------ 2. MSE com resíduos
def f_mse():
    rng = np.random.default_rng(4)
    x = np.sort(rng.uniform(0.5, 9.5, 12)); y = 1.2 + 0.7 * x + rng.normal(0, 0.9, 12)
    a, b = np.polyfit(x, y, 1)
    yh = a * x + b
    mse = np.mean((yh - y) ** 2)
    P = Plane(60, 20, 520, 300, (0, 10), (0, 10))
    o = [P.frame('x (feature)', 'y (alvo)')]
    o.append(line(*P.P(0, b), *P.P(10, a * 10 + b), GREEN, 3))
    for xi, yi, hi in zip(x, y, yh):
        o.append(line(*P.P(xi, yi), *P.P(xi, hi), RED, 2.5))
    for xi, yi in zip(x, y):
        o.append(circ(*P.P(xi, yi), 6, BLUE, 'white', 1.5))
    o.append(t(P.X(7.6), P.Y(a * 7.6 + b) - 16, 'ŷ = w·x + b', 17, GREEN, 'middle', 'bold'))
    svg(600, 350, '\n'.join(o), 'mse')
    return mse


# ------------------------------------------------------------ 3. −log p
def f_neglogp():
    P = Plane(70, 30, 520, 300, (0, 1), (0, 5))
    o = [P.frame('', '−log p')]
    o.append(t(P.x0 + 260, P.y0 + 300 + 44, 'p = probabilidade dada à classe certa', 15, MUTED, 'middle'))
    ps = np.linspace(0.0068, 1, 300)
    o.append(poly([P.P(p, -math.log(p)) for p in ps], stroke=BLUE, w=3.5))
    for p, col, lab in ((0.9, GREEN, 'acertou com confiança'), (0.5, ORANGE, 'em dúvida'), (0.01, RED, 'errou com confiança')):
        v = -math.log(p)
        o.append(circ(*P.P(p, v), 8, col, 'white', 2))
        txt = f'p = {p:g}: perda {v:.2f}'.replace('.', ',')
        if p < 0.1:
            o.append(t(P.X(p) + 16, P.Y(v) + 6, txt, 16, col, 'start', 'bold')); o.append(t(P.X(p) + 16, P.Y(v) + 26, lab, 15, MUTED, 'start'))
        else:
            o.append(t(P.X(p), P.Y(v) - 46, txt, 16, col, 'middle', 'bold')); o.append(t(P.X(p), P.Y(v) - 26, lab, 15, MUTED, 'middle'))
    for k in range(5):
        o.append(t(P.x0 - 10, P.Y(k) + 5, str(k), 14, MUTED, 'end'))
    for v in (0, 0.5, 1):
        o.append(t(P.X(v), P.y0 + P.h + 20, f'{v:g}'.replace('.', ','), 14, MUTED, 'middle'))
    svg(620, 390, '\n'.join(o), 'neglogp')


# ------------------------------------------------------------ 4. softmax
def f_softmax():
    z = np.array([2.0, 1.0, -1.0]); p = np.exp(z) / np.exp(z).sum()
    names = ['gato', 'cachorro', 'carro']
    o = []
    def bars(x0, vals, title, fmt, col, vmax, vmin=0):
        out = [t(x0 + 120, 24, title, 18, col, 'middle', 'bold')]
        base = 60 + 200 * vmax / (vmax - vmin)
        out.append(line(x0, base, x0 + 240, base, GRAY, 1.2))
        for i, v in enumerate(vals):
            h = 200 * v / (vmax - vmin)
            x = x0 + 20 + i * 75
            y = base - h if h >= 0 else base
            out.append(rect(x, y, 50, abs(h), col, 'none', rx=3, op=0.9 if i == 0 else 0.55))
            out.append(t(x + 25, (base - h - 8) if h >= 0 else (base - h + 20), fmt(v), 16, col, 'middle', 'bold'))
            out.append(t(x + 25, 300, names[i], 15, TXT, 'middle'))
        return ''.join(out)
    o.append(bars(20, z, 'logits z (saída da rede)', lambda v: f'{v:+.1f}'.replace('.', ','), BLUE, 2.4, -1.4))
    o.append(line(300, 160, 380, 160, BLUE, 3, marker='a'))
    o.append(t(340, 148, 'softmax', 16, TXT, 'middle', 'bold'))
    o.append(bars(400, p, 'probabilidades p (somam 1)', lambda v: f'{v:.2f}'.replace('.', ','), GREEN, 1.0))
    o.append(rect(690, 90, 230, 130, '#fff5f5', RED))
    o.append(t(805, 122, 'classe certa: gato', 16, TXT, 'middle'))
    o.append(t(805, 160, f'ℓ = −log {p[0]:.2f}'.replace('.', ','), 20, RED, 'middle', 'bold'))
    o.append(t(805, 196, f'= {-math.log(p[0]):.2f}'.replace('.', ','), 20, RED, 'middle', 'bold'))
    svg(940, 320, '\n'.join(o), 'softmax')
    return z, p


# ------------------------------------------------------------ 5. acurácia vs entropia cruzada
def f_acc_ce():
    rng = np.random.default_rng(2)
    x = np.r_[rng.normal(-1, 1, 40), rng.normal(1.2, 1, 40)]; y = np.r_[np.zeros(40), np.ones(40)]
    ws = np.linspace(-3, 4, 400); b = 0.2
    acc = [np.mean(((w * x + b) > 0) == y) for w in ws]
    def ce(w):
        z = w * x + b; p = 1 / (1 + np.exp(-z)); p = np.clip(p, 1e-9, 1 - 1e-9)
        return -np.mean(y * np.log(p) + (1 - y) * np.log(1 - p))
    cev = [ce(w) for w in ws]
    o = []
    P = Plane(100, 40, 360, 230, (-3, 4), (0, 1.05))
    o.append(P.frame('peso w', 'acurácia', axes0=True))
    o.append(poly([P.P(w, a) for w, a in zip(ws, acc)], stroke=ORANGE, w=3))
    o.append(t(P.x0 + 190, 26, 'Acurácia: degraus', 18, ORANGE, 'middle', 'bold'))
    o.append(t(P.x0 + 190, 310, 'plana quase em todo lugar: derivada 0', 15, MUTED, 'middle', style='italic'))
    Q = Plane(600, 40, 360, 230, (-3, 4), (0, max(cev) * 1.05))
    o.append(Q.frame('peso w', 'entropia cruzada', axes0=True))
    o.append(poly([Q.P(w, c) for w, c in zip(ws, cev)], stroke=BLUE, w=3))
    wm = ws[int(np.argmin(cev))]
    o.append(circ(*Q.P(wm, min(cev)), 7, GREEN, 'white', 2))
    o.append(t(Q.x0 + 190, 26, 'Entropia cruzada: suave', 18, BLUE, 'middle', 'bold'))
    o.append(t(Q.x0 + 190, 310, 'a inclinação diz para onde mover w', 15, MUTED, 'middle', style='italic'))
    svg(990, 325, '\n'.join(o), 'acc_vs_ce')


# ------------------------------------------------------------ 6. descida em 1D
L1 = lambda w: 0.5 * (w - 2) ** 2 + 0.4
G1 = lambda w: (w - 2)


def descent_path(w0, lr, n):
    ws = [w0]
    for _ in range(n):
        ws.append(ws[-1] - lr * G1(ws[-1]))
    return ws


def f_gd1d():
    P = Plane(110, 20, 540, 300, (-1.5, 5.5), (0, 6.6))
    o = [P.frame('peso w', 'perda L(w)')]
    ws = np.linspace(-1.5, 5.5, 200)
    o.append(poly([P.P(w, L1(w)) for w in ws], stroke=BLUE, w=3.5))
    w0 = -0.8; g = G1(w0)
    o.append(line(*P.P(w0 - 0.9, L1(w0) - 0.9 * g), *P.P(w0 + 1.1, L1(w0) + 1.1 * g), ORANGE, 2.5, '7 5'))
    o.append(t(P.X(w0) + 30, P.Y(L1(w0)) + 4, f'inclinação ∂L/∂w = {g:.1f}'.replace('.', ','), 16, ORANGE, 'start', 'bold'))
    path = descent_path(w0, 0.6, 5)
    for i, (a, b) in enumerate(zip(path[:-1], path[1:])):
        o.append(line(*P.P(a, L1(a)), *P.P(b, L1(b)), GREEN, 2.5, marker=None))
    for i, w in enumerate(path):
        o.append(circ(*P.P(w, L1(w)), 7, GREEN if i else RED, 'white', 2))
    o.append(t(P.X(w0) - 22, P.Y(L1(w0)) + 6, 'início', 15, RED, 'end', 'bold'))
    o.append(t(P.X(2), P.Y(0.4) + 30, 'mínimo', 15, GREEN, 'middle', 'bold'))
    svg(680, 360, '\n'.join(o), 'gd_1d')


# ------------------------------------------------------------ 7. curvas de nível 2D
Q2 = lambda a, b: 0.5 * (1.0 * a ** 2 + 4.0 * b ** 2) + 0.6 * a * b
DQ2 = lambda a, b: np.array([1.0 * a + 0.6 * b, 4.0 * b + 0.6 * a])


def f_gd2d():
    P = Plane(60, 20, 420, 320, (-3.2, 3.2), (-2.2, 2.2))
    o = [P.frame('w₁', 'w₂')]
    o.append(contour_paths(Q2, P, [0.1, 0.4, 1, 2, 3.5, 5.5, 8]))
    w = np.array([-2.8, 1.6]); path = [w.copy()]
    for _ in range(18):
        w = w - 0.18 * DQ2(*w); path.append(w.copy())
    o.append(poly([P.P(*p) for p in path], stroke=GREEN, w=3))
    for p in path: o.append(circ(*P.P(*p), 4, GREEN, 'white', 1))
    o.append(circ(*P.P(*path[0]), 7, RED, 'white', 2))
    o.append(circ(*P.P(0, 0), 7, GREEN, 'white', 2))
    o.append(t(P.X(path[0][0]) + 10, P.Y(path[0][1]) - 12, 'início', 15, RED, weight='bold'))
    o.append(t(510, 70, 'Curvas de nível: pontos com', 17))
    o.append(t(510, 94, 'a mesma perda (como num mapa', 17))
    o.append(t(510, 118, 'topográfico).', 17))
    o.append(t(510, 170, 'Cada passo vai na direção de', 17))
    o.append(t(510, 194, '−∇L, perpendicular à curva', 17))
    o.append(t(510, 218, 'de nível.', 17))
    o.append(rect(510, 250, 300, 50, '#f5f6f8', '#ddd', 1))
    o.append(t(660, 282, 'w ← w − η ∇L(w)', 20, BLUE, 'middle', 'bold'))
    svg(840, 360, '\n'.join(o), 'gd_2d')


# ------------------------------------------------------------ 8. learning rate
def f_lr():
    o = []
    cfg = [(0.08, 'η pequeno: lento', ORANGE, 8), (0.6, 'η bom', GREEN, 6), (2.15, 'η grande: diverge', RED, 5)]
    for k, (lr, title, col, n) in enumerate(cfg):
        P = Plane(30 + k * 320, 46, 270, 230, (-3.5, 7.5), (0, 16))
        ws = np.linspace(-3.5, 7.5, 200)
        o.append(P.frame('w', 'L'))
        o.append(poly([P.P(w, L1(w)) for w in ws], stroke=BLUE, w=3))
        path = descent_path(-1.0, lr, n)
        pts = [(w, L1(w)) for w in path if -3.5 <= w <= 7.5 and L1(w) <= 16]
        o.append(poly([P.P(*p) for p in pts], stroke=col, w=2.5))
        for i, p in enumerate(pts): o.append(circ(*P.P(*p), 5 if i else 7, col, 'white', 1.5))
        o.append(t(P.x0 + 135, 30, title, 18, col, 'middle', 'bold'))
        o.append(t(P.x0 + 135, 300, f'η = {lr:g}, {n} passos'.replace('.', ','), 15, MUTED, 'middle'))
    svg(990, 310, '\n'.join(o), 'learning_rate')


# ------------------------------------------------------------ 9. GD vs mini-batch SGD
def f_sgd():
    rng = np.random.default_rng(5)
    N = 200; x = rng.normal(0, 1, N); y = 1.5 * x - 0.5 + rng.normal(0, 0.6, N)
    def grad(w, b, idx):
        e = w * x[idx] + b - y[idx]
        return np.array([np.mean(e * x[idx]) * 2, np.mean(e) * 2])
    L = lambda w, b: np.mean((w * x[None, None, :] + b - y[None, None, :]) ** 2, axis=-1) if np.ndim(w) else np.mean((w * x + b - y) ** 2)
    def Lgrid(W, B):
        return ((W[..., None] * x + B[..., None] - y) ** 2).mean(-1)
    o = []
    for k, (bs, title, col) in enumerate(((N, 'GD: todos os 200 exemplos por passo', BLUE), (10, 'Mini-batch SGD: 10 exemplos por passo', ORANGE))):
        P = Plane(40 + k * 470, 46, 400, 280, (-1.2, 3.2), (-2.6, 1.6))
        o.append(P.frame('w', 'b'))
        o.append(contour_paths(Lgrid, P, [0.5, 0.8, 1.5, 3, 5, 8, 12], n=110))
        w = np.array([-0.8, 1.2]); path = [w.copy()]
        for it in range(40):
            idx = np.arange(N) if bs == N else rng.choice(N, bs, replace=False)
            w = w - 0.08 * grad(*w, idx); path.append(w.copy())
        o.append(poly([P.P(*p) for p in path], stroke=col, w=2.5))
        o.append(circ(*P.P(*path[0]), 7, RED, 'white', 2))
        o.append(t(P.x0 + 200, 30, title, 17, col, 'middle', 'bold'))
    o.append(t(490, 372, 'Mesmos 40 passos. O mini-batch é ruidoso, mas cada passo custa 20 vezes menos.', 16, MUTED, 'middle'))
    svg(980, 385, '\n'.join(o), 'gd_vs_sgd')


# ------------------------------------------------------------ 10. grafo com números
def graph_node(x, y, op, r=30, col=BLUE):
    return circ(x, y, r, FILL, col) + t(x, y + 9, op, 26, TXT, 'middle')


def fwd(x, y, s):  # valor do forward (verde, acima)
    return t(x, y, s, 17, GREEN, 'middle', 'bold')


def bwd(x, y, s):  # gradiente (vermelho, abaixo)
    return t(x, y, s, 17, RED, 'middle', 'bold')


def f_grafo():
    o = []
    o.append(t(40, 30, 'f(x, y, z) = (x + y) · z', 20, TXT, weight='bold'))
    # entradas
    ins = {'x': (80, 110), 'y': (80, 230), 'z': (80, 340)}
    for k, (x, y) in ins.items():
        o.append(t(x - 30, y + 8, k, 24, TXT, 'middle', style='italic'))
    add = (330, 170); mul = (600, 250)
    o.append(graph_node(*add, '+')); o.append(graph_node(*mul, '×'))
    o.append(line(95, 110, add[0] - 30, add[1] - 12, BLUE, 2.5, marker='a'))
    o.append(line(95, 230, add[0] - 30, add[1] + 12, BLUE, 2.5, marker='a'))
    o.append(line(add[0] + 30, add[1] + 8, mul[0] - 30, mul[1] - 12, BLUE, 2.5, marker='a'))
    o.append(line(95, 340, mul[0] - 30, mul[1] + 14, BLUE, 2.5, marker='a'))
    o.append(line(mul[0] + 30, mul[1], 800, mul[1], BLUE, 2.5, marker='a'))
    o.append(t(815, mul[1] + 8, 'f', 24, TXT, style='italic'))
    # forward
    o.append(fwd(190, 112, 'x = −2')); o.append(fwd(190, 192, 'y = 5')); o.append(fwd(470, 186, 'q = 3'))
    o.append(fwd(330, 288, 'z = −4')); o.append(fwd(730, 238, 'f = −12'))
    # backward
    o.append(bwd(190, 160, '∂f/∂x = −4')); o.append(bwd(190, 240, '∂f/∂y = −4')); o.append(bwd(480, 242, '∂f/∂q = z = −4'))
    o.append(bwd(330, 336, '∂f/∂z = q = 3')); o.append(bwd(730, 278, '∂f/∂f = 1'))
    o.append(rect(560, 20, 300, 80, '#f5f6f8', '#ddd', 1))
    o.append(t(580, 52, 'verde: forward (valores)', 16, GREEN, weight='bold'))
    o.append(t(580, 82, 'vermelho: backward (gradientes)', 16, RED, weight='bold'))
    svg(880, 380, '\n'.join(o), 'grafo_numeros')


# ------------------------------------------------------------ 11. padrões das portas
def f_portas():
    o = []
    specs = [('+', 'soma: distribui', ('3', '−1'), '2', ('2', '2')),
             ('×', 'produto: troca', ('3', '−1'), '2', ('−2', '6')),
             ('max', 'max: escolhe um', ('4', '1'), '3', ('3', '0')),
             ('cópia', 'cópia: soma', ('x', ''), '', ('6', ''))]
    for k, (op, title, ins, up, downs) in enumerate(specs):
        x0 = 20 + k * 245
        o.append(t(x0 + 110, 26, title, 18, BLUE, 'middle', 'bold'))
        if op != 'cópia':
            n = (x0 + 130, 150)
            o.append(circ(*n, 30, FILL, BLUE)); o.append(t(n[0], n[1] + 7, op, 20 if op == 'max' else 26, TXT, 'middle'))
            for j, yy in enumerate((90, 210)):
                o.append(line(x0 + 30, yy, n[0] - 28, n[1] + (-10 if j == 0 else 10), BLUE, 2.2, marker='a'))
                o.append(fwd(x0 + 30, yy - 10, ins[j])); o.append(bwd(x0 + 30, yy + 26, downs[j]))
            o.append(line(n[0] + 30, n[1], x0 + 225, n[1], BLUE, 2.2, marker='a'))
            o.append(bwd(x0 + 200, n[1] + 28, up))
        else:
            n = (x0 + 90, 150)
            o.append(circ(*n, 8, BLUE, 'white', 1))
            o.append(line(x0 + 20, 150, n[0] - 8, 150, BLUE, 2.2))
            o.append(fwd(x0 + 30, 140, 'x'))
            for j, (yy, g) in enumerate(((90, '2'), (210, '4'))):
                o.append(line(n[0] + 6, n[1] + (-4 if j == 0 else 4), x0 + 215, yy, BLUE, 2.2, marker='a'))
                o.append(bwd(x0 + 200, yy + (-12 if j == 0 else 28), g))
            o.append(bwd(x0 + 40, 180, '2 + 4 = 6'))
    o.append(t(500, 290, 'verde: valores do forward · vermelho: gradientes (o que chega pela direita é o gradiente de cima)', 15, MUTED, 'middle'))
    svg(1000, 305, '\n'.join(o), 'portas')


# ------------------------------------------------------------ 12. um neurônio com sigmoide
def f_neuronio():
    w, x, b, yv = 0.5, 2.0, 0.0, 1.0
    z1 = w * x; z2 = z1 + b; a = 1 / (1 + math.exp(-z2)); e = a - yv; L = e * e
    dL_de = 2 * e; dL_da = dL_de; dL_dz2 = dL_da * a * (1 - a); dL_db = dL_dz2; dL_dw = dL_dz2 * x
    f2 = lambda v: f'{v:.3f}'.replace('.', ',').replace('-', '−')
    o = []
    xs = [200, 360, 520, 680, 840]; Y = 160
    ops = ['×', '+', 'σ', '− y', '( )²']
    for X, op in zip(xs, ops):
        o.append(circ(X, Y, 32, FILL, BLUE)); o.append(t(X, Y + 8, op, 22 if len(op) > 1 else 26, TXT, 'middle'))
    o.append(t(60, Y - 40, 'w = 0,5', 18, GREEN, weight='bold')); o.append(t(60, Y + 56, 'x = 2', 18, GREEN, weight='bold'))
    o.append(line(130, Y - 46, xs[0] - 30, Y - 10, BLUE, 2.2, marker='a')); o.append(line(120, Y + 50, xs[0] - 30, Y + 12, BLUE, 2.2, marker='a'))
    o.append(t(xs[1], Y + 92, 'b = 0', 18, GREEN, 'middle', 'bold')); o.append(line(xs[1], Y + 74, xs[1], Y + 34, BLUE, 2.2, marker='a'))
    o.append(t(xs[3], Y + 92, 'y = 1', 18, GREEN, 'middle', 'bold')); o.append(line(xs[3], Y + 74, xs[3], Y + 34, BLUE, 2.2, marker='a'))
    vals = [f2(z1), f2(z2), f2(a), f2(e)]
    grads = [f2(dL_dz2), f2(dL_dz2), f2(dL_da), f2(dL_de)]
    for i in range(4):
        o.append(line(xs[i] + 32, Y, xs[i + 1] - 34, Y, BLUE, 2.2, marker='a'))
        mx = (xs[i] + xs[i + 1]) / 2
        o.append(fwd(mx, Y - 16, vals[i])); o.append(bwd(mx, Y + 30, grads[i]))
    o.append(line(xs[4] + 32, Y, 990, Y, BLUE, 2.2, marker='a'))
    o.append(fwd(935, Y - 16, f'L = {f2(L)}')); o.append(bwd(935, Y + 30, '1'))
    o.append(t(20, Y - 70, f'∂L/∂w = {f2(dL_dw)}', 17, RED, 'start', 'bold')); o.append(bwd(xs[1] + 80, Y + 120, f'∂L/∂b = {f2(dL_db)}'))
    o.append(t(500, 32, 'L = (σ(w·x + b) − y)²', 20, TXT, 'middle', 'bold'))
    o.append(t(500, 330, 'Passo do σ: gradiente que chega × σ(1 − σ) = ' + f2(dL_da) + ' × ' + f2(a * (1 - a)) + ' = ' + f2(dL_dz2), 16, MUTED, 'middle'))
    svg(1010, 345, '\n'.join(o), 'neuronio_grafo')
    return dict(z2=z2, a=a, e=e, L=L, dL_dw=dL_dw, dL_db=dL_db, dL_dz2=dL_dz2)


# ------------------------------------------------------------ 13. MLP: forward guarda, backward reaproveita
def f_mlp_bp():
    o = [f'<g transform="translate(40,60)">{mlp_diagram([3, 4, 4, 2], 620, 260, ["x", "h⁽¹⁾", "h⁽²⁾", "ŷ"], {1: GREEN, 2: GREEN})}</g>']
    o.append(rect(690, 150, 120, 80, '#fff5f5', RED)); o.append(t(750, 198, 'perda L', 18, RED, 'middle', 'bold'))
    o.append(line(640, 190, 686, 190, BLUE, 2.5, marker='a'))
    o.append(line(80, 40, 640, 40, BLUE, 4, marker='a'))
    o.append(t(360, 28, 'forward: calcula e guarda cada h', 17, BLUE, 'middle', 'bold'))
    o.append(line(760, 350, 90, 350, RED, 4, marker='ar'))
    o.append(t(420, 378, 'backward: δ de cada camada = δ da camada seguinte × derivada local', 17, RED, 'middle', 'bold'))
    svg(840, 395, '\n'.join(o), 'mlp_backprop')


# ------------------------------------------------------------ 14. shapes
def f_shapes():
    o = []
    def mat(x, y, w, h, lab, dims, col, fill):
        return rect(x, y, w, h, fill, col, 2, 2) + t(x + w / 2, y + h / 2 + 8, lab, 22, col, 'middle', 'bold') + t(x + w / 2, y + h + 24, dims, 16, MUTED, 'middle')
    o.append(t(20, 30, 'Forward:  Y = X W', 19, TXT, weight='bold'))
    o.append(mat(20, 50, 80, 150, 'X', 'N × D', BLUE, FILL)); o.append(t(120, 130, '·', 30, TXT, 'middle'))
    o.append(mat(140, 70, 110, 80, 'W', 'D × M', GREEN, '#f0fdf4')); o.append(t(272, 130, '=', 26, TXT, 'middle'))
    o.append(mat(295, 50, 110, 150, 'Y', 'N × M', PURPLE, '#f5f3ff'))
    o.append(t(480, 30, 'Backward:  ∂L/∂W = Xᵀ · ∂L/∂Y', 19, TXT, weight='bold'))
    o.append(mat(480, 70, 150, 80, 'Xᵀ', 'D × N', BLUE, FILL)); o.append(t(650, 115, '·', 30, TXT, 'middle'))
    o.append(mat(670, 50, 110, 150, '∂L/∂Y', 'N × M', RED, '#fff5f5')); o.append(t(800, 130, '=', 26, TXT, 'middle'))
    o.append(mat(820, 70, 110, 80, '∂L/∂W', 'D × M', GREEN, '#f0fdf4'))
    o.append(t(500, 270, 'O gradiente tem o mesmo shape da variável: ∂L/∂W é D × M, como W.', 17, GREEN, 'middle', 'bold'))
    svg(960, 290, '\n'.join(o), 'shapes')


# ------------------------------------------------------------ 15. loop de treino
def f_loop():
    o = []
    steps = [('1. zerar', 'opt.zero_grad()', MUTED), ('2. forward', 'model(xb)', BLUE),
             ('3. perda', 'loss_fn(logits, yb)', RED), ('4. backward', 'loss.backward()', RED),
             ('5. passo', 'opt.step()', GREEN)]
    W, H, gap, x0, y0 = 196, 84, 34, 14, 30
    for i, (lab, code, col) in enumerate(steps):
        x = x0 + i * (W + gap)
        o.append(rect(x, y0, W, H, 'white', col, 2.5, 10))
        o.append(t(x + W / 2, y0 + 34, lab, 19, col, 'middle', 'bold'))
        o.append(t(x + W / 2, y0 + 64, code, 15, TXT, 'middle', extra='font-family="Consolas, monospace"'))
        if i < 4:
            o.append(line(x + W + 3, y0 + H / 2, x + W + gap - 3, y0 + H / 2, GRAY, 2.5, marker='ag'))
    xl = x0 + 4 * (W + gap) + W / 2; xf = x0 + W / 2; yb = y0 + H + 52
    o.append(poly([(xl, y0 + H + 3), (xl, yb), (xf, yb), (xf, y0 + H + 6)], 'none', GRAY, 2.5))
    o.append(line(xf, yb, xf, y0 + H + 4, GRAY, 2.5, marker='ag'))
    o.append(t((xl + xf) / 2, yb - 12, 'próximo batch: repete até acabar a época', 16, MUTED, 'middle', style='italic'))
    svg(x0 * 2 + 5 * W + 4 * gap, yb + 16, '\n'.join(o), 'loop_treino')


# ------------------------------------------------------------ três painéis (abertura e síntese)
def f_tres(titles, name):
    o = []
    # 1. perda: -log p
    P = Plane(75, 60, 220, 180, (0, 1), (0, 4.8))
    o.append(P.frame('p da classe certa', 'perda'))
    ps = np.linspace(0.009, 1, 200)
    o.append(poly([P.P(p, -math.log(p)) for p in ps], stroke=BLUE, w=3.5))
    for p, col in ((0.9, GREEN), (0.5, ORANGE), (0.05, RED)):
        o.append(circ(*P.P(p, -math.log(p)), 7, col, 'white', 2))
    # 2. gradiente: parábola com passos
    Q = Plane(405, 60, 220, 180, (-1.5, 5.5), (0, 6.6))
    o.append(Q.frame('peso w', 'perda'))
    ws = np.linspace(-1.5, 5.5, 200)
    o.append(poly([Q.P(w, L1(w)) for w in ws], stroke=BLUE, w=3.5))
    path = descent_path(-0.8, 0.6, 5)
    for a_, b_ in zip(path[:-1], path[1:]):
        o.append(line(*Q.P(a_, L1(a_)), *Q.P(b_, L1(b_)), GREEN, 2.5))
    for i, w in enumerate(path):
        o.append(circ(*Q.P(w, L1(w)), 6, GREEN if i else RED, 'white', 2))
    # 3. backprop: grafo pequeno com setas de volta
    xs = [740, 830, 920]; Y = 150
    o.append(t(700, Y - 48, 'w', 18, TXT, 'end', style='italic')); o.append(t(700, Y + 64, 'x', 18, TXT, 'end', style='italic'))
    o.append(line(712, Y - 52, xs[0] - 26, Y - 12, BLUE, 2.2, marker='a')); o.append(line(712, Y + 54, xs[0] - 26, Y + 12, BLUE, 2.2, marker='a'))
    for x_, lab in zip(xs, ['×', 'σ', 'L']):
        o.append(circ(x_, Y, 24)); o.append(t(x_, Y + 7, lab, 20, TXT, 'middle'))
    for x1, x2 in zip(xs[:-1], xs[1:]):
        o.append(line(x1 + 26, Y, x2 - 28, Y, BLUE, 2.2, marker='a'))
    o.append(line(xs[2], Y + 60, xs[0] - 10, Y + 60, RED, 3, marker='ar'))
    o.append(t((xs[0] + xs[2]) / 2, Y + 88, 'gradientes voltam', 16, RED, 'middle', 'bold'))
    o.append(line(xs[0], Y - 60, xs[2] + 10, Y - 60, BLUE, 3, marker='a'))
    o.append(t((xs[0] + xs[2]) / 2, Y - 74, 'valores vão', 16, BLUE, 'middle', 'bold'))
    for cx, tt in zip((185, 515, 820), titles):
        o.append(t(cx, 26, tt, 19, BLUE, 'middle', 'bold'))
    svg(990, 290, '\n'.join(o), name)


# ------------------------------------------------------------ época, batch, iteração
def f_epoca():
    o = []
    rng = np.random.default_rng(1)
    x0, y0, W, H = 30, 70, 930, 60
    nb = 12; bw = W / nb
    pal = [BLUE, RED, GREEN, ORANGE, PURPLE]
    for i in range(nb):
        x = x0 + i * bw
        if i == 9:
            o.append(t(x + bw / 2, y0 + H / 2 + 8, '···', 26, MUTED, 'middle', 'bold')); continue
        o.append(rect(x + 3, y0, bw - 6, H, FILL if i != 0 else '#fff4e5', ORANGE if i == 0 else BLUE, 2, 6))
        for k in range(8):
            c = pal[rng.integers(5)]
            o.append(f'<circle cx="{x + 14 + (k % 4) * 15:.1f}" cy="{y0 + 18 + (k // 4) * 24}" r="5" fill="{c}" opacity="0.8"/>')
    o.append(t(x0 + bw / 2, y0 - 14, 'batch 1', 15, ORANGE, 'middle', 'bold'))
    o.append(t(x0 + bw * 1.5, y0 - 14, 'batch 2', 15, BLUE, 'middle', 'bold'))
    o.append(t(x0 + bw * 11.5, y0 - 14, 'batch 430', 15, BLUE, 'middle', 'bold'))
    o.append(t(x0 + bw / 2, y0 + H + 30, '128 imagens', 15, MUTED, 'middle'))
    o.append(t(x0 + bw / 2, y0 + H + 50, '= 1 iteração', 15, ORANGE, 'middle', 'bold'))
    yb = y0 + H + 80
    o.append(poly([(x0 + 3, yb - 8), (x0 + 3, yb), (x0 + W - 3, yb), (x0 + W - 3, yb - 8)], 'none', GREEN, 2.5))
    o.append(t(x0 + W / 2, yb + 28, '1 época = 55.000 imagens = 430 iterações', 18, GREEN, 'middle', 'bold'))
    o.append(t(x0 + W / 2, yb + 54, 'na época seguinte os dados são embaralhados e os batches mudam', 15, MUTED, 'middle', style='italic'))
    svg(990, yb + 70, '\n'.join(o), 'epoca')


# ------------------------------------------------------------ custo: diferenças finitas vs backprop
def f_custo():
    o = []
    n = 109386
    x0, W = 260, 640
    rows = [('diferenças finitas', n + 1, RED, '109.387 passadas pela rede'), ('backpropagation', 3, GREEN, '≈ 3 passadas (forward + backward)')]
    for i, (lab, v, col, txt) in enumerate(rows):
        y = 40 + i * 90
        o.append(t(x0 - 16, y + 30, lab, 18, TXT, 'end', 'bold'))
        w = max(W * v / (n + 1), 4)
        o.append(rect(x0, y, w, 44, col, col, 1, 4, 0.85))
        o.append(t(x0 + (W - 10 if i == 0 else w + 12), y + 29, txt, 16, 'white' if i == 0 else col, 'end' if i == 0 else 'start', 'bold'))
    o.append(t(x0 + W / 2, 228, 'custo de um passo de treino do MLP 784 → 128 → 64 → 10, em passadas pela rede', 15, MUTED, 'middle', style='italic'))
    svg(940, 245, '\n'.join(o), 'custo')



if __name__ == '__main__':
    f_escala(); mse = f_mse(); f_neglogp(); z, p = f_softmax(); f_acc_ce(); f_gd1d(); f_gd2d(); f_lr(); f_sgd()
    f_grafo(); f_portas(); nv = f_neuronio(); f_mlp_bp(); f_shapes(); f_loop()
    f_tres(['Quanto a rede erra?', 'Para onde mexer cada peso?', 'Como calcular isso rápido?'], 'tres_perguntas')
    f_tres(['Perda', 'Gradiente', 'Backprop'], 'resumo'); f_epoca(); f_custo()
    print('MSE', round(mse, 3), 'softmax', np.round(p, 3), 'neuronio', {k: round(v, 4) for k, v in nv.items()})
