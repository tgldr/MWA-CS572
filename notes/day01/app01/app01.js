const fs = require("fs");
console.log("1: Start app");

const printFilesFirstLine = function (err, buffer) {
  console.log("2: Got file", buffer.toString().substring(0, 20));
};

fs.readFile("largeFile.txt", printFilesFirstLine);

console.log("3: end app");
