tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
                // "serif" is kept as the class name used across pages; it now maps to the display face.
                serif: ['"Bricolage Grotesque"', '"Arial Narrow"', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
            },
            colors: {
                paper: { DEFAULT: '#EDF1EC', raised: '#F8FAF6' },
                ink: { DEFAULT: '#0F1F1B', muted: '#4A5C55', faint: '#6E8079' },
                line: { DEFAULT: '#D3DED7', strong: '#B7C8BF' },
                accent: { light: '#DCEAE4', DEFAULT: '#0B5D52', dark: '#084840' },
                signal: { DEFAULT: '#FFC21A' }
            },
            boxShadow: {
                soft: '0 2px 12px -4px rgba(15,31,27,0.08)',
                float: '0 8px 30px -12px rgba(15,31,27,0.14)'
            }
        }
    }
};
