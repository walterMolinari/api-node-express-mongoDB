require('dotenv').config()
const app = require('./app')

const cors = require('cors')
app.use(cors())


const { PORT_DEVELOPMENT,PORT_TEST,NODE_ENV } = process.env


const PORT = NODE_ENV === 'development'
? PORT_DEVELOPMENT
: PORT_TEST
const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
 module.exports = {
  server,
  app
 }