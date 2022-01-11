const child_process = require("child_process");
var fib = require("./fib");

// using set timeout
console.log("1: Start");

// async call
setTimeout(function () {
  console.log("Fibonacci of 30: ", fib.calc(30));
  console.log("Fibonacci of -15: ", fib.calc(-15));
}, 0);

console.log("3: End");

// using child process
console.log("1: Start");

const newProcess = child_process.spawn("node", ["./fib2.js"], {
  stdio: "inherit",
});

console.log("3: End");
