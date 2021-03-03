import Metalsmith from 'metalsmith'
import collections from 'metalsmith-collections'
import layouts from 'metalsmith-layouts'
import markdown from 'metalsmith-markdown'
import permalinks from 'metalsmith-permalinks'
import serve from 'metalsmith-serve'
import watch from 'metalsmith-watch'
import sass from 'metalsmith-dart-sass'
import discoverPartials from 'metalsmith-discover-partials'
import assets from 'metalsmith-assets'
import dateFormatter from 'metalsmith-date-formatter'

Metalsmith('./')
.source('./src')
.destination('./docs')
.clean(true)
.use(serve({
  port: 5000
}))
.use(assets({
  source: './public',
  destination: './'
}))
.use(dateFormatter({
  dates: [
    {
        key: 'date',
        format: 'DD MM YYYY'
    }
  ]
}))
.metadata({
  sitename: 'Daniel Beeke',
  siteurl: 'https://blog.danielbeeke.nl',
  description: 'Hi, I am Daniël Beeke an autodidact software engineer solving complex problems for people & organizations.'
})
.use(discoverPartials())
.use(sass())
.use(collections({
  posts: 'posts/*.md'
}))
.use(markdown())
.use(permalinks({
  relative: false,
  pattern: ':title'
}))
.use(layouts({
  default: 'post.hbs',
  "pattern": "**/*.html"
}))
.use(watch({
  paths: {
    '${source}/**/*': true,
    'scss/**/*': '*'
  },
  livereload: true,
}))
.build(function(err) {
  if (err) throw err
})
