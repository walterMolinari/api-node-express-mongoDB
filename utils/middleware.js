// middleware
app.use((response, request, next) => {
  response.status(404).end()
})
  // middleware
app.use((error, response, request, next) => {
  console.log(error.name)
  if (error.name === 'CastError') {
    response.status(400).send({
      error: 'id used is malformed'
    })
  } else {
    esponse.status(500).end()
  }
})

