const Vue = require('vue')
const express = require('express')
const fs = require('fs')

const render = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./index.template.html', 'utf-8'),
})

const server = express()

server.get('/', (req, res) => {
  const app = new Vue({
    template: `
      <div id="app">
      <h1>{{ message }}</h1>
      </div>
    `,
    data: {
      message: '拉勾教育',
    },
  })

  render.renderToString(app, ((err, html) => {
    if (err) {
      return res.status(500).end('Internet Server Error.')
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(html)
  }))

})

server.listen(3000, () => {
  console.log('server is running at port 3000.')
})
