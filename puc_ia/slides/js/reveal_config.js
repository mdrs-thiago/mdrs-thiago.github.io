// reveal_config.js
// Exports: window.initRevealFooter (Function)
// PURPOSE: Adds the UERJ Footer and Slide Counter to standard Reveal.js presentations.
// DOES NOT handle Reveal.initialize() - that should be done in the HTML file.

window.initRevealFooter = function (deck) {
    if (!deck) return;

    // --- GLOBAL FOOTER INJECTION ---
    const revealDiv = document.querySelector('.reveal');
    // Only add if not already present
    if (revealDiv && !document.querySelector('.footer')) {
        const footer = document.createElement('div');
        footer.className = 'footer';
        footer.innerHTML = `
            <div class="footer-left">
                <img src="https://upload.wikimedia.org/wikipedia/pt/thumb/0/02/Logo_UERJ.svg/960px-Logo_UERJ.svg.png?20240121013936" class="footer-logo" alt="UERJ Logo">
                <div class="footer-text">
                    Tópicos A • ${document.title}
                </div>
            </div>
            <div class="footer-right">
                <span id="custom-slide-number"></span>
            </div>
        `;
        revealDiv.appendChild(footer);
    }

    // --- SLIDE COUNTER LOGIC ---
    function updateSlideNumber() {
        const indices = deck.getIndices();
        const index = indices.h + 1; // Horizontal index (1-based)
        const total = deck.getTotalSlides();
        const counter = document.getElementById('custom-slide-number');

        if (counter) {
            if (total > 0) {
                counter.textContent = `${index} / ${total}`;
            } else {
                counter.textContent = '';
            }
        }
    }

    // Initial update
    updateSlideNumber();

    // Listen for events to update counter
    deck.on('slidechanged', updateSlideNumber);
    deck.on('slidetransitionend', updateSlideNumber); // Extra safety
};
