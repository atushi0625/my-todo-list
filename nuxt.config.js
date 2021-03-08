const pkg = require('./package')
const webpack = require('webpack')
const Sass = require('sass')
const Fiber = require('fibers')

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,


  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'my-todo-list',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
     "~assets/scss/common.scss"
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
   '~/plugins/firebase',
   '~/plugins/auth',
   '~/plugins/user',
   '~/plugins/vuelidate'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxtjs/vuetify', ['@nuxtjs/vuetify', { /* module options */ }]

  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)

  // env: {
  //   baseURL: process.env.BASE_URL || 'https://firestore.googleapis.com/v1/projects/my-todolist-pj/databases/(default)/documents',
  //   APIkey: process.env.FIREBASE_API_KEY || 'AIzaSyA9TDyjtoOeQ_0pt05jEfQ7jEUdGqmtPXc',
  // },


  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    loaders: {
    scss:{
      implementation: Sass,
      sassOptions: {
        fiber: Fiber
      }
    }
    },
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ]
  },
}
