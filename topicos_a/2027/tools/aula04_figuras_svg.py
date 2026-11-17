# Gera as figuras SVG da Aula 04 (Lab 1: MLP em PyTorch no Fashion-MNIST) em slides/img/aula04/.
# Uso: python aula04_figuras_svg.py <lab01_dados.json> <pasta_saida>
# O JSON tem amostras do Fashion-MNIST e o treino da configuração do checkpoint
# (MLP 784 → 256 → 256 → 10, AdamW, η = 0,001, batch 128, 15 épocas, split 55.000 / 5.000 com semente 42).
import sys, json
import numpy as np
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from svgkit import *  # noqa: F401,F403
import svgkit

DATA = json.load(open(sys.argv[1]))
svgkit.set_out(sys.argv[2])
fmt = lambda v, d=2: f'{v:.{d}f}'.replace('.', ',')
PT = ['camiseta', 'calça', 'pulôver', 'vestido', 'casaco', 'sandália', 'camisa', 'tênis', 'bolsa', 'bota']


def digit(a, x0, y0, s):
    a = np.array(a); o = [rect(x0, y0, 28 * s, 28 * s, 'white', '#c4cad1', 1, 2)]
    for i in range(28):
        for j in range(28):
            v = a[i, j]
            if v > 0.04:
                g = int(255 * (1 - v))
                o.append(f'<rect x="{x0 + j * s:.1f}" y="{y0 + i * s:.1f}" width="{s + 0.3:.1f}" height="{s + 0.3:.1f}" fill="rgb({g},{g},{g})"/>')
    return ''.join(o)


def f_amostras():
    s = 3.0; size = 28 * s; gx, gy = 14, 30
    o = []
    for c in range(10):
        col, row = c % 5, c // 5
        x0 = 10 + col * (3 * (size + 4) + gx)
        y0 = 10 + row * (size + gy + 14)
        for k in range(3):
            o.append(digit(DATA['samples'][c][k], x0 + k * (size + 4), y0, s))
        o.append(t(x0 + 1.5 * (size + 4), y0 + size + 22, f'{c} · {PT[c]}', 16, BLUE, 'middle', 'bold'))
    W = 10 + 5 * (3 * (size + 4) + gx)
    svg(int(W), int(10 + 2 * (size + gy + 14)), '\n'.join(o), 'amostras')


def f_pipeline():
    steps = [('Dados', 'FashionMNIST', 'Normalize', 'A3: treino / val / teste', BLUE),
             ('DataLoader', 'batch 128', 'shuffle no treino', 'A2: mini-batch', BLUE),
             ('Modelo', 'MLP 784 → 256', '→ 256 → 10', 'A1: MLP', PURPLE),
             ('Perda', 'CrossEntropy', '(recebe logits)', 'A2: entropia cruzada', RED),
             ('Otimizador', 'AdamW', 'η = 0,001', 'A3: Adam, schedule', ORANGE),
             ('Validação', 'evaluate()', 'early stopping', 'A3: generalização', GREEN)]
    W, H, gap, x0, y0 = 172, 104, 26, 10, 20
    o = []
    for i, (title, l1, l2, aula, col) in enumerate(steps):
        x = x0 + i * (W + gap)
        o.append(rect(x, y0, W, H, 'white', col, 2.5, 10))
        o.append(t(x + W / 2, y0 + 30, title, 18, col, 'middle', 'bold'))
        o.append(t(x + W / 2, y0 + 60, l1, 15, TXT, 'middle', extra='font-family="Consolas, monospace"'))
        o.append(t(x + W / 2, y0 + 84, l2, 15, TXT, 'middle', extra='font-family="Consolas, monospace"'))
        o.append(t(x + W / 2, y0 + H + 26, aula, 15, MUTED, 'middle', style='italic'))
        if i < len(steps) - 1:
            o.append(line(x + W + 3, y0 + H / 2, x + W + gap - 3, y0 + H / 2, GRAY, 2.5, marker='ag'))
    # volta: o loop de treino (DataLoader → Otimizador) se repete por época
    xa = x0 + 1 * (W + gap) + W / 2; xb = x0 + 4 * (W + gap) + W / 2; yb = y0 + H + 60
    o.append(poly([(xb, y0 + H + 36), (xb, yb), (xa, yb)], 'none', GRAY, 2.5))
    o.append(line(xa, yb, xa, y0 + H + 38, GRAY, 2.5, marker='ag'))
    o.append(t((xa + xb) / 2, yb + 22, 'o loop de treino da Aula 02: repete para cada batch e cada época', 15, MUTED, 'middle', style='italic'))
    svg(int(x0 * 2 + 6 * W + 5 * gap), int(yb + 34), '\n'.join(o), 'pipeline')


def f_curvas():
    h = np.array(DATA['hist']); E = len(h); ep = np.arange(1, E + 1)
    best = int(np.argmin(h[:, 1])) + 1
    o = []
    for k, (title, ci, yr, ticks, d) in enumerate((('Perda', (0, 1), (0, 0.6), (0.0, 0.2, 0.4, 0.6), 1),
                                                   ('Acurácia', (2, 3), (0.8, 1.0), (0.8, 0.85, 0.9, 0.95, 1.0), 2))):
        P = Plane(80 + k * 470, 46, 360, 230, (0, E), yr)
        o.append(P.frame('', ''))
        for v in ticks:
            o.append(t(P.x0 - 8, P.Y(v) + 5, fmt(v, d) if k == 0 else f'{round(v * 100)}%', 15, MUTED, 'end'))
        for e in (1, 5, 10, 15):
            o.append(t(P.X(e), P.y0 + P.h + 20, str(e), 15, MUTED, 'middle'))
        o.append(t(P.x0 + P.w / 2, P.y0 + P.h + 42, 'época', 15, MUTED, 'middle'))
        if k == 1:
            o.append(line(P.x0, P.Y(0.85), P.x0 + P.w, P.Y(0.85), RED, 2, '6 5'))
            o.append(t(P.x0 + P.w - 8, P.Y(0.812), 'meta do checkpoint: 85%', 15, RED, 'end', 'bold'))
        o.append(line(P.X(best), P.y0, P.X(best), P.y0 + P.h, GREEN, 2, '6 5'))
        o.append(poly([P.P(e, v) for e, v in zip(ep, h[:, ci[0]])], stroke=BLUE, w=3))
        o.append(poly([P.P(e, v) for e, v in zip(ep, h[:, ci[1]])], stroke=ORANGE, w=3))
        o.append(t(P.x0 + P.w / 2, 30, title, 18, BLUE, 'middle', 'bold'))
    o.append(line(250, 352, 280, 352, BLUE, 3)); o.append(t(288, 358, 'treino', 16, BLUE, weight='bold'))
    o.append(line(400, 352, 430, 352, ORANGE, 3)); o.append(t(438, 358, 'validação', 16, ORANGE, weight='bold'))
    o.append(line(570, 352, 600, 352, GREEN, 2, '6 5')); o.append(t(608, 358, f'melhor época (perda de validação): {best}', 16, GREEN, weight='bold'))
    svg(930, 370, '\n'.join(o), 'curvas_checkpoint')
    return best, h[best - 1]


def f_confusao():
    cm = np.array(DATA['confusion'], float); n = cm.sum(1, keepdims=True); r = cm / n
    c0, y0, s = 110, 100, 40
    o = []
    for i in range(10):
        o.append(t(c0 - 10, y0 + i * s + s / 2 + 5, PT[i], 15, TXT, 'end'))
        o.append(t(c0 + i * s + s / 2, y0 - 10, PT[i], 15, TXT, 'start', extra=f'transform="rotate(-40 {c0 + i * s + s / 2:.1f} {y0 - 10})"'))
        for j in range(10):
            v = r[i, j]
            if i == j:
                fill, op = GREEN, 0.15 + 0.85 * v
            else:
                fill, op = RED, min(1, v * 4)
            o.append(f'<rect x="{c0 + j * s:.1f}" y="{y0 + i * s:.1f}" width="{s - 2}" height="{s - 2}" fill="{fill}" opacity="{op:.2f}"/>')
            if v >= 0.05:
                o.append(t(c0 + j * s + s / 2 - 1, y0 + i * s + s / 2 + 5, f'{round(v * 100)}', 15, 'white' if (i == j or v > 0.12) else TXT, 'middle', 'bold'))
    o.append(t(c0 + 5 * s, y0 + 10 * s + 30, 'classe prevista →', 15, MUTED, 'middle'))
    o.append(t(20, y0 + 10 * s + 30, '↓ classe certa', 15, MUTED))
    # destaque: camisa
    o.append(rect(c0 - 2, y0 + 6 * s - 2, 10 * s + 2, s + 2, 'none', ORANGE, 3, 4))
    bx = c0 + 10 * s + 40
    o.append(t(bx, y0 + 6 * s + 8, f'camisa: só {round(r[6, 6] * 100)}% de acerto', 17, ORANGE, weight='bold'))
    o.append(t(bx, y0 + 6 * s + 32, f'{round(r[6, 0] * 100)}% vira camiseta, {round(r[6, 2] * 100)}% pulôver,', 15, TXT))
    o.append(t(bx, y0 + 6 * s + 52, f'{round(r[6, 4] * 100)}% casaco', 15, TXT))
    o.append(t(bx, y0 + 30, 'Percentual de cada classe certa', 15, MUTED))
    o.append(t(bx, y0 + 50, '(linha) prevista como cada coluna;', 15, MUTED))
    o.append(t(bx, y0 + 70, '5.000 imagens de validação', 15, MUTED))
    svg(int(bx + 300), int(y0 + 10 * s + 50), '\n'.join(o), 'confusao')
    return r[6]


if __name__ == '__main__':
    f_amostras(); f_pipeline(); best = f_curvas(); camisa = f_confusao()
    print('melhor época', best[0], np.round(best[1], 4), 'camisa', np.round(camisa, 3), 'params', DATA['params'])
