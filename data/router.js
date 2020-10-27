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
    const { id } = req.params
    database.findById(id)
        .then(post =>
            post.length ? 
            res.status(200).json({
                message: 'Success', 
                data: post 
            }) 
            : res.status(404).json({
                message: `Post not found with ID: ${id}` 
            }))
        .catch(err => {
            res.status(500).json({ message: 'Failure getting post', stack: err.stack })
        })
})

router.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params
    database.findById(id)
        .then(post => {
            if (post.length) {
                database.findPostComments(id)
                    .then(comments => {
                        res.status(200).json({ message: 'Success', data: comments })
                    })
                    .catch(err => {
                        res.status(500).json({ message: 'Failure getting comments', stack: err.stack })
                    })
            } else {
                res.status(404).json({ message: `Post not found with ID: ${id}` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failure getting comments', stack: err.stack })
        })
})

//[ POST ] Request Handlers
router.post('/api/posts', (req, res) => {
    const { title, contents } = req.body
    if (!title || !contents) {
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

router.post('/api/posts/:id/comments', (req, res) => {
    const { text } = req.body
    const { id } = req.params
    try {
        if(!text) {
            res.status(400).json({ message: 'Text is required' })
        } else {
            database.insertComment({ text, post_id: id })
                .then(comment => {
                    res.status(201).json({ message: 'Success', comment })
                })
                .catch(err => {
                    console.log(err)
                    res.status(404).json({ message: `Post not found with ID: ${id} `})
                })
        }
    } catch(error) {
        res.status(500).json({ message: 'Failure creating comment', stack: error.stack })
    }
})

//[ PUT ] Request Handlers
router.put('/api/posts/:id', (req, res) => {
    const { title, contents } = req.body
    const { id } = req.params
    database.update(id, { title, contents })
        .then(post => {
            if (post === 1) {
                res.status(200).json({ message: 'Success', post })
            } else {
                res.status(404).json({ message: `Post not found with ID: ${id}` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failure updating post', stack: err.stack })
        })
})

//[ DELETE ] Request Handlers
router.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params
    database.remove(id)
        .then(post => {
            if (post === 1) {
                res.status(200).json({ message: 'Success', itemsDeleted: post })
            } else {
                res.status(404).json({ message: `Post not found with ID: ${id}` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failure deleting post', stack: err.stack })
        })
})

module.exports = router