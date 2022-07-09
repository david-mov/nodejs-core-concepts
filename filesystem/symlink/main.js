const fs = require('fs')
const path = require('path')

// About Symbolic Links:
// https://docs.microsoft.com/en-us/windows/win32/fileio/symbolic-links
// https://man7.org/linux/man-pages/man2/symlink.2.html
// https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fssymlinktarget-path-type-callback

const notesPath = path.join(__dirname, 'notes.txt')

console.log('Contents of the text file:');
console.log(fs.readFileSync(notesPath, 'utf8'));
  
fs.symlink(notesPath, 'symlinkToFile', 'file', (err) => {
  if (err) return console.error(err)

  console.log('File symlink created');
  console.log('Contents of the symlink created:');
  console.log(fs.readFileSync(path.join(__dirname, 'symlinkToFile'), 'utf8'));
})

fs.symlink(__dirname, 'symlinkToDir', 'dir', (err) => {
  if (err) return console.error(err)

  console.log('Directory symlink created')
  console.log('Symlink is a directory: ', fs.statSync(path.join(__dirname, 'symlinkToDir')).isDirectory())
})

// Note for windows users: Execute terminal as administrator for can create a symlink.