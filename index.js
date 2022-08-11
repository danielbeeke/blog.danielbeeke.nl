import Metalsmith from 'metalsmith'
import collections from 'metalsmith-collections'
import layouts from 'metalsmith-layouts'
import markdown from 'metalsmith-markdown'
import permalinks from '@metalsmith/permalinks'
import serve from 'metalsmith-serve'
import watch from 'metalsmith-watch'
import sass from 'metalsmith-dart-sass'
import discoverPartials from 'metalsmith-discover-partials'
import assets from 'metalsmith-assets'
import dateFormatter from 'metalsmith-date-formatter'
import Handlebars from 'handlebars'
import HandlebarsLayouts from 'handlebars-layouts'

Handlebars.registerHelper(HandlebarsLayouts(Handlebars))

Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context)
})

let liveReload

Metalsmith('./')
.source('./src')
.destination('./build')
.use(serve({
  port: 5000
}))
.use(assets({
  source: './src/public',
  destination: './'
}))
.use(dateFormatter({
  dates: [
    { key: 'date',format: 'DD MM YYYY' }
  ]
}))
.metadata({
  sitename: 'MediaWorks',
  siteurl: 'https://mediaworks.global'
})
.use(discoverPartials({
  directory: 'src/partials',
}))
.use(sass())
.use(collections({
  pages: { pattern: 'pages/*.md' },
  services: { pattern: 'services/*.md' }
}))
.use(markdown())
.use(permalinks({
  pattern: ':title',
  relative: false,

  // Defines the paths for the collections.
  linksets: [
    {
      match: { collection: 'services' },
      pattern: 'services/:title',
    },
    {
      match: { collection: 'pages' },
      pattern: ':title'
    }
  ]
}))
.use(layouts({
  engine: 'handlebars',
  directory: 'src/layouts',
  pattern: "**/*.html"
}))
.use(watch({
  paths: {
    '${source}/**/*': '**/*',
    'scss/**/*': '*'
  },
  livereload: {
    callback: (server) => {
      liveReload = server
    }
  },
  invalidateCache: true
}))
.clean(true)
.build(function(err) {
  setTimeout(() => {
    // Reloads the connected browsers to the local development server.
    for (const client of Object.values(liveReload.clients))
      client.reload(['**/*'])
  }, 800)
  if (err) throw err
})
