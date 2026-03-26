/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: '#1e3a8a', // MyM Mother brand blue (adjust as needed if they use a different M&M blue)
                    light: '#3b82f6',
                },
                metallic: {
                    black: '#111827',
                    dark: '#1F2937',
                    gray: '#374151',
                    light: '#F3F4F6',
                    silver: '#E5E7EB',
                }
            },
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
                display: ['"Space Grotesk"', 'sans-serif']
            }
        },
    },
    plugins: [],
}
