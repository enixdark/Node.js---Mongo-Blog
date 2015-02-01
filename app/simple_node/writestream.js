
debug = require('debug')

console.log(process.stdout.writable);
debug('hello');
process.stdout.write("Hello world");
