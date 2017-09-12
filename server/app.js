const express = require('express')
const nunjucks = require('nunjucks')

const HOST = '0.0.0.0'
const PORT = 8000

let app = express()

nunjucks.configure('server/views', {
    autoescape: true,
    express: app,
    watch: true,
})

app.get('/', (req, res) => {
    res.render('index.html')
})

let server = app.listen(PORT, HOST, () => console.log('Project server running on: ' + HOST + ':' + PORT))