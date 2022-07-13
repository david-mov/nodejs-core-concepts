// This manages the actual functionality and the logic behind each route used in this application.

const data = require('./data')

class Controller {

    async getTodos() {
        return new Promise((resolve, _) => resolve(data))
    }

    async getTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === parseInt(id))
            if (todo) {
                resolve(todo)
            } else {
                reject(`Todo with id ${id} not found `)
            }
        })
    }

    async createTodo(todoData) {
        return new Promise((resolve, _) => {
            let newTodo = {
                id: Math.floor(Math.random() * 1000) + 5,
                ...todoData
            }
            data.push(newTodo)
            resolve(newTodo)
        })
    }

    async updateTodo(id) {
        return new Promise((resolve, reject) => {
            let todo = data.find((todo) => todo.id === parseInt(id))
            if (todo) {
                todo['completed'] = true
                resolve(todo)
            } else {
                reject(`Todo with id ${id} not found `)
            }
        })
    }

    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            let todoIdx = data.findIndex((todo) => todo.id === parseInt(id))
            if (todoIdx !== -1) {
                resolve(data.splice(todoIdx,1))
            } else {
                reject(`Todo with id ${id} not found `)
            }
        })
    }
}

module.exports = Controller;