const server = require('./server')

server.listen(4000, (req, res) => {
    console.log('Server is listening on port 4000')
})