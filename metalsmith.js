const opts = require('minimist')(process.argv.slice(2))

const metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')
const less = require('metalsmith-less')
const browserify = require('metalsmith-browserify')
const serve = require('metalsmith-serve')
const watch = require('metalsmith-watch')

const compiler = metalsmith(__dirname)
  .use(layouts('handlebars'))
  .use(less())
  .use(browserify({
    dest: 'discover.js',
    entries: ['src/discover/app.js']
  }))

if (opts.watch) {
  compiler.use(serve({ port: opts.port || process.env.PORT || 8080 }))
  compiler.use(watch())
}

compiler.build((err) => {
  if (err) console.error(err.stack)
  else console.log('ok')
})
