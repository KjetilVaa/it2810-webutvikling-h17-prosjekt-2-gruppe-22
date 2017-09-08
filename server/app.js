const express = require('express')

const HOST = '0.0.0.0'
const PORT = 8000

let app = express()

let server = app.listen(PORT, HOST, () => console.log('Project server running on: ' + HOST + ':' + PORT))