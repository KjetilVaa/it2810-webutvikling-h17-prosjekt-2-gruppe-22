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

//Defines links in navbar
const anchors = [
    {img: "/public/media/water.png", name: "Water", link: "/water"},
    {img: "/public/media/mountain.png", name: "Mountain", link: "/mountain"},
    {img: "/public/media/forest.png", name: "Forest", link: "/forest"},
    {img: "/public/media/city.png", name: "City", link: "/city"}
]

//Used to get data from post
app.use(bodyParser.urlencoded({ extended: false }))

//Makes the public folder public
app.use('/public', express.static('./public'))

//Sets up redirects
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
    var name = req.body.name
    var email = req.body.email
    var text = req.body.text
    console.log("New Message from:",name,"\nEmail:",email,".\nMessage:", text,"\n------------")
    res.render('msg.html', {anchors: anchors, active: req.path})
});


let server = app.listen(PORT, HOST, () => console.log('Project server running on: ' + HOST + ':' + PORT))




