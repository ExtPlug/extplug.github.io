const metalsmith = require('metalsmith')
const layouts = require('metalsmith-layouts')
const less = require('metalsmith-less')

metalsmith(__dirname)
  .use(layouts('handlebars'))
  .use(less())
  .build((err) => {
    if (err) console.error(err.stack)
    else console.log('ok')
  })
