const withImages = require('next-images')
// // const withPWA = require('next-pwa')
// const withSass = require('@zeit/next-sass')
const path = require('path')

module.exports = withImages({
  esModule: true,
})

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer({})

module.exports = {
  distDir: 'build',
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/assets/scss')],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: { plugins: [{ removeViewBox: false }] },
            titleProp: true,
          },
        },
        {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      ],
    })

    return config
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }

    return config
  },
  env: {
    REACT_APP_TIPO_AMB: process.env.REACT_APP_TIPO_AMB,
    ANALYZE: process.env.ANALYZE,
    REACT_APP_URL_API: process.env.REACT_APP_URL_API,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
  },
}

// module.exports = withPWA({
//   pwa: {
//     dest: 'public',
//     disable: process.env.NODE_ENV === 'development',
//     register: true,
//     // scope: '/app',
//     // runtimeCaching,
//     sw: 'sw.js',
//   },
// })

// module.exports = {
//   trailingSlash: true,
//   exportPathMap: function () {
//     return {
//       '/': { page: '/' },
//     }
//   },
// }

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/about',
//         destination: '/',
//       },
//     ]
//   },
// }