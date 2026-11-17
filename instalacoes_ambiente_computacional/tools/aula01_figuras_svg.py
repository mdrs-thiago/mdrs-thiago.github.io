# Gera as figuras SVG da Aula 01 de Instalações de Ambiente Computacional (servidores) em slides/img/aula01/.
# Uso: python aula01_figuras_svg.py <pasta_saida>
# Reaproveita os helpers de desenho de topicos_a/2027/tools/svgkit.py.
import sys, os, math
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..', 'topicos_a', '2027', 'tools'))
from svgkit import *  # noqa: F401,F403
import svgkit

svgkit.set_out(sys.argv[1])
fmt = lambda v, d=1: f'{v:.{d}f}'.replace('.', ',')
DARK, METAL, LIGHT = '#2d3748', '#cbd5e0', '#edf2f7'
MONO = 'font-family="Consolas, monospace"'


def arrow(x1, y1, x2, y2, col=BLUE, w=2.5):
    mk = {BLUE: 'a', ORANGE: 'ao', RED: 'ar', GRAY: 'ag'}.get(col, 'a')
    return line(x1, y1, x2, y2, col, w, marker=mk)


# ------------------------------------------------------------ ícones simples
def laptop(x, y, s=1.0, col=BLUE):
    w, h = 60 * s, 38 * s
    return (rect(x - w / 2, y - h, w, h, FILL, col, 2, 3) +
            polygon([(x - w / 2 - 8 * s, y + 6 * s), (x + w / 2 + 8 * s, y + 6 * s), (x + w / 2, y), (x - w / 2, y)], col, col))


def phone(x, y, s=1.0, col=BLUE):
    return rect(x - 13 * s, y - 44 * s, 26 * s, 44 * s, FILL, col, 2, 5) + circ(x, y - 6 * s, 2.5 * s, col, col, 1)


def server_1u(x, y, w, h, label='', fill=DARK, bays=8):
    o = [rect(x, y, w, h, fill, '#1a202c', 1.5, 2)]
    bw = (w * 0.55) / bays
    for i in range(bays):
        o.append(rect(x + 8 + i * bw, y + h * 0.2, bw - 3, h * 0.6, '#4a5568', '#718096', 1, 1))
    o.append(circ(x + w - 18, y + h / 2, min(4, h / 5), GREEN, GREEN, 1))
    if label:
        o.append(t(x + w * 0.78, y + h / 2 + 6, label, 15, 'white', 'middle', 'bold'))
    return ''.join(o)


# ------------------------------------------------------------ 1. muitos clientes, um servidor
def f_clientes():
    o = []
    sx, sy = 760, 200
    o.append(rect(sx - 70, sy - 120, 140, 240, DARK, '#1a202c', 2, 8))
    for i in range(6):
        o.append(rect(sx - 52, sy - 100 + i * 34, 104, 24, '#4a5568', '#718096', 1, 3))
        o.append(circ(sx + 38, sy - 88 + i * 34, 4, GREEN, GREEN, 1))
    o.append(t(sx, sy + 150, 'servidor', 18, BLUE, 'middle', 'bold'))
    o.append(t(sx, sy + 172, 'ligado 24 h por dia, 365 dias', 15, MUTED, 'middle'))
    for i in range(9):
        ang = math.radians(150 + i * 7.5)
        cx, cy = sx + 560 * math.cos(ang), sy + 560 * math.sin(ang) * 0.56
        k = 'l' if i % 2 == 0 else 'p'
        o.append(laptop(cx, cy + 18, 0.85) if k == 'l' else phone(cx, cy + 22, 0.85))
        o.append(line(cx + 40, cy, sx - 82, sy + (cy - sy) * 0.3, GRAY, 1.6, marker='ag'))
    o.append(t(200, 408, 'muitos clientes pedindo ao mesmo tempo', 16, TXT, 'middle', 'bold'))
    o.append(t(470, 182, 'pedidos', 16, MUTED, 'middle', style='italic'))
    svg(900, 420, '\n'.join(o), 'clientes')


# ------------------------------------------------------------ 2. a conta dos noves
def f_noves():
    rows = [('99%', 0.99), ('99,9%', 0.999), ('99,99%', 0.9999), ('99,999%', 0.99999)]
    H = 8760.0
    o = []
    x0, W, y0 = 170, 520, 40
    # escala log em horas: de 0,05 h (3 min) a 100 h
    lo, hi = math.log10(0.05), math.log10(100)
    X = lambda h: x0 + (math.log10(h) - lo) / (hi - lo) * W
    for v, lab in ((0.1, '6 min'), (1, '1 h'), (10, '10 h'), (100, '100 h')):
        o.append(line(X(v), y0 - 10, X(v), y0 + 4 * 62, '#e2e6ea', 1))
        o.append(t(X(v), y0 + 4 * 62 + 22, lab, 15, MUTED, 'middle'))
    cols = [RED, ORANGE, BLUE, GREEN]
    for i, ((lab, a), c) in enumerate(zip(rows, cols)):
        down = (1 - a) * H
        y = y0 + i * 62
        o.append(t(x0 - 14, y + 30, lab, 20, TXT, 'end', 'bold'))
        o.append(rect(x0, y + 8, X(down) - x0, 34, c, c, 1, 4, 0.85))
        txt = f'{fmt(down, 1)} horas' if down >= 1 else f'{fmt(down * 60, 1)} minutos'
        o.append(t(X(down) + 12, y + 31, txt + ' parado por ano', 16, c, weight='bold'))
    o.append(t(x0 + W / 2, y0 + 4 * 62 + 46, 'tempo parado por ano (escala logarítmica)', 15, MUTED, 'middle'))
    svg(960, y0 + 4 * 62 + 60, '\n'.join(o), 'noves')


# ------------------------------------------------------------ 3. torre, rack e blade na mesma escala
def f_formatos():
    s = 0.62  # px por mm
    o = []
    base = 380
    # torre: 175 x 430 mm (vista frontal)
    tw, th = 175 * s, 430 * s; tx = 40
    o.append(rect(tx, base - th, tw, th, DARK, '#1a202c', 2, 6))
    for i in range(4):
        o.append(rect(tx + 14, base - th + 20 + i * 26, tw - 28, 18, '#4a5568', '#718096', 1, 2))
    o.append(circ(tx + tw / 2, base - 30, 7, GREEN, GREEN, 1))
    o.append(t(tx + tw / 2, base + 30, 'Torre', 19, BLUE, 'middle', 'bold'))
    o.append(t(tx + tw / 2, base + 52, '≈ 18 × 43 cm', 15, MUTED, 'middle'))
    # rack 1U e 2U: 482 mm de largura (com orelhas), 44,45 e 88,9 mm de altura
    rx = 230; rw = 482 * s
    o.append(server_1u(rx, base - 88.9 * s - 44.45 * s - 20, rw, 44.45 * s, '1U'))
    o.append(server_1u(rx, base - 88.9 * s, rw, 88.9 * s, '2U', bays=12))
    o.append(t(rx + rw / 2, base + 30, 'Rack', 19, BLUE, 'middle', 'bold'))
    o.append(t(rx + rw / 2, base + 52, '48 cm de largura · 1U = 4,45 cm de altura', 15, MUTED, 'middle'))
    # blade: chassi 10U com 8 lâminas verticais
    bx = 590; bw, bh = 482 * s, 444.5 * s
    o.append(rect(bx, base - bh, bw, bh, '#1a202c', '#1a202c', 2, 4))
    nb = 8; lw = (bw - 20) / nb
    for i in range(nb):
        x = bx + 10 + i * lw
        o.append(rect(x + 2, base - bh + 10, lw - 4, bh - 60, '#4a5568', '#718096', 1, 2))
        o.append(circ(x + lw / 2, base - bh + 24, 3.5, GREEN, GREEN, 1))
    o.append(rect(bx + 10, base - 44, bw - 20, 34, '#2d3748', '#718096', 1, 2))
    o.append(t(bx + bw / 2, base - 21, 'fontes, ventoinhas e rede', 15, METAL, 'middle'))
    o.append(t(bx + bw / 2, base + 30, 'Blade', 19, BLUE, 'middle', 'bold'))
    o.append(t(bx + bw / 2, base + 52, 'chassi de 10U com 8 lâminas', 15, MUTED, 'middle'))
    o.append(t(480, 26, 'Vista de frente, na mesma escala', 16, MUTED, 'middle', style='italic'))
    svg(910, base + 66, '\n'.join(o), 'formatos')


# ------------------------------------------------------------ 4. rack de 42U
def f_rack():
    u = 9.6; x0, y0 = 150, 30; W = 300
    o = [rect(x0 - 18, y0 - 12, W + 36, 42 * u + 24, '#1a202c', '#1a202c', 2, 6)]
    o.append(rect(x0, y0, W, 42 * u, '#4a5568', '#4a5568', 1, 0))
    items = [(42, 1, 'switch (topo do rack)', BLUE), (41, 1, 'patch panel', PURPLE)]
    for k in range(40, 30, -1): items.append((k, 1, 'servidor 1U', DARK))
    items += [(30, 1, 'painel cego', '#a0aec0'), (29, 1, 'painel cego', '#a0aec0')]
    for k in (28, 26, 24, 22): items.append((k, 2, 'servidor 2U', DARK))
    items += [(20, 4, 'storage 4U', '#22543d'), (16, 4, 'storage 4U', '#22543d')]
    for k in range(12, 4, -1): items.append((k, 1, 'painel cego', '#a0aec0'))
    items += [(4, 2, 'UPS (pesado: embaixo)', ORANGE), (2, 2, 'UPS', ORANGE)]
    for top, h, lab, c in items:
        y = y0 + (42 - top) * u
        if c == '#a0aec0':
            o.append(rect(x0 + 1, y + 1, W - 2, h * u - 2, '#a0aec0', '#718096', 0.8, 1))
        elif c == DARK:
            o.append(server_1u(x0 + 1, y + 1, W - 2, h * u - 2))
        else:
            o.append(rect(x0 + 1, y + 1, W - 2, h * u - 2, c, '#1a202c', 0.8, 1))
    for k in range(1, 43):
        if k % 5 == 0 or k in (1, 42):
            o.append(t(x0 - 26, y0 + (42 - k) * u + u - 1, str(k), 15, MUTED, 'end'))
    # rótulos à direita
    labs = [(43.0, 'switch no topo (ToR)', BLUE), (40.6, 'patch panel', PURPLE), (35.5, '10 servidores 1U', TXT),
            (29.5, 'painéis cegos fecham os vãos', MUTED), (25, '4 servidores 2U', TXT), (16.5, '2 storages 4U', GREEN),
            (8.5, 'espaço livre, fechado', MUTED), (2.5, 'UPS embaixo (peso)', ORANGE)]
    for k, lab, c in labs:
        y = y0 + (42 - k) * u + u / 2 + 5
        o.append(line(x0 + W + 22, y - 5, x0 + W + 44, y - 5, GRAY, 1.2))
        o.append(t(x0 + W + 50, y, lab, 16, c, weight='bold' if c not in (MUTED,) else 'normal'))
    # cota
    o.append(line(60, y0, 60, y0 + 42 * u, GRAY, 1.5))
    o.append(t(48, y0 + 21 * u, '42U ≈ 1,87 m', 16, TXT, 'middle', 'bold', extra=f'transform="rotate(-90 48 {y0 + 21 * u})"'))
    svg(760, int(y0 + 42 * u + 30), '\n'.join(o), 'rack_42u')


# ------------------------------------------------------------ 5. cabos: 16 servidores em rack vs. blade
def f_cabos():
    o = []
    # esquerda: 16 servidores 1U, cada um com 2 cabos de energia e 2 de rede
    x0, y0, W, h = 60, 60, 260, 16
    for i in range(16):
        y = y0 + i * (h + 3)
        o.append(server_1u(x0, y, W, h, bays=6))
        for k in range(2):
            o.append(f'<path d="M{x0 + W} {y + 4 + k * 4} C {x0 + W + 40} {y + 4}, {x0 + W + 50 + k * 8} {y0 + 340}, {x0 + W + 70 + k * 10} {y0 + 360}" stroke="{RED}" stroke-width="1.4" fill="none"/>')
            o.append(f'<path d="M{x0 + W} {y + 10 + k * 4} C {x0 + W + 30} {y + 8}, {x0 + W + 70 + k * 8} {y0 - 20}, {x0 + W + 100 + k * 10} {y0 - 30}" stroke="{BLUE}" stroke-width="1.4" fill="none"/>')
    o.append(t(x0 + W / 2 + 40, 26, '16 servidores 1U', 18, BLUE, 'middle', 'bold'))
    o.append(t(x0 + W / 2 + 40, y0 + 16 * 19 + 52, '32 cabos de energia + 32 de rede', 17, RED, 'middle', 'bold'))
    # direita: chassi blade com 16 lâminas meia altura
    bx, by, bw, bh = 560, 60, 280, 300
    o.append(rect(bx, by, bw, bh, '#1a202c', '#1a202c', 2, 4))
    lw = (bw - 20) / 8
    for r in range(2):
        for i in range(8):
            x = bx + 10 + i * lw; y = by + 10 + r * 125
            o.append(rect(x + 2, y, lw - 4, 115, '#4a5568', '#718096', 1, 2))
            o.append(circ(x + lw / 2, y + 12, 3, GREEN, GREEN, 1))
    o.append(rect(bx + 10, by + 262, bw - 20, 28, '#2d3748', '#718096', 1, 2))
    o.append(t(bx + bw / 2, by + 282, 'fontes e switches do chassi', 15, METAL, 'middle'))
    for k in range(4):
        o.append(line(bx + bw, by + 230 + k * 8, bx + bw + 60, by + 330 + k * 8, RED, 1.8))
        o.append(line(bx + bw, by + 30 + k * 8, bx + bw + 60, by - 20 + k * 8, BLUE, 1.8))
    o.append(t(bx + bw / 2, 26, '16 lâminas num chassi', 18, BLUE, 'middle', 'bold'))
    o.append(t(bx + bw / 2, y0 + 16 * 19 + 52, '4 cabos de energia + 4 de rede', 17, GREEN, 'middle', 'bold'))
    o.append(line(360, 452, 400, 452, RED, 3)); o.append(t(408, 458, 'energia', 16, RED, weight='bold'))
    o.append(line(510, 452, 550, 452, BLUE, 3)); o.append(t(558, 458, 'rede', 16, BLUE, weight='bold'))
    svg(940, 470, '\n'.join(o), 'cabos_blade')


# ------------------------------------------------------------ 6. CPU de desktop vs. servidor
def f_cpu():
    # Intel Core i9-14900K vs. AMD EPYC 9654 (especificações dos fabricantes)
    panels = [('Núcleos', 24, 96, ''), ('Canais de memória', 2, 12, ''), ('Linhas PCIe', 20, 128, ''), ('Memória máxima', 192, 6144, ' GB')]
    o = []
    for k, (title, a, b, unit) in enumerate(panels):
        x0 = 30 + k * 235; base = 300; H = 210
        o.append(t(x0 + 95, 30, title, 18, BLUE, 'middle', 'bold'))
        o.append(line(x0 + 10, base, x0 + 180, base, '#c4cad1', 1.5))
        for j, (v, col, lab) in enumerate(((a, ORANGE, 'desktop'), (b, BLUE, 'servidor'))):
            h = H * v / b
            x = x0 + 30 + j * 75
            o.append(rect(x, base - h, 55, h, col, col, 1, 3, 0.9))
            vl = (f'{v // 1024} TB' if v >= 1024 else f'{v}{unit}') if unit else str(v)
            o.append(t(x + 27.5, base - h - 10, vl, 17, col, 'middle', 'bold'))
            o.append(t(x + 27.5, base + 22, lab, 15, MUTED, 'middle'))
    o.append(rect(240, 350, 16, 16, ORANGE, ORANGE, 1, 2)); o.append(t(264, 364, 'Intel Core i9-14900K (desktop)', 16, ORANGE, weight='bold'))
    o.append(rect(540, 350, 16, 16, BLUE, BLUE, 1, 2)); o.append(t(564, 364, 'AMD EPYC 9654 (servidor)', 16, BLUE, weight='bold'))
    svg(960, 380, '\n'.join(o), 'cpu')


# ------------------------------------------------------------ 7. ECC (Hamming 7,4)
def f_ecc():
    names = ['p1', 'p2', 'd1', 'p4', 'd2', 'd3', 'd4']
    code = [0, 1, 1, 0, 0, 1, 1]   # dados 1011
    bad = list(code); bad[5] ^= 1
    o = []
    def row(y, bits, title, hl=None, col=TXT):
        out = [t(30, y + 34, title, 17, col, weight='bold')]
        for i, b in enumerate(bits):
            x = 340 + i * 66
            par = names[i].startswith('p')
            fill = '#fff4e5' if par else FILL
            stroke = RED if hl == i else (ORANGE if par else BLUE)
            out.append(rect(x, y, 54, 50, fill, stroke, 3 if hl == i else 2, 6))
            out.append(t(x + 27, y + 34, str(b), 22, RED if hl == i else TXT, 'middle', 'bold', extra=MONO))
        return ''.join(out)
    for i, n in enumerate(names):
        o.append(t(340 + i * 66 + 27, 30, f'{i + 1}', 15, MUTED, 'middle'))
        o.append(t(340 + i * 66 + 27, 50, n, 15, ORANGE if n.startswith('p') else BLUE, 'middle', 'bold'))
    o.append(row(64, code, '1. grava 1011 + 3 bits de paridade'))
    o.append(row(150, bad, '2. um bit vira (posição 6)', hl=5, col=RED))
    o.append(t(30, 262, '3. a memória recalcula as paridades ao ler:', 17, TXT, weight='bold'))
    checks = [('posições 1, 3, 5, 7', 's1', 0), ('posições 2, 3, 6, 7', 's2', 1), ('posições 4, 5, 6, 7', 's4', 1)]
    for k, (pos, s, v) in enumerate(checks):
        y = 296 + k * 30
        o.append(t(60, y, f'{s}: {pos}', 16, TXT, extra=MONO))
        o.append(t(330, y, f'→ {"ímpar" if v else "par"} → {v}', 16, RED if v else GREEN, weight='bold'))
    o.append(rect(520, 270, 400, 100, '#f0fdf4', GREEN, 2, 8))
    o.append(t(720, 304, 's4 s2 s1 = 110 = 6', 20, GREEN, 'middle', 'bold', extra=MONO))
    o.append(t(720, 336, 'o erro está na posição 6:', 16, TXT, 'middle'))
    o.append(t(720, 358, 'inverte de volta e entrega 1011', 16, TXT, 'middle', 'bold'))
    o.append(rect(840, 70, 54, 50, FILL, BLUE, 1.5, 6)); o.append(t(902, 101, 'dado', 15, BLUE))
    o.append(rect(840, 130, 54, 50, '#fff4e5', ORANGE, 1.5, 6)); o.append(t(902, 161, 'paridade', 15, ORANGE))
    svg(990, 385, '\n'.join(o), 'ecc')


# ------------------------------------------------------------ 8. latência dos discos
def f_latencia():
    # ordens de grandeza típicas de leitura aleatória de 4 KB
    rows = [('HDD 7.200 rpm (SATA/SAS)', 8e-3, RED, '≈ 8 ms'), ('SSD SATA', 1e-4, ORANGE, '≈ 100 µs'),
            ('SSD NVMe', 2e-5, GREEN, '≈ 20 µs'), ('memória RAM (referência)', 1e-7, BLUE, '≈ 100 ns')]
    x0, W, y0 = 290, 560, 30
    lo, hi = -8, -1.5
    X = lambda v: x0 + (math.log10(v) - lo) / (hi - lo) * W
    o = []
    for v, lab in ((1e-7, '100 ns'), (1e-6, '1 µs'), (1e-5, '10 µs'), (1e-4, '100 µs'), (1e-3, '1 ms'), (1e-2, '10 ms')):
        o.append(line(X(v), y0 - 6, X(v), y0 + 4 * 60, '#e2e6ea', 1))
        o.append(t(X(v), y0 + 4 * 60 + 22, lab, 15, MUTED, 'middle'))
    for i, (lab, v, c, txt) in enumerate(rows):
        y = y0 + i * 60
        o.append(t(x0 - 14, y + 32, lab, 17, TXT, 'end', 'bold'))
        o.append(rect(x0, y + 10, X(v) - x0, 34, c, c, 1, 4, 0.85))
        o.append(t(X(v) + 10, y + 33, txt, 17, c, weight='bold'))
    o.append(t(x0 + W / 2, y0 + 4 * 60 + 46, 'tempo de uma leitura aleatória de 4 KB (escala logarítmica, valores típicos)', 15, MUTED, 'middle'))
    svg(960, y0 + 4 * 60 + 60, '\n'.join(o), 'latencia')


# ------------------------------------------------------------ 9. RAID 0, 1, 5 e 10
def disk(x, y, blocks, dead=False, w=74):
    h = 170
    o = [rect(x, y, w, h, '#f7fafc' if not dead else '#fff5f5', RED if dead else '#718096', 2, 10)]
    for i, (lab, col) in enumerate(blocks):
        yy = y + 14 + i * 38
        o.append(rect(x + 8, yy, w - 16, 30, col, col, 1, 4, 0.9))
        o.append(t(x + w / 2, yy + 21, lab, 15, 'white', 'middle', 'bold'))
    if dead:
        o.append(line(x + 6, y + 6, x + w - 6, y + h - 6, RED, 4)); o.append(line(x + w - 6, y + 6, x + 6, y + h - 6, RED, 4))
    return ''.join(o)


def f_raid():
    A, B, C, D, P = BLUE, GREEN, PURPLE, ORANGE, '#718096'
    configs = [
        ('RAID 0: faixas', [[('A1', A), ('B1', B), ('C1', C), ('D1', D)], [('A2', A), ('B2', B), ('C2', C), ('D2', D)],
                            [('A3', A), ('B3', B), ('C3', C), ('D3', D)], [('A4', A), ('B4', B), ('C4', C), ('D4', D)]], '16 TB úteis', 'nenhum disco pode falhar', RED),
        ('RAID 1: espelho', [[('A', A), ('B', B), ('C', C), ('D', D)], [('A', A), ('B', B), ('C', C), ('D', D)]], '4 TB úteis (2 discos)', 'aguenta 1 falha', GREEN),
        ('RAID 5: paridade', [[('A1', A), ('B1', B), ('C1', C), ('P', P)], [('A2', A), ('B2', B), ('P', P), ('D1', D)],
                              [('A3', A), ('P', P), ('C2', C), ('D2', D)], [('P', P), ('B3', B), ('C3', C), ('D3', D)]], '12 TB úteis', 'aguenta 1 falha', GREEN),
        ('RAID 10: espelho + faixas', [[('A1', A), ('B1', B), ('C1', C), ('D1', D)], [('A1', A), ('B1', B), ('C1', C), ('D1', D)],
                                       [('A2', A), ('B2', B), ('C2', C), ('D2', D)], [('A2', A), ('B2', B), ('C2', C), ('D2', D)]], '8 TB úteis', 'aguenta 1 falha por par', GREEN)]
    o = []
    for k, (title, disks, cap, tol, col) in enumerate(configs):
        cx = 150 + k * 300; y0 = 10
        if k: o.append(line(cx - 150, 20, cx - 150, 290, '#e2e8f0', 2))
        o.append(t(cx, y0 + 14, title, 18, BLUE, 'middle', 'bold'))
        n = len(disks)
        start = cx - (n * 68 - 8) / 2
        for i, b in enumerate(disks):
            o.append(disk(start + i * 68, y0 + 30, b, w=60))
        if title.startswith('RAID 10'):
            for j in range(2):
                xa = start + j * 136
                o.append(poly([(xa + 4, y0 + 210), (xa + 4, y0 + 218), (xa + 124, y0 + 218), (xa + 124, y0 + 210)], 'none', GRAY, 1.8))
        o.append(t(cx, y0 + 248, cap, 17, TXT, 'middle', 'bold'))
        o.append(t(cx, y0 + 272, tol, 16, col, 'middle', 'bold'))
    o.append(t(600, 318, 'Discos de 4 TB. P = bloco de paridade. Cada cor é um arquivo dividido em blocos.', 15, MUTED, 'middle', style='italic'))
    svg(1200, 330, '\n'.join(o), 'raid')


# ------------------------------------------------------------ 10. redundância no chassi
def f_redundancia():
    o = []
    # traseira do servidor
    x0, y0, W, H = 60, 60, 520, 120
    o.append(rect(x0, y0, W, H, DARK, '#1a202c', 2, 6))
    o.append(t(x0 + W / 2, y0 - 16, 'servidor visto de trás', 16, MUTED, 'middle', style='italic'))
    for i, xx in enumerate((x0 + 20, x0 + 130)):
        o.append(rect(xx, y0 + 25, 95, 70, '#4a5568', ORANGE, 2.5, 4))
        o.append(t(xx + 47, y0 + 58, f'fonte {"AB"[i]}', 15, 'white', 'middle', 'bold'))
        o.append(t(xx + 47, y0 + 80, '800 W', 15, METAL, 'middle'))
    for i in range(4):
        o.append(rect(x0 + 270 + i * 58, y0 + 40, 46, 30, '#2b6cb0', '#90cdf4', 1.5, 3))
    o.append(t(x0 + 386, y0 + 98, 'placas de rede', 15, METAL, 'middle'))
    # PDUs
    for i, (px, col) in enumerate(((x0 + 67, RED), (x0 + 177, BLUE))):
        o.append(rect(px - 48, 280, 96, 44, 'white', col, 2.5, 6))
        o.append(t(px, 308, f'PDU {"AB"[i]}', 17, col, 'middle', 'bold'))
        o.append(line(px, y0 + 95, px, 278, col, 3))
        o.append(t(px, 350, f'circuito {"AB"[i]}', 15, MUTED, 'middle'))
    o.append(rect(640, 60, 300, 280, '#f0fdf4', GREEN, 2, 8))
    o.append(t(790, 96, 'Se a fonte A ou o', 17, TXT, 'middle'))
    o.append(t(790, 120, 'circuito A cair, a B', 17, TXT, 'middle'))
    o.append(t(790, 144, 'segura o servidor sozinha.', 17, TXT, 'middle'))
    o.append(t(790, 196, 'Fontes, discos e ventoinhas', 17, GREEN, 'middle', 'bold'))
    o.append(t(790, 220, 'saem com o servidor ligado', 17, GREEN, 'middle', 'bold'))
    o.append(t(790, 244, '(hot-swap).', 17, GREEN, 'middle', 'bold'))
    o.append(t(790, 296, 'cada fonte aguenta a carga', 15, MUTED, 'middle'))
    o.append(t(790, 316, 'inteira sozinha', 15, MUTED, 'middle'))
    svg(960, 370, '\n'.join(o), 'redundancia')


# ------------------------------------------------------------ 11. gerenciamento fora de banda
def f_oob():
    o = []
    sx, sy, sw, sh = 330, 150, 300, 130
    o.append(rect(sx, sy, sw, sh, DARK, '#1a202c', 2, 8))
    o.append(t(sx + sw / 2, sy + 34, 'servidor', 18, 'white', 'middle', 'bold'))
    o.append(rect(sx + 20, sy + 60, 120, 50, '#2b6cb0', '#90cdf4', 2, 4)); o.append(t(sx + 80, sy + 91, 'rede (dados)', 15, 'white', 'middle'))
    o.append(rect(sx + 160, sy + 60, 120, 50, '#744210', ORANGE, 2, 4)); o.append(t(sx + 220, sy + 82, 'BMC', 15, 'white', 'middle', 'bold'))
    o.append(t(sx + 220, sy + 100, 'iDRAC / iLO', 15, METAL, 'middle'))
    # rede de produção
    o.append(rect(40, 40, 220, 60, FILL, BLUE, 2, 8)); o.append(t(150, 76, 'usuários, internet', 17, BLUE, 'middle', 'bold'))
    o.append(line(260, 70, sx + 80, sy + 58, BLUE, 3))
    o.append(t(250, 150, 'rede de produção', 16, BLUE, 'middle', 'bold'))
    # rede de gerência
    o.append(rect(700, 40, 230, 60, '#fff4e5', ORANGE, 2, 8)); o.append(t(815, 76, 'administrador', 17, ORANGE, 'middle', 'bold'))
    o.append(line(700, 70, sx + 220, sy + 58, ORANGE, 3, '8 5'))
    o.append(t(720, 150, 'rede de gerência', 16, ORANGE, 'middle', 'bold'))
    o.append(t(720, 170, '(separada)', 15, MUTED, 'middle'))
    # o que o BMC faz
    items = ['liga, desliga e reinicia', 'mostra a tela e o teclado', 'monta uma ISO para instalar o sistema', 'lê temperatura, fontes e ventoinhas']
    o.append(rect(330, 310, 600, 140, '#fafafa', '#e2e6ea', 1, 8))
    o.append(t(350, 338, 'Pelo BMC, mesmo com o sistema travado ou o servidor desligado:', 16, TXT, weight='bold'))
    for i, it in enumerate(items):
        o.append(t(370, 366 + i * 22, '• ' + it, 15, TXT))
    svg(960, 460, '\n'.join(o), 'oob')


# ------------------------------------------------------------ 12. um servidor visto de cima, por RAS
def f_por_dentro():
    o = []
    X0, Y0, W, H = 180, 96, 600, 260
    o.append(rect(X0, Y0, W, H, LIGHT, DARK, 3, 6))
    o.append(t(X0 - 12, Y0 + H / 2, 'frente', 15, MUTED, 'middle', extra=f'transform="rotate(-90 {X0 - 12} {Y0 + H / 2})"'))
    o.append(t(X0 + W + 20, Y0 + H / 2, 'traseira', 15, MUTED, 'middle', extra=f'transform="rotate(90 {X0 + W + 20} {Y0 + H / 2})"'))
    # discos na frente
    for i in range(8):
        o.append(rect(X0 + 8, Y0 + 8 + i * 30.5, 44, 26, '#4a5568', GREEN, 2, 2))
        o.append(circ(X0 + 44, Y0 + 21 + i * 30.5, 3, GREEN, GREEN, 1))
    # ventiladores
    for i in range(6):
        cy = Y0 + 24 + i * 42.5
        o.append(circ(X0 + 90, cy, 17, 'white', GREEN, 2))
        o.append(line(X0 + 78, cy - 12, X0 + 102, cy + 12, GREEN, 1.5) + line(X0 + 78, cy + 12, X0 + 102, cy - 12, GREEN, 1.5))
    # 2 CPUs com memória
    for cx in (X0 + 200, X0 + 360):
        for k in range(6):
            o.append(rect(cx - 45, Y0 + 14 + k * 11, 90, 6, BLUE, BLUE, 1, 1))
            o.append(rect(cx - 45, Y0 + H - 80 + k * 11, 90, 6, BLUE, BLUE, 1, 1))
        o.append(rect(cx - 34, Y0 + H / 2 - 34, 68, 68, '#a0aec0', DARK, 2, 4))
        for k in range(7):
            o.append(line(cx - 26 + k * 8.7, Y0 + H / 2 - 28, cx - 26 + k * 8.7, Y0 + H / 2 + 28, DARK, 1.5))
        o.append(t(cx, Y0 + H / 2 + 6, 'CPU', 15, 'white', 'middle', 'bold'))
    # PCIe, rede, BMC
    o.append(rect(X0 + 450, Y0 + 14, 80, 22, 'white', GRAY, 1.5, 2)); o.append(rect(X0 + 450, Y0 + 44, 80, 22, 'white', GRAY, 1.5, 2))
    o.append(t(X0 + 490, Y0 + 84, 'PCIe', 15, MUTED, 'middle'))
    for i in range(4):
        o.append(rect(X0 + W - 30, Y0 + 14 + i * 20, 22, 14, '#4a5568', DARK, 1, 1))
    o.append(rect(X0 + W - 30, Y0 + 104, 22, 16, ORANGE, ORANGE, 1, 1))
    # fontes
    for i in range(2):
        o.append(rect(X0 + W - 110, Y0 + H - 84 + i * 40, 102, 34, '#4a5568', GREEN, 2.5, 3))
        o.append(t(X0 + W - 59, Y0 + H - 61 + i * 40, f'fonte {i + 1}', 15, 'white', 'middle', 'bold'))
    # chamadas
    def call(x, y, tx, ty, s, col, anchor='middle'):
        o.append(line(tx, ty + (6 if ty < Y0 else -20), x, y, col, 1.6))
        o.append(t(tx, ty, s, 16, col, anchor, 'bold'))
    call(X0 + 30, Y0 + 10, X0 + 30, 50, 'discos hot-swap em RAID', GREEN)
    call(X0 + 90, Y0 + H - 14, X0 + 90, 400, 'ventiladores redundantes', GREEN)
    call(X0 + 316, Y0 + 30, X0 + 300, 50, 'memória ECC', BLUE)
    call(X0 + 234, Y0 + H / 2 + 20, X0 + 280, 400, '2 processadores', TXT)
    call(X0 + W - 19, Y0 + 104, X0 + W - 19, 50, 'BMC (gerência remota)', ORANGE)
    call(X0 + W - 59, Y0 + H - 6, X0 + W - 59, 400, '2 fontes hot-swap', GREEN)
    # fluxo de ar
    o.append(arrow(X0 + 130, Y0 + H / 2, X0 + 150, Y0 + H / 2, GRAY, 2))
    # legenda
    for i, (c, s) in enumerate(((BLUE, 'confiabilidade: detectar e corrigir erros'), (GREEN, 'disponibilidade: peças em dobro'), (ORANGE, 'manutenção: consertar de longe'))):
        x = (40, 370, 660)[i]
        o.append(rect(x, 432, 18, 18, c, c, 1, 3)); o.append(t(x + 26, 447, s, 15, TXT))
    svg(960, 462, '\n'.join(o), 'por_dentro')


if __name__ == '__main__':
    f_clientes(); f_noves(); f_formatos(); f_rack(); f_cabos(); f_cpu(); f_ecc(); f_latencia(); f_raid(); f_redundancia(); f_oob(); f_por_dentro()
