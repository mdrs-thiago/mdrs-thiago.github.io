# Helpers de SVG para as figuras das aulas de Tópicos A 2027.1 (mesmo estilo da Aula 01).
import sys, json, math, base64, numpy as np

OUT = '.'


def set_out(path):
    global OUT
    OUT = path
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



def xor_points(P, s=11):
    return neg(*P.P(0, 0), s) + pos(*P.P(0, 1), s) + pos(*P.P(1, 0), s) + neg(*P.P(1, 1), s)


def contour_paths(f, P, levels, n=140):
    """Curvas de nível por marching squares simplificado (segmentos)."""
    xs = np.linspace(P.xr[0], P.xr[1], n); ys = np.linspace(P.yr[0], P.yr[1], n)
    X, Y = np.meshgrid(xs, ys); Z = f(X, Y)
    out = []
    for lv in levels:
        segs = []
        for i in range(n - 1):
            for j in range(n - 1):
                c = [(X[i, j], Y[i, j], Z[i, j]), (X[i, j + 1], Y[i, j + 1], Z[i, j + 1]),
                     (X[i + 1, j + 1], Y[i + 1, j + 1], Z[i + 1, j + 1]), (X[i + 1, j], Y[i + 1, j], Z[i + 1, j])]
                pts = []
                for k in range(4):
                    a, b = c[k], c[(k + 1) % 4]
                    if (a[2] - lv) * (b[2] - lv) < 0:
                        r = (lv - a[2]) / (b[2] - a[2]); pts.append((a[0] + r * (b[0] - a[0]), a[1] + r * (b[1] - a[1])))
                if len(pts) >= 2:
                    segs.append(f'M{P.X(pts[0][0]):.1f},{P.Y(pts[0][1]):.1f}L{P.X(pts[1][0]):.1f},{P.Y(pts[1][1]):.1f}')
        out.append(f'<path d="{"".join(segs)}" stroke="#9fb7cc" stroke-width="1.3" fill="none"/>')
    return ''.join(out)
