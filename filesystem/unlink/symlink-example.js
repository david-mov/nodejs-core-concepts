const {access, symlink, unlink, readlink} = require('fs')
const {join} = require('path')

const symlinkPath = join(__dirname, 'symlinkFromFile')
const filePath = join(__dirname, 'fileToLink')

access(symlinkPath, (err) => {
    if (err) {
        console.log('Creating soft link from fileToLink.txt...')
        symlink(filePath, symlinkPath, 'file', (err) => {
            if (err) return console.error(err)
            console.log('Soft link created succesfully')
            readlink(symlinkPath, (err, linkStr) => {
                console.log('Linked file path:', linkStr)
            })
        })
    } else {
        console.log('Deleting fileToLink.txt soft link...')
        unlink(symlinkPath, (err) => {
            if (err) return console.error(err)
            console.log('Soft link deleted sucessfully')
        })
    }
})