const child_process = require("child_process");
var fib = require("./fib");

// using set timeout
console.log("1: Start");

// async call
// setTimeout(function () {
console.log("Fibonacci of 30: ", fib.calc(30));
console.log("Fibonacci of -15: ", fib.calc(-15));
// }, 3000);

console.log("3: End");

// using child process
console.log("1: Start");

child_process.spawn("node", ["./fib2.js"], {
  stdio: "inherit",
});

console.log("3: End");

// How many event loops did we have?
// 2

// Was node blocked?
// main node not blocking, child blocking

// Where app.js works?
// V8 gets the function then puts anonymous function. Call stack.

// app.use("/", routes);
// nothing executed. No function added to queue. Binding.

// What hapeens getAll function called?
// Pending callback. Request comes Call back executed.

// setTimeout(m1, 30000)
// setImmediate(m2)
// dbOP(m3)
// m1 m3 m2 - can ?
