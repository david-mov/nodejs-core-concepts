const {EventEmitter} = require('events')
const fetch = require('node-fetch')

class WithTime extends EventEmitter {
	execute(asyncFn, ...args) {
		this.emit('begin')
		console.time('execute')
		this.on('data', data => console.log('got data ', data))
		asyncFn(...args, (err, data) => {
			if (err) return this.emit('error', err)
			this.emit('data', data)
			console.timeEnd('execute')
			this.emit('end')
		})
	}
}

const withTime = new WithTime()

withTime.on('begin', () => console.log('About to execute'))
withTime.on('end', () => console.log('Done with execute'))

const readFile = (url, cb) => {
	fetch(url)
		.then(res => res.json())
		.then(data => cb(null, data))
}

withTime.execute(readFile, 'https://jsonplaceholder.typicode.com/posts/1')