const express = require('express')

const router = express.Router()

const database = require('./db.js')

//[ GET ] Request Handlers
router.get('/api/posts', (req, res) => {
    database.find()
        .then(posts => {
            res.status(200).json({ message: 'Success', data: posts })
        })
        .catch(err => {
            res.status(500).json({ message: 'Failure getting posts', stack: err.stack })
        })
})

router.get('/api/posts/:id', (req, res) => {

})

router.get('/api/posts/:id/comments', (req, res) => {

})

//[ POST ] Request Handlers
router.post('/api/posts', (req, res) => {
    const { title, contents } = req.body
        if(!title || !contents) {
            res.status(400).json({ error: 'Title and contents are required' })
        } else {
            database.insert({ title, contents })
                .then(post => {
                    res.status(201).json({ message: 'Success', post })
                })
                .catch(err => {
                    res.status(500).json({ message: 'Failure creating post', stack: err.stack })
                })
        }
})

router.post('/api/posts', (req, res) => {

})

//[ PUT ] Request Handlers
router.put('/api/posts/:id', (req, res) => {

})

//[ DELETE ] Request Handlers
router.delete('/api/posts/:id', (req, res) => {

})

module.exports = router