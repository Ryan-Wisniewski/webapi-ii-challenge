const express = require('express')

const server = express()
server.use(express.json())

server.get('/', (req,res) => {
    res.status(200).json({ sanity: 'check' })
})

server.post('/api/posts ', (req,res) => {
    res.status(201)
})

server.post('/api/posts/:id/comments', (res, req) => {

})

server.get('/api/posts', (req, res) => {

})
module.exports = server