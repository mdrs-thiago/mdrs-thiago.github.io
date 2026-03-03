// Single Layer Perceptron Visualization
function initPerceptron(svgId, sliders) {
    const width = 500, height = 500, margin = 50;
    const svg = d3.select(svgId);
    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

    // Scales
    const xScale = d3.scaleLinear().domain([-5, 5]).range([-width / 2 + margin, width / 2 - margin]);
    const yScale = d3.scaleLinear().domain([-5, 5]).range([height / 2 - margin, -height / 2 + margin]);

    // Axes
    g.append("g").attr("transform", `translate(0,${yScale(0)})`).call(d3.axisBottom(xScale).ticks(5));
    g.append("g").attr("transform", `translate(${xScale(0)},0)`).call(d3.axisLeft(yScale).ticks(5));

    // Data points
    const data = [
        { x1: -2, x2: -2, class: 0 }, { x1: -1, x2: -1.5, class: 0 }, { x1: -2, x2: 1, class: 0 },
        { x1: 2, x2: 2, class: 1 }, { x1: 1, x2: 1, class: 1 }, { x1: 2, x2: -1, class: 1 }
    ];

    g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.x1))
        .attr("cy", d => yScale(d.x2))
        .attr("r", 8)
        .attr("fill", d => d.class === 1 ? "#3b82f6" : "#ef4444")
        .attr("stroke", "white")
        .attr("stroke-width", 2);

    // Decision boundary
    const decisionLine = g.append("line")
        .attr("stroke", "#8b5cf6")
        .attr("stroke-width", 4)
        .attr("stroke-linecap", "round");

    function update() {
        const w1 = +document.getElementById(sliders.w1).value;
        const w2 = +document.getElementById(sliders.w2).value;
        const b = +document.getElementById(sliders.b).value;

        if (w2 === 0) return;

        const x1_l = -5, x2_l = (-w1 * x1_l - b) / w2;
        const x1_r = 5, x2_r = (-w1 * x1_r - b) / w2;

        decisionLine
            .attr("x1", xScale(x1_l))
            .attr("y1", yScale(x2_l))
            .attr("x2", xScale(x1_r))
            .attr("y2", yScale(x2_r));

        // Update labels
        if (sliders.valW1) document.getElementById(sliders.valW1).innerText = w1.toFixed(1);
        if (sliders.valW2) document.getElementById(sliders.valW2).innerText = w2.toFixed(1);
        if (sliders.valB) document.getElementById(sliders.valB).innerText = b.toFixed(1);
    }

    document.getElementById(sliders.w1).addEventListener("input", update);
    document.getElementById(sliders.w2).addEventListener("input", update);
    document.getElementById(sliders.b).addEventListener("input", update);

    update();
}
