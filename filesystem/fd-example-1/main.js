const fs = require('fs')

// About file descriptors: https://nodejs.org/docs/latest-v17.x/api/fs.html#file-descriptors_1
// About file system flags: https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#file-system-flags

fs.open(__dirname+'/input.txt', 'r', (err, fd) => {
 if (err) console.error(err)
 try {
    fs.fstat(fd, (err, stat) => {
        if (err) {
            fs.close(fd)
            console.error(err)
        }

        const buffer = Buffer.alloc(stat.size)
        fs.read(fd, buffer, 0,  buffer.length, null, (err, bytesRead, buffer) => {
          if (err) return console.error(err)
          const data = buffer.toString('utf-8', 0, buffer.length)
          console.log(data)
        })

        fs.close(fd)
     })
 } catch(err) {
    fs.close(fd)
    console.error(err)
 }
})

try {
  const fd = fs.openSync(__dirname+'/input.txt', 'r');

  // do something with the file descriptor
  console.log(fd)

  fs.close(fd)

} catch (err) {
  console.error(err);
}