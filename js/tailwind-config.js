tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['"Source Serif 4"', 'Georgia', 'serif'],
                mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
            },
            colors: {
                paper: { DEFAULT: '#FAF8F3', raised: '#FFFFFF' },
                ink: { DEFAULT: '#211F1C', muted: '#5C574E', faint: '#8B857A' },
                line: { DEFAULT: '#E7E2D8', strong: '#D8D2C4' },
                accent: { light: '#E7EEE9', DEFAULT: '#3F6B54', dark: '#2E5041' }
            },
            boxShadow: {
                soft: '0 2px 12px -4px rgba(33,31,28,0.08)',
                float: '0 8px 30px -12px rgba(33,31,28,0.12)'
            }
        }
    }
};
