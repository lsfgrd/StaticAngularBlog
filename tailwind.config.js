const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/ui'),
  ],
  purge: {
    enabled: true,
    content: [
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.ts'
    ]
  }
}
