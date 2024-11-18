//In this code sample, there is an event handler that emits an event, and a timer to trigger events. 
//In addition, there is create an asynchronous function that waits for an event to be emitted.

const EventEmitter = require('events');

// Create an instance of EventEmitter
const myEmitter = new EventEmitter();

// Set up event listeners
myEmitter.on('start', () => {
  console.log('Start event triggered.');
  // Emit another event after a delay
  setTimeout(() => {
    myEmitter.emit('process', 'Proces started');
  }, 1000);
});

myEmitter.on('process', (message) => {
  console.log(message);
  // Emit a finish event
  myEmitter.emit('finish', 'Process completed');
});

myEmitter.on('finish', (message) => {
  console.log(message);
});

//An asynchronous function that waits for an event to be emitted.

async function waitForEvent(eventName) {
  return new Promise((resolve) => {
    myEmitter.once(eventName, (message) => {
      resolve(message);
    });
  });
}

// Trigger the start event
myEmitter.emit('start');

// Use the async function to wait for the 'finish' event
(async () => {
  const result = await waitForEvent('finish');
  console.log('Async function received:', result);
})();