const express = require('express')
const routerApi = require('./routes/routes')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/lanchonete')
mongoose.connection.once('open', () => console.log('conected to database'))


const app = express()

app.use(express.json())

app.use('/', routerApi)



app.listen(3000, () => {
    console.log('Listening on port 3000');
})
