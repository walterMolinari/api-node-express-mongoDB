const mongoose = require('mongoose')

const { CONNECTION_STRING,CONNECTION_STRING_TEST,NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' 
? CONNECTION_STRING_TEST
: CONNECTION_STRING

if(!connectionString){
  console.error('no conectado')
}
    mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      const info = NODE_ENV.toUpperCase()
        console.log(`Data base connected --${info}-- mode`)
    }).catch(error => {
        console.log(error)
    })




