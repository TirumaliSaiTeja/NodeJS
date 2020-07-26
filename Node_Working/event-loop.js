const fs = require('fs')

setTimeout(() => console.log('Timer 1 finished'), 0)
setImmediate(() => console.log('Immediate 1 finished'))

fs.readFile('test-file.txt', () => {
  console.log('I/O Finished')

  setTimeout(() => console.log('Timer 2 finished'), 0)
  setTimeout(() => console.log('Timer 3 finished'), 5000)
  setImmediate(() => console.log('Immediate 2 finished'))

  process.nextTick(() => console.log('process.nextTick()'))
})
// proces.nextTick will execute after each phase of the loop
// setImmediate will get executed once per tick while the
// nextTick gets executed immediately

console.log('Hello from the top-level code')
