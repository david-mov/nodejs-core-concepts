const path = require('path')

const notes = 'C:/Users/David/Desktop/notes.txt'

console.log( path.dirname(notes) ) // get the parent folder of a file
console.log( path.basename(notes) ) // get the filename part
console.log( path.extname(notes) ) // get the file extension

console.log( path.basename(notes , path.extname(notes)) ) // get the filename without extension

const username = 'David'
console.log( path.join('C:', 'Users', username, 'Desktop', 'notes.txt') )
console.log( path.join('C://', '/Users', username, 'Desktop/', 'notes.txt') )

console.log( path.resolve('notes.txt') ) // get a absolute path from a relative path, using the working directory as base
console.log( path.resolve('some_folder', 'notes.txt') ) // yo can add folder(s) before
console.log( path.resolve('/notes.txt') ) // if the first parameter starts with a slash, that means it's an absolute path
console.log( path.resolve('/Users', 'David', 'Desktop', 'notes.txt') )

console.log( path.normalize('Users/./David//Desktop/../notes.txt') ) // calculate the path, when it contains relative specifiers

// Note: Neither resolve nor normalize will check if the path exists.


