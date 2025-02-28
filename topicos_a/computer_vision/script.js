// Configurações gerais
const maxWidth = 256;  // Largura máxima da imagem
const maxHeight = 256; // Altura máxima da imagem

// Seleciona o canvas para exibir a imagem
const canvas = document.getElementById("image-canvas");
const ctx = canvas.getContext("2d");

function resizeImage(img, maxWidth, maxHeight) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Calcula a proporção de redimensionamento
    const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
    const newWidth = img.width * ratio;
    const newHeight = img.height * ratio;

    // Define o tamanho do canvas
    canvas.width = maxWidth;
    canvas.height = maxHeight;

    // Calcula as coordenadas para centralizar a imagem no canvas
    const offsetX = (maxWidth - newWidth) / 2;
    const offsetY = (maxHeight - newHeight) / 2;

    // Preenche o canvas com uma cor de fundo (opcional)
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, maxWidth, maxHeight);

    // Desenha a imagem redimensionada e centralizada no canvas
    ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

    return canvas;
}
// Função para encontrar a próxima potência de 2
function nextPowerOfTwo(value) {
    return Math.pow(2, Math.ceil(Math.log(value) / Math.log(2)));
}

// Função para redimensionar a imagem para potências de 2
function resizeToPowerOfTwo(img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Encontra a próxima potência de 2 para largura e altura
    const newWidth = nextPowerOfTwo(img.width);
    const newHeight = nextPowerOfTwo(img.height);

    // Redimensiona a imagem
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    return canvas;
}

// Função para aplicar convolução na imagem
function convolute(pixels, width, height, kernel) {
    const output = new Uint8ClampedArray(pixels.length);
    const kernelSize = kernel.length;
    const kernelRadius = Math.floor(kernelSize / 2);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0;

            for (let ky = -kernelRadius; ky <= kernelRadius; ky++) {
                for (let kx = -kernelRadius; kx <= kernelRadius; kx++) {
                    const pixelX = x + kx;
                    const pixelY = y + ky;

                    if (pixelX >= 0 && pixelX < width && pixelY >= 0 && pixelY < height) {
                        const pixelIndex = (pixelY * width + pixelX) * 4;
                        const weight = kernel[ky + kernelRadius][kx + kernelRadius];

                        r += pixels[pixelIndex] * weight;
                        g += pixels[pixelIndex + 1] * weight;
                        b += pixels[pixelIndex + 2] * weight;
                    }
                }
            }

            const outputIndex = (y * width + x) * 4;
            output[outputIndex] = r;
            output[outputIndex + 1] = g;
            output[outputIndex + 2] = b;
            output[outputIndex + 3] = 255; // Alpha fixo
        }
    }

    return output;
}

// Função para desenhar a imagem no canvas
function drawImageOnCanvas(imageData, canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas com ID "${canvasId}" não encontrado.`);
        return;
    }

    const ctx = canvas.getContext("2d");
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = imageData.width;
    tempCanvas.height = imageData.height;
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.putImageData(imageData, 0, 0);

    // Redimensiona a imagem para caber no canvas
    ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
}

function loadAndProcessImage(imagePath, canvasId, kernel) {
    const img = new Image();
    img.src = imagePath;
    img.onload = () => {
        // Redimensiona a imagem para potências de 2
        const resizedCanvas = resizeToPowerOfTwo(img);

        // Obtém os dados da imagem redimensionada
        const resizedImageData = resizedCanvas.getContext("2d").getImageData(0, 0, resizedCanvas.width, resizedCanvas.height);

        // Converte a imagem para escala de cinza
        const grayImageData = convertToGrayscale(resizedCanvas, resizedCanvas.width, resizedCanvas.height);

        // Exibe a imagem em escala de cinza no canvas da esquerda
        const grayscaleCanvas = document.getElementById("grayscale-canvas");
        if (grayscaleCanvas) {
            const grayscaleCtx = grayscaleCanvas.getContext("2d");
            grayscaleCtx.putImageData(grayImageData, 0, 0);
        }

        // Aplica o kernel personalizado
        const filteredPixels = convolute(grayImageData.data, resizedCanvas.width, resizedCanvas.height, kernel);
        const filteredImageData = new ImageData(filteredPixels, resizedCanvas.width, resizedCanvas.height);

        // Exibe a imagem processada no canvas
        drawImageOnCanvas(filteredImageData, canvasId);
    };
}

// Função para obter o kernel com base no filtro selecionado
function getKernel(filterType) {
    switch (filterType) {
        case "blur":
            return [
                [1 / 9, 1 / 9, 1 / 9],
                [1 / 9, 1 / 9, 1 / 9],
                [1 / 9, 1 / 9, 1 / 9]
            ];
        case "edge":
            return [
                [-1, -1, -1],
                [-1, 8, -1],
                [-1, -1, -1]
            ];
        case "sharpen":
            return [
                [0, -1, 0],
                [-1, 5, -1],
                [0, -1, 0]
            ];
        default:
            return [
                [0, 0, 0],
                [0, 1, 0],
                [0, 0, 0]
            ];
    }
}

// Interatividade: Aplicar diferentes filtros
document.getElementById("filter-select").addEventListener("change", function () {
    const kernel = getKernel(this.value);
    loadAndProcessImage("example-figure.jpg", "domain-canvas", kernel);
});

// Carrega a imagem inicial
loadAndProcessImage("example-figure.jpg", "image-canvas", getKernel("none"));

// Função para aplicar o kernel definido pelo usuário
document.getElementById("apply-kernel").addEventListener("click", function () {
    applyCustomKernel();
});

function applyCustomKernel() {
    // Obtém os valores do kernel da tabela
    const kernel = [];
    const inputs = document.querySelectorAll("#kernel-input input");
    inputs.forEach((input, index) => {
        const row = Math.floor(index / 3);
        if (!kernel[row]) kernel[row] = [];
        kernel[row].push(parseFloat(input.value));
    });

    // Aplica o kernel personalizado à imagem
    loadAndProcessImage("example-figure.jpg", "time-domain-canvas", kernel);
}

// Função para processar a FFT
document.getElementById("uploadImage").addEventListener("change", function(event) {
    const canvasInput = document.getElementById("canvasInput");
    const ctx = canvasInput.getContext("2d");

    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvasInput.width, canvasInput.height);
        processFFT(canvasInput);
    };
    img.src = URL.createObjectURL(event.target.files[0]);
});

function processFFT(canvas) {
    const width = canvas.width;
    const height = canvas.height;
    const grayPixels = convertToGrayscale(canvas, width, height);
    const { magnitude, phase } = computeFFT2D(grayPixels, width, height);
    displayFourierResults(magnitude, phase, width, height);
}

function convertToGrayscale(canvas, width, height) {
    if (!canvas || !canvas.getContext) {
        console.error("Canvas inválido para convertToGrayscale.");
        return null;
    }

    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const grayPixels = new Uint8ClampedArray(width * height * 4); // Mantém o formato RGBA

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
        const grayValue = 0.299 * r + 0.587 * g + 0.114 * b; // Conversão para escala de cinza

        // Define o valor de escala de cinza para todos os canais (R, G, B)
        grayPixels[i] = grayValue;
        grayPixels[i + 1] = grayValue;
        grayPixels[i + 2] = grayValue;
        grayPixels[i + 3] = 255; // Mantém o canal alpha
    }

    return new ImageData(grayPixels, width, height);
}

function computeFFT2D(data, width, height) {
    // Converte os dados para números complexos
    let complex = new Array(width * height);
    for (let i = 0; i < complex.length; i++) {
        complex[i] = { re: data[i], im: 0 };
    }

    // Aplica a FFT nas linhas
    for (let y = 0; y < height; y++) {
        let row = complex.slice(y * width, (y + 1) * width);
        row = fft1D(row);
        complex.splice(y * width, width, ...row);
    }

    // Aplica a FFT nas colunas
    for (let x = 0; x < width; x++) {
        let col = [];
        for (let y = 0; y < height; y++) {
            col.push(complex[y * width + x]);
        }
        col = fft1D(col);
        for (let y = 0; y < height; y++) {
            complex[y * width + x] = col[y];
        }
    }

    // Calcula a magnitude e a fase
    const magnitude = new Float32Array(width * height);
    const phase = new Float32Array(width * height);
    for (let i = 0; i < complex.length; i++) {
        const { re, im } = complex[i];
        magnitude[i] = Math.sqrt(re * re + im * im);
        phase[i] = Math.atan2(im, re);
    }

    return { magnitude, phase };
}

function fft1D(input) {
    if (!Array.isArray(input)) {
        console.error("A entrada da FFT deve ser um array.");
        return [];
    }

    const N = input.length;
    if (N <= 1) return input;

    // Divide os dados em partes pares e ímpares
    let even = [], odd = [];
    for (let i = 0; i < N / 2; i++) {
        even.push(input[i * 2]);
        odd.push(input[i * 2 + 1]);
    }

    // Aplica a FFT recursivamente nas partes pares e ímpares
    even = fft1D(even);
    odd = fft1D(odd);

    // Combina os resultados
    const output = new Array(N);
    for (let k = 0; k < N / 2; k++) {
        const angle = (-2 * Math.PI * k) / N;
        const exp = { re: Math.cos(angle), im: Math.sin(angle) };

        // Multiplica a parte ímpar pelo fator de rotação
        const t = {
            re: exp.re * odd[k].re - exp.im * odd[k].im,
            im: exp.re * odd[k].im + exp.im * odd[k].re
        };

        // Combina as partes par e ímpar
        output[k] = { re: even[k].re + t.re, im: even[k].im + t.im };
        output[k + N / 2] = { re: even[k].re - t.re, im: even[k].im - t.im };
    }

    return output;
}

function displayFourierResults(magnitude, phase, width, height) {
    const canvasMagnitude = document.getElementById("canvasMagnitude");
    const canvasPhase = document.getElementById("canvasPhase");

    const ctxMagnitude = canvasMagnitude.getContext("2d");
    const ctxPhase = canvasPhase.getContext("2d");

    // Normaliza a magnitude usando escala logarítmica
    const maxMagnitude = Math.max(...magnitude);
    const magnitudeData = ctxMagnitude.createImageData(width, height);
    for (let i = 0; i < magnitude.length; i++) {
        const value = (Math.log(1 + magnitude[i]) / Math.log(1 + maxMagnitude)) * 255;
        magnitudeData.data[i * 4] = magnitudeData.data[i * 4 + 1] = magnitudeData.data[i * 4 + 2] = value;
        magnitudeData.data[i * 4 + 3] = 255;
    }
    ctxMagnitude.putImageData(magnitudeData, 0, 0);

    // Normaliza a fase para o intervalo [0, 255]
    const phaseData = ctxPhase.createImageData(width, height);
    for (let i = 0; i < phase.length; i++) {
        const value = ((phase[i] + Math.PI) / (2 * Math.PI)) * 255;
        phaseData.data[i * 4] = phaseData.data[i * 4 + 1] = phaseData.data[i * 4 + 2] = value;
        phaseData.data[i * 4 + 3] = 255;
    }
    ctxPhase.putImageData(phaseData, 0, 0);
}

function applyFrequencyDomainFilter(filterType, cutoffRadius) {
    const img = new Image();
    img.src = "example-figure.jpg"; // Carrega a imagem de exemplo
    img.onload = function () {
        // Redimensiona a imagem para potências de 2
        const resizedCanvas = resizeToPowerOfTwo(img);

        // Converte a imagem para escala de cinza
        const grayPixels = convertToGrayscale(resizedCanvas, resizedCanvas.width, resizedCanvas.height);

        // Aplica a FFT
        const { magnitude, phase } = computeFFT2D(grayPixels, resizedCanvas.width, resizedCanvas.height);

        // Aplica o filtro no domínio da frequência
        const filteredMagnitude = applyFrequencyFilter(magnitude, resizedCanvas.width, resizedCanvas.height, filterType, cutoffRadius);

        // Reconstroi a imagem no domínio do tempo
        const filteredImageData = reconstructImage(filteredMagnitude, phase, resizedCanvas.width, resizedCanvas.height);

        // Exibe a imagem filtrada
        const canvasFiltered = document.getElementById("frequency-domain-canvas");
        const ctxFiltered = canvasFiltered.getContext("2d");
        ctxFiltered.putImageData(filteredImageData, 0, 0);
    };
}

function applyFrequencyFilter(magnitude, width, height, filterType, cutoffRadius) {
    const filteredMagnitude = new Float32Array(magnitude.length);

    for (let u = 0; u < width; u++) {
        for (let v = 0; v < height; v++) {
            const distance = Math.sqrt((u - width / 2) ** 2 + (v - height / 2) ** 2);
            if (filterType === "low-pass" && distance <= cutoffRadius) {
                filteredMagnitude[v * width + u] = magnitude[v * width + u];
            } else if (filterType === "high-pass" && distance > cutoffRadius) {
                filteredMagnitude[v * width + u] = magnitude[v * width + u];
            }
        }
    }

    return filteredMagnitude;
}

function reconstructImage(magnitude, phase, width, height) {
    const imageData = new ImageData(width, height);

    for (let i = 0; i < magnitude.length; i++) {
        const value = magnitude[i];
        imageData.data[i * 4] = value; // Canal vermelho
        imageData.data[i * 4 + 1] = value; // Canal verde
        imageData.data[i * 4 + 2] = value; // Canal azul
        imageData.data[i * 4 + 3] = 255; // Canal alpha (totalmente opaco)
    }

    return imageData;
}

// // Event listeners para interatividade
// document.getElementById("frequency-domain-filter-select").addEventListener("change", function () {
//     applyFrequencyDomainFilter(this.value, document.getElementById("cutoff-radius").value);
// });

// document.getElementById("cutoff-radius").addEventListener("input", function () {
//     applyFrequencyDomainFilter(document.getElementById("frequency-domain-filter-select").value, this.value);
// });

function applySobelFilter(imageData) {
    if (!imageData || !imageData.data || !imageData.width || !imageData.height) {
        console.error("Dados de entrada inválidos para applySobelFilter.");
        return null;
    }

    const width = imageData.width;
    const height = imageData.height;
    const pixels = imageData.data;

    // Kernels de Sobel
    const sobelX = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ];

    const sobelY = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1]
    ];

    const output = new Uint8ClampedArray(pixels.length);

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let gx = 0, gy = 0;

            // Aplica os kernels de Sobel
            for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                    const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
                    const grayValue = pixels[pixelIndex]; // Usa o canal vermelho (escala de cinza)

                    gx += grayValue * sobelX[ky + 1][kx + 1];
                    gy += grayValue * sobelY[ky + 1][kx + 1];
                }
            }

            // Calcula a magnitude do gradiente
            const magnitude = Math.sqrt(gx * gx + gy * gy);

            // Define o valor do pixel na imagem resultante
            const outputIndex = (y * width + x) * 4;
            output[outputIndex] = magnitude;
            output[outputIndex + 1] = magnitude;
            output[outputIndex + 2] = magnitude;
            output[outputIndex + 3] = 255; // Alpha fixo
        }
    }

    return new ImageData(output, width, height);
}

function applyCannyFilter(imageData) {
    // Aplica o filtro de Sobel como primeira etapa
    const sobelData = applySobelFilter(imageData);

    // Aplica um limiar para destacar as bordas
    const threshold = 128; // Ajuste conforme necessário
    const pixels = sobelData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        const grayValue = pixels[i];
        if (grayValue > threshold) {
            pixels[i] = pixels[i + 1] = pixels[i + 2] = 255; // Bordas brancas
        } else {
            pixels[i] = pixels[i + 1] = pixels[i + 2] = 0; // Fundo preto
        }
    }

    return sobelData;
}

// Função para aplicar o filtro de borda selecionado
function applyEdgeFilter(filterType) {
    const img = new Image();
    img.src = "example-figure.jpg"; // Carrega a imagem de exemplo
    img.onload = function () {
        // Redimensiona a imagem proporcionalmente e centraliza no canvas
        const resizedCanvas = resizeImage(img, maxWidth, maxHeight);

        // Converte a imagem para escala de cinza
        const grayImageData = convertToGrayscale(resizedCanvas, resizedCanvas.width, resizedCanvas.height);

        if (!grayImageData) {
            console.error("Falha ao converter a imagem para escala de cinza.");
            return;
        }

        // Exibe a imagem em escala de cinza no canvas da esquerda
        const grayscaleCanvas = document.getElementById("grayscale-canvas");
        if (!grayscaleCanvas) {
            console.error("Canvas com ID 'grayscale-canvas' não encontrado.");
            return;
        }

        const grayscaleCtx = grayscaleCanvas.getContext("2d");
        grayscaleCtx.putImageData(grayImageData, 0, 0);

        // Aplica o filtro selecionado
        let filteredImageData;
        if (filterType === "sobel") {
            filteredImageData = applySobelFilter(grayImageData);
        } else if (filterType === "canny") {
            filteredImageData = applyCannyFilter(grayImageData);
        }

        if (!filteredImageData) {
            console.error("Falha ao aplicar o filtro de borda.");
            return;
        }

        // Exibe a imagem filtrada no canvas da direita
        const edgeCanvas = document.getElementById("edge-canvas");
        if (!edgeCanvas) {
            console.error("Canvas com ID 'edge-canvas' não encontrado.");
            return;
        }

        const edgeCtx = edgeCanvas.getContext("2d");
        edgeCtx.putImageData(filteredImageData, 0, 0);
    };
}

// Adiciona o event listener para o filtro de borda
document.addEventListener("DOMContentLoaded", function () {
    const edgeFilterSelect = document.getElementById("edge-filter-select");
    if (edgeFilterSelect) {
        edgeFilterSelect.addEventListener("change", function () {
            applyEdgeFilter(this.value);
        });
    } else {
        console.error("Elemento com ID 'edge-filter-select' não encontrado.");
    }
});