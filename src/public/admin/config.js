import pages from './collections/pages.js'
import services from './collections/services.js'

const { CMS, initCMS } = window

initCMS({
  config: {
    backend: {
      name: 'git-gateway',
      branch: 'main',
      repo: 'danielbeeke/metalsmith-netlify-starter',
      site_domain: 'https://steady-elf-b6eff1.netlify.app',
    },
    local_backend: {
      url: 'http://localhost:8081/api/v1',
    },
    publish_mode: 'simple',
    media_folder: 'src/assets',
    public_folder: 'assets',
    collections: [pages, services],
  },
});