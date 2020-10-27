const express = require('express')

const router = express.Router()

const database = require('./db.js')

router.get('/api/posts', (req, res) => {
    database.find()
        .then(response => {
            console.log(response)
            res.end()
        })
        .catch(err => {
            console.log(err.message, err.stack)
        })
})



module.exports = router