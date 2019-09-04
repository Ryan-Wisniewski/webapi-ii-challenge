const express = require('express')
const db = require('./data/db')

const server = express()
server.use(express.json())

server.get('/', (req,res) => {
    res.status(200).json({ sanity: 'check' })
})

server.post('/api/posts', (req,res) => {
    const { title, contents } = req.body

    if (!title || !contents){
        res.status(400).json({ message: 'Please provide title and contents for the post.'})
    } else {
            db.insert(req.body)
            .then(comment => {
                res.status(201).json(comment)
            })
            .catch(() => {
                res
                .status(500)
                .json({error: 
                    'There was an error while saving the post to the database'
                })
            })
    }
})
//FIX THIS. Uhm ask about this.
server.post('/api/posts/:id/comments', (res, req) => {
    const { text, postId } = req.body

    if(!text || !postId){
        res.status(400).json({ message: "Please provide text for the comment." })
    } else {
        db.insert(req.body)
   .then(message => {
       if(message){
           res.status(200).json(message)
       
       }else{
        res.status(404).json({ message: 'The post with the specified ID does not exist.'})
       }
   })
   .catch(()=> {
       res
       .status(500)
       .json({ error: 
        "There was an error while saving the comment to the database" 
        })
    })
    }
})
    


server.get('/api/posts', (req, res) => {
    db.find()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(()=>{
        res.status(500).jason({error: "The users information could not be retrieved."})
    })     
})
//FIX ELSE STATEMENT
server.get('/api/posts/:id', (req, res) => {
    db.findCommentById(req.params.id)
    .then(pos => {
        if(req.params.id !== []){
            console.log(pos)
            res.status(200).json(pos)
        } else{
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(()=> {
        res.status(500).json({error: "The post information could not be retrieved."})
    })
})

server.get('/api/posts/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
    .then(pos => {
        if(pos){
            res.status(200).json(pos)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(()=> {
        res.status(500).json({error: "The post information could not be retrieved."})
    })
})

server.delete('/api/posts/:id ', (req, res) => {
    
})

server.put('/api/posts/:id ', (req, res) => {
    
})
module.exports = server