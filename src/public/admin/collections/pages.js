import BaseFields from './BaseFields.js'

export default {
  name: 'pages',
  label: 'Page',
  folder: 'src/pages/',
  create: true,
  slug: '{{slug}}',
  fields: [
    ...BaseFields
  ]
}