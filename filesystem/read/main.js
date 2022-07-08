const fs = require('fs')

// Asynchronous read
fs.readFile(__dirname + '/input.txt', (err, data) => {
    if (err) return console.error(err)
    console.log(`Asynchronous read: ${data.toString()}`)
})

// Synchronous read
try {
    const data = fs.readFileSync(__dirname + '/input.txt')
    console.log(`Synchronous read: ${data.toString()}`)
} catch(err) {
    console.error(err)
}


