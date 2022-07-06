const express = require('express')
const app = express()
const notesRouter = require('./controllers/notes')

app.use(express.json())


app.use('/api/notes',notesRouter)



module.exports = app