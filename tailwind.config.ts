import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      '2xl': {'min': '1279px','max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'min': '1023px','max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'min': '767px','max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'min': '639px','max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'min':'0px', 'max': '639px'}
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
