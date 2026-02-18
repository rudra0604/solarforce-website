import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "primary": "#0052CC",
                "secondary": "#0f172a",
                "background-light": "#fcfaf8",
                "background-dark": "#1d150c",
            },
            fontFamily: {
                "display": ["var(--font-inter)", "sans-serif"],
                "body": ["var(--font-inter)", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "0.375rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px",
            }
        },
    },
    plugins: [],
};
export default config;
