import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        base: false,
    },
} satisfies Config;
