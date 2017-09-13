const express = require('express')
const nunjucks = require('nunjucks')

const HOST = process.env.P2_HOST || '0.0.0.0'
const PORT = process.env.P2_PORT || 8000

let app = express()

nunjucks.configure('server/views', {
    autoescape: true,
    express: app,
    watch: true
})

const anchors = [
    {anchor_button: "footer-anchor-button", anchor_name: "Footer"},
    {anchor_button: "pictures-anchor-button", anchor_name: "Pictures"},
    {anchor_button: "description-anchor-button", anchor_name: "Description"},
    {anchor_button: "top-anchor-button", anchor_name: "Top"}
]

app.use('/public', express.static('./public'))

let getRoot = (req, res) => {
    res.render('index.html', anchors)
}

app.get('/', getRoot)

app.get('/foo', (req, res) => {
    res.render('bar.html')
})

let server = app.listen(PORT, HOST, () => console.log('Project server running on: ' + HOST + ':' + PORT))