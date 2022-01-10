const child_process = require("child_process");

const fibanocci = function (number) {
  if (number <= 2) {
    return 1;
  } else {
    return fibanocci(number - 1) + fibanocci(number - 2);
  }
};
console.log("1: Start");

setTimeout(() => console.log("1 sec"), 1000);
const newProcess = child_process.spawn("node", [fibanocci(9)], {
  stdio: "inherit",
});

console.log("2: End");
