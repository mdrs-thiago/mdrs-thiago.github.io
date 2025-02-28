document.addEventListener('DOMContentLoaded', () => {
    const weights = document.querySelectorAll('.weight');
    
    weights.forEach(weight => {
        weight.addEventListener('click', () => {
            const newValue = prompt('Enter new weight value:', weight.textContent);
            if (newValue !== null) {
                weight.textContent = parseFloat(newValue).toFixed(2);
                updateNetwork();
            }
        });
    });

    function updateNetwork() {
        const input1 = parseFloat(document.getElementById('input1').value);
        const input2 = parseFloat(document.getElementById('input2').value);
        const weight1 = parseFloat(document.getElementById('weight1').textContent);
        const weight2 = parseFloat(document.getElementById('weight2').textContent);
        const weight3 = parseFloat(document.getElementById('weight3').textContent);
        const hidden = (input1 * weight1) + (input2 * weight2);
        const result = hidden * weight3;
        document.getElementById('output').textContent = result.toFixed(2);
    }

    document.getElementById('input1').addEventListener('input', updateNetwork);
    document.getElementById('input2').addEventListener('input', updateNetwork);
});
