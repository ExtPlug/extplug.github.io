const opts = require('minimist')(process.argv.slice(2))

const metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')
const postcss = require('metalsmith-postcss')
const browserify = require('metalsmith-browserify')
const serve = require('metalsmith-serve')
const watch = require('metalsmith-watch')

const production = process.env.NODE_ENV === 'production'

const postcssPlugins = {
  'postcss-cssnext': {
    features: {
      autoprefixer: false
    }
  }
}

if (production) {
  postcssPlugins.cssnano = {}
}

const bundler = browserify({
  dest: 'discover.js',
  entries: ['src/discover/app.js']
})

bundler.bundle.transform('babelify', {
  presets: [
    ['env', {
      targets: {
        uglify: production,
        browsers: 'last 2 versions'
      }
    }]
  ],
  plugins: [
    'yo-yoify'
  ]
})

if (production) {
  bundler.bundle.transform('uglifyify', {
    global: true
  })
}

const compiler = metalsmith(__dirname)
  .use(layouts('handlebars'))
  .use(postcss({ plugins: postcssPlugins }))
  .use(bundler)

if (opts.watch) {
  compiler.use(serve({ port: opts.port || process.env.PORT || 8080 }))
  compiler.use(watch())
}

compiler.build((err) => {
  if (err) console.error(err.stack)
  else console.log('ok')
})
