/** @type {import('tailwindcss/defaultConfig')} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            sans: "'Inter', sans-serif",
            mono: '"Roboto Mono", monospace',
        },
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
};
