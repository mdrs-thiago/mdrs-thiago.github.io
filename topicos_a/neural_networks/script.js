// Set up SVG dimensions
const width = 600, height = 400;
const svg = d3.select("#graph")
    .attr("width", width)
    .attr("height", height);

// Nodes and links
const nodes = [
    { id: "Entrada #1", x: 100, y: 150, color: "lightcoral" },
    { id: "Entrada #2", x: 100, y: 250, color: "lightcoral" },
    { id: "Função de Ativação", x: 300, y: 200, color: "lightpink" },
    { id: "Saída", x: 500, y: 200, color: "gold" }
];

const links = [
    { source: "Entrada #1", target: "Função de Ativação" },
    { source: "Entrada #2", target: "Função de Ativação" },
    { source: "Função de Ativação", target: "Saída" }
];

// Draw links (initially collapsed at the source node)
svg.selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("x1", d => nodes.find(n => n.id === d.source).x)
    .attr("y1", d => nodes.find(n => n.id === d.source).y)
    .attr("x2", d => nodes.find(n => n.id === d.source).x)  // Fix: Should use source
    .attr("y2", d => nodes.find(n => n.id === d.source).y)  // Fix: Should use source
    .attr("stroke", "black")
    .attr("stroke-width", 2);
    // .append('text')
    // .attr("class", "text")
    // .attr("x", d => nodes.find(n => n.id === d.source).x)
    // .attr("y", d => nodes.find(n => n.id === d.source).x)
    // .attr("text-anchor", "middle")
    // .attr("font-size", "12px")
    // .text(d => d.id)
    // .attr("fill", "black");

// Draw nodes
const nodeElements = svg.selectAll(".node")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 30)
    .attr("fill", d => d.color);

// Add labels
svg.selectAll(".text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "text")
    .attr("x", d => d.x)
    .attr("y", d => d.y - 40)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .text(d => d.id)
    .attr("fill", "black");

// Function to animate data flow
function animateFlow() {
    svg.selectAll(".link")
        .transition()
        .duration(1000)
        .attr("x2", d => nodes.find(n => n.id === d.target).x)
        .attr("y2", d => nodes.find(n => n.id === d.target).y)
        .on("end", () => {
            setTimeout(() => {
                svg.selectAll(".link")
                    .attr("x2", d => nodes.find(n => n.id === d.source).x)
                    .attr("y2", d => nodes.find(n => n.id === d.source).y);
                animateFlow();
            }, 5000); // 5 seconds delay
        });
}

// Start animation
animateFlow();

const margin = 40;
const svg_sig = d3.select("#sigmoid-graph");
const g = svg_sig.append("g").attr("transform", `translate(${margin},${margin})`);
const graphWidth = width - 2 * margin, graphHeight = height - 2 * margin;

const xScale = d3.scaleLinear().domain([-10, 10]).range([0, graphWidth]);
const yScale = d3.scaleLinear().domain([0, 1]).range([graphHeight, 0]);

g.append("g").attr("transform", `translate(0,${graphHeight})`).call(d3.axisBottom(xScale));
g.append("g").call(d3.axisLeft(yScale));
g.append("text").attr("x", graphWidth / 2).attr("y", graphHeight + 35).attr("text-anchor", "middle").text("Input Weighted Sum");
g.append("text").attr("transform", "rotate(-90)").attr("x", -graphHeight / 2).attr("y", -30).attr("text-anchor", "middle").text("Sigmoid Output");

const sigmoid = x => 1 / (1 + Math.exp(-x));
const line = d3.line().x(d => xScale(d.x)).y(d => yScale(sigmoid(d.x)));

const sigmoidData = d3.range(-10, 10, 0.1).map(x => ({ x, y: sigmoid(x) }));
g.append("path").datum(sigmoidData).attr("fill", "none").attr("stroke", "blue").attr("stroke-width", 2).attr("d", line);

const outputCircle = g.append("circle").attr("r", 5).attr("fill", "red");

function updateSigmoidPoint() {
    let x1 = +document.getElementById("x1").value;
    let x2 = +document.getElementById("x2").value;
    let b = +document.getElementById("bias").value;

    let weightedSum = x1 + x2 + b;
    let output = sigmoid(weightedSum);

    outputCircle.attr("cx", xScale(weightedSum)).attr("cy", yScale(output));
}

document.getElementById("x1").addEventListener("input", updateSigmoidPoint);
document.getElementById("x2").addEventListener("input", updateSigmoidPoint);
document.getElementById("bias").addEventListener("input", updateSigmoidPoint);

updateSigmoidPoint();

const width_decision = 500, height_decision = 500, margin_decision = 50;
const svg_decision = d3.select("#scatter-plot");
const g_decision = svg_decision.append("g").attr("transform", `translate(${width_decision / 2},${height_decision / 2})`);

// Scales (Cartesian System)
const xScale_decision = d3.scaleLinear().domain([-5, 5]).range([-width_decision / 2 + margin_decision, width_decision / 2 - margin_decision]);
const yScale_decision = d3.scaleLinear().domain([-5, 5]).range([height_decision / 2 - margin_decision, -height_decision / 2 + margin_decision]);

// Axes
g_decision.append("g").attr("transform", `translate(0,${yScale_decision(0)})`).call(d3.axisBottom(xScale_decision));
g_decision.append("g").attr("transform", `translate(${xScale_decision(0)},0)`).call(d3.axisLeft(yScale_decision));

// Labels
g_decision.append("text").attr("x", width_decision / 2 - 60).attr("y", yScale_decision(0) - 10).text("x1");
g_decision.append("text").attr("x", xScale_decision(0) + 5).attr("y", -height_decision / 2 + 60).text("x2");

// Sample points
const data = [
    { x1: -2, x2: -2, class: 0 }, { x1: -1, x2: -1, class: 0 }, { x1: -2, x2: 1, class: 0 },
    { x1: 2, x2: 2, class: 1 }, { x1: 1, x2: 1, class: 1 }, { x1: 2, x2: -1, class: 1 }
];

// Color scale for classification
const colorScale = d3.scaleOrdinal().domain([0, 1]).range(["red", "blue"]);

// Plot points
g_decision.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale_decision(d.x1))
    .attr("cy", d => yScale_decision(d.x2))
    .attr("r", 5)
    .attr("fill", d => colorScale(d.class));

// Line for decision boundary
const decisionLine = g_decision.append("line").attr("stroke", "black").attr("stroke-width", 2);

function updateDecisionBoundary() {
    let w1 = +document.getElementById("w1").value;
    let w2 = +document.getElementById("w2").value;
    let b = +document.getElementById("bias").value;

    if (w2 === 0) return; // Avoid division by zero

    // Calculate decision boundary that always passes through (0,0)
    let x1_left = -5, x2_left = (-w1 * x1_left - b) / w2;
    let x1_right = 5, x2_right = (-w1 * x1_right - b) / w2;

    // Update the line
    decisionLine
        .attr("x1", xScale_decision(x1_left))
        .attr("y1", yScale_decision(x2_left))
        .attr("x2", xScale_decision(x1_right))
        .attr("y2", yScale_decision(x2_right));
}

// Event listeners for sliders
document.getElementById("w1").addEventListener("input", updateDecisionBoundary);
document.getElementById("w2").addEventListener("input", updateDecisionBoundary);
document.getElementById("bias").addEventListener("input", updateDecisionBoundary);

updateDecisionBoundary(); // Initialize the first time


const width_xor = 500, height_xor = 500, margin_xor = 50;
const svg_xor = d3.select("#scatter-xor");
const g_xor = svg_xor.append("g").attr("transform", `translate(${width_xor / 2},${height_xor / 2})`);

// Scales (Cartesian System)
const xScale_xor = d3.scaleLinear().domain([-0.5, 1.5]).range([-width_xor / 2 + margin_xor, width_xor / 2 - margin_xor]);
const yScale_xor = d3.scaleLinear().domain([-0.5, 1.5]).range([height_xor / 2 - margin_xor, -height_xor / 2 + margin_xor]);

// Axes
g_xor.append("g").attr("transform", `translate(0,${yScale_xor(0)})`).call(d3.axisBottom(xScale_xor));
g_xor.append("g").attr("transform", `translate(${xScale_xor(0)},0)`).call(d3.axisLeft(yScale_xor));

// Labels
g_xor.append("text").attr("x", width_xor / 2 - 60).attr("y", yScale_xor(0) - 10).text("x1");
g_xor.append("text").attr("x", xScale_xor(0) + 5).attr("y", -height_xor / 2 + 60).text("x2");

// Sample points
const data_xor = [
    { x1: 0, x2: 0, class: 0 }, { x1: 1, x2: 1, class: 0 },
    { x1: 0, x2: 1, class: 1 }, { x1: 1, x2: 0, class: 1 }
];

// Color scale for classification
// const colorScale = d3.scaleOrdinal().domain([0, 1]).range(["red", "blue"]);

// Plot points
g_xor.selectAll("circle")
    .data(data_xor)
    .enter()
    .append("circle")
    .attr("cx", d => xScale_xor(d.x1))
    .attr("cy", d => yScale_xor(d.x2))
    .attr("r", 5)
    .attr("fill", d => colorScale(d.class));

// Line for decision boundary
const decisionLine_xor = g_xor.append("line").attr("stroke", "black").attr("stroke-width", 2);

function updateDecisionBoundary_xor() {
    let w1 = +document.getElementById("w1_xor").value;
    let w2 = +document.getElementById("w2_xor").value;
    let b = +document.getElementById("bias_xor").value;

    if (w2 === 0) return; // Avoid division by zero

    // Calculate decision boundary that always passes through (0,0)
    let x1_left = -5, x2_left = (-w1 * x1_left - b) / w2;
    let x1_right = 5, x2_right = (-w1 * x1_right - b) / w2;

    // Update the line
    decisionLine_xor
        .attr("x1", xScale_xor(x1_left))
        .attr("y1", yScale_xor(x2_left))
        .attr("x2", xScale_xor(x1_right))
        .attr("y2", yScale_xor(x2_right));
}

// Event listeners for sliders
document.getElementById("w1_xor").addEventListener("input", updateDecisionBoundary_xor);
document.getElementById("w2_xor").addEventListener("input", updateDecisionBoundary_xor);
document.getElementById("bias_xor").addEventListener("input", updateDecisionBoundary_xor);

updateDecisionBoundary_xor(); // Initialize the first time


const svg_mlp = d3.select("#svg_mlp")
    .attr("width", width)
    .attr("height", height);

// Nodes and links for MLP
const nodes_mlp = [
    { id: "Entrada #1", x: 100, y: 100, color: "lightcoral" },
    { id: "Entrada #2", x: 100, y: 200, color: "lightcoral" },
    { id: "Entrada #3", x: 100, y: 300, color: "lightcoral" },
    { id: "Hidden #1", x: 300, y: 50, color: "lightblue" },
    { id: "Hidden #2", x: 300, y: 150, color: "lightblue" },
    { id: "Hidden #3", x: 300, y: 250, color: "lightblue" },
    { id: "Hidden #4", x: 300, y: 350, color: "lightblue" },
    
    { id: "Saída", x: 500, y: 200, color: "gold" }
];

const links_mlp = [
    { source: "Entrada #1", target: "Hidden #1" },
    { source: "Entrada #1", target: "Hidden #2" },
    { source: "Entrada #1", target: "Hidden #3" },
    { source: "Entrada #1", target: "Hidden #4" },
    { source: "Entrada #2", target: "Hidden #1" },
    { source: "Entrada #2", target: "Hidden #2" },
    { source: "Entrada #2", target: "Hidden #3" },
    { source: "Entrada #2", target: "Hidden #4" },
    { source: "Entrada #3", target: "Hidden #1" },
    { source: "Entrada #3", target: "Hidden #2" },
    { source: "Entrada #3", target: "Hidden #3" },
    { source: "Entrada #3", target: "Hidden #4" },
    { source: "Hidden #1", target: "Saída" },
    { source: "Hidden #2", target: "Saída" },
    { source: "Hidden #3", target: "Saída" },
    { source: "Hidden #4", target: "Saída" }
];

// Draw links (initially collapsed at the source node)
svg_mlp.selectAll(".link")
    .data(links_mlp)
    .enter()
    .append("line")
    .attr("class", "link_mlp")
    .attr("x1", d => nodes_mlp.find(n => n.id === d.source).x)
    .attr("y1", d => nodes_mlp.find(n => n.id === d.source).y)
    .attr("x2", d => nodes_mlp.find(n => n.id === d.source).x)
    .attr("y2", d => nodes_mlp.find(n => n.id === d.source).y)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

// Draw nodes
const nodeElements_mlp = svg_mlp.selectAll(".node")
    .data(nodes_mlp)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 30)
    .attr("fill", d => d.color);

// Add labels
svg_mlp.selectAll(".text")
    .data(nodes_mlp)
    .enter()
    .append("text")
    .attr("class", "text")
    .attr("x", d => d.x)
    .attr("y", d => d.y - 40)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .text(d => d.id)
    .attr("fill", "black");

// Function to animate data flow for MLP
function animateFlow_mlp() {
    svg_mlp.selectAll(".link_mlp")
        .transition()
        .duration(1000)
        .attr("x2", d => nodes_mlp.find(n => n.id === d.target).x)
        .attr("y2", d => nodes_mlp.find(n => n.id === d.target).y)
        .on("end", () => {
            setTimeout(() => {
                svg_mlp.selectAll(".link_mlp")
                    .attr("x2", d => nodes_mlp.find(n => n.id === d.source).x)
                    .attr("y2", d => nodes_mlp.find(n => n.id === d.source).y);
                animateFlow_mlp();
            }, 5000); // 5 seconds delay
        });
}

// Start animation
animateFlow_mlp();

const svg_decision_mlp = d3.select("#svg_xor_mlp");
const new_width = 500, new_height = 500, new_margin = 50;
// Define scales
const xScale_xor_mlp = d3.scaleLinear().domain([0, 1]).range([new_margin, new_width - new_margin]);
const yScale_xor_mlp = d3.scaleLinear().domain([0, 1]).range([new_height - new_margin, new_margin]);

// XOR dataset
const points_xor = [
    { x: 0, y: 0, label: 0 },
    { x: 1, y: 1, label: 0 },
    { x: 0, y: 1, label: 1 },
    { x: 1, y: 0, label: 1 }
];

// Hidden neurons
let hidden_neurons = [
    { w: [1, 1], b: -0.5 },  // Neuron 1
    { w: [1, 1], b: -1.5 }   // Neuron 2
];

// Function to compute decision lines
function computeLine(neuron) {
    let x1 = 0, x2 = 1;
    let y1 = (-neuron.w[0] * x1 - neuron.b) / neuron.w[1];
    let y2 = (-neuron.w[0] * x2 - neuron.b) / neuron.w[1];
    return { x1, y1, x2, y2 };
}

let line1 = computeLine(hidden_neurons[0]);
let line2 = computeLine(hidden_neurons[1]);

// Draw background (decision region)
svg_decision_mlp.append("rect")
    .attr("x", new_margin)
    .attr("y", new_margin)
    .attr("width", new_width - 2 * new_margin)
    .attr("height", new_height - 2 * new_margin)
    .attr("fill", "lightblue");

// Draw red decision region between the two lines
svg_decision_mlp.append("polygon")
    .attr("points", `
        ${xScale_xor_mlp(line1.x1)},${yScale_xor_mlp(line1.y1)}
        ${xScale_xor_mlp(line1.x2)},${yScale_xor_mlp(line1.y2)}
        ${xScale_xor_mlp(line2.x2)},${yScale_xor_mlp(line2.y2)}
        ${xScale_xor_mlp(line2.x1)},${yScale_xor_mlp(line2.y1)}
    `)
    .attr("fill", "orange")
    .attr("opacity", 0.7);

// Draw decision lines
hidden_neurons.forEach(neuron => {
    let line = computeLine(neuron);
    svg_decision_mlp.append("line") // Fix: Correct variable name
        .attr("x1", xScale_xor_mlp(line.x1))
        .attr("y1", yScale_xor_mlp(line.y1))
        .attr("x2", xScale_xor_mlp(line.x2))
        .attr("y2", yScale_xor_mlp(line.y2))
        .attr("stroke", "black")
        .attr("stroke-dasharray", "5,5")
        .attr("stroke-width", 2);
});

// Plot XOR points
svg_decision_mlp.selectAll(".dot")
    .data(points_xor)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", d => xScale_xor_mlp(d.x))
    .attr("cy", d => yScale_xor_mlp(d.y))
    .attr("r", 8)
    .attr("fill", d => d.label === 1 ? "red" : "blue");

// Add axes
svg_decision_mlp.append("g")
    .attr("transform", `translate(0,${new_height - new_margin})`)
    .call(d3.axisBottom(xScale_xor_mlp).ticks(3));

svg_decision_mlp.append("g")
    .attr("transform", `translate(${margin},0)`)
    .call(d3.axisLeft(yScale_xor_mlp).ticks(3));
