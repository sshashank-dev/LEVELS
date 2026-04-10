/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // High-end technocratic dark palette
                "system-bg": "#050505",       // Deepest black
                "system-card": "#0f0f0f",     // Slightly lighter for cards
                "system-border": "#1e1e1e",   // Subtle borders
                "system-accent": "#3b82f6",   // Electric blue for technical feel
                "system-text-mute": "#71717a" // Muted gray for metadata
            },
            fontFamily: {
                // 'JetBrains Mono' gives it that coding/industrial vibe
                // 'Inter' is for clean, Apple-style readability
                mono: ['JetBrains Mono', 'Menlo', 'monospace'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}