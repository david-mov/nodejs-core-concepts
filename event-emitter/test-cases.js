const {EventEmitter} = require('./events.js')
const fetch = require('node-fetch')

const myEmitter = new EventEmitter()

function c1() { console.log('an event occurred!') }

function c2() { console.log('yet another event occurred!') }

myEmitter.on('eventOne', c1) // Register for eventOne
myEmitter.on('eventOne', c2) // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired')); 

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');
myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be 
// removed/unregistered automatically
myEmitter.emit('eventOnce');
myEmitter.emit('eventOnce'); // Will not be fired

myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'))
console.log(myEmitter.listenerCount('eventOnce'))

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the 
// emit has been called
console.log(myEmitter.rawListeners('eventOne'))
console.log(myEmitter.rawListeners('eventOnce'))



// Test case 2
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

myEmitter.off('eventOne', c1)
myEmitter.off('eventOne', c2)

// This will be printed before withTime (as withTime readFile is async)
console.log(myEmitter.listenerCount('eventOne'))
console.log(withTime.rawListeners('begin')) 

