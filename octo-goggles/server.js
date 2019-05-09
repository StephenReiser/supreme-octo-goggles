const express = require('express')
const app = express()
const PORT = 3004
const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://localhost:27017'+ '/todo'

//Database set up
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

// middleware
app.use(express.json()); //use .json(), not .urlencoded()

mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})
app.get('/', (req, res)=> {
    res.send('Hello World!')
})
app.listen (PORT, ()=>{
    console.log('Im spying on you')
})
