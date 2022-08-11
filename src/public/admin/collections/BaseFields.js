export default [
  {
    label: 'Title',
    name: 'title',
    widget: 'string',
    required: true,
  },
  {
    label: 'Layout',
    name: 'layout',
    widget: 'hidden',
    default: 'page.hbs',
  },
  {
    label: 'Body',
    name: 'body',
    widget: 'markdown',
    required: true,
  },
]