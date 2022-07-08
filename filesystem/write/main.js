const fs = require('fs')

fs.writeFile(__dirname + '/input1.txt', 'Hello, world!', (err) => {
    if (err) return console.error(err)

    console.log('Asynchronous writing completed (input1)')
    console.log("Let's read newly written data (input1)")
    fs.readFile(__dirname + '/input1.txt', (err, data) => {
        if (err) return console.error(err)
        console.log(`Asynchronous read: ${data}`)
    })
})

try {
    fs.writeFileSync(__dirname + '/input2.txt', 'Goodbye!')
    console.log('Synchronous writing completed (input2)')
} catch(err) {
    console.error(err)
}
