module.exports = {
  srcDir: 'src',
  head: {
    title: 'Turf.js | Advanced geospatial analysis',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Turf.js | Advanced geospatial analysis for browsers and Node.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:200,400' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Istok+Web' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/iview/2.7.4/styles/iview.css' }
    ]
  },
  plugins: [
    { src: '~plugins/highlight' },
    { src: '~plugins/DomPortal' },
    { src: '~plugins/iview', ssr: true },
    { src: '~plugins/Visibility', ssr: false }
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    // babel: {
    //   'plugins': [['import', {
    //     'libraryName': 'iview',
    //     'libraryDirectory': 'src/components'
    //   }]]
    // },
    publicPath: 'js/',
    vendor: [
      'iview'
    ],
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.vue$/,
        loader: 'iview-loader',
        options: {
          prefix: false
        }
      })
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    dir: './dist',
    publicPath: './js',
    minify: false
  }
}
