import BaseFields from './BaseFields.js'

export default {
  name: 'services',
  label: 'Service',
  folder: 'src/services/',
  create: true,
  slug: 'services/{{slug}}',
  fields: [
    ...BaseFields
  ]
}