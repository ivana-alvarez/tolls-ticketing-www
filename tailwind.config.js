//https://tailwindcss.com/docs/configuration

module.exports = {
    purge: ['./src/**/*.{js,ts,jsx,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            xs: '320px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
        extend: {
            colors: {
                font: '#FBFBFB',
                fontblack: '#2B2B2B',
                green: '#026E29',
                greenO: '#094310',
                primary: {
                    100: '#F2C2A6',
                    200: '#FF9C63',
                    300: '#FE701E',
                    400: '#D75307',
                    500: '#AA3E00',
                },
                secondary: {
                    50: '#C6DDDE',
                    100: '#34787B',
                    200: '#0E5356',
                    300: '#002E30',
                    400: '#001A1C',
                    500: '#030F10',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        //https://tailwindcss.com/docs/plugins#official-plugins
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
