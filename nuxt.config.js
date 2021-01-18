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
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  //  '~/plugins/axios',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
axios:{
credentials: false
},

  env: {
    baseURL: process.env.BASE_URL || 'https://firestore.googleapis.com/v1/projects/my-todolist-pj/databases/(default)/documents',
    API_URL: process.env.API_URL,
    FB_APIkey: process.env.FB_APIkey || 'AIzaSyA9TDyjtoOeQ_0pt05jEfQ7jEUdGqmtPXc'
  },


  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
