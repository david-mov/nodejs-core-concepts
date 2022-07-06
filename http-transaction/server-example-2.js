const http = require('http')

/* http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/echo') {
        body = []
        req.on('error', (err) => {
            console.error(err)
            res.statusCode = 400
            res.end()
        }).on('data', (chunk) => {
            body.push(chunk)
        }).on('end', () => {
            body = Buffer.concat(body).toString()
            res.end(body)
        })
    } else {
        res.statusCode = 404
        res.end()
    }
}).listen(8000) */

http.createServer((req, res) => {
    req.on('error', (err) => {
        console.error(err)
        res.statusCode = 400
        res.end()
    })
    res.on('error', (err) => console.error(err))
    if (req.method === 'POST' && req.url === '/echo') {
        req.pipe(res)
    } else {
        res.statusCode = 404
        res.end()
    }
}).listen(8000)