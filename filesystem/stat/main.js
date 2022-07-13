const fs = require('fs');
const fsPromises = require('fs/promises')

// stat returns the status of the file identified by the filename passed

function logStats(stats) {
  return console.log(
    stats.isFile(), // true
    stats.isDirectory(), // false
    stats.isSymbolicLink(), // false
    stats.size // number of bytes
  )
  
}

fs.stat(__dirname+'/input.txt', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  
  console.log('Stat of input.txt')
  logStats(stats)
});

// About file access constants: https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#file-access-constants

fs.access(__dirname+'/symlinkInput', fs.constants.F_OK ,(err) => {
  if (err) {
    fs.symlink(__dirname+'/input.txt', 'symlinkInput', 'file', (err) => {
      if (err) return console.error(err)
      console.log('Symbolic link of input.txt created')

      fs.lstat(__dirname+'/symlinkInput', (err, stats) => {
        if (err) return console.error(err)
        console.log('Stat of symlinkInput')
        logStats(stats)
      })
    })
  } else {
    fs.lstat(__dirname+'/symlinkInput', (err, stats) => {
      if (err) return console.error(err)
      console.log('Stat of symlinkInput')
      logStats(stats)
    })
  }
})

// Using promises based fs module
async function checkStat() {
  console.log('Stat of symlinkInput2 using fs/promises')
  try {
    await fsPromises.access(__dirname+'/symlinkInput2', fs.constants.F_OK)
    logStats(await fsPromises.lstat(__dirname+'/symlinkInput2'))
  } catch(err) {
    let sml = await fsPromises.symlink(__dirname+'/input.txt', 'symlinkInput2')
    logStats(await fsPromises.lstat(__dirname+'/symlinkInput2'))
  }
}

checkStat()


