const metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')
const less = require('metalsmith-less')
const browserify = require('metalsmith-browserify')

metalsmith(__dirname)
  .use(layouts('handlebars'))
  .use(less())
  .use(browserify({
    dest: 'discover.js',
    entries: ['src/discover/app.js']
  }))
  .build((err) => {
    if (err) console.error(err.stack)
    else console.log('ok')
  })
