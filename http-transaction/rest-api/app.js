const http = require('http')
const ToDo = require('./controllers')
const { getRequestData } = require('./utils')

const PORT = process.env.PORT || 5000

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/api/todos') {
        const toDo = new ToDo
        const todos = await toDo.getTodos()

        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(todos))
    }
    else if (req.method === 'GET' && req.url.match('\/api\/todos\/[0-9]+')) {
        try {
            const id = req.url.slice(11)
            const toDo = new ToDo
            const todo = await toDo.getTodo(id)
            
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(todo))
        } catch(error) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ message: error }))
        }
    }
    else if (req.method === 'POST' && req.url === '/api/todos') {
        const todoData = JSON.parse(await getRequestData(req))
        const toDo = new ToDo
        const todo = await toDo.createTodo(todoData)

        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(todo))
    }
    else if (req.method === 'PUT' && req.url.match('\/api\/todos\/[0-9]+')) {
        try {
            const id = req.url.slice(11)
            const toDo = new ToDo
            const todo = await toDo.updateTodo(id)
            
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(todo))
        } catch(error) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ message: error }))
        }
    }
    else if (req.method === 'DELETE' && req.url.match('\/api\/todos\/[0-9]+')) {
        try {
            const id = req.url.slice(11)
            const toDo = new ToDo
            const todo = await toDo.deleteTodo(id)
            
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(todo))
        } catch(error) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ message: error }))
        }
    }
    else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ message: 'Endpoint not found' }))
    }
})

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})