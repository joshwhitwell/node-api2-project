const express = require('express')

const router = require('./data/router')

const server = express()

server.use(express.json())
server.use(router)

server.get('/', (req, res) => {
  res.send(`
    <h2>Node API 2</h>
    <p>Welcome to Node API 2</p>
  `)
})

module.exports = server