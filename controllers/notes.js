const notesRouter = require('express').Router()

const express = require('express')
const app = express()

const Note = require('../models/Note')


require('../db/mongo')

  
notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
})
  
notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  

  Note.findById(id).then(note => {
    if (note) {
      return response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    response.status(404).end()
    //next(error)
  })
})
  
notesRouter.post('/', (request, response) => {
    const note =  request.body
    if (!note.content) {
      return response.status(400).json({
        error: 'require "content" field is missing'
      })
    }
  
    const newNote = new Note({
      content: note.content,
      date: new Date(),
      important: note.important || false
    })
  
    newNote.save().then(savedNote => {
      response.json(savedNote)
    })
})
  
notesRouter.delete('/:id', (request, response, next) => {
    const { id } = request.params
    Note.findByIdAndDelete(id).then(result => {
      response.status(204).end()
    }).catch(error => { next(error) })
})
  
notesRouter.put('/:id', (request, response, next) => {
    const { id } = request.params
    const note = request.body
  
    const newNoteInfo = {
      content: note.content,
      important: note.important,
      date: new Date()
    }
  
    Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then(result => {
      response.json(result)
    })
})

// middleware
app.use((error, response, request, next) => {
  response.status(404).end()
})
// middleware
app.use((error, response, request, next) => {
  if (error.name === 'CastError') {
    response.status(400).send({
      error: 'id used is malformed'
    })
  } else {
    response.status(500).end()
  }
})

module.exports = notesRouter
  