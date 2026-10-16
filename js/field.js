// Feature-space backgrounds: a fitted 2D distribution (points + isodensity contours)
// with one out-of-distribution point in signal yellow. Points settle on load.
(function () {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

    function field(canvas, opts) {
        if (!canvas) return null;
        const ctx = canvas.getContext('2d');
        let seed = opts.seed;
        const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
        const gauss = () => { let u = 0; while (!u) u = rand(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand()); };
        const points = [];
        opts.clusters.forEach(c => { for (let i = 0; i < c.n; i++) points.push({ tx: c.x + gauss() * c.sx, ty: c.y + gauss() * c.sy, sx: rand(), sy: rand() }); });

        function draw(p) {
            const w = canvas.clientWidth, h = canvas.clientHeight, dpr = window.devicePixelRatio || 1;
            if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
                canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
            }
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);
            const colors = opts.colors();
            ctx.lineWidth = 1;
            ctx.strokeStyle = colors.contour;
            opts.clusters.forEach(c => {
                for (let k = 1; k <= 4; k++) {
                    ctx.beginPath();
                    ctx.ellipse(c.x * w, c.y * h, c.sx * w * k * 0.85, c.sy * h * k * 0.85, c.rot, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });
            const e = 1 - Math.pow(1 - p, 3);
            ctx.fillStyle = colors.dot;
            ctx.globalAlpha = colors.dotAlpha;
            points.forEach(q => {
                ctx.beginPath();
                ctx.arc((q.sx + (q.tx - q.sx) * e) * w, (q.sy + (q.ty - q.sy) * e) * h, 2.1, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            const sig = cssVar('--signal'), ox = opts.outlier[0] * w, oy = opts.outlier[1] * h;
            ctx.fillStyle = sig;
            ctx.beginPath(); ctx.arc(ox, oy, 5, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = sig; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(ox, oy, 8 + 6 * e, 0, Math.PI * 2); ctx.stroke();
        }

        let t0 = null;
        function frame(ts) {
            if (t0 === null) t0 = ts;
            const p = Math.min(1, (ts - t0) / 1800);
            draw(p);
            if (p < 1) requestAnimationFrame(frame);
        }
        if (reduce || !opts.animate) draw(1); else requestAnimationFrame(frame);
        return () => draw(1);
    }

    const redraws = [
        // The teaching band is always dark, so its colors are fixed.
        field(document.getElementById('teach-field'), {
            seed: 5, animate: false, outlier: [0.4, 0.86],
            clusters: [
                { x: 0.18, y: 0.78, sx: 0.07, sy: 0.16, n: 70, rot: 0.5 },
                { x: 0.95, y: 0.15, sx: 0.05, sy: 0.12, n: 40, rot: -0.3 }
            ],
            colors: () => ({ contour: 'rgba(228,237,232,0.10)', dot: '#E4EDE8', dotAlpha: 0.25 })
        })
    ].filter(Boolean);

    const redrawAll = () => redraws.forEach(r => r());
    window.addEventListener('resize', redrawAll);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', redrawAll);
})();
