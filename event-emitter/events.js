class EventEmitter {
  listeners = {};  // key-value pair
  
  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
    return this
  }
  on(eventName, fn) { return this.addListener(eventName, fn) }
  
  removeListener(eventName, fn) {
    const lis = this.listeners[eventName]
    if (!lis) return this
    for (let idx in lis) {
      if (lis[idx].toString() === fn.toString()) {
        lis.splice(idx, 1)
        break
      }
    }
    return this
  }
  off(eventName, fn) { return this.removeListener(eventName, fn) }
  
  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    const onceFn = () => {
      fn()
      this.off(eventName, onceFn)
    } // note that is a closure
    this.listeners[eventName].push(onceFn)
    return this
  }
  
  emit(eventName, ...args) { 
    const fns = this.listeners[eventName]
    if (!fns) return false
    fns.forEach(f => f(...args))
    return true
  }
  
  listenerCount(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0
  }
  
  rawListeners(eventName) { return this.listeners[eventName] }
}

module.exports = { EventEmitter }