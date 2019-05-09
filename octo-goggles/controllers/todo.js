const express = require('express')
const todos = express.Router()
const Todo = require('../models/todo.js')

todos.get('/', (req, res) => {
    Todo.find({}, (err, foundTodos) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundTodos)
    })
})

todos.post('/', (req, res) => {
    Todo.create(req.body, (error, createdTodo) => {
        if (error) {
            res.status(400).json({ error: error.message })
        } else {
        }
        res.status(200).json(createdTodo) //  .json() will send proper headers in response so client knows it's json coming back
    })
})

todos.delete('/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, deletedTodo) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(deletedTodo)
    })
})

todos.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body,
        { new: true }, (err, updatedTodo) => {
            if (err) {
                res.status(400).json({ error: err.message })
            }
            res.status(200).json(updatedTodo)
        })
})


module.exports = todos