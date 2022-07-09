const fs = require('fs');

// stat returns the status of the file identified by the filename passed

fs.stat(__dirname+'/input.txt', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  
  console.log(
    stats.isFile(), // true
    stats.isDirectory(), // false
    stats.isSymbolicLink(), // false
    stats.size // number of bytes
  )
});