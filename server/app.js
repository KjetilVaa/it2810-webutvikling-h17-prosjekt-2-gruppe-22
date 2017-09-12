const express = require('express')
const nunjucks = require('nunjucks')

const HOST = '0.0.0.0'
const PORT = 8000

let app = express()

nunjucks.configure('server/views', {
    autoescape: true,
    express: app,
    watch: true
})

app.use('/static', express.static('./dist'))
app.use('/css', express.static('./server/css'))
app.use('/js', express.static('./server/js'))

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/foo', (req, res) => {
    res.render('bar.html')
})

let server = app.listen(PORT, HOST, () => console.log('Project server running on: ' + HOST + ':' + PORT))