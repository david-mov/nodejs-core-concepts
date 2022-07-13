// Controls a standard Web API use case.
function getRequestData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''
            req.on('error', (err) => {
                reject(err)
            }).on('data', (chunk) => {
                body += chunk.toString()
            }).on('end', () => {
                resolve(body)
            })
        } catch(err) {
            reject(err)
        }
    })
}

module.exports = {
    getRequestData
}
