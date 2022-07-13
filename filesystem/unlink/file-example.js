const {access, writeFile, open, unlink} = require('fs')
const {join} = require('path')

const filePath = join(__dirname, 'notes.txt')

access(filePath, (err) => {
    if (err) {
        console.log('Creating notes.txt file...')
        writeFile(filePath, '', (err) => {
            if (err) return console.error(err)
            console.log('File notes.txt created succesfully')
        })
        /* open(filePath, 'w', (err, fd) => {
            if (err) return console.error(err)
            console.log('File notes.txt created succesfully')
        }) */
    } else {
        console.log('Deleting notes.txt file...')
        unlink(filePath, (err) => {
            if (err) return console.error(err)
            console.log('File notes.txt deleted sucessfully')
        })
    }
})