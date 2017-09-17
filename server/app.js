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
    {button: "pictures-anchor-button", Source: "/public/media/water.png", name: "Water", link: "/water"},
    {button: "top-anchor-button", Source: "/public/media/mountain.png", name: "Mountain", link: "/mountain"},
    {button: "description-anchor-button", Source: "/public/media/forest.png", name: "Forest", link: "/forest"},
    {button: "top-anchor-button", Source: "/public/media/city.png", name: "City", link: "/city"}
]

app.use('/public', express.static('./public'))

app.get('/', (req, res) => {
    res.render('earth.html', {anchors: anchors, active: req.path})
})
app.get('/water', (req, res) => {
    res.render('water.html', {anchors: anchors, active: req.path})
})
app.get('/forest', (req, res) => {
    res.render('forest.html', {anchors: anchors, active: req.path})
})
app.get('/mountain', (req, res) => {
    res.render('mountain.html', {anchors: anchors, active: req.path})
})
app.get('/city', (req, res) => {
    res.render('city.html', {anchors: anchors, active: req.path})
})

let server = app.listen(PORT, HOST, () => console.log('Project server running on: ' + HOST + ':' + PORT))
