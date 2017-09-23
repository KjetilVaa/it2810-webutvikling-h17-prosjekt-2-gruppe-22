const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

const HOST = process.env.P2_HOST || '0.0.0.0'
const PORT = process.env.P2_PORT || 8000

let app = express()

nunjucks.configure('server/views', {
    autoescape: true,
    express: app,
    watch: true
})

const anchors = [
    {img: "/public/media/water.png", name: "Water", link: "/water"},
    {img: "/public/media/mountain.png", name: "Mountain", link: "/mountain"},
    {img: "/public/media/forest.png", name: "Forest", link: "/forest"},
    {img: "/public/media/city.png", name: "City", link: "/city"}
]

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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
app.get('/doc', (req, res) => {
    res.render('doc.html', {anchors: anchors, active: req.path})
})
app.get('/about', (req, res) => {
    res.render('about.html', {anchors: anchors, active: req.path})
})
app.get('/contact', (req, res) => {
    res.render('contact.html', {anchors: anchors, active: req.path})
})

app.post('/msg',  function(req, res) {
    console.log("I made it")
    console.log(req.body)
    var name = req.body.name,
    email = req.body.email,
    text = req.body.text
    res.render('msg.html', {anchors: anchors, active: req.path})
});


let server = app.listen(PORT, HOST, () => console.log('Project server running on: ' + HOST + ':' + PORT))
