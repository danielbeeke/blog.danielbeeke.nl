if (location.hostname === 'localhost') {
  const s = document.createElement('script')
  s.type = "text/javascript"
  s.src = 'http://localhost:35729/livereload.js'
  document.head.appendChild(s)
}
