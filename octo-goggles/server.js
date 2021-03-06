const express = require('express')
const app = express()
const PORT = 3004
const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://localhost:27017'+ '/todo'
const cors = require('cors')

//Database set up
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

// middleware
app.use(express.json()); //use .json(), not .urlencoded()
app.use(cors())


mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})
app.get('/', (req, res)=> {
    res.send('Hello World!')
})

const todosController = require('./controllers/todo')
app.use('/todos', todosController)

app.listen (PORT, ()=>{
    console.log('Im spying on you')
})
