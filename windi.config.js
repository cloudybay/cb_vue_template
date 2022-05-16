const plugin = require('windicss/plugin')
const colors = require('windicss/colors')

module.exports = {
  extract: {
    include: ['./index.html', './src/**/*.{vue,js}'],
  },
	// presets: [
  //   require('./src/libs/cb-theme/tw_preset.js')
  // ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // 擴充 windi 預設的顏色
      colors: {
        gray: colors.trueGray,  // windi 預設的 gray 是 coolGray，這邊用 trueGray 取代掉
      },
    },
  },
  shortcuts: {
    'vertical_center': 'absolute transform top-1/2 -translate-y-1/2',
    'horizontal_center': 'absolute transform left-1/2 -translate-x-1/2',
    'center': 'absolute transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
    'btn_disabled': 'bg-gray-200 text-gray-400 border border-solid border-gray-100 cursor-not-allowed'
  },
  plugins: [
    plugin(({ addUtilities, addVariant }) => {
      addUtilities({
        '.scrollbar-hidden': {
          /* Firefox */
          'scrollbar-width': 'none',

          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
      addVariant('peer-checked', ({ modifySelectors }) => {
        return modifySelectors(({ className }) => {
          return `.peer:checked ~ .${className}`
        })
      })
      addVariant('peer-disabled', ({ modifySelectors }) => {
        return modifySelectors(({ className }) => {
          return `.peer:disabled ~ .${className}`
        })
      })
      addVariant('peer-focus', ({ modifySelectors }) => {
        return modifySelectors(({ className }) => {
          return `.peer:focus ~ .${className}`
        })
      })
    })
  ]
}
