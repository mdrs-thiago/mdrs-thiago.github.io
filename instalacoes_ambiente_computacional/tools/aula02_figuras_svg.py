# Gera as figuras SVG da Aula 02 de Instalações de Ambiente Computacional (o datacenter) em slides/img/aula02/.
# Uso: python aula02_figuras_svg.py <pasta_saida>
# Reaproveita os helpers de desenho de topicos_a/2027/tools/svgkit.py.
import sys, os, math
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..', 'topicos_a', '2027', 'tools'))
from svgkit import *  # noqa: F401,F403
import svgkit

svgkit.set_out(sys.argv[1])
fmt = lambda v, d=1: f'{v:.{d}f}'.replace('.', ',')
DARK, LIGHT = '#2d3748', '#edf2f7'
COLD, HOT = '#2b6cb0', RED


def arrow(x1, y1, x2, y2, col=BLUE, w=2.5):
    mk = {BLUE: 'a', ORANGE: 'ao', RED: 'ar', GRAY: 'ag', COLD: 'a'}.get(col, 'a')
    return line(x1, y1, x2, y2, col, w, marker=mk)


def server(x, y, w, h):
    o = [rect(x, y, w, h, DARK, '#1a202c', 1.2, 2)]
    for i in range(6):
        o.append(rect(x + 4 + i * (w * 0.6 / 6), y + h * 0.25, w * 0.6 / 6 - 2, h * 0.5, '#4a5568', '#718096', 0.8, 1))
    o.append(circ(x + w - 8, y + h / 2, min(3, h / 5), GREEN, GREEN, 1))
    return ''.join(o)


def rack_side(x, y, w, h, n=8):
    """Rack visto de lado (para cortes da sala)."""
    o = [rect(x, y, w, h, '#1a202c', '#1a202c', 1, 3)]
    gap = (h - 10) / n
    for i in range(n):
        o.append(rect(x + 4, y + 5 + i * gap, w - 8, gap - 3, '#4a5568', '#4a5568', 0.5, 1))
    return ''.join(o)


def box(x, y, w, h, title, sub, col, sub2=''):
    o = [rect(x, y, w, h, 'white', col, 2.5, 8), t(x + w / 2, y + 28, title, 17, col, 'middle', 'bold')]
    if sub:
        o.append(t(x + w / 2, y + 52, sub, 15, TXT, 'middle'))
    if sub2:
        o.append(t(x + w / 2, y + 72, sub2, 15, TXT, 'middle'))
    return ''.join(o)


# ------------------------------------------------------------ 1. da tomada ao datacenter
def f_escala():
    o = []
    # servidor
    o.append(server(40, 150, 180, 40))
    o.append(t(130, 120, 'um servidor', 18, BLUE, 'middle', 'bold'))
    o.append(t(130, 230, '600 W', 22, TXT, 'middle', 'bold'))
    o.append(arrow(240, 170, 300, 170, GRAY))
    o.append(t(270, 155, '× 20', 16, MUTED, 'middle', 'bold'))
    # rack
    o.append(rect(320, 70, 110, 220, '#1a202c', '#1a202c', 1, 4))
    for i in range(20):
        o.append(server(326, 76 + i * 10.6, 98, 9))
    o.append(t(375, 50, 'um rack', 18, BLUE, 'middle', 'bold'))
    o.append(t(375, 320, '12 kW', 22, TXT, 'middle', 'bold'))
    o.append(arrow(450, 170, 510, 170, GRAY))
    o.append(t(480, 155, '× 100', 16, MUTED, 'middle', 'bold'))
    # sala vista de cima
    o.append(rect(530, 60, 250, 240, LIGHT, DARK, 2, 4))
    for r in range(10):
        for c in range(10):
            o.append(rect(545 + c * 22 + (6 if c >= 5 else 0), 74 + r * 21.5 + (8 if r % 2 else 0) - (4 if r % 2 else 0), 18, 12, DARK, DARK, 0.5, 1))
    o.append(t(655, 40, 'uma sala (vista de cima)', 18, BLUE, 'middle', 'bold'))
    o.append(t(655, 330, '1,2 MW', 22, TXT, 'middle', 'bold'))
    # comparação
    o.append(rect(810, 90, 180, 170, '#fff5f5', RED, 2, 8))
    o.append(t(900, 130, '1,2 MW sem parar', 16, RED, 'middle', 'bold'))
    o.append(t(900, 160, 'o consumo médio de', 15, TXT, 'middle'))
    o.append(t(900, 182, 'cerca de 5 mil casas', 15, TXT, 'middle', 'bold'))
    o.append(t(900, 220, 'e tudo vira calor', 16, RED, 'middle', 'bold'))
    o.append(t(900, 242, 'dentro da sala', 16, RED, 'middle', 'bold'))
    svg(1000, 345, '\n'.join(o), 'escala')


# ------------------------------------------------------------ 2. piso elevado x calhas aéreas
def f_piso():
    o = []
    # painel esquerdo: piso elevado
    x0 = 20
    o.append(t(x0 + 220, 24, 'Piso elevado', 18, BLUE, 'middle', 'bold'))
    o.append(rect(x0, 330, 440, 14, '#a0aec0', '#718096', 1, 0))           # laje
    o.append(rect(x0, 268, 440, 62, '#ebf4ff', 'none', 0, 0))               # plenum
    for k in range(11):
        xx = x0 + k * 40
        if k == 6:
            o.append(rect(xx + 1, 262, 38, 6, 'white', COLD, 1.5, 0))
            for j in range(4):
                o.append(line(xx + 6 + j * 9, 263, xx + 6 + j * 9, 267, COLD, 1.5))
        else:
            o.append(rect(xx + 1, 262, 38, 6, '#cbd5e0', '#718096', 1, 0))
        o.append(line(xx + 20, 268, xx + 20, 330, '#a0aec0', 2))           # pedestais
    o.append(rect(x0 + 10, 140, 60, 122, '#e2e8f0', DARK, 2, 4))            # CRAC
    o.append(t(x0 + 40, 132, 'ar-condicionado', 15, DARK, 'middle', 'bold'))
    o.append(arrow(x0 + 40, 268, x0 + 40, 300, COLD))
    o.append(arrow(x0 + 50, 305, x0 + 230, 305, COLD))
    o.append(arrow(x0 + 255, 300, x0 + 255, 150, COLD))
    o.append(t(x0 + 255, 108, 'placa perfurada', 15, COLD, 'middle', 'bold'))
    o.append(rack_side(x0 + 300, 120, 70, 142))
    o.append(rack_side(x0 + 140, 120, 70, 142))
    for k in range(5):
        o.append(line(x0 + 120 + k * 18, 285 + (k % 2) * 6, x0 + 420, 285 + (k % 2) * 6, GRAY, 2))
    o.append(t(x0 + 220, 372, 'cabos e ar frio dividem o espaço sob o piso', 15, MUTED, 'middle'))
    # painel direito: laje + calhas
    x0 = 520
    o.append(t(x0 + 220, 24, 'Laje com calhas aéreas', 18, BLUE, 'middle', 'bold'))
    o.append(rect(x0, 330, 440, 14, '#a0aec0', '#718096', 1, 0))
    for xr in (x0 + 80, x0 + 270):
        o.append(rack_side(xr, 150, 90, 180))
    # calha de cabos (escada) acima dos racks
    o.append(rect(x0 + 40, 78, 360, 16, 'none', ORANGE, 2.5, 0))
    for k in range(19):
        o.append(line(x0 + 50 + k * 19, 78, x0 + 50 + k * 19, 94, ORANGE, 1.5))
    o.append(t(x0 + 220, 66, 'calha de cabos sobre os racks', 15, ORANGE, 'middle', 'bold'))
    for xr in (x0 + 125, x0 + 315):
        o.append(line(xr, 94, xr, 150, ORANGE, 2.5, '5 4'))
    # resfriamento entre racks
    o.append(rect(x0 + 186, 150, 70, 180, '#e2e8f0', DARK, 2, 4))
    o.append(t(x0 + 221, 238, 'ar', 15, DARK, 'middle', 'bold'))
    o.append(t(x0 + 221, 258, 'na fileira', 15, DARK, 'middle', 'bold'))
    o.append(arrow(x0 + 186, 200, x0 + 176, 200, COLD))
    o.append(arrow(x0 + 256, 200, x0 + 266, 200, COLD))
    o.append(t(x0 + 220, 372, 'cabos à vista, fáceis de mexer; ar levado até o rack', 15, MUTED, 'middle'))
    svg(980, 385, '\n'.join(o), 'piso_calhas')


# ------------------------------------------------------------ 3. a cadeia de energia
def f_energia():
    o = []
    W, H, y = 150, 92, 60
    xs = [10 + i * 166 for i in range(6)]
    items = [('Concessionária', '13,8 kV', '', GRAY), ('Transformador', '13,8 kV → 380 V', '', BLUE),
             ('Chave (ATS)', 'escolhe rede', 'ou gerador', PURPLE), ('UPS', 'baterias seguram', 'os primeiros min', ORANGE),
             ('PDU', 'régua do rack', 'A e B', BLUE), ('Servidor', 'fontes 1 e 2', '', GREEN)]
    for x, (a, b, c, col) in zip(xs, items):
        o.append(box(x, y, W, H, a, b, col, c))
    for i in range(5):
        o.append(arrow(xs[i] + W + 4, y + H / 2, xs[i + 1] - 6, y + H / 2, GRAY))
    # gerador
    o.append(box(342, 226, W, 86, 'Gerador', 'diesel, assume', RED, 'em ≈ 10 s'))
    o.append(arrow(417, 224, 417, y + H + 8, RED))
    # bateria abaixo da UPS
    o.append(rect(537, 240, 92, 54, '#fffaf0', ORANGE, 2, 6))
    for k in range(3):
        o.append(rect(547 + k * 26, 252, 20, 32, ORANGE, ORANGE, 1, 2, 0.75))
    o.append(line(583, 238, 583, y + H + 4, ORANGE, 2.5))
    o.append(t(583, 322, 'banco de baterias', 15, ORANGE, 'middle', 'bold'))
    # fases
    o.append(t(250, 200, 'entrada de energia', 16, MUTED, 'middle', style='italic'))
    o.append(t(750, 200, 'distribuição até o rack', 16, MUTED, 'middle', style='italic'))
    o.append(line(20, 180, 490, 180, '#cbd5e0', 2)); o.append(line(510, 180, 980, 180, '#cbd5e0', 2))
    o.append(t(690, 270, 'Num projeto 2N, tudo a partir', 15, TXT, 'start'))
    o.append(t(690, 292, 'do transformador existe duas', 15, TXT, 'start'))
    o.append(t(690, 314, 'vezes: caminho A e caminho B.', 15, TXT, 'start'))
    svg(1000, 340, '\n'.join(o), 'cadeia_energia')


# ------------------------------------------------------------ 4. linha do tempo de uma queda de energia
def f_queda():
    o = []
    X0, X1, X2, X3 = 230, 660, 700, 960        # trecho 1: -5 a 30 s; trecho 2: 38 a 46 min
    s2x = lambda s: X0 + (s + 5) / 35 * (X1 - X0)
    m2x = lambda m: X2 + (m - 38) / 8 * (X3 - X2)
    rows = [('Rede elétrica', GRAY), ('Baterias da UPS', ORANGE), ('Gerador', RED), ('Servidores', GREEN)]
    ys = [50, 110, 170, 240]
    for (lab, col), y in zip(rows, ys):
        o.append(t(X0 - 16, y + 22, lab, 17, col if col != GRAY else TXT, 'end', 'bold'))
        o.append(line(X0, y + 16, X3, y + 16, '#e2e8f0', 1.5))
    bar = lambda xa, xb, y, col: rect(xa, y + 2, xb - xa, 28, col, col, 1, 4, 0.9)
    y = ys[0]; o.append(bar(X0, s2x(0), y, GRAY)); o.append(bar(m2x(40), X3, y, GRAY))
    y = ys[1]; o.append(bar(s2x(0), s2x(12), y, ORANGE))
    y = ys[2]; o.append(bar(s2x(10), X1, y, RED)); o.append(bar(X2, m2x(44), y, RED))
    y = ys[3]; o.append(bar(X0, X1, y, GREEN)); o.append(bar(X2, X3, y, GREEN))
    o.append(t((X0 + X1) / 2, ys[3] + 22, 'a carga nunca fica sem energia', 16, 'white', 'middle', 'bold'))
    # eixo
    ya = 296
    o.append(line(X0, ya, X1, ya, GRAY, 2)); o.append(line(X2, ya, X3, ya, GRAY, 2))
    o.append(t((X1 + X2) / 2, ya + 6, '…', 22, MUTED, 'middle', 'bold'))
    for s in (0, 10, 20, 30):
        o.append(line(s2x(s), ya - 5, s2x(s), ya + 5, GRAY, 2)); o.append(t(s2x(s), ya + 24, f'{s} s', 15, MUTED, 'middle'))
    for m in (40, 44):
        o.append(line(m2x(m), ya - 5, m2x(m), ya + 5, GRAY, 2)); o.append(t(m2x(m), ya + 24, f'{m} min', 15, MUTED, 'middle'))
    # eventos
    ev = [(s2x(0), 'queda', TXT), (s2x(10), 'gerador estável', RED), (m2x(40), 'rede volta', TXT)]
    for x, lab, col in ev:
        o.append(line(x, 38, x, ya, col, 1.5, '5 4'))
        o.append(t(x, 30, lab, 15, col, 'middle', 'bold'))
    o.append(t(s2x(12) + 6, ys[1] + 22, 'a chave (ATS) passa para o gerador', 15, ORANGE))
    o.append(t(m2x(44), ys[2] - 6, 'esfria e desliga', 15, RED, 'end'))
    svg(980, 330, '\n'.join(o), 'queda_energia')


# ------------------------------------------------------------ 5. N, N+1, 2N
def f_redundancia():
    o = []
    panels = [('N', 3, 0, 'para com 1 falha', RED, '3 módulos'),
              ('N+1', 4, 0, 'aguenta 1 falha', GREEN, '4 módulos'),
              ('2N', 3, 3, 'aguenta perder um lado inteiro', GREEN, '6 módulos')]
    for k, (name, a, b, res, col, cost) in enumerate(panels):
        cx = 165 + k * 325
        o.append(t(cx, 34, name, 26, BLUE, 'middle', 'bold'))
        groups = [a] if not b else [a, b]
        gx0 = cx - (len(groups) * 130 + (len(groups) - 1) * 20) / 2
        for g, n in enumerate(groups):
            gx = gx0 + g * 150
            if b:
                o.append(rect(gx - 4, 54, 138, 150, 'none', GRAY, 1.5, 6))
                o.append(t(gx + 65, 224, f'caminho {"AB"[g]}', 15, MUTED, 'middle', 'bold'))
            for i in range(n):
                extra = (name == 'N+1' and i == 3)
                yy = 64 + i * 46
                xx = gx if (b or n <= 4) else gx
                o.append(rect(xx + 5, yy, 120, 38, '#fffaf0' if not extra else 'white', ORANGE, 2.2, 5))
                o.append(t(xx + 65, yy + 25, 'reserva' if extra else 'UPS 100 kW', 15, ORANGE if not extra else GREEN, 'middle', 'bold'))
        o.append(t(cx, 280, f'carga: 300 kW · {cost}', 16, TXT, 'middle'))
        o.append(t(cx, 306, res, 17, col, 'middle', 'bold'))
    svg(990, 320, '\n'.join(o), 'n_mais_1')


# ------------------------------------------------------------ 6. corredor frio e corredor quente (corte)
def f_corredores():
    o = []
    FL, CE = 300, 60                       # piso elevado e forro
    o.append(rect(0, FL, 980, 50, '#ebf4ff', 'none', 0, 0))
    o.append(line(0, FL, 980, FL, '#718096', 3)); o.append(line(0, CE, 980, CE, '#718096', 3))
    o.append(rect(0, 20, 980, 40, '#fff5f5', 'none', 0, 0))
    # CRAC à esquerda
    o.append(rect(20, 140, 80, 160, '#e2e8f0', DARK, 2, 4))
    o.append(t(60, 220, 'ar-', 15, DARK, 'middle', 'bold')); o.append(t(60, 240, 'condic.', 15, DARK, 'middle', 'bold'))
    # racks: A (frente para a direita) e B (frente para a esquerda), C e D
    racks = [(250, 'd'), (420, 'e'), (640, 'd'), (810, 'e')]
    for x, f in racks:
        o.append(rack_side(x, 140, 90, 160, 9))
        fx = x + 90 if f == 'd' else x
        o.append(line(fx, 142, fx, 298, COLD, 4))
    # ar frio sob o piso e subindo pelos corredores frios
    o.append(arrow(60, FL + 5, 60, FL + 30, COLD))
    o.append(arrow(80, FL + 28, 880, FL + 28, COLD))
    for cx in (385, 775):
        o.append(rect(cx - 30, FL - 5, 60, 6, 'white', COLD, 1.5, 0))
        o.append(arrow(cx, FL + 20, cx, 250, COLD))
        o.append(arrow(cx - 6, 220, 350, 200 if cx == 385 else 200, COLD) if cx == 385 else arrow(cx - 6, 220, 740, 200, COLD))
        o.append(arrow(cx + 6, 220, cx + 35, 200, COLD))
        o.append(t(cx, 120, 'corredor frio', 16, COLD, 'middle', 'bold'))
        o.append(t(cx, 140, '≈ 22 °C', 15, COLD, 'middle'))
    # ar quente saindo pela traseira e subindo
    for hx in (195, 580):
        o.append(arrow(hx, 230, hx, 158, HOT)); o.append(arrow(hx, 100, hx, 72, HOT))
    o.append(arrow(940, 230, 940, 75, HOT))
    o.append(t(195, 120, 'corredor', 16, HOT, 'middle', 'bold')); o.append(t(195, 140, 'quente', 16, HOT, 'middle', 'bold'))
    o.append(t(580, 120, 'corredor quente', 16, HOT, 'middle', 'bold')); o.append(t(580, 140, '≈ 35 °C', 15, HOT, 'middle'))
    o.append(arrow(240, 260, 205, 260, HOT)); o.append(arrow(520, 260, 590, 260, HOT) if False else arrow(520, 260, 555, 260, HOT))
    o.append(arrow(640, 260, 605, 260, HOT)); o.append(arrow(900, 260, 930, 260, HOT))
    # retorno pelo forro até o CRAC
    o.append(arrow(930, 42, 80, 42, HOT))
    o.append(arrow(60, 48, 60, 132, HOT))
    o.append(t(500, 38, 'ar quente volta pelo forro até o ar-condicionado', 15, HOT, 'middle', 'bold'))
    o.append(t(500, 342, 'ar frio sob o piso elevado', 15, COLD, 'middle', 'bold'))
    o.append(t(295, 322, '', 15))
    svg(980, 352, '\n'.join(o), 'corredores')


# ------------------------------------------------------------ 7. contenção e painel cego
def f_contencao():
    o = []

    def room(x0, title):
        o.append(t(x0 + 150, 26, title, 17, BLUE, 'middle', 'bold'))
        o.append(line(x0, 280, x0 + 300, 280, '#718096', 3))

    # contenção do corredor frio
    x0 = 10; room(x0, 'Contenção do corredor frio')
    o.append(rect(x0, 50, 300, 230, '#fff5f5', 'none', 0, 0))
    o.append(rect(x0 + 115, 100, 70, 180, '#ebf4ff', COLD, 0, 0))
    o.append(line(x0 + 105, 98, x0 + 195, 98, COLD, 5))
    o.append(rack_side(x0 + 45, 100, 70, 180)); o.append(rack_side(x0 + 185, 100, 70, 180))
    o.append(arrow(x0 + 150, 270, x0 + 150, 150, COLD))
    o.append(arrow(x0 + 40, 190, x0 + 10, 190, HOT)); o.append(arrow(x0 + 260, 190, x0 + 290, 190, HOT))
    o.append(t(x0 + 150, 76, 'teto e portas', 15, COLD, 'middle', 'bold'))
    o.append(t(x0 + 150, 306, 'resto da sala fica quente', 15, MUTED, 'middle'))
    # contenção do corredor quente
    x0 = 340; room(x0, 'Contenção do corredor quente')
    o.append(rect(x0, 50, 300, 230, '#ebf4ff', 'none', 0, 0))
    o.append(rect(x0 + 115, 50, 70, 230, '#fff5f5', HOT, 0, 0))
    o.append(line(x0 + 115, 50, x0 + 115, 100, HOT, 4)); o.append(line(x0 + 185, 50, x0 + 185, 100, HOT, 4))
    o.append(rack_side(x0 + 45, 100, 70, 180)); o.append(rack_side(x0 + 185, 100, 70, 180))
    o.append(arrow(x0 + 150, 230, x0 + 150, 60, HOT))
    o.append(arrow(x0 + 10, 190, x0 + 40, 190, COLD)); o.append(arrow(x0 + 290, 190, x0 + 260, 190, COLD))
    o.append(t(x0 + 222, 76, 'duto até o forro', 15, HOT, 'start', 'bold'))
    o.append(t(x0 + 150, 306, 'resto da sala fica fria', 15, MUTED, 'middle'))
    # painel cego (vista de lado de um rack)
    x0 = 670; room(x0, 'Vão sem painel cego')
    o.append(rect(x0 + 100, 70, 100, 210, '#1a202c', '#1a202c', 1, 3))
    for i in range(9):
        if i in (4, 5):
            continue
        o.append(rect(x0 + 104, 75 + i * 22.5, 92, 19.5, '#4a5568', '#4a5568', 0.5, 1))
    o.append(arrow(x0 + 10, 110, x0 + 96, 110, COLD)); o.append(arrow(x0 + 204, 110, x0 + 290, 110, HOT))
    o.append(poly([(x0 + 250, 120), (x0 + 250, 188), (x0 + 100, 188)], 'none', HOT, 2.5))
    o.append(arrow(x0 + 100, 188, x0 + 50, 188, HOT))
    o.append(t(x0 + 150, 252, '', 15))
    o.append(t(x0 + 20, 100, 'frente', 15, COLD)); o.append(t(x0 + 280, 100, 'trás', 15, HOT, 'end'))
    o.append(t(x0 + 150, 306, 'ar quente volta pela frente', 15, MUTED, 'middle'))
    svg(980, 318, '\n'.join(o), 'contencao')


# ------------------------------------------------------------ 8. faixa de temperatura (ASHRAE)
def f_ashrae():
    o = []
    X = lambda c: 60 + (c - 10) / 30 * 860
    y = 120
    o.append(rect(X(10), y, X(40) - X(10), 40, '#f7fafc', '#cbd5e0', 1.5, 6))
    o.append(rect(X(15), y, X(32) - X(15), 40, '#fefcbf', ORANGE, 2, 6))
    o.append(rect(X(18), y, X(27) - X(18), 40, '#c6f6d5', GREEN, 2.5, 6))
    for c in range(10, 41, 5):
        o.append(line(X(c), y + 40, X(c), y + 48, GRAY, 2)); o.append(t(X(c), y + 68, f'{c} °C', 15, MUTED, 'middle'))
    o.append(t((X(18) + X(27)) / 2, y + 26, 'recomendada: 18 a 27 °C', 16, GREEN, 'middle', 'bold'))
    o.append(t(X(15) + 6, y - 12, 'permitida (classe A1): 15 a 32 °C', 15, ORANGE, 'start', 'bold'))
    # marcadores
    for c, lab, col, dy in ((19, 'salas antigas: ar bem frio', COLD, 0), (26.7, 'Google: ≈ 27 °C', BLUE, 0)):
        o.append(line(X(c), y + 80, X(c), y + 110, col, 2))
        o.append(polygon([(X(c), y + 76), (X(c) - 6, y + 86), (X(c) + 6, y + 86)], col))
        o.append(t(X(c), y + 132, lab, 16, col, 'middle', 'bold'))
    o.append(t(490, 40, 'Temperatura do ar na entrada do servidor', 18, BLUE, 'middle', 'bold'))
    o.append(t(490, 64, 'quanto mais alto o alvo, menos o ar-condicionado trabalha', 15, MUTED, 'middle', style='italic'))
    svg(980, 275, '\n'.join(o), 'ashrae')


# ------------------------------------------------------------ 9. PUE
def f_pue():
    o = []
    # barra empilhada
    parts = [('TI (servidores, rede, storage)', 1000, BLUE), ('refrigeração', 400, COLD), ('perdas na UPS e distribuição', 70, ORANGE), ('iluminação e outros', 30, GRAY)]
    sc = 0.16; x0, y0 = 80, 300
    yy = y0
    o.append(t(150, 22, 'Energia que entra no prédio', 17, BLUE, 'middle', 'bold'))
    for i, (lab, v, col) in enumerate(parts):
        h = v * sc
        o.append(rect(x0, yy - h, 140, h, col if col != COLD else '#90cdf4', 'white', 1.5, 2))
        ly = [yy - h / 2 + 5, yy - h / 2 + 5, 84, 56][i]
        o.append(t(x0 + 158, ly, f'{lab}: {v} kW'.replace('1000', '1.000'), 15, TXT if col != BLUE else BLUE, weight='bold' if i == 0 else 'normal'))
        if i >= 2:
            o.append(line(x0 + 142, yy - h / 2, x0 + 154, ly - 5, GRAY, 1))
        yy -= h
    o.append(t(x0 + 70, y0 + 24, 'total: 1.500 kW', 16, TXT, 'middle', 'bold'))
    # comparação de PUE
    X = lambda p: 560 + (p - 1) / 1.2 * 380
    o.append(t(750, 22, 'PUE de diferentes datacenters', 17, BLUE, 'middle', 'bold'))
    rows = [('sala antiga típica', 2.0, RED), ('média mundial (2024)', 1.56, ORANGE), ('o exemplo ao lado', 1.5, ORANGE), ('Google, média da frota', 1.10, GREEN)]
    for i, (lab, v, col) in enumerate(rows):
        y = 60 + i * 66
        o.append(t(560, y, lab, 15, TXT))
        o.append(rect(560, y + 10, X(v) - 560, 26, col, col, 1, 4, 0.85))
        o.append(t(X(v) + 8, y + 30, fmt(v, 2), 17, col, weight='bold'))
    o.append(line(560, 50, 560, 320, GRAY, 2))
    o.append(t(560, 336, '1,0 = toda a energia vai para a TI', 15, MUTED, 'start', style='italic'))
    svg(980, 345, '\n'.join(o), 'pue')


# ------------------------------------------------------------ 10. Tiers
def f_tiers():
    o = []
    rows = [('Tier I', 'um caminho, sem redundância', 99.671, RED),
            ('Tier II', 'um caminho, peças N+1', 99.741, ORANGE),
            ('Tier III', 'dois caminhos: manutenção sem desligar', 99.982, BLUE),
            ('Tier IV', 'dois caminhos ativos: tolera falha', 99.995, GREEN)]
    o.append(t(560, 26, 'tempo parado por ano', 16, MUTED, 'start', 'bold'))
    for i, (name, desc, a, col) in enumerate(rows):
        y = 50 + i * 78
        o.append(rect(10, y, 520, 62, 'white', col, 2.5, 8))
        o.append(t(30, y + 26, name, 20, col, weight='bold'))
        o.append(t(30, y + 50, desc, 15, TXT))
        o.append(t(510, y + 38, fmt(a, 3) + '%', 18, col, 'end', 'bold'))
        hrs = (1 - a / 100) * 8760
        w = hrs / 28.8 * 330
        o.append(rect(560, y + 16, max(w, 3), 30, col, col, 1, 4, 0.85))
        lab = f'{fmt(hrs, 1)} h' if hrs >= 1 else f'{round(hrs * 60)} min'
        o.append(t(560 + max(w, 3) + 8, y + 37, lab, 17, col, weight='bold'))
    svg(980, 365, '\n'.join(o), 'tiers')


# ------------------------------------------------------------ 11. falhas no primeiro ano de um cluster
def f_falhas():
    o = []
    rows = [('superaquecimento', 0.5, 'quase todas as máquinas desligam em 5 min'),
            ('falha de PDU', 1, '500 a 1.000 máquinas somem; 6 h para voltar'),
            ('falha de roteador', 3, 'tirar o tráfego por 1 hora'),
            ('manutenção de rede', 8, 'perdas de conexão de ~30 min'),
            ('falha de rack', 20, '40 a 80 máquinas somem de uma vez'),
            ('máquina individual', 1000, 'uma máquina sai do ar'),
            ('disco', 3000, 'milhares por ano')]
    X = lambda v: 210 + (math.log10(v) + 1) / 4.6 * 520
    for i, (lab, v, d) in enumerate(rows):
        y = 28 + i * 46
        col = RED if v >= 1000 else (ORANGE if v >= 3 else BLUE)
        o.append(t(196, y + 22, lab, 16, TXT, 'end', 'bold'))
        o.append(rect(210, y + 4, X(v) - 210, 28, col, col, 1, 4, 0.85))
        vl = 'milhares' if v == 3000 else (fmt(v, 1) if v < 1 else f'{v:,}'.replace(',', '.'))
        o.append(t(X(v) + 8, y + 24, vl, 16, col, weight='bold'))
        if v < 1000:
            o.append(t(X(v) + 8 + 9 * len(vl) + 14, y + 24, d, 15, MUTED))
    for v, lab in ((0.1, '0,1'), (1, '1'), (10, '10'), (100, '100'), (1000, '1.000')):
        o.append(line(X(v), 350, X(v), 356, GRAY, 2)); o.append(t(X(v), 374, lab, 15, MUTED, 'middle'))
    o.append(line(210, 350, 980, 350, GRAY, 2))
    o.append(t(600, 398, 'ocorrências por ano num cluster novo (escala logarítmica)', 15, MUTED, 'middle'))
    svg(990, 410, '\n'.join(o), 'falhas')


# ------------------------------------------------------------ 12. resposta do exercício
def f_exercicio():
    o = []
    # 10 racks
    for i in range(10):
        x = 20 + i * 44
        o.append(rect(x, 40, 36, 90, '#1a202c', '#1a202c', 1, 3))
        o.append(t(x + 18, 152, '8 kW', 15, MUTED, 'middle'))
    o.append(t(232, 26, '10 racks de TI', 16, BLUE, 'middle', 'bold'))
    # barra de energia
    sc = 3.2; x0, y0 = 500, 60
    o.append(t(x0, 26, 'energia do prédio (PUE 1,6)', 16, BLUE, 'start', 'bold'))
    o.append(rect(x0, y0, 80 * sc, 44, BLUE, 'white', 1.5, 4)); o.append(t(x0 + 40 * sc, y0 + 28, 'TI: 80 kW', 16, 'white', 'middle', 'bold'))
    o.append(rect(x0 + 80 * sc, y0, 48 * sc, 44, '#90cdf4', 'white', 1.5, 4)); o.append(t(x0 + 104 * sc, y0 + 28, '48 kW', 16, BLUE, 'middle', 'bold'))
    o.append(t(x0 + 64 * sc, y0 + 72, 'total: 128 kW', 16, TXT, 'middle', 'bold'))
    # UPS
    for i in range(3):
        x = x0 + i * 140
        o.append(rect(x, 160, 124, 40, '#fffaf0' if i < 2 else 'white', ORANGE if i < 2 else GREEN, 2.2, 5))
        o.append(t(x + 62, 186, 'UPS 40 kW' if i < 2 else 'reserva', 15, ORANGE if i < 2 else GREEN, 'middle', 'bold'))
    o.append(t(x0 + 202, 226, 'UPS em N+1 para os 80 kW de TI', 15, MUTED, 'middle'))
    o.append(t(232, 200, 'conta: 128 kW × 730 h × R$ 0,80', 16, TXT, 'middle'))
    o.append(t(232, 224, '≈ R$ 75 mil por mês', 18, RED, 'middle', 'bold'))
    svg(940, 240, '\n'.join(o), 'exercicio')


if __name__ == '__main__':
    f_escala(); f_piso(); f_energia(); f_queda(); f_redundancia(); f_corredores(); f_contencao(); f_ashrae(); f_pue(); f_tiers(); f_falhas(); f_exercicio()
